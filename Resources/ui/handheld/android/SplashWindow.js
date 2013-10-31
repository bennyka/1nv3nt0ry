//Application Window Component Constructor
function SplashWindow() {
	//create component instance
	var self = Ti.UI.createWindow({
		backgroundColor:'#000000',
		orientationModes:[Ti.UI.PORTRAIT,Ti.UI.UPSIDE_PORTRAIT],
		navBarHidden:true
	});
	
	//load component dependencies
	var SplashView = require('ui/common/SplashView');
	
	var splashView = new SplashView({shelfWin:self});
	self.add(splashView); 
	
	splashView.addEventListener("shouldCloseView", function () {
		self.close();
	});
	
	// get screen size in pixel
	function onPostLayout () { 
		if (self.size.height != 0) {
			winHeight = self.size.height;
			winWidth = self.size.width;
			Ti.App.Properties.setList('winDimensions', [winWidth, winHeight]);
			Ti.App.fireEvent("startApp");
			self.removeEventListener('postlayout', onPostLayout);
		}
	};
	self.addEventListener('postlayout', onPostLayout);
	
	return self;
}

//make constructor function the public component interface
module.exports = SplashWindow;
