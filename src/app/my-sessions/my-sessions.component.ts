import { Component } from '@angular/core';
import { AngularFire, AuthProviders } from 'angularfire2';
import { LoginService } from '../login.service';

@Component({
    selector: 'app-my-session',
    templateUrl: './my-sessions.component.html',
    styleUrls: ['./my-sessions.component.css']
})
export class MySessionsComponent {
    name: string;

    constructor(public af: AngularFire, public loginService: LoginService) {
    }

    login() {
        this.loginService.login();
    }

    logout() {
        this.loginService.logout();
    }

    loginAnonymously() {
        this.loginService.loginAnonymous();
    }

    test() {
        console.log(this.loginService.user);
    }
}