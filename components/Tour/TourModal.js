import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Button, Form, Input, Tooltip, Icon, Row, Col, DatePicker, Upload } from 'antd';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { toggleTourModal } from '../../store/actions';

const FormItem = Form.Item;
const RangePicker = DatePicker.RangePicker;

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
			fileList: []
		};
	}

	onEditorStateChange = editorState => {
		this.setState({
			content: editorState
		});
	};

	normFile = e => {
		console.log('Upload event:', e);
		if (Array.isArray(e)) {
			return e;
		}
		return e && e.fileList;
	};

	handleClose = () => {
		this.props.onToggleTourModal();
	};

	handleSubmit = e => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				console.log('Received values of form: ', values);
			}
		});
	};

	render() {
		const { getFieldDecorator } = this.props.form;
		const rangeConfig = {
			rules: [
				{
					type: 'array',
					required: true,
					message: 'Please select travel start and end date'
				}
			]
		};
		const formItemLayout = {
			labelCol: {
				xs: { span: 24 },
				sm: { span: 4 }
			},
			wrapperCol: {
				xs: { span: 24 },
				sm: { span: 20 }
			}
		};

		const props = {
			action: '',
			onRemove: file => {
				this.setState(({ fileList }) => {
					const index = fileList.indexOf(file);
					const newFileList = fileList.slice();
					newFileList.splice(index, 1);
					return {
						fileList: newFileList
					};
				});
			},
			beforeUpload: file => {
				if (this.state.fileList.length === 0) {
					this.setState(({ fileList }) => ({
						fileList: [...fileList, file]
					}));
					return false;
				}
			},
			fileList: this.state.fileList
		};

		return (
			<div>
				<Modal
					title="Add New Tour"
					width="60%"
					visible={this.props.toggleTourModalState}
					onOk={this.handleSubmit}
					okText="Add"
					onCancel={this.handleClose}
				>
					<Form layout="vertical">
						<FormItem {...formItemLayout} label={<span>Title</span>}>
							{getFieldDecorator('title', {
								rules: [
									{
										required: true,
										message: 'Please enter tour name',
										whitespace: true
									}
								]
							})(<Input />)}
						</FormItem>
						<FormItem {...formItemLayout} label={<span>Location</span>}>
							{getFieldDecorator('location', {
								rules: [
									{
										required: true,
										message: 'Please enter location (city/state)',
										whitespace: true
									}
								]
							})(<Input />)}
						</FormItem>
						<FormItem {...formItemLayout} label="Travel Date">
							{getFieldDecorator('range-picker', rangeConfig)(<RangePicker />)}
						</FormItem>
						<FormItem {...formItemLayout} label="Description">
							{getFieldDecorator('content', {
								rules: [
									{
										required: true,
										message: 'Please enter description',
										whitespace: true
									}
								]
							})(
								<Editor
									editorState={this.state.content}
									image={false}
									onEditorStateChange={this.onEditorStateChange}
									toolbar={{
										options: [
											'inline',
											'blockType',
											'fontSize',
											'fontFamily',
											'list',
											'textAlign',
											'colorPicker',
											'link',
											'emoji',
											'remove',
											'history'
										]
									}}
									wrapperClassName="demo-wrapper"
									editorClassName="demo-editor"
								/>
							)}
						</FormItem>
						<FormItem {...formItemLayout} label="Image" extra="">
							{getFieldDecorator('featured_image', {
								rules: [
									{
										required: true,
										message: 'Please select featured image'
									}
								]
							})(
								<Upload name="featured_image" {...props}>
									<Button>
										<Icon type="upload" /> Select File
									</Button>
								</Upload>
							)}
						</FormItem>
					</Form>
				</Modal>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	toggleTourModalState: state.toggleTourModal,
	tour: state.tour
});

const mapDispatchToProps = dispatch => ({
	onToggleTourModal: () => dispatch(toggleTourModal())
});

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(TourModal));
