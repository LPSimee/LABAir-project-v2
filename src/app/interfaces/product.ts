import { productImage } from "./productImage";

export interface Product {
    id: number;
    nome: string;
    categoria: string;
    prezzo: number;

    taglie_disponibili: string[];
    colori: string[];

    descrizione: string;
    immagine: productImage;

    nuovo_arrivi?: boolean;
    best_seller: number;
}
