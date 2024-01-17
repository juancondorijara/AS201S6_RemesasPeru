import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { SendRemittanceComponent } from './components/send-remittance/send-remittance.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home-page'
  },
  {
    path: 'home-page',
    component: HomePageComponent
  },
  {
    path: 'send-remittance',
    component: SendRemittanceComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
