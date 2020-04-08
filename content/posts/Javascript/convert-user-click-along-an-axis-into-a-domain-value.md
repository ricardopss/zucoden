---
title: "Convert user´s click along an axis into a domain value"
date: 2020-04-07T17:58:25+02:00
series: ["D3"]
tags: ['.scaleLinear', '.invert', 'scale']
categories: ["Javascript"]
---
<style>
  rect {
	fill: #ccc;
	cursor: pointer;
  }
  .info {
	margin-left: 20px;
  }
</style>

<script src="//d3js.org/d3.v4.min.js"></script>

A common use of the `.invert()` method that allows us to determine a scale function’s input value given an output value is when we want to convert a user’s click along an axis into a domain value:

{{< tabs "ConvertUserClick" >}}
{{< tab "js" >}}
```html
<svg width="700" height="80">
	<g transform="translate(20, 10)">
  	<g class="axis" transform="translate(0, 40)"></g>
  	<rect class="click-area"></rect>
  </g>
</svg>

<div class="info">Click on the grey band</div>

<script>
var width = 600;

var linearScale = d3.scaleLinear()
  .domain([-50, 50])
  .range([0, width])
  .nice();

var clickArea = d3.select('.click-area').node();

function doClick() {
	var pos = d3.mouse(clickArea);
	var xPos = pos[0];
	var value = linearScale.invert(xPos);
	d3.select('.info')
		.text('You clicked ' + value.toFixed(2));
}

// Construct axis
var axis = d3.axisBottom(linearScale);
d3.select('.axis')
	.call(axis);

// Update click area size
d3.select('.click-area')
	.attr('width', width)
	.attr('height', 40)
	.on('click', doClick);

</script>
``` 
{{< /tab >}}
{{< tab ">>" >}}
<svg width="700" height="80">
	<g transform="translate(20, 10)">
  	<g class="axis" transform="translate(0, 40)"></g>
  	<rect class="click-area"></rect>
  </g>
</svg>

<div class="info">Click on the grey band</div>

<script>
var width = 600;

var linearScale = d3.scaleLinear()
  .domain([-50, 50])
  .range([0, width])
  .nice();

var clickArea = d3.select('.click-area').node();

function doClick() {
	var pos = d3.mouse(clickArea);
	var xPos = pos[0];
	var value = linearScale.invert(xPos);
	d3.select('.info')
		.text('You clicked ' + value.toFixed(2));
}

// Construct axis
var axis = d3.axisBottom(linearScale);
d3.select('.axis')
	.call(axis);

// Update click area size
d3.select('.click-area')
	.attr('width', width)
	.attr('height', 40)
	.on('click', doClick);

</script>
{{< /tab >}}
{{< /tabs >}}

