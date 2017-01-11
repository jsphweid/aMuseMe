import { Component, OnInit } from '@angular/core';
import { VotingService } from '../../services/voting.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-question-voting',
    templateUrl: './question-voting.component.html',
    styleUrls: ['./question-voting.component.css']
})
export class QuestionVotingComponent {


    questionSubmitTextArea: string;
    currentSortMethod: string = "freshest";

    constructor(public voter: VotingService, public router: Router) {

    }

    selectTemplate(item) {
        this.router.navigate(['questionVoting'], {queryParams : {template: item.text, bag: this.voter.bag }});
    }
    selectBag(item) {
        this.router.navigate(['questionVoting'], {queryParams : {template: this.voter.template, bag: item.text }});
    }


    submitQuestion() {
        this.voter.currentBag$.push({
            question: this.questionSubmitTextArea,
            votes: 0
        });
        this.questionSubmitTextArea = ""; // make blank
    }

    changeSort(sortMethod) {
        this.voter.currentBag$.subscribe(questions => {
            switch (sortMethod.text) {
                case "mostVotes":
                    this.voter.currentBag = questions.concat([]).sort((a, b) => b.votes - a.votes);
                    this.currentSortMethod = "most votes";
                    break;
                case "leastVotes":
                    this.voter.currentBag = questions.concat([]).sort((a, b) => a.votes - b.votes);
                    this.currentSortMethod = "least votes";
                    break;
                case "freshest":
                    this.voter.currentBag = questions.concat([]).slice().reverse();
                    this.currentSortMethod = "freshest";
                    break;
            };
        });
    }
}
