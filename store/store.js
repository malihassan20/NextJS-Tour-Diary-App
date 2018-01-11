import { createStore, applyMiddleware } from 'redux';
import withRedux from 'next-redux-wrapper';
import nextReduxSaga from 'next-redux-saga';
import createSagaMiddleware from 'redux-saga';

import rootReducer, { initialState } from './reducer';
import rootSagas from './saga';

const sagaMiddleware = createSagaMiddleware();

export function configureStore(state = initialState) {
	const store = createStore(rootReducer, state, applyMiddleware(sagaMiddleware));

	store.sagaTask = sagaMiddleware.run(rootSagas);
	return store;
}

export function withReduxSaga(BaseComponent) {
	return withRedux(configureStore)(nextReduxSaga(BaseComponent));
}
