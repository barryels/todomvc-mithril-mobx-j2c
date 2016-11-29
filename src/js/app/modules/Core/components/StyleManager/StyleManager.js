'use strict';


var name = 'StyleManager';
var j2c = require('j2c');


function addHeadStyle(id, css) {
	var cssString = '';

	// console.warn(name + ' > "' + id + '" adding styling');

	var head = getHTMLHead(),
		style = createDOMStyleElement();

	style.id = name + '' + id;

	if (typeof css === 'string') {
		cssString = css;
	} else {
		cssString = j2c.sheet(css);
	}

	style.appendChild(document.createTextNode(cssString));

	head.appendChild(style);
}


function addGlobalHeadStyle(id, css) {
	addHeadStyle(id, {
		'@global': css
	});
}


function getHTMLHead() {
	return document.head || document.getElementsByTagName('head')[0];
}


function createDOMStyleElement() {
	return document.createElement('style');
}


function generateCSSFromJS(js) {
	return j2c.sheet(js);
}


module.exports = {
	name: name,
	generateCSSFromJS: generateCSSFromJS,
	addHeadStyle: addHeadStyle,
	addGlobalHeadStyle: addGlobalHeadStyle
};
