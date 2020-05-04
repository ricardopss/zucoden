---
title: "Create a x-y axis"
date: 2020-04-23T16:17:22+02:00
series: ["D3"]
tags: ['format']
categories: ["Javascript"]
---

Considering the [axes methods](/posts/javascript/methods-axes) in D3, to create a traditional x-y axis, we need to:
- define x and y scales
- create a bottom (x) axis
- create a left (y) axis

Use the [margin conventions](/posts/javascript/margin-convention).

{{< tabs "x-y" >}}
{{< tab "js" >}}
```js
var margin = {top: 20, right: 30, bottom: 30, left: 40}, 
	width = 500,
	height = 400;

xScale = d3.scaleLinear()
			.domain([0, 100])
			.range([margin.left, width - margin.right]);

yScale = d3.scaleLinear()
			.domain([0,100])
			.range([height - margin.bottom, margin.top]);

var svg = d3.select("body").append("svg")
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
``` 
{{< /tab >}}
{{< tab ">>" >}}
<iframe src="/blocks/x-y-axis.html" scrolling="yes" marginwidth="0" marginheight="0" style="width:100%; height:400px; border:none"></iframe>
{{< /tab >}}
{{< /tabs >}} 
