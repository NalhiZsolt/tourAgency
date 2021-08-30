import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';
import { Traveller, UserData } from 'src/app/models/traveller.model';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit {
  passwordForm: FormGroup
  imageForm: FormGroup
  emailForm: FormGroup
  userData: UserData;
  isLoggedIn: boolean = false;
  loggedInUserData: any;

  constructor(private dataService: DataService, private router: Router) {
    this.passwordForm = new FormGroup({
      password: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(30)]),
      passwordagain: new FormControl('', this.passwordValidator)
    })
    this.passwordForm.controls.password.valueChanges.subscribe(
      data => this.passwordForm.controls.passwordagain.updateValueAndValidity()
    )

    this.emailForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.pattern(/^\w+@[a-zA-Z_ öüóőúéáűíÖÜÓŐÚÉÁŰÍ]+?\.[a-zA-Z_-öüóőúéáűíÖÜÓŐÚÉÁŰÍ]{2,3}$/)])
    })

    this.imageForm = new FormGroup({
      image: new FormControl('', [Validators.required, Validators.pattern(/^https?:\/\/.+$/), Validators.minLength(10), Validators.maxLength(250)])
    })
  }

  ngOnInit(): void {
    this.isLoggedIn = false
    this.dataService.loggedInUser.subscribe(
      (data:UserData) => {
        this.userData = data
        console.log(this.userData);
        if (!this.userData && !window.localStorage.getItem('accessToken')) {
          this.isLoggedIn = false
          this.router.navigate(['/'])
        } else if (!this.userData && window.localStorage.getItem('accessToken')) {
          this.dataService.getUserData().subscribe(
            (data: UserData) => {
              this.userData = data
              console.log(this.userData);
              if (this.userData) {
                this.isLoggedIn = true
              }
              this.dataService.loggedInUser.next(this.userData);
              this.dataService.getOne('travellers', this.userData.id).subscribe(
                (data: Traveller) => this.loggedInUserData = data,
                error => console.error(error)
              )
            },
            error => console.error(error)
          )
        }

        else {
          this.isLoggedIn = true;
          this.dataService.getOne('travellers', this.userData.id).subscribe(
            (data: Traveller) => this.loggedInUserData = data,
            error => console.error(error)
          )
        }
      },
      error => console.error(error)
    )

    this.dataService.loginStatusChanged.subscribe(
      (data: boolean) => this.isLoggedIn = data,
      (error: any) => console.error(error)
    )
  }

  passwordValidator(control: AbstractControl) {
    if (control && (control.value !== null || control.value !== undefined)) {
      const controlPassValue = control.value
      const passControl = control.root.get('password')
      if (passControl) {
        const passValue = passControl.value
        if (passValue !== controlPassValue || passValue === '') {
          return { isError: true }
        }
      }
      return null
    }
  }

  changePassword() {
    const id = this.loggedInUserData._id
    this.loggedInUserData.password = this.passwordForm.value.password
    this.dataService.passwordChange(id, this.loggedInUserData).subscribe(
      data => console.log(`customer password changed`),
      (error: any) => console.error(error)
    )
  }

  changeEmail() {
    const id = this.loggedInUserData._id
    this.loggedInUserData.email = this.emailForm.value.email
    this.dataService.put('travellers', id, this.loggedInUserData).subscribe(
      data => console.log(`traveller's email changed`),
      (error: any) => console.error(error)
    )
  }

  changeImage() {
    const id = this.loggedInUserData._id
    this.loggedInUserData.image = this.imageForm.value.image
    this.dataService.put('travellers', id, this.loggedInUserData).subscribe(
      data => console.log(`customer's image changed`),
      (error: any) => console.error(error)
    )
  }
}
