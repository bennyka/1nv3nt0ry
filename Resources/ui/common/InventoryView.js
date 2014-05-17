Ti.include("/lib/dataHandler.js");
Ti.include("/lib/email.js");
function InventoryView() {
	var self = Ti.UI.createView({
		backgroundGradient:style.backgroundGradient,
		layout:'vertical'
	});
	
	// ++++++++++++++TOP++++++++++++++
	var areaTop= Ti.UI.createView({
		top:0,
		left:0,
		height:"17%"
	});
	self.add(areaTop);
	
	if (Ti.Platform.getOsname() != "android"){
		var btnBack = Ti.UI.createButton({
			title:L('back'),
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
	if (Ti.Platform.getOsname() == "android"){
		var btnExport = Ti.UI.createView({
			top:20,
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
		
		var btnExportTitle = Ti.UI.createLabel({
			text: " "+L('export')+" ",
			touchEnabled:false,
			color:'#ffffff',
			center:{x:'50%',y:'50%'}
		});
		btnExport.add(btnExportTitle);
	} else {
		var btnExport = Ti.UI.createButton({
			title:L('export'),
			top:25,
			right:5,
			color:'#ffffff',
			borderColor:'#ffffff',
			borderWidth:1,
			borderRadius:5
		});
	}
	areaTop.add(btnExport);
	
	btnExport.addEventListener("click", function(e){
		var csvFile = exportAll();

		var email = Ti.UI.createEmailDialog({
			subject:Ti.App.name+': Mein Inventar'
		});
		
		email.addAttachment(csvFile);
		email.toRecipients = ['benny90.ka@gmail.com'];
		email.open();
	});
	
	
	var headline = Ti.UI.createLabel({
		text:L('inventory'),
		center:{x:'50%',y:'50%'},
		font: {fontFamily: style.specialFontFamily, fontSize:"60sp"},
		color:'#ffffff'
	});
	areaTop.add(headline);
	
	// +++++++++ SEARCH ++++++++	
	var searchView = Ti.UI.createView({
		height:Ti.UI.SIZE,
		width: Ti.UI.SIZE
	});
	self.add(searchView);
	
	var searchBar = Ti.UI.createTextField({
		width:(Ti.Platform.getOsname() == "android") ? '90%' : Ti.UI.FILL,
		left:(Ti.Platform.getOsname() == "android") ? '1%' : undefined,
		backgroundColor:'#20ffffff',
		hintText:'Suche...',
		paddingLeft:10,
		paddingRight:35,
		autocorrect:false,
		color:'#ffffff'
	});
	searchView.add(searchBar);
	
	if (Ti.Platform.getOsname() == "android"){
		setTimeout(function(){
			searchBar.blur();
		},250);
	}
	
	searchBar.addEventListener('focus', function(e){
		e.source.setValue('');
	});
	
	searchBar.addEventListener('return', function(e){
		listSearch(e.source.getValue());
	});
	
	searchBar.addEventListener('change', function(e){
		listSearch(e.source.getValue());
	});
	
	var btnSearch = Ti.UI.createButton({
		right:6,
		title: '\uE028',
		backgroundColor:'transparent',
		style: Titanium.UI.iPhone.SystemButtonStyle.PLAIN,
		color: '#ffffff',
		selectedColor: '#994c616e',
		font: {fontFamily: style.iconFontFamily, fontSize: '13sp'},
	});
	if (Ti.Platform.getOsname() == "android"){
		searchView.add(btnSearch);
	} else {
		searchBar.add(btnSearch);
	};
	
	btnSearch.addEventListener('click', function(){
		var keyword = searchBar.getValue();
		if (!keyword){
			searchBar.focus();
		} else {
			listSearch(keyword);
		};
	});
	
	// +++++++++ LIST ++++++++	
	var inventoryList = Ti.UI.createScrollView({
		layout:'vertical',
		top:3,
		bottom:'30'
	});
	self.add(inventoryList);
	// ++++++++++++++++++++++++++++ FUNCTIONS ++++++++++++++++++++++++++++
	
	// ++++++++++++++REST OF PAGE++++++++++++++
	function createInventoryEntry(entry){
		var keywordString = String(entry.description+', '+entry.date+', '+entry.category+', '+entry.brand).toLowerCase();
		var objectContainer = Ti.UI.createView({
			height:150,
			visible:true,
			removed:false,
			keywordString:keywordString
		});
		
		// ++++++++++++++entryName & entryDate++++++++++++++
		var background1 = Ti.UI.createView({
			top:0,
			height:40,
			backgroundColor:'#20ffffff'
		});
		objectContainer.add(background1);
		
		background1.addEventListener("click", function(){
			var ObjectPreviewView = require(Ti.App.config.windowPath + 'ObjectPreviewWindow');
			var objectPreviewView = new ObjectPreviewView(entry);
			objectPreviewView.open();
		});
		
		var entryName = Ti.UI.createLabel({
			top:2,
			height:Ti.UI.SIZE,
			left:"40%",
			text:entry.description,
			color:'#ffffff',
			font:{fontWeight:'bold'},
			touchEnabled:false
		});
		background1.add(entryName);
		
		var entryCreationDate = Ti.UI.createLabel({
			bottom:entryName.top,
			height:Ti.UI.SIZE,
			left:"40%",
			text:L('createdAt')+entry.date,
			color:'#ffffff',
			font:{fontSize:'12sp'},
			touchEnabled:false
		});
		background1.add(entryCreationDate);
		
		// ++++++++++++++category & brand++++++++++++++
		var background2 = Ti.UI.createView({
			top:40,
			height:40,
			backgroundColor:'#33ffffff'
		});
		objectContainer.add(background2);
		
		background2.addEventListener("click", function(){
			var ObjectPreviewView = require(Ti.App.config.windowPath + 'ObjectPreviewWindow');
			var objectPreviewView = new ObjectPreviewView(entry);
			objectPreviewView.open();
		});
		
		var entryCategory = Ti.UI.createLabel({
			top:4,
			height:Ti.UI.SIZE,
			left:"40%",
			text:L('inventoryCategory')+entry.category,
			color:'#ffffff',
			font:{fontSize:'10sp'},
			touchEnabled:false
		});
		background2.add(entryCategory);
		
		var entryBrand = Ti.UI.createLabel({
			bottom:entryCategory.top,
			height:Ti.UI.SIZE,
			left:"40%",
			text:L('inventoryBrand')+entry.brand,
			color:'#ffffff',
			font:{fontSize:'10sp'},
			touchEnabled:false
		});
		background2.add(entryBrand);
		// ++++++++++++++Bild++++++++++++++
		Ti.API.error("image",entry.imgObject);
		var entryImage = Ti.UI.createImageView({
			top:8,
			left:18,
			borderColor:'#ffffff',
			borderRadius:(Ti.Platform.getOsname() == "android") ? 64 : 32,
			height:64,
			width:64,
			center:{x:'50%',y:'50%'},
			zIndex:100,
			backgroundColor:'#66ffffff',
			image:(entry.imgObject) ? entry.imgObject : null,
			touchEnabled:false
		});
		objectContainer.add(entryImage);

		var entryImageBorder = Ti.UI.createView({
			top:1,
			left:11,
			borderColor:'#ffffff',
			borderWidth:2,
			borderRadius:(Ti.Platform.getOsname() == "android") ? 78 : 39,
			height:78,
			width:78,
			bubbleParent:true,
			zIndex:10,
			center:{x:'50%',y:'50%'},
			touchEnabled:false
		});
		objectContainer.add(entryImageBorder);
		
		// ++++++++++++++buttons++++++++++++++
		var background3 = Ti.UI.createView({
			top:80,
			height:40
		});
		objectContainer.add(background3);
		
		var btnDelete = Ti.UI.createButton({
			left:15,
			title: '\uE208 '+L('delete'),
			backgroundColor:'transparent',
			style: Titanium.UI.iPhone.SystemButtonStyle.PLAIN,
			color: '#ffffff',
			selectedColor: '#994c616e',
			objId:entry.id,
			font: {fontFamily: style.iconFontFamily, fontSize: '11sp'}
			
		});
		background3.add(btnDelete);
		
		btnDelete.addEventListener("click", function(e){
			var id = e.source.objId;
			var dialog = Ti.UI.createAlertDialog({
				title:L('Delete '+entry.description+'?','Eintrag '+entry.description+' löschen?'),
				buttonNames:[L('Yes','Ja'),L('No', 'Nein')]
			});
			dialog.show();
			dialog.addEventListener("click", function(e){
				if (e.index == 0){
					deleteData(id);
					Ti.App.fireEvent("fillInventoryList");
				};
			});
		});
		
		var btnEdit = Ti.UI.createButton({
			center:{x:'50%'},
			title: '\uE236 '+L('edit'),
			backgroundColor:'transparent',
			style: Titanium.UI.iPhone.SystemButtonStyle.PLAIN,
			color: '#ffffff',
			selectedColor: '#994c616e',
			font: {fontFamily: style.iconFontFamily, fontSize: '11sp'}
		});
		background3.add(btnEdit);
		
		btnEdit.addEventListener("click", function(e){
			var ObjectView = require(Ti.App.config.windowPath + 'ObjectWindow');
			var objectView = new ObjectView(entry);
			objectView.open();
		});
		// send object per mail
		var btnSend = Ti.UI.createButton({
			right:15,
			title: '\uE422 '+L('send'),
			backgroundColor:'transparent',
			style: Titanium.UI.iPhone.SystemButtonStyle.PLAIN,
			color: '#ffffff',
			selectedColor: '#994c616e',
			font: {fontFamily: style.iconFontFamily, fontSize: '11sp'},
			
		});
		background3.add(btnSend);
		
		btnSend.addEventListener("click", function(){
			var email = Ti.UI.createEmailDialog({
				subject:Ti.App.name+': '+entry.description,
				messageBody:getEmail(entry),
			});
			
			
			if (entry.imgInvoice){
				var imgFile = Ti.Filesystem.getFile(entry.imgInvoice);
				email.addAttachment(imgFile);
			};
			if (entry.imgObject){
				var objFile = Ti.Filesystem.getFile(entry.imgObject);
				email.addAttachment(objFile);
			};
			var csvFile = Ti.Filesystem.getFile(entry.csvFile);
			email.addAttachment(csvFile);
			email.open();
		});
		
		var line = Ti.UI.createView({
			height:1,
			backgroundColor:'#ffffff',
			center:{x:'50%'},
			width:'10%',
			bottom:15,
		});
		objectContainer.add(line);
		
		return objectContainer;
	};
	var list;
	function createInventoryList(){
		if (inventoryList.getChildren()){
			inventoryList.removeAllChildren();
		};
		
		var entrys = loadData();
		for (i in entrys){
			var entry = createInventoryEntry(entrys[i]);	
			inventoryList.add(entry);
		};
		if (!list){
			list = inventoryList.getChildren();
		};
	}
	createInventoryList();
	
	function refreshList(){
		if (inventoryList.getChildren()){
			inventoryList.removeAllChildren();
		};
		for (i in list){
			if (list[i].visible){
				inventoryList.add(list[i]);
			};
		}
	}

	function listSearch(keyword){
		if (keyword && keyword != null && keyword != ''){
			for (i in list){
				if(list[i].keywordString.indexOf(keyword) >= 0){
					list[i].visible = true;
					list[i].removed = false;
				} else {
					list[i].visible = false;
					list[i].removed = true;
				};
			}
		} else {
			for (i in list && inventoryList.getChildren.length <= list.length){
				list[i].visible = true;
				list[i].removed = true;
			};
		}
		refreshList();
	};

	Ti.App.addEventListener("fillInventoryList",function(){
		createInventoryList();
	});
	if (Ti.Platform.getOsname() == "android"){
		Ti.UI.Android.hideSoftKeyboard();
	};
	
	return self;
};

module.exports = InventoryView;
