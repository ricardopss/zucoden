---
title: "Create Bar Chart with `.scaleBand`"
date: 2020-04-08T18:52:41+02:00
series: ["D3"]
tags: ['scale', 'scaleBand', 'paddingInner', 'paddingOuter', 'bandwidth']
categories: ["Javascript"]
---

<script src="//d3js.org/d3.v4.min.js"></script>

When creating bar charts `.scaleBand` helps to determine the {{< color blue >}}geometry of the bars{{< /color >}}, taking into account padding between each bar. The domain is specified as: 

- an array of values (one value for each band); and 
- the range as the minimum and maximum extents of the bands (e.g. the total width of the bar chart).

In effect `.scaleBand` will split the range into _n bands_ (where _n_ is the number of values in the domain array) and compute the positions and widths of the bands taking into account any specified padding.

{{< tabs "BarChart" >}}
{{< tab "js" >}}
```js
var myData = [
	{day : 'Mon', value: 10},
	{day : 'Tue', value: 40},
	{day : 'Wed', value: 30},
	{day : 'Thu', value: 60},
	{day : 'Fri', value: 30}
];

var bandScale = d3.scaleBand()
	.domain(['Mon', 'Tue', 'Wed', 'Thu', 'Fri'])
	.range([0, 200])
	.paddingInner(0.05);

d3.select('#wrapper')
	.selectAll('rect')
	.data(myData)
	.enter()
	.append('rect')
	.attr('y', function(d) {
		return bandScale(d.day);
	})
	.attr('height', bandScale.bandwidth())
	.attr('width', function(d) {
		return d.value;
	}); 
``` 
{{< /tab >}}
{{< tab ">>" >}}

<style>
rect {
  fill: #ddd;
}
rect:hover {
  fill: gold;
}
text {
  text-anchor: bottom;
}
</style>

<svg width="700" height="260">
  <g id="wrapper" transform="translate(40, 20)">
  </g>
</svg>

<script>
var myData = [
	{day : 'Mon', value: 10},
	{day : 'Tue', value: 40},
	{day : 'Wed', value: 30},
	{day : 'Thu', value: 55},
	{day : 'Fri', value: 90}
];

var bandScale = d3.scaleBand()
	.domain(['Mon', 'Tue', 'Wed', 'Thu', 'Fri'])
	.range([0, 200])
	.paddingInner(0.05);

d3.select('#wrapper')
	.selectAll('rect')
	.data(myData)
	.enter()
	.append('rect')
	.attr('y', function(d) {
		return bandScale(d.day);
	})
	.attr('height', bandScale.bandwidth())
	.attr('width', function(d) {
		return d.value;
	});

d3.select('#wrapper')
	.selectAll('svg .rect')
	.data(myData)
	.enter()
	.append('text')
	.attr('y', function(d) {
		return bandScale(d.day) + 25;
	})
	.attr('x', -35)
	.text(function(d) {
		return d.day;
	});	
</script>

{{< /tab >}}
{{< /tabs >}}

