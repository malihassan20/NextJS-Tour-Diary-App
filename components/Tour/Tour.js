import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Button, Icon, Card, Tooltip } from 'antd';

import { Link } from '../../routes';
import TourModal from './TourModal';
import { toggleTourModal, getTour, editTour, deleteTour } from '../../store/actions';

const { Meta } = Card;
class Tour extends Component {
	render() {
		const gutters = 16;

		return (
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
		);
	}
}

const mapStateToProps = state => ({
	tours: state.tours
});

const mapDispatchToProps = dispatch => ({
	onToggleTourModal: () => dispatch(toggleTourModal()),
	getTour: () => dispatch(getTour()),
	editTour: tour => dispatch(editTour(tour)),
	deleteTour: tour => dispatch(deleteTour(tour))
});

export default connect(mapStateToProps, mapDispatchToProps)(Tour);
