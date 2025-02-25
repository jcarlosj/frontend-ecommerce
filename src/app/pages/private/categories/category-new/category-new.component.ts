import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CategoriesService } from '../../../../services/categories.service';

@Component({
  selector: 'app-category-new',
  standalone: true,
  imports: [ ReactiveFormsModule ],
  templateUrl: './category-new.component.html',
  styleUrl: './category-new.component.css'
})
export class CategoryNewComponent {
  dataForm!: FormGroup;

  constructor( private categoriesService: CategoriesService ) {
    this.dataForm = new FormGroup({
      name: new FormControl( '', [ Validators.required ] ),
      description: new FormControl( '' )
    });
  }

  onSubmit() {
    if( this.dataForm.valid ) {
      console.log( this.dataForm.value );

      this.categoriesService.registerCategory( this.dataForm.value ).subscribe(
        ( data ) => {
          console.log( data );    // { ok: true, data: { ... } }
        },
        ( error ) => {
          console.error( 'ERROR: Al registrar la categoria: ', error );
        }
      );

    }

    this.dataForm.reset();
  }

}
