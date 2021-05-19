var tradespaceView = {
    generate: function() {
        const that = this;

        // IF USER DATA
        if (globalState["userData"]) {
            that._private.flushPrevTradespace();
            that._private.onDataReady(globalState["userData"]);
        }
        // ELSE IF NO USER DATA
        else {
            // IF (DEFAULT) DATA TRADESPACE NOT ALREADY GENERATED
            if (globalState.conceptArchitectures.length <= 0) {
                // LOAD (DEFAULT) DATA & GENERATE TRADESPACE
                dataController.loadDataFromCSV("datasets/tradespace-data-serc.csv")
                    .then(that._private.onDataLoad)
                    .catch(console.error);
            }
        } 
    },
    _private: {
        flushPrevTradespace: function() {
            d3.select("#tradespace-title").html("");
            d3.select("#scatterplot").html("");
            d3.select("#choices").html("");
        },
        onDataLoad: function(data) {
            console.log(data);
            that = tradespaceView._private;

            // INPUT VALIDATION

            // FORMAT DATA
            const designDecisions = dataController.formatCSVData(data);

            // PREPARE TRADESPACE VIEW
            that.onDataReady(designDecisions);
        },
        onDataReady: function(designDecisions) {
            console.log(designDecisions);

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
                designDecisionDiv.attr("id", `dc${i+1}`);
                designDecisionDiv.html(designDecisions[i].name + ":");
                const choiceOptions = designDecisions[i].options;
                for (var j=0; j<choiceOptions.length; j++) {
                    const designDecisionOptionDiv = designDecisionContainerDiv.append("div").classed("choice-option", true);
                    designDecisionOptionDiv.html(choiceOptions[j].name);
                    designDecisionOptionDiv.attr("id", choiceOptions[j].code);
                    designDecisionOptionDiv.on("click", function() {
                        const optionCode = d3.select(this).attr("id");
                        tradespaceView._private.onOptionClick(optionCode);
                    });
                    designDecisionOptionDiv.on("mouseover", function() {
                        
                        const optionCode = d3.select(this).attr("id");
                        
                        // IF ALREADY SELECTED - DO NOTHING
                        // OR IF OTHER OPTION OF SAME DECISION SELECTED - DO NOTHING
                        // ELSE
                        const preselectedOptionForDecision = tradespaceView._private.getPreselectedOptionForDecision(optionCode);
                        if (!preselectedOptionForDecision) {
                            // SELECT CIRCLES
                            tradespaceView._private.selectCircles(optionCode);
                            d3.select(`#${optionCode}`).classed("selected", true);

                        }
                    });
                    designDecisionOptionDiv.on("mouseout", function() {

                        const optionCode = d3.select(this).attr("id");

                        // IF NOT PRE-SELECTED (BY CLICKING) - REMOVE SELECTED CLASS
                        const preselectedOptionForDecision = tradespaceView._private.getPreselectedOptionForDecision(optionCode);
                        if (preselectedOptionForDecision && preselectedOptionForDecision == optionCode) {
                            // PRE-SELECTED - DO NOTHING
                        } else {
                            d3.select(`#${optionCode}`).classed("selected", false);
                        }

                        // RESET CONCEPT HIGHLIGHTS TO PRE-SELECTED ONES
                        tradespaceView._private.selectCircles();
                    });
                }
            }
        },
        onOptionClick: function(optionCode) {

            // CHECK IF DECISION IS ALREADY SELECTED (SAME / DIFFERENT OPTION)
            const preselectedOptionForDecision = tradespaceView._private.getPreselectedOptionForDecision(optionCode);
            if (preselectedOptionForDecision) {
                // IF YES - UNSELECT THAT OPTION
                globalState["selectedOptions"] = globalState["selectedOptions"].filter(function(value, index, arr){ 
                    return value != preselectedOptionForDecision;
                });
                d3.select(`#${preselectedOptionForDecision}`).classed("selected", false);

                if (preselectedOptionForDecision != optionCode) {
                    // PUSH OPTION TO SELECTED OPTIONS
                    globalState["selectedOptions"].push(optionCode);
                }
            } else {
                // PUSH OPTION TO SELECTED OPTIONS
                globalState["selectedOptions"].push(optionCode);
            }

            // UPDATE CLASSES - (UN)SELECTED CONCEPTS
            tradespaceView._private.selectCircles();

            // UPDATE CLASSES - SELECTED OPTION
            tradespaceView._private.selectOptions();
        },
        selectOptions: function() {
            for (var i=0; i<globalState["selectedOptions"].length; i++) {
                d3.select(`#${globalState["selectedOptions"][i]}`).classed("selected", true);
            }
        },
        getPreselectedOptionForDecision: function(optionCodeToCheck) {
            for (var i=0; i<globalState["selectedOptions"].length; i++) {
                const preselectedOptionCode = globalState["selectedOptions"][i];
                const decisionCode = preselectedOptionCode.substr(0,3);
                if (optionCodeToCheck.startsWith(decisionCode)) {
                    return preselectedOptionCode;
                }
            }
            return null;
        },
        selectCircles: function(temporaryOptionCode) {
            // CLEAR ALL CLASSES
            d3.selectAll("circle").classed("selected", false);
            d3.selectAll("circle").classed("unselected", false);
            // SELECT CIRCLES TO MARK SELECTED
            var circlesToSelect = d3.selectAll("circle");
            for ( var i=0; i<globalState["selectedOptions"].length; i++) {
                const optionCode = globalState["selectedOptions"][i];
                circlesToSelect = circlesToSelect.filter(`circle[id*='${optionCode}']`);
            }
            if (temporaryOptionCode) {
                circlesToSelect = circlesToSelect.filter(`circle[id*='${temporaryOptionCode}']`);
            }
            // MARK CIRCLES SELECTED
            circlesToSelect.classed("selected", true);
            // SELECT CIRCLES TO MARK UNSELECTED
            const circlesToUnselect = d3.selectAll("circle:not(.selected)");
            // MARK CIRCLES UNSELECTED
            circlesToUnselect.classed("unselected", true);
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
            editBtn.html("<span><img alt='Edit' src='style/edit-icon.png' /></span>");
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
