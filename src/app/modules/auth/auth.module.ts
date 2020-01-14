import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared.module';

const routes: Routes = [
  {
    path: '',
    children: [{
      path: 'login',
      component: LoginComponent
    }]
  }
];

@NgModule({
    declarations: [
      LoginComponent
    ],
    imports: [
      SharedModule,
      ReactiveFormsModule,
      RouterModule.forChild(routes)
    ],
    exports: [],
    providers: [],
    bootstrap: []
  })
export class AuthModule { }
