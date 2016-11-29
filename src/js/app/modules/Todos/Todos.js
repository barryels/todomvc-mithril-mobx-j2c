'use strict';


var urls = {
	active: '/active',
	completed: '/completed'
};


var routes = {
	active: {
		url: urls.active,
		screen: require('./screens/active')
	},
	completed: {
		url: urls.completed,
		screen: require('./screens/completed')
	}
};


module.exports = {
	urls: urls,
	routes: routes
};
