import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import '@app/styles/index.scss';

ReactDOM.createRoot(document.querySelector('#root')!).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);
