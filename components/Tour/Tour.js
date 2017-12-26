import React, { Component } from 'react';
import TourModal from './TourModal';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import RaisedButton from 'material-ui/RaisedButton';
import { toggleTourModal } from '../../store/actions';

class Tour extends Component {
	static getInitialProps({ req }) {}

	render() {
		return (
			<div>
				<TourModal />
				<RaisedButton label="Add Tour" secondary onTouchTap={this.props.onToggleTourModal} />
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
