---
title: "Add Axis Title"
date: 2020-04-23T16:17:29+02:00
series: ["D3"]
tags: ['format']
categories: ["Javascript"]
---

```js
var svg = d3.select("body").append("svg")
    		.attr("width", width + margin.left + margin.right)
    		.attr("height", height + margin.top + margin.bottom)

// Add X axis label:
svg.append("text")
    .attr("text-anchor", "end")
    .attr("x", width)
    .attr("y", height + margin.top)
    .style("font-family","sans-serif")
    .style("font-size","16px")    
    .text("X axis title");

// Y axis label:
svg.append("text")
    .attr("text-anchor", "middle")
    .attr("y", -margin.left + 80)
    .attr("x", margin.top -70)
    .attr("transform", "rotate(-90)")
    .style("font-family","sans-serif")
    .style("font-size","16px")
    .text("Y axis title")
```

<iframe src="/blocks/add-axis-title.html" scrolling="yes" marginwidth="0" marginheight="0" style="width:100%; height:500px; border:none"></iframe>