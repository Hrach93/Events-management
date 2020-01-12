import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {EventsType, EventType} from '../../shared/interfaces';
import {EventsService} from '../shared/services/events.service';

@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.scss']
})
export class CreatePageComponent implements OnInit {

  form: FormGroup;
  types: EventsType[]
  constructor(
    private eventsService: EventsService
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(12)
      ]),
      type: new FormControl(null, Validators.required),
      date: new FormControl(null, Validators.required),
      description: new FormControl(null, [
        Validators.required,
        Validators.minLength(30),
        Validators.maxLength(100)
      ])
    });

    this.eventsService.getTypes().subscribe((types: EventsType[]) => {
      this.types = types;
    });
  }
    submit() {
      if (this.form.invalid){
        return;
      }

      const event: EventType = {
          name:  this.form.value.title,
          eventType:  this.form.value.type,
          date:  this.form.value.date,
          description: this.form.value.description
      };

      this.eventsService.createEvent(event).subscribe(() => {
        this.form.reset();
      });
    };
}
