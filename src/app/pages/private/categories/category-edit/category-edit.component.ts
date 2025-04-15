import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CategoriesService } from '../../../../services/categories.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-category-edit',
  standalone: true,
  imports: [ ReactiveFormsModule ],
  templateUrl: './category-edit.component.html',
  styleUrl: './category-edit.component.css'
})
export class CategoryEditComponent {
  dataForm!: FormGroup;
  selectedId!: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private categoriesService: CategoriesService,
    private router: Router
  ) {
    this.dataForm = new FormGroup({
      name: new FormControl( '', [ Validators.required ] ),
      description: new FormControl( '' )
    });
  }

  ngOnInit() {
    // Obtener el ID que viene por la URL
    this.activatedRoute.params.subscribe( ( params: Params ) => {
      if( params[ 'id' ] ) {
        console.log( params[ 'id' ] );

        this.selectedId = params[ 'id' ];

        this.categoriesService.getCategoryById( params[ 'id' ] ).subscribe({
          next: ( data: any ) => {
            console.log( data );   // { ok: true, data: {...} }

            const { name, description } = data.data;

            /** Establecer los valores de los campos del formulario */
            this.dataForm.setValue({
              name,
              description
            });
          },
          error: ( err ) => {
            console.error( err );
          },
          complete: () => {
            console.log( 'Los datos de la categoria a editar por id se obtubieron exitosamente' )
          }
        });
      }
    });
  }

  onSubmit() {
    if( this.dataForm.valid ) {
      console.log( this.dataForm.value );

      Swal.fire({
        title: "Do you want to save the changes?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Save",
        denyButtonText: `Don't save`
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {

          /** Actualizar los datos de la categoria */
          this.categoriesService.updateCategoryById( this.selectedId, this.dataForm.value ).subscribe({
            next: ( data ) => {
              console.log( data );
              console.log( 'Categoria ha sido actualizada' );
              this.router.navigateByUrl( '/dashboard/categories' );
            },
            error: ( error ) => {
              console.error( error );
            },
            complete: () => {
              this.dataForm.reset();
            }
          });

          Swal.fire("Saved!", "", "success");
        } else if (result.isDenied) {
          Swal.fire("Changes are not saved", "", "info");
        } else {
          console.log( 'Cancelo' );
          this.router.navigateByUrl( '/dashboard/categories' );
        }

      });

    }
  }

}
