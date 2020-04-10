---
title: "Enter Exit"
date: 2020-03-28T17:23:38+01:00
series: ["D3"]
tags: ['enter', 'append', 'exit', 'merge']
categories: ["Javascript"]
---
<script src="//d3js.org/d3.v4.min.js"></script>

<script>
var myDataAE = ['A', 'B', 'C', 'D', 'E'];
</script>

In the [Data joins](/posts/javascript/data-joins)  we show how to join an array of data to a D3 selection.

To recap, given some DOM elements and some data:

```html
<div id="content">
  <div></div>
  <div></div>
  <div></div>
</div>

var myData = [ 10, 40, 20 ];
```
we join the array to the div elements using:

```js
d3.select('#content')
  .selectAll('div')
  .data(myData);
```

In this example myData is the same length as the selection (i.e. 3 divs and len (myData) = 3).

However, {{< color blue >}}what happens if the array has more (or less) elements than the selection?{{< /color >}}

- if the array is longer than the selection there’s a _shortfall_ of DOM elements and we need to _add_ elements
- if the array is shorter than the selection there’s a _surplus_ of DOM elements and we need to _remove_ elements

Fortunately D3 can help in adding and removing DOM elements using two functions `.enter` and `.exit`.

## `.enter`

`.enter` identifies any DOM elements that need to be added when the {{< color blue >}}joined array is longer than the selection{{< /color >}}. It’s defined on an update selection (the selection returned by `.data`):

```js
d3.select('#content')
  .selectAll('div')
  .data(myData)
  .enter();
```

`.enter` returns an enter selection which basically represents _the elements that need to be added_. 

```js
d3.select('#content')
  .selectAll('div')
  .data(myData)
  .enter()
  .append('div');
```

{{< betonen gold >}}
It’s usually followed by <code style="color:black;background-color:rgba(255, 180, 0, 0.2);">.append</code> which adds elements to the DOM:
{{< /betonen >}}

Let’s look at an example. Suppose we have the following `div` elements and this data:

```html
<div id="content">
  <div></div>
  <div></div>
  <div></div>
</div>

var myData = ['A', 'B', 'C', 'D', 'E'];
```

we use `.enter` and `.append` to add div elements for D and E:

{{< tabs "Enter1" >}}
{{< tab "js" >}}
```html
<style>
#content div {
	display: inline-block;
	margin: 10px;
	background-color: orange;
	color: white;
	padding: 30px;
	width: 10px;
	height: 10px;
	text-align: center;
}
</style>

<div id="content">
  <div></div>
  <div></div>
  <div></div>
</div>

<div id="menu">
	<button onClick="doEnter();">Add elements using .enter and .append</button>
</div>

<script>
	d3.select('#content')
	.selectAll('div')
	.data(myData)
	.enter()
	.append('div'); 
</script>
``` 
{{< /tab >}}

{{< tab ">>" >}}
<style>
#content1 div {
	display: inline-block;
	margin: 10px;
	background-color: orange;
	color: white;
	padding: 30px;
	width: 10px;
	height: 10px;
	text-align: center;
}
</style>

<div id="content1">
  <div></div>
  <div></div>
  <div></div>
</div>

<div id="menu">
	<button onClick="doEnter();">Add elements using .enter and .append</button>
</div>

<script>

function doEnter() {
	d3.select('#content1')
	  .selectAll('div')
	  .data(myDataAE)
	  .enter()
	  .append('div');
}
</script>

{{< /tab >}}
{{< /tabs >}}

{{< betonen gold >}}
The code above, add 2x `div`-element to the DOM. Since, each `div` is stylized to display a `inline-block`, the final results is additional blocks.
{{< /betonen >}}

Note that we can join an array to an empty selection which is a very common pattern in the examples on the D3 website:

{{< tabs "Enter2" >}}
{{< tab "js" >}}

```html
<style>
#content div {
	display: inline-block;
	margin: 10px;
	background-color: orange;
	color: white;
	padding: 30px;
	width: 10px;
	height: 10px;
	text-align: center;
}
</style>

<div id="content">
</div>

<div id="menu">
	<button onClick="doEnter();">Add elements using .enter and .append</button>
</div>

<script>
	d3.select('#content')
	.selectAll('div')
	.data(myData)
	.enter()
	.append('div'); 
</script>
``` 
{{< /tab >}}

{{< tab ">>" >}}
<style>
#content2 div {
	display: inline-block;
	margin: 10px;
	background-color: orange;
	color: white;
	padding: 30px;
	width: 10px;
	height: 10px;
	text-align: center;
}
</style>

<div id="content2">
</div>

<div id="menu2">
	<button onClick="doEnterNull();">Add elements using .enter and .append</button>
</div>

<script>
function doEnterNull() {
	d3.select('#content2')
	  .selectAll('div')
	  .data(myDataAE)
	  .enter()
	  .append('div');
}
</script>

{{< /tab >}}
{{< /tabs >}}

## `.exit`
`.exit` returns an exit selection which consists of {{< color blue >}}the elements that need to be removed{{< /color >}} from the DOM. It’s usually followed by `.remove`:

```js
d3.select('#content')
  .selectAll('div')
  .data(myData)
  .exit()
  .remove();
```
Let’s repeat the example above, but using `.exit`. Starting with elements and data (that it’s shorter than the selection):

```html
<div id="content">
  <div></div>
  <div></div>
  <div></div>
</div>

var myData = ['A'];
```

we use `.exit` and `.remove` to remove the surplus elements:

```js
d3.select('#content')
  .selectAll('div')
  .data(myData)
  .exit()
  .remove();
```

## Putting it all together
So far in this section we’ve not concerned ourselves with modifying elements using functions such as `.style`, `.attr` and `.classed`.

D3 allows us to be specific about which elements are modified when new elements are entering. We can modify:
- the existing elements
- the entering elements
- both existing and entering elements

(Most of the time the last option is sufficient, but sometimes we might want to style entering elements differently).

The existing elements are represented by the update selection. This is the selection returned by `.data` and is assigned to `u` in this example:

{{< tabs "Enter3" >}}

{{< tab "js A" >}}
```js
var myData = ['A', 'B', 'C', 'D', 'E'];

var u = d3.select('#content')
  .selectAll('div')
  .data(myData);

u.enter()
  .append('div');

u.text(function(d) {
  return d;
});
``` 
{{< /tab >}}
{{< tab ">>" >}}
<style>
#content3a div {
	display: inline-block;
	margin: 2px;
	background-color: orange;
	color: white;
	width: 40px;
	height: 30px;
	text-align: center;
}
</style>

<div id="content3a">
  <div></div>
  <div></div>
  <div></div>
</div>

<div id="menu2a">
	<button onClick="doEnterUpdateA();">Add elements using .enter and .append</button>
</div>

<script>
function doEnterUpdateA() {
var u1 = d3.select('#content3a')
  .selectAll('div')
  .data(myDataAE);

u1.enter()
  .append('div');

u1.text(function(d) {
  return d;
});
}
</script>
{{< /tab >}}

{{< tab "js B" >}}
```js
var myData = ['A', 'B', 'C', 'D', 'E'];

var u = d3.select('#content')
  .selectAll('div')
  .data(myData);

u.enter()
  .append('div')
  .text(function(d) {
  return d;
  });
``` 
{{< /tab >}}
{{< tab ">>" >}}
<style>
#content3b div {
	display: inline-block;
	margin: 2px;
	background-color: orange;
	color: white;
	width: 40px;
	height: 30px;
	text-align: center;
}
</style>

<div id="content3b">
  <div></div>
  <div></div>
  <div></div>	
</div>

<div id="menu2b">
	<button onClick="doEnterUpdateB();">Add elements using .enter and .append</button>
</div>

<script>
function doEnterUpdateB() {
var u2 = d3.select('#content3b')
  .selectAll('div')
  .data(myDataAE);

 u2.enter()
  .append('div')
  .text(function(d) {
  return d;
  });
}
</script>
{{< /tab >}}

{{< /tabs >}}

In {{< code gold>}}jsA{{< /code >}} when the button is clicked, new elements are added, but because `.text` is only called on the update selection (i.e. `u = d3.select('#content3b').selectAll('div')`), it’s only the existing elements that are modified. 

{{< betonen gold >}}
(Note that if the button is clicked a second time, all the elements are modified. This is because the selection will contain all 5 div elements){{< /betonen >}}

The entering elements are represented by the {{< color blue >}}enter selection{{< /color >}}. This is the selection returned by `.enter`. 

In {{< code gold>}}jsB{{< /code >}} when the button is clicked, new elements are added and their text content is updated. {{< color blue >}}Only the entering elements have their text updated{{< /color >}} because we call `.text` on the enter selection.

{{< color blue >}}If we want to modify the existing and entering elements{{< /color >}} we could call `.text` on the update and enter selections.

However D3 has a function `.merge` which can merge selections together. This means we can do the following:

{{< tabs "Enter4" >}}
{{< tab "js" >}}
```js
var myData = ['A', 'B', 'C', 'D', 'E'];

var u = d3.select('#content')
  .selectAll('div')
  .data(myData);

u.enter()
  .append('div')
  .merge(u)
  .text(function(d) {
    return d;
  }); 
``` 
{{< /tab >}}
{{< tab ">>" >}}
<style>
#content4 div {
	display: inline-block;
	margin: 2px;
	background-color: orange;
	color: white;
	width: 40px;
	height: 30px;
	text-align: center;
}
</style>

<div id="content4">
  <div></div>
  <div></div>
  <div></div>	
</div>

<div id="menu4">
	<button onClick="doEnterUpdate4();">Add elements using .enter and .append</button>
</div>

<script>
function doEnterUpdate4() {
var u3 = d3.select('#content4')
  .selectAll('div')
  .data(myDataAE);

 u3.enter()
  .append('div')
  .merge(u)
  .text(function(d) {
  return d;
  });
}
</script>
{{< /tab >}}
{{< /tabs >}}

{{< code gold>}}This is a big departure from v3{{< /code >}}. The entering elements were implicitly included in the update selection so there was no need for `.merge`.

## General update pattern
A common pattern (proposed by D3’s creator [Mike Bostock](https://bl.ocks.org/mbostock/3808218)) is to encapsulate the above behaviour of {{< color blue >}}adding, removing and updating{{< /color >}} DOM elements in a single function:


{{< tabs "Enter5" >}}
{{< tab "js" >}}
```js
function update(data) {
  var u = d3.select('#content')
    .selectAll('div')
    .data(data);

  u.enter()
    .append('div')			//add necessary DOM elements
    .merge(u)
    .text(function(d) {
      return d;
    });

  u.exit().remove();		//remove excess DOM elements
} 
``` 
{{< /tab >}}
{{< tab ">>" >}}
<style>
#contentEnter5 div {
	display: inline-block;
	margin: 2px;
	background-color: orange;
	color: white;
	padding: 8px;
	width: 28px;
	height: 28px;
	text-align: center;
}
</style>

<div id="menu">
	<button onClick="doUpdateEnter5();">Update</button>
</div>

<div id="contentEnter5">
</div>

<script>
var letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

function doUpdateEnter5() {
	var rand = Math.floor( Math.random() * 26 );
	var myDataA = letters.slice(0, rand).split('');
	update(myDataA);
}

function update(data) {
	var u5 = d3.select('#contentEnter5')
	  .selectAll('div')
	  .data(data);

	u5.enter()
	  .append('div')
	  .merge(u5)
		.text(function(d) {
			return d;
		});

	u5.exit().remove();
}

doUpdateEnter5();
</script>

{{< /tab >}}
{{< /tabs >}}


Typically the update function is called whenever the data changes. 

Here’s another example where we colour only the entering elements orange:

```js
function update(data) {
  var u = d3.select('#content')
    .selectAll('div')
    .data(data);

  u.enter()
    .append('div')
    .classed('new', true)
    .text(function(d) {
      return d;
    });

  u.text(function(d) {
      return d;
    })
    .classed('new', false);

  u.exit().remove();
}
```
## Data join key function
When we do a data join, D3 binds the first array element to the first element in the selection, the second array element to the second element in the selection and so on.

However, {{< color blue >}}if the order of array elements changes{{< /color >}} (such as during element sorting, insertion or removal), the array elements might get joined to different DOM elements.

We can solve this problem by providing `.data` with a key function. This function should return a unique {{< code gold>}}id value{{< /code >}} for each array element, allowing D3 to make sure each array element stays joined to the same DOM element.

Let’s look at 2 examples, first using a key function, and then without:

We start with an array `['Z']` and each time the button is clicked a new letter is added at the start of the array.

Because of the key function each letter will stay bound to the same DOM element meaning that when a new letter is inserted each existing letter transitions into a new position:

{{< tabs "Enter6" >}}
{{< tab "js" >}}
```html
<script>
var letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
var i = 25;

function doInsert() {
	if(i < 0)
		return;

	var myData = letters.slice(i).split('');
	i--;
	update(myData);
}

function update(data) {
	var u = d3.select('#content')
		.selectAll('div')
		.data(data, function(d) {
			return d;
		});

	u.enter()
		.append('div')
		.merge(u)
		.transition()
		.style('left', function(d, i) {
			return i * 32 + 'px';
		})
		.text(function(d) {
			return d;
		});
}

doInsert();
</script>
``` 
{{< /tab >}}
{{< tab ">>" >}}
<style>
#contentE6A {
	position: relative;
	height: 40px;
}
#contentE6A div {
	position: absolute;
	margin: 2px;
	background-color: orange;
	color: white;
	padding: 8px;
	width: 28px;
	height: 28px;
	text-align: top;
}
</style>

<div id="contentE6A">
</div>

<div id="menu">
	<button onClick="doInsertE6A();">Insert element</button>
</div>

<script>
var letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
var i = 25;

function doInsertE6A() {
	if(i < 0)
		return;

	var myData6A = letters.slice(i).split('');
	i--;
	updateA(myData6A);
}

function updateA(data) {
	var u7 = d3.select('#contentE6A')
		.selectAll('div')
		.data(data, function(d) {
			return d;
		});

	u7.enter()
		.append('div')
		.merge(u7)
		.transition()
		.style('left', function(d, i) {
			return i * 32 + 'px';
		})
		.text(function(d) {
			return d;
		});
}

doInsertE6A();
</script>
{{< /tab >}}
{{< /tabs >}}

Without a key function the DOM elements’ text is updated (rather than position) meaning we lose a meaningful transition effect:

{{< tabs "Enter7" >}}
{{< tab "js" >}}
```html
<script>
var letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
var i = 25;

function doInsert() {
	if(i < 0)
		return;

	var myData = letters.slice(i).split('');
	i--;
	update(myData);
}

function update(data) {
	var u = d3.select('#content')
		.selectAll('div')
		.data(data);		<!-- %%% CHANGED %%% -->

	u.enter()
		.append('div')
		.merge(u)
		.transition()
		.style('left', function(d, i) {
			return i * 32 + 'px';
		})
		.text(function(d) {
			return d;
		});
}

doInsert();
</script>
``` 
{{< /tab >}}
{{< tab ">>" >}}
<style>
#contentE6B {
	position: relative;
	height: 40px;
}
#contentE6B div {
	position: absolute;
	margin: 2px;
	background-color: orange;
	color: white;
	padding: 8px;
	width: 28px;
	height: 28px;
	text-align: top;
}
</style>

<div id="contentE6B">
</div>

<div id="menu">
	<button onClick="doInsertE6B();">Insert element</button>
</div>

<script>
var lettersA = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
var j = 25;

function doInsertE6B() {
	if(j < 0)
		return;

	var myData6B = letters.slice(j).split('');
	j--;
	updateB(myData6B);
}

function updateB(data) {
	var u8 = d3.select('#contentE6B')
		.selectAll('div')
		.data(data);

	u8.enter()
		.append('div')
		.merge(u8)
		.transition()
		.style('left', function(d, i) {
			return i * 32 + 'px';
		})
		.text(function(d) {
			return d;
		});
}

doInsertE6B();
</script>
{{< /tab >}}
{{< /tabs >}}

{{< betonen gold >}}
There’s many instances when key functions are not required but if there’s any chance that your data elements can change position (e.g. through insertion or sorting) and you’re using transitions then you should probably use them.
{{< /betonen >}}