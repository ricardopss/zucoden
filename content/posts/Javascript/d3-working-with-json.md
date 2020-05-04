---
title: "D3 Working With JSON"
date: 2020-04-26T18:13:30+02:00
series: ["D3"]
tags: ['json']
categories: ["Javascript"]
---

JSON is a lightweight and human readable data exchange format, consisting of a collection of name/value pairs.

Each value can be a string, number, array, functions or another JSON object, e.g.

```js
var theGodfatherMovie = { 
		"title": "The Godfather", 
		"director": "Francis Ford Coppola", 
		"yearFilmed": 1972, 
		"novelWriter": "Mario Puzo", 
		"mainCharacters": [
			{
				"characterNamen": "Don Vito Corleone", 
				"actorName": "Marlon Brandon"
			},
			{
				"characterName": "Michael Corleone", 
				"actorName": "Al Pacino"
			},
			{
				"characterName": "Tom Hagen", 
				"actorName": "Robert Duvall"
			},
			{
				"characterName": "Kay Adams", 
				"actorName": "Diane Keaton"
			}]
};
```
There are 2 ways to access the value of a determined key:

```js
theGodfatherMovie["title"];
//or 
theGodfatherMovie.title;
```

Both ways access the same information in the JSON. The second approach is the preferred convention, altough it requires that {{< color blue >}}keys names do not carry spaces or any kind of punctuation.{{< /color >}} 

{{< betonen gold >}}
Note that the array of objects is a list, i.e. theGodfatherMovie.mainCharacters is a _list_. 
{{< /betonen >}} 


