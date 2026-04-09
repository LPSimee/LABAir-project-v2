import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../interfaces/order';
import { CartService } from './cart.service';

@Injectable({
    providedIn: 'root'
})
export class OrderService {
    private apiOrderURL = "http://localhost:3000/ordini";

    constructor(private httpClient: HttpClient, private cartService: CartService) { }

    // REST API methods
    // Get all orders rest api
    getAllOrders(): Observable<Order[]> {
        return this.httpClient.get<Order[]>(this.apiOrderURL);
    }

    // Get order by id rest api
    getOrderById(orderId: string): Observable<Order> {
        return this.httpClient.get<Order>(`${this.apiOrderURL}/${orderId}`);
    }

    // Create order resti api
    createOrder(order: Order): Observable<Object> {
        return this.httpClient.post(`${this.apiOrderURL}`, order);
    }

    // Modify order rest api
    modifyOrder(orderId: string, modifiedOrder: Order): Observable<Object> {
        return this.httpClient.put(`${this.apiOrderURL}/${orderId}`, modifiedOrder);
    }

    // Delete order rest api
    deleteOrder(orderId: string): Observable<Object> {
        return this.httpClient.delete(`${this.apiOrderURL}/${orderId}`);
    }

    // Method to place the order
    placeNewOrder(finalizedObj: Order) {
        finalizedObj.id = this.generateOrderId(finalizedObj);

        this.createOrder(finalizedObj).subscribe({
            next: () => this.cartService.emptyCart(),
            error: (err) => console.log("Errore:", err)
        });
    }

    // Method used to generate the order id
    generateOrderId(order: Order): string {
        let numberId = "";

        for (let i = 0; i < 4; i++) {
            numberId += Math.floor(Math.random() * 9);
        }

        return `ordine-${order.utente.name.charAt(0).toLocaleLowerCase()}${order.utente.surname.charAt(0).toLocaleLowerCase()}-${numberId}-${order.dataOrdine}`;
    }
}
