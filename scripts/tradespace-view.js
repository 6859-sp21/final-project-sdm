var tradespaceView = {
    generate: function() {
        const that = this;
        // IF SAMPLE
        dataController.loadDataFromCSV("scripts/tradespace-data-transportation.csv")
            .then(that._private.onDataLoad)
            .catch(console.error);
    },
    _private: {
        onDataLoad: function(data) {
            // INPUT VALIDATION

            // FORMAT DATA
            const designDecisions = dataController.formatCSVData(data);
            console.log(designDecisions);

            // PREPARE TRADESPACE VIEW
            tradespaceView._private.onDataReady(designDecisions);
        },
        onDataReady: function(designDecisions) {
            
            // GENERATE ARCHITECTURES
            const conceptArchitectures = dataController.generateArchitectures(designDecisions);
            console.log(conceptArchitectures);

            // CALCULATE COSTS & UTILITIES
            const conceptsForPlotting = dataController.generateArchitectures(designDecisions);

            // GENERATE SCATTERPLOT
            scatterPlot.generate("#scatterplot", conceptsForPlotting);

            // CHANGE TITLE
            d3.select("#tradespace-title h2").html(globalState.tradespaceTitle);

            // GENERATE (BOTTOM) SELECTORS
            tradespaceView._private.updateChoiceSelectors(designDecisions);
        },
        updateChoiceSelectors: function(designDecisions) {
            const selectorsDiv = d3.select("#choices");

            // CLEAR PREVIOUS SELECTORS
            selectorsDiv.html("");

            // ADD SELECTORS
            for (var i=0; i<designDecisions.length; i++) {
                const designDecisionContainerDiv = selectorsDiv.append("div").classed("choice", true);
                const designDecisionDiv = designDecisionContainerDiv.append("div").classed("choice-name", true);
                designDecisionDiv.html(designDecisions[i].name);
                const choiceOptions = designDecisions[i].options;
                for (var j=0; j<choiceOptions.length; j++) {
                    const designDecisionOptionDiv = designDecisionContainerDiv.append("div").classed("choice-option", true);
                    designDecisionOptionDiv.html(choiceOptions[j].name);
                }
            }
        }
    }
};
