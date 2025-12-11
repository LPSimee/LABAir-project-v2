import { Component, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'app-header',
    standalone: false,
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss'
})
export class HeaderComponent {

    @Output() blurChange = new EventEmitter<boolean>();

    onMenuOpen() {
        this.blurChange.emit(true);
    }

    onMenuClose() {
        this.blurChange.emit(false);
    }

    // variables to apply blur effect on background when hovering over header links
    isBlurActive: boolean = false;
    applyBlurBackground() {
        // this.isBlurActive = true;
        this.onMenuOpen();
    }

    removeBlurBackground() {
        // this.isBlurActive = false;
        this.onMenuClose();
    }

    isSearchBarActive: boolean = false;
    showSearchBar() {
        this.isSearchBarActive = true;
        // this.isBlurActive = true;
        this.onMenuOpen();
    }

    hideSearchBar() {
        this.isSearchBarActive = false;
        // this.isBlurActive = false;
        this.onMenuClose();
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
