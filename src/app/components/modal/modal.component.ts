import { Component, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  @Output() closeEvent: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {

  }
  close() {
    this.closeEvent.emit(null);
  }
}
