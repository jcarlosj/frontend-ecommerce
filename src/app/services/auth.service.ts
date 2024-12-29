import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _authUserData = null;

  constructor( private http: HttpClient ) {}

  get userData() {
    // Paso 1: Leer los datos del localStorage
    const storedData = localStorage.getItem( 'authUserData' );
    console.log( storedData );

    // Paso 2: Verificar si el localStorage posee datos
    if( storedData ) {
      this._authUserData = JSON.parse( storedData );    // Si posee datos los convertimos string a un Objecto JavaScript
    }

    return this._authUserData;
  }

  registerUser( newUser: any ) {
    return this.http.post<any>( 'http://localhost:4000/api/auth/register', newUser )
      .pipe(
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
    return this.http.post( 'http://localhost:4000/api/auth/login', credentials )
      .pipe(
        tap( ( data: any ) => {
          console.log( data );
            // 1. Verificar los datos del usuario
            if( data.data ) {
              // 1.1 Guardar los datos del usuario en el LocalStorage
              localStorage.setItem( 'authUserData', JSON.stringify( data.data ) );

              // 1.2 Guardar los datos en un atributo de clase
              this._authUserData = data.data;
            }

            // 2. Guardar el Token
            localStorage.setItem( 'token', data.token );
        } ),
        map( ( data ) => {
          return 'Login realizado exitosamente';
        }),
        catchError( ( err ) => {

          // Error cuando el usuario que se autentica no esta registrado
          if( err.error.msg ) {
            return of( err.error.msg );
          }

          // Error cuando el endpoint que vamos a acceder no existe en nuestra API
          return of( 'Error: El servidor esta fallando' );
        })
      );
  }

  logoutUser() {
    console.log( this._authUserData );

    if( this._authUserData ) {

      this._authUserData = null;            // Eliminando los datos del usuario autenticado que persisten en el Servicio
      localStorage.removeItem( 'token' );   // Eliminando el key llamado token de nuestro localStorage
      localStorage.removeItem( 'authUserData' );   // Eliminando el key llamado authUserData de nuestro localStorage

      return of( true );
    }

    return of( false );
  }

}
