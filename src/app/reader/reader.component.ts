import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2';


@Component({
    selector: 'app-reader',
    templateUrl: './reader.component.html',
    styleUrls: ['./reader.component.css']
})
export class ReaderComponent implements OnInit {

    sessionObservable: FirebaseObjectObservable<any>;
    session: any;

    couldNotFind: boolean = false;;

    sessionKey: string;
    sessionKeySearch: string; // so the data binding doesn't update the view continously

    constructor(public af: AngularFire) { }

    getSession() {
        this.couldNotFind = false;
        console.log('entered key is: ' + this.sessionKey);
        this.sessionObservable = this.af.database.object('/sessions/' + this.sessionKey);
        this.sessionObservable.subscribe(session => {
            if (session.$exists()) {
                console.log('exists man!!!!!!!!!!');
                this.session = session
            } else {
                this.couldNotFind = true;
                this.sessionKeySearch = this.sessionKey;
            }
            this.session = session;
        });
    }

    ngOnInit() { }

}
