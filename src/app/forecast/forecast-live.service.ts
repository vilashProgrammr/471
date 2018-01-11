import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { CityForecast } from '../../models/city-forecast';
import { ForecastByDay } from './forecast-by-day.class';
import { ForecastService } from './forecast.service';

const apiKey = '6d67e9fa583373e16891628f2392a2c1';

@Injectable()
export class ForecastLiveService extends ForecastService {
    constructor(private http: HttpClient) {
        super();
    }

    public getForecast(cityId: number): Observable<ForecastByDay> {
        return this.http
            .get<CityForecast>(`http://api.openweathermap.org/data/2.5/forecast?id=${cityId}&APPID=${apiKey}`)
            .pipe(map(cf => new ForecastByDay().initializeFromCityForecast(cf)));
    }
}
