import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

// AngularFire
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';

// bootstrap
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// Modal Modules
import { ModalModule } from 'ng2-modal'
// DropdownModule
import { DropdownModule } from "ng2-dropdown";

// Login Service
import { AuthService } from '../auth/services/auth.service';
import { LogInOutComponent } from '../auth/components/log-in-out/log-in-out.component'


import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { ProjectTemplatesComponent } from './project-templates/project-templates.component';
import { QASessionComponent } from './qasession/qasession.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ReaderComponent } from './reader/reader.component';
import { RecreatorComponent } from './app.component';
import { QuestionVotingComponent } from './question-voting/question-voting.component';
import { MySessionsComponent } from './my-sessions/my-sessions.component';

export const firebaseConfig = {
    apiKey: "AIzaSyAhK6cZF-p6UW8OI0saGRPxEJ1YvIkv8jI",
    authDomain: "amuseme-19626.firebaseapp.com",
    databaseURL: "https://amuseme-19626.firebaseio.com",
    storageBucket: "amuseme-19626.appspot.com",
    messagingSenderId: "570604792009"
};

const myFirebaseAuthConfig = {
    // provider: AuthProviders.Google,
    method: AuthMethods.Redirect
};


@NgModule({
    declarations: [
        AppComponent,
        WelcomeComponent,
        ProjectTemplatesComponent,
        QASessionComponent,
        SidebarComponent,
        ReaderComponent,
        RecreatorComponent,
        QuestionVotingComponent,
        MySessionsComponent,
        LogInOutComponent
    ],
    imports: [
        BrowserModule,
        CommonModule,
        HttpModule,
        ModalModule,
        DropdownModule,
        AngularFireModule.initializeApp(firebaseConfig, myFirebaseAuthConfig),
        FormsModule,
        RouterModule.forRoot([
            { path: 'welcome', component: WelcomeComponent },
            { path: 'qasession', component: QASessionComponent },
            { path: 'reader', component: ReaderComponent },
            { path: 'recreator', component: RecreatorComponent },
            { path: 'questionVoting', component: QuestionVotingComponent },
            { path: 'mySessions', component: MySessionsComponent },
            { path: '', redirectTo: 'welcome', pathMatch: 'full' },
            { path: '**', redirectTo: 'welcome', pathMatch: 'full' }
        ])
    ],
    providers: [AuthService],
    bootstrap: [AppComponent]
})
export class AppModule { }
