function getEmail(data){
	var html = L('inventoryDescription')+data.description+"\n";
	if (data.brand){
		html += L('inventoryBrand')+data.brand+"\n";
	}
	if (data.category){
		html += L('inventoryCategory')+data.category+"\n";
	}
	if (data.serial){
		html += L('inventorySerial')+data.serial+"\n";
	}
	return html;
}
