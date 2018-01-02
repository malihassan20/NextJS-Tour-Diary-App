import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Button, Timeline, Card, Icon, Tooltip } from 'antd';

import TourDetailModal from './TourDetailModal';
import { toggleTourDetailModal, deleteTourDetail, editTourDetail } from '../../store/actions';

const { Meta } = Card;
class TourDetail extends Component {
	render() {
		const gutters = 16;

		return (
			<div>
				<TourDetailModal />
				<Row gutter={gutters} style={{ marginBottom: '40px' }}>
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
				<Row gutter={gutters} style={{ marginBottom: '40px' }}>
					<Timeline>
						{this.props.tour_details.length > 0 &&
							this.props.tour_details.map(tour => (
								<Timeline.Item key={tour.slug}>
									<Card
										style={{ width: 300 }}
										cover={
											<img alt={tour.slug} src={tour.metadata.image.url} />
										}
										actions={[
											<Tooltip placement="top" title="Edit">
												<Icon
													type="edit"
													onClick={() => this.props.editTourDetail(tour)}
												/>
											</Tooltip>,
											<Tooltip placement="top" title="Delete">
												<Icon
													type="delete"
													onClick={() =>
														this.props.deleteTourDetail(tour)
													}
												/>
											</Tooltip>
										]}
									>
										<Meta title={tour.title} description={tour.metadata.date} />
									</Card>
								</Timeline.Item>
							))}
					</Timeline>
				</Row>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	tour_details: state.tour_details,
	tour: state.tour
});

const mapDispatchToProps = dispatch => ({
	onToggleTourDetailModal: () => dispatch(toggleTourDetailModal()),
	editTourDetail: tour => dispatch(editTourDetail(tour)),
	deleteTourDetail: slug => dispatch(deleteTourDetail(slug))
});

export default connect(mapStateToProps, mapDispatchToProps)(TourDetail);
