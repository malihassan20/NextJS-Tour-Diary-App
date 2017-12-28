import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Button } from 'antd';

import TourModal from './TourModal';
import { toggleTourModal } from '../../store/actions';

class Tour extends Component {
	render() {
		const { gutters } = 4;
		return (
			<div>
				<TourModal />
				<Button type="primary" onClick={this.props.onToggleTourModal}>
					Primary
				</Button>
				<Row gutter={this.gutters}>
					<Col span={6} />
				</Row>
			</div>
		);
	}
}

const mapStateToProps = (state, ownProps) => ({});

const mapDispatchToProps = (dispatch, ownProps) => ({
	onToggleTourModal: () => dispatch(toggleTourModal())
});

export default connect(mapStateToProps, mapDispatchToProps)(Tour);
