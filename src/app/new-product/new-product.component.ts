import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit{

  productFormGroup!  : FormGroup;
  constructor(private fb: FormBuilder, public productService : ProductService, private router: Router){}
  ngOnInit(): void {
    this.productFormGroup=this.fb.group({
      name : this.fb.control(null, [Validators.required, Validators.minLength(2)]),
      price : this.fb.control(null, [Validators.required, Validators.minLength(2)]),
      promotion : this.fb.control(false, [Validators.required])
    });
  
  }

  handleAddProduct(){
    //console.log(this.productFormGroup.value);
    let product = this.productFormGroup.value;
    this.productService.addNewProduct(product).subscribe({
      next : (data)=>{
        alert("product added successfully !!!");
        //this.productFormGroup.reset();
        this.router.navigateByUrl("/admin/products")
      }, error: err =>{
        console.log(err);
      }
    })
  }

}
