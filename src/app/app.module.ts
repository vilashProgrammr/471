import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './/app-routing.module';
import { AppComponent } from './app.component';
import { ForecastModule } from './forecast/forecast.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

@NgModule({
    imports: [
        BrowserModule,
        ForecastModule,
        AppRoutingModule
    ],
    declarations: [
        AppComponent,
        PageNotFoundComponent
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
