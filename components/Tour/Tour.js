import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Layout, Row, Col, Button, Icon } from 'antd';

import TourModal from './TourModal';
import { toggleTourModal } from '../../store/actions';

class Tour extends Component {
	render() {
		const { gutters } = 4;
		return (
			<div>
				<TourModal />
				<Row gutter={this.gutters}>
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
			</div>
		);
	}
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
	onToggleTourModal: () => dispatch(toggleTourModal())
});

export default connect(mapStateToProps, mapDispatchToProps)(Tour);
