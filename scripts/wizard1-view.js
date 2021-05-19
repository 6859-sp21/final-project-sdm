var wizard1View = {
    generate: function() {
        // SETUP WELCOME MESSAGE
        view.setWizardMessage("w1");

        // INITIALIZE USER-DATA GLOBAL VARIABLE
        globalState["userData"] = [];

        // ANIMATIONS
        setTimeout(function() {
            d3.select("#build").style("opacity", 1);
            d3.selectAll("#build #messages p")
                .each (function(d, i) {
                    const htmlElement = this;
                    setTimeout(function() {
                        htmlElement.style.color = "#FFFFFF";
                    }, i * 1000);
                }
            );
            // TAB TITLE
            const thisTabTitleElement = d3.select(`#tab1 span.tab-title`);
            thisTabTitleElement.style("max-width", "1000px");
            thisTabTitleElement.style("color", "#000000");
        }, 100);
    },
    _private: {
    }
};