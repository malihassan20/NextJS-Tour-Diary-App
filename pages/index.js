import React, { Component } from 'react';
import { Layout } from 'antd';
import { withReduxSaga } from '../store/store';
import { getTour } from '../store/actions';

import Wrapper from '../components/wrapper';
import Tour from '../components/Tour/Tour';

const { Content } = Layout;

class Index extends Component {
	static async getInitialProps({ store }) {
		store.dispatch(getTour());
	}
	render() {
		return (
			<Wrapper title="CosmicJs Tour Diary App">
				<Layout className="layout">
					<Content>
						<Tour />
					</Content>
				</Layout>
			</Wrapper>
		);
	}
}

export default withReduxSaga(Index);
