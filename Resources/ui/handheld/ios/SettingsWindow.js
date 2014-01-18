function SettingsWindow() {
	//load component dependencies
	var SettingsView = require('ui/common/SettingsView');
		
	//create component instance
	var self = Ti.UI.createWindow({
		backgroundColor:'#ffffff',
		modal: true,
		orientationModes:[Ti.UI.PORTRAIT,Ti.UI.UPSIDE_PORTRAIT],
		navBarHidden: true
	});
		
	//construct UI
	var settingsView = new SettingsView();
	self.add(settingsView);

	settingsView.addEventListener("shouldCloseView", function () {
		self.close();
	});

	return self;
}

//make constructor function the public component interface
module.exports = SettingsWindow;
