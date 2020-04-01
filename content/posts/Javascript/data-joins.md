---
title: "Data Joins"
date: 2020-03-28T17:23:30+01:00
series: ["D3"]
tags: ['.data', 'data join', '.datum']
categories: ["Javascript"]
---
<style>
  body {
    font-family: "Helvetica Neue", Helvetica, sans-serif;
    font-size: 14px;
  }
</style>
<script src="//d3js.org/d3.v4.min.js"></script>

Given an array of data and a D3 selection we can _attach_ or _join_ each array element to each element of the selection.

This creates a close relationship between your data and graphical elements which makes {{< code gold>}}data-driven modification{{< /code >}} of the elements straightforward.

For example if we have some SVG circles:
```html
<circle r="40" />
<circle r="40" cx="120" />
<circle r="40" cx="240" />
<circle r="40" cx="360" />
<circle r="40" cx="480" />
```
and some data:

```html
var myData = [
  {
    "name": "Andy",
    "score": 25
  },
  {
    "name": "Beth",
    "score": 39
  },
  {
    "name": "Craig",
    "score": 42
  },
  {
    "name": "Diane",
    "score": 35
  },
  {
    "name": "Evelyn",
    "score": 48
  }
]
```
We can select the circles, join the array to it and then manipulate the circles according to the joined data:

{{< tabs "DataJoin1" >}}
{{< tab "js" >}}
```js
d3.selectAll('circle')
  .data(myData)
  .attr('r', function(d) {
    return d.score;
  });
```
{{< /tab>}}
{{< tab ">>" >}}

{{< svgCircle dj >}}

<script>
var myData = [
  {
    "name": "Andy",
    "score": 25
  },
  {
    "name": "Beth",
    "score": 39
  },
  {
    "name": "Craig",
    "score": 42
  },
  {
    "name": "Diane",
    "score": 35
  },
  {
    "name": "Evelyn",
    "score": 48
  }
]

d3.selectAll('circle.dj')
  .data(myData)
  .attr('r', function(d) {
    return d.score;
  });
</script>

{{< /tab>}}

{{< tab "js" >}}
```js
function dataJoin() {

  d3.select(this)
    .append('circle')
    .style('fill', 'gold')
    .attr('r', function(d) {
    	return d.score;
  	});

  d3.select(this)
    .append('text')
    .text(function(d) {
    	return d.name;
  	});
}

d3.selectAll('g.item')
  .data(myData)
  .each(dataJoin); 
``` 
{{< /tab >}}
{{< tab ">>" >}}

<svg width="760" height="140">
	<g class ='dj1' transform="translate(70, 70)">
	</g>
	<g class ='dj1' transform="translate(200, 70)">
	</g>
	<g class ='dj1' transform="translate(330, 70)">
	</g>
	<g class ='dj1' transform="translate(460, 70)">
	</g>
	<g class ='dj1' transform="translate(590, 70)">
	</g>	
</svg>

<script>
var myData = [
  {
    "name": "Andy",
    "score": 25
  },
  {
    "name": "Beth",
    "score": 39
  },
  {
    "name": "Craig",
    "score": 42
  },
  {
    "name": "Diane",
    "score": 35
  },
  {
    "name": "Evelyn",
    "score": 48
  }
]  

function dataJoin() {
  d3.select(this)
    .append('circle')
    .style('fill', 'gold')
    .attr('r', function(d) {
    	return d.score;
  	});

  d3.select(this)
    .append('text')
    .text(function(d) {
    	return d.name;
  	});
}

d3.selectAll('g.dj1')
  .data(myData)
  .each(dataJoin);
</script>

{{< /tab >}}
{{< /tabs >}}

The above code sets the radius of each circle to each person’s score.

## Making a data join
Given an array myData and a selection `s` a data join is created using the function `.data()`:

```js
var myData = [ 10, 40, 20, 30 ];

var s = d3.selectAll('circle');

s.data(myData);
```
The array can contain any type e.g. _objects_:

```js
var cities = [
  { name: 'London', population: 8674000},
  { name: 'New York', population: 8406000},
  { name: 'Sydney', population: 4293000}
];

var s = d3.selectAll('circle');

s.data(cities);
```
Although a couple of things occur when `.data` is called (see [Under the Hood](#under-the-hood) and [Enter/Exit](/posts/javascript/enter-exit)) you probably won’t notice much change after joining your data.

{{< color blue >}}The real magic happens when you want to modify the elements in your selection according to your data.{{< /color >}}

## Data-driven modification of elements
Once we’ve joined data to a selection we can modify elements by passing a function into the likes of `.style` and `.attr` (covered in [Selections](/posts/javascript/selections)):

```js
d3.selectAll('circle')
  .attr('r', function(d) {
    return d;
  });

```
For each element in the selection D3 will call this function, passing in the element’s joined data as the first argument d. The function’s return value is used to set the style or attribute value.

For example, given some circles and some data:
```html
<circle />
<circle />
<circle />
<circle />
<circle />

<script>
var myData = [ 10, 40, 20, 30, 50 ]
...

</script>
```

let’s perform the data join:

```js
var s = d3.selectAll('circle');

// Do the join
s.data(myData);
```
Now let’s update the radius of each circle in the selection to be equal to the corresponding data values:

{{< tabs "DataJoin2" >}}
{{< tab "js" >}}
```js
s.attr('r', function(d) {
  return d;
}); 
``` 
{{< /tab >}}
{{< tab ">>" >}}
<svg width = "760" heigth = "140">
 <g transform="translate(70,70)">
	<circle class='dj3' cx= "0"/>
  	<circle class='dj3' cx= "120"/>
	<circle class='dj3' cx= "240"/>
	<circle class='dj3' cx= "360"/>
	<circle class='dj3' cx= "480"/>
 </g>
</svg>

<script>
var myData2 = [ 10, 20, 30, 40, 50 ]

var s = d3.selectAll('circle.dj3');

s.data(myData2);
s.attr('r', function(d) {
  return d;
});

</script>

{{< /tab >}}
{{< /tabs >}}

The function that’s passed into `.attr` is called 5 times (once for each element in the selection). The first time round `d` will be 10 and so the circle’s radius will be set to 10. The second time round it’ll be 20 and so on.

In the above example the function simply returns `d` meaning that the first circle’s radius will be set to 10, the second’s radius to 20 and so.

We can return anything we like from the function, so long as it’s a valid value for the style, attribute etc. that we’re modifying. (It’s likely that some expression involving `d` will be returned.)

For example we can set the radius to twice d using:
```js
s.attr('r', function(d) {
  return 2 * d;
});
```
Now let’s set a class (`high`) on each element if the value is >= 40 and finally we’ll position the circles horizontally using the `i` argument (see [Selections](/posts/javascript/selections)):

{{< tabs "DataJoin4" >}}
{{< tab "js" >}}
```js
/**
<style>
circle.high {
	stroke: gold;
	stroke-width: 4px;
	}
</style>
**/

s.classed('high', function(d) {
  return d >= 40; // returns true or false
});

s.attr('cx', function(d, i) {
  return i * 120;
});
``` 
{{< /tab >}}
{{< tab ">>" >}}
<style>
circle.high {
	stroke: gold;
	stroke-width: 4px;
	}
</style>

<svg width = "760" heigth = "140">
 <g transform="translate(70,70)">
	<circle id='dj4' cx= "0"/>
  	<circle id='dj4' cx= "120"/>
	<circle id='dj4' cx= "240"/>
	<circle id='dj4' cx= "360"/>
	<circle id='dj4' cx= "480"/>
 </g>
</svg>

<script>
var myData4 = [ 10, 20, 30, 40, 50 ]

var s = d3.selectAll('#dj4');

s.data(myData4);

s.attr('r', function(d) {
  return d;
  })
  .classed('high', function(d) {
    return d >= 40;
  })
  .attr('cx', function(d, i) {
    return i * 90;
  });

</script>

{{< /tab >}}
{{< /tabs >}}

## Arrays of objects
If we have an array of objects we can join it in the usual manner:

```js
var cities = [
  { name: 'London', population: 8674000},
  { name: 'New York', population: 8406000},
  { name: 'Sydney', population: 4293000},
  { name: 'Paris', population: 2244000},
  { name: 'Beijing', population: 11510000}
];

var s = d3.selectAll('circle');

s.data(cities);
```
Now when we modify elements based on the joined data, `d` will represent {{< color blue >}}the joined object{{< /color >}}. Thus for the first element in the selection, `d` will be {{< code gold >}}{ name: 'London', population: 8674000}{{< /code >}}.

Let’s set the circle radius proportionally to each city’s population:

{{< tabs "DataJoin5" >}}
{{< tab "js" >}}
```js
s.attr('r', function(d) {
    var scaleFactor = 0.000005;
    return d.population * scaleFactor;
  })
  .attr('cx', function(d, i) {
    return i * 120;
  }); 
``` 
{{< /tab >}}
{{< tab ">>" >}}

{{< svgCircle dj5 >}}

<script>
var cities = [
  { name: 'London', population: 8674000},
  { name: 'New York', population: 8406000},
  { name: 'Sydney', population: 4293000},
  { name: 'Paris', population: 2244000},
  { name: 'Beijing', population: 11510000}
]

d3.selectAll('circle.dj5')
  .data(cities)
  .style('fill', 'red')
  .attr('r', function(d) {
    var scaleFactor = 0.000005;
    return d.population * scaleFactor;
  })
  .attr('cx', function(d, i) {
    return i * 110;
  });

</script>

{{< /tab >}}
{{< /tabs >}}

Of course, we not restricted to modifying circle elements. Supposing we had some rect and text elements, we can build a simple bar chart:

{{< tabs "DataJoin6" >}}
{{< tab "js" >}}
```js
var cities = [
  { name: 'London', population: 8674000},
  { name: 'New York', population: 8406000},
  { name: 'Sydney', population: 4293000},
  { name: 'Paris', population: 2244000},
  { name: 'Beijing', population: 11510000}
];

// Join cities to rect elements and modify height, width and position
d3.selectAll('rect')
  .data(cities)
  .attr('height', 19)
  .attr('width', function(d) {
    var scaleFactor = 0.00004;
    return d.population * scaleFactor;
  })
  .attr('y', function(d, i) {
    return i * 20;
  })

// Join cities to text elements and modify content and position
d3.selectAll('text')
  .data(cities)
  .attr('y', function(d, i) {
    return i * 20 + 13;
  })
  .attr('x', -4)
  .text(function(d) {
    return d.name;
  });
``` 
{{< /tab >}}
{{< tab ">>" >}}

<style>
rect {
  fill: steelblue;
}
rect:hover {
  fill: orange;
}
text {
  text-anchor: end;
}
</style>

<svg width="760" height="140">
<g transform="translate(70, 30)">
  <rect />
  <rect />
  <rect />
  <rect />
  <rect />
</g>
<g transform="translate(70, 30)">
  <text class = 'rect'/>
  <text class = 'rect'/>
  <text class = 'rect'/>
  <text class = 'rect'/>
  <text class = 'rect'/>
</g>
</svg>

<script>
var cities = [
  { name: 'London', population: 8674000},
  { name: 'New York', population: 8406000},
  { name: 'Sydney', population: 4293000},
  { name: 'Paris', population: 2244000},
  { name: 'Beijing', population: 11510000}
];

// Join cities to rect elements and modify height, width and position
d3.selectAll('rect')
  .data(cities)
  .attr('height', 19)
  .attr('width', function(d) {
    var scaleFactor = 0.00004;
    return d.population * scaleFactor;
  })
  .attr('y', function(d, i) {
    return i * 20;
  })

// Join cities to text elements and modify content and position
d3.selectAll('text.rect')
  .data(cities)
  .attr('y', function(d, i) {
    return i * 20 + 13;
  })
  .attr('x', -4)
  .text(function(d) {
    return d.name;
  });
</script>

{{< /tab >}}
{{< /tabs >}}

## Under the hood
When D3 performs a data join it adds an attribute {{< code grey >}}\_\_data\_\_{{< /code >}} to each DOM element in the selection and assigns the joined data to it.

We can inspect this in Google Chrome by right clicking on an element and choosing Inspect.

This’ll reveal Chrome’s debug window. Look for a tab named ‘Properties’ and open it. Expand the element then expand the {{< code grey >}}\_\_data\_\_{{< /code >}} attribute. This is the data that D3 has joined to the element (See [screencast](https://www.youtube.com/watch?v=LJAOk7IxDPs)).

{{< betonen gold >}}Being able to check the joined data in this manner is particularly useful when debugging as it allows us to check whether our data join is behaving as expected.{{< /betonen >}}

## What if our array’s longer (or shorter) than the selection?
So far we’ve looked at data joins where the selection is exactly the same length as the data array. Clearly this won’t always be the case and D3 handles this using `enter` and `exit`. To learn more see the [enter and exit section](/posts/javascript/enter-exit).

## What’s `.datum` for?
There are a few instances (such as when dealing with {{< color blue >}}geographic visualisations{{< /color >}}) where it’s useful to join a single bit of data with a selection (usually containing a single element). Supposing we have an object:

```js
var featureCollection = {type: 'FeatureCollection', features: features};

// we can join it to a single element using .datum:

d3.select('path#my-map')
  .datum(featureCollection);
```
This just adds a {{< code grey >}}\_\_data\_\_{{< /code >}} attribute to the element and assigns the joined data (`featureCollection` in this case) to it. See the [geographic visualisations](/posts/javascript/geographic) section for a deeper look at this.

Most of the time `.data` will be used for data joins. `.datum` is reserved for special cases such as the above.