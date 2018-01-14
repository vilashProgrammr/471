import { Component, Input } from '@angular/core';
import { DailyForecast, IntervalForecastEx } from '../../../models/forecast-by-day';

@Component({
    selector: 'app-forecast-detail',
    templateUrl: './forecast-detail.component.html',
    styleUrls: ['./forecast-detail.component.scss']
})
export class ForecastDetailComponent {
    @Input() public dailyForecast: DailyForecast;

    public units: 'metric' | 'imperial' = 'metric';

    /**
     * Get the display wind speed using the beufort scale.
     * @param {IntervalForecastEx} forecast The subject interval forecast.
     * @return {string} The wind speed converted to the beaufort scale.
     */
    public getWindSpeed(forecast: IntervalForecastEx): string {
        // Wind speed is in m/s. Convert to beaufort scale.
        const scale = [0.3, 1.6, 3.4, 5.5, 8.0, 10.8, 13.9, 17.2, 20.8, 24.5, 28.5, 32.7, Number.MAX_VALUE];
        return 'F' + scale.findIndex(c => forecast.wind.speed < c).toString();
    }

    /**
     * Get the display wind direction using compass points.
     * @param {IntervalForecastEx} forecast The subject interval forecast.
     * @return {string} The wind direction using compass points.
     */
    public getWindDirection(forecast: IntervalForecastEx): string {
        const deg = forecast.wind.deg;
        if (deg <= 22.5) {
            return 'N';
        } else if (deg < 67.5) {
            return 'NE';
        } else if (deg <= 112.5) {
            return 'E';
        } else if (deg < 157.5) {
            return 'SE';
        } else if (deg <= 202.5) {
            return 'S';
        } else if (deg < 247.5) {
            return 'SW';
        } else if (deg <= 292.5) {
            return 'W';
        } else if (deg < 337.5) {
            return 'SW';
        } else if (deg <= 360) {
            return 'N';
        } else {
            console.error('Invalid wind direction');
            return '';
        }
    }

    /**
     * Convert the temperature from degrees Kelvin to the selected units, Celsius or Fahrenheit.
     * @param {number} temp The temperature in degrees Kelvin.
     * @return {number} The converted temperature.
     */
    convertTemperature(temp: number): number {
        if (this.units === 'metric') {
            return temp - 273.15;
        }

        return temp * 9 / 5 - 459.67;
    }

    /**
     * Get the display temperature units string for the selected units.
     * @return {string} The display temperature units string for the selected units.
     */
    public get temperatureUnits(): string {
        if (this.units === 'metric') {
            return 'C';
        }

        return 'F';
    }

    /**
     * Map the weather icon from the API values to the css class for the icon library (weather-underground-icons).
     * @param {IntervalForecastEx} forecast The subject interval forecast.
     * @return {string} The icon css class name.
     */
    getIconClass(forecast: IntervalForecastEx): string {
        switch (forecast.weather[0].icon) {
            case '01d': // clear
            case '01n':
                return 'wu-clear';

            case '02d': // few clouds
            case '02n':
                return 'wu-partlycloudy';

            case '03d': // scattered clouds
            case '03n':
                return 'wu-mostlycloudy';

            case '04d': // overcast clouds
            case '04n':
                return 'wu-cloudy';

            case '09d': // drizzle
            case '09n':
                return 'wu-flurries';

            case '10d': // rain
            case '10n':
                return 'wu-rain';

            case '11d': // thunderstorm
            case '11n':
                return 'wu-tstorms';

            case '13d': // snow
            case '13n':
                return 'wu-snow';

            case '50d': // mist
            case '50n':
                return 'wu-fog';

            default:
                return 'wu-unknown';
        }
    }
}
