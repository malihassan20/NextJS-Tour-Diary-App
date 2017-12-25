import React, { Component } from 'react';
import withRedux from 'next-redux-wrapper';
import initializeStore from '../store/store';
import Head from '../components/head';
import Tour from '../components/Tour/Tour';
import Wrapper from '../hoc/Wrapper';

class TourDetail extends Component {
	render() {
		return (
			<Wrapper>
				<Head title="Tour Details" />

				<Tour />
			</Wrapper>
		);
	}
}

export default withRedux(initializeStore)(TourDetail);
