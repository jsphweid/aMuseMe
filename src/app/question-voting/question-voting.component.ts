import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { DropdownModule } from "ng2-dropdown";
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-question-voting',
    templateUrl: './question-voting.component.html',
    styleUrls: ['./question-voting.component.css']
})
export class QuestionVotingComponent implements OnInit {

    templates: any[];

    questionsObservable: FirebaseListObservable<any[]>;
    bagObservable: FirebaseListObservable<any[]>;

    questionSubmitTextArea: string;

    currentQuestionObservable: FirebaseListObservable<any[]>;
    currentQuestionList: any;


    questionBags: any;

    constructor(public af: AngularFire, public route: ActivatedRoute, public router: Router) {
        this.questionsObservable = af.database.list('/reference');
        this.questionsObservable.subscribe(templates => {
            this.templates = templates;
        });
    }

    templateChosen() {
        this.route.queryParams.subscribe(queryParams => {
            this.bagObservable = this.af.database.list('/reference/' + queryParams['template'] + '/questions');
            this.bagObservable.subscribe(bags => {
                this.questionBags = bags;
            });
        });
    }

    ngOnInit() {
    }

    submitQuestion() {
        // this.questionSubmitTextArea

        this.questionSubmitTextArea = ""; // make blank
    }

    upvote(a, b) {
        
    }
    
    initList() {
        this.route.queryParams.subscribe(queryParams => {
            this.currentQuestionObservable = this.af.database.list('reference/' + 
                        queryParams['template'] + '/questions/' + queryParams['bag']);
            this.currentQuestionObservable.subscribe(questions => {
                this.currentQuestionList = questions.concat([]);
            });
        })
    }
}
