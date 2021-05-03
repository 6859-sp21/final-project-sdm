const config = {
    _private: {
        viewConfigs: {
            "HOME":{
                "elements": [
                    "#home"
                ]
            },
            "WIZARD1": {
                "viewGenerator": "wizard1View",
                "elements": [
                    "#build",
                    "#raised",
                    "#header-build",
                    "#content-build",
                    "#messages",
                    "#wizard",
                    "#tabs",
                    "#tab1 .tab-title",
                    "#controls",
                    "#wizard1",
                ]
            },
            "WIZARD2": {
                "viewGenerator": "wizard2View",
                "elements": [
                    "#build",
                    "#raised",
                    "#header-build",
                    "#content-build",
                    "#messages",
                    "#wizard",
                    "#tabs",
                    "#tab2 .tab-title",
                    "#controls",
                    "#wizard2",
                    
                ]
            },
            "WIZARD3": {
                "viewGenerator": "wizard3View",
                "elements": [
                    "#build",
                    "#raised",
                    "#header-build",
                    "#content-build",
                    "#messages",
                    "#wizard",
                    "#tabs",
                    "#tab3 .tab-title",
                    "#controls",
                    "#wizard3",
                    
                ]
            },
            "TRADESPACE": {
                "viewGenerator": "tradespaceView",
                "elements": [
                    "#tradespace"
                ]
            },
        },
        tradespaceDimensionsInPx: {
            width: 400,
            height: 400,
            markRadius: 5,
            focusRadius: 7,
            margin: 50
        },
        userMessages: {
            "w1.1": [
                "Alright, let’s start with your design choices!",
                "Go ahead, add ‘em all ->", 
                "Psst...don’t worry if you miss any, you’ll be able to add more later as well."
            ],
            "w1.2": [
                "Great!",
                "Feel free to add more", 
                "When done, click the NEXT button!"
            ],
            "w2": [
                "Sweet!",
                "Now, let’s note the different options for each of these decisions...", 
                "When done, click the NEXT button!"
            ],
            "w3": [
                "Almost there!",
                "Just score the different choice options, and you’re good to go...", 
                "When done, click the NEXT button!"
            ]
        }
    },
    getViewModes: function() {
        return Object.keys(this._private.viewConfigs);
    },
    getViewConfig: function(viewName) {
        return this._private.viewConfigs[viewName];
    },
    getAllElements: function() {
        const viewModes = this.getViewModes();
        
        var allElements = [];
        for (var i=0; i < viewModes.length; i++) {
            var viewName = viewModes[i];
            var viewConfig = this._private.viewConfigs[viewName];
            var elements = viewConfig.elements;
            allElements = allElements.concat(elements);
        }
        return allElements;
    },
    getTradespaceDimensionsInPx: function() {
        return this._private.tradespaceDimensionsInPx;
    },
    getviewGeneratorName: function(viewName) {
        return this._private.viewConfigs[viewName].viewGenerator;
    },
    getUserMessage: function(messageCode) {
        return this._private.userMessages[messageCode];
    }
};