import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../../services/weather.service';
import { multiDaysForcastData, List } from '../../models/multiDaysForcast.model';
import { WeatherCardComponent } from '../weather-card/weather-card.component';

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

  constructor(private weatherService: WeatherService) { }

  ngOnInit(): void {
    this.weatherService.getMultiDaysForcast(48.210033, 16.363449).subscribe({
      next: (data: multiDaysForcastData) => {
        this.multiDaysForecastData = data;
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

}
