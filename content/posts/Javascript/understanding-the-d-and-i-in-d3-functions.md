---
title: "Understanding the `d` and `i` in D3 Functions"
date: 2020-04-26T18:24:18+02:00
series: ["D3"]
tags: ['data']
categories: ["Javascript"]
---

D3 operators allow you to access the data bound to DOM elements and their selection index number.

In most examples:
 - `d` designates the bound _data_
 - `i` designates the _index number_ of the element in the selection
 - `this` actual DOM selection

Though the examples are all uniform in their use of "d" and "i", D3 doesn't care nor know what "d" and "i" actually stand for {{< color blue >}}as values are assigned based on their positional arrangement{{< /color >}} in the function call, i.e.

- `function (d, i) { return d; }` is not the same as `function (i, d) { return d; }`
- `function (d, i) { return i; }` is not the same as `function (i, d) { return i; }`

```js
var vSelection = d3.select("body").selectAll("p")
							.data([10,20,30]);

var newPara = vSelection.enter().append("p");

newParas.attr("d-attr", function(d, i) { return d;}); //for each p, function assigns 10, 20, 30 as "d-attr"
newParas.attr("i-attr", function(d, i) { return i;}); //for each p, function assigns 0, 1, 2 as "i-attr"

newParas.attr("d-attr-s", function(i, d) { return d; }); //for each p, function assigns 0, 1, 2 as "d-attr-s"
newParas.attr("i-attr-s", function(i, d) { return i;}); //for each p, function assigns 10, 20, 30 as "i-attr-s"
```
