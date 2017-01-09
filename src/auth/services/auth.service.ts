import { Injectable } from '@angular/core';
import { AngularFireAuth, AuthProviders, AuthMethods, FirebaseAuth, FirebaseAuthState, AngularFire } from 'angularfire2';

@Injectable()
export class AuthService {
    user: {} = {};
    anonymous: boolean;
    private authState: FirebaseAuthState = null;

    constructor (public auth$: FirebaseAuth, public af: AngularFire) {
        auth$.subscribe((state: FirebaseAuthState) => {
            this.authState = state;
        });
        this.af.auth.subscribe(user => {
            this.user = user ? user : {};
            this.anonymous = user ? user.anonymous : null;
        });
    }

    get authenticated(): boolean {
        return this.authState !== null;
    }

    get id(): string {
        return this.authenticated ? this.authState.uid : '';
    }

    login(): firebase.Promise<FirebaseAuthState> {
        return this.auth$.login({
            provider: AuthProviders.Google
        });
    }

    logout() {
        this.auth$.logout();
    }

    loginAnonymous() {
        this.auth$.login({
            provider: AuthProviders.Anonymous,
            method: AuthMethods.Anonymous,
        });
    }


}