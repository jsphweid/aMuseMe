import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service'

@Component({
  selector: 'app-log-in-out',
  templateUrl: './log-in-out.component.html',
  styleUrls: ['./log-in-out.component.css']
})
export class LogInOutComponent implements OnInit {

  constructor(public authService: AuthService) { }

  ngOnInit() {
  }
  googleLogin() {
    this.authService.login();
  }
  anonymousLogin() {
    this.authService.loginAnonymous();
  }
}
