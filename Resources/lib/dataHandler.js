/*
 * data
 * id
 * date
 * brand (optional)
 * category (optional)
 * image (optional)
 * description (optional)
 * serial (optional)
 */

//MasterList = alle IDs der gespeicherten Objekte
var masterList = ( Ti.App.Properties.hasProperty("maserList") ) ? Ti.App.Properties.getList("maserList") : [];

parent = Ti.Filesystem.getResourcesDirectory();
var objectFolder = Titanium.Filesystem.getFile(parent, 'objects');
if( !objectFolder.exists() ){
  objectFolder.createDirectory();
}

var generalDir = (Ti.Platform.getOsname() != "android") ? Ti.Filesystem.applicationDataDirectory : Ti.Filesystem.externalStorageDirectory;

function saveData(data){
	for (i in masterList){
		if (data.id == masterList[i]){
			Ti.API.log("Object already exists");
			return;
		}
	}
	
	if (data.id){
		//save object image 
		
		if (data.imgObject){
			var objImageFile = Ti.Filesystem.getFile(generalDir, data.id+'.png');
			if (!objImageFile.exists() && Ti.Platform.getOsname() != "android"){
				objImageFile.createFile();
			};
			objImageFile.write(data.imgObject);
		}

		
		if (data.imgInvoice){
			var invoiceImgFile = Ti.Filesystem.getFile(generalDir, data.id+'_invoice.png');
			if (!invoiceImgFile.exists() && Ti.Platform.getOsname() != "android"){
				invoiceImgFile.createFile();
			};
			invoiceImgFile.write(data.imgInvoice);
		}
		
		var txtFile = Ti.Filesystem.getFile(generalDir, data.id+'.txt');
		if (!txtFile.exists() && Ti.Platform.getOsname() != "android"){
			txtFile.createFile();
		};
		
		var csvFile = Ti.Filesystem.getFile(generalDir, data.description+'.csv');
		if (!csvFile.exists() && Ti.Platform.getOsname() != "android"){
			csvFile.createFile();
		};
		
		var dataString = "";
			dataString = "Bezeichnung;Marke;Kategorie;Datum;Seriennummer;";
			dataString += "\n";
			dataString += ((data.description) ? data.description : "") + ";";
			dataString += ((data.brand) ? data.brand : "") + ";";
			dataString += ((data.category) ? data.category : "") + ";";
			dataString += ((data.date) ? data.date : "") + ";";
			dataString += ((data.serial) ? data.serial : "") + ";";
			// dataString += ((data.imgInvoice) ? data.imgInvoice : "") + ";";
			// dataString += ((data.imgObject) ? data.imgObject : "") + ";";
		csvFile.write(dataString);
		
		var dataObj = {
				"id":(data.id) ? data.id : null,
				"date":(data.date) ? data.date : null,
				"brand":(data.brand) ? data.brand : null,
				"category":(data.category) ? data.category : null,
				"description":(data.description) ? data.description : null,
				"serial":(data.serial) ? data.serial : null,
				"txtFile":txtFile.nativePath,
				"csvFile":csvFile.nativePath,
				"imgInvoice":(data.imgInvoice) ? invoiceImgFile.nativePath : null,
				"imgObject":(data.imgObject) ? objImageFile.nativePath : null
		};
		var json = JSON.stringify(dataObj);
		txtFile.write(json);
		
		masterList.push(data.id);
		Ti.App.Properties.setList("maserList", masterList);
	}
}

function exportAll(){
	var csvFile = Ti.Filesystem.getFile(generalDir, 'Meine Inventar.csv');
	if (!csvFile.exists() && Ti.Platform.getOsname() != "android"){
		csvFile.createFile();
	};
	
	var dataString = "";
		dataString = "Bezeichnung;Marke;Kategorie;Datum;Seriennummer;";
		dataString += "\n";
	
	if (masterList && masterList.length > 0){
		for (i in masterList){
			var file = Ti.Filesystem.getFile(generalDir, masterList[i]+'.txt');
			if (file.exists()){
				var json = file.read();
				var data = JSON.parse(json);
					
				dataString += ((data.description) ? data.description : "") + ";";
				dataString += ((data.brand) ? data.brand : "") + ";";
				dataString += ((data.category) ? data.category : "") + ";";
				dataString += ((data.date) ? data.date : "") + ";";
				dataString += ((data.serial) ? data.serial : "") + ";";
				dataString += "\n";
			}
		}
	} else {
		 var dialog = Ti.UI.createAlertDialog({
		    message: 'Keine Daten vorhanden',
		    ok: 'Okay',
		    title: 'Hinweis'
		  }).show();
	}
		
	csvFile.write(dataString);
	
	return csvFile;
};


function loadData(){
	var itemList = [];
	if (masterList && masterList.length > 0){
		for (i in masterList){
			var file = Ti.Filesystem.getFile(generalDir, masterList[i]+'.txt');
			
			if (file.exists()){
				var json = file.read();
				var dataObj = JSON.parse(json);
					
				itemList.push(dataObj);
			}
		}
	}
	return itemList;		
}
function deleteData(id){
	var oldMasterList = masterList;
	masterList = [];
	for (i in oldMasterList){
		if (id == oldMasterList[i]){
			// delete text document
			var file = Ti.Filesystem.getFile(generalDir, oldMasterList[i]+'.txt');
			file.deleteFile();
			// delete image 
			var image = Ti.Filesystem.getFile(generalDir, oldMasterList[i]+'.png');
			image.deleteFile();
		} else {
			masterList.push(oldMasterList[i]);
		}
	}
	Ti.App.Properties.setList("maserList", masterList);
}

function updateData(data){
	for (i in masterList){
		if (data.id == masterList[i]){
			// update txt file
			var txtFile = Ti.Filesystem.getFile(generalDir, data.id+'.txt');
			var string = txtFile.read();
			var json = JSON.parse(string);
			json.description = (data.description) ? data.description : json.description;
			json.brand = (data.brand) ? data.brand : json.brand;
			json.category = (data.category) ? data.category : json.category;
			json.serial = (data.serial) ? data.serial : json.serial;
			//update image
			if (data.imgObject){
				var objImage = Ti.Filesystem.getFile(generalDir, masterList[i]+'.png');
				
				if (data.imgObject != objImage){
					objImage.deleteFile();
					
					var objFile = Ti.Filesystem.getFile(generalDir, data.id+'.png');
					if (!objFile.exists() && Ti.Platform.getOsname() != "android"){
						objFile.createFile();
					};
					objFile.write(data.imgObject);
					json.imgObject = objFile.nativePath;
				}
			}
			if (data.imgInvoice){
				var invoiceImage = Ti.Filesystem.getFile(generalDir, masterList[i]+'_invoice.png');
				
				if (data.imgInvoice != invoiceImage){
					invoiceImage.deleteFile();
					
					var InvoiceFile = Ti.Filesystem.getFile(generalDir, data.id+'_invoice.png');
					if (!InvoiceFile.exists() && Ti.Platform.getOsname() != "android"){
						InvoiceFile.createFile();
					};
					InvoiceFile.write(data.imgInvoice);
					json.imgInvoice = InvoiceFile.nativePath;
				}
			}
			
			
			string = JSON.stringify(json);
			txtFile.write(string);
		}
	}
}
