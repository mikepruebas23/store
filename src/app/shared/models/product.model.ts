export interface Product {
    uid: string;
    photoURL?: string;
    name: string;
    desc: string;
    category: string;
    price: string;
    stock?: number;
    weight?: string;
}