import * as actionTypes from './constants';
import { sortArr } from '../Helper/Helper';

export const initialState = {
	tours: [],
	tour: null,
	tour_details: [],
	tour_detail: null,
	toggleTourModal: false,
	toggleTourDetailModal: false,
	getTourStatus: {
		loading: false,
		success: false,
		error: false
	},
	addTourStatus: {
		loading: false,
		success: false,
		error: false
	},
	updateTourStatus: {
		loading: false,
		success: false,
		error: false
	},
	deleteTourStatus: {
		loading: false,
		success: false,
		error: false
	},
	getTourDetailStatus: {
		loading: false,
		success: false,
		error: false
	},
	addTourDetailStatus: {
		loading: false,
		success: false,
		error: false
	},
	updateTourDetailStatus: {
		loading: false,
		success: false,
		error: false
	},
	deleteTourDetailStatus: {
		loading: false,
		success: false,
		error: false
	}
};

function reducer(state = initialState, action) {
	switch (action.type) {
		case actionTypes.GET_TOUR: {
			return {
				...state,
				...{
					getTourStatus: {
						loading: true,
						success: false,
						error: false
					}
				}
			};
		}
		case actionTypes.GET_TOUR_SUCCESS: {
			return {
				...state,
				...{
					tours: action.payloadData,
					getTourStatus: {
						loading: false,
						success: true,
						error: false
					}
				}
			};
		}
		case actionTypes.GET_TOUR_FAIL: {
			return {
				...state,
				...{
					getTourStatus: {
						loading: false,
						success: false,
						error: true
					}
				}
			};
		}
		case actionTypes.ADD_TOUR: {
			return {
				...state,
				...{
					addTourStatus: {
						loading: true,
						success: false,
						error: false
					}
				}
			};
		}
		case actionTypes.ADD_TOUR_SUCCESS: {
			return {
				...state,
				...{
					tours: state.tours.concat(action.payloadData),
					addTourStatus: {
						loading: false,
						success: true,
						error: false
					}
				}
			};
		}
		case actionTypes.ADD_TOUR_FAIL: {
			return {
				...state,
				...{
					addTourStatus: {
						loading: false,
						success: false,
						error: true
					}
				}
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
		case actionTypes.UPDATE_TOUR: {
			return {
				...state,
				...{
					updateTourStatus: {
						loading: true,
						success: false,
						error: false
					}
				}
			};
		}
		case actionTypes.UPDATE_TOUR_SUCCESS: {
			const updatedTours = state.tours.filter(tour => tour.slug !== action.payloadData.slug);
			return {
				...state,
				...{
					tours: updatedTours.concat(action.payloadData),
					updateTourStatus: {
						loading: false,
						success: true,
						error: false
					}
				}
			};
		}
		case actionTypes.UPDATE_TOUR_FAIL: {
			return {
				...state,
				...{
					updateTourStatus: {
						loading: false,
						success: false,
						error: true
					}
				}
			};
		}
		case actionTypes.DELETE_TOUR: {
			return {
				...state,
				...{
					deleteTourStatus: {
						loading: true,
						success: false,
						error: false
					}
				}
			};
		}
		case actionTypes.DELETE_TOUR_SUCCESS: {
			const updatedTours = state.tours.filter(tour => tour.slug !== action.slug);
			return {
				...state,
				...{
					tours: updatedTours,
					deleteTourStatus: {
						loading: false,
						success: true,
						error: false
					}
				}
			};
		}
		case actionTypes.DELETE_TOUR_FAIL: {
			return {
				...state,
				...{
					deleteTourStatus: {
						loading: false,
						success: false,
						error: true
					}
				}
			};
		}
		case actionTypes.GET_TOUR_DETAIL: {
			return {
				...state,
				...{
					getTourDetailStatus: {
						loading: true,
						success: false,
						error: false
					}
				}
			};
		}
		case actionTypes.GET_TOUR_DETAIL_SUCCESS: {
			const parentTour = state.tours.filter(tour => tour._id === action.payloadData.tourId);
			return {
				...state,
				...{
					tour_details: sortArr(action.payloadData.result),
					tour: parentTour[0],
					getTourDetailStatus: {
						loading: false,
						success: true,
						error: false
					}
				}
			};
		}
		case actionTypes.GET_TOUR_DETAIL_FAIL: {
			return {
				...state,
				...{
					getTourDetailStatus: {
						loading: false,
						success: false,
						error: true
					}
				}
			};
		}
		case actionTypes.ADD_TOUR_DETAIL: {
			return {
				...state,
				...{
					addTourDetailStatus: {
						loading: true,
						success: false,
						error: false
					}
				}
			};
		}
		case actionTypes.ADD_TOUR_DETAIL_SUCCESS: {
			return {
				...state,
				...{
					tour_details: sortArr(state.tour_details.concat(action.payloadData)),
					addTourDetailStatus: {
						loading: false,
						success: true,
						error: false
					}
				}
			};
		}
		case actionTypes.ADD_TOUR_DETAIL_FAIL: {
			return {
				...state,
				...{
					addTourDetailStatus: {
						loading: false,
						success: false,
						error: true
					}
				}
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
		case actionTypes.UPDATE_TOUR_DETAIL: {
			return {
				...state,
				...{
					updateTourDetailStatus: {
						loading: true,
						success: false,
						error: false
					}
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
					tour_detail: null,
					updateTourDetailStatus: {
						loading: false,
						success: true,
						error: false
					}
				}
			};
		}
		case actionTypes.UPDATE_TOUR_DETAIL_FAIL: {
			return {
				...state,
				...{
					updateTourDetailStatus: {
						loading: false,
						success: false,
						error: true
					}
				}
			};
		}
		case actionTypes.DELETE_TOUR_DETAIL: {
			return {
				...state,
				...{
					deleteTourDetailStatus: {
						loading: true,
						success: false,
						error: false
					}
				}
			};
		}
		case actionTypes.DELETE_TOUR_DETAIL_SUCCESS: {
			const updatedData = state.tour_details.filter(tourDetail => tourDetail.slug !== action.slug);
			return {
				...state,
				...{
					tour_details: updatedData,
					deleteTourDetailStatus: {
						loading: false,
						success: true,
						error: false
					}
				}
			};
		}
		case actionTypes.DELETE_TOUR_DETAIL_FAIL: {
			return {
				...state,
				...{
					deleteTourDetailStatus: {
						loading: false,
						success: false,
						error: true
					}
				}
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
