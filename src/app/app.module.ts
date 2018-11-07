import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {Graph2dComponent} from './pages/graph2d/graph2d.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
    MatButtonModule,
    MatButtonToggleModule, MatCardModule,
    MatCheckboxModule, MatDividerModule, MatExpansionModule,
    MatIconModule, MatInputModule, MatProgressBarModule, MatSelectModule,
    MatSliderModule, MatSnackBarModule, MatToolbarModule,
    MatTooltipModule
} from '@angular/material';
import {ConfigurationComponent} from './pages/configuration/configuration.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {FormsModule} from '@angular/forms';

@NgModule({
    declarations: [
        AppComponent,
        Graph2dComponent,
        ConfigurationComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
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
        MatSelectModule,
        MatInputModule,
        MatCheckboxModule,
        MatCardModule,
        MatExpansionModule,
        MatSnackBarModule,
        MatDividerModule,
        MatProgressBarModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {


}
