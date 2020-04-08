---
title: "Scales Functions"
date: 2020-03-28T17:23:50+01:00
series: ["D3"]
tags: ['scale', 'scaleLinear', 'scalePow', 'scaleSqrt', 'scaleLog', 'scaleTime', 'scaleSequential','scaleQuantile', 'scaleQuantize', 'scaleThreshold', 'scaleOrdinal', 'scaleBand', 'scalePoint', 'unknown', 'schemePaired', 'clamp', 'nice', 'invert', 'extent', 'domain', 'range', 'quantiles', 'bandwidth', 'paddingInner', 'paddingOuter', 'step']
categories: ["Javascript"]
---
<script>
	var dataBase = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
	var dataPositive = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
	var dataPercentage = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
</script>

<script src="//d3js.org/d3.v4.min.js"></script>

For data set we well use the OnlineRetail.csv:

To split the data randomly into subsets, use the `.randomSplit()` method of PySpark.

E.g. to split the OnlineRetail data into three sets:

{{< code gold>}}Scale functions{{< /code >}} are JavaScript functions that:

- take an input (usually a number, date or category) and
- return a value (such as a coordinate, a colour, a length or a radius)

They’re typically used to {{< color blue >}}transform (or ‘map’){{< /color >}} data values into visual variables (such as position, length and colour). Eg., suppose we have some data:

```js
[ 0, 2, 3, 5, 7.5, 9, 10 ]
```
we can create a scale function using:

{{< tabs "Scales1" >}}
{{< tab "js" >}}
```js
var myScale = d3.scaleLinear()
  .domain([0, 10])
  .range([0, 600]);
``` 
{{< /tab >}}
{{< tab ">>" >}}
<style>
.scale1 text {
	text-anchor: middle;
}
</style>

<svg width="700" height="40">
	<g class="scale1" transform="translate(40, 30)">
  	</g>
</svg>

<script>
var data1 = [ 0, 2, 3, 5, 7.5, 9, 10 ];

var myScale = d3.scaleLinear()
  .domain([0, 10])
  .range([0, 600]);

d3.select('svg .scale1')
	.selectAll('circle')
	.data(data1)
	.enter()
	.append('circle')
	.attr('r', 3)
	.attr('cx', function(d) {
		return myScale(d);
	});

d3.select('svg .scale1')
	.selectAll('text')
	.data(data1)
	.enter()
	.append('text')
	.attr('x', function(d) {
		return myScale(d);
	})
	.attr('y', -8)
	.text(function(d) {
		return d;
	});

</script>
{{< /tab >}}
{{< /tabs >}}

D3 creates a function `myScale` which accepts input between 0 and 10 ({{< color blue >}}the domain{{< /color >}}) and maps it to output between 0 and 600 ({{< color blue >}}the range{{< /color >}}).

We can use `myScale` to calculate positions based on the data:
```js
myScale(0);   		// returns 0
myScale(2);   		// returns 120
myScale(3);   		// returns 180
					//...
myScale(10);		// returns 600
```
Scales are mainly used for {{< code gold>}}transforming (mapping){{< /code >}} data values to visual variables such as position, length and colour.

For example they can transform:

- data values into lengths between 0 and 500 for a bar chart
- data values into positions between 0 and 200 for line charts
- % change data (+4%, +10%, -5% etc.) into a continuous range of colours (with red for negative and green for positive)
dates into positions along an x-axis.

## Constructing scales
(In this section we’ll just focus on linear scales as these are the most commonly used scale type. We’ll cover other types later on.)

To create a linear scale we use `.scaleLinear()` and to configure the _input bounds_ (the domain) as well as the _output bounds_ (the range), we use, respectivelly, `.domain()` and `.range()`:

```js
var myScale = d3.scaleLinear();

myScale
  .domain([0, 100])
  .range([0, 800]);
```

{{< betonen red >}}
Version 4 uses a different naming convention to v3.: 
- v4: <code style="color:black;background-color:rgba(255, 0, 0, 0.2);">d3.scaleLinear()</code> 
- v3: <code style="color:black;background-color:rgba(255, 0, 0, 0.2);">d3.scale.linear()</code>
{{< /betonen >}}

Now `myScale` is a function that accepts input between 0 and 100 and linearly maps it to between 0 and 800.

```js
myScale(0);    // returns 0
myScale(50);   // returns 400
myScale(100);  // returns 800
```

Try experimenting with scale functions by copying code fragments and pasting them into the console or using a web-based editor such as JS Bin.

## D3 scale types
D3 has around 12 different scale types (scaleLinear, scalePow, scaleQuantise, scaleOrdinal etc.) and broadly speaking they can be classified into 3 groups:

- [scales with continuous input and continuous output](#scales-with-continuous-input-and-continuous-output)
- [scales with continuous input and discrete output](#scales-with-continuous-input-and-discrete-output)
- [scales with discrete input and discrete output](#scales-with-discrete-input-and-discrete-output)

We’ll now look at these 3 categories one by one.

## Scales with continuous input and continuous output
In this section we cover scale functions that map from a continuous input domain to a continuous output range.

### scaleLinear
Linear scales are probably the most commonly used scale type as they are the most suitable scale for {{< color blue >}}transforming data values into positions and lengths{{< /color >}}.

They use a linear function {{< code gold >}}y = m * x + b{{< /code >}} to interpolate across the domain and range:

{{< tabs "Scale2" >}}
{{< tab "js" >}}
```js
var linearScale = d3.scaleLinear()
  .domain([0, 10])
  .range([0, 600]);

linearScale(0);   // returns 0
linearScale(5);   // returns 300
linearScale(10);  // returns 600
```
{{< /tab >}}
{{< tab ">>" >}}
<svg width="700" height="40">
	<g class="scale2" transform="translate(40, 30)">
  	</g>
</svg>

<script>
var myScaleLinear = d3.scaleLinear()
  .domain([0, 10])
  .range([0, 600]);

d3.select('svg .scale2')
	.selectAll('circle')
	.data(dataBase)
	.enter()
	.append('circle')
	.attr('r', 3)
	.attr('cx', function(d) {
		return myScaleLinear(d);
	});

d3.select('svg .scale2')
	.selectAll('text')
	.data(dataBase)
	.enter()
	.append('text')
	.attr('x', function(d) {
		return myScaleLinear(d);
	})
	.attr('y', -8)
	.text(function(d) {
		return d;
	});

</script>
{{< /tab >}}
{{< /tabs >}}

Typical uses are to transform data values into positions and lengths, so when creating bar charts, line charts (as well as many other chart types) they are the scale to use. 

The output range can also be specified as {{< color blue >}}colours{{< /color >}}:

```js
var linearScale = d3.scaleLinear()
  .domain([0, 10])
  .range(['yellow', 'red']);

linearScale(0);   // returns "rgb(255, 255, 0)"
linearScale(5);   // returns "rgb(255, 128, 0)"
linearScale(10);  // returns "rgb(255, 0, 0)"
```

This can be useful for visualisations such as {{< code gold >}}choropleth maps{{< /code >}}, but also consider `.scaleQuantize`, `.scaleQuantile` and `.scaleThreshold`.

### scalePow
More included for completeness, rather than practical usefulness, the power scale interpolates using a power {{< code gold >}}y = m * x^k + b{{< /code >}} function. The exponent `k` is set using `.exponent()`:

{{< tabs "Scale3" >}}
{{< tab "js" >}}
```js
var powerScale = d3.scalePow()
  .exponent(0.5)
  .domain([0, 10])
  .range([0, 600]);

powerScale(0);   // returns 0
powerScale(5);  // returns 424.26...
powerScale(10); // returns 600 
``` 
{{< /tab >}}
{{< tab ">>" >}}
<svg width="700" height="40">
	<g class="scale3" transform="translate(40, 30)">
  	</g>
</svg>

<script>
var myScalePow = d3.scalePow()
  .exponent(0.5)
  .domain([0, 10])
  .range([0, 600]);

d3.select('svg .scale3')
	.selectAll('circle')
	.data(dataBase)
	.enter()
	.append('circle')
	.attr('r', 3)
	.attr('cx', function(d) {
		return myScalePow(d);
	});

d3.select('svg .scale3')
	.selectAll('text')
	.data(dataBase)
	.enter()
	.append('text')
	.attr('x', function(d) {
		return myScalePow(d);
	})
	.attr('y', -8)
	.text(function(d) {
		return d;
	});

</script>
{{< /tab >}}
{{< /tabs >}}

### scaleSqrt
The `.scaleSqrt` scale is a special case of the power scale (where k = 0.5) and is {{< color blue >}}useful for sizing circles by area (rather than radius){{< /color >}}. When using circle size to represent data, [it’s considered better practice to set the area](/posts/javascript/sizing-circles-by-area-rather-than-radius), rather than the radius proportionally to the data.

{{< tabs "Scale4" >}}
{{< tab "js" >}}
```js
var sqrtScale = d3.scaleSqrt()
  .domain([0, 10])
  .range([0, 600]);

sqrtScale(0);   // returns 0
sqrtScale(5);  // returns 424.26
sqrtScale(10); // returns 600
``` 
{{< /tab >}}
{{< tab ">>" >}}
<svg width="700" height="40">
	<g class="scale4" transform="translate(40, 30)">
  	</g>
</svg>

<script>
var myScaleSqrt = d3.scaleSqrt()
  .domain([0, 10])
  .range([0, 600]);

d3.select('svg .scale4')
	.selectAll('circle')
	.data(dataBase)
	.enter()
	.append('circle')
	.attr('r', 3)
	.attr('cx', function(d) {
		return myScaleSqrt(d);
	});

d3.select('svg .scale4')
	.selectAll('text')
	.data(dataBase)
	.enter()
	.append('text')
	.attr('x', function(d) {
		return myScaleSqrt(d);
	})
	.attr('y', -8)
	.text(function(d) {
		return d;
	});

</script>
{{< /tab >}}
{{< /tabs >}}

### scaleLog
Log scales interpolate using a log function {{< code gold >}}y = m * log(x) + b{{< /code >}} and can be useful when the data has an exponential nature to it.

{{< tabs "Scale5" >}}
{{< tab "js" >}}
```js
var logScale = d3.scaleLog()
  .domain([1, 10])
  .range([0, 600]);

logScale(1);     // returns 0
logScale(5);   // returns 419.38
logScale(10); // returns 600 
``` 
{{< /tab >}}
{{< tab ">>" >}}

<svg width="700" height="40">
	<g class="scale5" transform="translate(40, 30)">
  	</g>
</svg>

<script>
var myScaleLog = d3.scaleLog()
  .domain([1, 10])
  .range([0, 600]);

d3.select('svg .scale5')
	.selectAll('circle')
	.data(dataPositive)
	.enter()
	.append('circle')
	.attr('r', 3)
	.attr('cx', function(d) {
		return myScaleLog(d);
	});

d3.select('svg .scale5')
	.selectAll('text')
	.data(dataPositive)
	.enter()
	.append('text')
	.attr('x', function(d) {
		return myScaleLog(d);
	})
	.attr('y', -8)
	.text(function(d) {
		return d;
	});
</script>

{{< /tab >}}
{{< /tabs >}}

### scaleTime
scaleTime is similar to scaleLinear except the domain is expressed as an array of dates, therefore it’s very useful when dealing with time series data.

{{< tabs "Scale6" >}}
{{< tab "js" >}}
```js
timeScale = d3.scaleTime()
  .domain([new Date(2016, 0, 1), new Date(2017, 0, 1)])
  .range([0, 600]);

timeScale(new Date(2016, 0, 1));   // returns 0
timeScale(new Date(2016, 6, 1));   // returns 348.00...
timeScale(new Date(2017, 0, 1));   // returns 700 
``` 
{{< /tab >}}
{{< tab ">>" >}}
<style>
text {
	fill: black;
	text-anchor: middle;
	font-size: 8px;
}
</style>

<svg width="700" height="40">
	<g id="scale6" transform="translate(40, 30)">
  	</g>
</svg>

<script>
var timeScale = d3.scaleTime()
  .domain([new Date(2016, 0, 1), new Date(2017, 0, 1)])
  .range([0, 600]);

var myDataTime = [new Date(2016, 0, 1), new Date(2016, 3, 1), new Date(2016, 6, 1), new Date(2017, 0, 1)];

d3.select('#scale6')
	.selectAll('circle')
	.data(myDataTime)
	.enter()
	.append('circle')
	.attr('r', 2)
	.attr('cy', 8)
	.attr('cx', function(d) {
		return timeScale(d);
	});

d3.select('#scale6')
	.selectAll('text')
	.data(myDataTime)
	.enter()
	.append('text')
	.attr('x', function(d) {
		return timeScale(d);
	})
	.text(function(d) {
		return d.toDateString();
	});

</script>

{{< /tab >}}
{{< /tabs >}}


### scaleSequential
`.scaleSequential` is used for {{< color blue >}}mapping continuous values{{< /color >}} to an output range determined by a preset (or custom) {{< code gold >}}interpolator{{< /code >}}. An interpolator is a function that accepts input between 0 and 1 and outputs an interpolated value between two numbers, colours, strings etc.

D3 provides a number of preset `interpolators` including many colour ones. E.g., we can use `d3.interpolateRainbow` to create the well known rainbow colour scale:

{{< tabs "Scale7" >}}
{{< tab "js" >}}
```js
var sequentialScale = d3.scaleSequential()
  .domain([0, 100])
  .interpolator(d3.interpolateRainbow);

sequentialScale(0);   // returns 'rgb(110, 64, 170)'
sequentialScale(50);  // returns 'rgb(175, 240, 91)'
sequentialScale(100); // returns 'rgb(110, 64, 170)'
```
{{< /tab >}}
{{< tab ">>" >}}
<svg width="700" height="80">
 	<g id="scale7" transform="translate(40, 30)">
  	</g>
</svg>

<script>
var linearScale = d3.scaleLinear()
	.domain([0, 100])
	.range([0, 600]);

var sequentialScale = d3.scaleSequential()
	.domain([0, 100])
	.interpolator(d3.interpolateRainbow);

d3.select('#scale7')
  .selectAll('circle')
  .data(dataPercentage)
  .enter()
  .append('circle')
  .attr('r', 10)
  .attr('cx', function(d) {
		return linearScale(d);
	})
  .style('fill', function(d) {
		return sequentialScale(d);
	});

</script>
{{< /tab >}}
{{< /tabs >}}

{{< betonen gold >}}
Note that the _interpolator_ determines the output range so you don’t need to specify the range yourself.
{{< /betonen >}}

There’s also a **plug-in** [d3-scale-chromatic](https://github.com/d3/d3-scale-chromatic) which provides the well known [`ColorBrewer`](http://colorbrewer2.org/#type=sequential&scheme=BuGn&n=3) colour schemes.

See some examples of [colour interpolators](/posts/javascript/colour-interpolators) provided by D3.

## Clamping
By default `.scaleLinear`, `.scalePow`, `.scaleSqrt`, `.scaleLog`, `.scaleTime` and `.scaleSequential` allow input outside the domain. For example:

```js
var linearScale = d3.scaleLinear()
  .domain([0, 10])
  .range([0, 100]);

linearScale(20);  // returns 200
linearScale(-10); // returns -100
```
In this instance the scale function uses {{< code gold >}}extrapolation{{< /code >}} for values outside the domain.

If we’d like the scale function to be restricted to input values inside the domain we can `‘clamp’` the scale function using `.clamp()`:

```js
linearScale.clamp(true);

linearScale(20);  // returns 100
linearScale(-10); // returns 0
```
We can switch off clamping using `.clamp(false)`.

## Nice
If the domain has been computed automatically from real data (e.g. by using `d3.extent`) the start and end values might not be round figures. This isn’t necessarily a problem, but if using the scale to define an axis, it can look a bit untidy.

Therefore D3 provides a function `.nice()` on the scales in this section which will round the domain to ‘nice’ round values: `linearScale.nice()`

{{< tabs "Scale8" >}}
{{< tab "js" >}}
```js
var data = [0.243, 0.584, 0.987, 0.153, 0.433];
var extent = d3.extent(data);

var linearScale = d3.scaleLinear()
  .domain(extent)
  .range([0, 600]);

var axis = d3.axisBottom(linearScale);

d3.select('.axis')
	.call(axis);
```
{{< /tab >}}
{{< tab ">>" >}}
<svg width="700" height="100">
	<g class="axis" transform="translate(20, 40)">
	</g>
</svg>

<script>
var data = [0.243, 0.584, 0.987, 0.153, 0.433];
var extent = d3.extent(data);

var linearScale = d3.scaleLinear()
  .domain(extent)
  .range([0, 600]);

var axis = d3.axisBottom(linearScale);

d3.select('.axis')
	.call(axis);
</script>
{{< /tab >}}

{{< tab ".nice()" >}}
```js
var data = [0.243, 0.584, 0.987, 0.153, 0.433];
var extent = d3.extent(data);

var linearScale = d3.scaleLinear()
  .domain(extent)
  .range([0, 600]);

var axis = d3.axisBottom(linearScale);

linearScale.nice();

d3.select('.axis')
	.call(axis);
```
{{< /tab >}}

{{< tab ">>" >}}
<svg width="700" height="100">
	<g class="axisnice" transform="translate(20, 40)">
	</g>
</svg>

<script>
var data = [0.243, 0.584, 0.987, 0.153, 0.433];
var extent = d3.extent(data);

var linearScale = d3.scaleLinear()
  .domain(extent)
  .range([0, 600]);

var axis = d3.axisBottom(linearScale);

linearScale.nice();

d3.select('.axisnice')
	.call(axis);
</script>
{{< /tab >}}

{{< /tabs >}}

Note that `.nice()` must be called each time the domain is updated.

## Multiple segments
The domain and range of `.scaleLinear`, `.scalePow`, `.scaleSqrt`, `.scaleLog` and `.scaleTime` usually consists of two values, but if we provide 3 or more values the scale function is subdivided into multiple segments:

```js
var colourScale = d3.scaleLinear()
  .domain([-10, 0, 10])
  .range(['red', '#ddd', 'green']);

colourScale(-10);  // returns "rgb(255, 0, 0)"
colourScale(0);    // returns "rgb(221, 221, 221)"
colourScale(5);    // returns "rgb(111, 111, 238)"
```
<svg width="700" height="50">
 	<g id="scalemultiple" transform="translate(40, 30)">
  	</g>
</svg>

<script>
var mD = [-10, -8, -6, -4, -2, 0, 2, 4, 6, 8, 10];

var linearScale = d3.scaleLinear()
  .domain([-10, 10])
  .range([0, 600]);

var colourScale = d3.scaleLinear()
	.domain([-10, 0, 10])
	.range(['red', '#ddd', 'green']);

d3.select('#scalemultiple')
  .selectAll('circle')
  .data(mD)
  .enter()
  .append('circle')
  .attr('r', 10)
  .attr('cx', function(d) {
		return linearScale(d);
	})
  .style('fill', function(d) {
		return colourScale(d);
	});
</script>

Typically multiple segments are used for distinguishing between negative and positive values (such as in the example above). We can use as many segments as we like as long as the domain and range are of the same length.

## Inversion
The .invert() method allows us to determine a scale function’s input value given an output value (provided the scale function has a numeric domain):

```js
var linearScale = d3.scaleLinear()
  .domain([0, 10])
  .range([0, 100]);

linearScale.invert(50);   // returns 5
linearScale.invert(100);  // returns 10
```
A common use case is when we want to [convert a user’s click](/posts/javascript/convert-user-click-along-an-axis-into-a-domain-value) along an axis into a domain value

## Scales with continuous input and discrete output

### scaleQuantize
`.scaleQuantize` accepts {{< color blue >}}continuous input{{< /color >}} and {{< color blue >}}outputs a number of discrete quantities{{< /color >}} defined by the range.

{{< tabs "Scale9" >}}
{{< tab "js" >}}
```js
var quantizeScale = d3.scaleQuantize()
  .domain([0, 100])
  .range(['lightblue', 'orange', 'lightgreen', 'pink']);

quantizeScale(10);   // returns 'lightblue'
quantizeScale(30);   // returns 'orange'
quantizeScale(90);   // returns 'pink' 
``` 
{{< /tab >}}
{{< tab ">>" >}}
<svg width="700" height="40">
  <g id="scale9" transform="translate(40,10)">
  </g>
</svg>

<script>
var linearScale = d3.scaleLinear()
	.domain([0, 100])
	.range([0, 600]);

var quantizeScale = d3.scaleQuantize()
	.domain([0, 100])
    .range(['lightblue', 'orange', 'lightgreen', 'pink']);

var myData1 = d3.range(0, 100, 1);

d3.select('#scale9')
	.selectAll('rect')
	.data(myData1)
	.enter()
	.append('rect')
	.attr('x', function(d) {
		return linearScale(d);
	})
	.attr('width', 5)
	.attr('height', 30)
	.style('fill', function(d) {
		return quantizeScale(d);
	});
</script>
{{< /tab >}}
{{< /tabs >}}

Each range value is mapped to an equal sized chunk in the domain so in the example above:
- 0 ≤ u < 25 is mapped to ‘lightblue’
- 25 ≤ u < 50 is mapped to ‘orange’
- 50 ≤ u < 75 is mapped to ‘lightgreen’
- 75 ≤ u < 100 is mapped to ‘pink’

where u is the input value.

{{< betonen gold >}}
Note also that input values outside the domain are _clamped_ so in our example `.quantizeScale(-10)` returns _‘lightblue’_ and `.quantizeScale(110)` returns _‘pink’_.
{{< /betonen >}}

### scaleQuantile
`.scaleQuantile` maps continuous numeric input to discrete values. The domain is defined by an array of numbers:

{{< tabs "Scale10" >}}
{{< tab "js" >}}
```js
var myData = [0, 5, 7, 10, 20, 30, 35, 40, 60, 62, 65, 70, 80, 90, 100]; 
//len(mData) = 15

var quantileScale = d3.scaleQuantile()
  .domain(myData)
  .range(['lightblue', 'orange', 'lightgreen']);

quantileScale(0);   // returns 'lightblue'
quantileScale(20);  // returns 'lightblue'
quantileScale(30);  // returns 'orange'
quantileScale(65);  // returns 'lightgreen'
``` 
{{< /tab >}}
{{< tab ">>" >}}
  <svg width="700" height="80">
  	<g id="scale10" transform="translate(40, 40)">
  	</g>
  </svg>

<script>
var myData10 = [0, 5, 7, 10, 20, 30, 35, 40, 60, 62, 65, 70, 80, 90, 100];

var linearScale = d3.scaleLinear()
	.domain([0, 100])
	.range([0, 600]);

var quantileScale = d3.scaleQuantile()
	.domain(myData10)
	.range(['lightblue', 'orange', 'lightgreen']);

d3.select('#scale10')
	.selectAll('circle')
	.data(myData10)
	.enter()
	.append('circle')
	.attr('r', 3)
	.attr('cx', function(d) {
		return linearScale(d);
	})
	.style('fill', function(d) {
		return quantileScale(d);
	});

 </script>
{{< /tab >}}
{{< /tabs >}}

The (sorted) domain array is divided into _n_ equal sized groups where _n_ is the number of range values.

Therefore in the above example the domain array is split into 3 groups where:

- the first 5 values are mapped to ‘lightblue’
- the next 5 values to ‘orange’ and
- the last 5 values to ‘lightgreen’.

The split points of the domain can be accessed using `.quantiles()`:

```js
quantileScale.quantiles();  // returns [26.66..., 63]
```
If the range contains 4 values, `.quantileScale` computes the quartiles of the data. In other words, the lowest 25% of the data is mapped to range[0], the next 25% of the data is mapped to range[1] etc.

### scaleThreshold
`.scaleThreshold` maps continuous numeric input to discrete values defined by the range. _n-1_ domain split points are specified where _n_ is the number of range values.

In the following example we split the domain at 0, 50 and 100

- u < 0 is mapped to ‘#ccc’
- 0 ≤ u < 50 to ‘lightblue’
- 50 ≤ u < 100 to ‘orange’
- u ≥ 100 to ‘#ccc’

where u is the input value.

{{< tabs "Scale11" >}}
{{< tab "js" >}}
```js
var thresholdScale = d3.scaleThreshold()
  .domain([0, 50, 100])
  .range(['#ccc', 'lightblue', 'orange', '#ccc']);

thresholdScale(-10);  // returns '#ccc'
thresholdScale(20);   // returns 'lightblue'
thresholdScale(70);   // returns 'orange'
thresholdScale(110);  // returns '#ccc'
``` 
{{< /tab >}}
{{< tab ">>" >}}
<svg width="700" height="80">
	<g id="scale11" transform="translate(20, 40)">
  	</g>
</svg>

<script>
var linearScale = d3.scaleLinear()
	.domain([-10, 110])
	.range([0, 600]);

var thresholdScale = d3.scaleThreshold()
	.domain([0, 50, 100])
	.range(['#ccc', 'lightblue', 'orange', '#ccc']);

var myData11 = d3.range(-10, 110, 2);

d3.select('#scale11')
	.selectAll('rect')
	.data(myData11)
	.enter()
	.append('rect')
	.attr('x', function(d) {
		return linearScale(d);
	})
	.attr('width', 9)
	.attr('height', 30)
	.style('fill', function(d) {
		return thresholdScale(d);
	});

</script>
{{< /tab >}}
{{< /tabs >}}


## Scales with discrete input and discrete output

### scaleOrdinal
`.scaleOrdinal` maps discrete values (specified by an array) to discrete values (also specified by an array). The domain array specifies the possible input values and the range array the output values. The range array will repeat if it’s shorter than the domain array.

```JS
var myData = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

var ordinalScale = d3.scaleOrdinal()
  .domain(myData)
  .range(['black', '#ccc', '#ccc']);

ordinalScale('Jan');  // returns 'black';
ordinalScale('Feb');  // returns '#ccc';
ordinalScale('Mar');  // returns '#ccc';
ordinalScale('Apr');  // returns 'black';
```
By default if a value that’s not in the domain is used as input, the scale will implicitly add the value to the domain:

```js
ordinalScale('Monday');  // returns 'black';
```

If this isn’t the desired behvaiour we can specify an output value for unknown values using `.unknown()`:

```js
ordinalScale.unknown('Not a month');
ordinalScale('Tuesday'); // returns 'Not a month'
```

D3 can also provide preset colour schemes (from `ColorBrewer`):

```js
var ordinalScale = d3.scaleOrdinal()
  .domain(myData)
  .range(d3.schemePaired);
```

(Note that the Brewer colour schemes are defined within a separate file d3-scale-chromatic.js.)

### scaleBand
When creating bar charts `.scaleBand` helps to determine the {{< color blue >}}geometry of the bars{{< /color >}}, taking into account padding between each bar. The domain is specified as: 

- an array of values (one value for each band); and 
- the range as the minimum and maximum extents of the bands (e.g. the total width of the bar chart).

In effect `.scaleBand` will split the range into _n bands_ (where _n_ is the number of values in the domain array) and compute the positions and widths of the bands taking into account any specified padding.

```js
var bandScale = d3.scaleBand()
  .domain(['Mon', 'Tue', 'Wed', 'Thu', 'Fri'])
  .range([0, 200]);

bandScale('Mon'); // returns 0
bandScale('Tue'); // returns 40
bandScale('Fri'); // returns 160
```

The width of each band can be accessed using .bandwidth():

```js
bandScale.bandwidth();  // returns 40
```
Two types of padding may be configured:

- `paddingInner` which specifies (as a percentage of the band width) the amount of padding between each band
- `paddingOuter` which specifies (as a percentage of the band width) the amount of padding before the first band and after the last band

Let’s add some inner padding to the example above:

```js
bandScale.paddingInner(0.05);

bandScale.bandWidth();  // returns 38.38...
bandScale('Mon');       // returns 0
bandScale('Tue');       // returns 40.40...
```

Putting this all together we can [create bar chart](/posts/javascript/create-bar-chart-with-scaleband).

### scalePoint
`.scalePoint` creates scale functions that map from a {{< color blue >}}discrete set of values{{< /color >}} to equally spaced points along the specified range:

{{< tabs "ScalePoint" >}}
{{< tab "js" >}}
```js
var pointScale = d3.scalePoint()
  .domain(['Mon', 'Tue', 'Wed', 'Thu', 'Fri'])
  .range([0, 500]);

pointScale('Mon');  // returns 0
pointScale('Tue');  // returns 125
pointScale('Fri');  // returns 500
``` 
{{< /tab >}}
{{< tab ">>" >}}
<svg width="700" height="80">
	<g id="scalePointId" transform="translate(40, 40)">
	</g>
</svg>

<script>
var myDataScalePoint = [
	{day : 'Mon', value: 10},
	{day : 'Tue', value: 40},
	{day : 'Wed', value: 30},
	{day : 'Thu', value: 60},
	{day : 'Fri', value: 30}
];

var pointScale = d3.scalePoint()
	.domain(['Mon', 'Tue', 'Wed', 'Thu', 'Fri'])
	.range([0, 600]);

d3.select('#scalePointId')
	.selectAll('circle')
	.data(myDataScalePoint)
	.enter()
	.append('circle')
	.attr('cx', function(d) {
		return pointScale(d.day);
	})
	.attr('r', 4);
</script>	
{{< /tab >}}
{{< /tabs >}}

The distance between the points can be accessed using `.step()`:

```js
pointScale.step();  // returns 125
```

Outside padding can be specified as the ratio of the padding to point spacing. For example, for the outside padding to be a quarter of the point spacing use a value of 0.25:

```js
pointScale.padding(0.25);

pointScale('Mon');  // returns 27.77...
pointScale.step();  // returns 111.11...
```

## Further reading
- [ColorBrewer schemes for D3](https://github.com/d3/d3-scale-chromatic)
- [Mike Bostock on d3-scale](https://medium.com/@mbostock/introducing-d3-scale-61980c51545f#.lk2cs7x7k)