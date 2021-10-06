import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserServiceService } from 'src/app/service/user-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  hide = true;

  constructor(public userService:UserServiceService,private snackBar : MatSnackBar) { }
  form = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    userName: new FormControl('', [Validators.required, Validators.email, Validators.minLength(3)]),
    password: new FormControl('', [Validators.required, Validators.minLength(3)]),
    number: new FormControl('', [Validators.required, Validators.minLength(10)])
  })
  
  ngOnInit(): void {
  }
  onSubmit() {
    console.log("On sigunUp",this.form.value)
    if (this.form.invalid) {
      console.log("Its invalid Form");
      return;
    } 
    else {
      console.log(this.form.valid); 
        let data = {
          "fullName": this.form.controls.name.value,
          "email": this.form.controls.userName.value,
          "password": this.form.controls.password.value,
          "phone": this.form.controls.number.value
        }
        this.userService.signup(data).subscribe(response =>{
          console.log(response);
          this.snackBar.open("Registered!!!"," ",{ duration: 2000});
        }, error => {
          console.log("error in register", error);
          this.snackBar.open("Registration Failed!!"," ",{ duration: 2000});
        });
      }
    }
  }