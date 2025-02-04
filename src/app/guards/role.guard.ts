import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { AuthService } from '../services/auth.service';

export const roleGuard: CanActivateFn = (route, state) => {
  const authService = inject( AuthService );
  const router = inject( Router );

  const expectedRoles = route.data[ 'expectedRoles' ] || [];
  const isAuthorized = authService.hasRole( expectedRoles );

  if( ! isAuthorized ) {
    router.navigateByUrl( 'dashboard' );
  }

  return isAuthorized;
};
