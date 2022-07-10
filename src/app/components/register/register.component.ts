import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  //userForm:FormGroup;
  registerForm:any;
  constructor(private formBuilder:FormBuilder,private router:Router,
    private ngZone:NgZone,private userservice:UserService,private snack:MatSnackBar) {
      this.registerForm=this.formBuilder.group({
        firstname:[''],
        lastname:[''],
        email:[''],
        password:['']
      })
     }
    

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      firstname : new FormControl(null,[Validators.required,Validators.pattern('[a-zA-Z]*')]),
      lastname : new FormControl(null,[Validators.required,Validators.pattern('[a-zA-Z]*')]),
      email : new FormControl(null,[Validators.required,Validators.email]),
      password: new FormControl(null,[Validators.required]),
    });
  }


  
  onSubmit()
  {
    if(this.registerForm.status==="VALID"){
      this.userservice.AddUser(this.registerForm.value).subscribe((res: any) => {
        this.ngZone.run(() => this.router.navigateByUrl('/products'))
      }, (err) => {
        console.log(err);
      });
    }
    
  }
  
  


  get firstname() {return this.registerForm.get('firstname');}
  get lastname() {return this.registerForm.get('lastname');}
  get email() {return this.registerForm.get('email');}
  get password() {return this.registerForm.get('password');}
}
