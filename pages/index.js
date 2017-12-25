import React from 'react';
import Head from '../components/head';
import Tour from '../components/Tour/Tour';
import Wrapper from '../hoc/Wrapper';

export default () => (
	<Wrapper>
		<Head title="Home" />

		<Tour />
	</Wrapper>
);
