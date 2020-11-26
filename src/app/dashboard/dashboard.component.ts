import { MapsAPILoader } from '@agm/core';
import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../services/countries.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  stateInfo: any[] = [];
  cityInfo: any[] = [];
  zoom = 13;
   latitude: number = 51.678418;
   longitude: number = 7.809007;

  constructor(private country:CountriesService, private mapsAPILoader: MapsAPILoader) { }

  ngOnInit(): void {
    this.getStates();
    // this.loadGoogle();
  }
  // loadGoogle() {
  //   this.mapsAPILoader.load().then(() => {
  //     this.placeService = new google.maps.places.AutocompleteService();
  //     this.placeServiceIsReady = true;
  //   });
  // }

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
