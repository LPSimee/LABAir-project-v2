import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { LoginData, UserData } from '../interfaces/userData';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private apiBackendURL = "http://localhost:8080/api/utente";

    constructor(private httpClient: HttpClient) { }


    private hfState = new BehaviorSubject<boolean>(false);
    hfState$ = this.hfState.asObservable(); // Header-Footer-State

    setHeaderFooterState(state: boolean) {
        this.hfState.next(state);
    }

    addNewUser(user: UserData): Observable<Object> {
        return this.httpClient.post(`${this.apiBackendURL}/register`, user);
    };

    loginUser(loginCredentials: LoginData): Observable<Object> {
        return this.httpClient.post(`${this.apiBackendURL}/login`, loginCredentials);
    }
}
