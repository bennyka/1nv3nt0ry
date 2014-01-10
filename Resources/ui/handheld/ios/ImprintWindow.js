function ImprintWindow() {
	//load component dependencies
	var ImprintView = require('ui/common/imprintView');
		
	//create component instance
	var self = Ti.UI.createWindow({
		backgroundColor:'#ffffff',
		orientationModes:[Ti.UI.PORTRAIT,Ti.UI.UPSIDE_PORTRAIT],
		navBarHidden: true
	});
		
	//construct UI
	var imprintView = new ImprintView();
	self.add(imprintView);

	imprintView.addEventListener("shouldCloseView", function () {
		self.close();
	});

	return self;
}

//make constructor function the public component interface
module.exports = ImprintWindow;
