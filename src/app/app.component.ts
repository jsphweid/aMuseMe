import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'app works!';
}

@Component({
    template: ''
})
export class RecreatorComponent {
    templateName: string;
    constructor(private router: Router, public route: ActivatedRoute) {
        // get info from url
        this.route.queryParams.subscribe(queryParams => {
            this.templateName = queryParams['template'];
        });
        // send it along with the information
        this.router.navigate(['qasession'], {queryParams : {template: this.templateName}})
    }
}