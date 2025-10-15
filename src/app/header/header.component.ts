import { Component } from '@angular/core';

@Component({
    selector: 'app-header',
    standalone: false,
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss'
})
export class HeaderComponent {

    isBlurActive: boolean = false;
    applyBlurBackground() {
        this.isBlurActive = true;
    }

    removeBlurBackground() {
        this.isBlurActive = false;
    }
}
