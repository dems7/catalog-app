import { Injectable } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { UUID } from 'angular2-uuid';
import { Observable, of, throwError } from 'rxjs';
import { PageProduct, Product } from '../model/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private products! : Array<Product>;
  constructor() { 
    this.products=[
      {id:UUID.UUID(), name:"computer", price : 6500, promotion : true},
      {id:UUID.UUID(), name:"xbox", price : 1500, promotion : false},
      {id:UUID.UUID(), name:"smart phone", price : 2000, promotion : true}, 
    ];
    for (let i = 0; i <10 ; i++){
      this.products.push( {id:UUID.UUID(), name:"computer", price : 6500, promotion : true});
      this.products.push({id:UUID.UUID(), name:"smart phone", price : 2000, promotion : true});
      this.products.push({id:UUID.UUID(), name:"smart phone", price : 2000, promotion : false}, )
    }
  }


  public getAllProducts() : Observable<Array<Product>>{
    let random=Math.random();
    if(random<0.1) return throwError(()=>new Error("connexion error!"));
    else return of(this.products);
  }  
  public getPageProducts(page : number, size : number) : Observable<PageProduct>{
  let index = page*size;
  let totalPages = ~~(this.products.length/size);
   if(this.products.length % size !=0)
    totalPages++;
    let pageProducts = this.products.slice(index, index+size);
    return of({page:page, size:size, totalPages:totalPages, products:pageProducts});
  }

  //technique: remplacer un tableau de produits par un autre sans le produit dont l'id est choisis
  public deleteProduct(id: String) : Observable<boolean>{
    this.products=this.products.filter(p=>p.id!=id);
    return of(true);
  }

  public setPromotion(id: String) : Observable<boolean>{
    let product = this.products.find(p=>p.id==id);
    if(product !=undefined){
      product.promotion=!product.promotion;
      return of(true);
    } else return throwError(()=>new Error("product not found"));
  }

  public searchProducts(keyword : string, page : number, size : number) : Observable<PageProduct>{
   let result = this.products.filter(p=>p.name.includes(keyword));
   let index = page*size;
  let totalPages = ~~(result.length/size);
   if(this.products.length % size !=0)
    totalPages++;
    let pageProducts = result.slice(index, index+size);
    return of({page:page, size:size, totalPages:totalPages, products:pageProducts});
  } 

  public addNewProduct(product : Product) : Observable <Product>{
    product.id = UUID.UUID();
    this.products.push(product);
    return of(product);
  }

  public updateProduct(product: Product) : Observable <Product>{
    this.products=this.products.map(p=>(p.id==product.id)?product:p)
    return of(product);
  }

  public getProduct(id : string) : Observable <Product>{
    let product = this.products.find(p => p.id==id);
    if(product ==undefined) return throwError (()=> new Error("product not found"));
    return of(product);
  }

  
  getErrorMessage(fieldName: string, error: ValidationErrors){
    if(error['required']){
      return fieldName+' is required';
    }
    else if(error['minlength']){
      return fieldName+' should have at least '+error['minlength']['requiredLength']+' characteres'
    }
    else return "soum wadji eh";
  }
}
