import React, { Component } from 'react';
import TourModal from './TourModal';
import { connect } from 'react-redux';
import { toggleTourModal } from '../../store/actions';

class Tour extends Component {
	render() {
		return (
			<div>
				<TourModal />
			</div>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
	return {};
};

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		onToggleTourModal: () => dispatch(toggleTourModal()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Tour);
