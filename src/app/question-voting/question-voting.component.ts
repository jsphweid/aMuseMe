import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { DropdownModule } from "ng2-dropdown";
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-question-voting',
    templateUrl: './question-voting.component.html',
    styleUrls: ['./question-voting.component.css']
})
export class QuestionVotingComponent implements OnInit {

    templates: any[];
    currentTemplate: string;

    questionsObservable: FirebaseListObservable<any[]>;
    bagObservable: FirebaseListObservable<any>;

    bagObjectObservable: FirebaseObjectObservable<any>;
    userSubmitted: any;

    questionSubmitTextArea: string;

    currentQuestionObservable: FirebaseListObservable<any[]>;
    submitObservable: FirebaseListObservable<any>;
    currentQuestionList: any;

    isUserSubmitted: boolean;
    questionBags: any;

    currentSortMethod: string = "most votes";

    constructor(public af: AngularFire, public route: ActivatedRoute, public router: Router) {
        this.questionsObservable = af.database.list('/reference');
        this.questionsObservable.subscribe(templates => {
            this.templates = templates;
        });
        this.initList();
        this.templateChosen();
    }

    templateChosen() {
        this.route.queryParams.subscribe(queryParams => {
            this.currentTemplate = queryParams['template'];
            this.bagObservable = this.af.database.list('/reference/' + queryParams['template'] + '/questions');
            this.bagObservable.subscribe(bags => {
                this.questionBags = bags;
            });
        });
    }

    ngOnInit() {
    }

    submitQuestion() {
        this.userSubmitted.push({
            question: this.questionSubmitTextArea,
            votes: 0
        });
        this.bagObjectObservable.update(this.userSubmitted);
        this.questionSubmitTextArea = ""; // make blank
    }

    upvote(template, bag, q) {
        let question:FirebaseListObservable<any> = this.af.database.list('/reference/' + template + '/questions/' + bag);
        question.update(q.$key, {votes: q.votes + 1});
    }

    downvote(template, bag, q) {
        let question:FirebaseListObservable<any> = this.af.database.list('/reference/' + template + '/questions/' + bag);
        if (bag === "userSubmitted" && q.votes < -4) {
            question.remove(q.$key)
        } else {
            question.update(q.$key, {votes: q.votes - 1});
        }
    }
    
    initList() {
        this.route.queryParams.subscribe(queryParams => {
            this.currentTemplate = queryParams['template'];
            this.currentQuestionObservable = this.af.database.list('reference/' + 
                        queryParams['template'] + '/questions/' + queryParams['bag']);
            this.currentQuestionObservable.subscribe(questions => {
                this.currentQuestionList = questions.concat([]).sort((a,b) => b.votes - a.votes);
            });
            this.bagObjectObservable = this.af.database.object('reference/' + 
                        queryParams['template'] + '/questions/userSubmitted');
            this.bagObjectObservable.subscribe(bag => {
                this.userSubmitted = bag;
            });
            this.isUserSubmitted = (queryParams['bag'] === "userSubmitted") ? true : false;
        });
    }

    changeSort(sortMethod) {

        this.currentQuestionObservable.subscribe(questions => {

            switch(sortMethod) {
                case "mostVotes":
                    this.currentQuestionList = questions.concat([]).sort((a,b) => b.votes - a.votes);
                    this.currentSortMethod = "most votes";
                    break;
                case "leastVotes":
                    this.currentQuestionList = questions.concat([]).sort((a,b) => a.votes - b.votes);
                    this.currentSortMethod = "least votes";
                    break;
                case "freshest":
                    this.currentQuestionList = questions.concat([]).slice().reverse();
                    this.currentSortMethod = "freshest";
                    break;            
            }
        });        
    }
}
