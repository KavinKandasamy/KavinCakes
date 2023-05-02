import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email:string="";
  pwd:string="";
  loginForm!: FormGroup;
  isUserValid: boolean=false;
  constructor(private loginAuth:AuthService){};

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email : new FormControl("",[Validators.required,Validators.email]),
      pwd   : new FormControl("",[Validators.required,Validators.minLength(6),Validators.maxLength(15)])
    });
    }



  loginSubmited(){
   this.loginAuth.loginUser([this.loginForm.value.email,this.loginForm.value.pwd]).subscribe(res =>{
    if(res == 'Login Failed'){
      this.isUserValid =false;
      alert("Login Failed")
    }
    else{
      this.isUserValid =true;
      this.loginAuth.setToken(res);
    }
   })
  }

  

  get Email():FormControl{
    return this.loginForm.get('email') as FormControl;
  }

  get Pwd():FormControl{
    return this.loginForm.get('pwd') as FormControl;
  }

}
