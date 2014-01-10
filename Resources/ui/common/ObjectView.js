Ti.include("/lib/styles.js");
Ti.include("/lib/dataHandler.js");
// var ImageFactory = require('fh.imagefactory');	


function ObjectView(data) {
	var editMode = false;
	if (data){
		editMode = true;
	}
	var objData = {};
	if (!editMode){
		// set date
		var currentdate = new Date();
		var date = (currentdate.getDate() < 10) ? "0"+currentdate.getDate() : currentdate.getDate();
		var month = ((currentdate.getMonth()+1) < 10) ? "0"+(currentdate.getMonth()+1) : (currentdate.getMonth()+1);
		objData.date = date+"."+month+"."+currentdate.getFullYear(); 
		// set id
		var timestamp = new Date().getTime();
		objData.id = timestamp;
	}
	var self = Ti.UI.createScrollView({
		backgroundGradient:style.backgroundGradient,
		contentHeight:'auto'
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

	var btnSave = Ti.UI.createView({
		top:15,
		right:10,
		width:65,
		height:35,
		borderColor:'#ffffff',
		borderWidth:1,
		borderRadius:5,
		color:'#ffffff',
		backgroundImage:'transparent',
		zIndex:10
	});
	
	var btnSaveTitle = Ti.UI.createLabel({
		text: 'save',
		touchEnabled:false,
		center:{x:'50%',y:'50%'}
	});
	btnSave.add(btnSaveTitle);
	btnSave.addEventListener("click", function(){
		if (!objData || !objData.description){
			var dialog = Ti.UI.createAlertDialog({
				title:'Hinweis',
				message:'Bitte geben Sie eine Bezeichnung ein',
				ok: 'Okay'
			});
			dialog.show();
			return;
		}
		if (editMode){
			updateData(data);
		} else {
			saveData(objData);
		};
		self.fireEvent("shouldCloseView");
	});
	areaTop.add(btnSave);
	
	var headline = Ti.UI.createLabel({
		text:L('add Object','Objekt hinzufügen'),
		center:{x:'50%',y:'50%'},
		font: {fontFamily: style.specialFontFamily, fontSize:"40sp"},
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
			title:L('Serial','Seriennummer')
		},
		{
			id:"category",
			width:'55%',
			type:'textfield',
			hintText:L('Category','Kategorie')+"...",
			title:L('Category','Kategorie')
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
			]
		},
		{
			id:"description",
			width:'80%',
			type:'textfield',
			hintText:L('Bezeichnung','Bezeichnung')+"...",
			title:L('Bezeichnung','Bezeichnung')
		},
	];

	for (i in inputField){
		switch(inputField[i].type){
			case "textfield":
				// create standard textfield
				var textfield = Ti.UI.createTextField({
					bottom:(20 + (50*i)),
					left:"10%",
					width:inputField[i].width,
					paddingLeft:4,
					paddingRight:4,
					borderColor:'#ffffff',
					borderWidth:1,
					id:inputField[i].id,
					hintText:inputField[i].hintText,
					color: '#ffffff',
					font: {fontFamily: 'Helvetica Neue', fontSize:"13sp", color:'#000000'}		
				});
				areaBottom.add(textfield);
				setTimeout(function(){
					textfield.blur();
				},200);
				textfield.addEventListener("blur", function(e){
					switch(e.source.id){
						case 'serial':
							objData.serial = (e.value) ? e.value : null;
							break;
						case 'brand':
							objData.brand = (e.value) ? e.value : null;
							break;
						case 'description':
							objData.description = (e.value) ? e.value : null;
							break;
						case 'category':
							objData.category = (e.value) ? e.value : null;
							break;
					};
				});
				
				if (editMode) {
					switch(inputField[i].id){
						case 'serial':
							textfield.value = data.serial;
							break;
						case 'brand':
							textfield.value = data.brand;
							break;
						case 'description':
							textfield.value = data.description;
							break;
						case 'category':
							textfield.value = data.category;
							break;
					}
				}
				
				var textfieldTitle = Ti.UI.createLabel({
					text:inputField[i].title,
					bottom:(37 + (50*i)),
					width:100,
					left:"10%",
					visible:(Ti.Platform.getOsname() != "android") ? true : false,
					color: '#ffffff',
					font: {fontFamily: 'Helvetica Neue', fontSize:"12sp", color:'#000000'}			
				});
				areaBottom.add(textfieldTitle);
				
				break;
		}
	}
	// ++++++++++++++IMG CONTAINER++++++++++++++
	
	var invoiceContainer = Ti.UI.createView({
		backgroundImage:'/images/invoice.png',
		width:64,
		height:120,
		bottom:20,
		right:'11%',
		type:"invoice"
	});
	areaBottom.add(invoiceContainer);
	invoiceContainer.addEventListener("singletap", addPhoto);
	
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
		text:L('Invoice upload','Rechnung einfügen'),
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
		image:(editMode) ? data.imagePath : null,
		backgroundColor:style.whiteTransparentBackground,
		borderRadius:(Ti.Platform.getOsname() == "android") ? 100 : 50,
		width:100,
		height:100,
		center:{x:'50%',y:'50%'},
		type:"object"
	});
	imageContainer.add(imagePreview);
	imagePreview.addEventListener("singletap", addPhoto);
	
	var imagePreviewBorder = Ti.UI.createView({
		borderRadius:(Ti.Platform.getOsname() == "android") ? 130 : 65,
		borderWidth:3,
		borderColor:'#ffffff',
		width:130,
		height:130,
		touchEnabled:false,
		center:{x:'50%',y:'50%'}
	});
	imageContainer.add(imagePreviewBorder);
	
	var addIcon = Titanium.UI.createButton({
		top:5,
		right:0,
		height:35,
		width:35,
		title: '\u002B',
		backgroundColor:'transparent',
		style: Titanium.UI.iPhone.SystemButtonStyle.PLAIN,
		color: '#ffffff',
		selectedColor: '#994c616e',
		font: {fontFamily: style.iconFontFamily, fontSize: '20sp'},
	});
	imageContainer.add(addIcon);
	addIcon.addEventListener("singletap", addPhoto);	
	
	// ++++++++++++++FUNCTIONS++++++++++++++
	/*
	 * addPhoto
	 * shows dialog to choose a source of the images
	 * camera or library
	 */
	function addPhoto (e) {	
		var options = Ti.UI.createAlertDialog({
			title:(e.source.type == "invoice") ? L('chooseImageSource','Bitte Bildquelle für die Rechnung auswählen') : L('chooseImageSource','Bitte Bildquelle auswählen'),
			buttonNames: [L('Library', 'Bibliothek'), L('Camera', 'Kamera'), L('Cancel','Abbrechen')],
			type:e.source.type
		});
		options.show();
		options.addEventListener("click", addPhotoDialogHandler);
	}
	
	function addPhotoDialogHandler (e) {
		var win = Titanium.UI.createWindow({
			orientationModes: [Titanium.UI.LANDSCAPE_LEFT, Titanium.UI.LANDSCAPE_RIGHT, Titanium.UI.PORTRAIT]
		});
		var dummyView = Titanium.UI.createView({
			left: 130,
			bottom: 200
		});
		win.add(dummyView);
		win.addEventListener("open", function() {
		win.orientationModes = [Titanium.UI.PORTRAIT];//[Titanium.UI.LANDSCAPE_LEFT, Titanium.UI.LANDSCAPE_RIGHT, Titanium.UI.PORTRAIT];
			switch (e.index) {
				case 1:
				if (Ti.Platform.osname != "android"){
					Ti.Media.showCamera({
						success : function(event) {
							var obj = {
								image:event.media,
								type:e.source.type
							};
							addImage(obj);
							win.close();
						},
						cancel: function () {
							win.close();
						},
						error: function () {
							win.close();
						},
						saveToPhotoGallery : false,
//						allowEditing : true,
						mediaTypes : [Ti.Media.MEDIA_TYPE_PHOTO],
					});
				} else {
					Ti.Media.showCamera({
						success : function(event) {
							var obj = {
								image:event.media,
								type:e.source.type
							};
							addImage(obj);
							win.close();
						},
						cancel: function () {
							win.close();
						},
						error: function () {
							win.close();
						}
					});
				};
					break;
	
				case 0:
				if (Ti.Platform.osname != "android"){
					Ti.Media.openPhotoGallery({
						success : function(event) {
							var obj = {
								image:event.media,
								type:e.source.type
							};
							addImage(obj);
							win.close();
						},
						cancel: function () {
							win.close();
						},
						error: function () {
							win.close();
						},
						allowEditing : true,
						mediaTypes : [Ti.Media.MEDIA_TYPE_PHOTO]
					});
				} else {
					Ti.Media.openPhotoGallery({
						success : function(event) {
							var obj = {
								image:event.media,
								type:e.source.type
							};
							addImage(obj);
							win.close();
						},
						cancel: function () {
							win.close();
						},
						error: function () {
							win.close();
						}
					});
				};
					
					break;
				case 2:
					win.close();
					break;
				default:
					win.close();
			}
		});
		win.open();
	}
	
	function addImage(obj) {
		//@TODO: check if image has height and width
		if (obj.type == "invoice"){
			invoiceFlag.title = '\uE207';
			objData.imageInvoice = obj.image;	
		} else {
			imagePreview.image = obj.image;
			objData.image = obj.image;
		}
		obj.image = null;
		obj.file = null;
	}

	return self;
};

module.exports = ObjectView;
