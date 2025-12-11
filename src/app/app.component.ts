import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    standalone: false,
    styleUrl: './app.component.scss'
})
export class AppComponent {
    title = 'lab-air-prova-2';

    isBlurActive = false;

    onBlurChange(value: boolean) {
        this.isBlurActive = value;
    }
}
