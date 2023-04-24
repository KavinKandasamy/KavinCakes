import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
  repeatPass:string='none';
  constructor(){}
  ngOnInit(): void {
  }

  registerForm=new FormGroup({
    firstname:new FormControl("",[Validators.required,Validators.minLength(2),Validators.pattern("[a-zA-Z].*")]),
    lastname:new FormControl("",[Validators.required,Validators.pattern("[a-zA-Z].*")]),
    email:new FormControl("",[Validators.required,Validators.email]),
    mobile:new FormControl("",[Validators.required,Validators.pattern("[0-9]*"),Validators.minLength(10),Validators.maxLength(10)]),
    gender:new FormControl("",[Validators.required]),
    pwd:new FormControl("",[Validators.required,Validators.minLength(6),Validators.maxLength(15)]),
    rpwd:new FormControl("")
  });

  registerSubmited(){
    if(this.Pwd.value == this.Rpwd.value){
      console.log(this.registerForm.valid);
      this.repeatPass='none'
    }else{
      this.repeatPass ='inline';
    }
  }

  get FirstName():FormControl{
    return this.registerForm.get("firstname") as FormControl;
  }

  get LastName():FormControl{
    return this.registerForm.get("lastname") as FormControl;
  }

  get Email():FormControl{
    return this.registerForm.get("email") as FormControl;
  }

  get Mobile():FormControl{
    return this.registerForm.get("mobile") as FormControl;
  }

  get Gender():FormControl{
    return this.registerForm.get("gender") as FormControl;
  }

  get Pwd():FormControl{
    return this.registerForm.get("pwd") as FormControl;
  }
  get Rpwd():FormControl{
    return this.registerForm.get("pwd") as FormControl;
  }
}
