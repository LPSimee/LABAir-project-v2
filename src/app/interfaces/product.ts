export interface Product {
    id: number;
    nome: string;
    categoria: string;
    prezzo: number;

    taglie_disponibili: string[];
    colori: string[];

    descrizione: string;
    immagine: string;

    nuovo_arrivi?: boolean;
    best_seller: number;
}
