import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../interfaces/order';

@Injectable({
    providedIn: 'root'
})
export class OrderService {
    private apiOrderURL = "http://localhost:3000/ordini";

    constructor(private httpClient: HttpClient) { }

    // REST API methods
    // Create order resti api
    createOrder(order: Order): Observable<Object> {
        return this.httpClient.post(`${this.apiOrderURL}`, order);
    }

    // Delete order rest api
    deleteOrder(orderId: string): Observable<Object> {
        return this.httpClient.delete(`${this.apiOrderURL}/${orderId}`);
    }
}
