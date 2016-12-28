import { Component } from '@angular/core';

import { DialogRef, ModalComponent, CloseGuard } from 'angular2-modal';
import { BSModalContext } from 'angular2-modal/plugins/bootstrap/index';

export class CustomModalContext extends BSModalContext {
  public num1: number;
  public num2: number;
}

@Component({
  selector: 'app-custom-modal',
  providers: [DialogRef],
  templateUrl: './custom-modal.component.html',
  styleUrls: ['./custom-modal.component.css']
})
export class CustomModalComponent implements CloseGuard, ModalComponent<CustomModalContext> {

  context: CustomModalContext;

  public wrongAnswer: boolean;
  public shouldUseMyClass: boolean;

  constructor(public dialog: DialogRef<CustomModalContext>) {
    this.context = dialog.context;
    this.wrongAnswer = true;
    dialog.setCloseGuard(this);
  }

  onKeyUp(value) {
    this.wrongAnswer = value != 5;
    this.dialog.close();
  }

  beforeDismiss(): boolean {
    return true;
  }

  beforeClose(): boolean {
    return this.wrongAnswer;
  }

}