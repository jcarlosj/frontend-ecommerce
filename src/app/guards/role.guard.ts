import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { AuthService } from '../services/auth.service';

export const roleGuard: CanActivateFn = (route, state) => {
  const authService = inject( AuthService );
  const router = inject( Router );

  const expectedRoles = route.data[ 'expectedRoles' ];
  const userData = authService.userData;

  console.log( expectedRoles, userData?.role );

  const isAuthorized = expectedRoles.includes( userData?.role );

  if( ! isAuthorized ) {
    router.navigateByUrl( 'dashboard' );
  }

  return isAuthorized;
};
