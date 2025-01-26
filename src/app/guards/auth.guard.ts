import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map } from 'rxjs';

import { AuthService } from '../services/auth.service';


export const authGuard: CanActivateFn = (route, state) => {

  const authService = inject( AuthService );
  const router = inject( Router );

  return authService.verifyUser().pipe(
    map( isAuthenticated => {
      if( ! isAuthenticated ) {
        router.navigateByUrl( '/login' );
      }

      return isAuthenticated;    //  Retorna el valor booleano emitido por el observable
    })
  );
};
