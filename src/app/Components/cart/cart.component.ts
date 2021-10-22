import { Component, OnInit } from '@angular/core';
import { BookserviceService } from 'src/app/service/bookservice.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataServiceService } from 'src/app/service/data-service.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartBooks: Array<any> =[];
  cart:any=[];
  panelOpenState = false;
  token: any;
  displayAddress = true;
  displayButton = true;
  displayCart = true;
  displayContinueButton = true;



  constructor(private bookService: BookserviceService, private dataService: DataServiceService, private matSnackBar: MatSnackBar,
    private formBuilder: FormBuilder,private router:Router) { }
  CustomerForm! : FormGroup

  ngOnInit(): void {
      this.getcartlist()
      this.dataService.recevieData.subscribe((response: any) => {
      console.log(response);
      this.getcartlist();
    })

    
    this.CustomerForm=this.formBuilder.group({
      fullName: ['',[ Validators.required,Validators.minLength(3),Validators.maxLength(20)]],
      mobileNo: ['', [Validators.required,Validators.minLength(10),Validators.maxLength(10)]],
      addressType: ['',Validators.required],  
      fullAddress: ['',[Validators.required,Validators.minLength(8),Validators.maxLength(200)]],
      city: ['',[ Validators.required,Validators.minLength(3),Validators.maxLength(20)]],
      state: ['',[ Validators.required,Validators.minLength(3),Validators.maxLength(20)]],
    });
  }
  getcartlist() {
    console.log("getcart");
    this.bookService.getCartBooks().subscribe((response: any) => {
      this.cartBooks = response['result']
      console.log("Getting cart data ", this.cartBooks);
    }, error => (
      console.log("getcartlist", error)
    ))
  }

  removeBook(data: any) {
    console.log("removecartList");
    this.bookService.removeCartlistBooks(data).subscribe((response: any) => {
      this.cartBooks = response['result']
      this.dataService.sendData(response);
    }, error => (
      console.log("removecartList_Error", error)

    ))

  }

  addressToggles() {
    this.displayAddress = false
    this.displayButton = false
  }
  continue() {
    this.displayCart = false
    this.displayContinueButton = false
  }

  onSubmit(){
    console.log("onsubmit function is calling  " , this.CustomerForm.value);
    let data ={
      fullName: this.CustomerForm.controls.fullName.value,
      mobileNo:this.CustomerForm.controls.mobileNo.value,
      addressType:this.CustomerForm.controls.addressType.value,
      fullAddress:this.CustomerForm.controls.fullAddress.value,
      city:this.CustomerForm.controls.city.value,
      state:this.CustomerForm.controls.state.value,     
      service:"advance"
    }
    console.log(data)
    this.bookService.customerDetailService(data).subscribe((response:any)=>{
      console.log(response);
      this.matSnackBar.open("Details Successful ", ' ', {duration: 2000});
      
    }, (error:any) => {

      console.log(error);
      this.matSnackBar.open("Unsuccessful ", ' ', {duration: 2000});

    })
  }
  // convenience getter for easy access to form fields
  get f() { return this.CustomerForm.controls; }

  checkout(){
    this.cart = this.cart;
    let orders:Array<any>=[]
    for(this.cart of this.cartBooks){
      
      let order = {
        "product_id": this.cart.product_id._id,
        "product_name": this.cart.product_id.bookName,
        "product_quantity": this.cart.product_id.quantity,
        "product_price": this.cart.product_id.price,
      }
      
      orders.push(order)
    }
    let OrderDetails={
    orders: orders
    }
    console.log(OrderDetails)
    this.bookService.orderPlaced(OrderDetails).subscribe(
      (response:any)=>{ 
        console.log(response)
        this.matSnackBar.open("Ordered successfully",'',{ duration: 2000});
        this.router.navigateByUrl('/home');        
      },
      error=>{
        console.log(error);
        this.matSnackBar.open("Order UnSuccessfull",'',{ duration: 2000});
      })
  }
}