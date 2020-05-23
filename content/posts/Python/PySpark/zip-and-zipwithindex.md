---
title: "Zip and Zipwithindex"
date: 2020-05-14T11:24:18+02:00
series: ['pyspark', 'random']
tags: ['random', 'sample', 'zipWithIndex', 'zip']
categories: ['Python']
---

## `.zip`
The `.zip()` method just like in Python is used to merge 2 list (A, B), in an [(firstA, firstB), (secondA, secondB)...] way

{{< tabs "zip" >}}
{{< tab "py" >}}
```python
rddA = sc.parallelize(range(10))
rddB = sc.parallelize(range(10))
rddC = sc.parallelize(range(10))

print(rddA.collect())
print(rddA.zip(rddB).collect())
print(rddA.zip(rddB).zip(rddC).collect())
```
{{< /tab >}}
{{< tab ">>" >}}
```
[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

[(0, 0), (1, 1), (2, 2), (3, 3), (4, 4), (5, 5), (6, 6), (7, 7), (8, 8), (9, 9)]

[((0, 0), 0), ((1, 1), 1), ((2, 2), 2), ((3, 3), 3), ((4, 4), 4), ((5, 5), 5), ((6, 6), 6), ((7, 7), 7), ((8, 8), 8), ((9, 9), 9)]
```
{{< /tab >}}
{{< /tabs >}}

## `.zipWithIndex`
The `.zipWithIndex()` method is used to add an index to un-indexed RDDs, e.g.

```python
import random

plainRdd = sc.parallelize(random.sample(range(100), 10))
indexedRdd = plainRdd.zipWithIndex().map(lambda x: (x[1], x[0])) 

print(plainRdd.collect())	### [92, 54, 23, 97, 7, 57, 38, 88, 28, 6]
print(indexedRdd.collect())	### [(0, 92), (1, 54), (2, 23), (3, 97), (4, 7), (5, 57), (6, 38), (7, 88), (8, 28), (9, 6)]
```

{{< betonen gold >}}
Unfortunatelly, the <code style="color:black;background-color:rgba(255, 180, 0, 0.2);">.zipWithIndex()</code> returns a (value, percentil) tuples instead of the contrary, therefore the <code style="color:black;background-color:rgba(255, 180, 0, 0.2);">.map()</code> is necessary to change the structure of the RDD.
{{< /betonen >}}