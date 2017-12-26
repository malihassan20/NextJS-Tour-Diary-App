import React, { Component } from 'react';
import withRedux from 'next-redux-wrapper';
import initializeStore from '../store/store';
import Head from '../components/head';
import Tour from '../components/Tour/Tour';
import Wrapper from '../layouts/Wrapper';

class Index extends Component {
	render() {
		return (
			<Wrapper>
				<Head title="CosmicJs Tour Diary App" />

				<Tour />
			</Wrapper>
		);
	}
}

export default withRedux(initializeStore)(Index);
