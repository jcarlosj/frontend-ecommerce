import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( private http: HttpClient ) {}

  registerUser( newUser: any ) {
    return this.http.post( 'http://localhost:4000/api/auth/register', newUser );
  }

  loginUser( credentials: any ) {
    return this.http.post( 'http://localhost:4000/api/auth/login', credentials );
  }

}
