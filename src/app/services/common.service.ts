import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  title = 'commonTitle';
  description = 'commonDesc';
  option = 'optionDesc';

  constructor() { }
  private _actionModal = new BehaviorSubject<boolean>(false);
  // Observable modal action
  actionModal$ = this._actionModal.asObservable();

  openModal(title: string, description?: string, option?: string) {
    this.title = title;

    if (description) {
      this.description = description;
    } else {
      this.description = '';
    }

    if (option) {
      this.option = option;
    } else {
      this.option = '';
    }

    let modal = document.getElementById('modal') as HTMLElement;
    if (modal) { modal.classList.toggle('hidden'); }
  }

  changeAction(action: boolean) {
    this._actionModal.next(action);
  }

}
