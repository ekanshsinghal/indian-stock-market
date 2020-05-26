import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { store, history } from './configration/configureStore';
import { sagaListener } from './sagas';

store.runSaga(sagaListener);

ReactDOM.render(<App store={store} history={history}/>, document.getElementById('root'));

serviceWorker.unregister();