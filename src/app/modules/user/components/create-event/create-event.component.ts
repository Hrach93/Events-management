import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EventsType, Event } from '../../../../interfaces/interfaces';
import { EventsService } from '../../../../services/events.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss']
})
export class CreateEventComponent implements OnInit {

  public form: FormGroup;
  public selected: string;
  public types: EventsType[];
  @Input() editMode = false;
  @Input() eventData: Event;
  @Output() edited: EventEmitter<any> = new EventEmitter();

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private eventsService: EventsService
  ) { }

  ngOnInit() {
    this.editMode || this.initForm();
    this.editMode && this.initForm(this.eventData);
    this.eventsService.getTypes().subscribe((types: EventsType[]) => {
      this.types = types;
    });
  }

  initForm(event: any = {}) {
    this.form = this.fb.group({
      name: [event.name, [Validators.required, Validators.minLength(3), Validators.maxLength(12)]],
      eventType: [event.type, Validators.required],
      date: [event.date, Validators.required],
      description: [event.description, [Validators.required, Validators.minLength(30), Validators.maxLength(100)]]
    });
    event.eventType && (this.selected = event.eventType);
  }

  onOptionsSelected(val) {
    console.log(val);
    this.selected = val;
  }

  submit() {
    if (this.form.invalid) {
      return;
    }
    if (this.editMode) {
      return this.eventsService.editEvent(this.eventData.id, this.form.value).subscribe(res => {
        this.edited.emit();
      });
    }
    this.eventsService.createEvent(this.form.value).subscribe(() => {
      this.router.navigate(['']);
    });
  }
}
