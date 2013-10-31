function InventoryWindow(data) {
	//load component dependencies
	var InventoryView = require('ui/common/InventoryView');
		
	//create component instance
	var self = Ti.UI.createWindow({
		backgroundColor:'#ffffff',
		modal: true,
		navBarHidden: true
	});
		
	//construct UI
	var inventoryView = new InventoryView(data);
	self.add(inventoryView);

	inventoryView.addEventListener("shouldCloseView", function () {
		self.close();
	});

	return self;
}

//make constructor function the public component interface
module.exports = InventoryWindow;
