import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventsComponent } from './components/events/events.component';
import { SharedModule } from '../shared.module';
import { AdminLayoutComponent } from './components/admin-layout/admin-layout.component';
import { CreateEventComponent } from './components/create-event/create-event.component';
import { ModalComponent } from '../../components/modal/modal.component';
import { PaginationComponent } from '../../components/pagination/pagination.component';
import { EventsService } from '../../services/events.service';

const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      {
        path: '',
        component: EventsComponent
      },
      {
        path: 'events/create',
        component: CreateEventComponent
      }
  ]
  }
];

@NgModule({
    declarations: [
      ModalComponent,
      EventsComponent,
      PaginationComponent,
      CreateEventComponent,
      AdminLayoutComponent
    ],
    imports: [
      SharedModule,
      RouterModule.forChild(routes)
    ],
    exports: [],
    providers: [EventsService],
    bootstrap: []
  })
export class AuthModule { }
