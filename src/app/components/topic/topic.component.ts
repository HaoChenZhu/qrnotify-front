import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as e from 'express';
import { MqttService } from 'ngx-mqtt';
import { ITurnDto } from 'src/app/models/turn.interface';
import { CommonService } from 'src/app/services/common.service';
import { LoginService } from 'src/app/services/login.service';
import { TurnService } from 'src/app/services/turn.service';

@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.css'],
})
export class TopicComponent implements OnInit {
  turns: ITurnDto[] = [];
  selectedTurn: ITurnDto | null = null;
  literals: any;
  constructor(
    private router: Router,
    private _turnService: TurnService,
    private _loginService: LoginService,
    private _commonService: CommonService
  ) {}
  ngOnInit() {
    this.literals = this._commonService.getLiterals();
    if (!this._loginService.isTokenValid()) {
      //si el token a expirado redirige al login
      this.router.navigate(['/login']);
    }
    this._turnService.getAllTurns().subscribe({
      next: (data: ITurnDto[]) => {
        this.turns = data;
      },
      error: (error) => {
        console.error('Error en getTurns', error);
      },
    });
  }
}
