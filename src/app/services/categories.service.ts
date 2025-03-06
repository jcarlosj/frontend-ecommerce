import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private token!: string;
  private headers!: HttpHeaders;

  constructor( private http: HttpClient ) {
    this.token = localStorage.getItem( 'token' ) || '';
    this.headers = new HttpHeaders().set( 'X-Token', this.token );
  }

  registerCategory( newCategory: any ) {
    return this.http.post( 'http://localhost:4000/api/categories', newCategory, { headers: this.headers } );
  }

  getCategories() {
    return this.http.get( 'http://localhost:4000/api/categories' );
  }

  deleteCategory( id: string ) {
    return this.http.delete( 'http://localhost:4000/api/categories/' + id, { headers: this.headers } );
  }

  getCategoryById( id: string ) {
    return this.http.get( `http://localhost:4000/api/categories/${ id }` );
  }

  updateCategoryById( id: string, updatedCategory: any ) {
    return this.http.patch( `http://localhost:4000/api/categories/${ id }`, updatedCategory, { headers: this.headers } );
  }
}
