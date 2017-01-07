import { Component, Input, ViewChild } from '@angular/core';
import { qaObject } from '../../shared/interfaces';
import { ReversePipe } from '../pipes';


@Component({
    selector: 'app-reader',
    templateUrl: './reader.component.html',
    styleUrls: ['./reader.component.css']
})
export class ReaderComponent {


    // simply displays an array of question and answers

    constructor() {}

    @Input() data: qaObject[];
    @Input() title: string;

    SelectText() {
        var el = <HTMLElement>document.getElementById('allQA'),
            doc = document,
            range,
            selection;

        if (window.getSelection) {
            selection = window.getSelection();
            range = document.createRange();
            range.selectNodeContents(el);
            selection.removeAllRanges();
            selection.addRange(range);
        }
    }

}
