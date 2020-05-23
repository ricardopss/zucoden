---
title: "Parquet data storage format"
date: 2020-05-13T11:07:28+02:00
series: ['pyspark']
tags: ['data storage', 'parquet'] 
categories: ["Python"]
---

{{< betonen green >}}
<code style="color:black;background-color:rgba(0, 180, 0, 0.2);"> Sources:</code>
- [What is parquet](https://databricks.com/glossary/what-is-parquet)
- [Apache parquet](https://parquet.apache.org/documentation/latest/)
- [Efficient Data Storage for Analytics with Parquet 2.0](https://www.youtube.com/watch?v=MZNjmfx4LMc)
{{< /betonen >}}

Parquet is an open source file format available to any project in the Hadoop ecosystem. Apache Parquet is designed for efficient as well as performant flat columnar storage format of data compared to row based files like CSV or TSV files.

Parquet uses the record shredding and assembly algorithm which is superior to simple flattening of nested namespaces. Parquet is optimized to work with complex data in bulk and features different ways for efficient data compression and encoding types.  This approach is best especially for those queries that need to read certain columns from a large table. Parquet can only read the needed columns therefore greatly minimizing the IO.

{{< tabs "Parquet" >}}
{{< tab "py" >}}
```python
from pyspark.sql import SparkSession

spark = SparkSession \
    .builder \
    .getOrCreate()

df = spark.read.parquet('washing.parquet')
df.createOrReplaceTempView('washing')
df.show()
``` 
{{< /tab >}}
{{< tab ">>" >}}
```
+--------------------+--------------------+-----+--------+----------+---------+--------+-----+-----------+-------------+-------+
|                 _id|                _rev|count|flowrate|fluidlevel|frequency|hardness|speed|temperature|           ts|voltage|
+--------------------+--------------------+-----+--------+----------+---------+--------+-----+-----------+-------------+-------+
|0d86485d0f88d1f9d...|1-57940679fb8a713...|    4|      11|acceptable|     null|      77| null|        100|1547808723923|   null|
|0d86485d0f88d1f9d...|1-15ff3a0b304d789...|    2|    null|      null|     null|    null| 1046|       null|1547808729917|   null|
|0d86485d0f88d1f9d...|1-97c2742b68c7b07...|    4|    null|      null|       71|    null| null|       null|1547808731918|    236|
|0d86485d0f88d1f9d...|1-eefb903dbe45746...|   19|      11|acceptable|     null|      75| null|         86|1547808738999|   null|
|0d86485d0f88d1f9d...|1-5f68b4c72813c25...|    7|    null|      null|       75|    null| null|       null|1547808740927|    235|
|0d86485d0f88d1f9d...|1-cd4b6c57ddbe77e...|    5|    null|      null|     null|    null| 1014|       null|1547808744923|   null|
|0d86485d0f88d1f9d...|1-a35b25b5bf43aaf...|   32|      11|acceptable|     null|      73| null|         84|1547808752028|   null|
|0d86485d0f88d1f9d...|1-b717f7289a8476d...|   48|      11|acceptable|     null|      79| null|         84|1547808768065|   null|
|0d86485d0f88d1f9d...|1-c2f1f8fcf178b2f...|   18|    null|      null|       73|    null| null|       null|1547808773944|    228|
|0d86485d0f88d1f9d...|1-15033dd9eebb4a8...|   59|      11|acceptable|     null|      72| null|         96|1547808779093|   null|
|0d86485d0f88d1f9d...|1-753dae825f9a6c2...|   62|      11|acceptable|     null|      73| null|         88|1547808782113|   null|
|0d86485d0f88d1f9d...|1-b168089f44f03f0...|   13|    null|      null|     null|    null| 1097|       null|1547808784940|   null|
|0d86485d0f88d1f9d...|1-403b687c6be0dea...|   23|    null|      null|       80|    null| null|       null|1547808788955|    236|
|0d86485d0f88d1f9d...|1-195551e0455a24b...|   72|      11|acceptable|     null|      77| null|         87|1547808792134|   null|
|0d86485d0f88d1f9d...|1-060a39fc6c2ddee...|   26|    null|      null|       62|    null| null|       null|1547808797959|    233|
|0d86485d0f88d1f9d...|1-2234514bffee465...|   27|    null|      null|       61|    null| null|       null|1547808800960|    226|
|0d86485d0f88d1f9d...|1-4265898bb401db0...|   82|      11|acceptable|     null|      79| null|         96|1547808802154|   null|
|0d86485d0f88d1f9d...|1-2fbf7ca9a0425a0...|   94|      11|acceptable|     null|      73| null|         90|1547808814186|   null|
|0d86485d0f88d1f9d...|1-203c0ee6d7fbd21...|   97|      11|acceptable|     null|      77| null|         88|1547808817190|   null|
|0d86485d0f88d1f9d...|1-47e1965db94fcab...|  104|      11|acceptable|     null|      75| null|         80|1547808824198|   null|
+--------------------+--------------------+-----+--------+----------+---------+--------+-----+-----------+-------------+-------+
only showing top 20 rows
```
{{< /tab >}}
{{< /tabs >}}

To print the basic statistics, use `df.describe().show`