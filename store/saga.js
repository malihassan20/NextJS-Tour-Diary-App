import { put, call, takeEvery, all } from 'redux-saga/effects';
import es6promise from 'es6-promise';
import fetch from 'isomorphic-fetch';
import FormData from 'form-data';
import superagent from 'superagent';
import Cosmic from 'cosmicjs';

import config from '../cosmic/config';
import cosmic from '../cosmic/cosmic';
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
		const params = {
			type_slug: 'tours'
		};
		const tour = yield call(cosmic, 'GET_TYPE', params);
		yield put(getTourSuccess(tour !== undefined ? tour : []));
	} catch (err) {
		yield put(failure(err));
	}
}

function* addNewTour(action) {
	try {
		let params = {
			media: action.payloadData.featured_image.file,
			folder: config.image_folder,
			write_key: config.bucket.write_key
		};

		const mediaData = yield call(cosmic, 'ADD_MEDIA', params);
		if (mediaData.err) {
			yield put(failure(mediaData.err));
		}

		params = {
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
					key: 'featured_image',
					type: 'file',
					value: mediaData.body.media.name,
					id: mediaData.body.media._id
				}
			]
		};
		const tour = yield call(cosmic, 'ADD', params);

		if (!tour.err) {
			yield put(addTourSuccess(tour.object));
		} else {
			yield put(failure(tour.err));
		}
	} catch (err) {
		console.log(err.message);
		yield put(failure(err));
	}
}

function* deleteTour(action) {
	try {
		yield call(deleteMedia, action.payloadData.metafields[3].id);

		const params = {
			write_key: config.bucket.write_key,
			slug: action.payloadData.slug
		};

		const response = yield call(cosmic, 'DELETE', params);
		if (!response.err) {
			yield put(deleteTourSuccess(action.payloadData.slug));
		}
	} catch (err) {
		//console.log(err);
		yield put(failure(err));
	}
}

function* updateTour(action) {
	try {
		//delete old media
		yield call(deleteMedia, action.payloadData.metafields[3].id);

		let params = {
			media: action.payloadData.featured_image.file,
			folder: config.image_folder,
			write_key: config.bucket.write_key
		};
		//save new media
		const mediaData = yield call(cosmic, 'ADD_MEDIA', params);
		if (mediaData.err) {
			yield put(failure(mediaData.err));
		}

		params = {
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
		//update data
		const updatedTour = yield call(cosmic, 'EDIT', params);
		if (!updatedTour.err) {
			yield put(updateTourSuccess(updatedTour.object));
		}
	} catch (err) {
		console.log(err.message);
		yield put(failure(err));
	}
}

function* getTourDetail(action) {
	try {
		console.log(action.payloadData);
		const params = {
			type_slug: 'tour-details',
			metafield_key: 'tour_id',
			metafield_object_slug: action.tourId
		};
		const tourData = yield call(cosmic, 'GET_TYPE', params);
		yield put(
			getTourDetailSuccess(
				tourData !== undefined
					? { tourId: action.tourId, result: tourData }
					: { tourId: action.tourId, result: [] }
			)
		);
	} catch (err) {
		console.log(err);
		yield put(failure(err));
	}
}

function* addNewTourDetail(action) {
	try {
		let params = {
			media: action.payloadData.image.file,
			folder: config.image_folder,
			write_key: config.bucket.write_key
		};

		const mediaData = yield call(cosmic, 'ADD_MEDIA', params);
		if (mediaData.err) {
			yield put(failure(mediaData.err));
		}

		params = {
			write_key: config.bucket.write_key,
			type_slug: 'tour-details',
			title: action.payloadData.title,
			singular: action.payloadData.title,
			metafields: [
				{
					object_type: 'tours',
					value: action.payloadData.tourId,
					key: 'tour_id',
					title: 'Tour Id',
					type: 'object',
					object: true
				},
				{
					value: action.payloadData.date,
					type: 'text',
					key: 'date',
					title: 'Date'
				},
				{
					key: 'image',
					type: 'file',
					value: mediaData.body.media.name,
					id: mediaData.body.media._id
				}
			]
		};

		const response = yield call(cosmic, 'ADD', params);

		if (!response.err) {
			yield put(addTourDetailSuccess(response.object));
		} else {
			yield put(failure(response.err));
		}
	} catch (err) {
		console.log(err.message);
		yield put(failure(err));
	}
}

function* deleteTourDetail(action) {
	try {
		yield call(deleteMedia, action.payloadData.metafields[2].id);

		const params = {
			write_key: config.bucket.write_key,
			slug: action.payloadData.slug
		};

		const response = yield call(cosmic, 'DELETE', params);
		if (!response.err) {
			yield put(deleteTourDetailSuccess(action.payloadData.slug));
		}
	} catch (err) {
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
		yield put(updateTourDetailSuccess(data.object));
	} catch (err) {
		console.log(err.message);
		yield put(failure(err));
	}
}

function* deleteMedia(id) {
	const params = {
		media_id: id,
		write_key: config.bucket.write_key
	};
	const result = yield call(cosmic, 'DELETE_MEDIA', params);
	if (!result.err) {
		return true;
	}
	return false;
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
