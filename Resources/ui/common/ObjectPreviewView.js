Ti.include("/lib/styles.js");
Ti.include("/lib/dataHandler.js");

function ObjectPreviewView(data) {

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
	
	if (Ti.Platform.getOsname() != "android"){
		var btnBack = Ti.UI.createButton({
			title:L(' back ',' zurück '),
			top:20,
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
	
	var btnEdit = Ti.UI.createView({
		top:20,
		right:10,
		width:90,
		height:30,
		borderColor:'#ffffff',
		borderWidth:1,
		borderRadius:5,
		color:'#ffffff',
		backgroundImage:'transparent',
		zIndex:10
	});
	areaTop.add(btnEdit);
	
	var btnEditTitle = Ti.UI.createLabel({
		text: L('edit','bearbeiten'),
		touchEnabled:false,
		color:'#ffffff',
		center:{x:'50%',y:'50%'}
	});
	btnEdit.add(btnEditTitle);
	
	btnEdit.addEventListener("click", function(e){
		var ObjectView = require(Ti.App.config.windowPath + 'ObjectWindow');
		var objectView = new ObjectView(data);
		objectView.open();
	});
	
	var headline = Ti.UI.createLabel({
		text:" "+data.description+" ",
		center:{x:'50%',y:'60%'},
		font: {fontFamily: style.specialFontFamily, fontSize:"50sp"},
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
	var inputField = [
		{
			id:"serial",
			width:'55%',
			type:'textfield',
			hintText:L('Serial','Seriennummer')+"...",
			title:L('Serial','Seriennummer'),
			value:data.serial
		},
		{
			id:"category",
			width:'55%',
			type:'textfield',
			hintText:L('Category','Kategorie')+"...",
			title:L('Category','Kategorie'),
			value:data.category
		},
		{
			id:"brand",
			width:'55%',
			type:'textfield',
			hintText:L('Brand','Marke')+"...",
			title:L('Brand','Marke'),
			brandList:[
				"Sony",
				"LG",
				"Samsung",
				"Apple"			
			],
			value:data.brand
		},
		{
			id:"description",
			width:'80%',
			type:'textfield',
			hintText:L('Bezeichnung','Bezeichnung')+"...",
			title:L('Bezeichnung','Bezeichnung'),
			value:data.description
		},
	];

	for (i in inputField){
		switch(inputField[i].type){
			case "textfield":
				// create standard textfield
				var textfield = Ti.UI.createLabel({
					text:inputField[i].value,
					bottom:(20 + (50*i)),
					left:"10%",
					width:'auto',
					id:inputField[i].id,
					color: '#ffffff',
					font: {fontFamily: 'Helvetica Neue', fontSize:"15sp", color:'#000000'}		
				});
				areaBottom.add(textfield);
				
				var textfieldTitle = Ti.UI.createLabel({
					text:inputField[i].title,
					bottom:(37 + (50*i)),
					width:'auto',
					left:"10%",
					color: '#ffffff',
					font: {fontFamily: 'Helvetica Neue', fontSize:"17sp", color:'#000000'}			
				});
				areaBottom.add(textfieldTitle);
				
				break;
		}
	}
	// ++++++++++++++IMG CONTAINER++++++++++++++

	var invoiceContainer = Ti.UI.createImageView({
		image:(data.imgInvoice) ? data.imgInvoice : '/images/invoice.png',
		width:96,
		height:180,
		bottom:20,
		right:'11%',
		type:"invoice"
	});
	areaBottom.add(invoiceContainer);
	
	var invoiceFlag = Ti.UI.createButton({
		center:{x:'50%',y:'50%'},
		title: '\u002B',
		width:Ti.UI.FILL,
		height:Ti.UI.FILL,
		touchEnabled:false,
		backgroundColor:'#36000000',
		style: Titanium.UI.iPhone.SystemButtonStyle.PLAIN,
		color: '#ffffff',
		selectedColor: '#994c616e',
		font: {fontFamily: style.iconFontFamily, fontSize: '23sp'}
	});
	invoiceContainer.add(invoiceFlag);
	
	// invoice label
	var transform = Ti.UI.create2DMatrix();
	transform = transform.rotate(90);
	var rotate = Titanium.UI.createAnimation();
	rotate.transform = transform;
	
	var invoiceLabel = Ti.UI.createLabel({
		text:L('Invoice','Rechnung'),
		font: {fontSize: '12sp'}
	}).toImage();
	
	var invoiceImg = Ti.UI.createImageView({
		image:invoiceLabel,
		right:-80,
		bottom:120,
		visible:false
	});
	
	areaBottom.add(invoiceImg);
	
	invoiceImg.animate(rotate);
	invoiceImg.visible = true;
	// ++++++++++++++IMG CONTAINER++++++++++++++
	var imageContainer = Ti.UI.createView({
		height:170,
		width:170,
		top:0,
		center:{x:'50%'}
	});
	areaBottom.add(imageContainer);

	var imagePreview = Ti.UI.createImageView({
		image:data.imgObject,
		backgroundColor:style.whiteTransparentBackground,
		borderRadius:(Ti.Platform.getOsname() == "android") ? 120 : 60,
		width:120,
		height:120,
		center:{x:'50%',y:'50%'},
		type:"object"
	});
	imageContainer.add(imagePreview);
	
	var imagePreviewBorder = Ti.UI.createView({
		borderRadius:(Ti.Platform.getOsname() == "android") ? 140 : 70,
		borderWidth:3,
		borderColor:'#ffffff',
		width:140,
		height:140,
		touchEnabled:false,
		center:{x:'50%',y:'50%'}
	});
	imageContainer.add(imagePreviewBorder);	
	
	return self;
};

module.exports = ObjectPreviewView;
