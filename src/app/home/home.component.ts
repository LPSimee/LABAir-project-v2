import { Component, ViewChildren, QueryList, ElementRef, AfterViewInit } from '@angular/core';

@Component({
    selector: 'app-home',
    standalone: false,
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})

export class HomeComponent implements AfterViewInit {
    // All references of  <ul> with #widgetContent
    @ViewChildren('widgetContent') sliderContainers!: QueryList<ElementRef>;

    ngAfterViewInit() {
        console.log('N. sliders:', this.sliderContainers.length);
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