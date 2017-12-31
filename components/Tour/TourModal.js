import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Button, Form, Input, Icon, DatePicker, Upload } from 'antd';
import { convertToRaw, ContentState, EditorState, convertFromHTML } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import moment from 'moment';

import { toggleTourModal, addTour, updateTour } from '../../store/actions';

const FormItem = Form.Item;
const RangePicker = DatePicker.RangePicker;

const today = new Date();
const currDate = moment(`${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`);

class TourModal extends Component {
	constructor(props) {
		super(props);
		this.state = {
			slug: '',
			title: '',
			content: EditorState.createEmpty(),
			featured_image: '',
			start_date: currDate,
			end_date: currDate,
			location: '',
			is_new: true,
			fileList: [],
			modalState: false
		};
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.tour !== null) {
			const blocksFromHTML = convertFromHTML(nextProps.tour.content);
			const edstate = ContentState.createFromBlockArray(
				blocksFromHTML.contentBlocks,
				blocksFromHTML.entityMap
			);
			this.setState({
				slug: nextProps.tour.slug,
				title: nextProps.tour.title,
				content: EditorState.createWithContent(edstate),
				start_date: nextProps.tour.metadata.start_date,
				end_date: nextProps.tour.metadata.end_date,
				location: nextProps.tour.metadata.location,
				is_new: false,
				modalState: nextProps.toggleTourModalState
			});
		} else {
			this.setState({
				modalState: nextProps.toggleTourModalState
			});
		}

		console.log(`In componentWillReceiveProps: ${nextProps.tour}`);
		//console.log(nextProps.toggleTourModalState);
	}

	onEditorStateChange = editorState => {
		//console.log(editorState);
		this.setState({
			content: editorState
		});
		console.log(this.state.content);
	};

	handleClose = () => {
		this.setState({
			slug: '',
			title: '',
			content: EditorState.createEmpty(),
			featured_image: '',
			start_date: currDate,
			end_date: currDate,
			location: '',
			is_new: true,
			fileList: [],
			modalState: this.props.toggleTourModalState
		});
		this.props.form.resetFields();
		this.props.onToggleTourModal();
	};

	handleSubmit = e => {
		e.preventDefault();
		this.props.form.validateFields((err, fieldsValue) => {
			if (!err) {
				const rangeValue = fieldsValue.start_end_date;
				const values = {
					...fieldsValue,
					content: draftToHtml(convertToRaw(this.state.content.getCurrentContent())),
					start_date: rangeValue[0].format('YYYY-MM-DD'),
					end_date: rangeValue[1].format('YYYY-MM-DD'),
					slug: this.state.slug
				};
				console.log('Received values of form: ', values);
				if (this.state.is_new === true) {
					this.props.onTourFormSubmit(values);
				} else {
					this.props.onTourUpdateFormSubmit(values);
				}

				this.handleClose();
			}
		});
	};

	render() {
		const { getFieldDecorator } = this.props.form;
		const rangeConfig = {
			initialValue:
				this.props.tour != null
					? [moment(this.state.start_date), moment(this.state.end_date)]
					: [currDate, currDate],
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

		const fileProps = {
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
			fileList: this.state.fileList,
			accept: 'images/*',
			supportServerRender: true,
			name: 'featured_image'
		};

		return (
			<div>
				<Modal
					title="Add New Tour"
					width="60%"
					visible={this.state.modalState}
					onOk={this.handleSubmit}
					okText="Add"
					onCancel={this.handleClose}
				>
					<Form layout="vertical">
						<FormItem {...formItemLayout} label={<span>Title</span>}>
							{getFieldDecorator('title', {
								initialValue: this.state.title,
								rules: [
									{
										required: true,
										message: 'Please enter tour name',
										whitespace: true
									}
								]
							})(<Input name="title" />)}
						</FormItem>
						<FormItem {...formItemLayout} label={<span>Location</span>}>
							{getFieldDecorator('location', {
								initialValue: this.state.location,
								rules: [
									{
										required: true,
										message: 'Please enter location (city/state)',
										whitespace: true
									}
								]
							})(<Input name="location" />)}
						</FormItem>
						<FormItem {...formItemLayout} label="Travel Date">
							{getFieldDecorator('start_end_date', rangeConfig)(
								<RangePicker name="start_end_date" />
							)}
						</FormItem>
						<FormItem {...formItemLayout} label="Description">
							{getFieldDecorator('content', {
								//initialValue: this.state.content,
								rules: [
									{
										type: 'object',
										required: true,
										message: 'Please enter description',
										whitespace: true
									}
								]
							})(
								<Editor
									//name="content"
									//initialEditorState={this.state.content}
									//defaultEditorState={this.state.content}
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
						<FormItem {...formItemLayout} label="Image">
							{getFieldDecorator('featured_image', {
								rules: [
									{
										required: true,
										message: 'Please select featured image'
									}
								]
							})(
								<Upload name="featured_image" {...fileProps}>
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
	onToggleTourModal: () => dispatch(toggleTourModal()),
	onTourFormSubmit: payloadData => dispatch(addTour(payloadData)),
	onTourUpdateFormSubmit: payloadData => dispatch(updateTour(payloadData))
});

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(TourModal));
