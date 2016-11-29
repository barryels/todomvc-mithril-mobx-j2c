'use strict';


var m = require('mithril');


var name = 'Theme';
var StyleManager = require('./../StyleManager/StyleManager');


var style = {
	'html, body': {
		margin: 0,
		padding: 0
	},

	'body': {
		font: '14px \'Helvetica Neue\', Helvetica, Arial, sans-serif',
		line_height: '1.4em',
		background: '#f5f5f5',
		color: '#4d4d4d',
		min_width: '230px',
		max_width: '550px',
		margin: '0 auto',
		_webkit_font_smoothing: 'antialiased',
		_moz_osx_font_smoothing: 'grayscale',
		font_weight: '300'
	},

	':focus': {
		outline: 0
	},

	'.hidden': {
		display: 'none'
	}
};


function addStyling() {
	StyleManager.addGlobalHeadStyle(name, style);
}


addStyling();
