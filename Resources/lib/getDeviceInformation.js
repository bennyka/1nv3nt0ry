var screensize = require('lib/Screensize');

// var content = '<html>';
// content +='<table>';
// 
// content +='<tr>';
// content +='<td> Model: </td>';
// content +='<td>'+Ti.Platform.getModel()+'</td>';
// content +='</tr>';
// 
// content +='<tr>';
// content +='<td> OS: </td>';
// content +='<td>'+Ti.Platform.getOsname()+" "+Ti.Platform.getVersion()+'</td>';
// content +='</tr>';
// 
// content +='<tr>';
// content +='<td> Screensize: </td>';
// content +='<td>'+screensize.screensize()+'</td>';
// content +='</tr>';
// 
// content +='</table>';

var content = 'Model: '+Ti.Platform.getModel();
content +=', OS: '+screensize.osname()+" "+Ti.Platform.getVersion();
content +=', Screensize: '+Math.round(screensize.screensize());
content +=', Resolution: '+screensize.getDiagonalSize();

var emailDialog = Ti.UI.createEmailDialog({
	subject:'Beta Test Device Informations',
	messageBody:content,
	html:true,
	toRecipients:['benny90.ka@gmail.com']
});

// var btnEmail = Ti.UI.createButton({
	// title:'Send Email to Developer',
	// visible:false,
	// bottom:'10%',
	// center:{x:'50%',y:'50%'}
// });
// 
// Ti.UI.currentWindow.add(btnEmail);
// 
// btnEmail.addEventListener("click", function(){
	// emailDialog.open();	
// });
Ti.Gesture.addEventListener("shake", function(){
	Ti.Media.vibrate();
	emailDialog.open();	
});
