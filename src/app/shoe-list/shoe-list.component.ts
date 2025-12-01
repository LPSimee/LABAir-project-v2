import { Component, ElementRef, HostListener, QueryList, ViewChildren } from '@angular/core';
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

        // Inizializza tutti gli stati a 'false' (chiuso)
        this.categories.forEach(cat => {
            this.accordionStates[cat.id] = false;
        });
    }

    // Variabile di stato che controlla l'applicazione della classe CSS 'sticky'
    isHeaderSticky: boolean = false;
    // Soglia di scorrimento: l'intestazione si rimpicciolisce dopo 150px
    readonly triggerPoint: number = 100;

    // 🎯 @HostListener monitora l'evento di scorrimento sulla finestra
    @HostListener('window:scroll')
    onScroll() {
        // Aggiorna lo stato in base alla posizione di scorrimento
        this.isHeaderSticky = window.scrollY > this.triggerPoint;
    }

    // 1. I tuoi dati: la lista di sezioni da visualizzare
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

    // 2. La mappa per tracciare lo stato: { 'sport': false, 'musica': false, ... }
    accordionStates: { [key: string]: boolean } = {};

    isArrowUp: boolean = false;
    // 3. La funzione generica per fare il toggle di una singola sezione
    toggleAccordion(id: string) {
        this.accordionStates[id] = !this.accordionStates[id];
    }


    isSortListVisible: boolean = false;

    showSortList(): void {
        this.isSortListVisible = !this.isSortListVisible;
    }

    isSidebarVisible: boolean = true;

    hideSidebar(): void {
        this.isSidebarVisible = !this.isSidebarVisible;
    }
}
