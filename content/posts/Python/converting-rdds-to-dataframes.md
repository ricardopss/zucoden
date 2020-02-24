---
title: "Converting RDDs to Dataframes"
date: 2020-02-20T16:10:04+01:00
series: ['PySpark']
tags: ['querying data', 'SQL', 'big data']
categories: ["Python"]
---

Remeber that RDD do not have a _schema_, i.e. they do not have a column structure (records are just record row by row). Therefore, RDDs are not suitable for working with SQL. 

For this reason, we'll need to create a Spark DataFrame. Spark DataFrame have all of the features of RDDs but also have a _schema_, which supplies the necessary structure for SQL queries.

{{< betonen gold >}}what holds for an RDD also holds for a DataFrame, since the last are just organized into a columnar structure with names.{{< /betonen >}}

If we want to run SQL queries on an existing RDD, we will need first convert the RDD to a DataFrame. There are two different ways:

- Apply a schema
- Create rows with named columns

## Apply a schema

Suppose a simple RDD with ID column and two columns of random numbers:

{{< tabs "Apply a schema" >}}
{{< tab "python" >}}
```python
import random

dataRandom = []

for x in range(1,6):
    random_int = int(random.random() * 10)
    
    dataRandom.append([x, random_int, random_int^2]) # Col1 = Random Int | Col2 = squared Random Int

rddRandom = sc.parallelize(dataRandom)
print(rddRandom.collect())
``` 
{{< /tab >}}
{{< tab ">>" >}}
```
[[1, 1, 3], [2, 3, 1], [3, 1, 3], [4, 8, 10], [5, 0, 2]]
```
{{< /tab >}}
{{< /tabs >}}

To apply a _schema_, we can use the `.StructField` method to create a _schema_ object that's based on a `string` and then apply the _schema_ to the RDD to create a DataFrame, using the `createDataFrame()`:

{{< tabs "Apply a Schema 2" >}}
{{< tab "python" >}}
```python
from pyspark.sql.types import *

schemaString = "ID VAL1 VAL2"

fields = [StructField(fieldName, StringType(), True) for fieldName in schemaString.split()]
schema = StructType(fields)

schemaExample = sqlContext.createDataFrame(rddRandom, schema)
print (schemaExample.collect())
``` 
{{< /tab >}}
{{< tab ">>" >}}
```
[
Row(ID='1', VAL1='1', VAL2='3'), 
Row(ID='2', VAL1='3', VAL2='1'), 
Row(ID='3', VAL1='1', VAL2='3'), 
Row(ID='4', VAL1='8', VAL2='10'), 
Row(ID='5', VAL1='0', VAL2='2')
]
```
{{< /tab >}}
{{< /tabs >}}

To run SQL queries, we have to register the DataFrame as a table and to define a new DataFrame for the results of the SQL query using the `.sqlContext.sql()` method.

{{< tabs "Create a Table" >}}
{{< tab "python" >}}
```python
schemaExample.registerTempTable("random_Table") ### prefer names without space; use underscore if necessary

### we can reference the columns names in DataFrames
for row in schemaExample.take(2):
    print(row.ID, row.VAL1, row.VAL2)

print(schemaExample.printSchema())

### or run a simple SQL query:
df = sqlContext.sql("select * from random_Table")

print(df)
print(df.show())
``` 
{{< /tab >}}
{{< tab ">>" >}}
```
1 1 3
2 3 1

root
 |-- ID: string (nullable = true)
 |-- VAL1: string (nullable = true)
 |-- VAL2: string (nullable = true)

DataFrame[ID: string, VAL1: string, VAL2: string]

+---+----+----+
| ID|VAL1|VAL2|
+---+----+----+
|  1|   1|   3|
|  2|   3|   1|
|  3|   1|   3|
|  4|   8|  10|
|  5|   0|   2|
+---+----+----+ 
```
{{< /tab >}}
{{< /tabs >}}

{{< betonen gold >}}
See additionally: 
 - [DataFrame overview, using `printSchema`](/posts/python/dataframe-overview-printschema)
 - [Display Query Results](/posts/python/display-query-results)
 - [Display Query Results with a Pandas DataFrame](/posts/python/display-query-results-with-a-pandas-dataframe) 
{{< /betonen >}}


## Create rows with named columns

Another alternative is to create an RDD with named columns from an existing RDD, using `.map()`  and `Row()`, and then convert it to a DataFrame using `.toDF()`:

{{< tabs "Create rows with named columns" >}}
{{< tab "python" >}}
```python
from pyspark.sql import Row

rddRandom2 = rddRandom.map(lambda x: Row(id=x[0], val1=x[1], val2=x[2]))

print(rddRandom2.collect())

columnsExample = rddRandom2.toDF()
columnsExample.registerTempTable("random_Table2")

sqlContext.sql("select * from random_Table2").show()
``` 
{{< /tab >}}
{{< tab ">>" >}}
```
[
Row(id=1, val1=1, val2=3), 
Row(id=2, val1=3, val2=1), 
Row(id=3, val1=1, val2=3), 
Row(id=4, val1=8, val2=10), 
Row(id=5, val1=0, val2=2)
]

+---+----+----+
| id|val1|val2|
+---+----+----+
|  1|   1|   3|
|  2|   3|   1|
|  3|   1|   3|
|  4|   8|  10|
|  5|   0|   2|
+---+----+----+ 

```
{{< /tab >}}
{{< /tabs >}}

{{< betonen gold >}}
For creating DataFrame from internet files, see [Downloading data from a URL](/posts/python/download-data-and-read-in-pyspark-sql)
{{< /betonen >}}