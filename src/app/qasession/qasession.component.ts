import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFire, FirebaseObjectObservable } from 'angularfire2';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

@Component({
    selector: 'app-qasession',
    templateUrl: './qasession.component.html',
    styleUrls: ['./qasession.component.css']
})

export class QASessionComponent implements OnInit, OnDestroy {
    sessionObservable: FirebaseObjectObservable<any>;
    session: any;

    templateObservable: FirebaseObjectObservable<any>;
    template: any;

    currentQuestionIndex: number = 0;
    textArea: string = '';
    urlString: string;
    createdKey: string;

    constructor(public af: AngularFire, public route: ActivatedRoute) {
    }

    ngOnInit() {
        console.log("Initialized QA Session");
        this.route.queryParams.subscribe(queryParams => {
            this.sessionObservable = this.af.database.object('/sessions/' + this.createKey());
            this.sessionObservable.subscribe(session => {
                this.session = session.$exists() ? session : {
                    createTime: new Date().getTime(),
                    templateType: queryParams['template'],
                    stash: ['dummydata'],
                    data: ['dummydata']
                }
            });
            this.templateObservable = this.af.database.object('/reference/' + queryParams['template']);
            this.templateObservable.subscribe(template => this.template = template);
        })

    }

    // setInterval // use to stash changes frequently?


    createKey() {
        var ret: string = new Date().getTime().toString();
        ret += Math.random().toString(36).substring(6, 10);
        this.createdKey = ret;
        return ret;
    }

    ngOnDestroy() {
        // stash changes if stuff is still left inside text area on destroy
        this.stash();
        console.log("Destroyed QA Session");
    }

    stash() {
        if (this.textArea) {
            this.sessionObservable = this.af.database.object('/sessions/' + this.createdKey);
            this.sessionObservable.update({
                stash: {
                    textArea: this.textArea,
                    currentQuestionIndex: this.currentQuestionIndex
                }
            });
        }
    }


    questionSubmit() {
        if (!this.currentQuestionIndex) {
            this.sessionObservable.update(this.session);
            this.session.data = []; // fix dummydata
        }
        this.session.data.push({
            question: this.template.questions.bag1[this.currentQuestionIndex],
            answer: this.textArea
        })
        this.sessionObservable.update({ data: this.session.data })
        this.currentQuestionIndex++

        // erase area and refocus
        this.textArea = '';
        document.getElementById('answer').focus();
    }
}
