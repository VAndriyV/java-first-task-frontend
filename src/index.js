import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import App from "./components/App/App";
import * as serviceWorker from "./serviceWorker";
import store from "./store/store";
import { BookServiceProvider } from "./components/BookServiceProvider/BookServiceProvider";
import FetchApiService from "./services/FetchApiService";
import ErrorBoundry from "./components/error-boundry/error-boundry";

const bookService = new FetchApiService();
ReactDOM.render(
  <ErrorBoundry>
    <Provider store={store}>
      <BookServiceProvider value={bookService}>
        <App />
      </BookServiceProvider>
    </Provider>
  </ErrorBoundry>,
  document.getElementById("root")
);

serviceWorker.unregister();
