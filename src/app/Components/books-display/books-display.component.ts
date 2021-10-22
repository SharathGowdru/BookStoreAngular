import { Component, Input, OnInit } from '@angular/core';
import { BookserviceService } from 'src/app/service/bookservice.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-books-display',
  templateUrl: './books-display.component.html',
  styleUrls: ['./books-display.component.scss']
})
export class BooksDisplayComponent implements OnInit {
  booksArray: any = [];  //store all data in array
  token:any

  constructor(private bookService: BookserviceService, private snackBar:MatSnackBar,private route:Router) { }

  ngOnInit(): void {
    this.getAllBooks(); 
   
  }

  getAllBooks() {
      this.bookService.getAllBooks().subscribe((response: any) => {
      console.log(response); //get
      this.booksArray = response['result'] 
      console.log("Books are", this.booksArray);
    }, error => {
      console.log(error);
    })
  }

  addToCart(data:any){
    console.log("cart data",data);
    this.bookService.addBooksToCart(data).subscribe((response: any) => {
    console.log(response);
    this.snackBar.open("Book added to cart",' ',{duration: 2000});
    },error =>{
      console.log(error);
      this.snackBar.open("adding to cart failed",' ',{duration: 2000});
    })
  }

  wishlist(data:any) {
    console.log("wishlist data",data);
    this.bookService.addToWishlist(data).subscribe((response: any) => {
    console.log(response);
    this.snackBar.open("Book added to wishlist", ' ', {duration: 3000});
    },error =>{
      console.log(error);
      this.snackBar.open("adding to wishlist failed", ' ', {duration: 3000});
    })
  }
}
