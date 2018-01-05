import * as actionTypes from './constants';

export const initialState = {
	tours: [],
	tour: null,
	tour_details: [],
	tour_detail: null,
	toggleTourModal: false,
	toggleTourDetailModal: false,
	error: false,
	success: false,
	loading: false
};

const sortArr = arr => arr.sort((a, b) => new Date(a.metadata.date) - new Date(b.metadata.date)); //ascending order

function reducer(state = initialState, action) {
	switch (action.type) {
		case actionTypes.FAILURE: {
			return {
				...state,
				...{ error: !state.error }
			};
		}
		case actionTypes.SUCCESS: {
			return {
				...state,
				...{ success: !state.success }
			};
		}
		case actionTypes.TOGGLE_LOADER: {
			return {
				...state,
				...{
					loading: !state.loading
				}
			};
		}
		case actionTypes.GET_TOUR_SUCCESS: {
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
			const parentTour = state.tours.filter(tour => tour._id === action.payloadData.tourId);
			return {
				...state,
				...{
					tour_details: sortArr(action.payloadData.result),
					tour: parentTour[0]
				}
			};
		}
		case actionTypes.ADD_TOUR_DETAIL_SUCCESS: {
			return {
				...state,
				...{ tour_details: sortArr(state.tour_details.concat(action.payloadData)) }
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
			const filterData = state.tour_details.filter(
				tourDetail => tourDetail.slug !== action.payloadData.slug
			);
			return {
				...state,
				...{
					tour_details: sortArr(filterData.concat(action.payloadData)),
					tour_detail: null
				}
			};
		}
		case actionTypes.DELETE_TOUR_DETAIL_SUCCESS: {
			const updatedData = state.tour_details.filter(tourDetail => tourDetail.slug !== action.slug);
			return {
				...state,
				...{ tour_details: updatedData }
			};
		}
		case actionTypes.TOGGLE_TOUR_MODAL: {
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
