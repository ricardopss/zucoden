---
title: "SVG Viewport and SVG Tag"
date: 2020-04-26T18:21:30+02:00
series: ["D3"]
tags: ['svg', 'circle', 'rect', 'text', 'path', 'line']
categories: ["Javascript"]
---

The SVG tag `<svg>` defines the SVG Viewport, and therefore, it should be thought of as a _view-port_ or _window_ onto an infinite plane, i.e.:

```html
<svg width="100" height="100">
	<circle r="30" cx="X" cy="Y"></circle>
</svg> 
```
- We can define SVG objects that are visible within the window (i.e. X and Y < 70)
- We can define SVG objects that are not visible because they are away from the window (i.e. X and Y > 130) 
- We can define SVG objects that are partially visible because some part of them is within the window (i.e. 70 < X and Y < 130)

{{< betonen gold >}}Note that svg (width x height) begin from _top-to-bottom_ and _left-to-right_.{{< /betonen >}}

## SVG Simple Shape Visual Marks 

SVG comes with simple shape tags that create visual marks you can use for your visualization. There are specific "SVG" only tags, like circle, rect, text, path, line, etc, that you can use within the SVG tag

{{< betonen red >}}
Web browsers treat these SVG-specific-keyword-tags differently when inside of an SVG tag and when they are outside of it. As long as the SVG simple shape tags are within an SVG tag then the web browser will know what to do with them
{{< /betonen >}}

The tags are `rect`, `text`, `line`, `path`, `polygon`, `polyline`, `circle`, `elipse`:

<table border=0 cellpadding=0 cellspacing=0 width=593 style='border-collapse:
 collapse;table-layout:fixed;width:615pt'>
 <col class=xl70 width=56 style='mso-width-source:userset;mso-width-alt:2048;
 width:42pt'>
 <col class=xl70 width=101 style='mso-width-source:userset;mso-width-alt:3693;
 width:76pt'>
 <col class=xl70 width=137 style='mso-width-source:userset;mso-width-alt:5010;
 width:103pt'>
 <col class=xl70 width=30 style='mso-width-source:userset;mso-width-alt:1097;
 width:23pt'>
 <col class=xl70 width=29 style='mso-width-source:userset;mso-width-alt:1060;
 width:22pt'>
 <col class=xl70 width=27 style='mso-width-source:userset;mso-width-alt:987;
 width:20pt'>
 <col class=xl70 width=32 style='mso-width-source:userset;mso-width-alt:1170;
 width:24pt'>
 <col class=xl70 width=51 style='mso-width-source:userset;mso-width-alt:1865;
 width:38pt'>
 <col class=xl70 width=50 style='mso-width-source:userset;mso-width-alt:1828;
 width:38pt'>
 <col class=xl70 width=39 style='mso-width-source:userset;mso-width-alt:1426;
 width:29pt'>
 <col class=xl70 width=41 style='mso-width-source:userset;mso-width-alt:1499;
 width:31pt'>
 <tr height=16 style='height:12.0pt'>
  <td height=16 class=xl65 width=56 style='height:12.0pt;width:42pt'>field</td>
  <td class=xl65 width=101 style='width:76pt'>attributes</td>
  <td class=xl65 width=137 style='width:103pt'>values</td>
  <td class=xl65 width=30 style='width:23pt'>rect</td>
  <td class=xl65 width=29 style='width:22pt'>text</td>
  <td class=xl65 width=27 style='width:20pt'>line</td>
  <td class=xl65 width=32 style='width:24pt'>path</td>
  <td class=xl65 width=51 style='width:38pt'>polygon</td>
  <td class=xl65 width=50 style='width:38pt'>polyline</td>
  <td class=xl65 width=39 style='width:29pt'>circle</td>
  <td class=xl65 width=41 style='width:31pt'>elipse</td>
 </tr>
 <tr height=16 style='height:12.0pt'>
  <td rowspan=6 height=96 class=xl66 width=56 style='height:72.0pt;width:42pt'>position-<br>
    ing</td>
  <td class=xl67>transform</td>
  <td class=xl67>&quot;translate(x,y)&quot;</td>
  <td class=xl68>&#9679;</td>
  <td class=xl68>&#9679;</td>
  <td class=xl68>&#9679;</td>
  <td class=xl68>&#9679;</td>
  <td class=xl68>&#9679;</td>
  <td class=xl68>&#9679;</td>
  <td class=xl68>&#9679;</td>
  <td class=xl68>&#9679;</td>
 </tr>
 <tr height=16 style='height:12.0pt'>
  <td height=16 class=xl67 style='height:12.0pt'>x, y</td>
  <td class=xl67>number</td>
  <td class=xl68>&#9679;</td>
  <td class=xl68>&#9679;</td>
  <td class=xl67></td>
  <td class=xl67></td>
  <td class=xl67></td>
  <td class=xl67></td>
  <td class=xl67></td>
  <td class=xl67></td>
 </tr>
 <tr height=16 style='height:12.0pt'>
  <td height=16 class=xl67 style='height:12.0pt'>x1, x2, y1, y2</td>
  <td class=xl67>number</td>
  <td class=xl67></td>
  <td class=xl67></td>
  <td class=xl68>&#9679;</td>
  <td class=xl67></td>
  <td class=xl67></td>
  <td class=xl67></td>
  <td class=xl67></td>
  <td class=xl67></td>
 </tr>
 <tr height=16 style='height:12.0pt'>
  <td height=16 class=xl67 style='height:12.0pt'>d</td>
  <td class=xl67>(special)</td>
  <td class=xl67></td>
  <td class=xl67></td>
  <td class=xl67></td>
  <td class=xl68>&#9679;</td>
  <td class=xl67></td>
  <td class=xl67></td>
  <td class=xl67></td>
  <td class=xl67></td>
 </tr>
 <tr height=16 style='height:12.0pt'>
  <td height=16 class=xl67 style='height:12.0pt'>points</td>
  <td class=xl67>&quot;x,y x,y x,y&quot;</td>
  <td class=xl67></td>
  <td class=xl67></td>
  <td class=xl67></td>
  <td class=xl67></td>
  <td class=xl68>&#9679;</td>
  <td class=xl68>&#9679;</td>
  <td class=xl67></td>
  <td class=xl67></td>
 </tr>
 <tr height=16 style='height:12.0pt'>
  <td height=16 class=xl67 style='height:12.0pt'>cx, cy</td>
  <td class=xl67>number</td>
  <td class=xl67></td>
  <td class=xl67></td>
  <td class=xl67></td>
  <td class=xl67></td>
  <td class=xl67></td>
  <td class=xl67></td>
  <td class=xl68>&#9679;</td>
  <td class=xl68>&#9679;</td>
 </tr>
 <tr height=16 style='height:12.0pt'>
  <td rowspan=4 height=64 class=xl65 style='height:48.0pt'>sizing</td>
  <td class=xl67>transform</td>
  <td class=xl67>&quot;scale(k)&quot;</td>
  <td class=xl68>&#9679;</td>
  <td class=xl68>&#9679;</td>
  <td class=xl68>&#9679;</td>
  <td class=xl68>&#9679;</td>
  <td class=xl68>&#9679;</td>
  <td class=xl68>&#9679;</td>
  <td class=xl68>&#9679;</td>
  <td class=xl68>&#9679;</td>
 </tr>
 <tr height=16 style='height:12.0pt'>
  <td height=16 class=xl67 style='height:12.0pt'>width, height</td>
  <td class=xl67>number</td>
  <td class=xl67></td>
  <td class=xl68>&#9679;</td>
  <td class=xl67></td>
  <td class=xl67></td>
  <td class=xl67></td>
  <td class=xl67></td>
  <td class=xl67></td>
  <td class=xl67></td>
 </tr>
 <tr height=16 style='height:12.0pt'>
  <td height=16 class=xl67 style='height:12.0pt'>r</td>
  <td class=xl67>number</td>
  <td class=xl67></td>
  <td class=xl67></td>
  <td class=xl67></td>
  <td class=xl67></td>
  <td class=xl67></td>
  <td class=xl67></td>
  <td class=xl68>&#9679;</td>
  <td class=xl67></td>
 </tr>
 <tr height=16 style='height:12.0pt'>
  <td height=16 class=xl67 style='height:12.0pt'>rx, ry</td>
  <td class=xl67>number</td>
  <td class=xl67></td>
  <td class=xl67></td>
  <td class=xl67></td>
  <td class=xl67></td>
  <td class=xl67></td>
  <td class=xl67></td>
  <td class=xl67></td>
  <td class=xl68>&#9679;</td>
 </tr>
 <tr height=16 style='height:12.0pt'>
  <td rowspan=5 height=80 class=xl65 style='height:60.0pt'>color</td>
  <td class=xl67>fill</td>
  <td class=xl69 width=137 style='width:103pt'>name, #hex, rgb(R,G,B)</td>
  <td class=xl68>&#9679;</td>
  <td class=xl68>&#9679;</td>
  <td class=xl67></td>
  <td class=xl68>&#9679;</td>
  <td class=xl68>&#9679;</td>
  <td class=xl67></td>
  <td class=xl68>&#9679;</td>
  <td class=xl68>&#9679;</td>
 </tr>
 <tr height=16 style='height:12.0pt'>
  <td height=16 class=xl67 style='height:12.0pt'>stroke</td>
  <td class=xl67>name, #hex, rgb(R,G,B)</td>
  <td class=xl68>&#9679;</td>
  <td class=xl68>&#9679;</td>
  <td class=xl68>&#9679;</td>
  <td class=xl68>&#9679;</td>
  <td class=xl68>&#9679;</td>
  <td class=xl68>&#9679;</td>
  <td class=xl68>&#9679;</td>
  <td class=xl68>&#9679;</td>
 </tr>
 <tr height=16 style='height:12.0pt'>
  <td height=16 class=xl67 style='height:12.0pt'>opacity</td>
  <td class=xl67>number 0-1</td>
  <td class=xl68>&#9679;</td>
  <td class=xl68>&#9679;</td>
  <td class=xl68>&#9679;</td>
  <td class=xl68>&#9679;</td>
  <td class=xl68>&#9679;</td>
  <td class=xl68>&#9679;</td>
  <td class=xl68>&#9679;</td>
  <td class=xl68>&#9679;</td>
 </tr>
 <tr height=16 style='height:12.0pt'>
  <td height=16 class=xl67 style='height:12.0pt'>fill-opacity</td>
  <td class=xl67>number 0-1</td>
  <td class=xl68>&#9679;</td>
  <td class=xl68>&#9679;</td>
  <td class=xl68>&#9679;</td>
  <td class=xl68>&#9679;</td>
  <td class=xl68>&#9679;</td>
  <td class=xl67></td>
  <td class=xl68>&#9679;</td>
  <td class=xl68>&#9679;</td>
 </tr>
 <tr height=16 style='height:12.0pt'>
  <td height=16 class=xl67 style='height:12.0pt'>stroke-opacity</td>
  <td class=xl67>number 0-1</td>
  <td class=xl68>&#9679;</td>
  <td class=xl68>&#9679;</td>
  <td class=xl68>&#9679;</td>
  <td class=xl68>&#9679;</td>
  <td class=xl68>&#9679;</td>
  <td class=xl68>&#9679;</td>
  <td class=xl68>&#9679;</td>
  <td class=xl68>&#9679;</td>
 </tr>
 <tr height=16 style='height:12.0pt'>
  <td rowspan=5 height=80 class=xl65 style='height:60.0pt'>text</td>
  <td class=xl67>stroke-width</td>
  <td class=xl67>number</td>
  <td class=xl68>&#9679;</td>
  <td class=xl68>&#9679;</td>
  <td class=xl68>&#9679;</td>
  <td class=xl68>&#9679;</td>
  <td class=xl68>&#9679;</td>
  <td class=xl68>&#9679;</td>
  <td class=xl68>&#9679;</td>
  <td class=xl68>&#9679;</td>
 </tr>
 <tr height=16 style='height:12.0pt'>
  <td height=16 class=xl67 style='height:12.0pt'>stroke-dasharray</td>
  <td class=xl67>numbers (separeted)</td>
  <td class=xl68>&#9679;</td>
  <td class=xl68>&#9679;</td>
  <td class=xl68>&#9679;</td>
  <td class=xl68>&#9679;</td>
  <td class=xl68>&#9679;</td>
  <td class=xl68>&#9679;</td>
  <td class=xl68>&#9679;</td>
  <td class=xl68>&#9679;</td>
 </tr>
 <tr height=16 style='height:12.0pt'>
  <td height=16 class=xl67 style='height:12.0pt'>stroke-linecap</td>
  <td class=xl67>butt | round | square</td>
  <td class=xl67></td>
  <td class=xl67></td>
  <td class=xl68>&#9679;</td>
  <td class=xl68>&#9679;</td>
  <td class=xl68>&#9679;</td>
  <td class=xl68>&#9679;</td>
  <td class=xl67></td>
  <td class=xl67></td>
 </tr>
 <tr height=16 style='height:12.0pt'>
  <td height=16 class=xl67 style='height:12.0pt'>stroke-linejoin</td>
  <td class=xl67>miter | round | level</td>
  <td class=xl67></td>
  <td class=xl67></td>
  <td class=xl67></td>
  <td class=xl68>&#9679;</td>
  <td class=xl68>&#9679;</td>
  <td class=xl67></td>
  <td class=xl67></td>
  <td class=xl67></td>
 </tr>
 <tr height=16 style='height:12.0pt'>
  <td height=16 class=xl67 style='height:12.0pt'>stroke-miterlimit</td>
  <td class=xl67>number</td>
  <td class=xl67></td>
  <td class=xl67></td>
  <td class=xl68>&#9679;</td>
  <td class=xl68>&#9679;</td>
  <td class=xl68>&#9679;</td>
  <td class=xl68>&#9679;</td>
  <td class=xl67></td>
  <td class=xl67></td>
 </tr>
 <tr height=16 style='height:12.0pt'>
  <td rowspan=3 height=48 class=xl65 style='height:36.0pt'>others</td>
  <td class=xl67>transform</td>
  <td class=xl67>&quot;rotate(a)&quot;</td>
  <td class=xl68>&#9679;</td>
  <td class=xl68>&#9679;</td>
  <td class=xl68>&#9679;</td>
  <td class=xl68>&#9679;</td>
  <td class=xl68>&#9679;</td>
  <td class=xl68>&#9679;</td>
  <td class=xl68>&#9679;</td>
  <td class=xl68>&#9679;</td>
 </tr>
 <tr height=16 style='height:12.0pt'>
  <td height=16 class=xl67 style='height:12.0pt'>text-anchor</td>
  <td class=xl67>start | middle | end</td>
  <td class=xl67></td>
  <td class=xl68>&#9679;</td>
  <td class=xl67></td>
  <td class=xl67></td>
  <td class=xl67></td>
  <td class=xl67></td>
  <td class=xl67></td>
  <td class=xl67></td>
 </tr>
 <tr height=16 style='height:12.0pt'>
  <td height=16 class=xl67 style='height:12.0pt'>writing-mode</td>
  <td class=xl67>tb</td>
  <td class=xl67></td>
  <td class=xl68>&#9679;</td>
  <td class=xl67></td>
  <td class=xl67></td>
  <td class=xl67></td>
  <td class=xl67></td>
  <td class=xl67></td>
  <td class=xl67></td>
 </tr>
</table>


Some examples:

{{< tabs "shapesSVG" >}}
{{< tab "circle" >}}
```html
<svg width="100" height="100">
    <circle cx="35" cy="35" r="25" />
</svg> 
``` 
{{< /tab >}}

{{< tab ">>" >}}
<svg width="100" height="100">
    <circle cx="35" cy="35" r="25" />
</svg>
{{< /tab >}}

{{< tab "rect" >}}
```html
<svg width="100" height="100">
    <rect x="10" y="10" width="50" height="50" />
</svg>
```
{{< /tab >}}

{{< tab ">>" >}}
<svg width="100" height="100">
    <rect x="10" y="10" width="50" height="50" />
</svg>
{{< /tab >}}

{{< tab "ellipse" >}}
```html
<svg width="100" height="100">
    <ellipse cx="25" cy="25" rx="15" ry="10" />
</svg>
```
{{< /tab >}}

{{< tab ">>" >}}
<svg width="100" height="100">
    <ellipse cx="25" cy="25" rx="15" ry="10" />
</svg>
{{< /tab >}}

{{< tab "line" >}}
```html
<svg width="50" height="50">
    <line x1="10" y1="10" x2="50" y2="50"  stroke-width="3" stroke="black" />
</svg>
```
{{< /tab >}}

{{< tab ">>" >}}
<svg width="50" height="50">
    <line x1="10" y1="10" x2="50" y2="50"  stroke-width="3" stroke="black" />
</svg>
{{< /tab >}}

{{< tab "text" >}}
```html
<svg width="50" height="50">
    <text x="25" y="25">Cupcake</text>
</svg>
```
{{< /tab >}}

{{< tab ">>" >}}
<svg width="50" height="50">
    <text x="25" y="25">Cupcake</text>
</svg>
{{< /tab >}}

{{< tab "path" >}}
```html
<svg width="50" height="50">
    <path d="M10,10L50,50" stroke-width="3" stroke="black"></path>
</svg>
```
{{< /tab >}}

{{< tab ">>" >}}
<svg width="50" height="50">
    <path d="M10,10L50,50" stroke-width="3" stroke="black"></path>
</svg>
{{< /tab >}}
{{< /tabs >}}

## SVG As The Technology to Place and Create Visual Elements

SVG (Scalable Vector Graphics) is an image format based on math rather than pixels so when zooming in or out it doesn't pixelise. Also, SVG is human readable in that you can read the code write and generated.

SVG instructions in the SVG tag are able to be read by the browser and SVG tags are DOM elements that the browser, D3, and You can interact with.
