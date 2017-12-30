import { put, takeEvery, all } from 'redux-saga/effects';
import es6promise from 'es6-promise';
import fetch from 'isomorphic-fetch';

import { config } from '../cosmic/config';
import * as actionTypes from './constants';
import {
	failure,
	getTourSuccess,
	addTourSuccess,
	editTourSuccess,
	deleteTourSuccess,
	getTourDetailSuccess,
	addTourDetailSuccess,
	editTourDetailSuccess,
	deleteTourDetailSuccess
} from './actions';

es6promise.polyfill();

function* getTourData() {
	try {
		const endpoint = `${config.api_url}/${config.api_version}/${
			config.bucket.slug
		}/object-type/tours?read_key=${config.bucket.read_key}`;

		const res = yield fetch(endpoint);
		const data = yield res.json();
		console.log(data);
		yield put(getTourSuccess(data.objects));
	} catch (err) {
		console.log(err);
		yield put(failure(err));
	}
}

function* rootSaga() {
	yield all([takeEvery(actionTypes.GET_TOUR, getTourData)]);
}

export default rootSaga;
