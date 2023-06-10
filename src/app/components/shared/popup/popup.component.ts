import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css'],
})
export class PopupComponent implements OnInit {
  title: string = '';
  description: string = '';
  option: string = '';
  literals: any;
  constructor(private _commonService: CommonService) {}

  ngOnInit(): void {
    this.literals = this._commonService.getLiterals();
    this.check();
  }

  close() {
    this._commonService.changeAction(false);

    let modal = document.getElementById('modal') as HTMLElement;
    modal.classList.toggle('hidden');
  }

  confirm() {
    this._commonService.changeAction(true);

    let modal = document.getElementById('modal') as HTMLElement;
    modal.classList.toggle('hidden');
  }

  check() {
    this.title = this._commonService.title;
    this.description = this._commonService.description;
    this.option = this._commonService.option;
    return true;
  }
}
