import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { AuthService } from '../../../services/auth.service';
import { DataAuthUser } from '../../../models/user.model';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ CommonModule, ReactiveFormsModule ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  message: string = '';

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

  handleSubmit(): void {
    // Muestra los datos del formulario si este es valido
    if( this.formData.valid ) {
      console.log( this.formData.value );

      const inputData: DataAuthUser = {
        name: this.formData.value.name ?? '',
        password: this.formData.value.password ?? '',
        username: this.formData.value.username ?? ''
      };

      this.subscription = this.authService.registerUser( inputData ).subscribe( ( data: any ) => {
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
