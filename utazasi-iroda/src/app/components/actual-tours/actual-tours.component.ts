import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Traveller, UserData } from 'src/app/models/traveller.model';
import { Tour } from 'src/app/models/tour.model';
import { ConfigService } from 'src/app/services/config.service';
import { DataService } from 'src/app/services/data.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-actual-tours',
  templateUrl: './actual-tours.component.html',
  styleUrls: ['./actual-tours.component.scss']
})
export class ActualToursComponent implements OnInit {
  userData: UserData;
  isLoggedIn: boolean = false;
  personSignInSubscription: Subscription
  allTours: Tour[] = [];
  selectedTour: Tour = {
    _id: "",
    tour_title: "",
    tour_description: "",
    tour_description2: "",
    tour_description3: "",
    tour_location: "",
    tour_start: "",
    tour_end: "",
    tour_type: "",
    image: "",
    travellers: [],
    guide: ""
  };
  loggedInUserData: Traveller;
  categoriesList: {value: string, name: string}[] = this.configService.tourType
  currentCategory: {value: string, name: string}[] = this.configService.tourType
  mapList: {value: string, name: string}[] = this.configService.map
  buttonDisable: boolean = false;
  localeDate: any;
  localeDate2: any;
  eventArray: Tour[] = [];
  tempArray: Tour[] = [];
  formCategory: FormGroup;
  actualImage: string = ''
  actualStart: any = ''
  actualEnd: any = ''
  actualLocation: string = ''
  actualMap: string = ''


  constructor(private dataService: DataService, private configService: ConfigService, private router: Router) {
    this.formCategory = new FormGroup({
      category: new FormControl('')
    })
  }

  ngOnInit(): void {

    this.dataService.getPersonLoggedInObject().subscribe(
      data => {
        this.userData = data
        if (!window.localStorage.getItem('refreshToken')) {
          this.isLoggedIn = false
        }
        if(this.userData) {
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

    this.dataService.get('tours').subscribe(
      (data: Tour[]) => {
        this.allTours = data
        this.tempArray = data
        this.eventArray = [];
        const dateNow = Date.now();
        for (let i = 0; i < this.tempArray.length; i++) {
          let tempDate = Date.parse(this.tempArray[i].tour_start)
          if (dateNow < tempDate) {
            this.tempArray[i].tour_start = new Intl.DateTimeFormat('hu-HU').format(Date.parse(this.tempArray[i].tour_start))
            this.tempArray[i].tour_end = new Intl.DateTimeFormat('hu-HU').format(Date.parse(this.tempArray[i].tour_end))
            this.eventArray.push(this.tempArray[i])
          }
        }
      },
      (error: any) => console.error(error)
    )
    this.dataService.loggedInUser.subscribe(
      (data: Traveller) => this.loggedInUserData = data,
      (error: any) => console.error(error)
    )
  }

  currentTour(selectedTour: Tour) {
    this.selectedTour = selectedTour;
    this.localeDate = this.selectedTour.tour_start;
    this.localeDate2 = this.selectedTour.tour_end;
    if(this.loggedInUserData) {
      for (let i = 0; i < this.loggedInUserData.my_tours.length; i++) {
        if (this.loggedInUserData.my_tours[i] === selectedTour._id) {
          this.buttonDisable = true;
        }
      }
    } else {
      this.buttonDisable = true;
    }
  }

  close() {
    this.buttonDisable = false;
  }

  saveTour(selectedTour: Tour) {
    let selectedTourId = selectedTour._id
    selectedTour.travellers.push(this.loggedInUserData._id)
    this.dataService.put('tours', selectedTourId, selectedTour).subscribe(
      data => console.log('Tour got a customer'),
      error => console.error(error)
    )
    this.loggedInUserData.my_tours.push(selectedTourId);
    this.dataService.put('travellers', this.loggedInUserData._id, this.loggedInUserData).subscribe(
      data => console.log('A traveller got a travel'),
      error => console.error(error)

    )
  }

  selectCategory() {
    let selected = this.formCategory.value;
    if (selected.category === "") {
      this.currentCategory = this.categoriesList;
    } else {

      this.currentCategory = this.categoriesList.filter(data => data.value === selected.category)

    }
  }
  changeImage(tour){
    this.actualImage = tour.image;
    this.actualStart = tour.tour_start;
    this.actualEnd = tour.tour_end;
    this.actualLocation = tour.tour_location;
    let tempMap = this.mapList.filter(map => map.name == this.actualLocation)[0]
    this.actualMap = tempMap.value
  }
  cleanImage() {
    this.actualImage = ''
    this.actualStart = ''
    this.actualEnd = ''
    this.actualLocation = ''
  }
}
