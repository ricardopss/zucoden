---
title: "Statistics Methods in D3"
date: 2020-04-20T22:15:23+02:00
series: ["D3"]
tags: ['min', 'max', 'extent', 'sum', 'mean', 'median', 'quantile', 'variance', 'deviation']
categories: ["Javascript"]
---

<script src="https://d3js.org/d3.v4.min.js"></script>

Methods for computing basic summary statistics:

- `d3.min():` compute the minimum value in an array.
- `d3.max():` compute the maximum value in an array.
- `d3.extent():` compute the minimum and maximum value in an array (i.e. its range).
- `d3.sum():` compute the sum of an array of numbers.
- `d3.mean():` compute the arithmetic mean of an array of numbers.
- `d3.median():` compute the median of an array of numbers (the 0.5-quantile).
- `d3.quantile():` compute a quantile for a sorted array of numbers.
- `d3.variance():` compute the variance of an array of numbers.
- `d3.deviation():` compute the standard deviation of an array of numbers.

```js
var myData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

console.log(d3.min(myData));			// 1
console.log(d3.max(myData));			// 10
console.log(d3.extent(myData));			// [1, 10]
console.log(d3.sum(myData));			// 55
console.log(d3.mean(myData));			// 5.5
console.log(d3.median(myData));			// 5.5
console.log(d3.quantile(myData, .25));	// 3.25 
console.log(d3.variance(myData));		// 9.1666
console.log(d3.deviation(myData));		// 3.0276
``` 

<script>
var myData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

console.log(d3.min(myData));
console.log(d3.max(myData));
console.log(d3.extent(myData));
console.log(d3.sum(myData));
console.log(d3.mean(myData));
console.log(d3.median(myData));
console.log(d3.quantile(myData, .5));
console.log(d3.variance(myData));
console.log(d3.deviation(myData));
</script>
