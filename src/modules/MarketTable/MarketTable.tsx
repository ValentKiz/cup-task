import {useEffect, useRef, useState} from 'react';
import fetchMarket, {EndpointsType, FetchMarketOptions} from '@app/actions/market';
import classNames from 'classnames';
import './MarketTable.scss';

type MarketRatesType = {
	'eur/cupcake': number;
	'eur/usd': number;
	'rub/cupcake': number;
	'rub/eur': number;
	'rub/usd': number;
	'usd/cupcake': number;
};

type CellsTypes = 'eur/cupcake' | 'eur/usd' | 'rub/cupcake' | 'rub/eur' | 'rub/usd' | 'usd/cupcake';

const cells: CellsTypes[] = ['rub/cupcake', 'usd/cupcake', 'eur/cupcake', 'rub/usd', 'rub/eur', 'eur/usd'];
const markets: EndpointsType[] = ['first', 'second', 'third'];

const initData: Record<EndpointsType, MarketRatesType> = {
	first: {
		'eur/cupcake': 0,
		'eur/usd': 0,
		'rub/cupcake': 0,
		'rub/eur': 0,
		'rub/usd': 0,
		'usd/cupcake': 0
	},
	second: {
		'eur/cupcake': 0,
		'eur/usd': 0,
		'rub/cupcake': 0,
		'rub/eur': 0,
		'rub/usd': 0,
		'usd/cupcake': 0
	},
	third: {
		'eur/cupcake': 0,
		'eur/usd': 0,
		'rub/cupcake': 0,
		'rub/eur': 0,
		'rub/usd': 0,
		'usd/cupcake': 0
	}
};

export default function MarketTable() {
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
			}

			if (isPolling) {
				await longpollingFetch({endpoint, polling: true});
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

	function togglePolling(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
		e.preventDefault();
		if (isEnabled) {
			// abortRef.current?.abort();
		}
		setIsEnabled(!isEnabled);
	}

	return (
		<div className='market-table__wrapper'>
			<button className='market-table__toggle-button' type='button' onClick={(e) => togglePolling(e)}>
				{isEnabled ? 'STOP' : 'START'}
			</button>
			<button
				type='button'
				onClick={() => {
					console.log(isEnabled);
				}}
			>
				console
			</button>
			<button
				type='button'
				onClick={() => {
					console.log(data);
				}}
			>
				console data
			</button>
			<table className='market-table'>
				<thead className='market-table__head'>
					<tr className='market-table__row market-table__row--head'>
						<th className='market-table__cell market-table__cell--head'>
							<p className='market-table__cell-inner market-table__cell-inner--head'>Pair name/market</p>
						</th>
						<th className='market-table__cell market-table__cell--head'>
							<p className='market-table__cell-inner market-table__cell-inner--head'>First</p>
						</th>
						<th className='market-table__cell market-table__cell--head'>
							<p className='market-table__cell-inner market-table__cell-inner--head'>Second</p>
						</th>
						<th className='market-table__cell market-table__cell--head'>
							<p className='market-table__cell-inner market-table__cell-inner--head'>Third</p>
						</th>
					</tr>
				</thead>
				<tbody className='market-table__body'>
					{cells.map((cell) => {
						const values = markets.map((value) => {
							return data?.[value]?.[cell];
						});

						const minIndex = values.indexOf(Math.min(...values));

						return (
							<tr className='market-table__row' key={`row_${cell}`}>
								<td className='market-table__cell'>
									<div className='market-table__cell-inner'>
										<p className='market-table__name'>{cell}</p>
									</div>
								</td>
								{values.map((val, ind) => {
									return (
										<td
											className={classNames('market-table__cell', {active: ind === minIndex})}
											key={`cell_${cell}_${ind}`}
										>
											<div className='market-table__cell-inner'>
												<p className='market-table__value'>{val}</p>
											</div>
										</td>
									);
								})}
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
}
