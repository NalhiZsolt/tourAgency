import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserData } from 'src/app/models/traveller.model';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  userData: UserData;
  isLoggedIn: boolean = false;
  constructor(private dataService: DataService, private router: Router) { }

  ngOnInit(): void {
    this.dataService.getPersonLoggedInObject().subscribe(
      data => {
        this.userData = data
        if (!window.localStorage.getItem('refreshToken')) {
          this.isLoggedIn = false
          this.router.navigate(['/welcome'])
        }
        if(this.userData) {
          this.isLoggedIn = true;
        }
      },
      error => console.error(error)
    )
    this.dataService.loginStatusChanged.subscribe(
      (data: boolean) => this.isLoggedIn = data,
      (error: any) => console.error(error)
    )
  }
}
