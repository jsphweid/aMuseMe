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
        this.reference$.subscribe(ref => {
            this.reference = ref;
        });
    }

    connectBagList(template, bag) {
        this.bagList$ = this.af.database.list('/reference/' + template + '/questions/' + bag);
        this.bagList$.subscribe(bagInc => this.bagList = bagInc.concat([]));
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
        this.connectBagList(template, this.currentBag);
    }

    useExistingSession(key, callback) {
        this.session$ = this.af.database.object(this.userPath + '/' + key);
        this.session$.subscribe(session => { // why is this beingcalled after deleteSession()
            if (!this.abort) { // abort workaround
                this.session = session;
                this.template = session.templateType;
                this.currentBag = session.stash.currentBag;
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
                currentBag: this.currentBag
            }
        });
    }

    questionSubmit(text: string, titleInc: string): qaObject[] {
        if (!this.session.data) this.session.data = [];
        this.session.data.push({
            question: this.bagList[this.currentQuestionIndex].question,
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
        this.abort = true;
        const sessToDelete$ = this.af.database.list(this.userPath);
        sessToDelete$.remove(this.sessionKey);
        
    }
}
