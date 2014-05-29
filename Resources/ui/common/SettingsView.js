
function SettingsView() {
	var self = Ti.UI.createView({
		backgroundGradient:style.backgroundGradient
	});
// 	
	// // ++++++++++++++TOP++++++++++++++
	var areaTop= Ti.UI.createView({
		top:0,
		left:0,
		height:"20%"
	});
	self.add(areaTop);
	
	if (Ti.Platform.getOsname() != "android"){
		var btnBack = Ti.UI.createButton({
			title:' '+L('back')+' ',
			top:25,
			left:10,
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
		text:L('settings'),
		center:{x:'50%',y:'60%'},
		font: {fontFamily: style.specialFontFamily, fontSize:"60sp"},
		color:'#ffffff'
	});
	areaTop.add(headline);
	
	// ++++++++++++++BOTTOM++++++++++++++
	var areaBottom = Ti.UI.createView({
		top:"25%",
		left:0,
		height:"50%",
		layout:'horizontal',
		backgroundColor:style.whiteTransparentBackground
	});
	self.add(areaBottom);
	// add info switch
	switcher = [
		{
			text:L('showInfoIcon'),
			status: (Ti.App.Properties.hasProperty("showInfo")) ? Ti.App.Properties.getBool("showInfo") : true,
			property:"showInfo"
		},
		{
			text:L('handleInputFields'),
			status: null,
			property:null
		},
		{
			text:L('ObjectStatus'),
			status: (Ti.App.Properties.hasProperty("objectStatus")) ? Ti.App.Properties.getBool("objectStatus") : false,
			property:"objectStatus"
		},
		{
			text:L('ObjectPrice'),
			status: (Ti.App.Properties.hasProperty("objectPrice")) ? Ti.App.Properties.getBool("objectPrice") : false,
			property:"objectPrice"
		},
	];
	for (i in switcher){
		var bg = Ti.UI.createView({
			top:15,
			width:Ti.UI.FILL,
			height:Ti.UI.SIZE
		});
		areaBottom.add(bg);
		
		var infoLabel = Ti.UI.createLabel({
			text:switcher[i].text,
			height:'auto',
			width:'auto',
			left:10,
			color:'#ffffff'
		});
		bg.add(infoLabel);
		if (switcher[i].property){
			var infoSwitch = Ti.UI.createSwitch({
				value:switcher[i].status,
				right:30,
				property:switcher[i].property,
			});
			bg.add(infoSwitch);
			
			infoSwitch.addEventListener('change',function(e){
				Ti.App.Properties.setBool(e.source.property, e.value);			
			});
		}
	};
	
	
	var btnImprint = Ti.UI.createView({
		top:15,
		center:{x:'50%'},
		right:5,
		width:Ti.UI.SIZE,
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
		text: ' '+L('imprint')+' ',
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

	Ti.include(Ti.Filesystem.getResourcesDirectory()+'/lib/getDeviceInformation.js');	
	
	return self;
};

module.exports = SettingsView;
