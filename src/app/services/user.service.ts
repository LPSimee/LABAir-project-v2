import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { UserData } from '../interfaces/userData';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private apiBackendURL = "http://localhost:8080/api/utente";

    constructor(private httpClient: HttpClient) { }

    addNewUser(user: UserData): Observable<Object> {
        return this.httpClient.post(`${this.apiBackendURL}`, user);
    };
}
