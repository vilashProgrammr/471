import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LOCAL_STORAGE } from '../tokens';
import { AppRoutingModule } from './app-routing.module';
import { AlertsComponent } from './alerts/alerts.component';
import { AlertsService } from './alerts/alerts.service';
import { AppComponent } from './app.component';
import { ForecastModule } from './forecast/forecast.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

@NgModule({
    imports: [
        BrowserModule,
        HttpClientModule,
        ForecastModule,
        AppRoutingModule
    ],
    declarations: [
        AppComponent,
        PageNotFoundComponent,
        AlertsComponent
    ],
    providers: [
        AlertsService,
        { provide: LOCAL_STORAGE, useValue: localStorage }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
