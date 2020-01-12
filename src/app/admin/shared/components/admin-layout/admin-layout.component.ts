import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit {
  constructor(
    private router: Router,
    public auth: AuthService,
  ) { }
  user = JSON.parse(localStorage.getItem('user'))
  fullName = this.user ? this.user.name + ' ' + this.user.srName : 'Events Management'
  ngOnInit() {
  }

  logout(event: Event) {
    event.preventDefault();
    this.auth.logout();
    this.router.navigate(['/user', 'login'])
  }
}
