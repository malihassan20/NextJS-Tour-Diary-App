import React, { Component } from 'react';
import withRedux from 'next-redux-wrapper';
import { Layout } from 'antd';

import initializeStore from '../store/store';
import Wrapper from '../components/wrapper';
import Tour from '../components/Tour/Tour';

const { Content, Footer } = Layout;

class Index extends Component {
	static getInitialProps({ req }) {}

	render() {
		return (
			<Wrapper title="CosmicJs Tour Diary App">
				<Layout className="layout" style={{ backgroundColor: 'white', padding: '0 50px' }}>
					<Content style={{ padding: '20px 50px' }}>
						<Tour />
					</Content>
				</Layout>
			</Wrapper>
		);
	}
}

export default withRedux(initializeStore)(Index);
