import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataCategory } from '../models/category.model';
import { ResponseApi } from '../models/response.model';

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

  registerCategory( newCategory: DataCategory ) {
    return this.http.post<ResponseApi<DataCategory>>( 'http://localhost:4000/api/categories', newCategory, { headers: this.headers } );
  }

  getCategories() {
    return this.http.get<ResponseApi<DataCategory[]>>( 'http://localhost:4000/api/categories' );
  }

  deleteCategory( id: string ) {
    return this.http.delete<ResponseApi<DataCategory>>( 'http://localhost:4000/api/categories/' + id, { headers: this.headers } );
  }

  getCategoryById( id: string ) {
    return this.http.get<ResponseApi<DataCategory>>( `http://localhost:4000/api/categories/${ id }` );
  }

  updateCategoryById( id: string, updatedCategory: DataCategory ) {
    return this.http.patch<ResponseApi<DataCategory>>( `http://localhost:4000/api/categories/${ id }`, updatedCategory, { headers: this.headers } );
  }
}
