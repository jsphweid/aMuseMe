import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { AuthService } from '../../../auth/services/auth.service';
import { qaObject } from '../../shared/interfaces';

@Injectable()
export class QasessionService {

    userPath: string;
    sessions$: FirebaseListObservable<any>;

    reference$: FirebaseObjectObservable<any>;
    reference: any;

    session$: FirebaseObjectObservable<any>;
    session: any;
    sessionKey: string;
    template: string;

    // defaults
    currentQuestionIndex: number = 0;
    currentBag: string = "bag1"

    constructor(public af: AngularFire, auth: AuthService) {
        this.userPath = '/sessions/' + auth.id;
        this.sessions$ = af.database.list(this.userPath);
        this.reference$ = af.database.object('/reference');
        this.reference = this.reference$.subscribe(ref => {
            this.reference = ref;
        });
    }

    createNewSession(template) {
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
    }

    useExistingSession() {
    }

    stash(text: string, titleInc: string) {
        this.session$.update({
            title: titleInc,
            stash: {
                textArea: text.replace(/(?:\r\n|\r|\n)/g, '<br />'),
                currentQuestionIndex: this.currentQuestionIndex
            }
        });
    }

    questionSubmit(text: string, titleInc: string): qaObject[] {
        if (!this.session.data) this.session.data = [];
        this.session.data.push({
            question: this.reference[this.template].questions[this.currentBag][this.currentQuestionIndex].question,
            answer: text.replace(/(?:\r\n|\r|\n)/g, '<br />')
        })
        this.session$.update({
            data: this.session.data,
            title: titleInc
        });
        this.currentQuestionIndex++;
        return this.session.data;
    }

    deleteSession() {
        const sessToDelete$ = this.af.database.list(this.userPath);
        sessToDelete$.remove(this.sessionKey);
    }
}
