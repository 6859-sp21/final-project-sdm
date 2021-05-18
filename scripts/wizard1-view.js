var wizard1View = {
    generate: function() {
        // SETUP WELCOME MESSAGE
        view.setWizardMessage("w1");

        // INITIALIZE USER-DATA GLOBAL VARIABLE
        globalState["userData"] = [];
    },
    _private: {
    }
};