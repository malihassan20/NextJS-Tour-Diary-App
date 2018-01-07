import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Button, Icon, Card, Tooltip, notification, Spin } from 'antd';

import { Link } from '../../routes';
import TourModal from './TourModal';
import { toggleTourModal, getTour, editTour, deleteTour } from '../../store/actions';

const { Meta } = Card;
class Tour extends Component {
	componentWillReceiveProps(nextProps) {
		if (
			nextProps.getTourStatus.error &&
			nextProps.getTourStatus.error !== this.props.getTourStatus.error
		) {
			notification.error({
				message: 'Error',
				description: 'Unable to get the list of tours. Please try again!'
			});
		}
		if (
			nextProps.addTourStatus.error &&
			nextProps.addTourStatus.error !== this.props.addTourStatus.error
		) {
			notification.error({
				message: 'Error',
				description: 'Unable to add new tour. Please check your data!'
			});
		}
		if (
			nextProps.updateTourStatus.error &&
			nextProps.updateTourStatus.error !== this.props.updateTourStatus.error
		) {
			notification.error({
				message: 'Error',
				description: 'Unable to update the tour. Please check your data!'
			});
		}
		if (
			nextProps.deleteTourStatus.error &&
			nextProps.deleteTourStatus.error !== this.props.deleteTourStatus.error
		) {
			notification.error({
				message: 'Error',
				description: 'Unable to delete the tour. Please try again!'
			});
		}

		if (
			nextProps.getTourStatus.success &&
			nextProps.getTourStatus.success !== this.props.getTourStatus.success
		) {
			notification.success({
				message: 'Success',
				description: 'Getting tour list successfull.'
			});
		}
		if (
			nextProps.addTourStatus.success &&
			nextProps.addTourStatus.success !== this.props.addTourStatus.success
		) {
			notification.success({
				message: 'Success',
				description: 'New tour added successfully.'
			});
		}
		if (
			nextProps.updateTourStatus.success &&
			nextProps.updateTourStatus.success !== this.props.updateTourStatus.success
		) {
			notification.success({
				message: 'Success',
				description: 'Tour updated successfully.'
			});
		}
		if (
			nextProps.deleteTourStatus.success &&
			nextProps.deleteTourStatus.success !== this.props.deleteTourStatus.success
		) {
			notification.success({
				message: 'Success',
				description: 'Tour deleted successfully.'
			});
		}
	}

	render() {
		const gutters = 16;

		return (
			<Spin
				size="large"
				spinning={
					//true ||
					this.props.getTourStatus.loading ||
					this.props.addTourStatus.loading ||
					this.props.updateTourStatus.loading ||
					this.props.deleteTourStatus.loading
				}
			>
				<div>
					<TourModal />
					<Row className="main-row-stl">
						<Col span={24} style={{ textAlign: 'right' }}>
							<Button
								type="primary"
								size="large"
								icon="plus"
								onClick={() => this.props.onToggleTourModal()}
							>
								Add Tour
							</Button>
						</Col>
					</Row>
					<Row gutter={gutters}>
						{this.props.tours.map(tour => (
							<Col
								className="gutter-row"
								key={tour.slug}
								xxl={6}
								xl={6}
								lg={6}
								md={7}
								sm={12}
								xs={24}
							>
								<Card
									cover={
										<img
											alt="feature_img"
											style={{ height: '200px', objectFit: 'cover' }}
											src={tour.metadata.featured_image.url}
										/>
									}
									actions={[
										<Tooltip placement="top" title="Edit">
											<Icon type="edit" onClick={() => this.props.editTour(tour)} />
										</Tooltip>,
										<Tooltip placement="top" title="Delete">
											<Icon type="delete" onClick={() => this.props.deleteTour(tour)} />
										</Tooltip>,

										<Link as={`/tour-detail/${tour.slug}`} href={`/tour-detail?tourId=${tour._id}`}>
											<Tooltip placement="top" title="View Detail">
												<Icon type="ellipsis" />
											</Tooltip>
										</Link>
									]}
								>
									<Meta
										title={tour.title}
										//description={ReactHtmlParser(tour.content)}
									/>
									<br />
									<Icon type="environment-o" /> {tour.metadata.location}
								</Card>
								<br />
							</Col>
						))}
					</Row>
				</div>
			</Spin>
		);
	}
}

const mapStateToProps = state => ({
	tours: state.tours,
	getTourStatus: state.getTourStatus,
	addTourStatus: state.addTourStatus,
	updateTourStatus: state.updateTourStatus,
	deleteTourStatus: state.deleteTourStatus
});

const mapDispatchToProps = dispatch => ({
	onToggleTourModal: () => dispatch(toggleTourModal()),
	getTour: () => dispatch(getTour()),
	editTour: tour => dispatch(editTour(tour)),
	deleteTour: tour => dispatch(deleteTour(tour))
});

export default connect(mapStateToProps, mapDispatchToProps)(Tour);
