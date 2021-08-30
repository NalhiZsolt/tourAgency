import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-csongrad-details',
  templateUrl: './csongrad-details.component.html',
  styleUrls: ['./csongrad-details.component.scss']
})
export class CsongradDetailsComponent implements OnInit {
  @Input()selectedPlace: any;

  constructor() { }

  ngOnInit(): void {
  }

}
