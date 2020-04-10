---
title: "Sizing Circles by Area Rather Than Radius"
date: 2020-04-07T18:16:50+02:00
series: ["D3"]
tags: ['scaleSqrt', 'scale']
categories: ["Javascript"]
---
<script src="//d3js.org/d3.v4.min.js"></script>

The `.scaleSqrt` scale is a special case of the power scale (where k = 0.5) and is {{< color blue >}}useful for sizing circles by area (rather than radius){{< /color >}}. 

When using circle size to represent data, it’s considered better practice to set the area, rather than the radius proportionally to the data:

{{< tabs "NewID" >}}
{{< tab "js" >}}
```js
var linearScale = d3.scaleLinear()
	.domain([0, 100])
	.range([0, 600]);

var sqrtScale = d3.scaleSqrt()
	.domain([0, 100])
	.range([0, 30]);

var myData = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

d3.select('#wrapper')
	.selectAll('circle')
	.data(myData)
	.enter()
	.append('circle')
	.attr('r', function(d) {
		return sqrtScale(d);
	})
	.attr('cx', function(d) {
		return linearScale(d);
	});
```
{{< /tab >}}

{{< tab ">>" >}}
<svg width="700" height="80">
  	<g id="sizingcircle" transform="translate(40, 40)">
  	</g>
</svg>

<script>

var linearScale = d3.scaleLinear()
	.domain([0, 100])
	.range([0, 600]);

var sqrtScale = d3.scaleSqrt()
	.domain([0, 100])
	.range([0, 30]);

var myData4 = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

d3.select('#sizingcircle')
	.selectAll('circle')
	.data(myData4)
	.enter()
	.append('circle')
	.attr('r', function(d) {
		return sqrtScale(d);
	})
	.attr('cx', function(d) {
		return linearScale(d);
	});

 </script>
{{< /tab >}}
{{< /tabs >}}