import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { AuthService } from '../services/auth.service';
import { firstValueFrom } from 'rxjs';

export const authGuard: CanActivateFn = async (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router); // Inyecta Router

  try {
    const isAuthenticated = await firstValueFrom( authService.verifyUser() ); // Usa await y firstValueFrom

    if (isAuthenticated) {
      return true; // Permite el acceso
    } else {
      router.navigate(['/']); // Redirige al home si no está autenticado
      return false; // Importante: Retorna false para evitar la activación de la ruta
    }
  }
  catch ( error ) {
    console.error( 'Error en el guard: ', error);
    router.navigate(['/']); // Redirige al home también en caso de error
    return false; // Asegúrate de retornar false en caso de error
  }
};
