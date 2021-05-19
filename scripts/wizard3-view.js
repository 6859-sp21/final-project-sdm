var wizard3View = {
    generate: function() {
        // SETUP WELCOME MESSAGE
        view.setWizardMessage("w3");

        // BIND USER CONTROLS
        this._private.bindUsercontrols();

        const firstDecisionObj = globalState["userData"][0];
        // SETUP FIRST DECISION - LABEL + WEIGHT
        d3.select("#header-wizard3 h3").html(firstDecisionObj.name);
        d3.select("#label-decision-weight-w3").html(firstDecisionObj.weight);

        // SETUP FIRST CHOICE
        d3.select("#options-list-w3 li.selected h4").html(firstDecisionObj.options[0].name);
        d3.select("#slider-option-score").property("value", firstDecisionObj.options[0].score);
        d3.select("#label-option-score").html(firstDecisionObj.options[0].score);
        d3.select("#tb-option-price").property("value", firstDecisionObj.options[0].cost);   

        // FLUSH OTHER CHOICES
        d3.selectAll("#options-list-w3 li:not(:first-child)").remove();
        // SETUP OTHER CHOICES
        for (var i=1; i<firstDecisionObj.options.length; i++) {
            d3.select("#options-list-w3").append("li")
                .classed("choice-option", true)
                .html(firstDecisionObj.options[i].name)
                .on("click", function() {
                    wizard3View.onSelectorClick(this);
                });
        }

        // IF INSUFFICIENT DATA
            // DISABLE GENERATE BUTTON
    },
    onSelectorClick: function(that) {
        if (d3.select(that).classed("selected")) {
            return;
        }

        const currentDecisionLabel = d3.select("#header-wizard3 h3");
        const currentOptionLabel = d3.select("#options-list-w3 li.selected h4");
        const userScoreLabel = d3.select("#label-option-score");
        const userPriceInput = d3.select("#tb-option-price");
        
        const currentDecisionText = currentDecisionLabel.html();
        const currentOptionText = currentOptionLabel.html();
        const userScoreValue = userScoreLabel.html();
        const userPriceValue = userPriceInput.property("value");

        // UPDATE GLOBAL STATE WITH CURRENT OPTION'S SCORE & PRICE
        for (var i=0; i<globalState["userData"].length; i++) {
            const decision = globalState["userData"][i];
            const decisionName = decision.name;
            // MATCH DECISION
            if (decisionName == currentDecisionText) {
                for (var j=0; j<decision.options.length; j++) {
                    const option = decision.options[j];
                    const optionName = option.name;
                    // MATCH OPTION
                    if (optionName == currentOptionText) {
                        globalState["userData"][i].options[j]["score"] = userScoreValue;
                        globalState["userData"][i].options[j]["cost"] = userPriceValue;
                        break;
                    }
                }
                break;
            }
        }
    
        // CHANGE SELECTED OPTION & "THIS" OPTION
        var thisOption;
        for (var i=0; i<globalState["userData"].length; i++) {
            const decision = globalState["userData"][i];
            const decisionName = decision.name;
            // MATCH DECISION
            if (decisionName == currentDecisionText) {
                for (var j=0; j<decision.options.length; j++) {
                    const option = decision.options[j];
                    const optionName = option.name;
                    // MATCH OPTION
                    if (optionName == d3.select(that).html()) {
                        thisOption = globalState["userData"][i].options[j];
                        break;
                    }
                }
                break;
            }
        }
        currentOptionLabel.html(thisOption.name);
        userScoreLabel.html(thisOption.score);
        d3.select("#slider-option-score").property("value", thisOption.score);
        userPriceInput.property("value", thisOption.cost);

        // REMOVE "THIS" OPTION FROM LIST
        d3.select(that).remove();

        // ADD (PREVIOUSLY) SELECTED OPTION TO LIST
        d3.select("#options-list-w3").append("li")
            .classed("choice-option", true)
            .html(currentOptionText)
            .on("click", function() {
                wizard3View.onSelectorClick(this);
            }
        );
    },
    _private: {
        bindUsercontrols: function() {
            const nextDecisionBtnW3 = d3.select("#btn-w3-change-decision-next");
            const prevDecisionBtnW3 = d3.select("#btn-w3-change-decision-back");
            const choiceScoreSlider = d3.select("#slider-option-score");
            const choiceSelectors = d3.selectAll("#options-list-w3 li.choice-option");
            const wizard3GenerateBtn = d3.select("#btn-wizard3");
            
            nextDecisionBtnW3.on("click", function() {
                wizard3View._private.updateWizard3Decision("next");
            });
            prevDecisionBtnW3.on("click", function() {
                wizard3View._private.updateWizard3Decision("prev");
            });
            choiceScoreSlider.on("change", function() {
                const optionScoreSlider = this;
                const optionScoreLabel = d3.select("#label-option-score");
                // CHANGE VALUE ON LABEL
                optionScoreLabel.html(optionScoreSlider.value);
            });
            choiceSelectors.on("click", function() {
                wizard3View.onSelectorClick(this);
            });
            wizard3GenerateBtn.on("click", function() {
                // CHANGE VIEW
                view.changeView("TRADESPACE");
            });
        },
        updateWizard3Decision: function(nextOrPrev) {
            const decisionTextHeader = d3.select("#header-wizard3 h3");
            const currentDecisionText = decisionTextHeader.html();
            const surroundingDecisions = utilities.getSurroundingDecisions(currentDecisionText);
            const newDecision = surroundingDecisions ? surroundingDecisions[nextOrPrev] : null;
            if (newDecision) {
    
                // CHANGE DECISION HEADER TO NEXT DECISION
                decisionTextHeader.html(newDecision.name);
                // CHANGE DECISION WEIGHT TO NEXT DECISION - LABEL
                const decisionWeightLabel = d3.select("#label-decision-weight-w3");
                decisionWeightLabel.html(newDecision.weight);
                
                // CHANGE SELECTED OPTION TO FIRST OPTION OF NEXT DECISION
                d3.select("#options-list-w3 li.selected h4").html(newDecision.options[0].name);
                d3.select("#slider-option-score").property("value", newDecision.options[0].score);
                d3.select("#label-option-score").html(newDecision.options[0].score);
                d3.select("#tb-option-price").property("value", newDecision.options[0].cost);
                
                // CLEAR OTHER OPTIONS FOR CURRENT DECISION
                d3.selectAll("#options-list-w3 li:not(:first-child)").remove();
                // ADD (OTHER) OPTIONS FOR NEXT DECISION (IF ANY)
                for (var i=1; i<newDecision.options.length; i++) {
                    d3.select("#options-list-w3").append("li")
                        .classed("choice-option", true)
                        .html(newDecision.options[i].name)
                        .on("click", function() {
                            wizard3View.onSelectorClick(this);
                        });
                }
            }
        }
    }
};