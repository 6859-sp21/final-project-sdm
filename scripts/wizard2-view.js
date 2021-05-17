var wizard2View = {
    generate: function() {
        // SETUP WELCOME MESSAGE
        view.setWizardMessage("w2");

        // GENERATE VIEWS FOR FIRST DECISION
        const decisionTextHeader = d3.select("#header-wizard2 h3");
        const decisionWeightLabel = d3.select("#label-decision-weight");

        decisionTextHeader.html(globalState["userData"][0]["name"]);
        decisionWeightLabel.property("value", 1);
    },
    _private: {
        
    }
};