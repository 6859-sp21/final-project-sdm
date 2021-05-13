var tradespaceView = {
    generate: function() {
        const that = this;
        // IF SAMPLE
        if (globalState.conceptArchitectures.length <= 0) {
            dataController.loadDataFromCSV("datasets/tradespace-data-serc.csv")
                .then(that._private.onDataLoad)
                .catch(console.error);
        }
    },
    _private: {
        onDataLoad: function(data) {

            that = tradespaceView._private;

            // INPUT VALIDATION

            // FORMAT DATA
            const designDecisions = dataController.formatCSVData(data);
            console.log(designDecisions);

            // PREPARE TRADESPACE VIEW
            that.onDataReady(designDecisions);
        },
        onDataReady: function(designDecisions) {

            that = tradespaceView._private;
            
            // GENERATE ARCHITECTURES
            const conceptArchitectures = dataController.generateArchitectures(designDecisions);
            console.log(conceptArchitectures);

            // CALCULATE COSTS & UTILITIES
            globalState["tradespaceConcepts"] = dataController.generateArchitectures(designDecisions);

            // GENERATE SCATTERPLOT
            scatterPlot.generate("#scatterplot", globalState["tradespaceConcepts"]);

            // CHANGE TITLE
            that.setTradespaceTitle("#tradespace-title", globalState.tradespaceTitle);

            // ADD EDIT_TITLE BUTTON
            that.addEditTitleButton();

            // GENERATE (BOTTOM) SELECTORS
            that.updateChoiceSelectors(designDecisions);
        },
        updateChoiceSelectors: function(designDecisions) {
            const selectorsDiv = d3.select("#choices");

            // CLEAR PREVIOUS SELECTORS
            selectorsDiv.html("");

            // ADD SELECTORS
            for (var i=0; i<designDecisions.length; i++) {
                const designDecisionContainerDiv = selectorsDiv.append("div").classed("choice", true);
                const designDecisionDiv = designDecisionContainerDiv.append("div").classed("choice-name-tradespace", true);
                designDecisionDiv.html(designDecisions[i].name + ":");
                const choiceOptions = designDecisions[i].options;
                for (var j=0; j<choiceOptions.length; j++) {
                    const designDecisionOptionDiv = designDecisionContainerDiv.append("div").classed("choice-option", true);
                    designDecisionOptionDiv.html(choiceOptions[j].name);
                    designDecisionOptionDiv.attr("id", choiceOptions[j].code);
                    designDecisionOptionDiv.on("mouseover", function() {
                        const optionCode = d3.select(this).attr("id");
                        d3.selectAll(`circle[id*='${optionCode}']`).classed("selected", true);
                    });
                    designDecisionOptionDiv.on("mouseout", function() {
                        const optionCode = d3.select(this).attr("id");
                        d3.selectAll(`circle[id*='${optionCode}']`).classed("selected", false);
                    });
                }
            }
        },
        setTradespaceTitle: function(titleLocation, titleValue) {
            d3.select(titleLocation).html("");
            const titlePlaceholder = d3.select(titleLocation).append("h2");
            titlePlaceholder.html(titleValue);
        },
        generateEditBtn: function(btnId, btnLocation, eventHandler) {
            const editBtn = d3.selectAll(btnLocation).append("div");
            editBtn.attr("id", btnId);
            editBtn.classed("btn-edit", true);
            editBtn.html("<span><img alt='Edit' src='edit-icon.png' /></span>");
            editBtn.on("click", eventHandler);
            return editBtn;
        },
        editTitleBtnEventHandler: function() {
            
            const currentTitle = globalState.tradespaceTitle;
            const domLocation = "#tradespace-title";
            const textboxId = "tb-new-title";
            const submitButtonText = "DONE";
            
            // CHANGE TEXT TO TEXTBOX + BUTTON
            d3.select(domLocation).html("");
            const textbox = d3.select(domLocation).append("input");
            textbox.attr("id", textboxId);
            textbox.attr("type", "text");
            textbox.attr("value", currentTitle);
            const submitBtn = d3.select(domLocation).append("button");
            submitBtn.html(submitButtonText);
            submitBtn.on("click", function() {
                // UPDATE VALUE IN DATA MODEL
                globalState.tradespaceTitle = d3.select(`#${textboxId}`).property("value");
                // REVERT TITLE TO TEXT
                tradespaceView._private.setTradespaceTitle(domLocation, globalState.tradespaceTitle);
                tradespaceView._private.addEditTitleButton();
            });
            
        },
        addEditTitleButton: function() {
            const editBtnId = "edit-title";
            const domLocation = "#tradespace-title";

            // GENERATE EDIT BUTTON
            this.generateEditBtn(editBtnId, domLocation, tradespaceView._private.editTitleBtnEventHandler);
        }
    }
};
