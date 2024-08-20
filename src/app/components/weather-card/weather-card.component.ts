import { Component, Input } from '@angular/core';
import { DecimalPipe, NgClass } from '@angular/common';

@Component({
  selector: 'app-weather-card',
  standalone: true,
  imports: [DecimalPipe, NgClass],
  templateUrl: './weather-card.component.html',
  styleUrl: './weather-card.component.scss',
})
export class WeatherCardComponent {
  moreInfo: boolean = false;

  @Input() max?: number;
  @Input() min?: number;
  @Input() humidity?: number;
  @Input() temp?: number;
  @Input() wind?: number;
  @Input() name?: string;
  @Input() pressure?: number;
  @Input() seaLevel?: number;
  @Input() clouds?: number;
  @Input() feelsLike?: number;
  @Input() date?: string;
  @Input() showMoreInfo: boolean = false;

  toggleMoreInfo() {
    this.moreInfo = !this.moreInfo;
  }
}
