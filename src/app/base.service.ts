import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class BaseService {
  private url = 'http://localhost:3000/products/';

  constructor(private http: HttpClient) {}

  getProducts(){
    return this.http.get(this.url)
  }

  getProduct(data:any){
    return this.http.get(this.url+data.id)
  }

  postProducts(data:any){
    return this.http.post(this.url,data)
  }

  putProducts(data:any){
    return this.http.put(this.url+data.id,data)
  }

  patchProducts(data:any){
    return this.http.patch(this.url+data.id,data)
  }

  deleteProducts(data:any){
    return this.http.delete(this.url+data.id)
  }
}
