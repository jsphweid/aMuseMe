import { Component } from '@angular/core';
import { AngularFire, AuthProviders, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2';
import { AuthService } from '../../auth/services/auth.service';
import { qaObject } from '../shared/interfaces';
import { Router } from '@angular/router';

@Component({
    selector: 'app-my-session',
    templateUrl: './my-sessions.component.html',
    styleUrls: ['./my-sessions.component.css']
})
export class MySessionsComponent {
    
    sessions$: FirebaseListObservable<any>;
    sessions: any[];
    selectedSession$: FirebaseObjectObservable<any[]>;
    selectedSession: any;
    selectedSessionKey: string;
    titleValue: string;

    userPath: string;
    qaData: qaObject[];

    constructor(public af: AngularFire, public auth: AuthService, public router: Router) {
        this.userPath = '/sessions/' + auth.id;
        this.sessions$ = af.database.list(this.userPath);
        this.sessions$.subscribe(sessions => {
            this.sessions = sessions.concat([]).sort((a,b) => b.createTime - a.createTime)
        });
    }

    openReader(key) {
        window.scrollTo(0, 0); // make sure it is at the top every time
        this.selectedSession$ = this.af.database.object(this.userPath + '/' + key);
        this.selectedSession$.subscribe(session => {
            this.selectedSession = session;
        });
        this.qaData = this.selectedSession.data;
        this.titleValue = this.selectedSession.title;
        this.selectedSessionKey = key;
    }

    deleteSession(key) {
        const sessToDelete$ = this.af.database.list(this.userPath);
        sessToDelete$.remove(key);
    }

    openEditor(key) {
        this.router.navigate(['qasession'], {queryParams : {sessionKey: key}})
    }
}