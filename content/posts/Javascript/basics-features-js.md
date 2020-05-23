---
title: "Basics Features Js"
date: 2020-05-06T15:30:41+02:00
series:
tags: ['data science']
categories: ["Javascript"]
---

Some how to´s based on the book _"Javascript for Data Science"_

## run js files in node-shell

```js
$node src/basics/jsFile.js
```

## print something
`console` is a built-in module that provides basic printing services, use the `.log()` to print something, e.g.

```js
console.log("Hallo Welt!");         
console.log("Hallo", "Welt", "!"); 
```

## data types

{{< tabs "DataTypes" >}}
{{< tab "js" >}}
```js
const dataValues = [123.4, 123, 'someText', true, undefined, null, console.log];
// float, integer, string, bool, undefined, object, function 

for (let value of dataValues) {
	console.log('the type of', value, 'is', typeof value) //typeof is an operator, not a function!
} 
``` 
{{< /tab >}}
{{< tab ">>" >}}
```
the type of 123.4 is number
the type of 123 is number
the type of someText is string 	//which may contain any Unicode character
the type of true is boolean
the type of undefined is undefined //means “hasn’t been given a value” 
the type of null is object         //means “has a value, which is nothing”
the type of ƒ log() { [native code] } is function
```
{{< /tab >}}
{{< /tabs >}}

Note that the loop was built with _let_-_of_ instead of _let_-_in_, as _let_-_in_ returns the indexes of the collection (e.g., 0, 1, 2). See [iteration](#iteration)

{{< betonen gold >}}
**Constants (<code style="color:black;background-color:rgba(255, 180, 0, 0.2);">const</code>) versus Variables (<code style="color:black;background-color:rgba(255, 180, 0, 0.2);">var</code>)**  
_You should make things constants unless they really need to be variables because it’s easier for both people and computers to keep track of things that are defined once and never change._  
{{< /betonen >}}
{{< betonen gold >}}
Unlike Python, there is no separate type for integers: it stores all numbers as 64-bit floating-point values, which is accurate up to about 15 decimal digits. 
{{< /betonen >}}

## control flow
using nested loops, we can se that the processing order follows _left-to-right_ & _top-to-bottom_: 

```js
const nested = [
				['A', 'B'],
				['C', 'D']
				];
// len(nested) = 2 
// len(nested[0]) = 2

for (let outer of nested) {
	for (let inner of outer) {
			console.log(inner)
		}
	}
//returns:
//A
//B
//C
//D
```

## conditional statements (if-else) 

{{< tabs "CondStatements" >}}
{{< tab "js" >}}
```js
const values = [0, 1, '', 'text', undefined, null, [], [2, 3]];

for (let element of values) {
	if (element) {
		console.log(element, 'of type', typeof element, 'is truthy')
		} 
	else {
		console.log(element, 'of type', typeof element, 'is falsy')
		}
	}	 
``` 
{{< /tab >}}
{{< tab ">>" >}}
```
0 of type number is falsy
1 of type number is truthy
  of type string is falsy
text of type string is truthy
undefined of type undefined is falsy
null of type object is falsy
  of type object is truthy
2,3 of type object is truthy
```
{{< /tab >}}
{{< /tabs >}}

This example shows that arrays are heterogeneous, i.e., that they can contain values of many different types. It also shows that {{< color blue >}}JavaScript has some rather odd ideas about the nature of truth{{< /color >}}: 
- {{< color >}}0 is falsy{{< /color >}}, while all other numbers are truthy
- empty string is falsy and all other strings are truthy 
- undefined and null are both falsy, as most programmers would expect.
- {{< color >}}empty array is truthy{{< /color >}} (which is different from its treatment in most programming languages)[^1]

When testing an array, check that `Array.length` is zero. 

## comparison: (in)equality statements

Javascript has 2 possibilities for testing (in)equality:

- the use of `===` and `!==` check for equality of value and types
- the use of `==` and `!=` check for equality of values only

```js
var x = 5;	 //interger
var y = [5]; //array
var z = "5"; // string

console.log(x == y); //true
console.log(x == z); //true
console.log(x === y); //false
console.log(x === z); //false
```

{{< betonen gold >}}
Always use <code style="color:black;background-color:rgba(255, 180, 0, 0.2);">===</code> and <code style="color:black;background-color:rgba(255, 180, 0, 0.2);">!==</code> when testing for equality and inequality in JavaScript, since <code style="color:black;background-color:rgba(255, 180, 0, 0.2);">==</code> and <code style="color:black;background-color:rgba(255, 180, 0, 0.2);">!=</code> do type conversion, which can produce some ugly surprises. 
{{< /betonen >}} 

## iteration
In Javascript, arrays are objects whose keys happen to be sequential integers 0, 1, 2, 3...[^2]. 

Unfortunatelly, this can led to some undesirable behavior with JS’s original `for` loop, which used the word `in` rather than `of`, and which
looped over all of an object’s enumerable keys:

{{< tabs "iteration" >}}
{{< tab "js" >}}
```js
const things = ['x', 'y', 'z']
console.log(things)

things.someProperty = 'someValue' // add additional key called 'someProperty'
console.log(things)

// traditional loop
for (let i = 0; i < things.length; i += 1) {
		console.log(i)
}

// let-in loop
for (let key in things) {
		console.log(key)
}

// let-of loop
for (let key of things) {
		console.log(key)
}
``` 
{{< /tab >}}
{{< tab ">>" >}}
```
3
3

// traditional loop
0
1
2

// let-in loop
0
1
2
someProperty

// let-of loop
x
y
z
```
{{< /tab >}}
{{< /tabs >}}

In summary, use _let-in_ for iterate over the arrays indexes ('keys') and use _let-of_ to iterate over the arrays values.

Note that adding additional key does not change the arrays lenght.

Better yet, use `forEach` and take advantage of its optional second and third arguments:

```js
things.forEach( (val, loc, array) => {
	console.log('element ${loc} of ${array} is ${val}')
})
//	returns:
//	element 0 of x,y,z is x
//	element 1 of x,y,z is y
//	element 2 of x,y,z is z 
``` 

## formating strings
Rather than printing multiple strings and expressions, we can interpolate values into a back-quoted string. 

The value to be interpolated is put in `${...}`, and can be any valid JS expression, including a function or method call. 

```js
for (let color of ['red', 'green', 'blue']) {
		const message = `color is ${color}`
		console.log(message, `and capitalized is ${color.toUpperCase()}`)
}
// color is red and capitalized is RED
// color is green and capitalized is GREEN
// color is blue and capitalized is BLUE
```
**Note:** that the message must be coded into _back-quoted string_, otherwise it will produce:

`color is ${color} and capitalized is ${color.toUpperCase()}`  
`color is ${color} and capitalized is ${color.toUpperCase()}`  
`color is ${color} and capitalized is ${color.toUpperCase()}`  

A alternative is to write the message:

```js
const message = "color is" + color + "and capitalized is " + color.toUpperCase()
```

## objects
An object in JavaScript is a collection of _key-value pairs_, and is equivalent in simple cases to what Python would call a {{< code gold >}}dictionary{{< /code >}}. The keys must be strings; the values can be anything.

```js
const creature = {
	'order': 'Primates',
	'family': 'Callitrichidae',
	'genus': 'Callithrix',
	'species': 'Jacchus'
	}

console.log(`creature is ${creature}`)
console.log(`creature.genus is ${creature.genus}`)

for (let key in creature) {
		console.log(`creature[${key}] is ${creature[key]}`)
	}

//returns
// 	creature is [object Object]
//	creature.genus is Callithrix
//	creature[order] is Primates
//	creature[family] is Callitrichidae
//	creature[genus] is Callithrix
//	creature[species] is Jacchus
```
If the key has a simple name, i.e. no spaces/punctuation, it can be accessed as an object, i.e. `object.key` (e.g. `creature.genus`)

To get a more helpful string representation, use `JSON.stringify(object)`:

```js
console.log(JSON.stringify(creature))
/***
	{"order":"Primates", "family":"Callitrichidae",
	 "genus":"Callithrix", "species":"Jacchus"}
***/
``` 
where “JSON” stands for “JavaScript Object Notation”

## functions
To create a named function in Javascript, one must first declare `function` before its name, followed by `{...}`

E.g. of a function that finds the _lowest_ and _highest_ values in an array: 

```js
function limits (values) {
	//initial check to find if values does have a length: 
	// - case not, i.e. !values.length = true -> returns undefined type
	// - case it does, i.e. !values.length = false -> continue	  
	if (!values.length) {			
		return [undefined, undefined]
		}

	let low = values[0]
	let high = values[0]

	for (let v of values) {
		if (v < low) low = v
		if (v > high) high = v
	}
	
	return [low, high]
	}

limits([40, 3, 56, 1, 24, 56, 79, 9, 3, 14]) // returns [1, 79]
```

The rationale behind the behavior `return [undefined, undefined]`

Another example

## fat arrow functions
Are nameless functions consisting of: 
- a parameter list 
- the `=>` symbol
- a body. 

Fat arrow functions don’t have names, so the function must be assigned that to a constant or variable for later use.

```js 
const limits = (values) => {
	if (!values.length) {			
		return [undefined, undefined]
		}

	let low = values[0]
	let high = values[0]

	for (let v of values) {
		if (v < low) low = v
		if (v > high) high = v
	}
	
	return [low, high]
	}

limits([40, 3, 56, 1, 24, 56, 79, 9, 3, 14]) // returns [1, 79]	
``` 

## modules
As our programs grow larger, we will want to put code in multiple files. The unavoidable bad news is that JavaScript has several module systems: Node still uses one called {{< code gold >}}CommonJS{{< /code >}}, but is converting to the modern standard called {{< code gold >}}ES6{{< /code >}}, so what we use on the command line is different from what we use in the browser (for now).  

{{< betonen gold >}}
**Ee Ess**
JavaScript’s official name is <code style="color:black;background-color:rgba(255, 180, 0, 0.2);">ECMAScript</code>, though only people who use the word “datum” in everyday conversation ever call it that. Successive versions of the language are therefore known as <code style="color:black;background-color:rgba(255, 180, 0, 0.2);">ES5</code>, <code style="color:black;background-color:rgba(255, 180, 0, 0.2);">ES6</code>, and so on, except when they’re referred to as (for example) <code style="color:black;background-color:rgba(255, 180, 0, 0.2);">ES2018</code>.
{{< /betonen >}}

Since we’re going to build command-line programs before doing anything in the browser, we will introduce Node’s module system first. We start by putting this code in a file called `utilities.js`, where a function is created to ceil (defined by `DEFAULT_BOND`) an array of values:

{{< mermaid >}}
graph LR;
    subgraph application.js
    a2["const utilities = require('./utilities')"];
    end
    subgraph 
    b1["|key |value<br>|clip|...function...|"]-- becomes -->a2["const utilities = require('./utilities')"];
    end
    subgraph utilities.js
    a["module.exports = {clip: clip}"]-- creates -->b1["|key |value|<br>|clip |...function...|"];
    end
{{< /mermaid >}}

```js
//file utilities.js
DEFAULT_BOUND = 3

const clip = (values, bound = DEFAULT_BOUND) => {
	let result = []
	for (let v of values) {
		if (v <= bound) {
			result.push(v) // appends a value to the end of an array 
		}
	}
	return result
}

module.exports = {
	clip: clip // means “associate a reference to the function clip with the string key "clip"
}

//file application.js
const utilities = require('./utilities') // to use the newly-defined module we must 'require' it. 
const data = [-1, 5, 3, 0, 10]

console.log(`clip(${data}) -> ${utilities.clip(data)}`)
console.log(`clip(${data}, 5) -> ${utilities.clip(data, 5)}`)

// clip(-1, 5, 3, 0, 10) -> -1, 3, 0
// clip(-1, 5, 3, 0, 10, 5) -> -1, 5, 3, 0
``` 

## typeof
The operator `typeof` return the type of the declared data: 

```js
console.log('the type of', "someText", 'is', typeof "someText") // the type of "someText" is string.
```

## filling the blanks

## callbacks

[^1]:  The argument made by JavaScript’s advocates is that an _empty array_ is there, it just happens to be empty, but this behavior is still a common cause of bugs.

[^2]: think of the expression array[0] or array[1]