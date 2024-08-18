import { Component, OnInit } from '@angular/core';
import { DecimalPipe } from '@angular/common';

import { WeatherService } from '../../services/weather.service';
import { weatherData } from '../../models/weather.model';
import { WeatherCardComponent } from '../weather-card/weather-card.component';
@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [DecimalPipe, WeatherCardComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent implements OnInit {
  weatherData?: weatherData;

  constructor(private weatherService: WeatherService) { }

  ngOnInit(): void {
    this.weatherService.getCurrentWeather('vienna').subscribe({
      next: (data: weatherData) => {
        this.weatherData = data;
      }
    });
  }
}
