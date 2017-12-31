import React, { Component } from 'react';
import { Layout } from 'antd';

import { withReduxSaga } from '../store/store';
import { getTourDetail } from '../store/actions';
import Wrapper from '../components/wrapper';
import TourDetails from '../components/Tour/TourDetail';

const { Content } = Layout;

class TourDetail extends Component {
	static getInitialProps({ store, query }) {
		console.log(`Query Parameter : ${query.tour}`);
		store.dispatch(getTourDetail(query.tour));
	}
	render() {
		return (
			<Wrapper title="Tour Detail">
				<Layout className="layout" style={{ backgroundColor: 'white', padding: '0 50px' }}>
					<Content style={{ padding: '20px 50px' }}>
						<TourDetails />
					</Content>
				</Layout>
			</Wrapper>
		);
	}
}

export default withReduxSaga(TourDetail);
