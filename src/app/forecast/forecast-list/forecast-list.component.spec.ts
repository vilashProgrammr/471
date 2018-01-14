import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRouteStub } from '../../../lib/testing/activated-route-stub';
import { click } from '../../../lib/testing/helpers';
import { AlertsService } from '../../alerts/alerts.service';
import { ForecastDetailComponent } from '../forecast-detail/forecast-detail.component';
import { ForecastStaticService } from '../forecast-static.service';
import { ForecastService } from '../forecast.service';
import { ForecastListComponent } from './forecast-list.component';

let forecastServiceMock: ForecastService;
let activatedRouteStub: ActivatedRouteStub;
let component: ForecastListComponent;
let fixture: ComponentFixture<ForecastListComponent>;
let page: Page;

describe('ForecastListComponent', () => {
    beforeEach(async(async () => {
        activatedRouteStub = new ActivatedRouteStub();
        activatedRouteStub.testParamMap = { cityId: '12345' };
        forecastServiceMock = new ForecastStaticService();
        spyOn(forecastServiceMock, 'getForecast').and.callThrough();

        await TestBed.configureTestingModule({
            imports: [
                RouterTestingModule
            ],
            declarations: [
                ForecastDetailComponent,
                ForecastListComponent
            ],
            providers: [
                AlertsService,
                { provide: ActivatedRoute, useValue: activatedRouteStub },
                { provide: ForecastService, useValue: forecastServiceMock }
            ]
        }).compileComponents();
        await createComponent();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('When navigating to a city forecast', () => {
        it('Should call the forecast service with the route param city id as a number', () => {
            expect((forecastServiceMock.getForecast as jasmine.Spy).calls.argsFor(0)).toEqual([12345]);
        });

        it('Should display the city name', () => {
            expect(page.cityNameDisplay.textContent).toEqual('Moscow');
        });

        it('Should display the day headings', () => {
            expect(page.dayHeadings.length).toEqual(6);
            expect(page.dayHeadings[0].textContent).toEqual('Monday');
            expect(page.dayHeadings[1].textContent).toEqual('Tuesday');
            expect(page.dayHeadings[2].textContent).toEqual('Wednesday');
            expect(page.dayHeadings[3].textContent).toEqual('Thursday');
            expect(page.dayHeadings[4].textContent).toEqual('Friday');
            expect(page.dayHeadings[5].textContent).toEqual('Saturday');
        });

        it('Should make the 1st day link active', () => {
            expect(page.dayLinks[0].classList.contains('active')).toBeTruthy();
        });

        it('Should the day forecast link active when clicked', () => {
            click(page.dayLinks[3]);
            fixture.detectChanges();
            expect(page.dayLinks[3].classList.contains('active')).toBeTruthy();
        });

        it('Should set the day forecast to the current selected when clicked', () => {
            click(page.dayLinks[3]);
            fixture.detectChanges();
            expect(component.selectedForecast.date.getDay()).toEqual(4);
        });
    });
});

class Page {
    cityNameDisplay: HTMLElement;
    dayHeadings: HTMLLIElement[];
    dayLinks: HTMLLIElement[];

    constructor() {
        this.cityNameDisplay = fixture.debugElement.query(By.css('#cityName')).nativeElement;
        this.dayHeadings = fixture.debugElement.queryAll(By.css('.day-heading')).map(e => e.nativeElement);
        this.dayLinks = fixture.debugElement.queryAll(By.css('.nav-link')).map(e => e.nativeElement);
    }
}

async function createComponent() {
    fixture = TestBed.createComponent(ForecastListComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    page = new Page();
}
