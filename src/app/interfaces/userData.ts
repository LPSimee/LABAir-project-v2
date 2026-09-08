export interface UserData {
    nome: string;
    cognome: string;
    email: string;
    password: string;
    data_nascita: string;
}

export interface LoginData {
    email: string;
    password: string;
}

export interface LoginResponse {
    token: string;
}
