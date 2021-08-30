import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserData } from 'src/app/models/traveller.model';
import { Guide } from 'src/app/models/tour-guide.model';
import { ConfigService } from 'src/app/services/config.service';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-guide',
  templateUrl: './new-guide.component.html',
  styleUrls: ['./new-guide.component.scss']
})
export class NewGuideComponent implements OnInit {
  userData: UserData;
  isLoggedIn: boolean = false;
  canCreate: boolean = false;
  guides: Guide[] = [];
  guideDetails: Guide;
  guideDetailsTours: string[] =[];
  typeConfig: {value: string, name: string}[] = this.configService.tourType
  newGuideForm: FormGroup
  mobile: boolean = false;

  constructor(private dataService: DataService, private configService: ConfigService, private router: Router) {
    this.newGuideForm = new FormGroup({
      first_name: new FormControl('', [Validators.required, Validators.pattern(/^[A-ZÖÜÓŐÚÁÉŰÍ][A-ZÖÜÓŐÚÁÉŰÍa-zöüóőúéáűí_ \-]+$/)]),
      last_name: new FormControl('', [Validators.required, Validators.pattern(/^[A-ZÖÜÓŐÚÁÉŰÍ][A-ZÖÜÓŐÚÁÉŰÍa-zöüóőúéáűí_ \-]+$/)]),
      age: new FormControl('', [Validators.required, Validators.min(18), Validators.max(99)]),
      description1: new FormControl('', Validators.required),
      description2: new FormControl('', Validators.required),
      image: new FormControl('', [Validators.required, Validators.pattern(/^https?:\/\/.+$/), Validators.minLength(10), Validators.maxLength(250)])
    })
  }


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
    if (window.screen.width === 360) {
      this.mobile = true;
    }
  }

  saveNewGuide() {
    const newGuide = this.newGuideForm.value
    newGuide.tours = [];
    this.dataService.post('guides', newGuide).subscribe(
      (data:any) => console.log('new guide saved, ID: ', data._id),
      (error:any) => console.error(error)
    )

  }
  getOneGuide(id) {
    this.guideDetailsTours = []
    this.dataService.getOne('guides', id).subscribe(
      (data:any) => {
        this.guideDetails = data;
        this.guideDetails.tours.map(tourID => {
          this.dataService.getOne('tours', tourID).subscribe(
            (data:any) => this.guideDetailsTours.push(data),
            (error:any) => console.error(error)
          )
        })
      },
      (error:any) => console.error(error)
    )
  }

}
