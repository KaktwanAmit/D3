var causes = ["Population2010", "Population2013"];

var margin = { top: 20, right: 10, bottom: 100, left: 40 },
    width = 1200 - margin.right - margin.left,
    height = 550 - margin.top - margin.bottom;

var x = d3.scale.ordinal()
    .rangeRoundBands([0, width]);

var y = d3.scale.linear()
    .rangeRound([height, 0]);

var z = d3.scale.category10();

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("right");

var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
//including json file
d3.json("jsonFile/Growth.json", function(error, crimea) {
    if (error) throw error;

    var layers = d3.layout.stack()(causes.map(function(c) {
        return crimea.map(function(d) {
            return { x: d.CountryName, y: d[c] };
        });
    }));

    x.domain(layers[0].map(function(d) {
        return d.x; 
    }));
    y.domain([0,1400]);
    var layer = svg.selectAll(".layer")
        .data(layers)
        .enter().append("g")
        .attr("class", "layer")
        .style("fill", function(d, i) {
            return z(i);
        });

    layer.selectAll("rect")
        .data(function(d) {
            return d;
        })
        .enter().append("rect")
        .attr("x", function(d) {
            return x(d.x);
        })
        .attr("y", function(d) {
            return y(d.y + d.y0);
        })
        .attr("height", function(d) {
            return y(d.y0) - y(d.y + d.y0);
        })
        .attr("width", x.rangeBand() - 1);
    // drawing x and y axis
    svg.append("g")
        .attr("class", "axis axis--x")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .selectAll("text")
        .attr("transform", "rotate(-60)")
        .style("text-anchor","end")
        .style("font-size", "15px")
        .attr()
        .append("text")
        .text("Countries")
        .attr("x", "30em")
        .attr("y", "3em")
        .style("font-size", "15px");
    svg.append("g")
        .attr("class", "axis axis--y")
        .call(yAxis)
        .append("text")
        .text("Population Growth in Millions")
        .attr("x", "-15em")
        .attr("y", "-1em")
        .attr("transform", "rotate(-90)")
        .style("font-size", "15px");

});
