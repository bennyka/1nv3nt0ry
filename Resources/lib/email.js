function getEmail(data){
	var html = "Bezeichnung: "+data.description+"\n";
	if (data.brand){
		html += "Marke: "+data.brand+"\n";
	}
	if (data.category){
		html += "Kategorie: "+data.category+"\n";
	}
	if (data.serial){
		html += "Seriennummer: "+data.serial+"\n";
	}
	return html;
}
