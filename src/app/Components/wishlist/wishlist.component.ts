import { Component, OnInit } from '@angular/core';
import { BookserviceService } from 'src/app/service/bookservice.service';
import { DataServiceService } from 'src/app/service/data-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {
  wishlistBook : Array<any> =[];

  constructor(private bookService:BookserviceService,private dataService:DataServiceService,private snackBar:MatSnackBar) { }

  ngOnInit(): void {
    this.getList();
    this.dataService.recevieData.subscribe((response:any)=>{
      console.log(response['result']);
      this.getList();
    })
  }

  getList(){
    this.bookService.getWishlistBooks().subscribe((response:any)=>{
      console.log(response);
      this.wishlistBook = response['result'];
      console.log("returning data",this.wishlistBook);
    })
  }

  deleteWishList(data:any){
    console.log("DeleteWishList");
    this.bookService.deleteWishListBooks(data).subscribe((response:any)=>{
      this.wishlistBook=response['result']
      this.dataService.sendData(response);
      this.snackBar.open("Deleted Successfully",'',{duration:2000})
    },error=>(
      console.log("DeleteWishList_Error", error)
    )) 
  }
}
