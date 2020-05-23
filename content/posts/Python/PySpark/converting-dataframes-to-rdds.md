---
title: "Converting Dataframes to Rdds"
date: 2020-05-13T11:03:48+02:00
series: ['pyspark']
tags: ['RDD', 'dataframe'] 
categories: ["Python"]
---

Converting dataframe to RDDs are more straight-forward as RDDs are simpler (_schemeless_) data structure as Dataframe.

As Dataframe we will use a dataset saved in [Parquet](/posts/python/parquet-datastorage-format)

{{< tabs "RddToDf" >}}
{{< tab "py" >}}
```python
df = spark.read.parquet('washing.parquet')
df.createOrReplaceTempView('washing')
df.describe().show()

convertedRdd = df.rdd.map(lambda x:list(x))

### to convert only a column, select first
columnRdd = df.select('temperature').rdd.map(lambda x: row.temperature)
```
{{< /tab >}}
{{< tab ">>" >}}
```
+-------+--------------------+--------------------+------------------+--------+----------+-----------------+------------------+------------------+------------------+--------------------+------------------+
|summary|                 _id|                _rev|             count|flowrate|fluidlevel|        frequency|          hardness|             speed|       temperature|                  ts|           voltage|
+-------+--------------------+--------------------+------------------+--------+----------+-----------------+------------------+------------------+------------------+--------------------+------------------+
|  count|                2058|                2058|              2058|    1342|      1342|              448|              1342|               268|              1342|                2058|               448|
|   mean|                null|                null|504.26384839650143|    11.0|      null|70.36160714285714| 82.86438152011922|1059.4664179104477| 90.03800298062593|1.547809393114940...|230.90401785714286|
| stddev|                null|                null|394.26120131405895|     0.0|      null|5.950846318630469|21.762176641308958|52.013852150989514|6.1007610586219725|  388153.29745956016|  8.12966407420454|
|    min|0d86485d0f88d1f9d...|1-003919c147da18a...|                 1|      11|acceptable|               60|                70|              1000|                80|       1547808720911|               220|
|    max|e25acc0758bc7bd9f...|1-ffb07abc7a4e9b5...|              1342|      11|acceptable|               80|               195|              1289|               100|       1547810064867|               258|
+-------+--------------------+--------------------+------------------+--------+----------+-----------------+------------------+------------------+------------------+--------------------+------------------+
```
{{< /tab >}}
{{< /tabs >}} 

See the reverse conversion, i.e [RDDs to Dataframe](/posts/python/pyspark/converting-rdds-to-dataframes)