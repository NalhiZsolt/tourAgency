import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup
  constructor(private dataService: DataService, private router: Router) {
    this.loginForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    })
  }

  ngOnInit(): void {
  }
  login() {
    const loginUser = this.loginForm.value
    this.dataService.login(loginUser).subscribe(
      (data:any) => {
        this.dataService.loginStatusChanged.next(true)
        this.router.navigate(['/welcome'])
      },
      (error:any) => console.error(error)
    )
  }
}
