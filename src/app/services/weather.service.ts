import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { weatherData } from '../models/weather.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient) { }

  getWeatherData(cityName: string): Observable<weatherData> {
    return this.http.get<weatherData>(`${environment.weatherApiBaseUrl}?q=${cityName}&appid=${environment.weatherApiKey}`);
  }
}
