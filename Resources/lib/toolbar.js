Ti.include("styles.js");
function createToolbar(params){
	
	// read properties from obj object
	var title = params.title || Ti.App.name;

	// create toolbar as view
	var self = Ti.UI.createView({
		top:0,
		left:0,
		right:0,
		height:50,
		width:'100%',
		backgroundColor:{type: "linear", colors: ['#80ffffff', '#60ffffff', '#00ffffff'], startPoint:{x:0,y:0}, endPoint:{x:0,y:'100%'}, backFillStart:false}
	});
	
	var title = Titanium.UI.createLabel({
		text: title,
	    shadowColor: '#000000',
	    shadowOffset: {x: 0, y: -1},
	    color: '#ffffff',
		font: {fontFamily: 'Helvetica Neue', fontWeight:'bold', fontSize:"18dp"},
	    textAlign: 'center',
	    height:50
	});
	self.add(title);
	
	if ( params.leftNavButton ) {
		var leftNavView = Titanium.UI.createView({
			left: 5,
			center: {y: '50%'},
			height: Ti.UI.SIZE,
			width: Ti.UI.SIZE,
			layout: "horizontal"
		});
		self.add(leftNavView);
		for ( var i in params.leftNavButton ) {
			leftNavView.add(params.leftNavButton[i]);
		}
	}
	
	if ( params.rightNavButton ) {
		var rightNavView = Titanium.UI.createView({
			right: 5,
			center: {y: '50%'},
			height: Ti.UI.SIZE,
			width: Ti.UI.SIZE,
			layout: "horizontal"
		});
		self.add(rightNavView);
		for ( var i in params.rightNavButton ) {
			rightNavView.add(params.rightNavButton[i]);
		}
	}
	var shadow = Ti.UI.createView({
		width:'100%',
		bottom:0,
		height:1,
		backgroundColor:'#ffffff',
	});
	self.add(shadow);
	return self;
}
