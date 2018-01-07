import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Button, Icon, Tooltip, notification, Spin } from 'antd';
import ImageZoom from 'react-medium-image-zoom';

import TourModal from './TourModal';
import TourDetailModal from './TourDetailModal';
import {
	toggleTourDetailModal,
	editTour,
	deleteTourDetail,
	editTourDetail
} from '../../store/actions';

class TourDetail extends Component {
	componentWillReceiveProps(nextProps) {
		if (
			nextProps.getTourDetailStatus.error &&
			nextProps.getTourDetailStatus.error !== this.props.getTourDetailStatus.error
		) {
			notification.error({
				message: 'Error',
				placement: 'bottomRight',
				description: 'Unable to get the list of tour images. Please try again!'
			});
		}
		if (
			nextProps.addTourDetailStatus.error &&
			nextProps.addTourDetailStatus.error !== this.props.addTourDetailStatus.error
		) {
			notification.error({
				message: 'Error',
				placement: 'bottomRight',
				description: 'Unable to add new tour image. Please check your data!'
			});
		}
		if (
			nextProps.updateTourDetailStatus.error &&
			nextProps.updateTourDetailStatus.error !== this.props.updateTourDetailStatus.error
		) {
			notification.error({
				message: 'Error',
				placement: 'bottomRight',
				description: 'Unable to update the image details. Please check your data!'
			});
		}
		if (
			nextProps.deleteTourDetailStatus.error &&
			nextProps.deleteTourDetailStatus.error !== this.props.deleteTourDetailStatus.error
		) {
			notification.error({
				message: 'Error',
				placement: 'bottomRight',
				description: 'Unable to delete the tour image. Please try again!'
			});
		}

		if (
			nextProps.addTourDetailStatus.success &&
			nextProps.addTourDetailStatus.success !== this.props.addTourDetailStatus.success
		) {
			notification.success({
				message: 'Success',
				placement: 'bottomRight',
				description: 'New tour image added successfully.'
			});
		}
		if (
			nextProps.updateTourDetailStatus.success &&
			nextProps.updateTourDetailStatus.success !== this.props.updateTourDetailStatus.success
		) {
			notification.success({
				message: 'Success',
				placement: 'bottomRight',
				description: 'Tour image details updated successfully.'
			});
		}
		if (
			nextProps.deleteTourDetailStatus.success &&
			nextProps.deleteTourDetailStatus.success !== this.props.deleteTourDetailStatus.success
		) {
			notification.success({
				message: 'Success',
				placement: 'bottomRight',
				description: 'Tour image deleted successfully.'
			});
		}
	}
	render() {
		const gutters = 16;

		return (
			<Spin
				size="large"
				spinning={
					this.props.getTourDetailStatus.loading ||
					this.props.addTourDetailStatus.loading ||
					this.props.updateTourDetailStatus.loading ||
					this.props.deleteTourDetailStatus.loading
				}
			>
				<div>
					<TourModal />
					<TourDetailModal />
					<Row className="main-row-stl">
						<Col span={24} style={{ textAlign: 'right' }}>
							<Button
								type="primary"
								size="large"
								icon="plus"
								onClick={() => this.props.onToggleTourDetailModal()}
							>
								Add Image
							</Button>
						</Col>
					</Row>

					<Row className="middle-row" gutter={gutters} style={{ marginBottom: '40px' }}>
						<section className="timeline">
							<ul>
								{this.props.tour_details.length > 0 &&
									this.props.tour_details.map(tour => (
										<li key={tour.slug}>
											<div style={{ width: 300, background: 'white' }}>
												<ImageZoom
													image={{
														src: tour.metadata.image.url,
														alt: tour.slug,
														className: 'timeline-img'
													}}
													defaultStyles={{
														overlay: {
															opacity: 0.9,
															backgroundColor: 'black'
														}
													}}
												/>
												<p style={{ paddingTop: '15px', paddingLeft: '15px', marginBottom: '5px' }}>
													<b>{tour.title}</b>{' '}
													<span style={{ float: 'right' }}>
														<Tooltip className="icon-pad" placement="top" title="Edit">
															<Icon
																className="icon-pad"
																type="form"
																onClick={() => this.props.editTourDetail(tour)}
															/>
														</Tooltip>{' '}
														<Tooltip className="icon-pad" placement="top" title="Delete">
															<Icon
																className="icon-pad"
																type="delete"
																onClick={() => this.props.deleteTourDetail(tour)}
															/>
														</Tooltip>
													</span>
												</p>
												<p style={{ paddingBottom: '15px', paddingLeft: '15px' }}>
													{tour.metadata.date}
												</p>
											</div>
										</li>
									))}
							</ul>
						</section>
					</Row>
				</div>
			</Spin>
		);
	}
}

const mapStateToProps = state => ({
	tour_details: state.tour_details,
	tour: state.tour,
	updateTourStatus: state.updateTourStatus,
	getTourDetailStatus: state.getTourDetailStatus,
	addTourDetailStatus: state.addTourDetailStatus,
	updateTourDetailStatus: state.updateTourDetailStatus,
	deleteTourDetailStatus: state.deleteTourDetailStatus
});

const mapDispatchToProps = dispatch => ({
	onToggleTourDetailModal: () => dispatch(toggleTourDetailModal()),
	editTour: tour => dispatch(editTour(tour)),
	editTourDetail: tour => dispatch(editTourDetail(tour)),
	deleteTourDetail: slug => dispatch(deleteTourDetail(slug))
});

export default connect(mapStateToProps, mapDispatchToProps)(TourDetail);
