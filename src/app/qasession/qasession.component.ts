import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFire, FirebaseObjectObservable } from 'angularfire2';
import { ActivatedRoute } from '@angular/router';

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
    constructor(public af: AngularFire, public route: ActivatedRoute) { }

    ngOnInit() {
        console.log("Initialized");
        this.route.queryParams.subscribe(queryParams => {
            this.sessionObservable = this.af.database.object('/sessions/' + new Date().getTime());
            this.sessionObservable.subscribe(session => {
                this.session = session.$exists() ? session : {
                        "createTime": new Date().getTime(),
                        "templateType": queryParams['template'],
                        data: ['dummydata']
                }
            });

            this.templateObservable = this.af.database.object('/reference/' + queryParams['template']);
            this.templateObservable.subscribe(template => this.template = template);
        })

    }

    ngOnDestroy() {
        console.log("Destroyed");
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
        this.textArea = '';
    }
}
