import { Component, OnInit } from '@angular/core';
import { Traveller, UserData } from 'src/app/models/traveller.model';
import { Tour } from 'src/app/models/tour.model';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-travellers',
  templateUrl: './travellers.component.html',
  styleUrls: ['./travellers.component.scss']
})
export class TravellersComponent implements OnInit {
  userData: UserData;
  isLoggedIn: boolean = false;
  selectedTraveller: Traveller;
  travellers: Traveller[] = []
  tourList: Tour[] = [];

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

    this.dataService.get('travellers').subscribe(
      (data:Traveller[]) => this.travellers = data,
      (error:any) => console.error(error)
    )
  }

  detailedTraveller(traveller) {
    this.selectedTraveller = traveller;
    this.tourList = []
    traveller.my_tours.map(tourId => {
      this.dataService.getOne('tours', tourId).subscribe(
        (data:any) => {
          data.tour_start = new Intl.DateTimeFormat('hu-HU').format(Date.parse(data.tour_start))
          data.tour_end = new Intl.DateTimeFormat('hu-HU').format(Date.parse(data.tour_end))
          this.tourList.push(data);
        },
        (error:any) => console.error(error)
      )
    })
  }

  deleteTraveller(traveller) {
    if(!this.userData || this.userData.role === 1 ) {
      return alert('Nem nyúka-piszka, mert megszúr a bicska!')
    }
    this.dataService.delete('travellers', traveller._id).subscribe(
      data => {
        console.log(`Deleted user id: ${traveller._id}`);
        this.travellers = this.travellers.filter(travellerData => travellerData._id !== traveller._id)
      },
      (error:any) => console.error(error)
    )

  }
}
