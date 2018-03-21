import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { FormAddComponent } from './form-add/form-add.component';
import { ListViewComponent } from './list-view/list-view.component';
import { MapService } from './services/map.service';
import { ListItemComponent } from './list-item/list-item.component';


@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    FormAddComponent,
    ListViewComponent,
    ListItemComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [MapService],
  bootstrap: [AppComponent]
})
export class AppModule { }
