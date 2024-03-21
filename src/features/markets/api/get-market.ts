import {ApiMarketRates, ApiMarketResponse, FetchMarketOptions, MarketRatesType} from '../types';

const BASE_URL = 'http://localhost:3000/api/v1';

export default async function fetchMarket({endpoint, polling = false, signal}: FetchMarketOptions) {
	const response = await fetch(`${BASE_URL}/${endpoint}${polling ? `/poll` : ''}`, {
		cache: 'no-cache',
		...(signal ? {signal} : undefined)
	});

	if (response.ok) {
		const jsonData = (await response.json()) as ApiMarketResponse;

		const result = getRates(jsonData?.rates);

		return result;
	}

	throw new Error(`HTTP error: Status ${response.status}`);
}

function getRates(rates?: ApiMarketRates): MarketRatesType {
	if (!rates) {
		throw new Error(`Bad response`);
	}

	return {
		'eur/cupcake': +rates.EUR.toFixed(3),
		'eur/usd': +(rates.EUR / rates.USD).toFixed(3),
		'rub/cupcake': +rates.RUB.toFixed(3),
		'rub/eur': +(rates.RUB / rates.EUR).toFixed(3),
		'rub/usd': +(rates.RUB / rates.USD).toFixed(3),
		'usd/cupcake': +rates.USD.toFixed(3)
	};
}
