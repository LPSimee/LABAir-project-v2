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
    // All references of <ul> with #scrollContainer
    @ViewChildren('scrollContainer') sliderContainers!: QueryList<ElementRef>;

    nClicksSlider: number[] = [7, 5, 3];

    disabledLeft: Map<number, boolean> = new Map();
    disabledRight: Map<number, boolean> = new Map();

    ngAfterViewInit() {
        // Timeout cruciale per attendere il rendering di tutti e 3 gli slider
        setTimeout(() => {
            // Ciclare sulla QueryList
            this.sliderContainers.forEach((ref: ElementRef, index: number) => {
                const element = ref.nativeElement;

                element.scrollLeft = 0;
                // Chiama la logica di controllo per ogni slider
                this.checkScrollPosition(index, element);
            });
        }, 100);
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
        const sliderRef = this.sliderContainers.get(sliderIndex); // Utilizza sliderContainers per recuperare il riferimento

        if (sliderRef) {
            const element = sliderRef.nativeElement;

            // 1. **RECUPERO IL NUMERO DI CLICK SPECIFICO**
            // Per il primo slider (indice 0) otterrà 7, per il secondo (indice 1) otterrà 5, ecc.
            const totalClicks = this.nClicksSlider[sliderIndex];

            if (totalClicks === undefined || totalClicks <= 0) {
                console.error(`Numero di click non valido per lo slider all'indice ${sliderIndex}`);
                return;
            }

            // 2. Calcola lo spazio massimo scrollabile
            const scrollableDistance = element.scrollWidth - element.clientWidth;

            // 3. Definisci il passo di scorrimento (un "click" fisso)
            // La distanza per ogni click sarà: Spazio Totale / Numero di Click
            const scrollStep = scrollableDistance / totalClicks;

            // 4. Determina l'importo da scorrere
            const amount = direction === 'right' ? scrollStep : -scrollStep;

            // 5. Esegui lo scorrimento
            element.scrollBy({
                left: amount,
                behavior: 'smooth'
            });

            // 6. Controlla la posizione DOPO che l'animazione smooth è terminata
            setTimeout(() => {
                this.checkScrollPosition(sliderIndex, element);
            }, 400);
        }
    }
}