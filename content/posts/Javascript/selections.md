---
title: "Selections"
date: 2020-03-24T17:14:53+01:00
series: ["D3"]
tags: ['selections', '.select', '.selectAll']
categories: ["Javascript"]
---
<style>
  body {
    font-family: "Helvetica Neue", Helvetica, sans-serif;
    font-size: 14px;
  }
</style>

<script src="//d3js.org/d3.v4.min.js"></script>

{{< code gold >}}Selections{{< /code >}} allow DOM elements to be selected in order to do something with them (e.g. changing style, modifying their attributes, performing data-joins or inserting/removing elements).

As a baseline elements, we will use 5 circles:

{{< tabs "Baseline" >}}
{{< tab ">>" >}}

{{< svgCircle base >}}

{{< /tab >}}
{{< tab "html" >}}
```html
<svg width = "760" heigth = "140">
	<g transform = "translate(70,70)">
		<circle r= "30" style= "fill:gold;"></circle>
		<circle r= "30" style= "fill:gold;" cx= "120"></circle>
		<circle r= "30" style= "fill:gold;" cx= "240"></circle>
		<circle r= "30" style= "fill:gold;" cx= "360"></circle>
		<circle r= "30" style= "fill:gold;" cx= "480"></circle>
	</g>
</svg>
```
{{< /tab >}}
{{< /tabs >}}

## Making selections: `.select` and `.selectAll`
D3 has two functions to make selections `d3.select` and `d3.selectAll`.

`d3.select` selects the first matching element whilst `d3.selectAll` selects all matching elements. 

Each function takes a single argument which specifies the selector string (e.g. to select all elements with class item use `d3.selectAll('.item')`). Whether `.select` or `.selectAll` is used, all elements in the selection will be modified.

{{< tabs "Selection1" >}}
{{< tab "js" >}}
```js
d3.selectAll('circle')
	.style('fill', 'blue')
	.attr('r', function() {
	return 10 + Math.random() * 25;
	});
```
{{< /tab >}}

{{< tab ">>" >}}
{{< svgCircle eg1 >}}

<script>
	d3.selectAll("circle.eg1")
  		.style('fill', 'blue')
  		.attr('r', function() {
    return 10 + Math.random() * 25;
  });
</script>
{{< /tab >}}
{{< /tabs >}}

To select the {{< code gold >}}nth-element{{< /code >}}, use the syntax `:nth-child(n)` 

{{< tabs "Selection1a" >}}
{{< tab "js" >}}
```js
d3.select('circle:nth-child(2)')
	.style('fill', 'red')
	.style('stroke', '#555')
	.style('stroke-width', '2px')

d3.select('circle:nth-child(5)')
	.style('fill', 'blue')
``` 
{{< /tab >}}
{{< tab ">>" >}}
{{< svgCircle eg1a >}}
<script>
	d3.select("circle.eg1a:nth-child(2)")
  		.style('fill', 'red')
  		.style('stroke', '#555')
  		.style('stroke-width', '2px')

	d3.select("circle.eg1a:nth-child(5)")
  		.style('fill', 'blue')
</script>
{{< /tab >}}
{{< /tabs >}}

To select an element also based on the value of a attribute (e.g. _class_), use `.select("circle[class='className']")` or `.select("circle.className")` 

```js
d3.select("circle.unique]") // or "circle[class:'unique']" 
	.style('fill', 'red') 

/// to select the nth-element also based on the value 
/// of a attribute (e.g. shape), use
d3.select("circle[shape:'round']:nth-child(3)")
	.style('fill', 'red')
```

Another possibility is to select based on the CSS class `id`:

```js
/**
<svg width = "760" heigth = "140">
	<g transform = "translate(70,70)">
		<circle id="round" r= "30" style= "fill:gold;"></circle>
	</g>
</svg>
**/

d3.select("#round") 
	.style('fill', 'red') 
``` 

## Modifying elements using selection
|Name|Behaviour|Example|
|:-|:-|:-|
|.style<br>('name', 'value')|Update the style| `d3.selectAll('circle')`<br>`.style('fill', 'red')`  
|.attr<br>('name', 'value')|Update an attribute| `d3.selectAll('rect')`<br>`.attr('width', 10)` 
|.property<br>('name', 'value')|Update an element's property| `d3.selectAll('.checkbox')`<br>`.property('checked', false)` 
|.classed<br>('css class', bool)|Add/remove a class attribute| `d3.select('.item')`<br>`.classed('selected', true)` 
|.text<br>('content')|Update the text content| `d3.select('div.title')`<br>`.text('My new book')` 
|.html<br>('content')|Change html content| `d3.select('.legend')`<br>`.html('<div class="block"></div><div>0 - 10</div>')` 
|.remove()|removes the specified element from the DOM| `d3.select("p").remove()`
|.append<br>("element name")|Adds an element inside the selected element| `d3.select("body")`<br>`.append("p")`
|.insert<br>("element name")|Inserts an element in the selected element| `d3.select("div")`<br>`.insert("p").text("Hallo");`

#### modifying .style
e.g. selecting and changing colour of first circle

{{< tabs "Selection2" >}}
{{< tab "js" >}}
```js
d3.select('circle')
	.style('fill', 'blue')
```
{{< /tab >}}

{{< tab ">>" >}}
{{< svgCircle eg2 >}}
<script>
	d3.select("circle.eg2")
  		.style('fill', 'blue')
</script>
{{< /tab >}}
{{< /tabs >}}


#### modifying .attr
e.g. selecting and changing radius of all circles

{{< tabs "Selection4" >}}
{{< tab "js" >}}
```js
d3.selectAll('circle')
	.attr('r', 50);
```
{{< /tab >}}

{{< tab ">>" >}}
{{< svgCircle eg4 >}}
<script>
	d3.selectAll("circle[class='eg4']")
	  .attr('r', 50);
</script>
{{< /tab >}}
{{< /tabs >}}


#### modifying .classed
to add `.round` a class to 3rd circle:
{{< tabs "Selection5" >}}
{{< tab "html" >}}
```html
<style>
	circle.round {
		stroke: #555;
		stroke-width: 2px;
	}
</style>

<script> 
	d3.select('circle:nth-child(3)')
		.classed('round', true);
</script>
``` 
{{< /tab >}}
{{< tab ">>" >}}
{{< svgCircle eg5 >}}
<script>
	d3.select("circle[class='eg5']:nth-child(3)")
	  .style('stroke','#555')
	  .style('stroke-width','2px');	  
</script>
{{< /tab >}}
{{< /tabs >}}


#### modifying .property
e.g. set checked property of checkbox

{{< tabs "Selection6" >}}
{{< tab "html" >}}
```html
<form>
	<input class="robot-checkbox" type="checkbox">A checkbox</input>
</form>

<script>
	d3.select('input.robot-checkbox')
		.property('checked', true);
</script>
``` 
{{< /tab >}}
{{< tab ">>" >}}
<form>
	<input class="robot-checkbox" type="checkbox">A checkbox</input>
</form>

<script>
d3.select('input.robot-checkbox')
	.property('checked', true);
</script>
{{< /tab >}}
{{< /tabs >}}

#### modifying .text
e.g. set text on `.title` element

```js
d3.select('.title')
	.text('D3 in Depth selection example')
```

## Inserting and removing elements
Elements can be added to a selection using `.append` and `.insert` whilst elements can be removed using `.remove`.

`.append` appends an element to the children of each element in the selection. The first argument specifies the type of element.

`.insert` is similar to `.append` but it allows us to specify a _before_ element to which, the new element is attached.

As an example let’s start with 3 g elements, each containing a circle:
```html
<g class="item" transform="translate(0, 0)">
  <circle r="40" />
</g>
<g class="item" transform="translate(120, 0)">
  <circle r="40" />
</g>
<g class="item" transform="translate(240, 0)">
  <circle r="40" />
</g>
```
We can append/insert a text element to each using:

```js
//using append
d3.selectAll('g.item')
  .append('text')
  .text(function(d, i) {
    return i + 1;
  });

//using insert
d3.selectAll('g.item')
  .insert('text')
  .text(function(d, i) {
    return i + 1;
  });
```
resulting in a text being added to each g.item:

```html
<!--using append-->
<g class="item" transform="translate(0, 0)">
  <circle r="40" />
  <text>1</text>
</g>
<g class="item" transform="translate(120, 0)">
  <circle r="40" />
  <text>2</text>
</g>
<g class="item" transform="translate(240, 0)">
  <circle r="40" />
  <text>3</text>
</g>

<!--using insert-->
<g class="item" transform="translate(0, 0)">
  <text>1</text>
  <circle r="40" />
</g>
<g class="item" transform="translate(120, 0)">
  <text>2</text>
  <circle r="40" />
</g>
<g class="item" transform="translate(240, 0)">
  <text>3</text>
  <circle r="40" />
</g>
```
#### using `.append`
<style>
g.egAppend text {
	fill: #ddd;
	font-size: 70px;
	text-anchor: bottom;
	font-weight: bold;
}

g.egInsert text {
	fill: #ddd;
	font-size: 70px;
	text-anchor: bottom;
	font-weight: bold;
}
</style>

<svg width = "760" heigth = "140">
 <g transform="translate(70,70)">
	<g class="egAppend" transform="translate(0, 0)">
	  <circle r="40" style="fill:orange;" />
	  <text>1</text>
	</g>
	<g class="egAppend" transform="translate(120, 0)">
	  <circle r="40" style="fill:orange;" style="fill:orange;" />
	  <text>2</text>	  
	</g>
	<g class="egAppend" transform="translate(240, 0)">
	  <circle r="40" style="fill:orange;" />
	  <text>3</text>	  
	</g>
 </g>
</svg>

#### using `.insert`
<svg width = "760" heigth = "140">
 <g transform="translate(70,70)">
	<g class="egInsert" transform="translate(0, 0)">
	  <text>1</text>		
	  <circle r="40" style="fill:orange;" />
	</g>
	<g class="egInsert" transform="translate(120, 0)">
	  <text>2</text>		
	  <circle r="40" style="fill:orange;" />
	</g>
	<g class="egInsert" transform="translate(240, 0)">
	  <text>3</text>		
	  <circle r="40" style="fill:orange;" />
	</g>
 </g>
</svg>

{{< betonen gold >}}
`.append` is commonly used in the context of [enter/exit](/posts/javascript/enter-exit) where it has different behaviour.)
{{< /betonen >}}

`.remove` removes all the elements in a selection. e.g.

{{< tabs "Removing" >}}
{{< tab "js" >}}
```js
d3.selectAll('circle')
  .remove(); 
``` 
{{< /tab >}}
{{< tab ">>" >}}
{{< svgCircle removing >}}

<div>
	<button onClick="removeCircle();">Remove circles</button>
</div>

<script>
function removeCircle() {
	d3.selectAll("circle.removing")
	.remove(); 
	}
</script>
{{< /tab >}}
{{< /tabs >}}

## Updating selections with functions
In addition to passing constant values such as {{< code gold >}}red{{< /code >}}, {{< code gold >}}10{{< /code >}} and {{< code gold >}}true{{< /code >}} to `.style`, `.attr`, `.classed`, `.property`, `.text` and `.html` we can pass in a `function(d,i)`, e.g.:

```js
d3.selectAll('circle')
  .attr('cx', function(d, i) {
    return i * 100;
  });
```
{{< betonen gold >}}
The function typically accepts two arguments `d` and `i`, where: 
- the first argument `d` is the joined data (see the [Data Joins](/posts/javascript/data-joins)) and
- the second argument `i` is the index of the element within the selection
{{< /betonen >}}

#### e.g. update position of circle elements horizontally
If we want to update elements in a selection according to their position within the selection, we can use the `i` argument, e.g.

{{< tabs "Selection7" >}}
{{< tab "js" >}}
```js
d3.selectAll('circle.round')
  .attr('cx', function(d, i) {
    return i * 40;
  }); 
``` 
{{< /tab >}}
{{< tab ">>" >}}
{{< svgCircle round >}}

<div>
	<button onClick="update();">Update circle elements using function(d, i)</button>
</div>

<script>
function update() {
	d3.selectAll('circle.round')
	  .attr('cx', function(d, i) {
	    return i * 40;
	  });
	}
</script>
{{< /tab >}}
{{< /tabs >}}

In the majority of cases when functions are passed in, {{< code gold >}}anonymous functions{{< /code >}} are used. However we can also use {{< code gold >}}named functions{{< /code >}} e.g.

```js
function positionCircle(d, i) {
  return i * 40;
}

d3.selectAll('circle.round')
  .attr('x', positionCircle);
```

## Handling events
We can add {{< code  >}}event handlers{{< /code >}} to selected elements using `.on` which expects a callback function into which is passed two arguments `d` and `i`. As before, `d` is the joined data (see the [Data Joins](/posts/javascript/data-joins)) and `i` is the index of the element within the selection.

**E.g. with click:** set up an event handler to update a status element with the index of the `click` of the element:

{{< tabs "HandlingEvents1" >}}
{{< tab "html" >}}
```html
<svg width="760" height="140">
<g transform="translate(70, 70)">
  <circle r="40" />
  <circle r="40" cx="120" />
  <circle r="40" cx="240" />
  <circle r="40" cx="360" />
  <circle r="40" cx="480" />
</g>
</svg>

<div class="status">Click on a circle</div>

<script>
d3.selectAll('circle')
  .on('click', function(d, i) {
    d3.select('.status')
      .text('You clicked on circle ' + (i + 1));
  });
</script>
```
{{< /tab >}}
{{< tab ">>" >}}
<svg width="760" height="140">
	<g transform="translate(70, 70)">
	  <circle class="handling1" r="40" />
	  <circle class="handling1" r="40" cx="120" />
	  <circle class="handling1" r="40" cx="240" />
	  <circle class="handling1" r="40" cx="360" />
	  <circle class="handling1" r="40" cx="480" />
	</g>
</svg>

<div class="status">Click on a circle</div>

<script>
d3.selectAll('circle.handling1')
  .on('click', function(d, i) {
    d3.select('.status')
      .text('You clicked on circle ' + (i + 1));
  });
</script>
{{< /tab >}}
{{< /tabs >}}

**E.g. with mouse over:** same example using the `mouseover` handling event:

{{< tabs "HandlingEvents2" >}}
{{< tab "html" >}}
```html
<svg width="760" height="140">
<g transform="translate(70, 70)">
  <circle r="40" />
  <circle r="40" cx="120" />
  <circle r="40" cx="240" />
  <circle r="40" cx="360" />
  <circle r="40" cx="480" />
</g>
</svg>

<div class="status">Pass mouse over a circle</div>

<script>
d3.selectAll('circle')
  .on('click', function(d, i) {
    d3.select('.status')
      .text('This is the circle ' + (i + 1));
  });
</script>
```
{{< /tab >}}
{{< tab ">>" >}}
<svg width="760" height="140">
	<g transform="translate(70, 70)">
	  <circle class="handling2" r="40" />
	  <circle class="handling2" r="40" cx="120" />
	  <circle class="handling2" r="40" cx="240" />
	  <circle class="handling2" r="40" cx="360" />
	  <circle class="handling2" r="40" cx="480" />
	</g>
</svg>

<div class="statusover">Pass mouse over a circle</div>

<script>
d3.selectAll('circle.handling2')
  .on('mouseover', function(d, i) {
    d3.select('.statusover')
      .text('This is the circle ' + (i + 1));
  });
</script>
{{< /tab >}}
{{< /tabs >}}

The most common events include (see [MDN event reference for more details](https://developer.mozilla.org/en-US/docs/Web/Events#Standard_events)):

|Event name|Description|
|:-|:-|
|click|Element has been clicked|
|mouseenter|Mouse pointer has moved onto the element|
|mouseover|Mouse pointer has moved onto the element or its children|
|mouseleave|Mouse pointer has moved off the element|
|mouseout|Mouse pointer has moved off the element or its children|
|mousemove|Mouse pointer has moved over the element|

### event callback: `this` variable
In the event callback function the `this` variable is bound to the DOM element. This allows us to do things such as:

{{< tabs "EventCallback" >}}
{{< tab "js" >}}
```js
d3.selectAll('circle')
  .on('click', function(d, i) {
    d3.select(this)
      .style('fill', 'orange');
  });
``` 
{{< /tab >}}
{{< tab ">>" >}}

{{< svgCircle this >}}

Click on a circle

<script>
d3.selectAll('circle.this')
  .on('click', function(d, i) {
    d3.select(this)
      .style('fill', 'red');
 });
</script>

{{< /tab >}}
{{< /tabs >}}

Note that `this` is a DOM element and not a D3 selection so if we wish to modify it using D3 we must first select it using `d3.select(this)`.

## Chaining
Most selection functions return the selection, meaning that selection functions such as `.style`, `.attr` and `.on` can be chained:

```js
d3.selectAll('circle')
  .style('fill', 'orange')
  .attr('r', 20)
  .on('click', function(d, i) {
    d3.select('.status')
      .text('You clicked on circle ' + i);
  });
```

## `.each` and `.call`
`.each` allows a function to be called on each element of a selection and `.call` allows a function to be called on the selection itself.

In the case of `.each` D3 passes in the joined datum (usually represented by `d`) and the index (usually represented by `i`). Not only can .each enable reusable components but it also allows computations to be shared across calls to `.style`, `.attr` etc.

Here’s an example of using `.each` to call a reusable component:

{{< tabs "EachEg1" >}}
{{< tab "js" >}}
```js
function addNumberedCircle(d, i) {
  d3.select(this)
    .append('circle')
    .attr('r', 40)
    .style('fill', 'orange');

  d3.select(this)
    .append('text')
    .text(i + 1)
    .attr('y', 50)
    .attr('x', 30);
}

d3.selectAll('g.item')
  .each(addNumberedCircle);
``` 
{{< /tab >}}
{{< tab ">>" >}}
<svg width="760" height="140">
	<g class ='eacheg' transform="translate(70, 70)">
	</g>
	<g class ='eacheg' transform="translate(200, 70)">
	</g>
	<g class ='eacheg' transform="translate(330, 70)">
	</g>
	<g class ='eacheg' transform="translate(460, 70)">
	</g>
</svg>

<script>
function addNumberedCircle(d, i) {
  d3.select(this)
    .append('circle')
    .attr('r', 40)
    .style('fill', 'orange');

  d3.select(this)
    .append('text')
    .text(i + 1)
    .attr('y', 50)
    .attr('x', 30);
}

d3.selectAll('g.eacheg')
  .each(addNumberedCircle);
</script>
{{< /tab >}}
{{< /tabs >}}

Here’s an example of `.each` used for the latter:

{{< tabs "EachEg2" >}}
{{< tab "js" >}}
```js
d3.selectAll('circle')
  .each(function(d, i) {

   // to select odd-indexed circles (i starts at 0)	
   var odd = i % 2 === 1;   

   d3.select(this)
     .style('fill', odd ? 'orange' : '#ddd')
     .attr('r', odd ? 40 : 20);
  });
``` 
{{< /tab >}}
{{< tab ">>" >}}

{{< svgCircle eacheg2 >}}

<script>
d3.selectAll('circle.eacheg2')
  .each(function(d, i) {
    var odd = i % 2 === 1;  

    d3.select(this)
      .style('fill', odd ? 'orange' : '#ddd')
      .attr('r', odd ? 40 : 20);
  });
</script>
{{< /tab >}}
{{< /tabs >}}


In the case of `.call` D3 passes in the selection itself. This is a common pattern for reusable components.

In the following example we create a similar component to before using `.call`. This time the selection gets passed into the component (rather than d and i):

```js
function addNumberedCircle(selection) {
  selection
    .append('circle')
    .attr('r', 40);

  selection
    .append('text')
    .text(function(d, i) {
      return i + 1;
    })
    .attr('y', 50)
    .attr('x', 30);
}

d3.selectAll('g.item')
  .call(addNumberedCircle);
```

## Filtering and sorting selections
We can filter a selection using `.filter`. A function is usually passed into `.filter` which returns true if the element should be included. `.filter` returns the filtered selection.

In this example we filter through even-numbered elements and colour them orange:

{{< tabs "Filter" >}}
{{< tab "js" >}}
```js
d3.selectAll('circle')
  .filter(function(d, i) {
   // to select even-indexed circles (i starts at 0)	  	
    return i % 2 === 0;
  })
  .style('fill', 'blue')
  .attr('r', 10);
``` 
{{< /tab >}}
{{< tab ">>" >}}

{{< svgCircle filtering >}}

<script>
d3.selectAll('circle.filtering')
  .filter(function(d, i) {
    return i % 2 === 0;
  })
  .style('fill', 'blue')
  .attr('r', 10);
</script>

{{< /tab >}}
{{< /tabs >}}

Sorting only really makes sense if data has been _joined to the selection_, see [data joins](/posts/javascript/data-joins).

We can sort elements in a selection by calling `.sort` and passing in a {{< code gold >}}comparator function{{< /code >}}. The comparator function has two arguments, usually `a` and `b`, which represent the datums on the two elements being compared. If the comparator function returns a negative number, `a` will be placed before `b` and if positive, `a` will be placed after `b`.

Thus if we have the following data joined to a selection:

```html
myData = [
  {
    "name": "Andy",
    "score": 37
  },
  {
    "name": "Beth",
    "score": 39
  },
  {
    "name": "Craig",
    "score": 31
  },
  {
    "name": "Diane",
    "score": 35
  },
  {
    "name": "Evelyn",
    "score": 38
  }
]
```
we can sort by score using:

{{< tabs "Sorting" >}}
{{< tab "js" >}}
```html
<script>
myData = [
  {
    "name": "Andy",
    "score": 37
  },
  {
    "name": "Beth",
    "score": 39
  },
  {
    "name": "Craig",
    "score": 31
  },
  {
    "name": "Diane",
    "score": 35
  },
  {
    "name": "Evelyn",
    "score": 38
  }
]

d3.selectAll('.person')
    .sort(function(a, b) {
      return b.score - a.score;
    });
</script>
``` 
{{< /tab >}}
{{< tab ">>" >}}
<style>
  .person {
    height: 20px;
    position: relative;
  }
  .person .label {
    width: 90px;
    text-align: right;
  }
  .person .bar {
    height: 19px;
    background-color: steelblue;
    position: absolute;
    left: 100px;
  }
  .person div {
    display: inline-block;
  }
</style>

<div id="wrapper"></div>

<div class="menu">
	<button onClick="sort();">Sort</button>
</div>

<script>
myData = [
  {
    "name": "Andy",
    "score": 37
  },
  {
    "name": "Beth",
    "score": 39
  },
  {
    "name": "Craig",
    "score": 31
  },
  {
    "name": "Diane",
    "score": 35
  },
  {
    "name": "Evelyn",
    "score": 38
  }
];

var barWidth = 400;
var barScale = d3.scaleLinear().domain([0, 100]).range([0, barWidth]);

var u = d3.select('#wrapper')
  .selectAll('.person')
  .data(myData);

var entering = u.enter()
  .append('div')
  .classed('person', true);

entering.append('div')
  .classed('label', true)
  .text(function(d) {
    return d.name;
  });

entering.append('div')
  .classed('bar', true)
  .style('width', function(d) {
    return barScale(d.score) + 'px';
  });

function sort() {
  d3.selectAll('.person')
    .sort(function(a, b) {
      return b.score - a.score;
    });
}
  </script>

{{< /tab >}}
{{< /tabs >}}
