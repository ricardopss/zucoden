---
title: "Manipulate Data in Rdds Using the `.map()`"
date: 2020-02-23T21:13:00+01:00
series: ['pyspark']
tags: ['RDD', 'map', 'parallelize', 'collect']
categories: ["Python"]
---

Remember that to manipulate data, you use {{< code gold >}}transformation functions{{< /code >}}, such as the `map(func)`.

The `.map(func)` returns a new `RDD` with the results of running the specified function on each element.

{{< tabs "MapFunc" >}}
{{< tab "py" >}}
```python
x_nbr_rdd_2 = x_nbr_rdd.map(lambda x: x+1) 
# create a new RDD (since RDD are immutables) and assign each value + 1 of x_nbr_rdd to x_nbr_rdd_2

x_nbr_rdd_2.collect()  
``` 
{{< /tab >}}
{{< tab ">>" >}}
```
[2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
```
{{< /tab >}}
{{< /tabs >}}

#### Add numbers in an array - an example
An array of values is a common data format where multiple values _are contained in one element (string)_ . You can manipulate the individual values if you split them up into separate elements.

{{< tabs "MapFunc2" >}}
{{< tab "py" >}}
```python
X = ["1,2,3,4,5,6,7,8,9,10"]

y_rd = sc.parallelize(X)

# to split the values at commas use the map method:
y_rd2 = y_rd.map(lambda y: y.split(','))

y_rd2.collect() # list

print(type(y_rd2.collect()))
print(len(y_rd2.collect()))
print(len(y_rd2.collect())[0])
``` 
{{< /tab >}}
{{< tab ">>" >}}
```
[['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']]

<class 'list'>
1
10
```
{{< /tab >}}
{{< /tabs >}}

_Also as an example:_ split the values at commas and add values in the positions 2 and 9 in the array.

{{< tabs "MapFunc3" >}}
{{< tab "py" >}}
```python
# One can use a backslash character '\' to break the line of code for clarity.

Sum_rd = y_rd.map(lambda y: y.split(',')).map(lambda y: (int(y[2]) + int(y[9])))

Sum_rd.first() # prefer to use the first() to collect() 
``` 
{{< /tab >}}
{{< tab ">>" >}}
```
13
```
{{< /tab >}}
{{< /tabs >}}