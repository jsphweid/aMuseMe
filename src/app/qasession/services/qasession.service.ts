import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { AuthService } from '../../../auth/services/auth.service';
import { qaObject } from '../../shared/interfaces';

@Injectable()
export class QasessionService {

    userPath: string;
    sessions$: FirebaseListObservable<any>;
    abort: boolean = false;

    reference$: FirebaseObjectObservable<any>;
    bagList$: FirebaseListObservable<any[]>;
    bagList: any[];
    reference: any;
    askingQuestions: boolean;

    session$: FirebaseObjectObservable<any>;
    session: any;
    sessionKey: string;
    template: string;
    answeredQuestions: string[] = [];
    askedQuestions: string[] = [];

    bagOrder: string[] = [
        'bag1',
        'userSubmitted'
    ]

    // defaults
    currentQuestionIndex: number = 0;
    currentBag: string = "bag1"

    constructor(public af: AngularFire, auth: AuthService) {
        this.userPath = '/users/' + auth.id + '/sessions';
        this.sessions$ = af.database.list(this.userPath);
        this.reference$ = af.database.object('/reference');
        this.reference$.subscribe(ref => {
            this.reference = ref;
        });
    }

    connectBagList(template: string, bag: string) {
        this.bagList$ = this.af.database
            .list('/reference/' + template + '/questions/' + bag);
        if (bag === 'userSubmitted') {
            this.bagList$.subscribe(bagInc => {
                this.bagList = bagInc.concat([]).sort((a, b) => b.votes - a.votes);
            });
        } else {
            this.bagList$.subscribe(bagInc => {
                this.bagList = bagInc.concat([])
            });
        }
    }

    createNewSession(template: string) {
        this.currentBag = this.bagOrder[0];
        this.template = template;
        this.currentQuestionIndex = 0;
        this.sessions$.push({
            createTime: new Date().getTime() / 1000,
            templateType: template
        }).then(item => { // get key
            this.sessionKey = item.key;
            this.session$ = this.af.database.object(this.userPath + '/' + item.key); // update observable
            this.session$.subscribe(session => this.session = session); // could this go in the constructor?
        });
        this.connectBagList(template, this.currentBag);
        this.askingQuestions = true;
    }

    useExistingSession(key: string, callback) {
        this.session$ = this.af.database.object(this.userPath + '/' + key);
        this.session$.subscribe(session => { // why is this beingcalled after deleteSession()
            if (!this.abort) { // abort workaround
                this.session = session;
                this.template = session.templateType;
                this.currentBag = session.stash.currentBag;
                this.askedQuestions = session.stash.askedQuestions;
                this.answeredQuestions = session.stash.answeredQuestions;
                this.currentQuestionIndex = session.stash.currentQuestionIndex;
                this.connectBagList(session.templateType, session.stash.currentBag);
                callback(this.session.stash.textArea, this.session.title, this.session.data)
            }
        });
    }

    stash(text: string, titleInc: string) {
        this.session$.update({
            title: titleInc,
            stash: {
                textArea: text.replace(/(?:\r\n|\r|\n)/g, '<br />'),
                currentQuestionIndex: this.currentQuestionIndex,
                currentBag: this.currentBag,
                askedQuestions: this.askedQuestions,
                answeredQuestions: this.answeredQuestions
            }
        });
    }

    getNextBag(currentBag): any {
        let i = this.bagOrder.indexOf(currentBag);
        if (this.bagOrder[i + 1]) {
            return this.bagOrder[i + 1];
        } else {
            return false;
        }
    }

    answered(key) {
        return (this.answeredQuestions.indexOf(key) !== -1);
    }

    getNextQuestion(_nQK?) {
        // another question in this bag?
        if (this.bagList[this.currentQuestionIndex + 1]) {
            let nQK = this.bagList[this.currentQuestionIndex + 1].$key;
            if (this.answered(nQK)) {
                console.log(this.bagList[this.currentQuestionIndex + 1].question);
                if (_nQK !== nQK) this.getNextQuestion(nQK); // already answered? go on...
            }
            this.currentQuestionIndex++;
        } else {
            // go to next bag, if there is one
            let next = this.getNextBag(this.currentBag);
            if (next) {
                this.currentBag = next;
                this.currentQuestionIndex = 0;
                this.connectBagList(this.template, this.currentBag);
            } else {
                this.askingQuestions = false;
            }
        }
    }

    questionSubmit(text: string, titleInc: string): qaObject[] {
        // make everything shorter to write
        let i = this.currentQuestionIndex;
        let currentQObject = this.bagList[i];
        // add asked question to asked and/or answered arrays
        if (text !== "") this.answeredQuestions.push(currentQObject.$key);
        this.askedQuestions.push(currentQObject.$key);

        // store the question and answer in session
        if (!this.session.data) this.session.data = [];
        this.session.data.push({
            question: currentQObject.question,
            answer: text.replace(/(?:\r\n|\r|\n)/g, '<br />')
        })
        this.session$.update({
            data: this.session.data,
            title: titleInc
        });

        // get next question
        this.getNextQuestion();

        return this.session.data;
    }

    deleteSession() {
        this.abort = true;
        const sessToDelete$ = this.af.database.list(this.userPath);
        sessToDelete$.remove(this.sessionKey);

    }
}
