import React, { Component } from 'react';
import { Layout } from 'antd';

import { withReduxSaga } from '../store/store';
import { getTourDetail } from '../store/actions';
import Wrapper from '../components/wrapper';
import TourDetails from '../components/Tour/TourDetail';

const { Content } = Layout;

class TourDetail extends Component {
	static async getInitialProps({ store, query }) {
		await store.dispatch(getTourDetail(query.tourId));
	}
	render() {
		return (
			<Wrapper title="Tour Detail">
				<Layout className="layout content-body-adj">
					<Content>
						<TourDetails />
					</Content>
				</Layout>
			</Wrapper>
		);
	}
}

export default withReduxSaga(TourDetail);
