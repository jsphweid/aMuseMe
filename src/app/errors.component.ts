import { Component } from '@angular/core';

@Component({
    template: `
        <h1>Sorry</h1>
        <h4>It appears you are not authenticated</h4>
        <h4>Login at the top-right using google or anonymously and try again.</h4>
    `
})
export class NotAuthenticatedComponent {
    constructor() {}
}