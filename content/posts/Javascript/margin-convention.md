---
title: "Margin Convention"
date: 2020-04-23T17:37:01+02:00
series: ["D3"]
tags: ['axis']
categories: ["Javascript"]
---

First define an object with a property for each of the four sides (clockwise from the top, as in CSS) representing the respective margins in pixels; define also the `width` and `height` as the graphic’s outer dimensions.

```js
var margin = [{top: 20, right: 30, bottom: 30, left: 40}], 
	width = 600,
	height = 400;
```

{{< betonen gold >}}You may need to adjust the margins to fit your tick labels.{{< /betonen >}}


Secondly, define the x- and y-ranges ({{< code gold >}}scales{{< /code >}}) based on the inner dimensions of the chart. Note that the y-range is typically flipped to place `y = 0` at the bottom of the inner chart area.

```js
xScale = d3.scaleLinear()
			.domain([0, 100])
			.range([margin.left, width - margin.right]);

yScale = d3.scaleLinear()
			.domain([0,100])
			.range([height - margin.bottom, margin.top]);
```

Lastly, assign a view box to the SVG element to set the coordinate system, and define the x- and y-axes as functions that translate (`g`) the axes into the appropriate location based on the desired orientation.

```js
var svg = d3.select("body").append("svg")
    		.attr("width", width + margin.left + margin.right)
    		.attr("height", height + margin.top + margin.bottom);
svg    		
  .append("g")
    .attr("transform", "translate(0,"+ (height - margin.bottom) +")")
    .call(d3.axisBottom(xScale));
 
svg
  .append("g")
	.attr("transform", "translate(" + margin.left +", 0)")
    .call(d3.axisLeft(yScale));
```

{{< betonen gold >}}
Alternatively, instead of fixing the width/height we can use the viewBox attribute, i.e.

<code style="color:black;background-color:rgba(255, 180, 0, 0.2);">.attr("viewBox", [0, 0, width, height])</code>

You won’t need to assign width and height attributes, and when using a fixed width for a non-responsive graphic, the view box will cause the SVG element to resize automatically while preserving its aspect ratio.
{{< /betonen >}}

### An example

<div class="x-y">
	
</div>

<script src="https://d3js.org/d3.v5.min.js"></script>

<script>
var margin = {top: 20, right: 30, bottom: 30, left: 40}, 
	width = 600,
	height = 400;

xScale = d3.scaleLinear()
			.domain([0, 100])
			.range([margin.left, width - margin.right]);

yScale = d3.scaleLinear()
			.domain([0,100])
			.range([height - margin.bottom, margin.top]);


var svg = d3.select("div.x-y").append("svg")
    		.attr("width", width + margin.left + margin.right)
    		.attr("height", height + margin.top + margin.bottom)

svg  
  .append("g")
    .attr("transform", "translate(0," + (height - margin.bottom) + ")")
    .call(d3.axisBottom(xScale))

svg
  .append("g")
	.attr("transform", "translate(" + margin.left + ", 0)")
    .call(d3.axisLeft(yScale));

</script>