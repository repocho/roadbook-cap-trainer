import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import ReactGA from 'react-ga4';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
//Initialize GA4
ReactGA.initialize('G-BZ64QPL5RX');

root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);

const SendAnalytics = () => {
    ReactGA.send({
        hitType: 'pageview',
        page: window.location.pathname,
    });
};

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(SendAnalytics);
