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
					'Where are we?',
					'Who/What is there?',
					'What are they doing?'
				]
			}
		},
		song: {
			questions: {
				bag1: [
					'What\'s the first chord?',
					'What is the key?',
					'What is the song about?'
				]
			}
		}
	}


	// firebase stuff
	currentQuestionsObservable: FirebaseListObservable<any[]>;

	sessionsObservable: FirebaseListObservable<any[]>;

	sessionObservable: FirebaseObjectObservable<any>;
	session:any;

	constructor(public af: AngularFire, private router: Router) {
		// this.createQuestions = af.database.object('/reference');
		this.sessionsObservable = af.database.list('/sessions');
		// erase all
		// this.createQuestions.remove();
		// this.sessionsObservable.remove();
		// re-establish this every time... for now...
		// this.createQuestions.set(this.questions);

		// establish observable <--> list subscription

	}

	removeSessionsData() {
		this.sessionsObservable.remove();
	}

	// changes with square button selection
	templateType: string;
	// puts in specific questions to load
	// bag1Questions: any[];
	// currentQuestionIndex: number;
	// sessionKey: string;
	// textArea: string = "";
	// inputting: boolean = true;
	

	// // bind 'myModal' to modal
	// @ViewChild('myModal') modal: any;

	// startModal(templateType) {
	// 	this.templateType = templateType;
	// 	this.textArea = "";

	// 	// start with quesiton 0
	// 	this.currentQuestionIndex = 0;
		
	// 	// get bag1 questions
	// 	this.currentQuestionsObservable = this.af.database.list('/reference/' + templateType + '/questions/bag1');
	// 	this.currentQuestionsObservable.subscribe(bag1 => {
	// 		this.bag1Questions = bag1.concat([]);
	// 	});
	// 	// create new session
	// 	this.sessionsObservable.push({
	// 		"createTime": new Date().getTime(),
	// 		"templateType": templateType
	// 	}).then((item) => {
	// 		this.sessionKey = item.key;

	// 		// change pointer (?) of observable inside data // is this right????
	// 		this.sessionObservable = this.af.database.object('/sessions/' + item.key);
	// 		this.sessionObservable.subscribe(session => this.session = session);
	// 	});
		
	// 	this.modal.open();
	// }

	// questionSubmit() {
	// 	// submit
	// 	let i = this.currentQuestionIndex;
	// 	if (!this.session.data) this.session.data = [];
	// 	this.session.data.push({ 
	// 		 "question": this.bag1Questions[i].$value,
	// 		 "answer": this.textArea.replace(/(?:\r\n|\r|\n)/g, '<br />')
	// 	});
	// 	this.sessionObservable.update({data: this.session.data});

	// 	// erase text area and refocus
	// 	this.textArea = "";
	// 	document.getElementById('answer').focus();

	// 	// advance
	// 	if (this.currentQuestionIndex < this.bag1Questions.length - 1) {
	// 		this.currentQuestionIndex++;
	// 	} else {
	// 		this.inputting = false;
	// 	}

	// }

	// closeModal() {
	// 	this.session = undefined;
	// 	// this.dataList = undefined; // i have to do this or else [scrollTop]="scrollMe.scrollHeight" screws it up
	// 	this.modal.close()
	// }

}