---
title: "Forces"
date: 2020-03-28T17:25:05+01:00
series: ["D3"]
tags: ['enter', 'append', 'exit', 'merge']
categories: ["Javascript"]
---

{{< tabs "NewID" >}}
{{< tab "js" >}}
```js
function buttonClick(datapoint) {
		
	var maxValue = d3.max(incomingData, d => parseFloat(d[datapoint]));
	var radiusScale = d3.scaleLinear()
						.domain([ 0, maxValue ]).range([ 2, 20 ]);
			
	var selectedG = d3.selectAll("g.overallG");
	selectedG
		.select("circle")
		.transition().duration(1500)
		.attr("r", d => radiusScale(d[datapoint]));

	//ADD LABELS
	//selectedG
	//	.select("text.label-status")
	//	.text(d=> (d[datapoint] > 0) ? d[datapoint] : null);
}
``` 
{{< /tab >}}
{{< tab ">>" >}}
<iframe src="/blocks/firstBlock.html" scrolling="yes" marginwidth="0" marginheight="0" style="width:100%; height:150px; border:none">
</iframe>
{{< /tab >}}
{{< /tabs >}}

<iframe src="/blocks/secondBlock.html" scrolling="yes" marginwidth="0" marginheight="0" style="width:100%; height:150px; border:none">
</iframe>