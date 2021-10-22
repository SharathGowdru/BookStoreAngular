import { Injectable } from '@angular/core';
import { HttpService } from './http-service.service';
// import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BookserviceService {
  baseUrl = environment.baseUrl;
  token: any;
  
  constructor(private httpService:HttpService) { 
    this.token = localStorage.getItem('token')
  }

  getAllBooks(){
    let httpAuthOptions={
      headers:new HttpHeaders({
        'Content-Type':'application/json',
        'Authorization':this.token
      })
    }
    return this.httpService.getService('/bookstore_user/get/book' ,false,httpAuthOptions)
  }

  addBooksToCart(data:any){
    console.log("Cart data",data);
    let httpAuthOptions={
      headers:new HttpHeaders({
        'Content-Type':'application/json',
        'x-access-token':this.token

      })
    }
    return this.httpService.postService('/bookstore_user/add_cart_item/'+ data._id, {},true,httpAuthOptions);
  }

  addToWishlist(data: any) {
    this.token = localStorage.getItem('token');
    let httpAuthOptions = {
      headers: new HttpHeaders({
        'x-access-token': this.token,
        'Content-Type': 'application/json'
      })
    }
    return this.httpService.postService('/bookstore_user/add_wish_list/'+data._id,{},true, httpAuthOptions);
  }

  getCartBooks() {
    this.token = localStorage.getItem('token');
    let httpAuthOptions = {
      headers: new HttpHeaders({
        'x-access-token': this.token,
        'Content-Type': 'application/json'
      })
    }
    return this.httpService.getService('/bookstore_user/get_cart_items',true, httpAuthOptions);
  }

   getWishlistBooks() {
    this.token = localStorage.getItem('token');
    let httpAuthOptions = {
      headers: new HttpHeaders({
        'x-access-token': this.token,
        'Content-Type': 'application/json'
      })
    }
    return this.httpService.getService('/bookstore_user/get_wishlist_items',true, httpAuthOptions);
  }

  removeCartlistBooks(data:any) {
    // this.token = localStorage.getItem('token');
    let httpAuthOptions = {
      headers: new HttpHeaders({
        'x-access-token': this.token,
        'Content-Type': 'application/json'
      })
    }
    return this.httpService.deleteService('/bookstore_user/remove_cart_item/'+data._id,{},true, httpAuthOptions);
  }

  deleteWishListBooks(data:any){
    // this.token = localStorage.getItem('token');
    let options = {
      headers: new HttpHeaders({
        'x-access-token': this.token,
        'Content-Type': 'application/json'
      })
    }
  return this.httpService.deleteService('/bookstore_user/remove_wishlist_item/'+data.product_id._id,data,true,options)
 }

 customerDetailService(data:any){
  this.token = localStorage.getItem('token');
  let httpAuthOptions = {
    headers: new HttpHeaders({
      'x-access-token': this.token,
      'Content-Type': 'application/json'
    })
  }
  return this.httpService.putService('/bookstore_user/edit_user',data,true, httpAuthOptions);
}

 orderPlaced(data:any){
  this.token = localStorage.getItem('token');
  let httpAuthOptions = {
    headers: new HttpHeaders({
      'x-access-token': this.token,
      'Content-Type': 'application/json'
    })
  }
  return this.httpService.postService('/bookstore_user/add/order/'+data._id,{},true, httpAuthOptions);
 }

 feedBack(review: any,data:any) {
  this.token = localStorage.getItem('token');
  let httpAuthOptions = {
    headers: new HttpHeaders({
      'x-access-token': this.token,
      'Content-Type': 'application/json'
    })
  }
  return this.httpService.postService('/bookstore_user/add/feedback/'+data,review,true,httpAuthOptions);
}

/*****Feed-Back***GET****/
getFeedBack(id:any){

  let httpAuthOptions = {
    headers: new HttpHeaders({
      'x-access-token': this.token,
      'Content-Type': 'application/json'
    })
  }
  console.log(httpAuthOptions); 
  
  return this.httpService.getService('/bookstore_user/get/feedback/'+id,true,httpAuthOptions);

}

}
