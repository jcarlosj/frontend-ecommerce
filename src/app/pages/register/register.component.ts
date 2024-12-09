import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { AuthService } from '../../services/auth.service';



@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ CommonModule, ReactiveFormsModule ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  message: any = '';

  /** Atributo para agrupar los campos del formulario */
  formData = new FormGroup({
    name: new FormControl( '', [ Validators.required ] ),
    username: new FormControl( '', [ Validators.required, Validators.email ] ),
    password: new FormControl( '', [ Validators.required, Validators.minLength( 6 ), Validators.maxLength( 12 ) ] )
  });

  private subscription!: Subscription;

  constructor( private authService: AuthService ) {}

  ngOnInit() {
    console.log( 'El RegisterComponent se ha inicializado' );
  }

  ngOnDestroy() {
    console.log( 'El RegisterComponent se ha destruido' );
    if( this.subscription ) {
      this.subscription.unsubscribe();
    }
  }

  handleSubmit() {
    // Muestra los datos del formulario si este es valido
    if( this.formData.valid ) {
      console.log( this.formData.value );

      this.subscription = this.authService.registerUser( this.formData.value ).subscribe( ( data: any ) => {
        console.log( data );

        /** Asignando el mensaje para desplegarlo en el formulario (error, exito) */
        this.message = data;

        /** Ocultar el mensaje pasados 2 segundos */
        setTimeout( () => {
          this.message = '';
        }, 2000 );
      });
    }

    this.formData.reset();
  }
}
