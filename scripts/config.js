const config = {
    _private: {
        viewConfigs: {
            "HOME":{
                "elements": [
                    "#home"
                ],
                "viewGenerator": "homeView"
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
            "OVERLAY": {
                "elements": [
                    "#overlay", "#overlay-content", "#label-changer", "#concept-info"
                ]
            }
        },
        tradespaceDimensionsInPx: {
            width: 400,
            height: 400,
            markRadius: 5,
            focusRadius: 7,
            margin: 50
        },
        userMessages: {
            "intro": [
                "A tradespace is a visual representation of a set of concepts, developed by making a range of design decisions. Numerous concepts are represented at a lower fidelity and evaluated with a few simple key metrics."
            ],
            "w1": [
                "Alright, let's get you started!",
                "List all the relvant design decisions on the right.", 
                "Click on the NEXT button when done.", 
                // "Psst...don't worry if you miss any, you can always come back and add more!"
            ],
            "w2": [
                "Sweet!",
                "Now, list all the choice options (minimum 2) for each of these design decision.",
                "Click NEXT when done.", 
                "Psst...don't forget to give a weightage to your decisions!"
            ],
            "w3": [
                "Almost there!",
                "For each of the choice options you just entered, give them a score relative to each other.", 
                "Psst...you're at the last step! Don't give up now!"
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