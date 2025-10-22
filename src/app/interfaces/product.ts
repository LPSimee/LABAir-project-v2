export interface Product {
    id: number;
    nome: string;
    categoria: string;
    prezzo: number;

    taglie: string[];
    colori: string[];

    descrizione: string;
    immagineUrl: string;

    nuovo_arrivi?: boolean;
    best_seller: number;
}
