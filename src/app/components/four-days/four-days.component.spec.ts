import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FourDaysComponent } from './four-days.component';

describe('FourDaysComponent', () => {
  let component: FourDaysComponent;
  let fixture: ComponentFixture<FourDaysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FourDaysComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FourDaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
