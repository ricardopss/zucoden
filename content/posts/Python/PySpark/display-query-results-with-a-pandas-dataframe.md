---
title: "Display Query Results With a Pandas Dataframe"
date: 2020-02-20T18:01:43+01:00
series: ['pyspark', 'pandas']
tags: ['registerTempTable', 'sql', 'toPandas']
categories: ["Python"]
---

Ind addition to [`.show()`](/posts/python/pyspark/display-query-results) the pandas open-source data analytics library creates a pandas DataFrame that shows the data in a table.

Import the pandas library and use the `.toPandas()` method to show the query results:

{{< tabs "Pandas Analytics" >}}
{{< tab "python" >}}
```python
import pandas as pd

schemaExample.registerTempTable("random_Table") 

df = sqlContext.sql("select * from random_Table")

print(df.toPandas())
``` 
{{< /tab >}}
{{< tab ">>" >}}
|INDEX|ID|VAL1|VAL2|
|:-|:-|:-|:-|
|0|1|5|7|
|1|2|6|4| 
|2|3|1|3|
|3|4|9|11|
|4|5|1|3|
{{< /tab >}}
{{< /tabs >}}