var homeView = {
    generate: function() {
        // SETUP WELCOME MESSAGE
        const descriptionDiv = d3.select("#intro");
        const introContent = config.getUserMessage("intro");
        descriptionDiv.html("");
        for (var i=0; i<introContent.length; i++) {
            descriptionDiv.append("p").html(introContent[i]);
        }
        // ANIMATIONS
        setTimeout(function() {
            descriptionDiv.style("max-height", "500px");
            descriptionDiv.style("color", "#293241");
            d3.select("#home-btns").style("opacity", 1);
        }, 100)
    },
    _private: {
    }
};