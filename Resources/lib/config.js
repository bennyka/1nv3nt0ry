


var osname = Ti.Platform.osname,
	version = Ti.Platform.version,
	height = Ti.Platform.displayCaps.platformHeight,
	width = Ti.Platform.displayCaps.platformWidth;
var screensize = require('lib/Screensize');
var config = {
	isTablet: screensize.isTablet()
};

if (config.isTablet) {
	if (osname === 'android') {
		windowPath = 'ui/tablet/android/';
	} else {
		windowPath = 'ui/tablet/ios/';
	}
}
else {
	if (osname === 'android') {
		windowPath = 'ui/handheld/android/';
	}
	else {
		windowPath = 'ui/handheld/ios/';
	}
};

config.windowPath = windowPath;

Ti.App.config = config;
