import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Button, Icon, Card, Tooltip } from 'antd';
import ReactHtmlParser from 'react-html-parser';

import TourModal from './TourModal';
import { toggleTourModal, getTour } from '../../store/actions';

const { Meta } = Card;
class Tour extends Component {
	componentDidMount() {
		this.props.getTour();
	}
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
							onClick={this.props.onToggleTourModal}
						>
							Add Tour
						</Button>
					</Col>
				</Row>
				<Row gutter={gutters}>
					{this.props.tours.map(tour => (
						<Col key={tour._id} span={6}>
							<Card
								key={tour.slug}
								cover={
									<img
										style={{ height: '250px' }}
										alt="feature_img"
										src={tour.metadata.featured_image.url}
									/>
								}
								actions={[
									<Tooltip placement="top" title="Edit">
										<Icon type="edit" />
									</Tooltip>,
									<Tooltip placement="top" title="Delete">
										<Icon type="delete" />
									</Tooltip>,
									<Tooltip placement="top" title="View Detail">
										<Icon type="ellipsis" />
									</Tooltip>
								]}
							>
								<Meta
									title={tour.title}
									description={ReactHtmlParser(tour.content)}
								/>
							</Card>
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
	getTour: () => dispatch(getTour())
});

export default connect(mapStateToProps, mapDispatchToProps)(Tour);
