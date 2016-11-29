'use strict';


var m = require('mithril');
var style_manager = require('./../StyleManager/StyleManager');
var utils = require('./../Utils/Utils');


var name = 'AppIcon';
// var baseDirectory = window.DISTRO_CONFIG.bundle.root + '/features/General/components/AppIcon/fonts';
var baseDirectory = window.DISTRO_CONFIG.bundle.root + '/fonts';


var style = {
	'@font-face': {
		font_family: '"globalapp"',
		src: [
			'url("' + baseDirectory + '/globalapp.eot")',
			'url("' + baseDirectory + '/globalapp.eot?#iefix") format("embedded-opentype"), url("' + baseDirectory + '/globalapp.woff") format("woff"), url("' + baseDirectory + '/globalapp.ttf") format("truetype"), url("' + baseDirectory + '/globalapp.svg#globalapp") format("svg")'
		],
		font_weight: 'normal',
		font_style: 'normal'
	},

	'[class^="AppIcon-"]:before,[class*=" AppIcon-"]:before': {
		font_family: '"globalapp" !important',
		font_style: 'normal !important',
		font_weight: 'normal !important',
		font_variant: 'normal !important',
		text_transform: 'none !important',
		speak: 'none',
		line_height: '1',
		_webkit_font_smoothing: 'antialiased',
		_moz_osx_font_smoothing: 'grayscale'
	}
};


var iconList = {
	'phone': '"\\61"',

	'messages-unread': '"\\62"',
	'messages-read': '"\\63"',
	'chat-history': '"\\64"',
	'call-centre-chat': '"\\65"',
	'date-time': '"\\66"',
	'mobile': '"\\67"',
	'personal': '"\\68"',
	'home': '"\\69"',
	'logout': '"\\6a"',
	'policy': '"\\6b"',
	'emergency-assist': '"\\6c"',
	'birthday': '"\\6d"',
	'help': '"\\6e"',
	'settings': '"\\6f"',

	'chat-messages': '"\\70"',
	'close': '"\\71"',
	'crime': '"\\72"',
	'chauffeur-key': '"\\73"',
	'chauffeur-beer': '"\\74"',
	'chauffeur-wine': '"\\75"',
	'legal': '"\\76"',
	'medical': '"\\77"',
	'concierge-booking': '"\\78"',
	'concierge-luggage': '"\\79"',
	'concierge-tan': '"\\7a"',

	'concierge-tree': '"\\41"',
	'new': '"\\42"',
	'legal-hammer': '"\\43"',
	'service-providers-store': '"\\45"',
	'service-providers-sign': '"\\46"',
	'24-hour': '"\\48"',
	'about': '"\\49"',
	'24-hour-thin': '"\\4a"',
	'location': '"\\4b"',
	'location-map': '"\\4c"',
	'location-pin': '"\\4d"',
	'directions': '"\\4e"',
	'map': '"\\4f"',

	'map-location': '"\\50"',
	'map-location-round': '"\\51"',
	'search': '"\\52"',
	'help-question': '"\\53"',
	'drivers-license': '"\\55"',
	'vehicle-license': '"\\56"',
	'profile-picture': '"\\57"',
	'camera': '"\\58"',
	'more': '"\\59"',
	'language': '"\\5a"',

	'occupation': '"\\30"',
	'nationality': '"\\31"',
	'id': '"\\32"',
	'details': '"\\33"',
	'home-phone': '"\\34"',
	'gender': '"\\35"',
	'globe': '"\\37"',
	'branches': '"\\38"',
	'towtruck': '"\\39"',

	'24-hour-press': '"\\21"',
	'howtoguide': '"\\22"',
	'capture': '"\\23"',
	'roadworks': '"\\24"',
	'eye-witness': '"\\25"',
	'eye-witness-glasses': '"\\26"',
	'driver': '"\\27"',
	'vehicle-1': '"\\28"',
	'vehicle-2': '"\\29"',
	'breakdown': '"\\2a"',
	'partners': '"\\2b"',
	'circle-1': '"\\2c"',
	'circle-2': '"\\2d"',
	'circle-3': '"\\2e"',
	'circle-4': '"\\2f"',

	'circle-5': '"\\3a"',
	'circle-6': '"\\3b"',
	'circle-7': '"\\3c"',
	'steps': '"\\36"',
	'collect-details': '"\\40"',
	'funeral': '"\\3e"',
	'hiv': '"\\5b"',
	'heart-rate': '"\\5d"',
	'wheelchair': '"\\5e"',
	'office': '"\\7b"',
	'assault-1': '"\\5c"',
	'assault-2': '"\\e000"',
	'home-assist': '"\\e001"',
	'farm-1': '"\\3f"',
	'farm-2': '"\\5f"',
	'alert': '"\\7c"',
	'umbrella': '"\\7e"',
	'speedometer': '"\\3d"',
	'pocket-knife': '"\\e003"',
	'maintenance': '"\\e005"',
	'ambulance': '"\\47"',
	'road': '"\\44"',
	'circle-8': '"\\60"',
	'circle-9': '"\\7d"',
	'circle-10': '"\\e002"',
	'car-crash': '"\\54"',
	'coffin': '"\\e004"',
	'car': '"\\e006"',

	'trauma-assist': '"\\e007"',
	'court': '"\\e008"',
	'smashicons-outline': '"\\e009"',
	'smashicons-outline-1': '"\\e00a"',
	'windscreen': '"\\e00b"',
	'car-theft': '"\\e00c"',
	'fire-hoze': '"\\e00d"',
	'fire-contacts': '"\\e00e"',
	'fire-extinguisher': '"\\e00f"',

	'circle-12': '"\\e010"',
	'circle-13': '"\\e011"',
	'circle-14': '"\\e012"',
	'circle-15': '"\\e013"',
	'circle-16': '"\\e014"',
	'circle-17': '"\\e015"',
	'circle-18': '"\\e016"',
	'circle-20': '"\\e017"',
	'circle-11': '"\\e018"',

	'arrow-right': '"\\e019"',
	'arrow-left': '"\\e01a"',
	'accident-scene': '"\\e01b"',
	'vehicle-back': '"\\e01c"',
	'vehicle-front': '"\\e01d"',
	'vehicle-left': '"\\e01e"',
	'vehicle-right': '"\\e01f"',
	'24-hour-button': '"\\e020"',

	'more-2': '"\\e022"',
	'navicon': '"\\e021"',
	'check': '"\\e023"',
	'checkmark-outline': '"\\e024"'
};

utils.each(iconList, function (iconValue, iconName) {
	style['.AppIcon-' + iconName + ':before'] = {
		content: iconValue
	};
});


function addStyling() {
	style_manager.addGlobalHeadStyle(name, style);
}


function view(controller, props) {
	var size = (props.size || '16') + 'px';
	return <i className={'AppIcon-' + props.name} style={'font-size:' + size +';'}></i>;
}


addStyling();


module.exports = {
	name: name,
	view: view
};
