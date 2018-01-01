import { put, takeEvery, all } from 'redux-saga/effects';
import es6promise from 'es6-promise';
import fetch from 'isomorphic-fetch';
import FormData from 'form-data';
import superagent from 'superagent';

import { config } from '../cosmic/config';
import {
	ADD_TOUR,
	UPDATE_TOUR,
	GET_TOUR,
	DELETE_TOUR,
	GET_TOUR_DETAIL,
	ADD_TOUR_DETAIL,
	UPDATE_TOUR_DETAIL,
	DELETE_TOUR_DETAIL
} from './constants';
import {
	failure,
	getTourSuccess,
	addTourSuccess,
	updateTourSuccess,
	deleteTourSuccess,
	getTourDetailSuccess,
	addTourDetailSuccess,
	updateTourDetailSuccess,
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
		if (data.status) yield put(getTourSuccess([]));
		else yield put(getTourSuccess(data.objects));
	} catch (err) {
		//console.log(err);
		yield put(failure(err));
	}
}

function* addNewTour(action) {
	try {
		//first add the media
		const mediaEndpoint = `${config.api_url}/${config.api_version}/${config.bucket.slug}/media`;
		const formData = new FormData();
		formData.append('media', action.payloadData.featured_image.file);
		formData.append('write_key', config.bucket.write_key);
		formData.append('folder', config.image_folder);
		const mediaRes = yield superagent
			.post(mediaEndpoint)
			.send(formData)
			.set('accept', 'json');
		const mediaData = JSON.parse(yield mediaRes.text);
		//console.log(mediaRes.text);
		//console.log(mediaData.media.name);

		//now add the data
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
					value: mediaData.media.name,
					type: 'file',
					key: 'featured_image',
					title: 'Featured Image'
				}
			]
		};
		//console.log(params);
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
		console.log(err.message);
		yield put(failure(err));
	}
}

function* deleteTour(action) {
	try {
		const endpoint = `${config.api_url}/${config.api_version}/${config.bucket.slug}/objects/${
			action.slug
		}`;

		yield fetch(endpoint, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				write_key: config.bucket.write_key
			})
		});
		yield put(deleteTourSuccess(action.slug));
	} catch (err) {
		//console.log(err);
		yield put(failure(err));
	}
}

function* updateTour(action) {
	try {
		const mediaEndpoint = `${config.api_url}/${config.api_version}/${config.bucket.slug}/media`;
		const formData = new FormData();
		formData.append('media', action.payloadData.featured_image.file);
		formData.append('write_key', config.bucket.write_key);
		formData.append('folder', config.image_folder);
		const mediaRes = yield superagent
			.post(mediaEndpoint)
			.send(formData)
			.set('accept', 'json');
		const mediaData = JSON.parse(yield mediaRes.text);

		//update object
		const endpoint = `${config.api_url}/${config.api_version}/${
			config.bucket.slug
		}/edit-object`;
		const params = {
			write_key: config.bucket.write_key,
			slug: action.payloadData.slug,
			title: action.payloadData.title,
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
					value: mediaData.media.name,
					type: 'file',
					key: 'featured_image',
					title: 'Featured Image'
				}
			]
		};
		console.log(params);
		const res = yield fetch(endpoint, {
			method: 'PUT',
			body: JSON.stringify(params),
			headers: {
				'Content-Type': 'application/json'
			}
		});
		const data = yield res.json();
		console.log(data.object);
		yield put(updateTourSuccess(data.object));
	} catch (err) {
		console.log(err.message);
		yield put(failure(err));
	}
}

function* getTourDetail(action) {
	try {
		console.log(action.payloadData);
		const endpoint = `${config.api_url}/${config.api_version}/${
			config.bucket.slug
		}/object-type/tour-details/search?metafield_key=tour_id&metafield_value=${
			action.payloadData
		}&read_key=${config.bucket.read_key}`;

		const res = yield fetch(endpoint);
		const data = yield res.json();
		console.log(data);
		if (data.status) {
			yield put(getTourDetailSuccess({ parent_tour: action.payloadData, result: [] }));
		} else {
			yield put(
				getTourDetailSuccess({ parent_tour: action.payloadData, result: data.objects })
			);
		}
	} catch (err) {
		console.log(err);
		yield put(failure(err));
	}
}

function* addNewTourDetail(action) {
	try {
		//first add the media
		const mediaEndpoint = `${config.api_url}/${config.api_version}/${config.bucket.slug}/media`;
		const formData = new FormData();
		formData.append('media', action.payloadData.image.file);
		formData.append('write_key', config.bucket.write_key);
		formData.append('folder', config.image_folder);
		const mediaRes = yield superagent
			.post(mediaEndpoint)
			.send(formData)
			.set('accept', 'json');
		const mediaData = JSON.parse(yield mediaRes.text);
		//console.log(mediaRes.text);
		//console.log(mediaData.media.name);

		//now add the data
		const endpoint = `${config.api_url}/${config.api_version}/${config.bucket.slug}/add-object`;
		const params = {
			write_key: config.bucket.write_key,
			type_slug: 'tour-details',
			title: action.payloadData.title,
			singular: action.payloadData.title,
			metafields: [
				{
					value: action.payloadData.date,
					type: 'text',
					key: 'date',
					title: 'Date'
				},
				{
					value: mediaData.media.name,
					type: 'file',
					key: 'image',
					title: 'Image'
				},
				{
					value: action.payloadData.parent_tour,
					type: 'text',
					key: 'tour_id',
					title: 'Tour Id'
				}
			]
		};
		//console.log(params);
		const res = yield fetch(endpoint, {
			method: 'POST',
			body: JSON.stringify(params),
			headers: {
				'Content-Type': 'application/json'
			}
		});
		const data = yield res.json();
		console.log(data.object);
		yield put(addTourDetailSuccess(data.object));
	} catch (err) {
		console.log(err.message);
		yield put(failure(err));
	}
}

function* deleteTourDetail(action) {
	try {
		const endpoint = `${config.api_url}/${config.api_version}/${config.bucket.slug}/objects/${
			action.slug
		}`;

		yield fetch(endpoint, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				write_key: config.bucket.write_key
			})
		});
		yield put(deleteTourDetailSuccess(action.slug));
	} catch (err) {
		//console.log(err);
		yield put(failure(err));
	}
}

function* updateTourDetail(action) {
	try {
		const mediaEndpoint = `${config.api_url}/${config.api_version}/${config.bucket.slug}/media`;
		const formData = new FormData();
		formData.append('media', action.payloadData.image.file);
		formData.append('write_key', config.bucket.write_key);
		formData.append('folder', config.image_folder);
		const mediaRes = yield superagent
			.post(mediaEndpoint)
			.send(formData)
			.set('accept', 'json');
		const mediaData = JSON.parse(yield mediaRes.text);

		//update object
		const endpoint = `${config.api_url}/${config.api_version}/${
			config.bucket.slug
		}/edit-object`;
		const params = {
			write_key: config.bucket.write_key,
			slug: action.payloadData.slug,
			title: action.payloadData.title,
			metafields: [
				{
					value: action.payloadData.date,
					type: 'text',
					key: 'date',
					title: 'Date'
				},
				{
					value: action.payloadData.parent_tour,
					type: 'text',
					key: 'tour_id',
					title: 'Tour Id'
				},
				{
					value: mediaData.media.name,
					type: 'file',
					key: 'image',
					title: 'Image'
				}
			]
		};
		console.log(params);
		const res = yield fetch(endpoint, {
			method: 'PUT',
			body: JSON.stringify(params),
			headers: {
				'Content-Type': 'application/json'
			}
		});
		const data = yield res.json();
		console.log('UDD'+ data.object);
		yield put(updateTourDetailSuccess(data.object));
	} catch (err) {
		console.log(err.message);
		yield put(failure(err));
	}
}

function* rootSaga() {
	yield all([
		takeEvery(GET_TOUR, getTourData),
		takeEvery(ADD_TOUR, addNewTour),
		takeEvery(DELETE_TOUR, deleteTour),
		takeEvery(UPDATE_TOUR, updateTour),
		takeEvery(GET_TOUR_DETAIL, getTourDetail),
		takeEvery(ADD_TOUR_DETAIL, addNewTourDetail),
		takeEvery(DELETE_TOUR_DETAIL, deleteTourDetail),
		takeEvery(UPDATE_TOUR_DETAIL, updateTourDetail)
	]);
}

export default rootSaga;
