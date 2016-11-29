'use strict';


var urls = {
	home: '/'
};


var routes = {
	home: {
		url: urls.home,
		screen: require('./screens/home')
	}
};


module.exports = {
	urls: urls,
	routes: routes
};
