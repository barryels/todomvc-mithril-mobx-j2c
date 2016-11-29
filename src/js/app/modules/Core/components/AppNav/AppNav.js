'use strict';


var m = require('mithril');
var Velocity = require('velocity-animate');


var name = 'AppNav';
var className = '.' + name;
var style_manager = require('./../StyleManager/StyleManager');
var store = require('./../../../../store');
var OneAppIcon = require('./../AppIcon/AppIcon');


var state = {
	isShowing: null,
	element: null
};


var style = {};
style[className] = {
	box_sizing: 'border-box',
	background: '#000',
	color: '#fff',
	display: 'none',
	font_family: 'Avenir, Arial, sans-serif',
	// font_size: theme_variables.button_font_size + 'px',
	height: '100%',
	left: 0,
	margin: '0',
	padding: '0 20px',
	position: 'fixed',
	top: 0,
	width: '280px',
	z_index: 102,

	'&__closeButton': {
		background: 'closeButton_backgroundColour',
		left: '0',
		margin: 0,
		padding: '0 15px',
		position: 'absolute',
		top: '0',
		width: 'auto'
	},

	'&__header': {
		background: 'transparent',
		margin: 0,
		padding: 0,
		position: 'absolute',
		left: '0',
		top: '0',
		width: '100%',
		z_index: 3
	},

	'&__content': {
		_webkit_overflow_scrolling: 'touch',
		box_sizing: 'border-box',
		color: '#222',
		height: '100%',
		margin: 0,
		overflow: 'scroll',
		padding: 0,
		position: 'absolute',
		left: '0',
		width: '100%',
		z_index: 1
	},

	'&__footer': {
		background: '#000',
		bottom: '0',
		color: '#fff',
		font_size: '11px',
		left: '0',
		margin: 0,
		padding: 0,
		position: 'absolute',
		text_align: 'center',
		width: '100%',
		z_index: 2
	},

	'&__item': {
		display: 'block',
		padding: '15px 20px',
		text_decoration: 'none',

		' .OneAppIcon': {
			margin_right: '10px'
		}
	}
};


function addStyling(model) {
	style[className].translateX = '-' + style[className].width;
	style[className].background = model.backgroundColour;
	style[className]['&__header'].background = model.header_background;
	style[className]['&__header'].height = model.header_height + 'px';
	style[className]['&__closeButton'].background = model.closeButton_backgroundColour;
	style[className]['&__closeButton'].color = model.closeButton_foregroundColour;
	style[className]['&__closeButton'].height = model.header_height + 'px';
	style[className]['&__content'].padding_top = (model.header_height + 10) + 'px';
	style[className]['&__content'].padding_bottom = (model.footer_height + 10) + 'px';
	style[className]['&__item'].color = model.foregroundColour;
	style[className]['&__footer'].background = model.footer_background;
	style[className]['&__footer'].height = model.footer_height + 'px';
	style[className]['&__footer'].line_height = model.footer_height + 'px';

	style_manager.addGlobalHeadStyle(name, style);
}


function controller(props) {

	var model = props.model;

	function viewConfig(element, isInitialized, context) {

		if (!isInitialized) {
			context.retain = true;
			state.element = element;
			addStyling(model);
		}

		if (model.isShowing) {
			show(state.element, model.showAnimationDuration);
		} else {
			if (!isInitialized) {
				hide(state.element, 0);
			} else {
				if (model.isShowing !== state.isShowing) {
					hide(state.element, model.hideAnimationDuration);
				}
			}
		}

		state.isShowing = model.isShowing;
	}


	function show24hourTotalCarePopup(e) {
		e.preventDefault();
		store.actions.show24hourTotalCarePopup();
	}


	function showHelpPopup(e) {
		e.preventDefault();
		store.actions.showHelpPopup();
	}

	function reload(e) {
		e.preventDefault();
		store.actions.reload();
	}


	function show(element, duration) {
		Velocity(element, 'stop');
		Velocity(element, {
			translateX: 0
		}, {
			duration: duration,
			easing: model.showAnimationEasing,
			begin: function (elements) {
				elements[0].style.display = 'block';
			}
		});
	}


	function hide(element, duration) {
		Velocity(element, 'stop');
		Velocity(element, {
			translateX: '-' + (model.maxWidth + 1) + 'px'
		}, {
			duration: duration,
			easing: model.hideAnimationEasing
		});
	}


	return {
		viewConfig: viewConfig,
		show24hourTotalCarePopup: show24hourTotalCarePopup,
		showHelpPopup: showHelpPopup,
		reload: reload,
		model: model
	};
}


function view(controller, props) {
	return <div className={name} config={controller.viewConfig}>
		<div class={name +'__header'}>
			<button className={name + '__closeButton'} onclick={props.fnClose.bind(null)}>
				<OneAppIcon name="close" size="24"/>
			</button>
		</div>
		<div class={name +'__content'}>
			<a className={name + '__item'} href="#/">
				<OneAppIcon name="home" size="20"/><span className="text">Home</span>
			</a>
			<a className={name + '__item'} onclick={controller.show24hourTotalCarePopup.bind(null)}>
				<OneAppIcon name="24-hour-thin" size="20"/><span className="text">24 Hour Total Care</span>
			</a>
			<a className={name + '__item'} href="#/emergency-assist">
				<OneAppIcon name="emergency-assist" size="20"/><span className="text">Emergency Assist</span>
			</a>
			<a className={name + '__item'} href="#/fire-assist">
				<OneAppIcon name="fire-hoze" size="20"/><span className="text">Fire Assist</span>
			</a>
			<a className={name + '__item'} href="#/accident-assist">
				<OneAppIcon name="towtruck" size="20"/><span className="text">Accident Assist</span>
			</a>
			<a className={name + '__item'} href="#/personal-details">
				<OneAppIcon name="personal" size="20"/><span className="text">Personal Details</span>
			</a>
			<a className={name + '__item'} href="#/business-details">
				<OneAppIcon name="personal" size="20"/><span className="text">Business Details</span>
			</a>
			<a className={name + '__item'} href="#/chat-and-notifications">
				<OneAppIcon name="chat-messages" size="20"/><span className="text">Chat &amp; Messages</span>
			</a>
			<a className={name + '__item'} href="#/policies">
				<OneAppIcon name="policy" size="20"/><span className="text">Policies</span>
			</a>
			<a className={name + '__item'} href="#/claims">
				<OneAppIcon name="collect-details" size="20"/><span className="text">Claims</span>
			</a>
			<a className={name + '__item'} href="#/client-info">
				<OneAppIcon name="about" size="20"/><span className="text">About {props.clientName}</span>
			</a>
			<a className={name + '__item'} onclick={controller.showHelpPopup.bind(null)}>
				<OneAppIcon name="help" size="20"/><span className="text">Help</span>
			</a>
			<a className={name + '__item'} href="#/settings">
				<OneAppIcon name="settings" size="20"/><span className="text">Settings</span>
			</a>
			<a className={name + '__item'} href="#/user/logout">
				<OneAppIcon name="logout" size="20"/><span className="text">Logout</span>
			</a>
			<a className={name + '__item'} href="#/general/login">
				<OneAppIcon name="chauffeur-key" size="20"/><span className="text">Sign In / Activate</span>
			</a>
			<a className={name + '__item'} href="#/general/terms">
				<OneAppIcon name="steps" size="20"/><span className="text">Terms</span>
			</a>
			<a className={name + '__item'} href="#/general/test">
				<OneAppIcon name="birthday" size="20"/><span className="text">Test</span>
			</a>
			<a className={name + '__item'} onclick={controller.reload.bind(null)}>
				<OneAppIcon name="birthday" size="20"/><span className="text">Reload</span>
			</a>
		</div>
		<div class={name +'__footer'}>
			{controller.model.footer_content}
		</div>
	</div>;
}


module.exports = {
	controller: controller,
	view: view
};
