export interface Product{
    id : String;
    name : String;
    price : number;
    promotion : boolean;
}

export interface PageProduct{
    products : Product[];
    page : number;
    size : number;
    totalPages: number;
}