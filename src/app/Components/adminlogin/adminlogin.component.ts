import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserServiceService } from 'src/app/service/user-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-adminlogin',
  templateUrl: './adminlogin.component.html',
  styleUrls: ['./adminlogin.component.scss']
})
export class AdminloginComponent implements OnInit {
  hide = true;
  token:any;

  constructor(private router:Router,private userService: UserServiceService, private snackBar : MatSnackBar) { }
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email, Validators.minLength(3)]),
    password: new FormControl('', [Validators.required, Validators.minLength(3)])
  })

  ngOnInit(): void {
  }

  onSubmit() {
    console.log("onsubmit function is calling", this.loginForm.value);
    let request = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
      // service:"advance"
    }
    console.log(request)
    this.userService.adminlogin(request).subscribe((response: any) => {
      console.log(response);
      localStorage.setItem('token',response.result.accessToken);
      this.router.navigateByUrl('/home/books-display');
      this.snackBar.open("Login Successful ", ' ', {duration: 2000});
    }, (error: any) => {
      console.log("login error",error);
      this.snackBar.open("Login Unsuccessful ", ' ',{duration: 2000});
    })
  }
}