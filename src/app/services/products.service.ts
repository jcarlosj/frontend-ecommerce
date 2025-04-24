import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataProduct } from '../models/product.model';
import { ResponseApi } from '../models/response.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor( private http: HttpClient ) { }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem( 'token' ) ?? '';

    return new HttpHeaders().set( 'X-Token', token );
  }

  registerProduct( newProduct: DataProduct ) : Observable<ResponseApi<DataProduct>> {
    return this.http.post<ResponseApi<DataProduct>>( 'http://localhost:4000/api/products', newProduct, { headers: this.getHeaders() } );
  }

  getProducts() : Observable<ResponseApi<DataProduct[]>> {
    return this.http.get<ResponseApi<DataProduct[]>>( 'http://localhost:4000/api/products/category/all' );
  }

  deleteProductById( id: string ) : Observable<ResponseApi<DataProduct>> {
    return this.http.delete<ResponseApi<DataProduct>>( 'http://localhost:4000/api/products/' + id, { headers: this.getHeaders() } );
  }

  getProductById( id: string ) : Observable<ResponseApi<DataProduct>>  {
    return this.http.get<ResponseApi<DataProduct>>( `http://localhost:4000/api/products/${ id }` );
  }

  updateProductById( id: string, updatedProduct: DataProduct ) : Observable<ResponseApi<DataProduct>> {
    return this.http.patch<ResponseApi<DataProduct>>( `http://localhost:4000/api/products/${ id }`, updatedProduct, { headers: this.getHeaders() }  );
  }
}
