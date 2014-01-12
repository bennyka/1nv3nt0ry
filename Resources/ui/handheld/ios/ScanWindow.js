function ScanWindow() {
	//load component dependencies
	var ScanView = require('ui/common/ScanView');
		
	//create component instance
	var self = Ti.UI.createWindow({
		backgroundColor:'#ffffff',
		modal: true,
		orientationModes:[Ti.UI.PORTRAIT,Ti.UI.UPSIDE_PORTRAIT],
		navBarHidden: true
	});
		
	//construct UI
	var scanView = new ScanView();
	self.add(scanView);

	scanView.addEventListener("shouldCloseView", function () {
		self.close();
	});

	return self;
}

//make constructor function the public component interface
module.exports = ScanWindow;
