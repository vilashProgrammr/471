import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs/observable/of';
import { AlertsService } from '../../alerts/alerts.service';
import { ForecastDetailComponent } from '../forecast-detail/forecast-detail.component';
import { ForecastService } from '../forecast.service';
import { ForecastListComponent } from './forecast-list.component';

describe('ForecastListComponent', () => {
    let component: ForecastListComponent;
    let fixture: ComponentFixture<ForecastListComponent>;
    const forecastServiceMock: ForecastService = { dispose: () => null, getForecast: () => of() };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule
            ],
            declarations: [
                ForecastDetailComponent,
                ForecastListComponent
            ],
            providers: [
                AlertsService,
                ForecastService,
                { provide: ForecastService, useValue: forecastServiceMock }
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ForecastListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
