function ObjectPreviewWindow(data) {
	//load component dependencies
	var ObjectPreviewView = require('ui/common/ObjectPreviewView');
		
	//create component instance
	var self = Ti.UI.createWindow({
		backgroundColor:'#ffffff',
		orientationModes:[Ti.UI.PORTRAIT,Ti.UI.UPSIDE_PORTRAIT],
		navBarHidden: true
	});
		
	//construct UI
	var objectPreviewView = new ObjectPreviewView(data);
	self.add(objectPreviewView);

	objectPreviewView.addEventListener("shouldCloseView", function () {
		self.close();
	});

	return self;
}

//make constructor function the public component interface
module.exports = ObjectPreviewWindow;
