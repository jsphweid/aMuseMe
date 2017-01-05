import { Injectable } from '@angular/core';
import { AngularFire, AngularFireAuth, AuthProviders, AuthMethods } from 'angularfire2';

@Injectable()
export class AuthService {
    user: {} = {};
    constructor(public af: AngularFire) {
        this.af.auth.subscribe(user => {
            if (user) { // user logged in
                this.user = user;
            }
            else { // user not logged in
                this.user = {};
            }
        });
    }

    login() {
        this.af.auth.login({
            provider: AuthProviders.Google
        });
    }

    logout() {
        this.af.auth.logout();
    }

    loginAnonymous() {
        this.af.auth.login({
            provider: AuthProviders.Anonymous,
            method: AuthMethods.Anonymous,
        });
        console.log('ttt')
    }


}