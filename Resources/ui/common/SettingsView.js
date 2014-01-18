
function SettingsView() {
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
			title:L(' back ',' zurück '),
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
		text:L('Settings', 'Einstellungen'),
		center:{x:'50%',y:'50%'},
		font: {fontFamily: style.specialFontFamily, fontSize:"60sp"},
		color:'#ffffff'
	});
	areaTop.add(headline);
	
	// ++++++++++++++BOTTOM++++++++++++++
	var areaBottom = Ti.UI.createView({
		top:"25%",
		left:0,
		height:"50%",
		backgroundColor:style.whiteTransparentBackground
	});
	self.add(areaBottom);
	
	var btnImprint = Ti.UI.createView({
		bottom:20,
		center:{x:'50%'},
		right:5,
		width:100,
		height:30,
		borderColor:'#ffffff',
		borderWidth:1,
		borderRadius:5,
		color:'#ffffff',
		backgroundImage:'transparent',
		zIndex:10
	});
	areaBottom.add(btnImprint);
	
	var btnImprintTitle = Ti.UI.createLabel({
		text: L('Imprint','Impressum'),
		touchEnabled:false,
		color:'#ffffff',
		center:{x:'50%',y:'50%'}
	});
	btnImprint.add(btnImprintTitle);
	
	btnImprint.addEventListener("click", function(){
		var ImprintView = require(Ti.App.config.windowPath + 'ImprintWindow');
		var imprintView = new ImprintView();
		imprintView.open();
	});

	return self;
};

module.exports = SettingsView;
