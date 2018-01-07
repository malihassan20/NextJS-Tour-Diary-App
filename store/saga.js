import { put, call, takeEvery, all } from 'redux-saga/effects';

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
	getTourSuccess,
	getTourFail,
	addTourSuccess,
	addTourFail,
	updateTourSuccess,
	updateTourFail,
	deleteTourSuccess,
	deleteTourFail,
	getTourDetailSuccess,
	getTourDetailFail,
	addTourDetailSuccess,
	addTourDetailFail,
	updateTourDetailSuccess,
	updateTourDetailFail,
	deleteTourDetailSuccess,
	deleteTourDetailFail
} from './actions';

function* getTourData() {
	try {
		const params = {
			type_slug: 'tours'
		};
		const tour = yield call(cosmic, 'GET_TYPE', params);
		yield put(getTourSuccess(tour !== undefined ? tour : []));
	} catch (err) {
		yield put(getTourFail());
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
			yield put(addTourFail());
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
					id: mediaData.body.media._id,
					url: mediaData.body.media.url,
					imgix_url: mediaData.body.media.imgix_url
				}
			]
		};
		const tour = yield call(cosmic, 'ADD', params);

		if (!tour.err) {
			yield put(addTourSuccess(tour.object));
		} else {
			yield put(addTourFail());
		}
	} catch (err) {
		yield put(addTourFail());
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
		yield put(deleteTourFail());
	}
}

function* updateTour(action) {
	try {
		let params;
		let imageData;
		if (action.payloadData.featured_image) {
			//delete old media
			yield call(deleteMedia, action.payloadData.tourOldData.metafields[3].id);

			params = {
				media: action.payloadData.featured_image.file,
				folder: config.image_folder,
				write_key: config.bucket.write_key
			};
			//save new media
			const mediaData = yield call(cosmic, 'ADD_MEDIA', params);
			if (mediaData.err) {
				yield put(updateTourFail());
			}
			imageData = {
				value: mediaData.body.media.name,
				id: mediaData.body.media._id,
				url: mediaData.body.media.url,
				imgixUrl: mediaData.body.media.imgix_url
			};
		} else {
			imageData = {
				value: action.payloadData.tourOldData.metafields[3].value,
				id: action.payloadData.tourOldData.metafields[3].id,
				url: action.payloadData.tourOldData.metadata.featured_image.url,
				imgixUrl: action.payloadData.tourOldData.metadata.featured_image.imgix_url
			};
		}
		params = {
			write_key: config.bucket.write_key,
			slug: action.payloadData.tourOldData.slug,
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
					type: 'file',
					key: 'featured_image',
					title: 'Featured Image',
					value: imageData.value,
					id: imageData.id,
					url: imageData.url,
					imgix_url: imageData.imgixUrl
				}
			]
		};
		//update data
		const updatedTour = yield call(cosmic, 'EDIT', params);
		if (!updatedTour.err) {
			yield put(updateTourSuccess(updatedTour.object));
		}
	} catch (err) {
		yield put(updateTourFail());
	}
}

function* getTourDetail(action) {
	try {
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
		yield put(getTourDetailFail());
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
			yield put(addTourDetailFail());
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
					id: mediaData.body.media._id,
					url: mediaData.body.media.url,
					imgix_url: mediaData.body.media.imgix_url
				}
			]
		};

		const response = yield call(cosmic, 'ADD', params);

		if (!response.err) {
			yield put(addTourDetailSuccess(response.object));
		} else {
			yield put(addTourDetailFail());
		}
	} catch (err) {
		yield put(addTourDetailFail());
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
		yield put(deleteTourDetailFail());
	}
}

function* updateTourDetail(action) {
	try {
		let params;
		let imageData;
		if (action.payloadData.image) {
			//delete old media
			yield call(deleteMedia, action.payloadData.metafields[2].id);

			params = {
				media: action.payloadData.image.file,
				folder: config.image_folder,
				write_key: config.bucket.write_key
			};
			//save new media
			const mediaData = yield call(cosmic, 'ADD_MEDIA', params);
			if (mediaData.err) {
				yield put(updateTourDetailFail());
			}
			imageData = {
				value: mediaData.body.media.name,
				id: mediaData.body.media._id,
				url: mediaData.body.media.url,
				imgixUrl: mediaData.body.media.imgix_url
			};
		} else {
			imageData = {
				value: action.payloadData.metafields[2].value,
				id: action.payloadData.metafields[2].id,
				url: action.payloadData.tour_detail.metadata.image.url,
				imgixUrl: action.payloadData.tour_detail.metadata.image.imgix_url
			};
		}
		params = {
			write_key: config.bucket.write_key,
			slug: action.payloadData.tour_detail.slug,
			title: action.payloadData.title,
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
					value: imageData.value,
					id: imageData.id,
					url: imageData.url,
					imgix_url: imageData.imgixUrl
				}
			]
		};

		//update data
		const updatedTour = yield call(cosmic, 'EDIT', params);
		if (!updatedTour.err) {
			yield put(updateTourDetailSuccess(updatedTour.object));
		}
	} catch (err) {
		yield put(updateTourDetailFail());
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
