'use strict';


var attachFastClick = require('fastclick');
var mobx = require('mobx');
var m = require('mithril');


// var theme = require('./core/theme/theme');
var Utils = require('./modules/Core/components/Utils/Utils');
var Gateway = require('./modules/Core/components/APIGateway/APIGateway');
var store = require('./store');


function init() {
	attachFastClick(document.body);

	m.withValue = function (callback) {
		return m.withAttr('value', callback);
	};

	window.onresize = onWindowResize;
	onWindowResize();

	if ('ontouchstart' in window) {
		document.body.classList.add('ontouchstart');
	}

	document.addEventListener('focus', function () {
		document.body.classList.add('input-focussed');
	}, true);

	document.addEventListener('blur', function () {
		document.body.classList.remove('input-focussed');
	}, true);

	// document.ontouchstart = function (e) {
	// 	e.preventDefault();
	// return false;
	// };

	// document.ontouchmove = function (e) {
	// 	e.preventDefault();
	// 	return false;
	// };


	Gateway.init(store.state.Gateway.config);


	start();

}


function start() {

	var modules = {
		Core: require('./modules/Core/Core'),
		Todos: require('./modules/Todos/Todos')
	};
	var LayoutDefault = require('./modules/Core/components/LayoutDefault/LayoutDefault');
	var routes = {};

	m.route.mode = 'hash';

	// var slidingPage = animator.setup(animator.slideIn, animator.slideOut);

	Utils.each(modules, function (module) {
		if (module.routes) {
			Utils.each(module.routes, function (route) {
				routes[route.url] = layout(LayoutDefault, route);
			});
		}
	});

	mobx.autorun(function () {
		m.route(document.getElementById('app'), '/', routes);
	});


	window.addEventListener((m.route.mode === 'hash') ? 'beforehashchange' : 'popstate', onBeforeHashChange, false);
	window.addEventListener((m.route.mode === 'hash') ? 'hashchange' : 'popstate', onAfterHashChange, false);
	onBeforeHashChange();
	onAfterHashChange();
}


function onBeforeHashChange() {
	var path = location.hash.substring(1);
	store.actions.onBeforeRouteChange(path);
}


function onAfterHashChange() {
	var path = location.hash.substring(1);
	store.actions.onAfterRouteChange(path);
}


function onWindowResize() {
	var dimensions = Utils.getDeviceViewportDimensions();
	store.actions.onDeviceViewportChange(dimensions.width, dimensions.height, null);
}


function layout(template, screen) {
	return {
		controller: function () {
			onBeforeHashChange();
		},
		view: function () {
			return template({}, screen);
		}
	};
}


function slider(page) {
	return {
		view: function () {
			return m.component(PageSlider, {
				page: page
			});
		}
	};
}


init();
