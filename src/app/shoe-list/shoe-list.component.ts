import { Component, EventEmitter } from '@angular/core';


@Component({
    selector: 'app-shoe-list',
    standalone: false,
    templateUrl: './shoe-list.component.html',
    styleUrl: './shoe-list.component.scss'
})
export class ShoeListComponent {
    // Chiamare il servizio per ottenere la lista delle scarpe in qualche modo applicare pure un parametro per il filtro
}
