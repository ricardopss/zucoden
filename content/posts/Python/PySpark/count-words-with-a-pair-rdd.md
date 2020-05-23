---
title: "Count Words With a Pair RDD"
date: 2020-04-10T19:33:05+02:00
series: ['pyspark', 'operator']
tags: ['RDD', 'map', 'flatMap', 'parallelize', 'collect', 'reduceByKey']
categories: ["Python"]
---

A common way to count the number of instances of words in an RDD is to create **a pair RDD**.

A pair RDD converts each word into a **key-value pair**, where the word is the key and the number 1 is the value. Because the values are all 1, when you add the values for a particular word, you get the number of instances of that word.

{{< tabs "pair RDD" >}}
{{< tab "py" >}}
```python
z = ["First,Line", "Second,Line", "and,Third,Line"]
z_str_rdd = sc.parallelize(z)
z_str_rdd.first()

z_str_rdd_flat = z_str_rdd.flatMap(lambda line: line.split(",")) 
z_str_rdd_flat.collect() # only to illustration NOT RECOMMENDED!!!

count_word = z_str_rdd_flat.map(lambda word: (word,1))

``` 
{{< /tab >}}
{{< tab ">>" >}}
```
"First, Line"

['First', 'Line', 'Second', 'Line', 'and', 'Third', 'Line']

[('First', 1),
 ('Line', 1),
 ('Second', 1),
 ('Line', 1),
 ('and', 1),
 ('Third', 1),
 ('Line', 1)]
```
{{< /tab >}}
{{< /tabs >}}

To sum all the values by key, use the action `.reduceByKey(func)`  from operator module:

{{< tabs "ReduceByKey" >}}
{{< tab "python" >}}
```python
from operator import add

count_word2 = count_word.reduceByKey(add)
countWord2.collect() # The word Line has a count of 3.
``` 
{{< /tab >}}
{{< tab ">>" >}}
```
[('Line', 3), ('Second', 1), ('First', 1), ('and', 1), ('Third', 1)] 
```
{{< /tab >}}
{{< /tabs >}}

Another way to count words is by [`.filter()`](/posts/python/pyspark/using-filter-to-filter-data) method.