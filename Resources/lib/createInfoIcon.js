
function createInfoIcon(data){
	if (Ti.App.showInfo){
		var btnInfo = Ti.UI.createButton({
			top:(data.top) ? data.top : null,
			left:(data.left) ? data.left : null,
			bottom:(data.bottom) ? data.bottom : null,
			right:(data.right) ? data.right : null,
			title: '\uE196',
			backgroundColor:'transparent',
			style: Titanium.UI.iPhone.SystemButtonStyle.PLAIN,
			color: '#ffffff',
			selectedColor: '#994c616e',
			font: {fontFamily: style.iconFontFamily, fontSize: '18sp'},
		});
		data.win.add(btnInfo);
		var textBackground = Ti.UI.createView({
			backgroundColor:'#99000000',
			width:Ti.UI.SIZE,
			height:Ti.UI.SIZE,
			top:(data.top) ? data.top : null,
			bottom:(data.bottom) ? data.bottom : null,
			right: (data.right) ? data.right : null,
			left: (data.left) ? data.left : null,
			visible:false,
			borderRadius:5
		});
		data.win.add(textBackground);
		
		var text = Ti.UI.createLabel({
			text:data.text,
			top:5,
			left:5,
			right:5,
			bottom:5,
			height:Ti.UI.SIZE,
			width:Ti.UI.SIZE,
			color:'#ffffff',
			font: {fontSize: '15sp'}
		});
		textBackground.add(text);
		
		btnInfo.addEventListener("click", function(){
			textBackground.visible = !text.visible;
		});
		
		textBackground.addEventListener("click", function(){
			textBackground.visible = false;
		});
	}
};

/*
 * data.top
 * data.left
 * data.right
 * data.bottom
 * data.text,
 * data.win
 */