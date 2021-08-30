import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserData } from 'src/app/models/traveller.model';
import { ConfigService } from 'src/app/services/config.service';
import { DataService } from 'src/app/services/data.service';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  loggedInUserData: any;
  userData: UserData;
  isLoggedIn: boolean = false;
  mobile: boolean = false;
  navigation = this.configService.navigation;
  adminNavigation = this.configService.adminNavigation;

  constructor(private configService: ConfigService, private router: Router, private dataService: DataService) {
    this.dataService.loginStatusChanged.subscribe(
      data => this.isLoggedIn = data,
      error => console.error(error)
    )
  }

  ngOnInit(): void {

    this.dataService.getPersonLoggedInObject().subscribe(
      data => {
        this.userData = data
        if (!window.localStorage.getItem('refreshToken')) {
          this.isLoggedIn = false
          this.router.navigate(['/welcome'])
        }

        else {
          this.isLoggedIn = true;
        }
      },
      error => console.error(error)
    )
    if(this.isLoggedIn) {
      this.refreshToken()
    }
    this.dataService.loginStatusChanged.subscribe(
      (data: boolean) => this.isLoggedIn = data,
      (error: any) => console.error(error)
    )

    if (window.screen.width >= 768) {
      this.mobile = true;
    }
  }

  onLogout() {
    const data = { refreshToken: localStorage.getItem('refreshToken') }
    this.dataService.logout(data).subscribe(
      (data: any) => console.log(`Logged out`),
      (error: any) => console.error(error)
    )
    this.isLoggedIn = false
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    this.dataService.loginStatusChanged.next()
    this.router.navigate(["/welcome"]);
  }

  refreshToken() {
    const data = { refreshToken: localStorage.getItem('refreshToken') }
    console.log(data);
    this.dataService.refreshingToken(data).subscribe(
      (data: any) => {
        localStorage.setItem('accessToken', data.accessToken.toString());

        this.dataService.loggedInUser.next({
          first_name: data.first_name, id: data.id, role: data.role
        })
      },
      (error: any) => console.error(error)
    )
  }
}
