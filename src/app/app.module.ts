import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Graph2dComponent } from './pages/graph2d/graph2d.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
    MatButtonModule,
    MatButtonToggleModule,
    MatCheckboxModule,
    MatIconModule, MatSelectModule,
    MatSliderModule, MatToolbarModule,
    MatTooltipModule
} from '@angular/material';
import { ConfigurationComponent } from './pages/configuration/configuration.component';
import {FlexLayoutModule} from '@angular/flex-layout';

@NgModule({
  declarations: [
    AppComponent,
    Graph2dComponent,
    ConfigurationComponent
  ],
  imports: [
    BrowserModule,
      FlexLayoutModule,
      AppRoutingModule,
    BrowserAnimationsModule,
      MatButtonModule,
      MatCheckboxModule,
      MatSliderModule,
      MatButtonToggleModule,
      MatIconModule,
      MatTooltipModule,
      MatToolbarModule,
      MatSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {


}
