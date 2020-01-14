import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit {

  public user = JSON.parse(localStorage.getItem('user'));
  public fullName = this.user ? this.user.name + ' ' + this.user.srName : 'Events Management';
  public isAdminUser: boolean;

  constructor(
    private router: Router,
    public auth: AuthService,
  ) { }

  ngOnInit() {
    this.isAdminUser = JSON.parse(localStorage.getItem('user')).isAdmin;
  }

  public logout(event: Event) {
    event.preventDefault();
    this.auth.logout();
    this.router.navigate(['/auth', 'login']);
  }
}
