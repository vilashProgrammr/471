# Weather Forecast Exercise

## Installation

`npm install`

## Execution

**To run the application:**

`npm start`

Once started, open a browser and navigate to: <http://localhost:4200/>

The default route is configured with the London city Id so you get a London forecast by default.

**To run the unit tests:**

`npm test`

## Implementation Notes

### .Net Web API proxy middleware

Unfortunately I didn't have enough time to implement this and was asked to just conentrate on the Angular application. However, I would take the following general approach:

+ Implement forecast caching using an adapter pattern in conjunction with dependency injection. This allows different adapters to be implemented to support scaling requirements.
+ Similar pattern for the weather API services to allow different API's to be supported and indeed multiple API's if one becomes unavailable or slow.
+ Map API specific data formats to a single common format.
+ Add a Country/City search API to support client-side auto-complete to allow city forecast selection and to resolve API specific city/forecast IDs.
+ Conversion of C# Pascal case to JSON camel case is done using the following code:

```C
	protected void Application_Start()
	{
		HttpConfiguration config = GlobalConfiguration.Configuration;
		config.Formatters.JsonFormatter.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
```

### Angular Client Application

Due to not implementing the .net back-end, I'm accessing the Open Weather Map API directly. Although I'm re-mapping the returned data to make it easier to use, I'm not completely re-mapping it to a common format. I would normally do this.

I've implemented client-side caching with a 10 minute expiration to improve performance and to avoid overstressing the weather service. It's a very simple implementation using Local Storage. In a more complex application I would pre-fix the key with the cache name, or use IndexedDB with a database per cache.

There isn't anywhere near adequate test coverage, but I've tried to give good range of examples.

I would have liked to have time to make the UI responsive, but didn't I'm afraid.