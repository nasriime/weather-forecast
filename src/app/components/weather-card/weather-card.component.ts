import { Component, Input } from '@angular/core';
import { weatherData } from '../../models/weather.model';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-weather-card',
  standalone: true,
  imports: [DecimalPipe],
  templateUrl: './weather-card.component.html',
  styleUrl: './weather-card.component.scss'
})
export class WeatherCardComponent {
  @Input() weatherData?: weatherData;
}
