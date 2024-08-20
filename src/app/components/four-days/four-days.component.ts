import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../../services/weather.service';
import { multiDaysForcastData, List } from '../../models/multiDaysForcast.model';
import { WeatherCardComponent } from '../weather-card/weather-card.component';
import { convertCountrryCodeToName } from '../../utils/index';

@Component({
  selector: 'app-four-days',
  standalone: true,
  imports: [WeatherCardComponent],
  templateUrl: './four-days.component.html',
  styleUrl: './four-days.component.scss'
})
export class FourDaysComponent implements OnInit {
  multiDaysForecastData?: multiDaysForcastData
  multiDaysForecastList?: List[] =[];
  countryName?: string = '';
  locationDenied: boolean = false;
  errorMsg?: string = '';

  constructor(private weatherService: WeatherService) { }

  ngOnInit(): void {
   this.getLocation()
  }
  getMultiDaysForcast(lat: number, lon: number) {
    this.weatherService.getMultiDaysForcast(lat, lon).subscribe({
      next: (data: multiDaysForcastData) => {
        this.multiDaysForecastData = data;
        this.countryName = convertCountrryCodeToName(data.city.country);
        let fourDaysDates: {[key: string]: boolean} = {};
  
        data.list.forEach(item => {
          const date = item.dt_txt.slice(0, 10);
          if(!fourDaysDates[date]) {
            fourDaysDates[date] = true;
            this.multiDaysForecastList?.push(item);
          }
        });
        
        this.multiDaysForecastList = this.multiDaysForecastList?.slice(1, 5);  
      }
    });
  }

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {      
        this.getMultiDaysForcast(position.coords.latitude, position.coords.longitude);
      }, (error)=> {
        const errors: { [key: number]: string } = {
          [error.PERMISSION_DENIED]: 'Denied the request for Geolocation!',
          [error.POSITION_UNAVAILABLE]: 'Location information is unavailable!',
          [error.TIMEOUT]: 'The request to get your location timed out!',
        }
        if(error.code == error.PERMISSION_DENIED) {
          this.locationDenied = true
        }
        this.errorMsg = errors[error.code];
      })
    }
  } 

}
