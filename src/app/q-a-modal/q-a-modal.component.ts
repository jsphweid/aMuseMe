import { Component, OnInit } from '@angular/core';
import { ModalModule } from "ng2-modal";

@Component({
  selector: 'app-q-a-modal',
  templateUrl: './q-a-modal.component.html',
  styleUrls: ['./q-a-modal.component.css']
})
export class QAModalComponent implements OnInit {

  constructor() { }

  myModal: string = "myModal";


  ngOnInit() {
  }

}
