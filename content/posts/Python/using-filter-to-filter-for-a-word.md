---
title: "Using `.filter()` to Filter for a Word"
date: 2020-04-11T15:06:05+02:00
series: ['pyspark']
tags: ['RDD', 'filter', 'count']
categories: ["Python"]
---

Using the same created RDD [`textfile_rdd`](/posts/python/create-a-rdd-from-file):

Filter the RDD to keep only the elements that contain the word _"Spark"_ with the `filter()` transformation:

{{< tabs "Filter for a word" >}}
{{< tab "py" >}}
```python
textfile_rdd_filtred = textfile_rdd.filter(lambda line: "Spark" in line)
textfile_rdd_filtred.count()

``` 
{{< /tab >}}
{{< tab ">>" >}}
```
19 
```
{{< /tab >}}
{{< /tabs >}}

