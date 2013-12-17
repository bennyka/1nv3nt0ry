Ti.include("/lib/toolbar.js");
Ti.include("/lib/createButton.js");
Ti.include("/lib/styles.js");
function StartView() {
	
	var self = Ti.UI.createView({
		backgroundColor:backgroundStyle.backgroundColor
	});
	
	// ++++++++++++++TOP++++++++++++++
	var areaTop= Ti.UI.createView({
		top:0,
		left:0,
		height:"25%",
		borderColor:'red',
		borderWidth:2
	});
	self.add(areaTop);
	
	var headline = Ti.UI.createLabel({
		text:Ti.App.name,
		center:{x:'50%',y:'50%'},
		font: {fontFamily: Ti.App.config.fontFamily, fontWeight:'bold',fontSize:"20dp"},
		color:'#ffffff'
	});
	areaTop.add(headline);
	
	var areaBtnLeft = Ti.UI.createView({
		top:"25%",
		left:0,
		height:"50%",
		width:"50%",
		borderColor:'red',
		borderWidth:2
	});
	self.add(areaBtnLeft);
	
	var areaBtnRight = Ti.UI.createView({
		top:"25%",
		right:0,
		height:"50%",
		width:"50%",
		borderColor:'red',
		borderWidth:2
	});
	self.add(areaBtnRight);
	
	var areaBottom = Ti.UI.createView({
		bottom:0,
		right:0,
		height:"25%",
		borderColor:'red',
		borderWidth:2
	});
	self.add(areaBottom);
	//
	// inventory area
	// var btnInventoryHeadline = Ti.UI.createLabel({
		// text:L('inventory','Inventar'),
		// top:self.height/3,
		// width:128,	
		// height:30,
		// left:10,
		// font: {fontFamily: 'Helvetica Neue', fontWeight:'bold',fontSize:"15dp"},
		// textAlign:'center',
		// color:'#ffffff'
	// });
	// self.add(btnInventoryHeadline);
// 	
	// var btnInventory = Ti.UI.createView({
		// backgroundColor:'#000000',
		// borderRadius:50,
		// height:100,
		// width:100,
		// center:{x:'25%'},
		// top:btnInventoryHeadline.top + btnInventoryHeadline.height
	// });
	// self.add(btnInventory);
// 	
	// // create Object area
	// var btnObjectHeadline = Ti.UI.createLabel({
		// text:L('addObject','Hinzufügen'),
		// top:(self.height/3)-25,
		// width:128,	
		// height:50,
		// right:10,
		// font: {fontFamily: 'Helvetica Neue', fontWeight:'bold',fontSize:"15dp"},
		// textAlign:'center',
		// color:'#ffffff'
	// });
	// self.add(btnObjectHeadline);
// 	
	// var btnObject = createButton({
		// backgroundColor:'#ffffff',
		// borderRadius:50,
		// height:100,
		// width:100,
		// center:{x:'75%'},
		// top:btnObjectHeadline.top + btnObjectHeadline.height
	// });
	// self.add(btnObject);
// 	
	// btnObject.addEventListener("click", function(){
		// var ObjectWindow = require(Ti.App.config.windowPath + 'ObjectWindow');
		// var winViewer = new ObjectWindow();
		// winViewer.open();
	// });
// 	
	// var btnImprint = createButton({
		// title:L('imprint'),
		// left:0,
		// right:0,
		// bottom:20,
		// font: {fontFamily: 'Helvetica Neue', fontWeight:'bold',fontSize:"15dp"}
	// });
	// self.add(btnImprint);
	return self;
};

module.exports = StartView;