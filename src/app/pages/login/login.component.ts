import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ ReactiveFormsModule ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  message: any = '';

  /** Atributo para agrupar los campos del formulario */
  formData = new FormGroup({
    username: new FormControl( '', [ Validators.required, Validators.email ] ),
    password: new FormControl( '', [ Validators.required, Validators.minLength( 6 ), Validators.maxLength( 12 ) ] )
  });

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  handleSubmit() {
    if( this.formData.valid ) {
      console.log( this.formData.value );
      this.authService.loginUser( this.formData.value ).subscribe( ( data ) => {
        console.log( data );

        /** Asignando el mensaje para desplegarlo en el formulario (error, exito) */
        this.message = data;

        /** Ocultar el mensaje pasados d2 segundos */
        setTimeout( () => {
          this.message = '';
          this.router.navigateByUrl( 'dashboard' );
        }, 2000 );
      } );
    }

    this.formData.reset();
  }
}
