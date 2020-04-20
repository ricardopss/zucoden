---
title: "Create a PySpark Dataframe"
date: 2020-04-11T18:31:27+02:00
series: ['pyspark']
tags: ['sqlContext', 'json', 'count']
categories: ["Python"]
---

Remeber that RDD do not have a schema, i.e. they do not have a _column structure_ (records are just record row by row). Therefore, RDDs are not suitable for working with SQL. 

For this, you'll need to create a {{< code gold>}}Spark DataFrame{{< /code >}}. Spark DataFrame have all of the features of RDDs but also have a schema, which supplies the necessary structure for SQL queries.

{{< betonen gold >}}what holds for an RDD also holds for a DataFrame, since the last are just organized into a columnar structure.{{< /betonen >}}

A self-describing format like `JSON` is ideal for DataFrames, but many other file types are supported, including text (`CSV`) and `Parquet`.

See Download Data and read in PySpark SQL [for an example](/posts/python/download-data-and-read-in-pyspark-sql)