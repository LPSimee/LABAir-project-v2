import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { ProductFilters } from '../interfaces/productFilters';
import { Product } from '../interfaces/product';
@Injectable({
    providedIn: 'root'
})
export class ProductService {

    // URL and enpoint
    private apiUrl = "http://localhost:3000/prodotti";

    constructor(private http: HttpClient) { }

    // HTTP method used to get all products from the json file without any query params
    getProducts(): Observable<Product[]> {
        return this.http.get<any>(this.apiUrl);
    }

    getProductBySlug(slug: string): Observable<Product | undefined> {
        // 1. Trasformiamo lo slug (trattini -> spazi)
        const nomeDaCercare = this.convertDashToSpace(slug);
        console.log(nomeDaCercare);
        return this.getProducts().pipe(
            map(products => products.find(p =>
                // 2. Cerchiamo la corrispondenza esatta
                p.nome.toLowerCase() === nomeDaCercare
            ))
        );
    }

    // HTTP method used to get the products from the json file based on the query params (category, newProduct, Featured , sortBy --> asc or desc)
    getProductsByFilter(filters: ProductFilters): Observable<any[]> {
        return this.http.get<any[]>(this.apiUrl).pipe(
            map(products => {

                let result = [...products];

                // CATEGORY
                if (filters.category) {
                    const formatted = this.convertDashToSpace(filters.category);
                    result = result.filter(p =>
                        p.categoria.toLowerCase() === formatted.toLowerCase()
                    );
                }

                // if (filters.newProduct) {
                //     result = result.filter(p => p.nuovo_arrivi === true);
                // }
                // BRAND (nel nome)
                // if (filters.brand) {
                //     const formatted = filters.brand.replace(/-/g, ' ').toLowerCase();
                //     result = result.filter(p =>
                //         p.nome.toLowerCase().includes(formatted)
                //     );
                // }
                // sorting options
                if (filters.sortBy) {
                    // By newest product
                    if (filters.sortBy === 'newest') {
                        result.sort((a, b) => {
                            const aNew = a.nuovo_arrivi ? 1 : 0;
                            const bNew = b.nuovo_arrivi ? 1 : 0;
                            return bNew - aNew; // I nuovi vengono prima
                        });
                    }

                    // Ascending price
                    if (filters.sortBy === 'priceAsc') {
                        result.sort((a, b) => a.prezzo - b.prezzo);
                    }

                    // Descending price
                    if (filters.sortBy === 'priceDesc') {
                        result.sort((a, b) => b.prezzo - a.prezzo);
                    }
                }

                return result;
            })
        );
    }

    // Method used to convert the '-' character into the space one
    convertDashToSpace(term: string): string {
        return term.replaceAll(/-/g, ' ');
    }

    convertSpaceToDash(term: string): string {
        return term.replaceAll(' ', '-');
    }
}
