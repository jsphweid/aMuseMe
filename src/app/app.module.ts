import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

// AngularFire
import { AngularFireModule } from 'angularfire2';

// bootstrap
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// Modal Modules

import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { AboutComponent } from './about/about.component';
import { ProjectTemplatesComponent } from './project-templates/project-templates.component';
import { CustomModalComponent } from './custom-modal/custom-modal.component';

export const firebaseConfig = {
    apiKey: "AIzaSyAhK6cZF-p6UW8OI0saGRPxEJ1YvIkv8jI",
    authDomain: "amuseme-19626.firebaseapp.com",
    databaseURL: "https://amuseme-19626.firebaseio.com",
    storageBucket: "amuseme-19626.appspot.com",
    messagingSenderId: "570604792009"
};


@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    AboutComponent,
    ProjectTemplatesComponent,
    CustomModalComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig),
    FormsModule,
    RouterModule.forRoot([
      { path: 'welcome', component: WelcomeComponent },
      { path: 'about', component: AboutComponent },
      { path: '', redirectTo: 'welcome', pathMatch: 'full' },
      { path: '**', redirectTo: 'welcome', pathMatch: 'full' }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
