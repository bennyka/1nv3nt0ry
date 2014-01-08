function ObjectWindow(data) {
	//load component dependencies
	var ObjectView = require('ui/common/ObjectView');
		
	//create component instance
	var self = Ti.UI.createWindow({
		backgroundColor:'#ffffff',
		orientationModes:[Ti.UI.PORTRAIT,Ti.UI.UPSIDE_PORTRAIT],
		navBarHidden: true
	});
		
	//construct UI
	var objectView = new ObjectView(data);
	self.add(objectView);

	objectView.addEventListener("shouldCloseView", function () {
		self.close();
	});

	return self;
}

//make constructor function the public component interface
module.exports = ObjectWindow;
