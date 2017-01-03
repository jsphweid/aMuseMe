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
	// createQuestions: FirebaseObjectObservable<any>;
	// questions: {} = {
	// 	story: {
	// 		questions: {
	// 			bag1: [
	// 				'Where are we?',
	// 				'Who/What is there?',
	// 				'What are they doing?'
	// 			]
	// 		}
	// 	},
	// 	song: {
	// 		questions: {
	// 			bag1: [
	// 				'What\'s the first chord?',
	// 				'What is the key?',
	// 				'What is the song about?'
	// 			]
	// 		}
	// 	}
	// }


	// firebase stuff
	// currentQuestionsObservable: FirebaseListObservable<any[]>;

	sessionsObservable: FirebaseListObservable<any[]>;

	// sessionObservable: FirebaseObjectObservable<any>;
	// session:any;

	constructor(public af: AngularFire, private router: Router) {
		this.sessionsObservable = af.database.list('/sessions');
	}

	// destroyAndNavigate(template) {

	// 	this.router.navigate(['qasession'], {queryParams : {template: 'song'}})
	// }

	removeSessionsData() {
		this.sessionsObservable.remove();
	}

	templateType: string;
}