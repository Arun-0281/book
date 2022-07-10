import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  Users:any=[];
  constructor(private userservice:UserService,private router:Router) { }

  ngOnInit(): void {
    this.userservice.getUsers().subscribe(res=>{
      this.Users=res;
    })
  }

  login(email:any,pass:any){
    let t=true;
    for(let i=0;i<this.Users.length;i++){
      if(this.Users[i]["email"]==email.value && this.Users[i]["password"]==pass.value){
        this.router.navigateByUrl('/products')
        t=false;
      }
    }
   if(t) alert("You are not valid users"); 
  }

}
