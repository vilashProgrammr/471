import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { _throw } from 'rxjs/observable/throw';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { DailyForecast, ForecastByDay } from '../../../models/forecast-by-day';
import { ForecastService } from '../forecast.service';

@Component({
    selector: 'app-forecast-list',
    templateUrl: './forecast-list.component.html',
    styleUrls: ['./forecast-list.component.scss']
})
export class ForecastListComponent implements OnDestroy, OnInit {
    public forecast$: Observable<ForecastByDay>;
    public selectedForecast: DailyForecast;

    constructor(
        private route: ActivatedRoute,
        public forecastService: ForecastService) {
    }

    ngOnInit() {
        this.forecast$ = this.route.paramMap.pipe(
            switchMap(params => this.forecastService.getForecast(+params.get('cityId'))),
            tap(forecast => this.selectedForecast = forecast.dailyForecasts[0]),
            catchError(err => {
                console.error('Caught: ' + err);
                return _throw(err);
            })
        );
    }

    ngOnDestroy() {
        this.forecastService.dispose();
    }

    selectForecast(forecast: DailyForecast) {
        this.selectedForecast = forecast;
    }
}
