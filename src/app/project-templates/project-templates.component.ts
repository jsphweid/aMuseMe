import { Compiler, Component, ViewChild, ElementRef } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from "angularfire2";
import { Router } from '@angular/router';

// TODO: This needs to be refactored so that the modal is separate from this project-templates,
// Which is just the area where the buttons to initialize a new session go

// let runtimeModuleRefPromise: Promise<NgModuleRef<any>>;


@Component({
  selector: 'app-project-templates',
  templateUrl: './project-templates.component.html',
  styleUrls: ['./project-templates.component.css']
})

export class ProjectTemplatesComponent {

	// restart every time stuff
	createQuestions: FirebaseObjectObservable<any>;
	questions: {} = {
		story: {
			questions: {
				bag1: [
					{
						question: 'Where are we?',
						votes: 0
					},
					{
						question: 'Who/What is there?',
						votes: 0	
					},
					{
						question: 'What are they doing?',
						votes: 0	
					}
				]
			}
		},
		song: {
			questions: {
				bag1: [
					{
						question: 'What is the first chord?',
						votes: 0
					},
					{
						question: 'What is the key?',
						votes: 0	
					},
					{
						question: 'What is the song about?',
						votes: 0	
					}
				]
			}
		}
	}


	// firebase stuff
	// currentQuestionsObservable: FirebaseListObservable<any[]>;

	sessionsObservable: FirebaseListObservable<any[]>;
	// referenceObservable: FirebaseObjectObservable<any>;

	// sessionObservable: FirebaseObjectObservable<any>;
	// session:any;

	constructor(public af: AngularFire, private router: Router) {
		this.sessionsObservable = af.database.list('/sessions');

		// resetting, use below
		// this.referenceObservable = af.database.object('/reference');
		// this.referenceObservable.subscribe(reference => {
			// reference = this.questions;
		// });
		// this.referenceObservable.update(this.questions);

	}

	// destroyAndNavigate(template) {

	// 	this.router.navigate(['qasession'], {queryParams : {template: 'song'}})
	// }

	removeSessionsData() {
		this.sessionsObservable.remove();
	}

	templateType: string;
}