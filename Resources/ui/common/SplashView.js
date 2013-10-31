function SplashView(){
	var self = Ti.UI.createView();
	Ti.App.addEventListener("startApp", function(){
		var DocumentWindow = require(Ti.App.config.windowPath + 'StartWindow');
		var winViewer = new DocumentWindow();
		winViewer.open();
		self.fireEvent("shouldCloseView");
	});
	return self;
}

module.exports = SplashView;