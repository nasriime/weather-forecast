import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WeatherCardComponent } from './weather-card.component';
import { By } from '@angular/platform-browser';
import { DecimalPipe } from '@angular/common';

describe('WeatherCardComponent', () => {
  let component: WeatherCardComponent;
  let fixture: ComponentFixture<WeatherCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeatherCardComponent],
      providers: [DecimalPipe],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should display the correct weather image based on temperature', () => {
    component.temp = 20;
    fixture.detectChanges();
    const imageElement = fixture.debugElement.query(
      By.css('img')
    ).nativeElement;
    expect(imageElement.src).toContain('/hot.jpg');

    component.temp = 10;
    fixture.detectChanges();
    expect(imageElement.src).toContain('/cold.jpg');
  });

  it('should display the correct temperature and location', () => {
    component.temp = 25.567;
    component.name = 'New York';
    fixture.detectChanges();

    const locationElement = fixture.debugElement.query(
      By.css('.location')
    ).nativeElement;
    const temperatureElement = fixture.debugElement.query(
      By.css('.temperature')
    ).nativeElement;

    expect(locationElement.textContent).toContain('New York');
    expect(temperatureElement.textContent).toContain('26°C'); // rounded number
  });

  it('should display the correct date', () => {
    const testDate = '2024-08-20';
    component.date = testDate;
    fixture.detectChanges();

    const dateElement = fixture.debugElement.query(
      By.css('.date')
    ).nativeElement;
    expect(dateElement.textContent).toContain(testDate);
  });

  it('should toggle the moreInfo state when toggleMoreInfo is called', () => {
    expect(component.moreInfo).toBeFalse();

    component.toggleMoreInfo();
    expect(component.moreInfo).toBeTrue();

    component.toggleMoreInfo();
    expect(component.moreInfo).toBeFalse();
  });

  it('should correctly render additional weather data when moreInfo is true', () => {
    component.showMoreInfo = true;
    component.moreInfo = true;
    component.min = 12;
    component.max = 30;
    component.humidity = 70;
    component.wind = 15;
    component.pressure = 1013;
    component.feelsLike = 28;
    component.clouds = 50;
    component.seaLevel = 500;
    fixture.detectChanges();

    const infoBlockValues = fixture.debugElement.queryAll(
      By.css('.info-block-value')
    );

    expect(infoBlockValues.length).toBe(8); // 8 data points
    expect(infoBlockValues[0].nativeElement.textContent).toContain('12°C');
    expect(infoBlockValues[1].nativeElement.textContent).toContain('30°C');
    expect(infoBlockValues[2].nativeElement.textContent).toContain('70%');
    expect(infoBlockValues[3].nativeElement.textContent).toContain('15 km/h');
    expect(infoBlockValues[4].nativeElement.textContent).toContain('1013 hPa');
    expect(infoBlockValues[5].nativeElement.textContent).toContain('28°C');
    expect(infoBlockValues[6].nativeElement.textContent).toContain('50 %');
    expect(infoBlockValues[7].nativeElement.textContent).toContain('500 m');
  });

  it('should show or hide the more info label based on showMoreInfo input', () => {
    component.showMoreInfo = true;
    fixture.detectChanges();

    let moreInfoLabel = fixture.debugElement.query(By.css('.more-info-label'));
    expect(moreInfoLabel).not.toBeNull();

    component.showMoreInfo = false;
    fixture.detectChanges();

    moreInfoLabel = fixture.debugElement.query(By.css('.more-info-label'));
    expect(moreInfoLabel).toBeNull();
  });

  it('should display "More Info" or "Less Info" based on the moreInfo state', () => {
    component.showMoreInfo = true;
    component.moreInfo = false;
    fixture.detectChanges();

    let moreInfoLabel = fixture.debugElement.query(
      By.css('.more-info-label')
    ).nativeElement;
    expect(moreInfoLabel.textContent).toContain('More Info');

    component.toggleMoreInfo();
    fixture.detectChanges();

    expect(moreInfoLabel.textContent).toContain('Less Info');
  });
});
