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

    // selectedProduct: Product;

    // ngOninit() {
    //     // Leggiamo lo slug dall'URL
    //     const slug = this.route.snapshot.paramMap.get('slug');
    //     console.log(slug);
    //     if (slug) {
    //         // 🎯 Chiama il servizio cercando per slug/nome
    //         this.productService.getProductByName(slug).subscribe(product => {
    //             this.selectedProduct = product;
    //         });
    //         console.log(this.selectedProduct);
    //     }
    // }
}
