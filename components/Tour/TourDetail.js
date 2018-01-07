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
											<img className="timeline-img" alt={tour.slug} src={tour.metadata.image.url} />
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
