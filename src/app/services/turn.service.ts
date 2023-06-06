import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { EnvService } from '../core/environment/env.service';
import { HttpClient } from '@angular/common/http';
import { ITurnDto } from '../models/turn.interface';

@Injectable({
  providedIn: 'root'
})
export class TurnService {
  private readonly GET_ALL_TURNS_URL = this.env.apiRestDomain + this.env.notificationsContext + '/user/turns'
  private readonly AVTIVATE_TURN_URL = this.env.apiRestDomain + this.env.notificationsContext + '/admin/turn'
  private readonly PASS_TURN_URL = this.env.apiRestDomain + this.env.notificationsContext + '/admin/pass-turn'
  private readonly GET_TURN_URL = this.env.apiRestDomain + this.env.notificationsContext + '/turn'
  private readonly GET_ACTIVATE_TURN_URL = this.env.apiRestDomain + this.env.notificationsContext + '/user/request-turn'
  constructor(private http: HttpClient, private env: EnvService) { }

  getAllTurns() {
    return this.http.get<ITurnDto[]>(this.GET_ALL_TURNS_URL);
  }

  getTurnById(id: string) {
    return this.http.get<ITurnDto>(this.GET_TURN_URL + '/' + id);
  }

  requestTurn(id: string) {
    const params = { turnId: id }

    return this.http.post<ITurnDto>(this.GET_ACTIVATE_TURN_URL, null, { params });
  }

  activateTurn() {
    return this.http.post<ITurnDto>(this.AVTIVATE_TURN_URL, null);
  }

  passTurn() {
    return this.http.post<ITurnDto>(this.PASS_TURN_URL, null);
  }



}
