import { Component, HostListener } from '@angular/core';

@Component({
    selector: 'app-shoe-list',
    standalone: false,
    templateUrl: './shoe-list.component.html',
    styleUrls: ['./shoe-list.component.scss']
})
export class ShoeListComponent {
    // Variabile di stato che controlla l'applicazione della classe CSS 'sticky'
    isHeaderSticky: boolean = false;
    // Soglia di scorrimento: l'intestazione si rimpicciolisce dopo 150px
    readonly triggerPoint: number = 100;

    // Dati simulati per popolare la griglia (35 prodotti)
    products = Array(35).fill(0).map((_, i) => ({
        id: i + 1,
        nome: `Prodotto ${i + 1}`,
        prezzo: 129.99
    }));

    // 🎯 @HostListener monitora l'evento di scorrimento sulla finestra
    @HostListener('window:scroll')
    onScroll() {
        // Aggiorna lo stato in base alla posizione di scorrimento
        this.isHeaderSticky = window.scrollY > this.triggerPoint;
    }


    // Quando prendo le scarpe li metto su un vettore e prendo la sua length come numero di scarpe totali per la lista delle scarpe
}