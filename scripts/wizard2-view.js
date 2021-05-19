var wizard2View = {
    generate: function() {
        // SETUP WELCOME MESSAGE
        view.setWizardMessage("w2");

        // GENERATE VIEWS FOR FIRST DECISION
        const decisionTextHeader = d3.select("#header-wizard2 h3");
        const decisionWeightLabel = d3.select("#label-decision-weight");
        // const decisionList = d3.select("#decision-list");
        // FLUSH INFO
        decisionTextHeader.html("");
        decisionWeightLabel.html("");
        // decisionList.selectAll("li:not(:first-child)").remove();
        // UPDATE INFO
        decisionTextHeader.html(globalState["userData"][0]["name"]);
        decisionWeightLabel.property("value", globalState["userData"][0]["weight"]);
        // for (var i=0; i<globalState["userData"][0]["options"].length; i++) {
        //     decisionList.append("li")
        //         .classed("choice-name", true)
        //         .html(decisionText);
        // }
        
        // DISABLE PREV-DECISION BUTTON
        d3.select("#btn-w2-change-decision-back").classed("disabled", true);
        // IF ONLY ONE DECISION - CANCEL NEXT BTN
        if (globalState["userData"].length == 1) {
            d3.select("#btn-w2-change-decision-next").classed("disabled", true);    
        }

        // ANIMATIONS
        setTimeout(function() {
            d3.select("#build").style("opacity", 1);
            // const allUserMessageNodes = 
            d3.selectAll("#build #messages p")
                .each (function(d, i) {
                    const htmlElement = this;
                    setTimeout(function() {
                        htmlElement.style.color = "#FFFFFF";
                    }, i * 1000);
                }
            );
            // TAB TITLE
            const thisTabTitleElement = d3.select(`#tab2 span.tab-title`);
            const prevTabTitleElement = d3.select(`#tab1 span.tab-title`);
            // HIDE PREV TAB TITLE
            prevTabTitleElement.style("max-width", "0px");
            prevTabTitleElement.style("color", "#00000000");
            // SHOW CURRENT TAB TITLE
            thisTabTitleElement.style("max-width", "1000px");
            thisTabTitleElement.style("color", "#000000");
        }, 100);
    },
    _private: {
        
    }
};