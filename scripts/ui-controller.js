/* HOME VIEW */
const viewBtn = d3.select("#btn-explore");
const buildBtn = d3.select("#btn-build");
viewBtn.on("click", function() {
    view.changeView("TRADESPACE");
});
buildBtn.on("click", function() {
    view.changeView("WIZARD1");
});

/* OVERLAY */
const conceptInfoCloseBtn = d3.select("#btn-close-overlay");
const changeLabelSubmitBtn = d3.select("#btn-update-axis-label");
conceptInfoCloseBtn.on("click", function() {
    view.changeView("TRADESPACE");
});
changeLabelSubmitBtn.on("click", function() {
    const labelTextbox = d3.select("#tb-axis-label");
    const newLabel = labelTextbox.property("value");
    if (newLabel) {
        // UPDATE AXIS NAME IN GLOBAL STATE
        globalState[globalState["axisToUpdate"]] = newLabel;
        // REGENERATE SCATTERPLOT WITH NEW AXIS NAME
        scatterPlot.generate("#scatterplot", globalState["tradespaceConcepts"]);
    }
    // SWITCH TO TRADESPACE VIEW
    view.changeView("TRADESPACE");
});

/* TRADESPACE VIEW */
const closeTradespaceBtn = d3.select("#btn-close-tradespace")
closeTradespaceBtn.on("click", function() {
    view.changeView("HOME");
    // RESET CSS FOR ANIMATIONS
    d3.select("#tradespace").style("opacity", 0);
});

/* BUILD VIEW */
const closeWizardBtn = d3.select("#btn-close-build-mode")
// const wizardBackBtn = d3.select("#btn-back-build-mode");
// const tabs = d3.selectAll(".tab-number");
closeWizardBtn.on("click", function() {
    view.changeView("HOME");
    // RESET CSS FOR ANIMATIONS
    d3.select("#build").style("opacity", 0);
});
/*
wizardBackBtn.on("click", function() {
    const currentView = globalState.viewMode;
    const wizardNumber = currentView.substr(currentView.length - 1,1)
    if (wizardNumber == 1) {
        view.changeView("HOME");
    } else {
        view.changeView(`WIZARD${wizardNumber - 1}`);
    }
    // RESET CSS FOR ANIMATIONS
    d3.select("#build").style("opacity", 0);
});
*/
/*
tabs.on("click", function() {
    const tabNumber = this.innerHTML;
    view.changeView(`WIZARD${tabNumber}`);
    // ANIMATIONS
    const thisTabTitleElement = d3.select(this);
    const prevTabTitleElement = d3.select(`#tab${tabNumber - 1} span.tab-title`);
    setTimeout(function() {
        // HIDE PREV TAB TITLE
        prevTabTitleElement.style("max-width", "0px");
        prevTabTitleElement.style("color", "#00000000");
        // SHOW NEW TAB TITLE 
        thisTabTitleElement.style("max-width", "1000px");
        thisTabTitleElement.style("color", "#000000");
    }, 100);
});
*/

/** WIZARD 1 */
const wizard1AddDecisionBtn = d3.select("#btn-add-decision");
const wizard1NextBtn = d3.select("#btn-wizard1");
wizard1AddDecisionBtn.on("click", function() {
    const decisionTextbox = d3.select("#tb-add-decision");
    const decisionText = decisionTextbox.property("value");
    if (decisionText) {
        const decisionList = d3.select("#decision-list");
        decisionList.append("li")
            .classed("choice-name", true)
            .html(decisionText);
    }
    decisionTextbox.property("value","");

    // IF DECISIONS EXIST - ENABLE NEXT BTN
    const decisionItems = d3.selectAll("#decision-list li").nodes();
    if (decisionItems.length > 1) {
        wizard1NextBtn.classed("disabled", false);
    } else {
        wizard1NextBtn.classed("disabled", true);
    }

    // ANIMATIONS
    setTimeout(function() {
        const newElement = d3.select("#decision-list li:last-child");
        newElement.style("max-height", "100px");
        newElement.style("color", "#000000");
        newElement.style("opacity", "1");
    }, 100);
});
wizard1NextBtn.on("click", function() {
    const decisionItems = d3.selectAll("#decision-list li").nodes();
    // IF DECISIONS EXIST
    if (decisionItems.length > 1) {
        // ADD DESIGN DECISIONS TO GLOBAL STATE
        for (var i=1; i<decisionItems.length; i++) {
            const decisionItem = decisionItems[i];
            const decisionText = decisionItem.innerText;
            globalState["userData"].push({
                "code": `dc${i}`,
                "name": decisionText,
                "options": [],
                "weight": 1
            });
        }
        // CHANGE VIEW
        view.changeView("WIZARD2");
    }
});

/** WIZARD 2 */
const nextDecisionChoiceBtn = d3.select("#btn-w2-change-decision-next");
const prevDecisionChoiceBtn = d3.select("#btn-w2-change-decision-back");
const decisionWeightSlider = d3.select("#slider-decision-weight");
const wizard2AddOptionBtn = d3.select("#btn-add-option");
const wizard2NextBtn = d3.select("#btn-wizard2");
nextDecisionChoiceBtn.on("click", function() {
    updateWizard2Decision("next");
});
prevDecisionChoiceBtn.on("click", function() {
    updateWizard2Decision("prev");
});
decisionWeightSlider.on("change", function() {
    // UPDATE DECISION WEIGHT LABEL
    const decisionWeightLabel = d3.select("#label-decision-weight-w2");
    decisionWeightLabel.html(this.value);
    // UPDATE DECISION WEIGHT IN GLOBAL STATE
    const decisionTextHeader = d3.select("#header-wizard2 h3");
    const currentDecisionText = decisionTextHeader.html();
    for (var i=0; i<globalState["userData"].length; i++) {
        if (currentDecisionText == globalState["userData"][i].name) {
            globalState["userData"][i]["weight"] = this.value;
            break;
        }
    }
});
wizard2AddOptionBtn.on("click", function() {
    const optionTextbox = d3.select("#tb-add-option");
    const optionText = optionTextbox.property("value");
    if (optionText) {
        // ADD TO GLOBAL STATE
        const decisionTextHeader = d3.select("#header-wizard2 h3");
        const currentDecisionText = decisionTextHeader.html();
        for (var i=0; i<globalState["userData"].length; i++) {
            if (currentDecisionText == globalState["userData"][i].name) {
                globalState["userData"][i].options.push({
                    "name": optionText,
                    "code": `dc${i+1}c${globalState["userData"][i].options.length + 1}`,
                    "score": 1,
                    "cost": 0
                });
                break;
            }
        }
        // ADD UI ELEMENT
        const optionsList = d3.select("#options-list-w2");
        optionsList.append("li")
            .classed("choice-option", true)
            .html(optionText);          
    }
    optionTextbox.property("value","");

    // IF ALL DECISIONS HAVE OPTIONS
    if (utilities.minimumOptionsAvailable(globalState["userData"])) {
        // ENABLE NEXT BUTTON
        wizard2NextBtn.classed("disabled", false);
    } else {
        // DISABLE NEXT BUTTON
        wizard2NextBtn.classed("disabled", true);
    }

    // ANIMATIONS
    setTimeout(function() {
        const newElement = d3.select("#options-list-w2 li:last-child");
        newElement.style("max-height", "100px");
        newElement.style("color", "#000000");
        newElement.style("opacity", "1");
    }, 100);
});
wizard2NextBtn.on("click", function() {
    if (utilities.minimumOptionsAvailable(globalState["userData"])) {
        // UPDATE GLOBAL STATE
        // CHANGE VIEW
        view.changeView("WIZARD3");
    }
});
const updateWizard2Decision = function(nextOrPrev) {
    const decisionTextHeader = d3.select("#header-wizard2 h3");
    const currentDecisionText = decisionTextHeader.html();
    const surroundingDecisions = utilities.getSurroundingDecisions(currentDecisionText);
    const newDecision = surroundingDecisions ? surroundingDecisions[nextOrPrev] : null;
    if (newDecision) {
        // CHANGE DECISION HEADER TO NEXT DECISION
        decisionTextHeader.html(newDecision.name);
        // CHANGE DECISION WEIGHT TO NEXT DECISION - LABEL
        const decisionWeightLabel = d3.select("#label-decision-weight-w2");
        decisionWeightLabel.html(newDecision.weight ? newDecision.weight : 1);
        // CHANGE DECISION HEADER TO NEXT DECISION - SLIDER
        decisionWeightSlider.property("value", newDecision.weight ? newDecision.weight : 1);
        // CLEAR CURRENT OPTIONS
        d3.selectAll("#options-list-w2 li:not(:first-child)").remove();
        // ADD OPTIONS FOR (NEXT) DECISION (IF ANY)
        if (newDecision.options) {
            for (var i=0; i<newDecision.options.length; i++) {
                d3.select("#options-list-w2").append("li")
                    .classed("choice-option", true)
                    .html(newDecision.options[i].name);
            }

            // ENABLE/DISABLE DECISION-CHANGE BTNS
            console.log(surroundingDecisions);
            const prevDecisionBtn = d3.select("#btn-w2-change-decision-back");
            const nextDecisionBtn = d3.select("#btn-w2-change-decision-next");
            utilities.enableDisableNextPrevDecisionButtons(prevDecisionBtn, nextDecisionBtn, nextOrPrev, surroundingDecisions);
        }
    }

    // ANIMATIONS
    d3.selectAll("#options-list-w2 li.choice-option:not(:first-child)")
        .each (function(d, i) {
            const htmlElement = this;
            setTimeout(function() {
                htmlElement.style["max-height"] = "100px";
                htmlElement.style["color"] = "#000000";
                htmlElement.style["opacity"] = "1";
            }, i * 100);
        }
    );
}