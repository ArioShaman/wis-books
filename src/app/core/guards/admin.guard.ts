import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})

@Injectable()
export class AdminGuard implements CanActivate {

  constructor(
    private readonly _authService: AuthService,
    private readonly _router: Router
  ) {}

  public canActivate(): boolean {
    const isAuthenticated = this._authService.isAuthenticated();
    const user = this._authService.getCurrentUser();

    if (isAuthenticated && user.role === 'ADMIN') {
      return true;
    } else {
      this._router.navigate(['/books']);

      return false;
    }
  }

}
