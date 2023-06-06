import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IMqttMessage, MqttService } from 'ngx-mqtt';
import { Subscription } from 'rxjs';
import { IClientDto, ITurnDto } from 'src/app/models/turn.interface';
import { LoginService } from 'src/app/services/login.service';
import { TurnService } from 'src/app/services/turn.service';

@Component({
  selector: 'app-turn',
  templateUrl: './turn.component.html',
  styleUrls: ['./turn.component.css']
})
export class TurnComponent implements OnInit, OnDestroy {
  turnId: string = '';
  currentIndex = 0; // Índice del elemento actual
  currentNumber: any;
  previousNumber: any = 0;
  nextNumber: any = 0;

  turn: ITurnDto | undefined;

  clientTurn: IClientDto[] | undefined;

  pendingClientsCount: number | undefined;

  message: any | undefined;
  topic: string | undefined;

  isSubscribed = false;
  clientId: string | null = null;
  clientCurrentTurn: string | undefined;
  turnName: string | undefined;
  private mqttSubscription: Subscription | null = null;

  constructor(private _loginService: LoginService, private _mqttService: MqttService, private _turnService: TurnService, private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.clientId = this._loginService.getClientId();
    this.route.params.subscribe((params: any) => {
      this.turnId = params['id'];
    })
    const subscribedTopic = localStorage.getItem(this.turnId + 'subscribedToTopic');
    if (subscribedTopic) this.subscribe(subscribedTopic);
    this.getTurnById();
  }

  getTurnById() {
    this._turnService.getTurnById(this.turnId).subscribe((data: ITurnDto) => {
      this.turn = data;
      this.clientTurn = data.turns;
      this.topic = data.topic;
      this.turnName = data.name;
      this.updatePendingClientsCount();
      this.showTurns();
    })
  }

  updatePendingClientsCount() {
    this.pendingClientsCount = this.clientTurn?.filter(turno => turno.status === 'PENDIENTE').length;
  }

  showTurns() {
    const turnos = this.getTurnNumbers();
    this.updateTurnNumbers(turnos);
  }

  getTurnNumbers() {
    if (this.clientTurn && Array.isArray(this.clientTurn)) {
      return this.clientTurn.map(turno => Number(turno.turn_number)).sort((a, b) => a - b);
    } else {
      console.error('El mensaje recibido no contiene un array "turns" válido');
      return [];
    }
  }

  updateTurnNumbers(turnos: number[]) {
    this.currentNumber = Number(this.turn?.current_turn);
    this.nextNumber = turnos[turnos.indexOf(this.currentNumber) + 1] || " ";
    this.previousNumber = turnos[turnos.indexOf(this.currentNumber) - 1] || " ";
  }

  requestTurn(topic: string | undefined) {
    this._turnService.requestTurn(this.turnId).subscribe((data: IClientDto) => {
      if (data) {
        this.clientCurrentTurn = data.turn_number
      }
      this.getTurnById();
    })
    this.subscribe(topic);
  }

  subscribe(topic: any) {
    //para pedir un turno
    console.log('Connecting mqtt client');
    this.isSubscribed = true;
    localStorage.setItem(this.turnId + 'subscribedToTopic', topic);

    //para subscribirme a un topic y recibir el estado de la cola
    this.mqttSubscription = this._mqttService.observe(topic, { qos: 1 }).subscribe({
      next: (message: IMqttMessage) => {
        this.message = JSON.parse(message.payload.toString()); // Analizar el mensaje JSON recibido

        if (!this.message) {
          console.error('El mensaje recibido no es válido');
          return;
        }
        console.log('Received message: ', message.payload.toString());

        // Actualizar el estado de la cola y ordenar los turnos de menor a mayor
        const turnos = this.message.turns?.map((turno: { turn_number: any; }) => Number(turno.turn_number)).sort((a: any, b: any) => a - b);
        this.currentNumber = Number(this.message.current_turn);
        this.nextNumber = turnos[turnos.indexOf(this.currentNumber) + 1] || " ";
        this.previousNumber = turnos[turnos.indexOf(this.currentNumber) - 1] || " ";
        this.pendingClientsCount = this.message.turns?.filter((turno: { status: string; }) => turno.status === 'PENDIENTE').length;

        // Si el turno actual es el mío y se ha completado, desuscribirse
        if (this.clientId) {
          const clientTurn = this.message.turns.find((turn: any) => turn.client_id === this.clientId && turn.status === 'COMPLETADO');
          console.log('Client turn: ', clientTurn);
          if (clientTurn) {
            console.log('Client turn completed');
            localStorage.removeItem(this.turnId + 'subscribedToTopic');
            this.isSubscribed = false;
            this.mqttSubscription?.unsubscribe();
            this.mqttSubscription = null;
          }
        }
      },
      error: error => {
        console.error('Error in MQTT subscription:', error);
      }
    });
  }
  ngOnDestroy(): void {
    this.mqttSubscription?.unsubscribe();
    localStorage.removeItem(this.turnId + 'subscribedToTopic');
  }

}
