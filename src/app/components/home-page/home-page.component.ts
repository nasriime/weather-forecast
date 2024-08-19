import { Component, OnInit } from '@angular/core';
import { DecimalPipe } from '@angular/common';

import { WeatherService } from '../../services/weather.service';
import { weatherData } from '../../models/weather.model';
import { WeatherCardComponent } from '../weather-card/weather-card.component';
import { convertCountrryCodeToName } from '../../utils/index';
@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [DecimalPipe, WeatherCardComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent implements OnInit {
  weatherData?: weatherData;
  countryName?: string = '';
  locationDenied: boolean = false;
  errorMsg?: string = '';

  constructor(private weatherService: WeatherService) { }

  ngOnInit(): void {
    this.getLocation();
  }

  getCurrentWeather(lat: number, lon: number) {
     this.weatherService.getCurrentWeather(lat, lon).subscribe({
      next: (data: weatherData) => {
        this.countryName = convertCountrryCodeToName(data.sys.country);
        this.weatherData = data;
      }
    });
  }
  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {      
        this.getCurrentWeather(position.coords.latitude, position.coords.longitude);
      }, (error)=> {
        const errors: { [key: number]: string } = {
          [error.PERMISSION_DENIED]: 'User denied the request for Geolocation.',
          [error.POSITION_UNAVAILABLE]: 'Location information is unavailable.',
          [error.TIMEOUT]: 'The request to get user location timed out.',
        }
        if(error.code == error.PERMISSION_DENIED) {
          this.locationDenied = true
        }
        this.errorMsg = errors[error.code];
      })
    }
  } 

}
