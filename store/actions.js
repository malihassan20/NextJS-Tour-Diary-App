import * as actionTypes from './constants';

export const failure = error => ({
	type: actionTypes.FAILURE,
	error
});

export const getTour = () => ({
	type: actionTypes.GET_TOUR
});

export const getTourSuccess = payloadData => ({
	type: actionTypes.GET_TOUR_SUCCESS,
	payloadData
});

export const addTour = payloadData => ({
	type: actionTypes.ADD_TOUR,
	payloadData
});

export const addTourSuccess = payloadData => ({
	type: actionTypes.ADD_TOUR_SUCCESS,
	payloadData
});

export const editTour = (slug, payloadData) => ({
	type: actionTypes.EDIT_TOUR,
	slug,
	payloadData
});

export const editTourSuccess = (slug, payloadData) => ({
	type: actionTypes.EDIT_TOUR_SUCCESS,
	slug,
	payloadData
});

export const deleteTour = slug => ({
	type: actionTypes.DELETE_TOUR,
	slug
});

export const deleteTourSuccess = slug => ({
	type: actionTypes.DELETE_TOUR_SUCCESS,
	slug
});

export const getTourDetail = payloadData => ({
	type: actionTypes.GET_TOUR_DETAIL,
	payloadData
});

export const getTourDetailSuccess = payloadData => ({
	type: actionTypes.GET_TOUR_DETAIL_SUCCESS,
	payloadData
});

export const addTourDetail = payloadData => ({
	type: actionTypes.ADD_TOUR_DETAIL,
	payloadData
});

export const addTourDetailSuccess = payloadData => ({
	type: actionTypes.ADD_TOUR_DETAIL_SUCCESS,
	payloadData
});

export const editTourDetail = (slug, payloadData) => ({
	type: actionTypes.EDIT_TOUR_DETAIL,
	slug,
	payloadData
});

export const editTourDetailSuccess = (slug, payloadData) => ({
	type: actionTypes.EDIT_TOUR_DETAIL_SUCCESS,
	slug,
	payloadData
});

export const deleteTourDetail = slug => ({
	type: actionTypes.DELETE_TOUR_DETAIL,
	slug
});

export const deleteTourDetailSuccess = slug => ({
	type: actionTypes.DELETE_TOUR_DETAIL_SUCCESS,
	slug
});

export const toggleTourModal = () => ({
	type: actionTypes.TOGGLE_TOUR_MODAL
});

export const toggleTourDetailModal = () => ({
	type: actionTypes.TOGGLE_TOUR_DETAIL_MODAL
});
