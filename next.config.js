module.exports = {
	target: 'serverless',
	exportTrailingSlash: true,
	exportPathMap: function() {
		return {
			'/': { page: '/' }
		};
	},
	env: {
		SITE_ID: process.env.SITE_ID,
		ACCESS_TOKEN: process.env.ACCESS_TOKEN
	}
};
