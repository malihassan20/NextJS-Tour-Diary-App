import React, { Component } from 'react';
import { deepOrange400 } from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

// Make sure react-tap-event-plugin only gets injected once
// Needed for material-ui
if (!process.tapEventInjected) {
	injectTapEventPlugin();
	process.tapEventInjected = true;
}

const muiTheme = {
	palette: {
		accent1Color: deepOrange400,
	},
};

class Wrapper extends Component {
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
		const { userAgent } = this.props;

		return (
			<MuiThemeProvider muiTheme={getMuiTheme({ userAgent, ...muiTheme })}>
				<div>{this.props.children}</div>
			</MuiThemeProvider>
		);
	}
}

export default Wrapper;
