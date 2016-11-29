'use strict';


var m = require('mithril');


var store = require('./../../../../store');
var styleManager = require('./../StyleManager/StyleManager');
var name = 'AppContent';
var className = '.' + name;
var style = {};


style[className] = {
	_webkit_overflow_scrolling: 'touch',
	color: '#222',
	display: 'block',
	font_family: 'Avenir, Arial, sans-serif',
	// font_size: theme_variables.button_font_size + 'px',
	margin: '0',
	overflow_x: 'hidden',
	overflow_y: 'scroll',
	position: 'relative',
	width: '100%',
	z_index: 97
};


function addStyling() {
	styleManager.addGlobalHeadStyle(name, style);
}


function controller(props) {
	addStyling();

	return {};
}


function view(controller, props, inner) {
	return <div className={name}>{inner}</div>;
}


module.exports = {
	name: name,
	controller: controller,
	view: view
};
