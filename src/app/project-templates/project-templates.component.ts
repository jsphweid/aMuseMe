import { Compiler, Component, Injector, TemplateRef, ViewChild, NgModuleRef, ViewContainerRef } from '@angular/core';
import { AngularFire, FirebaseListObservable } from "angularfire2";

import { CustomModalComponent } from '../custom-modal/custom-modal.component';

let runtimeModuleRefPromise: Promise<NgModuleRef<any>>;


@Component({
  selector: 'app-project-templates',
  providers: [CustomModalComponent],
  templateUrl: './project-templates.component.html',
  styleUrls: ['./project-templates.component.css']
})
export class ProjectTemplatesComponent {

	// firebase stuff
	reference: FirebaseListObservable<any>;
	

	constructor(
		public af: AngularFire,
		public customModal: CustomModalComponent,
			) {
		this.reference = af.database.list('reference');
		
	}

	startModal(modalType) {
		this.customModal.context;
	}

	data: any = {
		'song': {
			'title': 'Song',
      		'displayText': 'You picked song!',
      		'fBaseQuestionsArray': []
    	},
    	'story': {
			'title': 'Story',
			'displayText': 'You picked a story. Let\'s write a story!',
			'fBaseQuestionsArray': []
		}
    };
}
