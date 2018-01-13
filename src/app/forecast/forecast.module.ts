import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LocalStorageCacheAdapter } from '../../lib/caching/local-storage-cache-adapter';
import { FORECAST_CACHE_ADAPTER } from '../../tokens';
import { ForecastDetailComponent } from './forecast-detail/forecast-detail.component';
import { ForecastListComponent } from './forecast-list/forecast-list.component';
import { ForecastLiveService } from './forecast-live.service';
import { ForecastRoutingModule } from './forecast-routing.module';
// //import { ForecastStaticService } from './forecast-static.service';
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
        { provide: ForecastService, useClass: ForecastLiveService },
        { provide: FORECAST_CACHE_ADAPTER, useClass: LocalStorageCacheAdapter }
    ]
})
export class ForecastModule { }
