import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-category-edit',
  standalone: true,
  imports: [ ReactiveFormsModule ],
  templateUrl: './category-edit.component.html',
  styleUrl: './category-edit.component.css'
})
export class CategoryEditComponent {
  dataForm!: FormGroup;

  constructor() {
    this.dataForm = new FormGroup({
      name: new FormControl( '', [ Validators.required ] ),
      description: new FormControl( '' )
    });
  }

  onSubmit() {
    if( this.dataForm.valid ) {
      console.log( this.dataForm.value );
    }

    this.dataForm.reset();
  }

}
