import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  baseUrl = environment.baseUrl;
  // token : any;
  // httpClient: any;

  constructor(private http: HttpClient) { }

  postService( url: string = '',payload: any, tokenRequired: boolean = false, httpOptions:any=null) {
    // console.log(url);
    // console.log(tokenRequired);
    return this.http.post(this.baseUrl+url, payload, tokenRequired && httpOptions);
  }
  getService( url: string = '' , tokenRequired: boolean = false, httpOptions:any) {
    // console.log(url);
    // console.log(tokenRequired);
    return this.http.get(this.baseUrl+url, tokenRequired && httpOptions);
  }
  deleteService(url:string='', payload: any,  tokenRequired:boolean=false, httpOption:any) {
    // console.log(url);
    return this.http.delete(this.baseUrl+url, tokenRequired && httpOption)
  }
  putService( url: string = '',payload: any, tokenRequired: boolean = false, httpOptions:any=null) {
    // console.log(url);
    // console.log(tokenRequired);
    return this.http.put(this.baseUrl+url, payload, tokenRequired && httpOptions);
  }
}