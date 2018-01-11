import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForecastListComponent } from './forecast-list/forecast-list.component';
import { ForecastComponent } from './forecast.component';

const routes: Routes = [
    {
        path: '5-day-forecast',
        component: ForecastComponent,
        children: [
            {
                path: ':cityId',
                component: ForecastListComponent
            }
        ]
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class ForecastRoutingModule { }
