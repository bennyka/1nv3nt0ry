Ti.include("/lib/toolbar.js");
Ti.include("/lib/createButton.js");
Ti.include("/lib/styles.js");
function StartView() {
	
	var self = Ti.UI.createView({
		backgroundGradient:style.backgroundGradient
	});
	
	// ++++++++++++++TOP++++++++++++++
	var areaTop= Ti.UI.createView({
		top:0,
		left:0,
		height:"25%"
	});
	self.add(areaTop);
	
	var headline = Ti.UI.createLabel({
		text:Ti.App.name,
		center:{x:'50%',y:'50%'},
		font: {fontFamily: style.specialFontFamily, fontSize:"40dp"},
		color:'#ffffff'
	});
	areaTop.add(headline);
	
	// ++++++++++++++LEFT++++++++++++++
	var areaBtnLeft = Ti.UI.createView({
		top:"25%",
		left:0,
		height:"50%",
		width:"50%",
		backgroundColor:style.whiteTransparentBackground
	});
	self.add(areaBtnLeft);
	
	var btnInventory = Ti.UI.createView({
		borderColor:'#ffffff',
		borderWidth:1,
		borderRadius:50,
		height:100,
		width:100,
		center:{x:'50%',y:'50%'}
	});
	areaBtnLeft.add(btnInventory);
	
	var btnInventoryTitle = Ti.UI.createLabel({
		text:L('Inventory','Inventar'),
		center:{x:'50%'},
		color:'#ffffff',
		font:{fontFamily:style.specialFontFamily,fontSize:"25dp"},
		bottom:"15%"
		
	});
	areaBtnLeft.add(btnInventoryTitle);
	// ++++++++++++++RIGHT++++++++++++++
	var areaBtnRight = Ti.UI.createView({
		top:"25%",
		right:0,
		height:"50%",
		width:"50%",
		backgroundColor:style.whiteTransparentBackground
	});
	self.add(areaBtnRight);
	
	var btnObject = Ti.UI.createView({
		borderColor:'#ffffff',
		borderWidth:1,
		borderRadius:50,
		height:100,
		width:100,
		center:{x:'50%',y:'50%'}
	});
	areaBtnRight.add(btnObject);
	
	var btnObjectTitle = Ti.UI.createLabel({
		text:L('add Object','Objekt hinzufügen'),
		center:{x:'50%'},	
		font:{fontFamily:style.specialFontFamily,fontSize:"25dp"},
		color:'#ffffff',
		bottom:"15%"
		
	});
	areaBtnRight.add(btnObjectTitle);
	// ++++++++++++++BOTTOM++++++++++++++
	var areaBottom = Ti.UI.createView({
		bottom:0,
		right:0,
		height:"25%"
	});
	self.add(areaBottom);

	var btnImpressum = Ti.UI.createView({
		borderRadius:50,
		height:100,
		width:100,
		backgroundColor:style.whiteTransparentBackground,
		bottom:-40,
		center:{x:'50%'}
	});
	areaBottom.add(btnImpressum);
	
	var btnImpressumTitle = Ti.UI.createLabel({
		text:L('Impressum','Impressum'),
		center:{x:'50%'},	
		font:{fontFamily:style.specialFontFamily,fontSize:"25dp"},
		color:'#ffffff',
		bottom:5
		
	});
	areaBottom.add(btnImpressumTitle);
	return self;
};

module.exports = StartView;