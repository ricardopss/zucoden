---
title: "Methods Axes"
date: 2020-04-22T16:07:38+02:00
series: ["D3"]
tags: ['axisTop', 'axisRight', 'axisBottom', 'axisLeft', 'axis', 'scale', 'ticks', 'tickArguments', 'tickValues', 'tickFormat', 'tickSize', 'tickSizeInner', 'tickSizeOuter', 'tickPadding']
categories: ["Javascript"]
---

Human-readable reference marks for scales, i.e. axis are the graphical representations of scale and therefore, before calling an axis, we need to define a scale:

```js
var data = d3.ticks(0, 100, 10); // [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]
 
//define a scale
var scaleData = d3.scaleLinear()
					.domain([d3.min(data), d3.max(data)])
					.range([0, width - 100]);

//define an axis = f(scale)
var axis = d3.axisBottom()
				.scale(scaleData);

//call the axis
d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height)
  .append("g")
    .attr("transform", "translate(30,30)")
    .call(axis);
```

## `d3.axisBottom()`
create a new bottom-oriented axis generator.

{{< tabs "Axes01" >}}
{{< tab "js" >}}
```js
var xAxis = d3.axisBottom()
        		.scale(scaleData); 
``` 
{{< /tab >}}
{{< tab ">>" >}}
<iframe src="/blocks/methods-axes01.html" scrolling="yes" marginwidth="0" marginheight="0" style="width:100%; height:50px; border:none"></iframe>
{{< /tab >}}
{{< /tabs >}}


## `d3.axisTop()`
create a new top-oriented axis generator.

{{< tabs "Axes02" >}}
{{< tab "js" >}}
```js
var xAxis = d3.axisTop()
        		.scale(scaleData); 
``` 
{{< /tab >}}
{{< tab ">>" >}}
<iframe src="/blocks/methods-axes02.html" scrolling="yes" marginwidth="0" marginheight="0" style="width:100%; height:50px; border:none"></iframe>
{{< /tab >}}
{{< /tabs >}}


## `d3.axisRight()`
create a new right-oriented axis generator.

{{< tabs "Axes03" >}}
{{< tab "js" >}}
```js
var xAxis = d3.axisRight()
        		.scale(scaleData); 
``` 
{{< /tab >}}
{{< tab ">>" >}}
<iframe src="/blocks/methods-axes03.html" scrolling="yes" marginwidth="0" marginheight="0" style="width:100%; height:250px; border:none"></iframe>
{{< /tab >}}
{{< /tabs >}}


## `d3.axisLeft()`
create a new left-oriented axis generator.

{{< tabs "Axes04" >}}
{{< tab "js" >}}
```js
var xAxis = d3.axisLeft()
        		.scale(scaleData); 
``` 
{{< /tab >}}
{{< tab ">>" >}}
<iframe src="/blocks/methods-axes04.html" scrolling="yes" marginwidth="0" marginheight="0" style="width:100%; height:250px; border:none"></iframe>
{{< /tab >}}
{{< /tabs >}}

## `axis`
Render the axis to the given context, which may be either a selection of SVG containers (either SVG or G elements) or a corresponding transition.

### `axis.scale`
If scale is specified, sets the scale and returns the axis. If scale is not specified, returns the current scale.

```js
var xAxis = d3.axisBottom()
        		.scale(scaleData); 
```

### `axis.ticks(arguments)`
Customize how ticks are generated and formatted. This method can also be indirectly called by `scale.ticks()`.

An optional _count_ argument requests more or fewer ticks. The number of ticks returned, however, is not necessarily equal to the requested count. Ticks are restricted to nicely-rounded values (multiples of 1, 2, 5 and powers of 10), and the scale’s domain can not always be subdivided in exactly count such intervals.

{{< tabs "Axes05" >}}
{{< tab "js" >}}
```js
var xAxis = d3.axisBottom()
        .scale(scaleData)
        .ticks(20); 
``` 
{{< /tab >}}
{{< tab ">>" >}}
<iframe src="/blocks/methods-axes05.html" scrolling="yes" marginwidth="0" marginheight="0" style="width:100%; height:50px; border:none"></iframe>
{{< /tab >}}
{{< /tabs >}}

### `axis.tickArguments`
Customize how ticks are generated and formatted. Can be interpreted as `.ticks()` with `.tickFormat()`. 

If arguments is specified, sets the arguments that will be passed to `axis.ticks` and `axis.tickFormat`. The meaning of the arguments depends on the axis’ scale type: most commonly, the arguments are a suggested count for the number of ticks (or a time interval for time scales), and an optional format specifier to customize how the tick values are [formatted](/posts/javascript/d3-format).

{{< tabs "Axes06" >}}
{{< tab "js" >}}
```js
var xAxis = d3.axisBottom()
        .scale(scaleData)
        .tickArguments([5, ".2f"]); 
``` 
{{< /tab >}}
{{< tab ">>" >}}
<iframe src="/blocks/methods-axes06.html" scrolling="yes" marginwidth="0" marginheight="0" style="width:100%; height:50px; border:none"></iframe>
{{< /tab >}}
{{< /tabs >}}

### `axis.tickValues`
Set the tick values explicitly.

{{< tabs "Axes07" >}}
{{< tab "js" >}}
```js
var xAxis = d3.axisBottom()
        .scale(scaleData)
        .tickValues([0, 3, 7, 11, 37, 51, 75, 90, 100]); 
``` 
{{< /tab >}}
{{< tab ">>" >}}
<iframe src="/blocks/methods-axes07.html" scrolling="yes" marginwidth="0" marginheight="0" style="width:100%; height:50px; border:none"></iframe>
{{< /tab >}}
{{< /tabs >}}

### `axis.tickFormat`
Set the tick [format](/posts/javascript/d3-format) explicitly 

{{< tabs "Axes08" >}}
{{< tab "js" >}}
```js
var xAxis = d3.axisBottom()
        .scale(scaleData)
        .tickFormat(d3.format("$")); 
``` 
{{< /tab >}}
{{< tab ">>" >}}
<iframe src="/blocks/methods-axes08.html" scrolling="yes" marginwidth="0" marginheight="0" style="width:100%; height:50px; border:none"></iframe>
{{< /tab >}}
{{< /tabs >}}

### `axis.tickSize`
Set the size of the ticks.

{{< tabs "Axes09" >}}
{{< tab "js" >}}
```js
var xAxis = d3.axisTop()
        .scale(scaleData)
        .tickSize(25); 
``` 
{{< /tab >}}
{{< tab ">>" >}}
<iframe src="/blocks/methods-axes09.html" scrolling="yes" marginwidth="0" marginheight="0" style="width:100%; height:50px; border:none"></iframe>
{{< /tab >}}
{{< /tabs >}}

### `axis.tickSizeInner`
Set the size of inner ticks.

{{< tabs "Axes10" >}}
{{< tab "js" >}}
```js
var xAxis = d3.axisBottom()
        .scale(scaleData)
        .tickSizeInner(25); 
``` 
{{< /tab >}}
{{< tab ">>" >}}
<iframe src="/blocks/methods-axes10.html" scrolling="yes" marginwidth="0" marginheight="0" style="width:100%; height:50px; border:none"></iframe>
{{< /tab >}}
{{< /tabs >}}

### `axis.tickSizeOuter`
Set the size of outer (extent/end) ticks.

{{< tabs "Axes11" >}}
{{< tab "js" >}}
```js
var xAxis = d3.axisBottom()
        .scale(scaleData)
        .tickSizeOuter([30]);
``` 
{{< /tab >}}
{{< tab ">>" >}}
<iframe src="/blocks/methods-axes011.html" scrolling="yes" marginwidth="0" marginheight="0" style="width:100%; height:50px; border:none"></iframe>
{{< /tab >}}
{{< /tabs >}}

### `axis.tickPadding`
Set the padding between ticks and labels.

{{< tabs "Axes12" >}}
{{< tab "js" >}}
```js
var xAxis = d3.axisBottom()
        .scale(scaleData)
        .tickPadding([30]); 
``` 
{{< /tab >}}
{{< tab ">>" >}}
<iframe src="/blocks/methods-axes12.html" scrolling="yes" marginwidth="0" marginheight="0" style="width:100%; height:50px; border:none"></iframe>
{{< /tab >}}
{{< /tabs >}}