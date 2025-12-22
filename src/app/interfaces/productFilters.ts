export interface ProductFilters {
    category?: string;
    name?: string;
    // brand?: string;
    // newProduct?: boolean;
    sortBy?: 'newest' | 'priceAsc' | 'priceDesc';
}