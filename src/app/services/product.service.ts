import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ProductService {

    // URL and endpoint
    private apiUrl = "http://localhost:3000/prodotti";

    constructor(private http: HttpClient) { }

    getProducts(): Observable<any> {
        return this.http.get<any>(this.apiUrl);
    }

    getProductsByCategory(category: string): Observable<any[]> {
        const formattedCategory = category.replace(/-/g, ' '); // It converts the '-' character into the space one

        return this.http.get<any[]>(this.apiUrl).pipe(
            map(products =>
                products.filter(p =>
                    p.categoria.toLowerCase() === formattedCategory.toLowerCase()
                )
            )
        );
    }
    // Aggiungere metodo per la conversione del trattino allo spazio
}
