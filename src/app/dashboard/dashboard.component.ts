import { MapsAPILoader } from '@agm/core';
import { Component, OnInit, ViewChild } from '@angular/core';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { CountriesService } from '../services/countries.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  stateInfo: any[] = [];
  cityInfo: any[] = [];
  zoom = 15;
  public latitude: number;
  public longitude: number;
@ViewChild("placesRef") placesRef : GooglePlaceDirective;
options = {
  types : [],
  componentRestrictions: { country: 'IN'}
}

  constructor(private country:CountriesService, private mapsAPILoader: MapsAPILoader) { }

  ngOnInit(): void {
    this.getStates();
    this.loadGoogle();
  }

  loadGoogle() {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
          this.latitude = position.coords.latitude;
          this.longitude = position.coords.longitude;
          this.zoom = 15;
        });
      }
  }
public handleAddressChange(address: Address) {
  this.latitude = address.geometry.location.lat();
  this.longitude = address.geometry.location.lng();
}
  getStates(){
    this.country.allStates().
    subscribe(
      data2 => {
        this.stateInfo=data2.states;
      },
      err => console.log(err),
      () => console.log('complete')
    )
  }

  onChangeState(stateValue) {
    this.cityInfo=this.stateInfo[stateValue].districts;
  }
}
