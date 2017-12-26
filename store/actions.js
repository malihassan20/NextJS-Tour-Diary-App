import * as actionTypes from './actions';

export const getTour = () => ({
	type: actionTypes.GET_TOUR,
});

export const addTour = payloadData => ({
	type: actionTypes.ADD_TOUR,
	payloadData: payloadData,
});

export const editTour = (slug, payloadData) => ({
	type: actionTypes.EDIT_TOUR,
	slug: slug,
	payloadData: payloadData,
});

export const deleteTour = slug => ({
	type: actionTypes.DELETE_TOUR,
	slug: slug,
});

export const getTourDetail = search_params => ({
	type: actionTypes.GET_TOUR_DETAIL,
	search_params: search_params,
});

export const addTourDetail = payloadData => ({
	type: actionTypes.ADD_TOUR_DETAIL,
	payloadData: payloadData,
});

export const editTourDetail = (slug, payloadData) => ({
	type: actionTypes.EDIT_TOUR_DETAIL,
	slug: slug,
	payloadData: payloadData,
});

export const deleteTourDetail = slug => ({
	type: actionTypes.DELETE_TOUR_DETAIL,
	slug: slug,
});

export const toggleTourModal = () => ({
	type: actionTypes.TOGGLE_TOUR_MODAL,
});

export const toggleTourDetailModal = () => ({
	type: actionTypes.TOGGLE_TOUR_DETAIL_MODAL,
});
