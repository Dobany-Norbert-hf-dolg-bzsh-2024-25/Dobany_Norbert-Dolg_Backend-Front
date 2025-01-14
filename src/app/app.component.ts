import { Component, OnDestroy, OnInit } from '@angular/core';
import { BaseService } from './base.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit,OnDestroy {
  title = 'frontend';
  
  datas = [
    {key: 'id', text:'id', type: 'number'},
    {key:'model', text:'model', type:'text'},
    {key:'brand', text:'brand', type:'text'},
    {key:'type', text:'type', type:'text'},
    {key:'price', text:'price', type:'number'},
    {key:'image_url', text:'image_url', type:'url'}
  ]

  products:any
  newProduct:any = {}
  sub!:Subscription
  error=false
  errorText=""  

  constructor(private base: BaseService) {}

  ngOnInit(): void{
    this.getProducts()
  }

  ngOnDestroy(): void {
      if (this.sub) this.sub.unsubscribe()
  }

  getProducts(){
    this.sub=this.base.getProducts().subscribe
    (
      {
        next:(res)=>{
          this.products=res
          this.error=false
        },
        error: (err) =>{
          console.log(err)
          this.error=true
          this.errorText=err.message
        }
      }
    )
  }

  postProduct(){
    this.base.postProducts(this.newProduct).subscribe(
      ()=> {
        this.getProducts()
        this.newProduct={}
      }
    )
  }  

  updateProduct(data:any){
    this.base.putProducts(data).subscribe(
      ()=> this.getProducts()
    )
  }
  
  patchProduct(data:any){
    this.base.patchProducts(data).subscribe((this.getProducts))
  }

  saveProduct(data: any) {
    const isFullUpdate = Object.keys(data).length === this.datas.length;
    
    if (isFullUpdate) {
      this.updateProduct(data);
    } else {
      this.patchProduct(data);
    }
  }

  deleteProduct(data:any){
    this.base.deleteProducts(data).subscribe(
      ()=> this.getProducts()
    )
  }  
}
