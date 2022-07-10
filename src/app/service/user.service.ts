import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { User } from './user';
import { catchError,map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  API:String="http://localhost:8000/user";
  httpHeaders=new HttpHeaders().set('Content-Type','application/json');
  constructor(private httpclient:HttpClient) { }

  AddUser(data:User):Observable<any>{
    let API_URL=`${this.API}/add-user`;
    return this.httpclient.post(API_URL,data).pipe(catchError(this.handleError))
  }

  getUsers(){
    return this.httpclient.get(`${this.API}`);
  }

  getUser(id:any):Observable<any>{
    let API_URL=`${this.API}/read-user/${id}`;
    return this.httpclient.get(API_URL,{headers:this.httpHeaders}).pipe(map((res:any)=>{
      return res || {}
    }),catchError(this.handleError))
  }

  deleteUser(id:any):Observable<any>{
    let API_URL=`${this.API}/delete-user/${id}`;
    return this.httpclient.delete(API_URL,{headers:this.httpHeaders}).pipe(
      catchError(this.handleError)
    )
  }

  handleError(error:HttpErrorResponse){
    let errorMessage='';
    if(error.error instanceof ErrorEvent){
      errorMessage=error.error.message;
    }else{
      errorMessage=`Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
