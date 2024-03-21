export type MarketEndpoints = ['first', 'second', 'third'];

export interface FetchMarketOptions {
	endpoint: MarketEndpoints[number];
	polling?: boolean;
	signal?: AbortSignal;
}

export type ApiMarketRates = {
	EUR: number;
	RUB: number;
	USD: number;
};

export type ApiMarketResponse = {
	base: string;
	date: string;
	rates: ApiMarketRates;
	timestamp: number;
};

export type CurrenciesTypes = ['rub/cupcake', 'usd/cupcake', 'eur/cupcake', 'rub/usd', 'rub/eur', 'eur/usd'];

export type MarketRatesType = Record<CurrenciesTypes[number], number>;

export type MarketDataType = Record<MarketEndpoints[number], MarketRatesType>;
