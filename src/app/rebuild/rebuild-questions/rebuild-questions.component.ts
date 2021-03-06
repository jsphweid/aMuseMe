// import { Component, OnInit } from '@angular/core';
// import { AngularFire, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2';
//
// @Component({
//     selector: 'app-rebuild-questions',
//     templateUrl: './rebuild-questions.component.html',
//     styleUrls: ['./rebuild-questions.component.css']
// })
// export class RebuildQuestionsComponent implements OnInit {
//
//     reference: {} = {
//         story: {
//             questions: {
//                 bag1: [],
//                 userSubmitted: []
//             }
//         },
//         song: {
//             questions: {
//                 bag1: [],
//                 userSubmitted: []
//             }
//         },
//         app: {
//             questions: {
//                 bag1: [],
//                 userSubmitted: []
//             }
//         }
//     };
//
//     storyBag1: any[] = [
//         {
//             question: 'Where are we?',
//             votes: 0
//         },
//         {
//             question: 'Who/What is there?',
//             votes: 0
//         },
//         {
//             question: 'What are they doing?',
//             votes: 0
//         },
//         {
//             question: 'How does this fit into a larger story?',
//             votes: 0
//         },
//         {
//             question: 'What is the conflict?',
//             votes: 0
//         }
//
//     ];
//     storyUserSubmitted: any[] = [
//         {
//             question: 'Describe the setting in extreme detail',
//             votes: 0
//         }
//     ];
//     songBag1: any[] = [
//         {
//             question: 'What is the first chord?',
//             votes: 0
//         },
//         {
//             question: 'What is the key?',
//             votes: 0
//         },
//         {
//             question: 'What is the song about?',
//             votes: 0
//         },
//         {
//             question: 'How would you describe the character of the song?',
//             votes: 0
//         },
//         {
//             quesiton: 'What is the form of the song?',
//             votes: 0
//         }
//     ];
//     songUserSubmited: any[] = [
//         {
//             question: 'What sets this song apart from other songs?',
//             votes: 0
//         }
//     ];
//     appBag1: any[] = [
//         {
//             question: 'Describe the purpose of this app in one sentence.',
//             votes: 0
//         },
//         {
//             question: 'Will this app make money? If so, how?',
//             votes: 0
//         },
//         {
//             question: 'What platform / devices will this app target?',
//             votes: 0
//         },
//         {
//             question: 'What audience will this app target?',
//             votes: 0
//         },
//         {
//             question: 'How long do you expect development to take? With how many people?',
//             votes: 0
//         }
//     ];
//     appUserSubmited: any[] = [
//         {
//             question: 'Is this app sufficiently different from other apps that are similar?',
//             votes: 0
//         }
//     ];
//
//     reference$: FirebaseObjectObservable<any>;
//     referenceList$: FirebaseListObservable<any[]>;
//
//     constructor(public af: AngularFire) {
//         this.reference$ = af.database.object('/reference');
//         this.reference$.remove();
//         this.reference$.update(this.reference);
//
//         this.referenceList$ = af.database.list('/reference/story/questions/bag1');
//         for (let i = 0; i < this.storyBag1.length; i++) {
//             this.referenceList$.push(this.storyBag1[i]);
//         }
//         this.referenceList$ = af.database.list('/reference/story/questions/userSubmitted');
//         for (let i = 0; i < this.storyUserSubmitted.length; i++) {
//             this.referenceList$.push(this.storyUserSubmitted[i]);
//         }
//
//         this.referenceList$ = af.database.list('/reference/song/questions/bag1');
//         for (let i = 0; i < this.songBag1.length; i++) {
//             this.referenceList$.push(this.songBag1[i]);
//         }
//         this.referenceList$ = af.database.list('/reference/song/questions/userSubmitted');
//         for (let i = 0; i < this.songUserSubmited.length; i++) {
//             this.referenceList$.push(this.songUserSubmited[i]);
//         }
//
//         this.referenceList$ = af.database.list('/reference/app/questions/bag1');
//         for (let i = 0; i < this.appBag1.length; i++) {
//             this.referenceList$.push(this.appBag1[i]);
//         }
//         this.referenceList$ = af.database.list('/reference/app/questions/userSubmitted');
//         for (let i = 0; i < this.appUserSubmited.length; i++) {
//             this.referenceList$.push(this.appUserSubmited[i]);
//         }
//     }
//
//     ngOnInit() {
//     }
//
// }
