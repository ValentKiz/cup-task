const BASE_URL = 'http://localhost:3000/api/v1';

export type EndpointsType = 'first' | 'second' | 'third';

export interface FetchMarketOptions {
	endpoint: EndpointsType;
	polling?: boolean;
	signal?: AbortSignal;
}

type ApiMarketRates = {
	EUR: number;
	RUB: number;
	USD: number;
};

type ApiMarketResponse = {
	base: string;
	date: string;
	rates: ApiMarketRates;
	timestamp: number;
};

function getRates(rates?: ApiMarketRates) {
	if (!rates) {
		throw new Error(`Bad response`);
	}

	return {
		'eur/cupcake': +rates.EUR.toFixed(4),
		'eur/usd': +(rates.EUR / rates.USD).toFixed(4),
		'rub/cupcake': +rates.RUB.toFixed(4),
		'rub/eur': +(rates.RUB / rates.EUR).toFixed(4),
		'rub/usd': +(rates.RUB / rates.USD).toFixed(4),
		'usd/cupcake': +rates.USD.toFixed(4)
	};
}

export default async function fetchMarket({endpoint, polling = false, signal}: FetchMarketOptions) {
	const response = await fetch(`${BASE_URL}/${endpoint}${polling ? `/poll` : ''}`, {
		cache: 'no-cache',
		...(signal ? {signal} : undefined)
	});
	if (response.ok) {
		const jsonData = (await response.json()) as ApiMarketResponse;
		console.log(jsonData);

		const result = getRates(jsonData?.rates);
		return result;
		// throw new Error(`Bad response`);
	}
	throw new Error(`HTTP error: Status ${response.status}`);
}
