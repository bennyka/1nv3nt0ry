Ti.include("/lib/styles.js");
Ti.include("/lib/toolbar.js");
Ti.include("/lib/createButton.js");
function ObjectView() {
	var self = Ti.UI.createView({
		width: Ti.App.Properties.getList('winDimensions')[0],
		height: Ti.App.Properties.getList('winDimensions')[1],
		backgroundColor:backgroundStyle.backgroundColor
	});
	if (Ti.Platform.getOsname() != "android"){
		var btnBack = createButton({
			title:L('back'),
		});
		btnBack.addEventListener("click", function(){
			self.fireEvent("shouldCloseView");
		});
	}
	
	var btnSave = createButton({
		title:L('save'),
	});
	btnSave.addEventListener("click", function(){
		//save & go back
		
		self.fireEvent("shouldCloseView");
	});
	
	var toolbar = createToolbar({
		title:L('createObjectHeadline'),
		leftNavButton:(Ti.Platform.getOsname() != "android") ? [btnBack] : [],
		rightNavButton:[btnSave]
	});
	self.add(toolbar);
	var inputField = [
		{
			id:"name",
			width:'40%',
			type:'textfield',
			hintText:L('name')+"..."
		},
		{
			id:"brand",
			width:'40%',
			type:'textfield',
			hintText:L('brand')+"...",
			brandList:[
				"Sony",
				"LG",
				"Samsung",
				"Apple"			
			]
		},
		{
			id:"category",
			width:200,
			type:'textfield',
			hintText:L('category')+"..."
		},
		{
			id:"serial",
			width:200,
			type:'textfield',
			hintText:L('serial')+"..."
		},
		{
			id:"invoice",
			width:200,
			type:'button',
			title:L('addInvoice')
		}
	];
	for (i in inputField){
		switch(inputField[i].type){
			case "textfield":
				// create standard textfield
				var textfield = Ti.UI.createTextField({
					top:(toolbar.height + 20) + (20 + 50)*i,
					height:35,
					left:10,
					width:inputField[i].width,
					paddingLeft:4,
					paddingRight:4,
					borderRadius:3,
					borderColor:'#ffffff',
					borderWidth:1,
					id:inputField[i].id,
					hintText:inputField[i].hintText,
					color: '#ffffff',
					font: {fontFamily: 'Helvetica Neue', fontSize:15}		
				});
				self.add(textfield);
				
				textfield.addEventListener("change", function(){
					// save the inputtext
				});
				break;
			case "dropdown":
				// create picker of dropdown menu
				break;
			case "button":
				// create button
				var button = createButton({
					title:inputField[i].title,
					top:(toolbar.height + 20) + (20 + 50)*i,
					height:35,
					left:10,
					width:inputField[i].width,
					borderColor:'#ffffff',
					borderWidth:1,
					id:inputField[i].id
				});
				self.add(button);
				
				button.addEventListener("click", addPhoto);
				break;
		}
	}
	
	var imagePreview = Ti.UI.createView({
		top: toolbar.height + 20,
		right:10,
		width:self.width/2.5,
		height:self.width/2.5,
		borderColor:'#ffffff',
		borderWidth:1,
	});
	self.add(imagePreview);
	
	imagePreview.addEventListener("singletap", addPhoto);
	
	// functions
	/*
	 * addPhoto
	 * shows dialog to choose a source of the images
	 * camera or library
	 */
	function addPhoto () {		
		var options = Ti.UI.createAlertDialog({
			title:L('chooseImageSource','Bitte Bildquelle auswählen'),
			buttonNames: [L('Library', 'Bibliothek'), L('Camera', 'Kamera'), L('Cancel','Abbrechen')]
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
							addImage(event.media);
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
							addImage(event.media);
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
							addImage(event.media);
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
							addImage(event.media);
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
	
	function addImage(image) {
		if (!image.height || !image.width){
			var alert = Ti.UI.createAlertDialog({
				message:'Das Bild konnte leider nicht importiert werden.',
				buttonNames:['Ok']
			}).show();
			return;
		}
		
		var file = Titanium.Filesystem.getFile(Titanium.Filesystem.getApplicationDataDirectory(), data.id + '_' + data.photoCount + '.png');
		file.write(image);		
		imagePreview.image = file;
		
		image = null;
		file = null;
	}
	
	return self;
};

module.exports = ObjectView;
