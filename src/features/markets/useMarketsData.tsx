import {useEffect, useRef, useState} from 'react';
import {CurrenciesTypes, FetchMarketOptions, MarketDataType, MarketEndpoints, MarketRatesType} from './types';
import fetchMarket from './api/get-market';

export const marketEndpoints: MarketEndpoints = ['first', 'second', 'third'];

export const marketCurrencies: CurrenciesTypes = [
	'rub/cupcake',
	'usd/cupcake',
	'eur/cupcake',
	'rub/usd',
	'rub/eur',
	'eur/usd'
];

const initCurrencies: MarketRatesType = {
	'eur/cupcake': 0,
	'eur/usd': 0,
	'rub/cupcake': 0,
	'rub/eur': 0,
	'rub/usd': 0,
	'usd/cupcake': 0
};

const initData: MarketDataType = {
	first: initCurrencies,
	second: initCurrencies,
	third: initCurrencies
};

export default function useMarketsData() {
	const [data, setData] = useState(initData);
	const [isEnabled, setIsEnabled] = useState(true);

	const abortRef = useRef<AbortController | null>(null);

	useEffect(() => {
		let isPolling = true;

		if (isEnabled) {
			abortRef.current = new AbortController();
			isPolling = true;
		} else if (!isEnabled) {
			isPolling = false;
		}

		const signal = abortRef?.current?.signal;

		async function longpollingFetch({endpoint, polling = false}: Omit<FetchMarketOptions, 'signal'>) {
			try {
				const newData = await fetchMarket({endpoint, polling, signal});

				setData((prev) => ({...prev, [endpoint]: newData}));
			} catch (error) {
				if (error instanceof DOMException || (error instanceof Error && error.name === 'AbortError')) {
					isPolling = false;
					console.log('requests stop');
				} else {
					console.error(error);
				}
			} finally {
				if (isPolling) {
					await longpollingFetch({endpoint, polling: true});
				}
			}
		}

		longpollingFetch({endpoint: 'first'});
		longpollingFetch({endpoint: 'second'});
		longpollingFetch({endpoint: 'third'});

		return () => {
			isPolling = false;
			// abortRef.current?.abort();
		};
	}, [isEnabled]);

	function togglePolling() {
		if (isEnabled) {
			// abortRef.current?.abort();
		}
		setIsEnabled(!isEnabled);
	}

	return {data, togglePolling, isEnabled};
}
