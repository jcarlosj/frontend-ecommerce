import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor( private http: HttpClient ) { }

  registerCategory( newCategory: any ) {
    const token = localStorage.getItem( 'token' ) || '';
    const headers = new HttpHeaders().set( 'X-Token', token );

    return this.http.post( 'http://localhost:4000/api/categories', newCategory, { headers: headers } );
  }
}
