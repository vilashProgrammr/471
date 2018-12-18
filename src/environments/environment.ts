// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
    production: false,
    maxCachedForecastAge: 1000 * 60 * 10,  // 10 minutes
    openWeatherMap: {
        apiUrl: 'https://api.openweathermap.org/data/2.5/forecast',
        apiKey: '6d67e9fa583373e16891628f2392a2c1'
    }
};
