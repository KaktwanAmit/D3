var margin = {top: 40, right: 20, bottom: 40, left: 70},
    width = 1200 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;
var formatPercent = d3.format(".0%");
var x = d3.scale.ordinal()
    .rangeRoundBands([0, width], .1);
var y = d3.scale.linear()
    .range([height, 0]);
var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");
var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");
var tip = d3.tip()
    .attr('class', 'd3-tip')
    .offset([-10, 0])
    .html(function(d) {
    return "<strong>GDP:</strong> <span style='color:red'>" + d.GDPBillion + "</span>";
  })
var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
svg.call(tip); 
d3.json('jsonFile/plots.json', function(error, data) {
    x.domain(data.map(function(d) { return d.CountryName; }));
    y.domain([0, d3.max(data, function(d) { return +d.GDPBillion; })]);
  svg.append("g")
      .attr("class", "x axis")
   
     .attr("transform", "translate(0," + height+ ")")
      .call(xAxis)
      .append('text')
      // .attr("transform","rotate(-60)")
      .attr("x", 550)
      .attr("y", 37)
      .text("CountryName");
      // .attr("transform", "rotate(-90)");
  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("GDP");
  svg.selectAll(".bar")
      .data(data)
      .enter().append("rect")
      .attr("class", "bar")
      // .attr("transform", "rotate(-60)")
      .attr("x", function(d) { return x(d.CountryName); })
      .attr("width", x.rangeBand())
      .attr("y", function(d) { return y(+d.GDPBillion); })
      .attr("height", function(d) { return height - y(+d.GDPBillion); })
      .on('mouseover', tip.show) 
      .on('mouseout', tip.hide)
      .transition().duration(3000)
      .delay(function(d,i){
        return i*200;
    })
});