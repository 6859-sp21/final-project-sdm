// BUTTON CLICK - HOME - VIEW
d3.select("#btn-explore").on("click", function() {
    view.changeView("TRADESPACE");
});
// BUTTON CLICK - HOME - BUILD
d3.select("#btn-build").on("click", function() {
    view.changeView("WIZARD1");
});
// BUTTON CLICK - TRADESPACE MODE - CLOSE
d3.select("#btn-close-tradespace").on("click", function() {
    view.changeView("HOME");
});
// BUTTON CLICK - BUILD MODE - CLOSE
d3.select("#btn-close-build-mode").on("click", function() {
    view.changeView("HOME");
});

// BUTTON CLICK - CLOSE BUILD MODE
d3.select("#btn-close-build-mode").on("click", function() {
    view.changeView("HOME");
});
// BUTTON CLICK - BUILD_WIZARD_1 - NEXT
d3.select("#btn-wizard1").on("click", function() {
    view.changeView("WIZARD2");
});
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

