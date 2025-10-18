import { Component } from '@angular/core';

@Component({
    selector: 'app-header',
    standalone: false,
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss'
})
export class HeaderComponent {

    // variables to apply blur effect on background when hovering over header links
    isBlurActive: boolean = false;
    applyBlurBackground() {
        this.isBlurActive = true;
    }

    removeBlurBackground() {
        this.isBlurActive = false;

    }

    isSearchBarActive: boolean = false;
    showSearchBar() {
        this.isSearchBarActive = true;
        this.isBlurActive = true;
    }

    hideSearchBar() {
        this.isSearchBarActive = false;
        this.isBlurActive = false;
    }

    searchInputValue: string = '';
    isDeleteButtonVisible: boolean = false;
    showDeleteButton() {
        this.isDeleteButtonVisible = true;
    }

    deleteInputValue() {
        this.searchInputValue = '';
        this.isDeleteButtonVisible = false;
    }
}
