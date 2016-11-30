'use strict';


var m = require('mithril');
var mobx = require('mobx');
mobx.useStrict(true);
// var kizzy = require('kizzy');
// var storeCache = kizzy('store');


var Utils = require('./modules/Core/components/Utils/Utils');
var Gateway = require('./modules/Core/components/APIGateway/APIGateway');
var storeAsJS;
var state;
var actions;


function setupState() {

	storeAsJS = null;
	//storeAsJS = storeCache.get('store');

	if (storeAsJS) {
		state = mobx.observable(storeAsJS);
	} else {

		state = mobx.observable({
			Gateway: {
				config: {
					rest: {
						protocol: 'http',
						domain: 'localhost',
						port: '8300'
					}
				}
			},

			Device: {
				viewport: {
					width: 0,
					height: 0,
					orientation: null
				}
			},

			modules: {
				Settings: {}
			},

			todos: {
				list: [
					{title: "Taste JavaScript"}
				]
			}

		});

	}

	return state;
}


actions = {


	reload: function () {
		window.location.reload(true);
	},


	// UI
	onDeviceViewportChange: mobx.action(function (width, height, orientation) {
		// beforeAction();
		// console.log('onBeforeRouteChange()', width, height, orientation);
		state.Device.viewport.width = width;
		state.Device.viewport.height = height;
		state.Device.viewport.orientation = orientation;
		redrawUI();
	}),


	onBeforeRouteChange: mobx.action(function (path) {
		// beforeAction();
		// console.log('onBeforeRouteChange()', path);
		// if (state.AppNav.isShowing) {
		// 	state.AppNav.isShowing = false;
		// }
		// redrawUI();
	}),


	onAfterRouteChange: mobx.action(function (path) {
		// beforeAction();
		console.log('onAfterRouteChange()', path);
		redrawUI();
	}),


	updateLoadingOverlayContent: mobx.action(function (content) {
		if (content) {
			state.LoadingOverlay.content = m.trust(content);
		} else {
			state.LoadingOverlay.content = '';
		}

		redrawUI();
	}),


	updateDialogContent: mobx.action(function (content) {
		if (content) {
			if (typeof content === 'string') {
				state.Dialog.content = m.trust(content);
			} else {
				state.Dialog.content = content;
			}
		} else {
			state.Dialog.content = '';
		}

		redrawUI();
	}),


	// User
	attemptUserLogin: mobx.action(function (payload) {
		beforeAction(payload);
		state.activeUser.memberID = null;
		state.activeUser.isLoggingIn = true;
		state.activeUser.profile = null;
		state.activeUser.products = [];
		actions.updateLoadingOverlayContent(state.messages.LOGIN_BUSY.template);
		redrawUI();

		Gateway.makeRequestForJSON({
			method: 'POST',
			url: '/MobileAJAXServer?method=MobileMemberLogin',
			data: {
				phone: payload.cell,
				pwd: payload.password,
				clientId: '1'
			}
		})
			.then(
				mobx.action(function (result) {
					console.log('attemptUserLogin()', result);
					var client = {};
					actions.updateLoadingOverlayContent('');
					state.activeUser.isLoggingIn = false;

					if (result && (result.memberID)) {
						state.activeUser.memberID = result.memberID;
						state.activeUser.dependantID = result.dependantID;
					} else {
						window.alert(state.messages.LOGIN_ERROR.template);
					}
					afterAction(state);
					redrawUI();

					return result;
				}),

				mobx.action(function (error) {
					actions.updateLoadingOverlayContent('');
					state.activeUser.isLoggingIn = false;
					window.alert(state.messages.GENERIC_ERROR.template);
					redrawUI();
				})
			)
			.then(function () {
				actions.getActiveUserPersonalInfo();
			});
	}),


	getActiveUserPersonalInfo: mobx.action(function () {
		Gateway.makeRequestForJSON({
			url: '/MobileAJAXServer?method=MobileGetPersonalInfo',
			method: 'POST',
			data: {
				memberID: state.activeUser.memberID,
				dependantID: state.activeUser.dependantID
			}
		})
			.then(
				mobx.action(function (result) {
					console.log(result);
					state.activeUser.profile = result;
					redrawUI();
				}),

				mobx.action(function (error) {
					console.warn(error);
					window.alert(state.messages.GENERAL_LOADING_PERSONALINFO_ERROR.template);
					redrawUI();
				})
			);

	}),


	// Device Camera
	getCameraStill: function () {

		if (navigator.camera) {

			navigator.camera.getPicture(
				function (response) {
					// Success
					mobx.action(function () {
						state.DeviceCamera.currentStill = response;
						redrawUI();
					})();
				}, function (response) {
					// Error or 'Camera cancelled.'
					console.log('navigator.camera.error() -> response', response);
					mobx.action(function () {
						state.DeviceCamera.currentStill = null;
						redrawUI();
					})();
				}, {
					destinationType: 0,
					sourceType: 1,
					targetWidth: 200,
					targetHeight: 200,
					quality: 80
				});

		}

	}


};


function beforeAction(req) {
	logStoreData();
}


function afterAction(state) {
	// storeCache.set('store', mobx.toJS(state));
}


function updateLocalStorage(name, data) {

}


function groupPolicyRiskItemsByCoverType(items) {
	return Utils
		.chain(items)
		.groupBy('CoverType')
		.map(function (value, key) {
			return {
				CoverType: key,
				PolicyGuid: value[0].PolicyGuid,
				count: value.length,
				items: value
			}
		})
		.value();
}


function redrawUI(strategy) {
	if (strategy) {
		m.redraw.strategy(strategy);
	}
	return m.redraw();
}


function logStoreData() {
	// console.info(mobx.toJS(data));
}


setupState();


module.exports = {
	state: state,
	actions: actions
};
