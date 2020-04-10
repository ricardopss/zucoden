---
title: "Enabling the SQL Process"
date: 2020-02-20T16:10:01+01:00
series: ['pyspark']
tags: ['SQLContext']
categories: ["Python"]
---

Before run SQL queries on data in a Spark environment, you need to enable the SQL processing using `SQLContext()`: 

{{< tabs "Enable SQL" >}}
{{< tab "py" >}}
```python
from pyspark.sql import SQLContext

sqlContext = SQLContext(sc)
print(sqlContext)
``` 
{{< /tab >}}
{{< tab ">>" >}}
```
<pyspark.sql.context.SQLContext object at 0x7fc1c2efe5f8>
```
{{< /tab >}}
{{< /tabs >}}

{{< betonen gold >}}
where `sc` is the Spark driver application created using [`SparkContext()`](/posts/python/create-a-sparkcontext)
{{< /betonen >}}

Once the SQL processing was enabled, we'll need to create a Spark DataFrame (datasets with the necessary structure for SQL queries). Some alternatives to create a DataFrame are:

- [Converting RDDs to Dataframes](/posts/python/converting-rdds-to-dataframes)
- [Downloading data from a URL](/posts/python/download-data-and-read-in-pyspark-sql) 

