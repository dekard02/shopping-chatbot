export interface Product {
    id: string;
    name: string;
    description: string;
    category: string;
    color: string;
    sizes: string[];
    price: number;
    occasions: string[];
    image: string;
    url: string;
    soldCount: number;
}