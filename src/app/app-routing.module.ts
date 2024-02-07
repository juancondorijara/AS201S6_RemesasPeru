import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomePageComponent } from './component/home-page/home-page.component';
import { SendRemittanceComponent } from './component/send-remittance/send-remittance.component';

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
  {
    path: 'app',
    component: AppComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }