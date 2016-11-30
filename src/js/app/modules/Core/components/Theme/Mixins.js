'use strict';


var name = 'theme__mixins';
var m = require('mithril');


function borderRadius(radius) {
	return {
		_webkit_border_radius: radius,
		border_radius: radius
	};
}


function mediaQuery_forPhoneOnly() {
	// @media (max-width: 599px) { @content; }
}

function mediaQuery_forTabletPortraitUp() {
	// @media (min-width: 600px) { @content; }
}

function mediaQuery_forTabletLandscapeUp() {
	// @media (min-width: 900px) { @content; }
}

function mediaQuery_forDesktopUp() {
	// @media (min-width: 1200px) { @content; }
}

function mediaQuery_forBigDesktopUp() {
	// @media (min-width: 1800px) { @content; }
}


module.exports = {
	borderRadius: borderRadius,
	mediaQuery_forPhoneOnly: mediaQuery_forPhoneOnly,
	mediaQuery_forTabletPortraitUp: mediaQuery_forTabletPortraitUp,
	mediaQuery_forTabletLandscapeUp: mediaQuery_forTabletLandscapeUp,
	mediaQuery_forDesktopUp: mediaQuery_forDesktopUp,
	mediaQuery_forBigDesktopUp: mediaQuery_forBigDesktopUp
};
