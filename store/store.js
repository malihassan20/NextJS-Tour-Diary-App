import { createStore } from 'redux';
import * as actionTypes from './actions';

const initialState = {
	tours: [],
	tour_details: [],
	openTourModal: false,
	openTourDetailModal: false
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.GET_TOUR:
			return '';
		case actionTypes.ADD_TOUR:
			return '';
		case actionTypes.EDIT_TOUR:
			return '';
		case actionTypes.DELETE_TOUR:
			return '';
		case actionTypes.GET_TOUR_DETAIL:
			return '';
		case actionTypes.ADD_TOUR_DETAIL:
			return '';
		case actionTypes.EDIT_TOUR_DETAIL:
			return '';
		case actionTypes.DELETE_TOUR_DETAIL:
			return '';
		default:
			return state;
	}
};

const initializeStore = (state = initialState) => createStore(reducer, state);

export default initializeStore;
