'use strict';


var m = require('mithril');
var Velocity = require('velocity-animate');
var _ = require('underscore');
// var _chain = require('lodash/chain');
// var _groupBy = require('lodash/groupBy');
// var _each = require('lodash/each');
// var _extend = require('lodash/extend');
// var _filter = require('lodash/filter');
// var _isEmpty = require('lodash/isEmpty');
// var _map = require('lodash/map');


function existy(value) {
	return value != null; // Intentional use of loose inequality operator (!=)
}


function anyExisty(values) {
	return _.filter(values,
			function (value) {
				return existy(value);
			}).length > 0;
}


function allExisty(values) {
	return true;
}


function truthy(value) {
	return existy(value) && (value !== false);
}


function anyTruthy(values) {
	return _.filter(values,
			function (value) {
				return truthy(value);
			}).length > 0;
}


function allTruthy(values) {
	return true;
}


function doWhen(predicate, fn) {
	if (existy(predicate) && existy(fn)) {
		fn();
	}
}


/**
 * Takes every property in an object and mutates the original object's property values
 * to match the name of the key. One level only, for now.
 * If you specify a prefix string, the value will be prefixed with your string
 * If you specify a suffix string, the value will be suffixed with your string
 * e.g.
 * ( { hello_world: "whatever" }, "asdf_", "-today")
 * will become:
 *   { hello_world: "asdf_hello_world-today" }
 * TODO:
 * [?] Add deep nesting support
 * [?] Allow more customisation of generated value, e.g. Uppercase, lowercase, add separators, etc.
 *
 * @param {object} obj
 * @param {string=} prefix
 * @param {string=} suffix
 * @returns {object}
 */
function mirrorKeys(obj, prefix, suffix) {
	var propName;
	var propValue;
	for (propName in obj) {
		propValue = propName;
		if (prefix) {
			propValue = prefix + propValue;
		}
		if (suffix) {
			propValue = propValue + suffix;
		}
		obj[propName] = propValue;
	}
	return obj;
}


function deepObjectExtend(target, source) {
	for (var prop in source) {
		if (source.hasOwnProperty(prop)) {
			if (target[prop] && typeof source[prop] === 'object') {
				deepObjectExtend(target[prop], source[prop]);
			}
			else {
				target[prop] = source[prop];
			}
		}
	}
	return target;
}


function transitionToRoute(route, delay) {
	//console.log('transitionToRoute', route);
	// setTimeout(function () {
	// 	m.route(route);
	// }, 0);

	var event = new CustomEvent('beforehashchange', {'hash': route});
	window.dispatchEvent(event);


	setTimeout(function () {
		window.location.href = '#' + route;
	}, delay);

	/*
	 var contentAreaElement = document.getElementById('ContentArea');

	 Velocity(contentAreaElement, {
	 opacity: 0
	 }, {
	 duration: 1000,
	 complete: function () {
	 setTimeout(function () {
	 window.location.href = '#' + route;
	 }, delay);

	 Velocity(contentAreaElement, {
	 opacity: 1
	 }, {
	 duration: 1000
	 });

	 }
	 });
	 */

	/*
	 //goToRoute(route);

	 velocity($('#main'), {
	 opacity: 0
	 }, {
	 duration: DEFAULTS.ANIMATION_DURATION,
	 easing: 'easeOut',
	 complete: function () {
	 goToRoute(route);
	 }
	 });

	 //velocity('slideUp', { delay: 500, duration: 1500 });
	 */
}


function goToRoute(route) {
	// if (AppModel.getState().SideNav.isShowing) {
	// 	transitionToRoute(route, _config.SideNav_hideAnimationDuration + 50);
	// } else {
	// 	transitionToRoute(route, 0);
	// }

	transitionToRoute(route, 0);
}


function disableDefaultEventBubbling(e) {
	e.preventDefault();
	e.stopImmediatePropagation();
}


function isFeatureOn(features, featureName) {
	var result = false;

	if (features) {
		if (features[featureName]) {
			result = true;
		}
	}

	return result;
}


function redraw(force) {
	m.redraw(force);
}


function getDeviceViewportDimensions() {
	var e = window;
	var a = 'inner';
	if (!('innerWidth' in window)) {
		a = 'client';
		e = document.documentElement || document.body;
	}
	return {width: e[a + 'Width'], height: e[a + 'Height']};
}


function base64ArrayBuffer(arrayBuffer) {
	var base64 = '';
	var encodings = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
	var bytes = new Uint8Array(arrayBuffer);
	var byteLength = bytes.byteLength;
	var byteRemainder = byteLength % 3;
	var mainLength = byteLength - byteRemainder;
	var a, b, c, d;
	var chunk;
	// Main loop deals with bytes in chunks of 3
	for (var i = 0; i < mainLength; i = i + 3) {
		// Combine the three bytes into a single integer
		chunk = (bytes[i] << 16) | (bytes[i + 1] << 8) | bytes[i + 2];
		// Use bitmasks to extract 6-bit segments from the triplet
		a = (chunk & 16515072) >> 18; // 16515072 = (2^6 - 1) << 18
		b = (chunk & 258048) >> 12; // 258048   = (2^6 - 1) << 12
		c = (chunk & 4032) >> 6; // 4032     = (2^6 - 1) << 6
		d = chunk & 63;         // 63       = 2^6 - 1
		// Convert the raw binary segments to the appropriate ASCII encoding
		base64 += encodings[a] + encodings[b] + encodings[c] + encodings[d]
	}
	// Deal with the remaining bytes and padding
	if (byteRemainder === 1) {
		chunk = bytes[mainLength];
		a = (chunk & 252) >> 2; // 252 = (2^6 - 1) << 2
		// Set the 4 least significant bits to zero
		b = (chunk & 3) << 4; // 3   = 2^2 - 1
		base64 += encodings[a] + encodings[b] + '==';
	} else if (byteRemainder === 2) {
		chunk = (bytes[mainLength] << 8) | bytes[mainLength + 1];
		a = (chunk & 64512) >> 10; // 64512 = (2^6 - 1) << 10
		b = (chunk & 1008) >> 4; // 1008  = (2^6 - 1) << 4
		// Set the 2 least significant bits to zero
		c = (chunk & 15) << 2; // 15    = 2^4 - 1
		base64 += encodings[a] + encodings[b] + encodings[c] + '=';
	}
	return base64;
}


function convertPDF14DataToRSAVehicleLicenceObject(data) {
	var code = data.split('%');
	var result = {
		vehicleYear: code[1],
		controlNumber: code[5],
		licenceNumber: code[6],
		registerNumber: code[7],
		vehicleDescription: code[8],
		vehicleMake: code[9],
		seriesName: code[10],
		vehicleColour: code[11],
		vinNumber: code[12],
		engineNumber: code[13],
		expiryDate: code[14]
	};

	return result;
}


module.exports = {
	deepObjectExtend: deepObjectExtend,
	mirrorKeys: mirrorKeys,
	existy: existy,
	anyExisty: anyExisty,
	allExisty: allExisty,
	truthy: truthy,
	anyTruthy: anyTruthy,
	allTruthy: allTruthy,
	doWhen: doWhen,

	goToRoute: goToRoute,

	getDeviceViewportDimensions: getDeviceViewportDimensions,
	redraw: redraw,

	disableDefaultEventBubbling: disableDefaultEventBubbling,
	isFeatureOn: isFeatureOn,

	base64ArrayBuffer: base64ArrayBuffer,
	convertPDF14DataToRSAVehicleLicenceObject: convertPDF14DataToRSAVehicleLicenceObject,

	chain: _.chain,
	each: _.each,
	extendOwn: _.extendOwn,
	filter: _.filter,
	groupBy: _.groupBy,
	isEmpty: _.isEmpty,
	map: _.map
};
