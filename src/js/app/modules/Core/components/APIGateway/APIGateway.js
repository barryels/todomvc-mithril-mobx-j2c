'use strict';


var m = require('mithril');
var _config = {};


function init(conf) {
	_config = conf;
	_config.basePath = '/todomvc-mithril-mobx';
}


function deserializeHTMLResponse(value) {
	return value;
}


function deserializeResponse(value) {
	try {
		return JSON.parse(value);
	} catch (e) {
		return null;
	}
}


function serializeRequest(value) {
	return value;
}


function makeRequestForJSON(request) {
	if (typeof request.background !== 'boolean') {
		request.background = true;
	}

	if (!request.method) {
		request.method = 'GET';
	}

	request.url = buildURL(request.url, _config.rest);
	// request.serialize = serializeRequest;
	request.deserialize = deserializeResponse;

	return m.request(request);
}


function makeRequestForHTML(request) {
	if (typeof request.background !== 'boolean') {
		request.background = true;
	}

	if (!request.method) {
		request.method = 'GET';
	}

	request.url = buildURL(request.url, _config.rest);
	request.deserialize = deserializeHTMLResponse;

	return m.request(request);
}


function buildURL(path, restConfig) {
	return restConfig.protocol + '://' + restConfig.domain + ':' + restConfig.port + restConfig.basePath + path;
}


module.exports = {
	init: init,
	makeRequestForJSON: makeRequestForJSON,
	makeRequestForHTML: makeRequestForHTML
};
