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
// moment
import { MomentModule } from "angular2-moment"; // amTimeAgo, but where the hell does that get introduced????


// Login Service
import { AuthService } from '../auth/services/auth.service';
import { LogInOutComponent } from '../auth/components/log-in-out/log-in-out.component'

// pipes
import { ReversePipe } from './shared/pipes';

import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { QASessionComponent } from './qasession/components/qasession.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ReaderComponent } from './shared/reader/reader.component';
import { RecreatorComponent } from './app.component';
import { QuestionVotingComponent } from './voting/components/question-voting/question-voting.component';
import { MySessionsComponent } from './my-sessions/my-sessions.component';
import { NotAuthenticatedComponent } from './errors.component';
import { RebuildQuestionsComponent } from './rebuild/rebuild-questions/rebuild-questions.component';

import { AuthGuard } from '../auth/guards/auth-guard';
import { UnauthGuard } from '../auth/guards/unauth-guard';

import { QasessionService } from './qasession/services/qasession.service';
import { VotingService } from './voting/services/voting.service';

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
        QASessionComponent,
        SidebarComponent,
        ReaderComponent,
        RecreatorComponent,
        QuestionVotingComponent,
        MySessionsComponent,
        LogInOutComponent,
        NotAuthenticatedComponent,
        ReversePipe,
        RebuildQuestionsComponent
    ],
    imports: [
        BrowserModule,
        CommonModule,
        HttpModule,
        ModalModule,
        DropdownModule,
        MomentModule,
        AngularFireModule.initializeApp(firebaseConfig, myFirebaseAuthConfig),
        FormsModule,
        RouterModule.forRoot([
            { path: 'welcome', component: WelcomeComponent },
            { path: 'qasession', component: QASessionComponent, canActivate: [AuthGuard] },
            { path: 'recreator', component: RecreatorComponent },
            { path: 'questionVoting', component: QuestionVotingComponent, canActivate: [AuthGuard] },
            { path: 'mySessions', component: MySessionsComponent, canActivate: [AuthGuard] },
            { path: 'notAuthenticated', component: NotAuthenticatedComponent },
            { path: 'rebuildQuestions', component: RebuildQuestionsComponent },
            { path: '', redirectTo: 'welcome', pathMatch: 'full' },
            { path: '**', redirectTo: 'welcome', pathMatch: 'full' }
        ])
    ],
    providers: [
        AuthService,
        QasessionService,
        AuthGuard,
        UnauthGuard,
        VotingService
        ],
    bootstrap: [AppComponent]
})
export class AppModule { }
