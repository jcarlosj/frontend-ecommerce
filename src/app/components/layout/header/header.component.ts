import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCartShopping, faBars, faXmark } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ RouterLink, RouterLinkActive, FontAwesomeModule ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  faCartShopping = faCartShopping;
  faBars = faBars;
  faXmark = faXmark;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  get userData(): any {
    return this.authService.userData;
  }

  logout() {
    console.log( 'Desloguearse' );
    this.authService.logoutUser().subscribe( data => {
      console.log( data );
      this.router.navigateByUrl( 'login' );
    });
  }

}
