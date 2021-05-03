const scatterPlot = {
    generate: function(divId, data) {

        // CLEAR PREVIOUS SCATTERPLOT
        d3.select(divId).html("");
    
        const width = config.getTradespaceDimensionsInPx().width;
        const height = config.getTradespaceDimensionsInPx().height;
        const margin = config.getTradespaceDimensionsInPx().margin;
        const maxCost = this._private.getMax(data, "cost");;
        const maxUtility = this._private.getMax(data, "utility");
        const markRadius = config.getTradespaceDimensionsInPx().markRadius;
        var xAxisLabel = "Cost (USD)";
        var yAxisLabel = "Utility";
    
        var svg = d3.select(divId)
            .append("svg")
                .attr("width", width)
                .attr("height", height);
        
        var xAxis = d3.scaleLinear()
            .domain([0, maxCost])
            .range([margin, width - margin]);
        svg.append("g")
            .attr("transform", `translate(0,${height - margin})`)
            .call(d3.axisBottom(xAxis));
        svg.append("text")
            .attr("x", width / 3)
            .attr("y", height - 10)
            .text(xAxisLabel);
        
        var yAxis = d3.scaleLinear()
            .domain([0, maxUtility])
            .range([height - margin, margin]);
        svg.append("g")
            .attr("transform", `translate(${margin}, 0)`)
            .call(d3.axisLeft(yAxis));
        svg.append("text")
            .attr("y", height / 3)
            .attr("x", 10)
            .text(yAxisLabel)
            .attr("transform", "rotate(-90)");
    
        svg.selectAll("circle")
            .data(data)
            .enter()
            .append("circle")
                .attr("id", this._private.generateIDForMark)
                .attr("cx", function(d) {return xAxis(d.cost)})
                .attr("cy", function(d) {return yAxis(d.utility)})
                .attr("r", markRadius)
                .on('mouseover', this._private.onMouseOverMark)
               .on('mouseout', this._private.onMouseOutMark);
    
    },
    selectArchitectures: function(designChoices) {

    },
    _private: {
        generateIDForMark: function(datum) {
            const choices = datum["choices"];
            const choiceNames = Object.keys(choices);
            var id = "";
            for (var i=0; i<choiceNames.length; i++) {
                id += choices[choiceNames[i]] + "-";
            }
            return id.substring(0, id.length - 1);
        },
        onMouseOverMark: function (d, datum) {
            console.log(datum);
            d3.select(this)
                .classed("selected", true)
                .transition()
                    .attr("r", config.getTradespaceDimensionsInPx().focusRadius);
        },
        onMouseOutMark: function (d, datum) {
            d3.select(this)
                .classed("selected", false)
                .transition()
                    .attr("r", config.getTradespaceDimensionsInPx().markRadius)
        },
        getMax: function(data, attribute) {
            var maxValue = data[0][attribute];
            for (var i=0; i<data.length; i++) {
                maxValue = (data[i][attribute] > maxValue) ? data[i][attribute]: maxValue;
            }
            return maxValue;
        },
        getMin: function(data, attribute) {
            var minValue = data[0][attribute];
            for (var i=0; i<data.length; i++) {
                minValue = (data[i][attribute] < minValue) ? data[i][attribute]: minValue;
            }
            return minValue;
        }
    }
};