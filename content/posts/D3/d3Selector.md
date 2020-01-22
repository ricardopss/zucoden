---
title: "Using ``select``"
date: 2020-01-09T16:17:48+01:00
draft: false
tags: ['select', 'selectAll']
categories: ['D3']
series: ['DataViz']
description: ""
---

## Syntax

with ``index.html``:

```html
<!DOCTYPE html>
<html>
  <head>
  
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>
      
    D3 JS &ndash; zu coden

    </title>
       
    <link rel="stylesheet" href="/Users/ricar/Desktop/labJS/D3/assets/syntax.css">
    <link rel="stylesheet" href="/Users/ricar/Desktop/labJS/D3/assets/primer-build.css">
    <link rel="stylesheet" href="/Users/ricar/Desktop/labJS/D3/assets/style.css">
  </head>


  <body>

    <h1>Using selector</h1>

      <script src = "https://d3js.org/d3.v5.min.js"></script>
      <script src = "d3Eg.js"></script>
    
  </body>
</html>
```

with ``d3Eg.js``:
```js
// SELECTION & MANIPULATION OF ATTRIBUTES

d3.select('h1').style('color', 'red')
.attr('marcador', 'titulo')  			
.text('Hey Tag');

d3.select('body').append('p').text('Paragraph 1');
d3.select('body').append('p').text('Paragraph 2');
d3.select('body').append('p').text('Paragraph 3');

d3.select("body").transition()
.style("background-color", "grey");


d3.select('head').append('meta').attr('descricao', 'Definicao do Projeto');

d3.selectAll('h2').style('color', 'green', "background-color", "black")
.attr('marcador', 'subtitulo');	

d3.selectAll('p').style('color', 'blue');
```



## Output

```
There are two types of people in the world. One that plays to win and other that plays to not lose.

There are two types of people in the world. One that prefers to be right alone and other that prefers to be wrong with the majority.
```
