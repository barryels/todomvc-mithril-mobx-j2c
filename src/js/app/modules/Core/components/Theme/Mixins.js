'use strict';


var name = 'theme__mixins';
var m = require('mithril');


function borderRadius(radius) {
	return {
		_webkit_border_radius: radius,
		border_radius: radius
	};
}


module.exports = {
	borderRadius: borderRadius
};
