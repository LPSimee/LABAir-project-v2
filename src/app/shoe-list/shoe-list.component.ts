import { Component, HostListener } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../interfaces/product';

@Component({
    selector: 'app-shoe-list',
    standalone: false,
    templateUrl: './shoe-list.component.html',
    styleUrls: ['./shoe-list.component.scss']
})
export class ShoeListComponent {

    constructor(private productService: ProductService) { }

    // List of the products from the service
    productList: Product[] = [];

    ngOnInit() {
        this.productService.getProducts().subscribe(
            {
                next: (data) => {
                    console.log('Prodotti ricevuti dal servizio:', data);
                    this.productList.push(...data);
                    console.log('productList popolata:', this.productList);
                },
                error: (error) => {
                    console.error('Errore durante il recupero dei prodotti:', error);
                }
            }
        );

        // It initialises every state category to false --> category closed
        this.categories.forEach(cat => {
            this.accordionStates[cat.id] = false;
        });
    }

    // Flag to check whether the page header is sticky or not
    isHeaderSticky: boolean = false;

    // Page header will be sticky after 100px
    readonly triggerPoint: number = 100;

    // @HostListener it monitors the scroll event of the window
    @HostListener('window:scroll')
    onScroll() {
        // It updates the flag based on the position every scroll
        this.isHeaderSticky = window.scrollY > this.triggerPoint;
    }

    // Every categories
    categories = [
        { id: 'genere', name: 'Genere', content: 'Contenuto ...' },
        { id: 'acquisto', name: 'Acquista per prezzo', content: 'Contenuto ...' },
        { id: 'sconto', name: 'Sconti e offerte', content: 'Contenuto ...' },
        { id: 'discount', name: 'Product Discounts', content: 'Contenuto ...' },
        { id: 'taglia', name: 'Taglia/Misura', content: 'Contenuto ...' },
        { id: 'colore', name: 'Colore', content: 'Contenuto ...' },
        { id: 'altezza', name: 'Altezza scarpa', content: 'Contenuto ...' },
        { id: 'collezione', name: 'Collezioni', content: 'Contenuto ...' },
        { id: 'sport', name: 'Sport', content: 'Contenuto ...' },
        { id: 'brand', name: 'Brand', content: 'Contenuto ...' },
        // ... N altre categorie
    ];

    // Map used to have all the state of each category
    accordionStates: { [key: string]: boolean } = {};

    isArrowUp: boolean = false;

    // Method to open the category
    toggleAccordion(id: string) {
        this.accordionStates[id] = !this.accordionStates[id];
    }


    // Flag used to show the sort options (Ordina per)
    isSortListVisible: boolean = false;

    // Method to open the sort list
    showSortList(): void {
        this.isSortListVisible = !this.isSortListVisible;
    }

    // Flag used to show the left sidebar
    isSidebarVisible: boolean = true;

    // Method to show the sidebar
    hideSidebar(): void {
        this.isSidebarVisible = !this.isSidebarVisible;
    }
}
