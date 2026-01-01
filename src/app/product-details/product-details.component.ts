import { Component, HostListener } from '@angular/core';
import { ProductService } from '../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../interfaces/product';

@Component({
    selector: 'app-product-details',
    standalone: false,
    templateUrl: './product-details.component.html',
    styleUrl: './product-details.component.scss'
})

export class ProductDetailsComponent {
    // Get the specific shoe from the service
    constructor(private route: ActivatedRoute, private productService: ProductService) { }

    selectedProduct: Product;
    defaultImage: string = "";
    selectedColorImages: string[] = [];
    defaultColorway: string = "bianco";
    selectedColorway: string = "";

    ngOnInit(): void {
        // Recupera il parametro dall'URL ('nike-air-force-1')
        const nameParam = this.route.snapshot.paramMap.get('slug');
        console.log(nameParam); // 'nike-air-force-1'

        const colorParam = this.route.snapshot.paramMap.get('color');
        console.log(colorParam);

        if (nameParam) {
            this.productService.getProductBySlug(nameParam).subscribe({
                next: (product) => {
                    this.selectedProduct = product;
                    this.defaultImage = this.selectedProduct.immagine.cover;
                    console.log('Prodotto trovato: ', this.selectedProduct);
                    // console.log(this.selectedProduct.taglie_disponibili);
                    if (colorParam) {
                        this.selectedColorImages = this.selectedProduct.immagine[colorParam] as string[]; // It sets the images of the selected colorway
                        this.selectedColorway = colorParam;
                    } else {
                        this.selectedColorImages = this.selectedProduct.immagine[this.defaultColorway] as string[];
                    }
                    // console.log("Immagini delle scarpe di colore nero: " + this.selectedColorImages);
                    console.log("qua " + this.selectedProduct.immagine[this.selectedColorway]);
                    console.log("qua " + this.selectedProduct.colori_disponibili);


                },
                error: (err) => {
                    console.error('Prodotto non trovato', err);
                    // Qui potresti reindirizzare alla pagina 404
                }
            });
        }
    }

    showShoeSize(size: string): void {
        console.log(size);
    }

    // Flag to check whether the page header is sticky or not
    isImageGallerySticky: boolean = false;

    // Page header will be sticky after 100px
    readonly triggerPoint: number = 100;

    // @HostListener it monitors the scroll event of the window
    @HostListener('window:scroll')
    onScroll() {
        // It updates the flag based on the position every scroll
        this.isImageGallerySticky = window.scrollY > this.triggerPoint;
    }


    showImageUrl(srcRilevato: string): void {
        console.log("Ho catturato questo src:", srcRilevato);
    }

    selectThumbnailtImage(nuovoSrc: string) {
        // Se l'immagine è già quella selezionata, non fare nulla
        if (this.defaultImage === nuovoSrc) return;

        this.defaultImage = nuovoSrc;

        // Facciamo ripartire l'animazione
        //   this.animazioneAttiva = false;
        //   setTimeout(() => this.animazioneAttiva = true, 10); 
    }

    getProductSlug(name: string): string {
        return this.productService.convertSpaceToDash(name).toLowerCase();
    }
}
