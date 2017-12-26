import { createStore } from 'redux';
import config from '../cosmic/config';
import Cosmic from 'cosmicjs';
import * as actionTypes from './constants';

const initialState = {
	tours: [],
	tour_details: [],
	toggleTourModal: false,
	toggleTourDetailModal: false,
};

let params = null;

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.GET_TOUR:
			params = {
				read_key: config.bucket.read_key,
				type_slug: 'tours',
			};
			Cosmic.getObject(config, params, (error, response) => {
				console.log('[GET_TOUR] ' + response);
			});
			return '';
		case actionTypes.ADD_TOUR:
			params = {
				write_key: config.bucket.write_key,
				type_slug: 'tours',
				title: action.payloadData.title,
				content: action.payloadData.content,
				start_date: action.payloadData.start_date,
				end_date: action.payloadData.end_date,
				location: action.payloadData.location,
				featured_image: action.payloadData.featured_image,
			};
			Cosmic.addObject(config, params, (error, response) => {
				console.log('[ADD_TOUR] ' + response);
			});
			return '';
		case actionTypes.EDIT_TOUR:
			params = {
				write_key: config.bucket.write_key,
				type_slug: 'tours',
				slug: action.slug,
				title: action.payloadData.title,
				content: action.payloadData.content,
				start_date: action.payloadData.start_date,
				end_date: action.payloadData.end_date,
				location: action.payloadData.location,
				featured_image: action.payloadData.featured_image,
			};
			Cosmic.editObject(config, params, (error, response) => {
				console.log('[EDIT_TOUR] ' + response);
			});
			return '';
		case actionTypes.DELETE_TOUR:
			params = {
				write_key: config.bucket.write_key,
				slug: action.slug,
			};
			Cosmic.deleteObject(config, params, (error, response) => {
				console.log('[DELETE_TOUR] ' + response);
			});
			return '';
		case actionTypes.GET_TOUR_DETAIL:
			params = {
				read_key: config.bucket.read_key,
				type_slug: 'tour-details',
				metafield_key: 'tour_id',
				metafield_object_slug: action.search_params,
			};
			Cosmic.getObjectsBySearch(config, params, (error, response) => {
				console.log('[GET_TOUR_DETAIL] ' + response);
			});
			return '';
		case actionTypes.ADD_TOUR_DETAIL:
			params = {
				write_key: config.bucket.write_key,
				type_slug: 'tour-details',
				title: action.payloadData.title,
				date: action.payloadData.date,
				image: action.payloadData.image,
				tour_id: action.payloadData.tour_id,
			};
			Cosmic.addObject(config, params, (error, response) => {
				console.log('[ADD_TOUR_DETAIL] ' + response);
			});
			return '';
		case actionTypes.EDIT_TOUR_DETAIL:
			params = {
				write_key: config.bucket.write_key,
				type_slug: 'tour-details',
				slug: action.slug,
				title: action.payloadData.title,
				date: action.payloadData.date,
				image: action.payloadData.image,
				tour_id: action.payloadData.tour_id,
			};
			Cosmic.editObject(config, params, (error, response) => {
				console.log('[EDIT_TOUR_DETAIL] ' + response);
			});
			return '';
		case actionTypes.DELETE_TOUR_DETAIL:
			params = {
				write_key: config.bucket.write_key,
				slug: action.slug,
			};
			Cosmic.deleteObject(config, params, (error, response) => {
				console.log('[DELETE_TOUR_DETAIL] ' + response);
			});
			return '';
		case actionTypes.TOGGLE_TOUR_MODAL:
			console.log('[DELETE_TOUR_DETAIL] Old: ' + state.toggleTourModal);
			const newTourModalState = !state.toggleTourModal;
			console.log('[DELETE_TOUR_DETAIL] New: ' + newTourModalState);
			return {
				...state,
				toggleTourModal: newTourModalState,
			};
		case actionTypes.TOGGLE_TOUR_DETAIL_MODAL:
			return console.log('[TOGGLE_TOUR_DETAIL_MODAL] Old: ' + state.toggleTourDetailModal);
			const newTourDetailModalState = !state.toggleTourDetailModal;
			console.log('[TOGGLE_TOUR_DETAIL_MODAL] New: ' + newTourDetailModalState);
			return {
				...state,
				toggleTourDetailModal: newTourDetailModalState,
			};
		default:
			return state;
	}
};

const initializeStore = (state = initialState) => createStore(reducer, state);

export default initializeStore;
