---
title: "Installing PySpark in Google Colab"
date: 2020-02-20T16:45:35+01:00
series: ['pyspark', 'findspark', 'os']
tags: ['wget', 'apt', 'pip','install']
categories: ["Python"]
---

To get Spark running in Colab run the following block of code:

```python
!apt-get install openjdk-8-jdk-headless -qq > /dev/null
!wget -q https://www-us.apache.org/dist/spark/spark-2.4.5/spark-2.4.5-bin-hadoop2.7.tgz
!tar xf spark-2.4.5-bin-hadoop2.7.tgz
!pip install -q findspark

import os
os.environ["JAVA_HOME"] = "/usr/lib/jvm/java-8-openjdk-amd64"
os.environ["SPARK_HOME"] = "/content/spark-2.4.5-bin-hadoop2.7"

import findspark
findspark.init()
```
{{< betonen red >}}
If it returns a error it is probably because the Spark version in the code is outdate. Check the [Spark website](https://spark.apache.org/downloads.html), search for the newst version and replace in the code above (in case, `2.4.5`).
{{< /betonen >}}

With the PySpark installed, we can now initiate a [Spark driver application](/posts/python/create-a-sparkcontext)