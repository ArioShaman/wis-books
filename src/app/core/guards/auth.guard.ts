import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private readonly _authService: AuthService,
    private readonly _router: Router
  ) {}

  public canActivate(): boolean {
    const isAuthenticated = this._authService.isAuthenticated();

    if (!isAuthenticated) {
      this._router.navigate(['/books']);
    }

    return isAuthenticated;
  }

}
