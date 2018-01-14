import { HttpClientTestingModule } from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';
import { FORECAST_CACHE_ADAPTER } from '../../tokens';
import { ForecastLiveService } from './forecast-live.service';

describe('ForecastService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule
            ],
            providers: [
                ForecastLiveService,
                { provide: FORECAST_CACHE_ADAPTER, useValue: {} }
            ]
        });
    });

    it('should be created', inject([ForecastLiveService], (service: ForecastLiveService) => {
        expect(service).toBeTruthy();
    }));
});
