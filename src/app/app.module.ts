import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { IndexedDbFactory } from '../lib/caching/indexed-db-factory';
import { DB_FACTORY } from '../tokens';
import { AppRoutingModule } from './/app-routing.module';
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
        PageNotFoundComponent
    ],
    providers: [
        { provide: DB_FACTORY, useClass: IndexedDbFactory }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
