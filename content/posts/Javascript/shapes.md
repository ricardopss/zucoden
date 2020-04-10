---
title: "Shapes"
date: 2020-03-28T17:24:15+01:00
series: ["D3"]
tags: ['shape', 'line', 'defined', 'context', 'curve', 'curveLinear', 'curveCardinal', 'curveCatmullRom', 'curveMonotone', 'curveNatural', 'curveStep', 'curveBasis', 'curveBundle', 'radialLine', 'angle', 'radius', 'area', 'radialArea', 'stack', 'order', 'offset', 'arc', 'innerRadius', 'outerRadius', 'startAngle', 'endAngle', 'cornerRadius', 'padAngle', 'padRadius', 'centroid', 'pie', 'symbol', 'symbolCircle', 'symbolCross', 'symbolDiamond', 'symbolSquare', 'symbolStar', 'symbolTriangle', 'symbolWye']
categories: ["Javascript"]
---

This section looks at the functions D3 provides for taking the effort out of creating vector shapes such as lines:

{{< tabs "intro" >}}
{{< tab "lines" >}}
```js
``` 
{{< /tab >}}

{{< tab "curve" >}}
{{< /tab >}}

{{< tab "pie chart" >}}
{{< /tab >}}

{{< tab "symbols" >}}
{{< /tab >}}

{{< /tabs >}}

## SVG
First a little background on Scalable Vector Graphics (SVG). The shapes in the examples above are made up of SVG path elements. Each of them has a `d` attribute (_path data_) which defines the shape of the path. 

The path data consists of a list of commands (e.g. `M0,80L100,100L200,30L300,50L400,40L500,80`) such as _‘move to’_ and _‘draw a line to’_ (see the SVG specification for more detail).

We could create path data ourselves but D3 can help us using functions known as {{< code gold >}}generators{{< /code >}}. These come in various forms:

|generators|description|
|:-|:-|
|[line](#line-generator)|Generates path data for a multi-segment line (typically for line charts)|
|[area](#area-generator)|Generates path data for an area (typically for stacked line charts and streamgraphs)|
|[stack](#stack-generator)|Generates stack data from multi-series data|
|[arc](#arc-generator)|Generates path data for an arc (typically for pie charts)|
|[pie](#pie-generator)|Generates pie angle data from array of data|
|[symbol](#symbol-generator)|Generates path data for symbols such as plus, star, diamond|

## Line generator
D3’s line generator produces a path data string given an array of co-ordinates.

We start by constructing a line generator using `d3.line()`:

```js
var lineGenerator = d3.line();
```

The variable `lineGenerator` is just a function that accepts an array of co-ordinates and outputs a path data string.

So let’s go ahead and define an array of co-ordinates:

```js
var points = [
  [0, 80],
  [100, 100],
  [200, 30],
  [300, 50],
  [400, 40],
  [500, 80]
];
```
and now call `lineGenerator`, passing in our array:

```js
var pathData = lineGenerator(points);
// pathData is "M0,80L100,100L200,30L300,50L400,40L500,80"
```

All `lineGenerator` has done is create a string of `M` (move to) and `L` (line to) commands from our array of points. 

We can now use `pathData` to set the `d` attribute of a path element:

{{< tabs "Shape1" >}}
{{< tab "js" >}}
```js
d3.select('path')
  .attr('d', pathData); 
``` 
{{< /tab >}}
{{< tab ">>" >}}
```
```
{{< /tab >}}
{{< /tabs >}}

We can also configure our line generator in a number of ways:

- `.x()` and `.y()` accessor functions,
- `.defined()` (to handle missing data),
- `.curve` (to specify how the points are interpolated) and
- `.context()` to render to a canvas element.

### `.x()` and `.y()` accessor functions
By default each array element represents a co-ordinate defined by a 2-dimensional array (e.g. [0, 100]). However we can specify how the line generator interprets each array element using accessor functions `.x()` and `.y()`.

E.g. suppose our data is an array of objects:

```js
var data = [
  {value: 10},
  {value: 50},
  {value: 30},
  {value: 40},
  {value: 20},
  {value: 70},
  {value: 50}
];
```

We can define the accessors like so:

{{< tabs "Scale2" >}}
{{< tab "js" >}}
```js
lineGenerator
  .x(function(d, i) {
    return xScale(i);
  })
  .y(function(d) {
    return yScale(d.value);
  }); 
``` 
{{< /tab >}}
{{< tab ">>" >}}
```
```
{{< /tab >}}
{{< /tabs >}}

{{< betonen gold >}}
In this example we’re using the index of the array to define the x position. Note also that we’re using scale functions
{{< /betonen >}}


### .defined()
We can configure the behaviour when there’s missing data. Suppose our data has a gap in it:

```js
var points = [
  [0, 80],
  [100, 100],
  null,
  [300, 50],
  [400, 40],
  [500, 80]
];
```
we can tell our line generator that each co-ordinate is valid only if it’s non-null:


{{< tabs "Scale3" >}}
{{< tab "js" >}}
```js
lineGenerator
  .defined(function(d) {
    return d !== null;

  });
 
``` 
{{< /tab >}}
{{< tab ">>" >}}
```
```
{{< /tab >}}
{{< /tabs >}}

{{< betonen gold >}}
Now when we call lineGenerator it leaves a gap in the line.
{{< /betonen >}}

### .curve()
We can also configure how the points are interpolated. For example we can interpolate each data point with a B-spline:

```js
var lineGenerator = d3.line()
  .curve(d3.curveCardinal);
```

Although there’s a multitude of different curve types available they can be divided into two camps: those which pass through the points (`curveLinear`, `curveCardinal`, `curveCatmullRom`, `curveMonotone`, `curveNatural` and `curveStep`) and those that don’t (`curveBasis` and `curveBundle`).

See the [curve explorer](http://bl.ocks.org/d3indepth/raw/b6d4845973089bc1012dec1674d3aff8/) for more information or the [D3 doc](https://github.com/d3/d3-shape#curves).

### Rendering to canvas
By default the shape generators output SVG path data. However they can be configured to draw to a canvas element using the `.context()` function:

{{< tabs "Scale4" >}}
{{< tab "js" >}}
```js
var context = d3.select('canvas').node().getContext('2d');

lineGenerator.context(context);

context.strokeStyle = '#999';
context.beginPath();
lineGenerator(points);
context.stroke(); 
``` 
{{< /tab >}}
{{< tab ">>" >}}
```
```
{{< /tab >}}
{{< /tabs >}}

### Radial line
The radial line generator is similar to the line generator but the points are transformed by angle (working clockwise from 12 o’clock) and radius, rather than x and y:

{{< tabs "Scale5" >}}
{{< tab "js" >}}
```js
var radialLineGenerator = d3.radialLine();

var points = [
  [0, 80],
  [Math.PI * 0.25, 80],
  [Math.PI * 0.5, 30],
  [Math.PI * 0.75, 80],
  [Math.PI, 80],
  [Math.PI * 1.25, 80],
  [Math.PI * 1.5, 80],
  [Math.PI * 1.75, 80],
  [Math.PI * 2, 80]
];

var pathData = radialLineGenerator(points); 
``` 
{{< /tab >}}
{{< tab ">>" >}}
```
```
{{< /tab >}}
{{< /tabs >}}

Accessor functions `.angle()` and `.radius()` are also available:

```js
radialLineGenerator
  .angle(function(d) {
    return d.a;
  })
  .radius(function(d) {
    return d.r;
  });

var points = [
  {a: 0, r: 80},
  {a: Math.PI * 0.25, r: 80},
  {a: Math.PI * 0.5, r: 30},
  {a: Math.PI * 0.75, r: 80},
  ...
];

var pathData = radialLineGenerator(points);
```

## Area generator
The area generator outputs path data that defines an area between two lines. By default it generates the area between y=0 and a multi-segment line defined by an array of points:

```js
var areaGenerator = d3.area();

var points = [
  [0, 80],
  [100, 100],
  [200, 30],
  [300, 50],
  [400, 40],
  [500, 80]
];

var pathData = areaGenerator(points);
```
We can configure the baseline using the .y0() accessor function:

```js
areaGenerator.y0(150);
```

We can also feed a function into the .y0() accessor, likewise the .y1() accessor:

```js
areaGenerator
  .x(function(d) {
    return d.x;
  })
  .y0(function(d) {
    return yScale(d.low);
  })
  .y1(function(d) {
    return yScale(d.high);
  });

var points = [
  {x: 0, low: 30, high: 80},
  {x: 100, low: 80, high: 100},
  {x: 200, low: 20, high: 30},
  {x: 300, low: 20, high: 50},
  {x: 400, low: 10, high: 40},
  {x: 500, low: 50, high: 80}
];
```

Typically .y0() defines the baseline and .y1() the top line. Note that we’ve also used the .x() accessor to define the x co-ordinate.

As with the line generator we can specify the way in which the points are interpolated (.curve()), handle missing data (.defined()) and render to canvas (.context());

### Radial area
The radial area generator is similar to the area generator but the points are transformed by angle (working clockwise from 12 o’clock) and radius, rather than x and y:

```js
var radialAreaGenerator = d3.radialArea()
  .angle(function(d) {
    return d.angle;
  })
  .innerRadius(function(d) {
    return d.r0;
  })
  .outerRadius(function(d) {
    return d.r1;
  });

var points = [
  {angle: 0, r0: 30, r1: 80},
  {angle: Math.PI * 0.25, r0: 30, r1: 70},
  {angle: Math.PI * 0.5, r0: 30, r1: 80},
  {angle: Math.PI * 0.75, r0: 30, r1: 70},
  {angle: Math.PI, r0: 30, r1: 80},
  {angle: Math.PI * 1.25, r0: 30, r1: 70},
  {angle: Math.PI * 1.5, r0: 30, r1: 80},
  {angle: Math.PI * 1.75, r0: 30, r1: 70},
  {angle: Math.PI * 2, r0: 30, r1: 80}
];
```

## Stack generator
The stack generator takes an array of multi-series data and generates an array for each series where each array contains lower and upper values for each data point. The lower and upper values are computed so that each series is stacked on top of the previous series.

var data = [
  {day: 'Mon', apricots: 120, blueberries: 180, cherries: 100},
  {day: 'Tue', apricots: 60,  blueberries: 185, cherries: 105},
  {day: 'Wed', apricots: 100, blueberries: 215, cherries: 110},
  {day: 'Thu', apricots: 80,  blueberries: 230, cherries: 105},
  {day: 'Fri', apricots: 120, blueberries: 240, cherries: 105}
];

var stack = d3.stack()
  .keys(['apricots', 'blueberries', 'cherries']);

var stackedSeries = stack(data);

// stackedSeries = [
//   [ [0, 120],   [0, 60],   [0, 100],    [0, 80],    [0, 120] ],   // Apricots
//   [ [120, 300], [60, 245], [100, 315],  [80, 310],  [120, 360] ], // Blueberries
//   [ [300, 400], [245, 350], [315, 425], [310, 415], [360, 465] ]  // Cherries
// ]
The .keys() configuration function specifies which series are included in the stack generation.

The data output by the stack generator can be used however you like, but typically it’ll be used to produce stacked bar charts:

or when used in conjunction with the area generator, stacked line charts:

.order()

The order of the stacked series can be configured using .order():

stack.order(d3.stackOrderInsideOut);

Each series is summed and then sorted according to the chosen order. The possible orders are:

stackOrderNone	(Default) Series in same order as specified in .keys()
stackOrderAscending	Smallest series at the bottom
stackOrderDescending	Largest series at the bottom
stackOrderInsideOut	Largest series in the middle
stackOrderReverse	Reverse of stackOrderNone

.offset()

By default the stacked series have a baseline of zero. However we can configure the offset of the stack generator to achieve different effects. For example we can normalise the stacked series so that they fill the same height:

stack.offset(d3.stackOffsetExpand);

The available offsets are:

stackOffsetNone	(Default) No offset
stackOffsetExpand	Sum of series is normalised (to a value of 1)
stackOffsetSilhouette	Center of stacks is at y=0
stackOffsetWiggle	Wiggle of layers is minimised (typically used for streamgraphs)

Here’s a streamgraph example using stackOffsetWiggle:


## Arc generator
Arc generators produce path data from angle and radius values. An arc generator is created using:

var arcGenerator = d3.arc();

It can then be passed an object containing startAngle, endAngle, innerRadius and outerRadius properties to produce the path data:

var pathData = arcGenerator({
  startAngle: 0,
  endAngle: 0.25 * Math.PI,
  innerRadius: 50,
  outerRadius: 100
});

// pathData is "M6.123233995736766e-15,-100A100,100,0,0,1,70.71067811865476,-70.710678
// 11865474L35.35533905932738,-35.35533905932737A50,50,0,0,0,3.061616997868383e-15,-50Z"
(startAngle and endAngle are measured clockwise from the 12 o’clock in radians.)


### Configuration
We can configure innerRadius, outerRadius, startAngle, endAngle so that we don’t have to pass them in each time:

arcGenerator
  .innerRadius(20)
  .outerRadius(100);

pathData = arcGenerator({
  startAngle: 0,
  endAngle: 0.25 * Math.PI
});

// pathData is "M6.123233995736766e-15,-100A100,100,0,0,1,70.71067811865476,-70.71067811
// 865474L14.142135623730951,-14.14213562373095A20,20,0,0,0,1.2246467991473533e-15,-20Z"

We can also configure corner radius (cornerRadius) and the padding between arc segments (padAngle and padRadius):

arcGenerator
  .padAngle(.02)
  .padRadius(100)
  .cornerRadius(4);

Arc padding takes two parameters padAngle and padRadius which when multiplied together define the distance between adjacent segments. Thus in the example above, the padding distance is 0.02 * 100 = 2. Note that the padding is calculated to maintain (where possible) parallel segment boundaries.

You might ask why there isn't a single parameter padDistance for defining the padding distance. It's split into two parameters so that the pie generator (see later) doesn't need to concern itself with radius.

### Accessor functions
We also define accessor functions for startAngle, endAngle, innerRadius and outerRadius e.g.

arcGenerator
  .startAngle(function(d) {
    return d.startAngleOfMyArc;
  })
  .endAngle(function(d) {
    return d.endAngleOfMyArc;
  });

arcGenerator({
  startAngleOfMyArc: 0,
  endAngleOfMyArc: 0.25 * Math.PI
});

### Centroid
It’s sometimes useful to calculate the centroid of an arc, such as when positioning labels, and D3 has a function .centroid() for doing this:

arcGenerator.centroid({
  startAngle: 0,
  endAngle: 0.25 * Math.PI
});
// returns [22.96100594190539, -55.43277195067721]

Here’s an example where .centroid() is used to compute the label positions:

## Pie generator
The pie generator goes hand in hand with the arc generator. Given an array of data, the pie generator will output an array of objects containing the original data augmented by start and end angles:

var pieGenerator = d3.pie();
var data = [10, 40, 30, 20, 60, 80];
var arcData = pieGenerator(data);

// arcData is an array of objects: [
//   {
//     data: 10,
//     endAngle: 6.28...,
//     index: 5,
//     padAngle: 0,
//     startAngle: 6.02...,
//     value: 10
//   },
//   ...
// ]

We can then use an arc generator to create the path strings:

var arcGenerator = d3.arc()
  .innerRadius(20)
  .outerRadius(100);

d3.select('g')
  .selectAll('path')
  .data(arcData)
  .enter()
  .append('path')
  .attr('d', arcGenerator);

Notice that the output of pieGenerator contains the properties startAngle and endAngle. These are the same properties required by arcGenerator.

The pie generator has a number of configuration functions including .padAngle(), .startAngle(), .endAngle() and .sort(). .padAngle() specifies an angular padding (in radians) between neighbouring segments.

.startAngle() and .endAngle() configure the start and end angle of the pie chart. This allows, for example, the creation of semi-circular pie charts:

var pieGenerator = d3.pie()
  .startAngle(-0.5 * Math.PI)
  .endAngle(0.5 * Math.PI);

By default the segment start and end angles are specified such that the segments are in descending order. However we can change the sort order using .sort:

var pieGenerator = d3.pie()
  .value(function(d) {return d.quantity;})
  .sort(function(a, b) {
    return a.name.localeCompare(b.name);
  });

var fruits = [
  {name: 'Apples', quantity: 20},
  {name: 'Bananas', quantity: 40},
  {name: 'Cherries', quantity: 50},
  {name: 'Damsons', quantity: 10},
  {name: 'Elderberries', quantity: 30},
];

## Symbols
The symbol generator produces path data for symbols commonly used in data visualisation:

var symbolGenerator = d3.symbol()
  .type(d3.symbolStar)
  .size(80);

var pathData = symbolGenerator();

We can then use pathData to define the d attribute of a path element:

d3.select('path')
  .attr('d', pathData);
Here’s a simple chart using the symbol generator:

D3 provides a number of symbol types:


