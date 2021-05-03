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
    }
};