import { Component, ViewContainerRef } from '@angular/core';
import { Overlay } from 'angular2-modal';
import { Modal } from 'angular2-modal/plugins/bootstrap';

@Component({
  selector: 'app-project-templates',
  templateUrl: './project-templates.component.html',
  styleUrls: ['./project-templates.component.css']
})
export class ProjectTemplatesComponent {

	constructor(overlay: Overlay, vcRef: ViewContainerRef, public modal: Modal) {
		overlay.defaultViewContainer = vcRef;
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

	test() {
		console.log('hi there');
	}

	startModal(modalType) {
    	this.modal.alert()
        	.size('lg')
        	.showClose(true)
        	.title(this.data[modalType].title + ' Q & A')
        	.body(`
				<h2>Instructions</h2>
				<p>${this.data[modalType].displayText}</p>
            	`)
			.okBtn('Ok')
        	.open();
	}
}
