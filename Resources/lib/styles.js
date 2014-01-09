var style = {
	backgroundGradient: {
        type: 'linear',
        startPoint: { x: '0%', y: '0%' }, 
        endPoint: { x: '100%', y: '0%' },       
        colors: [ 
            { color: '#7a2f63', offset: 0.0 }, 
            { color: '#AF6D46', offset: 1.0 } 
        ]
    },
    whiteTransparentBackground:'#33ffffff',
    specialFontFamily:(Ti.Platform.getOsname() != "android") ? "Honey Script" : "HoneyScript-Light",
    iconFontFamily:(Ti.Platform.getOsname() != "android" ) ? "GLYPHICONS" : "glyphicons-regular"
};
