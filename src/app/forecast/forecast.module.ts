import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ForecastDetailComponent } from './forecast-detail/forecast-detail.component';
import { ForecastListComponent } from './forecast-list/forecast-list.component';
import { ForecastRoutingModule } from './forecast-routing.module';
import { ForecastComponent } from './forecast.component';
import { ForecastService } from './forecast.service';

@NgModule({
    imports: [
        CommonModule,
        ForecastRoutingModule
    ],
    declarations: [
        ForecastListComponent,
        ForecastDetailComponent,
        ForecastComponent
    ],
    providers: [
        ForecastService
    ]
})
export class ForecastModule { }
