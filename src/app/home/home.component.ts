import { Component, ViewChildren, QueryList, ElementRef, AfterViewInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../interfaces/product';

@Component({
    selector: 'app-home',
    standalone: false,
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})

export class HomeComponent implements AfterViewInit {
    // All references of  <ul> with #scrollContainer
    @ViewChildren('scrollContainer') sliderContainers!: QueryList<ElementRef>;

    disabledLeft: Map<number, boolean> = new Map();
    disabledRight: Map<number, boolean> = new Map();

    ngAfterViewInit() {
        // Inizializza lo stato dei bottoni dopo che la vista è stata caricata
        this.sliderContainers.forEach((ref, index) => {
            this.checkScrollPosition(index, ref.nativeElement);
        });

        console.log('N. sliders:', this.sliderContainers.length);
    }

    constructor(private productService: ProductService) { }

    shoeList: Product[] = [];

    ngOnInit() {
        this.productService.getProducts().subscribe(
            {
                next: (data) => {
                    console.log('Prodotti ricevuti dal servizio:', data);
                    this.shoeList.push(...data);
                    console.log('shoeList popolata:', this.shoeList);
                },
                error: (error) => {
                    console.error('Errore durante il recupero dei prodotti:', error);
                }
            }
        );
    }

    checkScrollPosition(sliderIndex: number, element: HTMLElement) {
        const scrollContentWidth = element.scrollWidth;
        const visibleWidth = element.clientWidth;
        const currentScrollPosition = element.scrollLeft;
        const tolerance = 2; // Aumentiamo la tolleranza a 2px per sicurezza

        // CALCOLO CHIAVE: L'effettivo spazio scrollabile
        const maxScrollPosition = scrollContentWidth - visibleWidth;

        // Condizione: Se il contenuto è troppo piccolo per scorrere (o è un numero negativo)
        const noScrollNeeded = maxScrollPosition <= tolerance;

        // Disattiva il bottone sinistro (Inizio)
        // Disattivato se: (1) Non c'è scroll, OPPURE (2) Si è all'inizio (posizione 0)
        const isAtStart = noScrollNeeded || currentScrollPosition <= tolerance;

        // Disattiva il bottone destro (Fine)
        // Disattivato se: (1) Non c'è scroll, OPPURE (2) La posizione corrente ha raggiunto il massimo
        const isAtEnd = noScrollNeeded || currentScrollPosition >= maxScrollPosition - tolerance;

        // Aggiorna lo stato (se lo slider è in grado di scorrere, il bottone sinistro dovrebbe essere attivato, e il destro disattivato)
        this.disabledLeft.set(sliderIndex, isAtStart);
        this.disabledRight.set(sliderIndex, isAtEnd);

        // DEBUGGING (lascialo finché non funziona)
        console.log(`Slider ${sliderIndex}: Contenuto: ${scrollContentWidth}px, Visibile: ${visibleWidth}px, Max Scroll: ${maxScrollPosition}px, Posizione: ${currentScrollPosition}px`);
        console.log(`Stato: Inizio: ${isAtStart}, Fine: ${isAtEnd}`);
    }

    scroll(sliderIndex: number, direction: 'left' | 'right') {

        const sliderRef = this.sliderContainers.get(sliderIndex);

        if (sliderRef) {
            const element = sliderRef.nativeElement;
            const scrollStep = element.offsetWidth;
            const amount = direction === 'right' ? scrollStep : -scrollStep;

            element.scrollBy({
                left: amount,
                behavior: 'smooth'
            });

            // Controlla la posizione DOPO che l'animazione smooth è terminata (dopo circa 300-400ms)
            setTimeout(() => {
                this.checkScrollPosition(sliderIndex, element);
            }, 400);

        } else {
            console.error(`Slider all'indice ${sliderIndex} non trovato.`);
        }
    }
}