import { Routes } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { FourDaysComponent } from './components/four-days/four-days.component';

export const routes: Routes = [
    {path: '', component: HomePageComponent},
    {path: 'four-days', component: FourDaysComponent}
];
