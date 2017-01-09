import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { DropdownModule } from "ng2-dropdown";
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

    submitQuestion() {
        this.voter.currentBag$.push({
            question: this.questionSubmitTextArea,
            votes: 0
        });
        this.questionSubmitTextArea = ""; // make blank
    }

    changeSort(sortMethod) {
        this.voter.currentBag$.subscribe(questions => {
            switch (sortMethod) {
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
