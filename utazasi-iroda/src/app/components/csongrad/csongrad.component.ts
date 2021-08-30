import { Component, OnInit } from '@angular/core';
import { ConfigService } from 'src/app/services/config.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-csongrad',
  templateUrl: './csongrad.component.html',
  styleUrls: ['./csongrad.component.scss']
})
export class CsongradComponent implements OnInit {

  jarasok: {value:string, name:string}[] = this.configService.location;
  varosok: {value:string, name:string}[] = this.configService.city;
  selectedJaras: any = '';
  varos: any ='';
  selectedPlace: any;
  places: any[] = []

  constructor(private configService: ConfigService, private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.get('descriptions').subscribe(
      (data:any) => this.places = data,
      (error:any) => console.error(error)
    )
  }
  selectJaras(selectedJaras) {
    this.selectedPlace = this.places.filter(data => data.value === selectedJaras.value)[0]
  }
  selectVaros(varos) {
    this.selectedPlace = this.places.filter(data => data.value === varos.value)[0]
  }

  hoverJaras(jaras) {
    this.selectedJaras = jaras.value;
  }
  hoverVaros(varos) {
    this.varos = varos.value;
  }

  scroll() {
    const element = document.getElementById("target")
    element.scrollIntoView({behavior: 'smooth'});
  }
}
