import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { ICacheAdapter } from '../../lib/caching/cache-adapter';
import { mapToForecastByDay } from '../../mappers/forecast-by-day-mapper';
import { CityForecast } from '../../models/city-forecast';
import { ForecastByDay } from '../../models/forecast-by-day';
import { FORECAST_CACHE_ADAPTER } from '../../tokens';
import { ForecastService } from './forecast.service';

@Injectable()
export class ForecastLiveService extends ForecastService {
    constructor(
        private http: HttpClient,
        @Inject(FORECAST_CACHE_ADAPTER) private cacheAdapter: ICacheAdapter<number, ForecastByDay>
    ) {
        super();
    }

    public getForecast(cityId: number): Observable<ForecastByDay> {
        const params = new HttpParams()
            .set('id', cityId.toString())
            .set('APPID', environment.openWeatherMap.apiKey);
        return fromPromise(
            this.cacheAdapter.get(
                cityId,
                environment.maxCachedForecastAge,
                () => this.http
                    .get<CityForecast>(environment.openWeatherMap.apiUrl, { params })
                    .pipe(map(cf => mapToForecastByDay(cf)))
                    .toPromise()
            )
        );
    }

    public dispose() {
        this.cacheAdapter.dispose();
    }
}
