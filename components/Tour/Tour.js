import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from '../../routes';
import { Row, Col, Button, Icon, Card, Tooltip } from 'antd';
import ReactHtmlParser from 'react-html-parser';

import TourModal from './TourModal';
import { toggleTourModal, getTour, editTour, deleteTour } from '../../store/actions';

const { Meta } = Card;
class Tour extends Component {
	render() {
		const gutters = 16;

		return (
			<div>
				<TourModal />
				<Row gutter={gutters} style={{ marginBottom: '40px' }}>
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
							key={tour.slug}
							xs={{ span: 24 }}
							sm={{ span: 24 }}
							md={{ span: 8 }}
							lg={{ span: 6 }}
							xl={{ span: 6 }}
						>
							<Card
								cover={
									<img
										style={{ height: '250px' }}
										alt="feature_img"
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
