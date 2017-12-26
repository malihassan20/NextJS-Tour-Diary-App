import React, { Component } from 'react';
import { connect } from 'react-redux';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import { toggleTourModal } from '../../store/actions';

class TourModal extends Component {
	handleOpen = () => {
		this.props.onToggleTourModal();
	};

	handleClose = () => {
		this.props.onToggleTourModal();
	};

	render() {
		const actions = [
			<FlatButton label="Cancel" primary={true} onClick={this.handleClose} />,
			<FlatButton label="Submit" primary={true} keyboardFocused={true} onClick={this.handleClose} />,
		];

		return (
			<div>
				<Dialog
					title="Dialog With Actions"
					actions={actions}
					modal={false}
					open={this.props.toggleTourModalState}
					onRequestClose={this.handleClose}
				>
					The actions in this window were passed in as an array of React objects.
				</Dialog>
			</div>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
		toggleTourModalState: state.toggleTourModal,
	};
};

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		onToggleTourModal: () => dispatch(toggleTourModal()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(TourModal);
