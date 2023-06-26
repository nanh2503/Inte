import React from 'react';
import ReactDOM from 'react-dom';
import 'react-toastify/dist/ReactToastify.css';
import './styles/styles.scss';

import App from './containers/App';
import IntlProviderWrapper from "./hoc/IntlProviderWrapper";
import counter from './redux/slices/counter'

import { Provider } from 'react-redux';
import reduxStore, { persistor } from './redux/redux';
import { store } from './redux/store'

const renderApp = () => {
  ReactDOM.render(
    <Provider store={reduxStore}>
      <IntlProviderWrapper>
        <App persistor={persistor} />
      </IntlProviderWrapper>
    </Provider>,
    document.getElementById('root')
  );
};

renderApp();
