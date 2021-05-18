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
    minimumOptionsAvailable: function() {
        const designDecisions = globalState["userData"];
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
        if (globalState["userData"].length == 1) {
            return null;
        } else {
            for (var i=0; i<globalState["userData"].length; i++) {
                const prev = globalState["userData"][i-1];
                const next = globalState["userData"][i+1];
                if (decisionText == globalState["userData"][i].name) {
                    return {
                        "next": next,
                        "prev": prev
                    };
                }
            }
        }
    }
};