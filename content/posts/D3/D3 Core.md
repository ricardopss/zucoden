---
title: "D3 Core"
date: 2020-01-27T15:46:22+01:00
tags: ["data visualization", "in Action"]
categories: ["D3"]
---

## What is D3.js
D3.js stands for _data-driven documents_ and it was created to fill a demand for web-accessible data visualization.

D3.js provides developers with the ability to create rich interactive and animated content based on data and tie that content to existing web page elements.

Until recently, it wasn't possible to build high performance internet applications in the browser unless you built them in Flash or as a Java applet.

D3.js provides the same performance, but integrated into web standards and the `Document Object Model` (DOM) at the core of the HTML. 

It gives you the tools to create sofisticated data visualization, and to dynamically update traditional web content. 

{{< betonen gold >}}
D3.js should not be, although, view as a simple charting library. The process to create a chart is much longer as than using a dedicated charting libraries.

What it may be viewed as it weakness it is also its strengths: D3 allows you to build whatever data-driven graphics and interactivity one can imagine.
{{< /betonen >}}


## Data visualization is more than data visualization

Although the ability to create rich and varied graphics is one of D3´s strong points, more important for modern web development is the ability to embed the high level of interactivity that users expect. 

With D3.js, every element of every chart is made interactive in the same way.


{{< betonen gold >}}You don´t invest time learning D3 so that you can deploy Excel-style charts on the web (for that, there are easier and more convenient libraries).
You learn D3 because it gives you the ability to implement almost every major data visualization technique, and more, it also gives you the power to create your own data visualization techniques (which is something that not every general library offers).{{< /betonen >}}

## D3 is about selecting and binding

`selecting` is the most basic pattern code in D3. The real power of D3 comes from using _selections_ to combine data and web page elements (which are worked separately).

A _selection_ is the group of all web page elements (whether graphics or traditional <div> elements) and we perform actions on the elements in the group, such as moving them, changing their color, or updating the values in the data.

e.g.

```javascript
/***
this takes every circle on the page with the classe 'a', and fill with red
and moves it so its center is 100px to the right of left side of the svg canvas.
***/ 
d3.select("circle.a").style("fill", "red").attr("cx", 100); 

/***
this selection turns every div on the page with a red background 
and changes its class with "b"
***/ 
d3.selectAll("div").style("background", "red").attr("class", "b"); 
```


### `selection` and `selectionAll`
This association is known in D3 as _binding data_ (as sometimes there are more data elements than DOM elements, or vice-versa).

You can think of a _selection_ as a set of web pages elements and a corresponding, associated set of data. One can make a selection on any elements in a web page, including items in a list, circles, or even regions on a map of Africa.

{{< betonen gold >}}
`selection` might not include any data-binding.
{{< /betonen >}}

After you have a selection, you can use D3.js to modify the apperance of web-page elements to reflect differences in the data.

{{< betonen gold >}}
You modify the apperance of elements by using _selections_ to reference the data bound to an element in selection. 

D3 iterates through the elements in your selection and performs **the same action using the bound data**, which results in different graphical effects. Although the action you perform is the same, the effect is different because it's basaed on the variation in the data.
{{< /betonen >}}

### Web page elements can now be divs, countries, and flowcharts
The most basic element on a web page `<div>` can be selected modified in the same way you can select and modify a country on a web map, or individual circles and lines that make up a complex data visualization

## Using HTML5

The only requirement to visualize D3.js is a modern web browser.

### The DOM
A webpage is structured according to the DOM.

```html
<!DOCTYPE html>
<html>
  <head>
    <script src="d3.v5.min.js" type="text/Ja"></script>
    <title>A simple webpage</title>
  </head>
  <body>
    <h1>A simple webpage demonstrating the DOM</h1>

    <div id="someDiv" style="width:200px; height:100px; border:black 1px solid;">
      <input id="someCheckbox" type="checkbox" />
    </div>
  </body>
</html>
```
Basic HTML like this follows the DOM. In this example, `<script>` and `<body>` elements are children of `<html>` element and the `<div>` element is a child of the `<body>` element.

The `<script>` element loads the D3.js library here, while the `<body>` element shows up onscreen any content to this page.

{{< betonen red >}}
D3 utilizes UTF-8 characters in its code, which means that you can do one of the 3 things to make sure you don't have any errors:

**1) Set your document to UTF-8:**  
`<!DOCTYPE html><meta charset="utf-8">`

**2) Set the charset of the script to UTF-8:**  
`<script charset="utf-8" src="d3.js"></script>`

**3) Use the minified script, who shouldn't have UTF-8 characters on it:**  
`<script src="d3.min.js"></script>`
{{< /betonen >}}

### `style`, `attr`, and `property`
The three categories of information about each element determines its behaviour and appearance.

```javascript
d3.select("#someDiv").style("border", "5px darkgray dashed");
d3.select("#someDiv").attr("id", "newID");
d3.select("#someCheckbox").property("checked", true);
```
- `styles` can determine color, transparency and other appearance styles.
- `attr` related mostly with classes.
- `property` related with the status.








