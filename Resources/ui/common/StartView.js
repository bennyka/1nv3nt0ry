Ti.include("/lib/toolbar.js");
Ti.include("/lib/createButton.js");
Ti.include("/lib/styles.js");
function StartView() {
	
	var self = Ti.UI.createView({
		width: Ti.App.Properties.getList('winDimensions')[0],
		height: Ti.App.Properties.getList('winDimensions')[1],
		backgroundColor:backgroundStyle.backgroundColor
	});
	var toolbar = createToolbar({
		title:Ti.App.name,
	});
	self.add(toolbar);
	
	// inventory area
	var btnInventoryHeadline = Ti.UI.createLabel({
		text:L('inventory'),
		top:self.height/3,
		width:128,	
		height:30,
		left:10,
		font: {fontFamily: 'Helvetica Neue', fontWeight:'bold',fontSize:"15dp"},
		textAlign:'center',
		color:'#ffffff'
	});
	self.add(btnInventoryHeadline);
	
	var btnInventory = createButton({
		backgroundImage:"/images/inventory.png",	
		height:128,
		width:128,
		left:10,
		top:btnInventoryHeadline.top + btnInventoryHeadline.height
	});
	self.add(btnInventory);
	
	// create Object area
	var btnObjectHeadline = Ti.UI.createLabel({
		text:L('createObject'),
		top:(self.height/3)-25,
		width:128,	
		height:50,
		right:10,
		font: {fontFamily: 'Helvetica Neue', fontWeight:'bold',fontSize:"15dp"},
		textAlign:'center',
		color:'#ffffff'
	});
	self.add(btnObjectHeadline);
	
	var btnObject = createButton({
		backgroundImage:"/images/object.png",	
		height:128,
		width:128,
		right:10,
		top:btnObjectHeadline.top + btnObjectHeadline.height
	});
	self.add(btnObject);
	
	btnObject.addEventListener("click", function(){
		var ObjectWindow = require(Ti.App.config.windowPath + 'ObjectWindow');
		var winViewer = new ObjectWindow();
		winViewer.open();
	});
	
	var btnImprint = createButton({
		title:L('imprint'),
		left:0,
		right:0,
		bottom:20,
		font: {fontFamily: 'Helvetica Neue', fontWeight:'bold',fontSize:"15dp"}
	});
	self.add(btnImprint);
	return self;
};

module.exports = StartView;