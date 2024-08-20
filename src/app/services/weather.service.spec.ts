import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { WeatherService } from './weather.service';
import { environment } from '../../environments/environment.development';
import { mockWeatherData, mockMultiDaysForcastData } from './weather-data.mock';
describe('WeatherService', () => {
  let service: WeatherService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [WeatherService],
    });

    service = TestBed.inject(WeatherService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify(); // Verifies that no unmatched requests are outstanding
  });

  it('should fetch current weather data', () => {
    const lat = 10;
    const lon = 20;

    service.getCurrentWeather(lat, lon).subscribe((data) => {
      expect(data).toEqual(mockWeatherData);
    });

    const req = httpTestingController.expectOne(
      `${environment.weatherApiBaseUrl}/weather?lat=${lat}&lon=${lon}&appid=${environment.weatherApiKey}&units=metric`
    );

    expect(req.request.method).toBe('GET');
    req.flush(mockWeatherData);
  });

  it('should handle errors when fetching current weather data', () => {
    const lat = 10;
    const lon = 20;

    service.getCurrentWeather(lat, lon).subscribe({
      next: () => fail('expected an error, not weather data'),
      error: (error) => {
        expect(error.status).toBe(404);
      },
    });

    const req = httpTestingController.expectOne(
      `${environment.weatherApiBaseUrl}/weather?lat=${lat}&lon=${lon}&appid=${environment.weatherApiKey}&units=metric`
    );

    expect(req.request.method).toBe('GET');
    req.flush('Error', { status: 404, statusText: 'Not Found' });
  });

  it('should fetch multi-days forecast data', () => {
    const lat = 10;
    const lon = 20;

    service.getMultiDaysForcast(lat, lon).subscribe((data) => {
      expect(data).toEqual(mockMultiDaysForcastData);
    });

    const req = httpTestingController.expectOne(
      `${environment.weatherApiBaseUrl}/forecast?lat=${lat}&lon=${lon}&appid=${environment.weatherApiKey}&units=metric`
    );

    expect(req.request.method).toBe('GET');
    req.flush(mockMultiDaysForcastData);
  });

  it('should handle errors when fetching multi-days forecast data', () => {
    const lat = 10;
    const lon = 20;

    service.getMultiDaysForcast(lat, lon).subscribe({
      next: () => fail('expected an error, not forecast data'),
      error: (error) => {
        expect(error.status).toBe(500);
      },
    });

    const req = httpTestingController.expectOne(
      `${environment.weatherApiBaseUrl}/forecast?lat=${lat}&lon=${lon}&appid=${environment.weatherApiKey}&units=metric`
    );

    expect(req.request.method).toBe('GET');
    req.flush('Error', { status: 500, statusText: 'Internal Server Error' });
  });
});
