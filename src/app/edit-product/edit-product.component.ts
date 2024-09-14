import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { throwError } from 'rxjs';
import { Product } from '../model/product.model';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit{
  productFormGroup!  : FormGroup;
  productId! : string;
  product! : Product;

  constructor(private route: ActivatedRoute, public productService : ProductService,
              private fb : FormBuilder,
              private router : Router){
    this.productId=this.route.snapshot.params['id'];
  }
  ngOnInit(): void {
    this.productService.getProduct(this.productId).subscribe({
      next : (product)=>{
        this.product=product;
        this.productFormGroup=this.fb.group({
          name : this.fb.control(this.product.name, [Validators.required, Validators.minLength(2)]),
          price : this.fb.control(this.product.price , [Validators.required, Validators.minLength(2)]),
          promotion : this.fb.control(this.product.promotion, [Validators.required])
        });
      },
      error : (err) => {
        console.log(err);
      }
    });
   
  }

  handleUpdateProduct(){
    //console.log(this.productFormGroup.value);
    let p = this.productFormGroup.value;
    p.id=this.product.id;
    this.productService.updateProduct(p).subscribe({
      next : (data)=>{
        let conf = confirm("Do u want update");
        if(conf==false) return;
        alert('product updated successfully !!!');
        this.productFormGroup.reset();
        this.router.navigateByUrl("/admin/products")
      }, error: err =>{
        console.log(err);
      }
    })
  }

}
