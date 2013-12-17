var style = {
	backgroundGradient: {
        type: 'linear',
        startPoint: { x: '0%', y: '0%' }, 
        endPoint: { x: '0%', y: '100%' },       
        colors: [ 
            { color: '#A6CBFF', offset: 0.0 }, 
            { color: '#286DD9', offset: 0.5 } 
        ]
    },
    specialFontFamily:(Ti.Platform.getOsname() != "android") ? "Honey Script" : "HoneyScript-Light"
    
};
