const dataController = {
    _private: {
        _getConceptInfo: function(designDecisions, conceptArchitectureChoices) {
            var cost = 0;
            var utility = 0;
            var id = "";
            for (var i=0; i<designDecisions.length; i++) {
                const designDecisionName = designDecisions[i].name;
                const designDecisionWeight = designDecisions[i].weight;
                const designDecisionOptions = designDecisions[i].options;
                const selectedOptionName = conceptArchitectureChoices[designDecisionName].name;
                for (j = 0; j<designDecisionOptions.length; j++) {
                    const optionName = designDecisionOptions[j].name;
                    const optionCode = designDecisionOptions[j].code;
                    if (optionName == selectedOptionName) {
                        cost += designDecisionOptions[j].cost;
                        utility += designDecisionWeight * designDecisionOptions[j].score;
                        id += optionCode + "-";
                    }
                }
            }
            return {
                "cost": cost,
                "utility": utility,
                "id": id.substring(0, id.length - 1)
            };
        },
        _chooseDesignDecision: function(designDecisions, designDecisionIndex, conceptArchitecture) {
            const designDecision = designDecisions[designDecisionIndex];

            if (!designDecision) {
                return null;
            }

            for (var j=0; j<designDecision.options.length; j++) {
                var selectedOption = designDecision.options[j];
                
                if(!conceptArchitecture["choices"]) {
                    conceptArchitecture["choices"] = {};
                }
                conceptArchitecture["choices"][designDecision.name] = {
                    "name": selectedOption.name,
                    "code": selectedOption.code,
                };

                if (designDecisions[designDecisionIndex+1]) {
                    conceptArchitecture = dataController._private._chooseDesignDecision(designDecisions, designDecisionIndex + 1, conceptArchitecture);
                } else {
                    const conceptInfo = dataController._private._getConceptInfo(designDecisions, conceptArchitecture["choices"]);
                    conceptArchitecture["cost"] = conceptInfo["cost"];
                    conceptArchitecture["utility"] = conceptInfo["utility"];
                    conceptArchitecture["id"] = conceptInfo["id"];
                
                    globalState.conceptArchitectures.push(Object.assign({},conceptArchitecture));
                }
            }

            return conceptArchitecture;
        }
    },
    loadDataFromCSV: function(fileAddress) {
        var dataArr = [];
        return new Promise(function (resolver, rejecter){
            d3.csv(fileAddress, function(data, error) {
                if (!data) {
                    rejecter(error);
                }
                dataArr.push(data);
                resolver(dataArr); 
            });
        });
    },  
    formatCSVData: function(csvData) {
        var designDecisionsArray = [];
        for (var i=0; i<csvData.length; i++) {
            const designDecisionName = csvData[i]["design-choice"];
            const designDecisionCode = csvData[i]["decision-code"];
            const designDecisionWeight = parseFloat(csvData[i]["weight"]);
            const designDecisionOptionName = csvData[i]["choice-option"];
            const designDecisionOptionCode = csvData[i]["choice-code"];
            const designDecisionOptionCost = parseFloat(csvData[i]["cost"]);
            const designDecisionOptionScore = parseFloat(csvData[i]["score"]);

            var designDecisionIndex = utilities.getArrayIndex(designDecisionsArray, "name", designDecisionName);
            if (designDecisionIndex < 0) {
                // NEW DESIGN DECISION
                designDecisionsArray.push({
                    "name": designDecisionName,
                    "code": designDecisionCode,
                    "weight": designDecisionWeight,
                    "options": []
                });
                designDecisionIndex = designDecisionsArray.length - 1;
            }
            designDecisionsArray[designDecisionIndex].options.push({
                "name": designDecisionOptionName,
                "code": designDecisionOptionCode,
                "cost": designDecisionOptionCost,
                "score": designDecisionOptionScore
            });
        }
        return designDecisionsArray;
    },
    generateArchitectures: function(decisionChoices) {
    
        // FLUSH PREVIOUS ARCHITECTURES
        globalState.architectureConcepts = [];

        // GENERATE ARCHITECTURES
        this._private._chooseDesignDecision(decisionChoices, 0, {});

        // RETURN ARCHITECTURES
        return globalState.conceptArchitectures;
    }    
};