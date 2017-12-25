module.exports = {
	webpack: config => {
		// Remove minifed react aliases for material-ui so production builds work
		if (config.resolve.alias) {
			delete config.resolve.alias.react;
			delete config.resolve.alias['react-dom'];
		}

		// Fixes npm packages that depend on `fs` module
		config.node = {
			fs: 'empty'
		};
		return config;
	}
};
