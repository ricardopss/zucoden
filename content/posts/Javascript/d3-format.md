---
title: "D3 Format"
date: 2020-04-22T20:49:26+02:00
series: ["D3"]
tags: ['format']
categories: ["Javascript"]
---

{{< code gold >}}source:{{< /code >}} [d3-format](https://github.com/d3/d3-format)

Sometimes JavaScript doesn’t display numbers the way we expect, e.g.:

{{< tabs "Format1" >}}
{{< tab "js" >}}
```js
for (var i = 0; i < 10; i++) {
  console.log(0.1 * i);
}
``` 
{{< /tab >}}
{{< tab ">>" >}}
```
0
0.1
0.2
0.30000000000000004
0.4
0.5
0.6000000000000001
0.7000000000000001
0.8
0.9
```
{{< /tab >}}
{{< /tabs >}}

This happens due to [binary floating point](https://en.wikipedia.org/wiki/Double-precision_floating-point_format).

Formatting numbers for human consumption is the purpose of `d3-format`, which is modeled after Python 3’s format specification mini-language ([PEP 3101](https://www.python.org/dev/peps/pep-3101/)). 

Revisiting the example above:

{{< tabs "Format2" >}}
{{< tab "js" >}}
```js
var f = d3.format(".1f");

for (var i = 0; i < 10; i++) {
  console.log(f(0.1 * i));
} 
``` 
{{< /tab >}}
{{< tab ">>" >}}
```
0.0
0.1
0.2
0.3
0.4
0.5
0.6
0.7
0.8
0.9
```
{{< /tab >}}
{{< /tabs >}}

Other examples:

```js
d3.format(".0%")(0.123);  // rounded percentage, "12%"
d3.format("($.2f")(-3.5); // localized fixed-point currency, "(£3.50)"
d3.format("+20")(42);     // space-filled and signed, "                 +42"
d3.format(".^20")(42);    // dot-filled and centered, ".........42........."
d3.format(".2s")(42e6);   // SI-prefix with two significant digits, "42M"
d3.format("#x")(48879);   // prefixed lowercase hexadecimal, "0xbeef"
d3.format(",.2r")(4223);  // grouped thousands with two significant digits, "4,200"
d3.format("s")(1500);  // "1.50000k"
d3.format("~s")(1500); // "1.5k"
```
