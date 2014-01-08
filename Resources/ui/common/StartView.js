
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
		font: {fontFamily: style.specialFontFamily, fontSize:"60sp"},
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
		borderRadius:(Ti.Platform.getOsname() == "android") ? 100 : 50,
		height:100,
		width:100,
		center:{x:'50%',y:'50%'},
		zIndex:100,
		backgroundColor:'#66ffffff'
	});
	areaBtnLeft.add(btnInventory);

	btnInventory.addEventListener("singletap", function(){
		var InventoryView = require(Ti.App.config.windowPath + 'InventoryWindow');
		var inventoryView = new InventoryView();
		inventoryView.open();
	});
	
	var btnInventoryBorder = Ti.UI.createView({
		borderColor:'#ffffff',
		borderWidth:2,
		borderRadius:(Ti.Platform.getOsname() == "android") ? 126 : 62,
		height:126,
		width:126,
		bubbleParent:true,
		zIndex:10,
		center:{x:'50%',y:'50%'}
	});
	areaBtnLeft.add(btnInventoryBorder);
	
	var btnInventoryTitle = Ti.UI.createLabel({
		text:L('Inventory','Inventar'),
		center:{x:'50%'},
		color:'#ffffff',
		font:{fontFamily:style.specialFontFamily,fontSize:"35sp"},
		bottom:"12%"
		
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
		borderRadius:(Ti.Platform.getOsname() == "android") ? 100 : 50,
		borderColor:'#ffffff',
		height:100,
		width:100,
		center:{x:'50%',y:'50%'},
		zIndex:100,
		backgroundColor:'#66ffffff'
	});
	areaBtnRight.add(btnObject);
	
	btnObject.addEventListener("singletap", function(){
		var ObjectView = require(Ti.App.config.windowPath + 'ObjectWindow');
		var objectView = new ObjectView();
		objectView.open();
	});
	
	var btnObjectBorder = Ti.UI.createView({
		borderColor:'#ffffff',
		borderWidth:2,
		borderRadius:(Ti.Platform.getOsname() == "android") ? 126 : 62,
		height:126,
		width:126,
		bubbleParent:true,
		zIndex:10,
		center:{x:'50%',y:'50%'}
	});
	areaBtnRight.add(btnObjectBorder);
	
	var btnObjectTitle = Ti.UI.createLabel({
		text:L('add Object','Objekt hinzufügen'),
		center:{x:'50%'},	
		font:{fontFamily:style.specialFontFamily,fontSize:"35sp"},
		color:'#ffffff',
		bottom:"12%"
		
	});
	areaBtnRight.add(btnObjectTitle);

	
	// +++++++++++++++++++++BOTTOM+++++++++++++++++++++
	var areaBottom = Ti.UI.createView({
		bottom:0,
		right:0,
		height:"25%"
	});
	self.add(areaBottom);
	
	var btnLine = Ti.UI.createView({
		width:'15%',
		center:{x:'50%',y:'25%'},
		height:1,
		backgroundColor:'#ffffff'
	});
	areaBottom.add(btnLine);
	
	var btnImpressum = Ti.UI.createView({
		borderRadius:(Ti.Platform.getOsname() == "android") ? 120 : 60,
		height:120,
		width:120,
		backgroundColor:style.whiteTransparentBackground,
		bottom:-60,
		center:{x:'50%'}
	});
	areaBottom.add(btnImpressum);
	
	btnImpressum.addEventListener("singletap", function(){
		// var ImprintView = require(Ti.App.config.windowPath + 'ImprintWindow');
		// var imprintView = new ImprintView();
		// imprintView.open();
	});
	
	var btnImpressumTitle = Ti.UI.createLabel({
		text:L('Impressum','Impressum'),
		center:{x:'50%'},	
		font:{fontFamily:style.specialFontFamily,fontSize:"30sp"},
		color:'#ffffff',
		bottom:2
	});
	areaBottom.add(btnImpressumTitle);
	return self;
};

module.exports = StartView;