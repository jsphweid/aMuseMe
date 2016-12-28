import { Compiler, Component, Injector, TemplateRef, ViewChild, NgModuleRef, ViewContainerRef } from '@angular/core';
import { AngularFire, FirebaseListObservable } from "angularfire2";
import { Overlay, overlayConfigFactory } from 'angular2-modal';
import { Modal, BSModalContext } from 'angular2-modal/plugins/bootstrap';
import { CustomModalComponent } from '../custom-modal/custom-modal.component';

// import { ModalCommandDescriptor } from '../../demo-head/index';
// import { CustomModal } from './custom-modal-sample';
// import * as presets from '../presets';

// import { RuntimeCompiledModule, RuntimeCompiledComponent } from './runtime-compiled';

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
		overlay: Overlay,
		vcRef: ViewContainerRef,
		public af: AngularFire,
		public customModal: CustomModalComponent,
			) {
		overlay.defaultViewContainer = vcRef;
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
