const utilities = {
    _private: {},
    getArrayIndex: function(array, attribute, value) {
        for (var i=0; i<array.length; i++) {
            if (array[i][attribute] == value)
                return i;
        }
        return -1;
    },
    getNamesFromArray: function(array) {
        var names = [];
        for (var i=0; i<array.length; i++) {
            names.push(array[i].name);
        }
        return names;
    },
    minimumOptionsAvailable: function(dataToCheck) {
        const designDecisions = dataToCheck;
        // REQUIREMENT CHECK: MIN 1 DECISION
        if (designDecisions.length  < 1) {
            return false;
        }
        // REQUIREMENT CHECK: MIN 2 OPTIONS PER DECISION
        for (var i=0; i<designDecisions.length; i++) {
            const designDecision = designDecisions[i];
            const choiceOptions = designDecision.options;
            if (choiceOptions.length < 2) {
                return false;
            }
        }
        return true;
    },
    getSurroundingDecisions: function(decisionText) {
            for (var i=0; i<globalState["userData"].length; i++) {
                if (decisionText == globalState["userData"][i].name) {
                    return {
                        "prev2": globalState["userData"][i-2],
                        "prev": globalState["userData"][i-1],
                        "next": globalState["userData"][i+1],
                        "next2": globalState["userData"][i+2],
                    };
                }
            }
    },
    enableDisableNextPrevDecisionButtons: function(prevDecisionBtn, nextDecisionBtn, nextOrPrev, surroundingDecisions) {
            // IF NEXT BUTTON CLICKED
            if (nextOrPrev == "next") {
                // ENABLE PREV BTN
                prevDecisionBtn.classed("disabled", false);
                // IF next2 AVAILABLE
                if (surroundingDecisions["next2"]) {
                    // ENABLE NEXT BTN
                    nextDecisionBtn.classed("disabled", false);
                } else {
                    // DISABLE NEXT BTN
                    nextDecisionBtn.classed("disabled", true);
                }
            }
            // IF PREV BUTTON CLICKED
            else {
                // ENABLE NEXT BTN
                nextDecisionBtn.classed("disabled", false);
                // IF prev2 AVAILABLE
                if (surroundingDecisions["prev2"]) {
                    // ENABLE PREV BTN
                    prevDecisionBtn.classed("disabled", false);
                } else {
                    // DISABLE PREV BTN
                    prevDecisionBtn.classed("disabled", true);
                }
            }
    }
};