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
		if (data.image){
			var file = Ti.Filesystem.getFile(generalDir, data.id+'.png');
			if (!file.exists() && Ti.Platform.getOsname() != "android"){
				file.createFile();
			};
			file.write(data.image);
		}
		if (data.imageInvoice){
			var file = Ti.Filesystem.getFile(generalDir, data.id+'_invoice.png');
			if (!file.exists() && Ti.Platform.getOsname() != "android"){
				file.createFile();
			};
			file.write(data.imageInvoice);
		}
		
		var file = Ti.Filesystem.getFile(generalDir, data.id+'.txt');
		if (!file.exists() && Ti.Platform.getOsname() != "android"){
			file.createFile();
		};
		
		var dataObj = {
				"id":(data.id) ? data.id : null,
				"date":(data.date) ? data.date : null,
				"brand":(data.brand) ? data.brand : null,
				"category":(data.category) ? data.category : null,
				"description":(data.description) ? data.description : null,
				"serial":(data.serial) ? data.serial : null
		};
		
		var json = JSON.stringify(dataObj);
		file.write(json);
		masterList.push(data.id);
		Ti.App.Properties.setList("maserList", masterList);
	}
}

function loadData(){
	var itemList = [];
	if (masterList && masterList.length > 0){
		for (i in masterList){
			var file = Ti.Filesystem.getFile(generalDir, masterList[i]+'.txt');
			
			if (file.exists()){
				var json = file.read();
				var dataObj = JSON.parse(json);
				
				var image = Ti.Filesystem.getFile(generalDir, masterList[i]+'.png');
				if (image.exists()){
					dataObj.imagePath = image.nativePath;
				};			
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
	alert(data);
	for (i in masterList){
		if (data.id == masterList[i]){
			// update txt file
			var file = Ti.Filesystem.getFile(generalDir, masterList[i]+'.txt');
			var string = file.read();
			var json = JSON.parse(string);
			alert(json);
			json.description = (data.description) ? data.description : json.description;
			json.brand = (data.brand) ? data.brand : json.brand;
			json.category = (data.category) ? data.category : json.category;
			json.serial = (data.serial) ? data.serial : json.serial;
			
			string = JSON.stringify(json);
			file.write(string);
			
			//update image
			if (data.image){
				var image = Ti.Filesystem.getFile(generalDir, oldMasterList[i]+'.png');
				image.deleteFile();
				
				var file = Ti.Filesystem.getFile(generalDir, data.id+'.png');
				if (!file.exists() && Ti.Platform.getOsname() != "android"){
					file.createFile();
				};
				file.write(data.image);
			}
		}
	}
}
