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

    ngOnInit(): void {
        // Recupera il parametro dall'URL ('nike-air-force-1')
        const param = this.route.snapshot.paramMap.get('slug');
        console.log(param); // 'nike-air-force-1'
        if (param) {
            this.productService.getProductBySlug(param).subscribe({
                next: (product) => {
                    this.selectedProduct = product;
                    console.log('Prodotto trovato: ' + this.selectedProduct);
                    console.log(this.selectedProduct.taglie_disponibili);
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
}
