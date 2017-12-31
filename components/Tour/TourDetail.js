import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Button, Timeline, Card } from 'antd';

import TourDetailModal from './TourDetailModal';
import { toggleTourDetailModal } from '../../store/actions';

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
							Add Tour
						</Button>
					</Col>
				</Row>
				<Row gutter={gutters} style={{ marginBottom: '40px' }}>
					<Timeline>
						{this.props.tours.map(tour => (
							<Timeline.Item>
								<Card
									style={{ width: 300 }}
									cover={<img alt={tour.slug} src={tour.metadata.image.url} />}
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
	tours: state.tours
});

const mapDispatchToProps = dispatch => ({
	onToggleTourDetailModal: () => dispatch(toggleTourDetailModal())
});

export default connect(mapStateToProps, mapDispatchToProps)(TourDetail);
