import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SweetAlertService {

  constructor() { }

  cartUpdateWindow( title: string ) {
    Swal.fire({
      position: "bottom-end",
      icon: "success",
      title,
      showConfirmButton: false,
      timer: 1500
    });
  }

  cartUpdateErrorWindow( text: string ) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text,
      footer: '<a href="#">Why do I have this issue?</a>'
    });
  }
}
