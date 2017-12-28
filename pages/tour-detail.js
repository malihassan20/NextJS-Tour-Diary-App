import React, { Component } from 'react';
import withRedux from 'next-redux-wrapper';
import initializeStore from '../store/store';
import Layout from '../components/layout';
import Tour from '../components/Tour/Tour';

class TourDetail extends Component {
	static getInitialProps({ req }) {}
	render() {
		return (
			<Layout title="Tour Details">
				<Tour />
			</Layout>
		);
	}
}

export default withRedux(initializeStore)(TourDetail);
