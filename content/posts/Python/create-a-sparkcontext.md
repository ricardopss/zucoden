---
title: "Create a `SparkContext`"
date: 2020-02-20T16:28:28+01:00
series: ['pyspark']
tags: ['RDD', 'SparkConf', 'SparkContext']
categories: ["Python"]
---

Once the PySpark was [installed](/posts/python/installing-pyspark-in-google-colab), the next step is to initiate a _Spark driver application_, using `SparkContext()`, where all the code for that application will run on.

{{< tabs "Create a SparkContext" >}}
{{< tab "py" >}}
```python
from pyspark import SparkContext, SparkConf

conf = SparkConf().setAppName("learningSpark").setMaster("local[*]")
sc = SparkContext(conf=conf)

print(sc)
print(sc.version) # to check the version
```
{{< /tab >}}
{{< tab ">>" >}}
```
SparkContext
Spark UI
Version
	v2.4.5
Master
	local[*]
AppName
	learningSpark
2.4.5
```
{{< /tab >}}
{{< /tabs >}}

**where:**

`setAppName` optional method to name the Spark Application must be the app  (e.g. {{< code gold>}}pyspark-shell{{< /code >}}, or {{< code gold>}}learningSpark{{< /code >}}); 

`setMaster` determines where the program will run; "" sets it to run locally on all cores but you can use "local[1]" to run on one core for example. By using Google Colab, the program will be run on Google’s servers.