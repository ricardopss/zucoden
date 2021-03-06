// set the dimensions and margins of the graph
var margin = {top: 30, right: 30, bottom: 70, left: 60},
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#my_dataviz")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

// Parse the Data
d3.csv("Book3.csv", function(data) {

// X axis
var x = d3.scaleBand()
          .range([ 0, width ])
          .domain(data.map(function(d) { return d.Worthäufigkeit; }))
          .padding(0.05);


svg.append("g")
   .attr("transform", "translate(0," + height + ")")
   .call(d3.axisBottom(x))
   .selectAll("text")
   .attr("transform", "translate(+14,0)rotate(0)")
   .style("text-anchor", "end");

// Add Y axis
var y = d3.scaleLinear()
          .domain([0, 250])
          .range([ height, 0]);

svg.append("g")
          

// Bars
svg.selectAll("mybar")
   .data(data)
   .enter()
   .append("rect")
   .attr("x", function(d) { return x(d.Worthäufigkeit); })
   .attr("y", function(d) { return y(d.Value); })
   .attr("width", x.bandwidth())
   .attr("height", function(d) { return height - y(d.Value); })
   .attr("fill", "#107dac")

})
