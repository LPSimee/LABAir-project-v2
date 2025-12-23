import { Component } from '@angular/core';
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
                    console.log('Prodotto trovato');
                    console.log(this.selectedProduct);
                    console.log(this.selectedProduct.immagine);
                },
                error: (err) => {
                    console.error('Prodotto non trovato', err);
                    // Qui potresti reindirizzare alla pagina 404
                }
            });
        }
    }
}
