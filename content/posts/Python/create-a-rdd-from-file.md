---
title: "Create a RDD from file using `textFile()` "
date: 2020-02-23T22:00:21+01:00
series: ['PySpark']
tags: ['RDD', 'big data']
categories: ["Python"]
---

To create a RDD from the file, use the `.textFile()` method:

{{< tabs "textFile" >}}
{{< tab "python" >}}
```python
!rm README.md* -f  # removes any file with the README.md
!wget https://raw.githubusercontent.com/carloapp2/SparkPOT/master/README.md

textfile_rdd = sc.textFile("README.md")
textfile_rdd.count()
textfile_rdd.take(20)
``` 
{{< /tab >}}
{{< tab ">>" >}}
```
--2020-02-23 21:02:18--  https://raw.githubusercontent.com/carloapp2/SparkPOT/master/README.md
Resolving raw.githubusercontent.com (raw.githubusercontent.com)... 151.101.0.133, 151.101.64.133, 151.101.128.133, ...
Connecting to raw.githubusercontent.com (raw.githubusercontent.com)|151.101.0.133|:443... connected.
HTTP request sent, awaiting response... 200 OK
Length: 3624 (3.5K) [text/plain]
Saving to: ‘README.md’

README.md           100%[===================>]   3.54K  --.-KB/s    in 0s      

2020-02-23 21:02:18 (72.5 MB/s) - ‘README.md’ saved [3624/3624]


98

['# Apache Spark',
 '',
 'Spark is a fast and general cluster computing system for Big Data. It provides',
 'high-level APIs in Scala, Java, and Python, and an optimized engine that',
 'supports general computation graphs for data analysis. It also supports a',
 'rich set of higher-level tools including Spark SQL for SQL and structured',
 'data processing, MLlib for machine learning, GraphX for graph processing,',
 'and Spark Streaming for stream processing.',
 '',
 '<http://spark.apache.org/>',
 '',
 '',
 '## Online Documentation',
 '',
 'You can find the latest Spark documentation, including a programming',
 'guide, on the [project web page](http://spark.apache.org/documentation.html)',
 'and [project wiki](https://cwiki.apache.org/confluence/display/SPARK).',
 'This README file only contains basic setup instructions.',
 '',
 '## Building Spark']
```
{{< /tab >}}
{{< /tabs >}}
