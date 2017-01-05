import { Component } from '@angular/core';
import { AngularFire, AuthProviders } from 'angularfire2';
import { AuthService } from '../../auth/services/auth.service';

@Component({
    selector: 'app-my-session',
    templateUrl: './my-sessions.component.html',
    styleUrls: ['./my-sessions.component.css']
})
export class MySessionsComponent {
    name: string;

    constructor(public af: AngularFire, public loginService: AuthService) {
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