import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserData } from 'src/app/models/traveller.model';
import { Guide } from 'src/app/models/tour-guide.model';
import { Tour } from 'src/app/models/tour.model';
import { ConfigService } from 'src/app/services/config.service';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-tour',
  templateUrl: './new-tour.component.html',
  styleUrls: ['./new-tour.component.scss']
})
export class NewTourComponent implements OnInit {
  userData: UserData;
  isLoggedIn: boolean= false;
  guideList: Guide[];
  newTourForm: FormGroup
  newTourGuide: Guide;
  newTourId: any;
  tourTypeList = this.configService.tourType
  tourCities = this.configService.city
  tourLocations = this.configService.location

  constructor(private dataService: DataService, private configService: ConfigService, private router: Router) {
    this.newTourForm = new FormGroup({
      tour_title: new FormControl('', [Validators.required, Validators.pattern(/^[A-ZÖÜÓŐÚÁÉŰÍ][A-ZÖÜÓŐÚÁÉŰÍa-zöüóőúéáűí_ \-]+$/)]),
      tour_start: new FormControl('', Validators.required),
      tour_end: new FormControl('', Validators.required),
      image: new FormControl('', [Validators.required, Validators.pattern(/^https?:\/\/.+$/), Validators.minLength(10), Validators.maxLength(250)]),
      tour_description: new FormControl('', [Validators.required, Validators.pattern(/^[A-ZÖÜÓŐÚÁÉŰÍ].+$/)]),
      tour_description2: new FormControl('', [Validators.required, Validators.pattern(/^[A-ZÖÜÓŐÚÁÉŰÍ].+$/)]),
      tour_description3: new FormControl('', [Validators.required, Validators.pattern(/^[A-ZÖÜÓŐÚÁÉŰÍ].+$/)]),
      guide: new FormControl('', Validators.required),
      tour_location: new FormControl('', Validators.required),
      tour_type: new FormControl('', Validators.required)
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

    this.dataService.get('guides').subscribe(
      (data:Guide[]) => this.guideList = data,
      error => console.error(error)
    )

  }
  saveNewTour() {
    const newTour = this.newTourForm.value
    const dateNow = Date.now();
    const tourStartDate = Date.parse(newTour.tour_start);
    const tourEndDate = Date.parse(newTour.tour_end);

    if (dateNow >= tourStartDate) {
      return alert('A tervezett túra kezdeti ideje már elmúlt!')
    } else if (tourStartDate >= tourEndDate) {
      return alert('A tervezett túra hamarabb ér véget minthogy elkezdődne!')
    }
    newTour.travellers = [];
    this.dataService.post('tours', newTour).subscribe(
      (data:Tour) => {
        this.newTourId = data._id
        console.log('New tour saved with ID: ', this.newTourId);

        this.dataService.getOne('guides', newTour.guide).subscribe(
          (data: Guide) => {
            this.newTourGuide = data;
            this.newTourGuide.tours.push(this.newTourId)
            this.dataService.put('guides', this.newTourGuide._id, this.newTourGuide).subscribe(
              data => console.log('A guide got a tour'),
              (error: any) => console.error(error)
            )
          },
          (error: any) => console.error(error)
        )
      },
      (error:any) => console.error(error)
    )
  }
}
