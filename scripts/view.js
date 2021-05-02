const view = {
    _private: {
        clearView: function() {
            var allElements = config.getAllElements();
            for (var i=0; i<allElements.length; i++) {
                d3.selectAll(allElements[i]).style("display","none");
            }
            console.log(`clearView: ${0}`);
        },
        setView: function(viewName) {
            if (!viewName || !config.getViewModes().includes(viewName)) {
                console.error("INCORRECT_VIEWNAME");
            }
            const viewConfig = config.getViewConfig(viewName);
            // console.log(viewConfig);
            const elements = viewConfig.elements;
            for (var i=0; i<elements.length; i++) {
                d3.selectAll(elements[i]).style("display","flex");
                // }
            }
            console.log(`setView: ${viewName}`);
        },
        
    },
    changeView: function(viewName) {
        this._private.clearView();
        this._private.setView(viewName);
    }
};