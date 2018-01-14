import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
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
    /**
     * Class constructor.
     * @param {HttpClient} http The Angular Http client for making XHTTP requests.
     * @param {ICacheAdapter<number, ForecastByDay>} cacheAdapter Caching adapter to cache API call results locally
     */
    constructor(
        private http: HttpClient,
        @Inject(FORECAST_CACHE_ADAPTER) private cacheAdapter: ICacheAdapter<number, ForecastByDay>
    ) {
        super();
    }

    /**
     * Get an observable to fetch the forecast from the cache if present or the API if not.
     * The data from the API is re-mapped to a more sutable structure ans also date properties
     * are added for each day to convert the unix timestamps to JS date objects.
     * @param {number} cityId The city ID of the forecast to fetch.
     * @return {Observable<ForecastByDay>} An observable to fetch the forecast from the cache or API.
     */
    public getForecast(cityId: number): Observable<ForecastByDay> {
        const params = new HttpParams()
            .set('id', cityId.toString())
            .set('APPID', environment.openWeatherMap.apiKey);
        return this.cacheAdapter.get(
            cityId,
            environment.maxCachedForecastAge,
            () => this.http.get<CityForecast>(environment.openWeatherMap.apiUrl, { params }).pipe(
                map(cf => mapToForecastByDay(cf))
            )
        );
    }
}
