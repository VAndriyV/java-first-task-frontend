import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './components/App/App';
import * as serviceWorker from './serviceWorker';
import store from './store/store';
import { BookServiceProvider } from './components/BookServiceProvider/BookServiceProvider';
import MockService from './services/MockService';
import FetchApiService from './services/FetchApiService';

const bookService = new FetchApiService();
ReactDOM.render(
        <Provider store={store}>
                <BookServiceProvider value={bookService}>
                        <App />
                </BookServiceProvider>
        </Provider>
        , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
