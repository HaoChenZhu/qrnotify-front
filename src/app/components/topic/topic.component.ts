import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MqttService } from 'ngx-mqtt';
import { ITurnDto } from 'src/app/models/turn.interface';
import { LoginService } from 'src/app/services/login.service';
import { TurnService } from 'src/app/services/turn.service';

@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.css']
})
export class TopicComponent implements OnInit {
  turns: ITurnDto[] = [];
  selectedTurn: ITurnDto | null = null;

  message: any | undefined;
  constructor(private router: Router, private _turnService: TurnService, private _loginService: LoginService, private _mqttService: MqttService) {

  }
  ngOnInit() {
    if (!this._loginService.isTokenValid()) { //si el token a expirado redirige al login
      this.router.navigate(['/login']);
    }
    this._turnService.getAllTurns().subscribe((data: ITurnDto[]) => {
      this.turns = data;
    })
  }
}






