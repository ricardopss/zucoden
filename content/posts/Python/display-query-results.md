---
title: "Display Query Results"
date: 2020-02-20T18:14:31+01:00
series: ['pyspark']
tags: ['registerTempTable', 'sql', 'show', 'take']
categories: ["Python"]
---

Once we have the DataFrame, the `show()` function displays information about its content (or queries):

{{< tabs "Display Query Results" >}}
{{< tab "py" >}}
```python
### starting from the DataFrame schemaExample
schemaExample.registerTempTable("random_Table") 

df = sqlContext.sql("select * from random_Table")

print(df) # shows the column names and data types of the DataFrame (similar to printSchema)
print(df.show())
``` 
{{< /tab >}}
{{< tab ">>" >}}
```
DataFrame[ID: string, VAL1: string, VAL2: string]

+---+----+----+
| ID|VAL1|VAL2|
+---+----+----+
|  1|   5|   7|
|  2|   6|   4|
|  3|   1|   3|
|  4|   9|  11|
|  5|   1|   3|
+---+----+----+ 
```
{{< /tab >}}
{{< /tabs >}}

Note that we can reference the columns names in DataFrames also to print its contents:
```python
print('ID VAL1 VAL2')

for row in schemaExample.take(5):
    print(row.ID, row.VAL1, row.VAL2)
```
For formatted display see [Display Query Results with a Pandas DataFrame](/posts/python/display-query-results-with-a-pandas-dataframe)