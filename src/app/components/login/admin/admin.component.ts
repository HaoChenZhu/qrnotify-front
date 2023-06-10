import { Component, OnInit } from '@angular/core';
import OktaAuth from '@okta/okta-auth-js';
import { ITurnDto } from 'src/app/models/turn.interface';
import { CommonService } from 'src/app/services/common.service';
import { TurnService } from 'src/app/services/turn.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  adminName: string = '';
  turnName: string = '';
  currentNumber: string = '';
  pendingClientsCount: number | undefined = 0;

  turn: ITurnDto | undefined;
  turnId: string | null | undefined;

  literals: any;
  constructor(
    private oktaAuth: OktaAuth,
    private _turnService: TurnService,
    private _commonService: CommonService
  ) {}

  ngOnInit() {
    this.literals = this._commonService.getLiterals();
    this.getUserDetails();
    this.turnId = localStorage.getItem('turnId');
    if (!this.turnId) {
      this.activateTurn();
    } else {
      this.getTurnById();
    }
  }

  getTurnById() {
    if (!this.turnId) return;
    this._turnService.getTurnById(this.turnId).subscribe((data: ITurnDto) => {
      this.turn = data;
      this.turnName = data.name || ' ';
      this.currentNumber = data.current_turn || ' ';
      this.updatePendingClientsCount();
      console.log(data);
    });
  }

  async getUserDetails() {
    const user = await this.oktaAuth.getUser();
    this.adminName = user.name || ' ';
  }

  activateTurn() {
    this._turnService.activateTurn().subscribe((data: ITurnDto) => {
      this.turn = data;
      this.turnId = data.id;
      this.turnName = data.name || ' ';
      this.currentNumber = data.current_turn || ' ';
      this.updatePendingClientsCount();
      if (this.turnId) localStorage.setItem('turnId', this.turnId);
    });
  }

  passTurn() {
    this._turnService.passTurn().subscribe((data: ITurnDto) => {
      this.turn = data;
      this.turnName = data.name || ' ';
      this.currentNumber = data.current_turn || ' ';
      this.updatePendingClientsCount();
    });
  }

  updatePendingClientsCount() {
    this.pendingClientsCount = this.turn?.turns?.filter(
      (turno) => turno.status === 'PENDIENTE'
    ).length;
  }

  signOut() {
    localStorage.removeItem('turnId');
    this.oktaAuth.revokeAccessToken();
    this.oktaAuth.closeSession();
  }
}
