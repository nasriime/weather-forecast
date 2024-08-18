import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../../services/weather.service';
 import { multiDaysForcastData, List } from '../../models/multiDaysForcast.model';

@Component({
  selector: 'app-four-days',
  standalone: true,
  imports: [],
  templateUrl: './four-days.component.html',
  styleUrl: './four-days.component.scss'
})
export class FourDaysComponent implements OnInit {
  multiDaysForcastList?: List[] =[];

  constructor(private weatherService: WeatherService) { }

  ngOnInit(): void {
    this.weatherService.getMultiDaysForcast(48.210033, 16.363449).subscribe({
      next: (data: multiDaysForcastData) => {
        let fourDaysDates: {[key: string]: boolean} = {};

        data.list.forEach(item => {
          const date = item.dt_txt.slice(0, 10);
          if(!fourDaysDates[date]) {
            fourDaysDates[date] = true;
            this.multiDaysForcastList?.push(item);
          }
        });
        
        this.multiDaysForcastList = this.multiDaysForcastList?.slice(1, 5);  
      }
    });
  }

}
