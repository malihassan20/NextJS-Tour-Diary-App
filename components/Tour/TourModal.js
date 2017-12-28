import React, { Component } from 'react';
import { connect } from 'react-redux';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

import { toggleTourModal } from '../../store/actions';

class TourModal extends Component {
	constructor(props) {
		super(props);

		this.state = {
			id: null,
			slug: '',
			title: '',
			content: '',
			featured_image: '',
			start_date: '',
			end_date: '',
			location: '',
			is_new: false,
		};
	}

	handleOpen = () => {
		this.props.onToggleTourModal();
	};

	handleClose = () => {
		this.props.onToggleTourModal();
	};

	handleInputChange = event => {
		const target = event.target;
		const value = target.value;
		const name = target.name;

		this.setState({
			[name]: value,
		});
	};

	handleChangeStartDate = (event, date) => {
		this.setState({
			start_date: date,
		});
	};

	handleChangeEndDate = (event, date) => {
		this.setState({
			end_date: date,
		});
	};

	onEditorStateChange = editorState => {
		this.setState({
			content: editorState,
		});
	};

	render() {
		return (
			<div>
				<Editor editorState={this.state.content} image={false} onEditorStateChange={this.onEditorStateChange} />
			</div>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
		toggleTourModalState: state.toggleTourModal,
		tour: state.tour,
	};
};

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		onToggleTourModal: () => dispatch(toggleTourModal()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(TourModal);
