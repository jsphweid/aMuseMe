import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { AuthService } from '../../../auth/services/auth.service';
import { qaObject } from '../../shared/interfaces';
import { ActivatedRoute } from '@angular/router';

@Injectable()
export class VotingService {

    template: string;
    templates: any[];

    bags$: FirebaseListObservable<any>;
    bag: string;

    questionBags: any;

    questions$: FirebaseListObservable<any[]>;
    votingObj$: FirebaseObjectObservable<any>;
    votingObj: any;
    voting$: FirebaseListObservable<any>;

    isJoseph: boolean = false;

    currentBag: any[];
    currentBag$: FirebaseListObservable<any>;

    userSubmitted: any;
    isUserSubmitted: boolean;

    constructor(public af: AngularFire, public route: ActivatedRoute, public auth: AuthService) {
        this.route.queryParams.subscribe(params => {
            this.template = params['template'];
            this.bag = params['bag'];
            this.initList();
            this.bags$ = this.af.database.list('/reference/' + this.template + '/questions');
            this.bags$.subscribe(bags => {
                this.questionBags = bags;
            });
        });
        this.questions$ = af.database.list('/reference');
        this.questions$.subscribe(templates => {
            this.templates = templates;
        });
        this.voting$ = af.database.list('/users/' + auth.id + '/voting');
        this.votingObj$ = af.database.object('/users/' + auth.id + '/voting');
        this.votingObj$.subscribe(votingObj => this.votingObj = votingObj);

        // if me
        if (auth.id === "u6W2C7PjGKejWTUTmi6K77fsq5h2") {
            console.log("Welcome, Joseph.");
            this.isJoseph = true;
        }
    }

    handleVote(qKey, value) {
        this.voting$.update(qKey, { voted: this.getVotingRecord(qKey) + value });
    }

    getVotingRecord(key) {
        return this.votingObj[key] ? this.votingObj[key].voted : 0;
    }

    upvote(template, bag, q) {
        let question: FirebaseListObservable<any> = this.af.database.list('/reference/' + template + '/questions/' + bag);
        question.update(q.$key, { votes: q.votes + 1 });
        this.handleVote(q.$key, 1);
    }

    downvote(template, bag, q) {
        let question: FirebaseListObservable<any> = this.af.database.list('/reference/' + template + '/questions/' + bag);
        if (bag === "userSubmitted" && q.votes < -4 && this.currentBag.length > 1) {
            question.remove(q.$key)
        } else {
            question.update(q.$key, { votes: q.votes - 1 });
        }
        this.handleVote(q.$key, -1);
    }

    initList() {
        this.currentBag$ = this.af.database
            .list('reference/' + this.template + '/questions/' + this.bag);
        this.currentBag$.subscribe(questions => {
            this.currentBag = questions.concat([]).slice().reverse();
        });
    }
}

