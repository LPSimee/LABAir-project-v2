import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class OrderService {
    private apiOrderURL = "http://localhost:3000/ordini";

    constructor(private httpClient: HttpClient) { }

    // REST API methods
    // Create order resti api
    createOrder(): Observable<Object> {
        return this.httpClient.post(`${this.apiOrderURL}`, 0);
    }

    // Delete order rest api
    deleteOrder(): Observable<Object> {
        return this.httpClient.delete(`${this.apiOrderURL}/${0}`);
    }
}
