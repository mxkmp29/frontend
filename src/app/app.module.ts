import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {Graph2dComponent} from './pages/graph2d/graph2d.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatProgressBarModule,
    MatSelectModule,
    MatSliderModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatTooltipModule
} from '@angular/material';
import {ConfigurationComponent} from './pages/configuration/configuration.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {FormsModule} from '@angular/forms';
import {FileComponent} from './pages/file/file.component';
import {GenerationinfoComponent} from './pages/generationinfo/generationinfo.component';
import {ChartsModule} from 'ng2-charts';
import {FitnessGraphComponent} from './pages/fitness-graph/fitness-graph.component';

@NgModule({
    declarations: [
        AppComponent,
        Graph2dComponent,
        ConfigurationComponent,
        FileComponent,
        GenerationinfoComponent,
        FitnessGraphComponent
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
        MatProgressBarModule,
        MatBottomSheetModule,
        MatGridListModule,
        MatListModule,
        ChartsModule
    ],
    entryComponents: [
        FileComponent
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {


}
