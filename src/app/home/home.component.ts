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
    // All references of  <ul> with #widgetContent
    @ViewChildren('scrollContainer') sliderContainers!: QueryList<ElementRef>;

    ngAfterViewInit() {
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



    scroll(sliderIndex: number, direction: 'left' | 'right') {

        // In order to access the correct slider, we use the index
        const sliderRef = this.sliderContainers.get(sliderIndex);

        if (sliderRef) {
            const element = sliderRef.nativeElement;

            const scrollStep = element.offsetWidth;

            const amount = direction === 'right' ? scrollStep : -scrollStep;

            console.log(`Scrolling slider ${sliderIndex} by ${amount}px. Current width: ${scrollStep}`);

            element.scrollBy({
                left: amount,
                behavior: 'smooth'
            });
        } else {
            console.error(`Slider all'indice ${sliderIndex} non trovato.`);
        }
    }
}