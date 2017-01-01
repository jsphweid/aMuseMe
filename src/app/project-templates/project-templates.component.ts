import { Compiler, Component, ViewChild, ElementRef } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from "angularfire2";

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
	sessionsList: any[];

	sessionObservable: FirebaseListObservable<any[]>;
	sessionList: any[];

	constructor(public af: AngularFire) {
		this.createQuestions = af.database.object('/reference');
		this.sessionsObservable = af.database.list('/sessions');
		// erase all
		this.createQuestions.remove();
		this.sessionsObservable.remove();
		// re-establish this every time... for now...
		this.createQuestions.set(this.questions);

		// establish observable <--> list subscription
		this.sessionsObservable.subscribe((session) => {
            this.sessionsList = session.concat([]);
        })


	}


	// changes with square button selection
	templateType: string;
	// puts in specific questions to load
	bag1Questions: any[];
	currentQuestionIndex: number;
	sessionKey: string;
	textArea: string = "";
	dataObservable: FirebaseListObservable<any[]>;
	dataList: any[];
	inputting: boolean = true;
	

	// bind 'myModal' to modal
	@ViewChild('myModal') modal: any;

	startModal(templateType) {
		this.templateType = templateType;
		this.textArea = "";

		// start with quesiton 0
		this.currentQuestionIndex = 0;
		
		// get bag1 questions
		this.currentQuestionsObservable = this.af.database.list('/reference/' + templateType + '/questions/bag1');
		this.currentQuestionsObservable.subscribe(bag1 => {
			this.bag1Questions = bag1.concat([]);
		});
		// create new session
		this.sessionsObservable.push({
			"createTime": new Date().getTime(),
			"templateType": templateType
		}).then((item) => {
			this.sessionKey = item.key;

			// change pointer (?) of observable inside data // is this right????
			this.sessionObservable = this.af.database.list('/sessions/' + item.key);
			this.sessionObservable.subscribe(t => {
				this.sessionList = t.concat([]);
			});
		});
		
		this.modal.open();
	}

	questionSubmit() {
		console.log(this.sessionList)
		// submit
		let i = this.currentQuestionIndex;
		let pushObj = {};
		pushObj[i] = {  "question": this.bag1Questions[i].$value,
						"answer": this.textArea.replace(/(?:\r\n|\r|\n)/g, '<br />')
					};
		this.sessionObservable.update('data', pushObj);

		// erase text area and refocus
		this.textArea = "";
		document.getElementById('answer').focus();

		// advance
		if (this.currentQuestionIndex < this.bag1Questions.length - 1) {
			this.currentQuestionIndex++;
		} else {
			this.inputting = false;
		}

		if (!this.dataObservable) {
			this.dataObservable = this.af.database.list('/sessions/' + this.sessionKey + '/data');
			this.dataObservable.subscribe(data => {
				this.dataList = data.concat([]);
			});
		}

	}

	closeModal() {
		this.dataList = undefined; // i have to do this or else [scrollTop]="scrollMe.scrollHeight" screws it up
		this.modal.close()
	}

}