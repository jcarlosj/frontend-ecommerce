
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ CommonModule, ReactiveFormsModule ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  /** Atributo para agrupar los campos del formulario */
  formData = new FormGroup({
    name: new FormControl( '', [ Validators.required ] ),
    username: new FormControl( '', [ Validators.required, Validators.email ] ),
    password: new FormControl( '', [ Validators.required, Validators.minLength( 6 ), Validators.maxLength( 12 ) ] )
  });


  handleSubmit() {
    // Muestra los datos del formulario si este es valido
    if( this.formData.valid ) {
      console.log( this.formData.value );
    }


    /** Estados principales del Formulario */
    console.log(
      'valid', this.formData.valid,
      // 'invalid', this.formData.invalid,
      // 'pristine', this.formData.pristine,
      // 'dirty', this.formData.dirty,
      // 'touched', this.formData.touched,
      // 'untouched', this.formData.untouched,
      // 'pending', this.formData.pending
    );

    /** Estados principales de un campo especifico del formulario */
    // console.log(
    //     this.formData.get( 'name' )?.valid,
    //     this.formData.get( 'name' )?.pristine,
    //     this.formData.get( 'name' )?.touched
    // );

    this.formData.reset();
  }
}
