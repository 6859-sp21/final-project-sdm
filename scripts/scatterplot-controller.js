const scatterPlot = {
    generate: function(divId, data) {

        // CLEAR PREVIOUS SCATTERPLOT
        d3.select(divId).html("");
    
        const width = config.getTradespaceDimensionsInPx().width;
        const height = config.getTradespaceDimensionsInPx().height;
        const margin = config.getTradespaceDimensionsInPx().margin;
        const maxCost = this._private.getMax(data, "cost");;
        const maxUtility = this._private.getMax(data, "utility");
        const minCost = this._private.getMin(data, "cost");;
        const minUtility = this._private.getMin(data, "utility");
        const markRadius = config.getTradespaceDimensionsInPx().markRadius;
        var xAxisLabel = globalState["xAxisLabel"];
        var yAxisLabel = globalState["yAxisLabel"];
        const tooltipWidth = 70;   // px
        const tooltipHeight = 40;   // px
        const tooltipTextMarginLeft = 5;   // px
    
        var svg = d3.select(divId)
            .append("svg")
                .attr("width", width)
                .attr("height", height)
                .attr("id", "svg-tradespace");
        
        var xAxis = d3.scaleLinear()
            .domain([minCost, maxCost])
            .range([margin, width - margin]);
        svg.append("g")
            .attr("transform", `translate(0,${height - margin})`)
            .call(d3.axisBottom(xAxis));
        svg.append("text")
            .attr("x", width / 3)
            .attr("y", height - 10)
            .text(xAxisLabel)
                .on("click", function() {
                    globalState["axisToUpdate"] = "xAxisLabel";
                    view.displayLabelChangerOverlay();
                });    

        var yAxis = d3.scaleLinear()
            .domain([minUtility, maxUtility])
            .range([height - margin, margin]);
        svg.append("g")
            .attr("transform", `translate(${margin}, 0)`)
            .call(d3.axisLeft(yAxis));
        svg.append("text")
            .attr("x", -1 * height / 3)
            .attr("y", 10)
            .text(yAxisLabel)
            .attr("transform", "rotate(-90)")
            .on("click", function() {
                globalState["axisToUpdate"] = "yAxisLabel";
                view.displayLabelChangerOverlay();
            });
    
        svg.append("g")
            .selectAll("circle")
            .data(data)
            .enter()
            .append("circle")
                .attr("id", function(d) {return d.id})
                .attr("cx", function(d) {return xAxis(d.cost)})
                .attr("cy", function(d) {return yAxis(d.utility)})
                .attr("r", markRadius)
                .on('mouseover', this._private.onMouseOverMark)
                .on('mouseout', this._private.onMouseOutMark)
                .on('click', function() {

                    const conceptMark = d3.select(this);
                    const conceptMarkId = conceptMark.property("id");
                    const choiceOptions = conceptMarkId.split("-");
                    // FILL OVERLAY POPUP WITH INFORMATION ABOUT CONCEPT
                    const conceptInfoDiv = d3.select("#concept-info");
                    var html = "";
                    for (var i=0; i<choiceOptions.length; i++) {
                        const choiceOptionCode = choiceOptions[i];
                        const choiceOption = d3.select(`#${choiceOptionCode}`).html();
                        const designDecisionCode = choiceOptionCode.substr(0,3);
                        const designDecision = d3.select(`#${designDecisionCode}`).html();
                        html += `<b>${designDecision}</b> ${choiceOption}<br/>`;
                    }
                    conceptInfoDiv.html(html);
                    // OPEN OVERLAY POPUP
                    view.displayConceptInfoOverlay();
            });
        
        var tooltipGroups = svg.append("g");

        tooltipGroups.selectAll("rect")
            .data(data)
            .enter()
            .append("rect")
                .attr("id", function(d) {return `tooltip-box-${d.id}`})
                .attr("width",tooltipWidth)
                .attr("height",tooltipHeight)
                .attr("x", function(d) {return xAxis(d.cost) + markRadius})
                .attr("y", function(d) {return yAxis(d.utility) + markRadius})
                .classed("concept-tooltip-box", true);

        tooltips = tooltipGroups.selectAll("text")
            .data(data)
            .enter()
            .append("text")
                .attr("id", function(d) {return `tooltip-text-${d.id}`})
                .attr("x", function(d) {return xAxis(d.cost) + markRadius + tooltipTextMarginLeft})
                .attr("y", function(d) {return yAxis(d.utility) + markRadius + (tooltipHeight / 4)})
                .classed("concept-tooltip-text", true);

        tooltips.append("tspan").text(function(d) {
                const xAxisLabel = globalState["xAxisLabel"];
                const xAxisValue = Math.round(d.cost);
                return `${xAxisLabel}: ${xAxisValue}`
            })
            .attr("x", function(d) {return xAxis(d.cost) + markRadius + tooltipTextMarginLeft})
            .attr("dx", tooltipTextMarginLeft)
            .attr("dy", 5);

        tooltips.append("tspan").text(function(d) {
            const yAxisLabel = globalState["yAxisLabel"];
            const yAxisValue = Math.round(d.utility);
            return `${yAxisLabel}: ${yAxisValue}`
        })
        .attr("x", function(d) {return xAxis(d.cost) + markRadius + tooltipTextMarginLeft})
        .attr("dx", tooltipTextMarginLeft)
        .attr("dy", 15);
    },
    _private: {
        onMouseOverMark: function () {
            const conceptMark = d3.select(this);
            scatterPlot._private.hoverEvents(conceptMark, true);
        },
        onMouseOutMark: function () {
                const conceptMark = d3.select(this);
                scatterPlot._private.hoverEvents(conceptMark, false);
            // }
        },
        hoverEvents: function(conceptMark, isMouseOver) {
            
            const conceptMarkId = conceptMark.property("id");
            const choiceOptions = conceptMarkId.split("-");
            const isMarkSelected = !conceptMark.classed("unselected");

            if (isMarkSelected) {
                if (isMouseOver) {
                    // SELECT CHOICE OPTIONS
                    for (var i=0; i<choiceOptions.length; i++) {
                        d3.select(`#${choiceOptions[i]}`).classed("selected", true);
                    }
                    scatterPlot._private.displayTooltip(conceptMarkId, true);
                } else {
                    // UNSELECT CHOICE OPTIONS (THAT ARE NOT PRE-SELECTED)
                    const preselectedChoiceOptions = globalState["selectedOptions"];
                    for (var i=0; i<choiceOptions.length; i++) {
                        if (preselectedChoiceOptions.indexOf(choiceOptions[i]) < 0) {
                            d3.select(`#${choiceOptions[i]}`).classed("selected", false);
                        }
                    }
                    scatterPlot._private.displayTooltip(conceptMarkId, false);
                }
            }
        },
        displayTooltip: function(choiceOptionIds, displayFlag) {
            const displayValue = (displayFlag) ? "block" : "none";
            d3.select(`#tooltip-box-${choiceOptionIds}`).style("display", displayValue);
            d3.select(`#tooltip-text-${choiceOptionIds}`).style("display", displayValue);
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