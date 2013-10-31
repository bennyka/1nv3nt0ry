function StartWindow(data) {
	//load component dependencies
	var StartView = require('ui/common/StartView');
		
	//create component instance
	var self = Ti.UI.createWindow({
		backgroundColor:'#ffffff',
		modal: true,
		navBarHidden: true,
		top:0,
	});
		
	//construct UI
	var startView = new StartView(data);
	self.add(startView);
	
	startView.addEventListener("shouldCloseView", function () {
		self.close();
	});

	return self;
}

//make constructor function the public component interface
module.exports = StartWindow;
