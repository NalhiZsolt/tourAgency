import { compileNgModule } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  newUserForm: FormGroup;

  userList: any;
  constructor(private dataService: DataService, private router: Router) {
    this.newUserForm = new FormGroup({
      first_name: new FormControl('', [Validators.required, Validators.pattern(/^[A-ZÖÜÓŐÚÁÉŰÍ][A-ZÖÜÓŐÚÁÉŰÍa-zöüóőúéáűí_ \-]+$/)]),
      last_name: new FormControl('', [Validators.required, Validators.pattern(/^[A-ZÖÜÓŐÚÁÉŰÍ][A-ZÖÜÓŐÚÁÉŰÍa-zöüóőúéáűí_ \-]+$/)]),
      email: new FormControl('', [Validators.required, Validators.pattern(/^\w+@[a-zA-Z_ öüóőúéáűíÖÜÓŐÚÉÁŰÍ]+?\.[a-zA-Z_-öüóőúéáűíÖÜÓŐÚÉÁŰÍ]{2,3}$/)]),
      password: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(30)]),
      passwordagain: new FormControl('', this.passwordValidator),
      age: new FormControl('', [Validators.required, Validators.min(18), Validators.max(99)]),
      gender: new FormControl('', Validators.required),
      city: new FormControl('', [Validators.required, Validators.pattern(/^[A-ZÖÜÓŐÚÁÉŰÍ][A-ZÖÜÓŐÚÁÉŰÍa-zöüóőúéáűí_ \-]+$/)]),
      street: new FormControl('', [Validators.required, Validators.pattern(/^[A-ZÖÜÓŐÚÁÉŰÍ][A-ZÖÜÓŐÚÁÉŰÍa-zöüóőúéáűí_ \-]+$/)]),
      houseNumber: new FormControl('', [Validators.required, Validators.min(1)]),
      zip: new FormControl('', [Validators.required, Validators.min(1000), Validators.max(9999)]),
      image: new FormControl('', [Validators.required, Validators.pattern(/^https?:\/\/.+$/), Validators.minLength(10), Validators.maxLength(250)])
    })
    this.newUserForm.controls.password.valueChanges.subscribe(
      data => this.newUserForm.controls.passwordagain.updateValueAndValidity()
    )
  }

  ngOnInit(): void {
    this.dataService.get('travellers').subscribe(
      data => {
        this.userList = data;
        this.userList = this.userList.map(data => data.email)
      },
      err => console.error(err)
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

  saveNewUser() {
    const newUser = this.newUserForm.value;
    if (this.userList.includes(newUser.email)) {
      alert('Ezzel az email címmel már regisztráltak!')

    } else {
      newUser.my_travels = []
      newUser.role = 1

      this.dataService.post('travellers', newUser).subscribe(
        (data: any) => {
          console.log('New user saved! ID: ', data._id);
          alert(`Új felhasználó mentése sikeres!`);
          this.router.navigate(['/login'])
        },
        (error: any) => console.error(error)
      )
    }
  }
}
