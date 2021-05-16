var homeView = {
    generate: function() {
        // SETUP WELCOME MESSAGE
        const descriptionDiv = d3.select("#intro");
        const introContent = config.getUserMessage("intro");
        descriptionDiv.html("");
        for (var i=0; i<introContent.length; i++) {
            descriptionDiv.append("p").html(introContent[i]);
        }
    },
    _private: {
    }
};