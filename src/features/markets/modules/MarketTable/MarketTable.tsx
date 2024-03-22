import classNames from 'classnames';
import {CurrenciesTypes, MarketEndpoints} from '../../types';
import useMarketsData from '../../useMarketsData';
import './MarketTable.scss';

export const marketEndpoints: MarketEndpoints = ['first', 'second', 'third'];

export const marketCurrencies: CurrenciesTypes = [
	'rub/cupcake',
	'usd/cupcake',
	'eur/cupcake',
	'rub/usd',
	'rub/eur',
	'eur/usd'
];

export default function MarketTable() {
	const {data, isEnabled, togglePolling} = useMarketsData();

	function handleTogglePolling(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
		e.preventDefault();
		togglePolling();
	}

	return (
		<div className='market-table__wrapper'>
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
					{marketCurrencies.map((row) => {
						const values = marketEndpoints.map((endpoint) => {
							return data?.[endpoint]?.[row] || 0;
						});

						const minIndex = values.indexOf(Math.min(...values));

						return (
							<tr className='market-table__row' key={`row_${row}`}>
								<td className='market-table__cell'>
									<div className='market-table__cell-inner'>
										<p className='market-table__name'>{row}</p>
									</div>
								</td>
								{values.map((value, ind) => {
									return (
										<td
											className={classNames('market-table__cell', {active: ind === minIndex})}
											key={`row_${row}_${ind}`}
										>
											<div className='market-table__cell-inner'>
												<p className='market-table__value'>{value}</p>
											</div>
										</td>
									);
								})}
							</tr>
						);
					})}
				</tbody>
			</table>
			<button className='market-table__toggle-button' type='button' onClick={(e) => handleTogglePolling(e)}>
				{isEnabled ? 'STOP' : 'START'}
			</button>
		</div>
	);
}
