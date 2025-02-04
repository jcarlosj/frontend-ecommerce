import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { DataAuthUser } from '../models/user.model';
import { ResponseApi } from '../models/response.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _authUserData: null | DataAuthUser = null;

  constructor( private http: HttpClient ) {}

  get userData(): null | DataAuthUser {
    // Paso 1: Leer los datos del localStorage
    const storedData = localStorage.getItem( 'authUserData' );
    console.log( storedData );

    // Paso 2: Verificar si el localStorage posee datos
    if( storedData ) {
      this._authUserData = JSON.parse( storedData );    // Si posee datos los convertimos string a un Objecto JavaScript
    }

    return this._authUserData;
  }

  registerUser( newUser: DataAuthUser ): Observable<string> {
    return this.http.post<ResponseApi>( 'http://localhost:4000/api/auth/register', newUser )
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

  loginUser( credentials: DataAuthUser ): Observable<string> {
    return this.http.post<ResponseApi>( 'http://localhost:4000/api/auth/login', credentials )
      .pipe(
        tap( ( data: ResponseApi ) => {
          console.log( '>>>>>>>', data );
            // 1. Verificar los datos del usuario
            if( data.data ) {
              // 1.1 Guardar los datos del usuario en el LocalStorage
              localStorage.setItem( 'authUserData', JSON.stringify( data.data ) );

              // 1.2 Guardar los datos en un atributo de clase
              this._authUserData = data.data;
            }

            // 2. Guardar el Token
            localStorage.setItem( 'token', data.token! );
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

  logoutUser(): Observable<boolean> {
    console.log( this._authUserData );

    if( this._authUserData ) {

      this._authUserData = null;            // Eliminando los datos del usuario autenticado que persisten en el Servicio
      localStorage.removeItem( 'token' );   // Eliminando el key llamado token de nuestro localStorage
      localStorage.removeItem( 'authUserData' );   // Eliminando el key llamado authUserData de nuestro localStorage

      return of( true );
    }

    return of( false );
  }

  verifyUser() {
    // Paso 1: Verificar si tenemos un token del lado del cliente
    const token = localStorage.getItem( 'token' ) ?? '';

    if( ! token ) {
        return of( false );
    }

    // Paso 2: Verificar contra el BackEnd si los datos del token son validos, y adicional a eso, vamos a renovar nuestro token
    const headers = new HttpHeaders().set( 'X-Token', token );

    return this.http.get<ResponseApi>( 'http://localhost:4000/api/auth/re-new-token', { headers } )
      .pipe(
        map( response => {
          console.log( response );  // Objeto de respuesta { ok: true , newToken: '' }
          localStorage.setItem( 'token', response.token ! );
          localStorage.setItem( 'authUserData', JSON.stringify( response.data ! ) );

          return true;
        } ),
        catchError( error => {
          console.error( error );
          localStorage.removeItem( 'token' );
          localStorage.removeItem( 'authUserData' );

          return of( false );
        })
      );
  }

  hasRole( expectedRoles: string[] ) : boolean  {
    const userRole = this._authUserData?.role ? this._authUserData?.role : '';

    return expectedRoles.includes( userRole );
  }

}
