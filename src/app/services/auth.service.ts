import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( private http: HttpClient ) {}

  registerUser( newUser: any ) {
    return this.http.post<any>( 'http://localhost:4000/api/auth/register', newUser )
      .pipe(
        // tap( ( data: any ) => {
        //   console.log( 'tap ', data );
        // }),
        map( ( data: any ) => {
          return 'Registro realizado exitosamente';
        }),
        catchError( ( err ) => {

          // Error cuando el usuario a registrar ya existe
          if( err.error.msg ) {
            return of( err.error.msg );
          }

          // Error cuando el endpoint que vamos a acceder no existe en nuestra API
          return of( 'Error: El servidor esta fallando' );
        })
      );
  }

  loginUser( credentials: any ) {
    return this.http.post( 'http://localhost:4000/api/auth/login', credentials );
  }

}
