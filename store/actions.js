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

export const editTour = payloadData => ({
	type: actionTypes.EDIT_TOUR,
	payloadData
});

export const updateTour = payloadData => ({
	type: actionTypes.UPDATE_TOUR,
	payloadData
});

export const updateTourSuccess = payloadData => ({
	type: actionTypes.UPDATE_TOUR_SUCCESS,
	payloadData
});

export const deleteTour = payloadData => ({
	type: actionTypes.DELETE_TOUR,
	payloadData
});

export const deleteTourSuccess = slug => ({
	type: actionTypes.DELETE_TOUR_SUCCESS,
	slug
});

export const getTourDetail = tourId => ({
	type: actionTypes.GET_TOUR_DETAIL,
	tourId
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

export const editTourDetail = payloadData => ({
	type: actionTypes.EDIT_TOUR_DETAIL,
	payloadData
});

export const updateTourDetail = payloadData => ({
	type: actionTypes.UPDATE_TOUR_DETAIL,
	payloadData
});

export const updateTourDetailSuccess = payloadData => ({
	type: actionTypes.UPDATE_TOUR_DETAIL_SUCCESS,
	payloadData
});

export const deleteTourDetail = payloadData => ({
	type: actionTypes.DELETE_TOUR_DETAIL,
	payloadData
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
