---
title: "Count the Instances of a String at the Beginning of Words"
date: 2020-04-11T15:11:21+02:00
series: ['pyspark']
tags: ['RDD', 'filter', 'flatMap', 'map', 'reduceByKey', 'startswith', 'collect']
categories: ["Python"]
---

Using the same created RDD [`textfile_rdd`](/posts/python/pyspark/create-a-rdd-from-file), to count the number of times the substring _"Spark"_ appears at the beginning of a word in the original text:

1. Use `.flatMap()` to split each line of the text file into words
2. Use the `tuple(word, 1)` + `.reduceByKey` to count the number of instances
3. Use the filter `str().startswith("token")` 

{{< tabs "startswith" >}}
{{< tab "py" >}}
```python
textfile_rdd_filtred = textfile_rdd.filter(lambda line: "Spark" in line)

temp_rdd = textfile_rdd_filtred.flatMap(lambda w: w.split(" "))\
								.map(lambda word: (word,1)).reduceByKey(add)

temp_rdd_filtred = temp_rdd.filter(lambda k: k[0].startswith("Spark"))
temp_rdd_filtred.collect()

"""
textfile_rdd_filtred filter all text-line that has the Word "Spark" in it.
temp_rdd split each text-line into words, create the tuple() and then sum by. 
temp_rdd_filtred filter for words that start with "Spark"
"""
``` 
{{< /tab >}}
{{< tab ">>" >}}
```
[('Spark', 14),
 ('Spark"](http://spark.apache.org/docs/latest/building-spark.html).', 1),
 ('SparkPi', 2),
 ('Spark](#building-spark).', 1),
 ('Spark.', 1)]
```
{{< /tab >}}
{{< /tabs >}}

{{< betonen gold >}}
to count instances of a string within words, use <code style="color:black;background-color:rgba(255, 180, 0, 0.2);">temp_rdd_filtred = temp_rdd.filter(lambda k: "Spark" in k[0])).collect()</code>
{{< /betonen >}}