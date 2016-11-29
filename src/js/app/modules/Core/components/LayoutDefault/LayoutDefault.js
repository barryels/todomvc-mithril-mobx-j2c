'use strict';


var name = 'LayoutDefault';
var m = require('mithril');


var store = require('./../../../../store');
var AppContent = require('./../AppContent/AppContent');


function layout(props, route) {
	return <div class={name}>

		<AppContent model={store.state.AppContent}>
			{m.component(route.screen)}
		</AppContent>

	</div>;
}


module.exports = layout;
