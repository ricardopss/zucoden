---
title: "Colour Interpolators"
date: 2020-04-07T14:10:01+02:00
series: ["D3"]
tags: ['scale', 'scaleSequential']
categories: ["Javascript"]
---
<script src="//d3js.org/d3.v4.min.js"></script>
<script src="https://d3js.org/d3-color.v1.min.js"></script>
<script src="https://d3js.org/d3-interpolate.v1.min.js"></script>
<script src="https://d3js.org/d3-scale-chromatic.v1.min.js"></script>

<script>
	var dataBase = d3.range(0, 100, 1);

	var interpolDiverge = [
	'interpolateBrBG',
	'interpolatePRGn',
	'interpolatePiYG',
	'interpolatePuOr',
	'interpolateRdBu',
	'interpolateRdGy',
	'interpolateRdYlBu',
	'interpolateRdYlGn',
	'interpolateSpectral'
	];

	var interpolSingleHue = [
	'interpolateBlues',
	'interpolateGreens',
	'interpolateGreys',
	'interpolateOranges',
	'interpolatePurples',
	'interpolateReds'
	];

	var interpolMultiHue = [
	'interpolateTurbo',
	'interpolateViridis',
	'interpolateInferno',
	'interpolateMagma',
	'interpolatePlasma',
	'interpolateCividis',
	'interpolateWarm',
	'interpolateCool',
	'interpolateCubehelixDefault',
	'interpolateBuGn',
	'interpolateBuPu',
	'interpolateGnBu',
	'interpolateOrRd',
	'interpolatePuBuGn',
	'interpolatePuBu',
	'interpolatePuRd',
	'interpolateRdPu',
	'interpolateYlGnBu',
	'interpolateYlGn',
	'interpolateYlOrBr',
	'interpolateYlOrRd'
	];	

	var interpolCycle = [
	'interpolateRainbow',
	'interpolateSinebow'
	];

var linearScaleBars = d3.scaleLinear()
	.domain([0, 100])
	.range([0, 600]);

var sequentialScaleBars = d3.scaleSequential()
	.domain([0, 100]);

function dots(d) {
	sequentialScaleBars
		.interpolator(d3[d]);

	d3.select(this)
		.append('text')
		.attr('y', -10)
		.text(d);

	d3.select(this)
		.selectAll('rect')
		.data(dataBase)
		.enter()
		.append('rect')
		.attr('x', function(d) {
			return linearScaleBars(d);
		})
		.attr('width', 11)
		.attr('height', 30)
		.style('fill', function(d) {
			return sequentialScaleBars(d);
		});
}

function teilen(d){
	d3.select(this)
	  .append('g')
	  .classed('interpolator', true)
      .attr('transform', 'translate(0,30)')
      .each(dots);
}
</script>

## Diverging
<div id='coloursdiverging'></div>

<script>
d3.select('#coloursdiverging')
	.selectAll('svg.diverging')
	.data(interpolDiverge)
	.enter()
	.append('svg')
	.classed('diverging', true)
	.attr('width', '700')
	.attr('height', '70')
	.each(teilen);
</script>

## Sequential (Single Hue)
<div id='coloursshue'></div>

<script>
d3.select('#coloursshue')
	.selectAll('svg.shue')
	.data(interpolSingleHue)
	.enter()
	.append('svg')
	.classed('shue', true)
	.attr('width', '700')
	.attr('height', '70')
	.each(teilen);
</script>

## Sequential (Multi-Hue)
<div id='coloursmhue'></div>

<script>
d3.select('#coloursmhue')
	.selectAll('svg.mhue')
	.data(interpolMultiHue)
	.enter()
	.append('svg')
	.classed('mhue', true)
	.attr('width', '700')
	.attr('height', '70')
	.each(teilen);
</script>

## Cyclical

<div id='colourscycle'></div>

<script>
d3.select('#colourscycle')
	.selectAll('svg.cycle')
	.data(interpolCycle)
	.enter()
	.append('svg')
	.classed('cycle', true)
	.attr('width', '700')
	.attr('height', '70')
	.each(teilen);
</script>
