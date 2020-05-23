---
title: "Create a PySpark Dataframe"
date: 2020-04-11T18:31:27+02:00
series: ['pyspark']
tags: ['sqlContext', 'json', 'count']
categories: ["Python"]
---

Remeber that RDD do not have a schema, i.e. they do not have a _column structure_ (records are just record row by row). Therefore, RDDs are not suitable for working with SQL. 

For this, you'll need to create a {{< code gold>}}Spark DataFrame{{< /code >}}. Spark DataFrame have all of the features of RDDs but also have a schema, which supplies the necessary structure for SQL queries.

We load the data using a `.SparkSession` or a `.sqlContext`, both from the `pyspark.sql` module:

```python
from pyspark.sql import SparkSession

spark = SparkSession.builder.getOrCreate()

## or 

from pyspark.sql import SQLContext

sqlContext = SQLContext(sc) ### where sc is the SparkContext
```
{{< betonen gold >}}what holds for an RDD also holds for a DataFrame, since the last are just organized into a columnar structure.{{< /betonen >}}

A self-describing format like `JSON` is ideal for DataFrames, but many other file types are supported, including text (`CSV`) and `Parquet`.

See Download Data and read in PySpark SQL [for an example](/posts/python/pyspark/download-data-and-read-in-pyspark-sql)

## `.read().json()`
```python
!rm world_bank.json.gz -f
!wget https://raw.githubusercontent.com/bradenrc/sparksql_pot/master/world_bank.json.gz

dfJson = sqlContext.read.json("world_bank.json.gz") ### create a DataFrame

print(type(dfJson))
print(dfJson.printSchema())

### we can reference the columns names in DataFrames
for row in dfJson.take(10):
    print(row.boardapprovaldate + "#" + row.closingdate)
```

## `.read().csv()`
Case the csv file has no schema, we first need to create a schema:

```python
!git clone https://github.com/wchill/HMP_Dataset.git 

from pyspark.sql.types import StructType, StructField, IntegerType
from pyspark.sql.functions import lit

### since the csv file have only 3 dimensions/features, we only need 3 StructField
schema = StructType([
        StructField('x', IntegerType(), True),
        StructField('y', IntegerType(), True),
        StructField('z', IntegerType(), True)])

datafileName = 'Accelerometer-2011-06-02-10-45-50-brush_teeth-f1.txt'

dfCsv = spark.read.option('header', 'false').option('delimiter', ' ').csv('HMP_Dataset/Brush_teeth/' + datafileName, schema=schema)
dfCsv.show()
```

## `.read().parquet()`

```python
!wget https://github.com/IBM/coursera/blob/master/coursera_ds/washing.parquet?raw=true
!mv washing.parquet?raw=true washing.parquet

dfParquet = spark.read.parquet('washing.parquet')
dfParquet.createOrReplaceTempView('washing')
dfParquet.show()
```