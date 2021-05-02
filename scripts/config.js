const config = {
    _private: {
        viewConfigs: {
            "HOME":{
                "elements": [
                    "#home"
                ]
            },
            "WIZARD1": {
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
            "SAMPLES": {
                "elements": [
                    
                ]
            },
            "TRADESPACE": {
                "elements": [
                    "#tradespace"
                ]
            },
        },
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
    }
};