
function createButton(params){
	// create Button object
	var btn = Ti.UI.createButton({
		title:(params.title) ? "  "+params.title+"  " : "",
		top: params.top || undefined,
		bottom: params.bottom || undefined,
		left: params.left || undefined,
		right: params.right || undefined,
		width: params.width || 'auto',
		height:params.height || 30,
		center:params.center || null,
		shadowColor: '#000000',
		backgroundImage: params.backgroundImage || undefined,
	    shadowOffset: {x: 0, y: -1},
	    color: '#ffffff',
	    borderRadius:3,
	    borderWidth: (params.backgroundImage) ? 0 : 1,
		font: {fontFamily: 'Helvetica Neue', fontWeight:'bold', fontSize:18},
		borderColor:'#E6E6E6',
		style:(Ti.Platform.getOsname() == "android") ? null : Titanium.UI.iPhone.SystemButtonStyle.PLAIN,
	});
	
	// create click Effect
	btn.addEventListener("touchstart", function(e){
		e.source.color = '#424242';
	});
	btn.addEventListener("touchend", function(e){
		e.source.color = '#ffffff';
	});
	
	return btn;
};
