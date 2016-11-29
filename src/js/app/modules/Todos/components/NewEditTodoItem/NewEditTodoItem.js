'use strict';


var m = require('mithril');
var store = require('./../../../../store');
var StyleManager = require('./../../../Core/components/StyleManager/StyleManager');


var name = 'NewEditTodoItem';
var className = 'new-todo';
var style = {};


style[className] = {
	background: 'rgba(0, 0, 0, 0.003)',
	border: 'none',
	'box-shadow': 'inset 0 -2px 1px rgba(0,0,0,0.03)',
	padding: '16px 16px 16px 60px',

	'&.edit': {
		border: '1px solid #999',
		'box-shadow': 'inset 0 -1px 5px 0 rgba(0, 0, 0, 0.2)',
		'box-sizing': 'border-box',
		color: 'inherit',
		'font-family': 'inherit',
		'font-size': '24px',
		'font-weight': 'inherit',
		'line-height': '1.4em',
		margin: '0',
		padding: '6px',
		position: 'relative',
		width: '100%',
		'-webkit-font-smoothing': 'antialiased',
		'-moz-osx-font-smoothing': 'grayscale'
	}

};


function addStyling() {
	style_manager.addGlobalHeadStyle(name, {
		'.AppContent': style
	});
}


function controller(props) {
	addStyling();

	return {};
}


function view(controller, props, children) {
	return <div className={name}>{children}</div>;
}


module.exports = {
	name: name,
	controller: controller,
	view: view
};
