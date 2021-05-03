const view = {
    _private: {
        clearView: function() {
            var allElements = config.getAllElements();
            for (var i=0; i<allElements.length; i++) {
                d3.selectAll(allElements[i]).style("display","none");
            }
        },
        generateView: function(viewName) {
            const viewGeneratorName = config.getviewGeneratorName(viewName);
            if (viewGeneratorName) {
                window[viewGeneratorName].generate();
            }
        },
        setView: function(viewName) {
            if (!viewName || !config.getViewModes().includes(viewName)) {
                console.error("INCORRECT_VIEWNAME");
            }
            const viewConfig = config.getViewConfig(viewName);
            const elements = viewConfig.elements;
            for (var i=0; i<elements.length; i++) {
                d3.selectAll(elements[i]).style("display","flex");
            }
        }
    },
    changeView: function(viewName) {
        this._private.clearView();
        this._private.generateView(viewName);
        this._private.setView(viewName);
    }
};