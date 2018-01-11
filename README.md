Basic styling (but I don't pretend to be a graphic designer).
Not responsive

I would re-map the API specific forecast data structre to own coomon fpormat to abstract the provider. Done server-side.

Server-sidfe API access aloows:
	Kepp the access key secure
	Rate limiter managerment
	caching

	I would also consider clienrt-side caching

	City/country selection using auto-compl;etwe
		- this is very static static so could be cached client-side
		