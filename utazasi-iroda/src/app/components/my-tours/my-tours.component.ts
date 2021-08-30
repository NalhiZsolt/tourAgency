import { Component, OnInit } from '@angular/core';
import { Traveller, UserData } from 'src/app/models/traveller.model';
import { Tour } from 'src/app/models/tour.model';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-tours',
  templateUrl: './my-tours.component.html',
  styleUrls: ['./my-tours.component.scss']
})
export class MyToursComponent implements OnInit {
  isLoggedIn: boolean = false;
  userData: UserData;
  loggedInUserData: Traveller
  myTours: Tour;
  myToursList: Tour[] = [];
  travellerList: any[] = [];
  selectedTour: Tour;


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
          this.getTravel()
        }
      },
      error => console.error(error)
    )
    this.dataService.loginStatusChanged.subscribe(
      (data: boolean) => this.isLoggedIn = data,
      (error: any) => console.error(error)
    )
  }
  getTravel() {
    this.dataService.getOne('travellers', this.userData.id).subscribe(
      (data: Traveller) => {
        this.loggedInUserData = data;
        this.myToursList = []
        this.loggedInUserData.my_tours.map(tourID => {
          this.dataService.getOne('tours', tourID).subscribe(
            (data: any) => {
              this.myTours = data;
              this.myTours.tour_start = new Intl.DateTimeFormat('hu-HU').format(Date.parse(this.myTours.tour_start));
              this.myTours.tour_end = new Intl.DateTimeFormat('hu-HU').format(Date.parse(this.myTours.tour_start));
              this.myToursList.push(this.myTours)
            },
            (error: any) => console.error(error)
          )

        })
      },
      error => console.error(error)
    )
  }

  tourTravellers(selectedTour: Tour) {
    this.travellerList = []
    this.selectedTour = selectedTour;
    this.selectedTour.travellers.map(travellerID => {
      this.dataService.getOne('travellers', travellerID).subscribe(
        (data: any) => {
          if (data) {
            this.travellerList.push(data)
          }
        },
        (error: any) => console.error(error)
      )

    })

  }

  selectTour(selectedTour: Tour) {
    this.selectedTour = selectedTour;
  }

  deleteTour(selectedTour: Tour) {
    this.selectedTour = selectedTour;
    this.loggedInUserData.my_tours = this.loggedInUserData.my_tours.filter(data => data != selectedTour._id)
    this.selectedTour.travellers = this.selectedTour.travellers.filter(data => data != this.loggedInUserData._id)

    this.dataService.put('tours', this.selectedTour._id, this.selectedTour).subscribe(
      data => console.log(`modified tour's travellers list`),
      error => console.error(error)
    )

    this.dataService.put('travellers', this.loggedInUserData._id, this.loggedInUserData).subscribe(
      data => console.log(`modified traveller's tours list`),
      error => console.error(error)
    )
    this.myToursList = this.myToursList.filter(data => data._id !== selectedTour._id)
  }
}
