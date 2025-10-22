export interface Product {
    id: number;
    nome: string;
    categoria: string;
    prezzo: number;

    taglie: string[];
    colori: string[];

    immagineUrl: string;

    nuovo_arrivo?: boolean;
    best_seller: number;
}
