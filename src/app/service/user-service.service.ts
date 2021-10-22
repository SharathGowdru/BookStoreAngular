import { Injectable } from '@angular/core';
import { HttpService } from './http-service.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  token: any;
  baseUrl = environment.baseUrl;

   constructor(private httpService: HttpService) {
    this.token = localStorage.getItem('token');
   }

   signup(data: any) {
    console.log("Entered data is", data);
    let httpAuthOptions={
      headers:new Headers({
        'Content-Type':'application/json',
        'Authorization':this.token
      })
    }
    return this.httpService.postService("/bookstore_user/registration", data, false, httpAuthOptions);
  }

  login(data: any) {
    console.log("Entered data is", data);
    let httpAuthOptions={
      headers:new Headers({
        'Content-Type':'application/json',
        'Authorization':this.token
      })
    }
    return this.httpService.postService('/bookstore_user/login', data, false, httpAuthOptions);    
  }

  adminlogin(data: any) {
    console.log("Entered data is", data);
    let httpAuthOptions={
      headers:new Headers({
        'Content-Type':'application/json',
        'Authorization':this.token
      })
    }
    return this.httpService.postService('/bookstore_user/admin/login', data, false, httpAuthOptions);    
  }

  adminSignup(data: any) {
    console.log("Entered data is", data);
    let httpAuthOptions={
      headers:new Headers({
        'Content-Type':'application/json',
        'Authorization':this.token
      })
    }
    return this.httpService.postService('/bookstore_user/admin/registration', data, false, httpAuthOptions);
  }

}
