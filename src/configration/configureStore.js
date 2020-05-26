import { createBrowserHistory } from 'history'
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware, { END } from 'redux-saga';
import { createLogger } from 'redux-logger';
import { routerMiddleware } from 'connected-react-router'
import rootReducer from '../reducers';

export const history = createBrowserHistory()

const initialState = {};
const sagaMiddleware = createSagaMiddleware()
const middleware = [sagaMiddleware, routerMiddleware(history), createLogger({collapsed: true})];

export const store = createStore(
	rootReducer(history),
	initialState,
	compose(
		applyMiddleware(...middleware), 
		(window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()) || compose
	)
);

store.runSaga = sagaMiddleware.run;
store.close = () => store.dispatch(END);

if(module.hot) {
	module.hot.accept('../reducers', () => {
		const nextRootReducer = require('../reducers').default
		store.replaceReducer(nextRootReducer)
	})
}