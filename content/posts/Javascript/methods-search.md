---
title: "Search Methods"
date: 2020-04-21T15:41:39+02:00
series: ["D3"]
tags: ['scan', 'bisect', 'bisectRight', 'bisectLeft', 'bisector', 'left', 'right', 'ascending', 'descending']
categories: ["Javascript"]
---

Methods for searching arrays for a specific element:

### `d3.scan()`
`d3.scan(array, comparator)` performs a linear search (_scan_) of the specified array, returning the index of the least element according to the specified comparator (i.e. how the minimum element is to be obtained).

{{< tabs "Scan" >}}
{{< tab "js" >}}
```js
var array = [4, 28, 3, 21, 20, 6, 2, 43, 16, 29];

// to obtain the minimum/maximum element in the array
indexMin = d3.scan(array, function(a, b) { return a - b});
indexMax = d3.scan(array, function(a, b) { return b - a});

console.log("Minimun element is " + array[indexMin] + " present at index: " + indexMin);
console.log("Maximum element is " + array[indexMax] + " present at index: " + indexMax);
``` 
{{< /tab >}}
{{< tab ">>" >}}
```html
Minimun element is 2 present at index: 6
Maximum element is 43 present at index: 7
```
{{< /tab >}}
{{< /tabs >}}

This function is similar to `.min()/.max()`, except it allows the use of a comparator rather than an accessor and it returns the index instead of the accessed value.

{{< betonen gold >}}
Case the data is in a `JSON` format, use

{{< code gold>}}var array = [{foo: 42}, {foo: 91}];{{< /code >}}

{{< code gold>}}d3.scan(array, function(a, b) { return a.foo - b.foo; }); // 0{{< /code >}}
{{< code gold>}}d3.scan(array, function(a, b) { return b.foo - a.foo; }); // 1{{< /code >}}
{{< code gold>}}{{< /code >}}
{{< /betonen >}}


### `d3.bisect()`, `d3.bisectRight()` and `d3.bisectLeft()`
Is a binary search for a value in a sorted array. `d3.bisect()` finds the position into which a given value can be inserted into a sorted array while maintaining sorted order.

E.g. suppose an array `var data = [3, 6, 2, 7, 5, 4, 8]` and we want to insert a new value, e.g. `3.5` into `data` array and we want to know how that would _partition_ it (i.e. in other words, what would be the `3.5` index if it were inserted when `data` is sorted):

```js
var data = [3, 6, 2, 7, 5, 4, 8]

// sorting the data:
// data = [2, 3, 4, 5, 6, 7, 8]
// inserting 3.5:
// data = [2, 3, 3.5, 4, 5, 6, 7, 8] 
// therefore the index of 3.5 is 2.

bIndex = d3.bisect(data, 3.5); //2
```
`.bisectRight()` and `.bisectLeft()` resolve the anomaly when the new number is already in the array, e.g.

```js
d3.bisectRight([0, 1, 1, 2], 1) // returns 3
d3.bisectLeft([0, 1, 1, 2], 1) // returns 1
```
The default `d3.bisect()` uses the `d3.bisectRight()` strategy.

### `d3.bisector()`, `bisector.left()` and `bisector.right()`
Compute a `.bisect()` using an accessor or comparator, i.e.




### `d3.ascending()`
Compute the natural order of two values.

### `d3.descending()` 
Compute the natural order of two values.

