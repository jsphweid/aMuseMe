import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFire, FirebaseObjectObservable } from 'angularfire2';
import { ActivatedRoute, Router, NavigationEnd, Route } from '@angular/router';
import { QasessionService } from '../services/qasession.service';
import { qaObject } from '../../shared/interfaces';
import { ReaderComponent } from '../../shared/reader/reader.component';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
    selector: 'app-qasession',
    templateUrl: './qasession.component.html',
    styleUrls: ['./qasession.component.css']
})

export class QASessionComponent implements OnInit, OnDestroy {

    sessionKey: string; // if this comes in, it's already been created
    templateType: string;
    textArea: string = '';
    qaData: qaObject[];
    titleValue: string = "";
    stashIt: boolean = true;
    isAnonymous: boolean;

    constructor(public route: ActivatedRoute, public router: Router, public qaService: QasessionService, public auth: AuthService) {
        this.isAnonymous = auth.anonymous;
    }

    ngOnInit() {
        this.sessionKey = this.route.snapshot.queryParams['sessionKey'];
        this.templateType = this.route.snapshot.queryParams['template'];
        if (this.sessionKey) {
            this.qaService.useExistingSession(this.sessionKey, (textArea, titleValue, data) => {
                this.textArea = textArea;
                this.titleValue = titleValue;
                this.qaData = data;
            });
        } else { 
            this.qaService.createNewSession(this.templateType);
        }
    }


    ngOnDestroy() {
        if (this.stashIt) this.qaService.stash(this.textArea, this.titleValue);
    }

    next() {
        this.qaData = this.qaService.questionSubmit(this.textArea, this.titleValue);
        // erase area and refocus
        this.textArea = '';
        document.getElementById('answer').focus();
    }

    deleteSession() {
        this.stashIt = false;
        this.exitSession();
        this.qaService.deleteSession();
    }

    exitSession() {
        this.router.navigate(['welcome']);
    }
}
