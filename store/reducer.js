import * as actionTypes from './constants';

export const initialState = {
	tours: null,
	tour: null,
	tour_details: null,
	tour_detail: null,
	toggleTourModal: false,
	toggleTourDetailModal: false,
	error: false
};

function reducer(state = initialState, action) {
	switch (action.type) {
		case actionTypes.FAILURE: {
			return {
				...state,
				...{ error: action.error }
			};
		}
		case actionTypes.GET_TOUR_SUCCESS: {
			//console.log(`GET_TOUR_SUCCESS: ${action.payloadData}`);
			return {
				...state,
				...{ tours: action.payloadData }
			};
		}
		case actionTypes.ADD_TOUR_SUCCESS: {
			return {
				...state,
				...{ tours: state.tours.concat(action.payloadData) }
			};
		}
		case actionTypes.EDIT_TOUR: {
			//console.log(`EDIT_TOUR: ${action.payloadData}`);
			return {
				...state,
				...{
					tour: action.payloadData,
					toggleTourModal: !state.toggleTourModal
				}
			};
		}
		case actionTypes.UPDATE_TOUR_SUCCESS: {
			const updatedTours = state.tours.filter(tour => tour.slug !== action.payloadData.slug);
			return {
				...state,
				...{ tours: updatedTours.concat(action.payloadData) }
			};
		}
		case actionTypes.DELETE_TOUR_SUCCESS: {
			const updatedTours = state.tours.filter(tour => tour.slug !== action.slug);
			return {
				...state,
				...{ tours: updatedTours }
			};
		}
		case actionTypes.GET_TOUR_DETAIL_SUCCESS: {
			console.log(`In GET_TOUR_DETAIL_SUCCESS: ${action.payloadData}`);
			return {
				...state,
				...{ tour_details: action.payloadData }
			};
		}
		case actionTypes.ADD_TOUR_DETAIL_SUCCESS: {
			return {
				...state,
				...{ tour_details: action.payloadData }
			};
		}
		case actionTypes.EDIT_TOUR_DETAIL: {
			return {
				...state,
				...{
					tour_detail: action.payloadData,
					toggleTourDetailModal: !state.toggleTourDetailModal
				}
			};
		}
		case actionTypes.UPDATE_TOUR_DETAIL_SUCCESS: {
			return {
				...state,
				...{
					tour_details: action.payloadData,
					tour_detail: null
				}
			};
		}
		case actionTypes.DELETE_TOUR_DETAIL_SUCCESS: {
			return {
				...state,
				...{ tour_details: action.payloadData }
			};
		}
		case actionTypes.TOGGLE_TOUR_MODAL: {
			//console.log(`TOGGLE_TOUR_MODAL: ${state.toggleTourModal}`);
			if (state.tour != null) {
				return {
					...state,
					...{
						toggleTourModal: !state.toggleTourModal,
						tour: null
					}
				};
			}
			return {
				...state,
				...{
					toggleTourModal: !state.toggleTourModal
				}
			};
		}
		case actionTypes.TOGGLE_TOUR_DETAIL_MODAL: {
			if (state.tour_detail != null) {
				return {
					...state,
					...{
						toggleTourDetailModal: !state.toggleTourDetailModal,
						tour_detail: null
					}
				};
			}
			return {
				...state,
				...{
					toggleTourDetailModal: !state.toggleTourDetailModal
				}
			};
		}
		default:
			return state;
	}
}

export default reducer;
