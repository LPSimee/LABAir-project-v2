import { Injectable } from '@angular/core';
import { LoginData, LoginResponse, UserData } from '../interfaces/userData';
import { Observable, tap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private readonly TOKEN_KEY = 'jwt_token';
    private apiBackendURL = 'http://localhost:8080/api/v1/auth';

    constructor(private httpClient: HttpClient) {}

    setToken(token: string): void {
        localStorage.setItem(this.TOKEN_KEY, token);
    }

    getToken(): string | null {
        return localStorage.getItem(this.TOKEN_KEY);
    }

    removeToken(): void {
        localStorage.removeItem(this.TOKEN_KEY);
    }

    isLoggedIn(): boolean {
        return !!this.getToken();
    }

    registerUser(user: UserData): Observable<Object> {
        return this.httpClient.post(`${this.apiBackendURL}/register`, user);
    }

    loginUser(loginCredentials: LoginData): Observable<LoginResponse> {
        return this.httpClient
            .post<LoginResponse>(
                `${this.apiBackendURL}/authenticate`,
                loginCredentials,
            )
            .pipe(tap((response) => this.setToken(response.token)));
    }

    logout() {
        this.removeToken();
    }

    getProfile() {
        const token = this.getToken();

        const headers = new HttpHeaders({
            Authorization: `Bearer ${token}`,
        });

        return this.httpClient.get(`${this.apiBackendURL}/profile`, {
            headers,
        });
    }
}
