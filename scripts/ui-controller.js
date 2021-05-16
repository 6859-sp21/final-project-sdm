// BUTTON CLICK - HOME - VIEW
d3.select("#btn-explore").on("click", function() {
    view.changeView("TRADESPACE");
});
// BUTTON CLICK - HOME - BUILD
d3.select("#btn-build").on("click", function() {
    view.changeView("WIZARD1");
});
// BUTTON CLICK - CONCEPT INFO OVERLAY - CLOSE
d3.select("#btn-close-overlay").on("click", function() {
    view.changeView("TRADESPACE");
});
// BUTTON CLICK - TRADESPACE MODE - CLOSE
d3.select("#btn-close-tradespace").on("click", function() {
    view.changeView("HOME");
});
// BUTTON CLICK - BUILD MODE - CLOSE
d3.select("#btn-close-build-mode").on("click", function() {
    view.changeView("HOME");
});
// BUTTON CLICK - BUILD MODE - BACK
d3.select("#btn-back-build-mode").on("click", function() {
    const currentView = globalState.viewMode;
    const wizardNumber = currentView.substr(currentView.length - 1,1)
    if (wizardNumber == 1) {
        view.changeView("HOME");
    } else {
        view.changeView(`WIZARD${wizardNumber - 1}`);
    }
});
// BUTTON CLICK - BUILD_WIZARD - TAB CLICK
d3.selectAll(".tab-number").on("click", function() {
    const tabNumber = this.innerHTML;
    view.changeView(`WIZARD${tabNumber}`);
});
// BUTTON CLICK - BUILD_WIZARD_1 - NEXT
d3.select("#btn-wizard1").on("click", function() {
    view.changeView("WIZARD2");
})
// BUTTON CLICK - BUILD_WIZARD_2 - NEXT
d3.select("#btn-wizard2").on("click", function() {
    // IF MORE DESIGN CHOICES - CHANGE CHOICE OPTIONS
    // ELSE
    view.changeView("WIZARD3");
});
// BUTTON CLICK - BUILD_WIZARD_3 - GENERATE
d3.select("#btn-wizard3").on("click", function() {
    // IF MORE DESIGN CHOICES - CHANGE CHOICE OPTIONS
    // ELSE
    view.changeView("TRADESPACE");
});
// BUTTON CLICK - OVERLAY - CHANGE LABEL
d3.select("#btn-update-axis-label").on("click", function() {
    const labelTextbox = d3.select("#tb-axis-label");
    globalState[globalState["axisToUpdate"]] = labelTextbox.property("value");
    scatterPlot.generate("#scatterplot", globalState["tradespaceConcepts"]);
    view.changeView("TRADESPACE");
    labelTextbox.property("value","");
});