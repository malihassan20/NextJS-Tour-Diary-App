import { put, takeEvery, all } from 'redux-saga/effects';
import es6promise from 'es6-promise';
import fetch from 'isomorphic-fetch';

import { config } from '../cosmic/config';
import {
	ADD_TOUR,
	EDIT_TOUR,
	GET_TOUR,
	DELETE_TOUR,
	GET_TOUR_DETAIL,
	ADD_TOUR_DETAIL,
	EDIT_TOUR_DETAIL,
	DELETE_TOUR_DETAILS
} from './constants';
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
		//console.log(data);
		yield put(getTourSuccess(data.objects));
	} catch (err) {
		//console.log(err);
		yield put(failure(err));
	}
}

function* AddNewTour(action) {
	try {
		const endpoint = `${config.api_url}/${config.api_version}/${config.bucket.slug}/add-object`;

		const params = {
			write_key: config.bucket.write_key,
			type_slug: 'tours',
			title: action.payloadData.title,
			singular: action.payloadData.title,
			content: action.payloadData.content,
			metafields: [
				{
					value: action.payloadData.start_date,
					type: 'text',
					key: 'start_date',
					title: 'Start Date'
				},
				{
					value: action.payloadData.end_date,
					type: 'text',
					key: 'end_date',
					title: 'End Date'
				},
				{
					value: action.payloadData.location,
					type: 'text',
					key: 'location',
					title: 'Location'
				},
				{
					value: action.payloadData.featured_image,
					type: 'file',
					key: 'featured_image',
					title: 'Featured Image'
				}
			]
		};
		console.log(params);
		const res = yield fetch(endpoint, {
			method: 'POST',
			body: JSON.stringify(params),
			headers: {
				'Content-Type': 'application/json'
			}
		});
		const data = yield res.json();
		console.log(data.object);
		yield put(addTourSuccess(data.object));
	} catch (err) {
		console.log(err);
		yield put(failure(err));
	}
}

function* rootSaga() {
	yield all([takeEvery(GET_TOUR, getTourData), takeEvery(ADD_TOUR, AddNewTour)]);
}

export default rootSaga;
