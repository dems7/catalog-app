import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, FormBuilder} from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from '../model/product.model';
import { AuthenticationService } from '../services/authentication.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products! : Array<Product> ;
  currentPage : number=0;
  PageSize : number=5;
  totalPages : number=0;
  errorMessage! : String;
  searchFormGroup! : FormGroup;
  currentAction : String = "all";

  constructor(private productService : ProductService,
               private fb : FormBuilder,
               public authService : AuthenticationService,
               private router: Router){}

  ngOnInit(): void { 
    this.searchFormGroup=this.fb.group({
      keyword : this.fb.control(null)
    });
      //this.handleGetAllProduct();
      this.handleGetPageProducts();
  }

  handleNewProduct(){
    this.router.navigateByUrl("/admin/newProduct")
  }

  handleEditProduct(p : Product){
    this.router.navigateByUrl("/admin/editProduct/"+p.id)
  }

  handleGetPageProducts(){ 
    this.productService.getPageProducts(this.currentPage, this.PageSize).subscribe({
      next : (data)=>{
        this.products=data.products;
        this.totalPages=data.totalPages;
        
      },
      error : (err)=> {
        this.errorMessage=err;
      }
    });
  }


  handleGetAllProduct(){
    this.productService.getAllProducts().subscribe({
      next : (data)=>{
        this.products=data; 
      },
      error : (err)=> {
        this.errorMessage=err;
      }
    });
  }

  handleDeleteProduct(p: Product){
    let conf=confirm("Are you sure?");
    if (conf==false) return;
    this.productService.deleteProduct(p.id).subscribe({
      next : (data)=>{
        //this.handleGetAllProduct(); 
        let index = this.products.indexOf(p);
        this.products.splice(index,1);
      },
      error : (err)=> {
        this.errorMessage=err;
      }
    })
  }

  handleSetPromotion(p: Product){
    this.productService.setPromotion(p.id).subscribe({
      next : (data) =>{
        return true;
      },
      error : err => {
        this.errorMessage=err;
      }
    })
  }

  handleSearchProducts(){
    this.currentAction="search";
    this.currentPage=0;
    let keyword=this.searchFormGroup.value.keyword;
    this.productService.searchProducts(keyword, this.currentPage, this.PageSize).subscribe({
      next :(data)=>{
        this.products=data.products;
        this.totalPages=data.totalPages
      }  
    })
  } 

  gotoPage(i : number){
    this.currentPage=i;
    if(this.currentAction=='all')
      this.handleGetPageProducts();
    else 
      this.handleSearchProducts();
  }

}
