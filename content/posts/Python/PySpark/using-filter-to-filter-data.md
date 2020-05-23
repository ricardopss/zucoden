---
title: "Using `.filter()` to filter data (and to count it)"
date: 2020-04-10T22:27:06+02:00
series: ['pyspark']
tags: ['RDD', 'map', 'flatMap', 'parallelize', 'collect', 'split', 'distinct', 'filter', 'count']
categories: ["Python"]
---

Remember that to manipulate data, you use transformation functions, as e.g. `filter(func)`.

The `.filter()` method returns a new `RDD` with the elements for which the specified function returns true.

An alternative to count the number of instances of a word in a text is using the `filter()` method, where the syntax is given by:

```
.filter(lambda line: "Filter Criteria Value" in line)
```

Using the same created RDD [`z_str_rdd`](/posts/python/pyspark/count-words-with-a-pair-rdd):

{{< tabs "FilterData" >}}
{{< tab "py" >}}
```python
z_str_rdd_filter = z_str_rdd.flatMap(lambda line: line.split(",")).filter(lambda line: "Line" in line)

z_str_rdd_filter.collect()

print("The count of words '" + str(z_str_rdd_filter.first()) + "'")
print("Is: " + str(z_str_rdd_filter.count())) # count()~ len() in Python
``` 
{{< /tab >}}
{{< tab ">>" >}}
```
['Line', 'Line', 'Line']

The count of words 'Line'
Is: 3
```
{{< /tab >}}
{{< /tabs >}}

To count the number of differents words use the `distinct()` method, where `distinct([numTasks]))` returns a new RDD that contains the distinct elements of the source RDD:

{{< tabs "Distinct" >}}
{{< tab "py" >}}
```python
z_rdd_distinct = z_str_rdd.flatMap(lambda line: line.split(",")).distinct()
z_rdd_distinct.collect()
``` 
{{< /tab >}}
{{< tab ">>" >}}
```
['Line', 'Second', 'First', 'and', 'Third']
```
{{< /tab >}}
{{< /tabs >}}