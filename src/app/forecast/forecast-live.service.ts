import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { map } from 'rxjs/operators';
import { ICacheAdapter } from '../../lib/caching/cache-adapter';
import { CityForecast } from '../../models/city-forecast';
import { FORECAST_CACHE_ADAPTER } from '../../tokens';
import { ForecastByDay } from './forecast-by-day.class';
import { ForecastService } from './forecast.service';

const API_KEY = '6d67e9fa583373e16891628f2392a2c1';
const MAX_CACHE_VALUE_AGE = 1000 * 60 * 10;  // 10 minutes

@Injectable()
export class ForecastLiveService extends ForecastService {
    constructor(
        private http: HttpClient,
        @Inject(FORECAST_CACHE_ADAPTER) private cacheAdapter: ICacheAdapter<number, ForecastByDay>
    ) {
        super();
    }

    public getForecast(cityId: number): Observable<ForecastByDay> {
        return fromPromise(
            this.cacheAdapter.get(
                cityId,
                MAX_CACHE_VALUE_AGE,
                () => this.http
                    .get<CityForecast>(`http://api.openweathermap.org/data/2.5/forecast?id=${cityId}&APPID=${API_KEY}`)
                    .pipe(map(cf => new ForecastByDay().initializeFromCityForecast(cf)))
                    .toPromise()
            )
        );
    }

    public dispose() {
        this.cacheAdapter.dispose();
    }
}
