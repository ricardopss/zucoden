---
title: "Create a RDD using `parallelize()`"
date: 2020-02-23T21:12:48+01:00
series: ['PySpark']
tags: ['RDD', 'big data']
categories: ["Python"]
---

The `.parallelize()` method is the main method to create a RDD.

{{< tabs "Create a collection" >}}
{{< tab "python" >}} 
```python
x = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] # collection of numbers (nbr)

x_nbr_rdd = sc.parallelize(x)

print(type(x_nbr_rdd))
```
{{< /tab >}}
{{< tab ">>" >}}
```
<class 'pyspark.rdd.RDD'>
``` 
{{< /tab >}}
{{< /tabs >}}

{{< betonen gold >}}
The <code style="color:black;background-color:rgba(255, 180, 0, 0.2);">.parallelize()</code> method returns no value (since it is a _transformation_ and not an _action_). Spark just recorded how to create the RDD.
{{< /betonen >}}

Another method to create a RDD is the [`.textFile()`](/posts/python/create-a-rdd-from-file) 