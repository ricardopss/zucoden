---
title: "Accessing Index and Value in a RDD"
date: 2020-05-12T01:08:44+02:00
series: ['pyspark', 'random']
tags: ['random', 'sample', 'zipWithIndex', 'lookup', 'map']
categories: ['Python']
---
To access a particular value of a RDD through a given index, we have to:
- first, add an index to RDD, using [`.zipWithIndex()`](/posts/python/pyspark/zip-and-zipwithindex)
- change the order of the tuple: from `(value, key)` to `(key, value)` using `.map()`
- use the `.lookup()` method  to access a particular index

{{< tabs "Index" >}}
{{< tab "py" >}}
```python
import random

plainRdd = sc.parallelize(random.sample(range(100), 10))
indexedRdd = plainRdd.zipWithIndex().map(lambda x: (x[1], x[0])) 

print(plainRdd.collect())
print(indexedRdd.collect())

intIndex = int(3)
print(indexedRdd.lookup(intIndex))
``` 
{{< /tab >}}
{{< tab ">>" >}}
```
[90, 24, 61, 23, 13, 60, 83, 58, 73, 88]

[(0, 90), (1, 24), (2, 61), (3, 23), (4, 13), (5, 60), (6, 83), (7, 58), (8, 73), (9, 88)]

[23]
```
{{< /tab >}}
{{< /tabs >}}

{{< betonen gold >}}
Unfortunatelly, the <code style="color:black;background-color:rgba(255, 180, 0, 0.2);">.zipWithIndex()</code> returns a (value, percentil) tuples instead of the contrary. 
{{< /betonen >}}

Se an application in [Median](/posts/python/pyspark/scaling-math-for-statistics-on-apache-spark#median)