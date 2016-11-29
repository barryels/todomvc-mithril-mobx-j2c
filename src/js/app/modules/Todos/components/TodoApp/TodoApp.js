'use strict';


var m = require('mithril');


var StyleManager = require('./../../../Core/components/StyleManager/StyleManager');
var name = 'TodoApp';
var className = 'todoapp';
var style = {};


style[className] = {
	background: '#fff',
	margin: '130px 0 40px 0',
	position: 'relative',
	box_shadow: '0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 25px 50px 0 rgba(0, 0, 0, 0.1)',


	' input::': {

		'&-webkit-input-placeholder': {
			font_style: 'italic',
			font_weight: '300',
			color: '#e6e6e6'
		},

		'&-moz-placeholder': {
			font_style: 'italic',
			font_weight: '300',
			color: '#e6e6e6'
		},

		'&input-placeholder': {
			font_style: 'italic',
			font_weight: '300',
			color: '#e6e6e6'
		}
	},

	' h1': {
		position: 'absolute',
		top: '-155px',
		width: '100%',
		font_size: '100px',
		font_weight: '100',
		text_align: 'center',
		color: 'rgba(175, 47, 47, 0.15)',
		_webkit_text_rendering: 'optimizeLegibility',
		_moz_text_rendering: 'optimizeLegibility',
		text_rendering: 'optimizeLegibility'
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
