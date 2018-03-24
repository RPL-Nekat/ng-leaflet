import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LocationDetailComponent } from './components/location-detail/location-detail.component';

const routes: Routes = [
	{ path: 'detail/:name', component: LocationDetailComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
  declarations: []
})
export class AppRoutingModule { }
