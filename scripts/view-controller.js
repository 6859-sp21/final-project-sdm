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
        },
        displayOverlay: function() {
            d3.select("#overlay").style("display", "block");
            const overlayContent = d3.select("#overlay-content");
            overlayContent.style("display", "flex");    
        }
    },
    changeView: function(viewName) {
        this._private.clearView();
        this._private.generateView(viewName);
        this._private.setView(viewName);
        globalState.viewMode = viewName;
    },
    setWizardMessage: function(messageCode) {
        const msgsDiv = d3.select("#messages");

        msgsDiv.html("");
        
        const msgs = config.getUserMessage(messageCode);
        for (var i=0; i<msgs.length; i++) {
            msgsDiv.append("p").html(`${msgs[i]}`);
        }
    },
    displayLabelChangerOverlay: function() {
        view._private.displayOverlay();
        const labelChanger = d3.select("#label-changer");
        labelChanger.style("display", "block");
    },
    displayConceptInfoOverlay: function() {
        view._private.displayOverlay();
        const conceptInfo = d3.select("#concept-info");
        conceptInfo.style("display", "block");
    }
};