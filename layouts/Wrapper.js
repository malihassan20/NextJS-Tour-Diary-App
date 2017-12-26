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
	render() {
		const { userAgent } = this.props.userAgent;

		return (
			<MuiThemeProvider muiTheme={getMuiTheme({ userAgent, ...muiTheme })}>
				<div>{this.props.children}</div>
			</MuiThemeProvider>
		);
	}
}

export default Wrapper;
