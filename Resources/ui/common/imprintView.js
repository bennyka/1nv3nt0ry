Ti.include("/lib/dataHandler.js");
function ImprintView() {
	var self = Ti.UI.createView({
		backgroundGradient:style.backgroundGradient
	});
	
	// ++++++++++++++TOP++++++++++++++
	var areaTop= Ti.UI.createView({
		top:0,
		left:0,
		height:"20%"
	});
	self.add(areaTop);
	
	if (Ti.Platform.getOsname() != "android"){
		var btnBack = Ti.UI.createButton({
			title:L('back'),
			top:25,
			left:5,
			color:'#ffffff',
			borderColor:'#ffffff',
			borderWidth:1,
			borderRadius:5
		});
		btnBack.addEventListener("click", function(e){
			self.fireEvent("shouldCloseView");
		});
		areaTop.add(btnBack);
	}
	
	var headline = Ti.UI.createLabel({
		text:L('imprint'),
		center:{x:'50%',y:'50%'},
		font: {fontFamily: style.specialFontFamily, fontSize:"60sp"},
		color:'#ffffff'
	});
	areaTop.add(headline);
	
	// ++++++++++++++BOTTOM++++++++++++++
	var areaBottom = Ti.UI.createView({
		bottom:0,
		left:0,
		height:"75%",
		backgroundColor:style.whiteTransparentBackground
	});
	self.add(areaBottom);
	var html = Ti.Filesystem.getFile(Ti.Filesystem.getResourcesDirectory(),'lib/impress.html');
	var imprint = Ti.UI.createWebView({
		url:html.nativePath,
		enableZoomControls:false,
		backgroundColor:'transparent'
	});
	areaBottom.add(imprint);
	return self;
};

module.exports = ImprintView;
