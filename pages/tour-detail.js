import React, { Component } from 'react';
import withRedux from 'next-redux-wrapper';
import initializeStore from '../store/store';
import Head from '../components/head';
import Tour from '../components/Tour/Tour';
import Wrapper from '../layouts/Wrapper';

class TourDetail extends Component {
	static getInitialProps({ req }) {
		// Ensures material-ui renders the correct css prefixes server-side
		let userAgent;
		if (process.browser) {
			userAgent = navigator.userAgent;
		} else {
			userAgent = req.headers['user-agent'];
		}

		return { userAgent };
	}
	render() {
		return (
			<Wrapper userAgent={this.props}>
				<Head title="Tour Details" />

				<Tour />
			</Wrapper>
		);
	}
}

export default withRedux(initializeStore)(TourDetail);
