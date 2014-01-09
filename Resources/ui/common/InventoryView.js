Ti.include("/lib/dataHandler.js");
function InventoryView() {
	var self = Ti.UI.createView({
		backgroundGradient:style.backgroundGradient
	});
	
	// ++++++++++++++TOP++++++++++++++
	var areaTop= Ti.UI.createView({
		top:0,
		left:0,
		height:"20%"
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
	
	var headline = Ti.UI.createLabel({
		text:L('Inventory', 'Inventar'),
		center:{x:'50%',y:'50%'},
		font: {fontFamily: style.specialFontFamily, fontSize:"60sp"},
		color:'#ffffff'
	});
	areaTop.add(headline);
	
	var dialog = Ti.UI.createAlertDialog({
		title:L('Delete this Entry?','Diesen Eintrag löschen?'),
		buttonNames:[L('Yes','Ja'),L('No', 'Nein')]
	});
	
	// ++++++++++++++REST OF PAGE++++++++++++++
	function createInventoryEntry(entry){
		var objectContainer = Ti.UI.createView({
			height:150,
		});
		// ++++++++++++++entryName & entryDate++++++++++++++
		var background1 = Ti.UI.createView({
			top:0,
			height:40,
			backgroundColor:'#20ffffff'
		});
		objectContainer.add(background1);
		
		var entryName = Ti.UI.createLabel({
			top:2,
			height:Ti.UI.SIZE,
			left:"40%",
			text:entry.description,
			color:'#ffffff',
			font:{fontWeight:'bold'}
		});
		background1.add(entryName);
		
		var entryCreationDate = Ti.UI.createLabel({
			bottom:entryName.top,
			height:Ti.UI.SIZE,
			left:"40%",
			text:L('created at '+entry.date,'erstellt am '+entry.date),
			color:'#ffffff',
			font:{fontSize:'12sp'}
		});
		background1.add(entryCreationDate);
		
		// ++++++++++++++category & brand++++++++++++++
		var background2 = Ti.UI.createView({
			top:40,
			height:40,
			backgroundColor:'#33ffffff'
		});
		objectContainer.add(background2);
		
		var entryCategory = Ti.UI.createLabel({
			top:4,
			height:Ti.UI.SIZE,
			left:"40%",
			text:L('Category: '+entry.category,'Kategorie: '+entry.category),
			color:'#ffffff',
			font:{fontSize:'10sp'}
		});
		background2.add(entryCategory);
		
		var entryBrand = Ti.UI.createLabel({
			bottom:entryCategory.top,
			height:Ti.UI.SIZE,
			left:"40%",
			text:L('Brand: '+entry.brand,'Marke: '+entry.brand),
			color:'#ffffff',
			font:{fontSize:'10sp'}
		});
		background2.add(entryBrand);
		// ++++++++++++++Bild++++++++++++++
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
			image:(entry.imagePath) ? entry.imagePath : null
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
			center:{x:'50%',y:'50%'}
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
			title: L('\uE208 Delete', '\uE208 Löschen'),
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
			dialog.show();
			dialog.addEventListener("click", function(e){
				switch(e.index){
					case 0:
						deleteData(id);
						createInventoryList();
						break;
					case 1:
						// Nein (Abbrechen)
						break;
				}
			});
			
		});
		
		var btnEdit = Ti.UI.createButton({
			center:{x:'50%'},
			title: L('\uE236 Edit', '\uE236 Bearbeiten'),
			backgroundColor:'transparent',
			style: Titanium.UI.iPhone.SystemButtonStyle.PLAIN,
			color: '#ffffff',
			objData:entry,
			selectedColor: '#994c616e',
			font: {fontFamily: style.iconFontFamily, fontSize: '11sp'},
			
		});
		background3.add(btnEdit);
		
		btnEdit.addEventListener("click", function(e){
			var ObjectView = require(Ti.App.config.windowPath + 'ObjectWindow');
			var objectView = new ObjectView(e.source.objData);
			objectView.open();
		});
		
		var btnSend = Ti.UI.createButton({
			right:15,
			title: L('\uE422 Send', '\uE422 Senden'),
			backgroundColor:'transparent',
			style: Titanium.UI.iPhone.SystemButtonStyle.PLAIN,
			color: '#ffffff',
			selectedColor: '#994c616e',
			font: {fontFamily: style.iconFontFamily, fontSize: '11sp'},
			
		});
		background3.add(btnSend);
		
		btnSend.addEventListener("click", function(e){
			alert(e.source.title);
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
	
	var inventoryList = Ti.UI.createScrollView({
		layout:'vertical',
		top:'20%',
		bottom:'30'
	});
	self.add(inventoryList);
	
	function createInventoryList(){
		if (inventoryList.getChildren()){
			inventoryList.removeAllChildren();
		};
		
		var entrys = loadData();
		for (i in entrys){
			var entry = createInventoryEntry(entrys[i]);
			
			inventoryList.add(entry);
		}
	}
	createInventoryList();
	
	return self;
};

module.exports = InventoryView;
