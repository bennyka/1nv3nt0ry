function StartWindow() {
	//load component dependencies
	var StartView = require('ui/common/StartView');
		
	//create component instance
	var self = Ti.UI.createWindow({
		backgroundColor:'#ffffff',
		modal: true,
		orientationModes:[Ti.UI.PORTRAIT,Ti.UI.UPSIDE_PORTRAIT],
		navBarHidden: true
	});
		
	//construct UI
	var startView = new StartView();
	self.add(startView);
	
	startView.addEventListener("shouldCloseView", function () {
		self.close();
	});

	return self;
}

//make constructor function the public component interface
module.exports = StartWindow;
