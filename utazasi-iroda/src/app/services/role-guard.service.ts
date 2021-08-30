import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { UserData } from '../models/traveller.model';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuardService implements CanActivate {
  userData: UserData;

  constructor(public router: Router, private dataService: DataService) {
    this.dataService.loggedInUser.subscribe(
      (data: UserData) =>  this.userData = data,
      error => console.error(error)
    )
  }

  canActivate = (route: ActivatedRouteSnapshot): boolean => {
    const expectedRole = route.data.expectedRole;
    if (!this.userData || this.userData.role < expectedRole) {
      alert('Ez csak az utazási iroda alkalmazottai számára elérhető!')
      this.router.navigate(["/welcome"]);
      return false
    }
      console.log('megfelelő jogosultság', +this.userData.role)
      return true
}
}
