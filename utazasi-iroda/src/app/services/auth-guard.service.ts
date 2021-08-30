import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  isActive: any;
  constructor(private router: Router) { }
  canActivate(): boolean {
    if (!window.localStorage.getItem("accessToken")) {
      alert('Az oldal megtekintéséhez előbb be kell jelentkezni!')
      this.router.navigate(["/login"]);
      this.isActive = 0;
      return false
    };
    this.isActive = 1;
    return true

  }
}
