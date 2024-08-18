import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { weatherData } from '../models/weather.model';
import { multiDaysForcastData } from '../models/multiDaysForcast.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient) { }

  getCurrentWeather(cityName: string): Observable<weatherData> {
    return this.http.get<weatherData>(`${environment.weatherApiBaseUrl}/weather`,{
      params: new HttpParams()
      .set('q', cityName)
      .set('appid', environment.weatherApiKey)
      .set('units', 'metric')
    });
  }
  getMultiDaysForcast(lat: string, lon: string): Observable<multiDaysForcastData> {
    return this.http.get<multiDaysForcastData>(`${environment.weatherApiBaseUrl}/forecast`,{
      params: new HttpParams()
      .set('lat', lat)
      .set('lon', lon)
      .set('appid', environment.weatherApiKey)
      .set('units', 'metric')
    });
  }
}
