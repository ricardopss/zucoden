---
title: "Join Tables in PySpark SQL"
date: 2020-02-20T19:14:20+01:00
series: ['PySpark']
tags: ['querying data', 'SQL', 'big data']
categories: ["Python"]
---

As an example we will create two DataFrames with 2 columns of random numbers from an RDDs + schema:

{{< tabs "Join Tables - DataFrames" >}}
{{< tab "python" >}}
```python
import random
from pyspark.sql.types import *
from pyspark.sql import SQLContext

sqlContext = SQLContext(sc)

dataRandom1 = []
dataRandom2 = []

for x in range(1,7):

	if x != 6:
		random_int = int(random.random() * 10)
		dataRandom1.append([x, random_int, random_int^2])

		random_int = int(random.random() * 10)
		dataRandom2.append([x, random_int, random_int^2])
	else:
		for y in range(8, 10):
			random_int = int(random.random() * 10)		
			dataRandom1.append([y, random_int, random_int^2])

			random_int = int(random.random() * 10)		
			dataRandom2.append([y+1, random_int, random_int^2])

rddRandom1 = sc.parallelize(dataRandom1)
rddRandom2 = sc.parallelize(dataRandom2)

schemaString1 = "ID VAR1 VAR2"
schemaString2 = "id val1 val2"

fields1 = [StructField(f, StringType(), True) for f in schemaString1.split()]
fields2 = [StructField(f, StringType(), True) for f in schemaString2.split()]

schema1 = StructType(fields1)
schema2 = StructType(fields2)

dfRandom1 = sqlContext.createDataFrame(rddRandom1, schema1)
dfRandom2 = sqlContext.createDataFrame(rddRandom2, schema2)

dfRandom1.registerTempTable("randomTable1")
dfRandom2.registerTempTable("randomTable2")

print(dfRandom1.show())
print(dfRandom2.show())
``` 
{{< /tab >}}
{{< tab ">>" >}}
```
+---+----+----+		+---+----+----+
| ID|VAR1|VAR2|		| id|val1|val2|
+---+----+----+		+---+----+----+
|  1|   3|   1|		|  1|   3|   1|
|  2|   2|   0|		|  2|   1|   3|
|  3|   7|   5|		|  3|   6|   4|
|  4|   7|   5|		|  4|   7|   5|
|  5|   3|   1|		|  5|   3|   1|
|  8|   9|  11|		|  9|   4|   6|
|  9|   5|   7|		| 10|   5|   7|
+---+----+----+		+---+----+----+
```
{{< /tab >}}
{{< /tabs >}}

## Left Join
{{< tabs "pyLeftJoin" >}}
{{< tab "Left Join" >}}
```python
query = """
SELECT
	*
FROM
	randomTable1 AS r1
	LEFT JOIN randomTable2 AS r2 ON
	r1.ID = r2.id
	ORDER BY r1.ID
"""
print (sqlContext.sql(query).toPandas())
``` 
{{< /tab >}}
{{< tab ">>" >}}
|index|ID|VAR1|VAR2|id|val1|val2|
|:-|:-|:-|:-|:-|:-|:-|
|0|1|6| 4|   1|   4|   6|
|1|2|5| 7|   2|   3|   1|
|2|3|2| 0|   3|   9|  11|
|3|4|9|11|   4|   0|   2|
|4|5|4| 6|   5|   1|   3|
|5|8|6| 4|None|None|None|
|6|9|2| 0|   9|   4|   6|
{{< /tab >}}

{{< tab "Left Join + Where" >}}
```python
query = """
SELECT
	*
FROM
	randomTable1 AS r1
	LEFT JOIN randomTable2 AS r2 ON
	r1.ID = r2.id
	WHERE r2.id IS NOT NULL 
	ORDER BY r1.ID
"""
print (sqlContext.sql(query).toPandas())
``` 
{{< /tab >}}
{{< tab ">>" >}}
|index|ID|VAR1|VAR2|id|val1|val2|
|:-|:-|:-|:-|:-|:-|:-|
|0|1|6| 4|   1|   4|   6|
|1|2|5| 7|   2|   3|   1|
|2|3|2| 0|   3|   9|  11|
|3|4|9|11|   4|   0|   2|
|4|5|4| 6|   5|   1|   3|
|6|9|2| 0|   9|   4|   6|
{{< /tab >}}
{{< /tabs >}}

## Right Join
{{< tabs "pyRightJoin" >}}
{{< tab "Right Join" >}}
```python
query = """
SELECT
	*
FROM
	randomTable1 AS r1
	RIGHT JOIN randomTable2 AS r2 ON
	r1.ID = r2.id
	ORDER BY r1.ID
"""
print (sqlContext.sql(query).toPandas())
``` 
{{< /tab >}}
{{< tab ">>" >}}
|index|ID|VAR1|VAR2|id|val1|val2|
|:-|:-|:-|:-|:-|:-|:-|
|0|None|None|None|10|6| 4|
|1|   1|   6|   4| 1|4| 6|
|2|   2|   5|   7| 2|3| 1|
|3|   3|   2|   0| 3|9|11|
|4|   4|   9|  11| 4|0| 2|
|5|   5|   4|   6| 5|1| 3|
|6|   9|   2|   0| 9|4| 6|
{{< /tab >}}

{{< tab "Right Join + Where" >}}
```python
query = """
SELECT
	*
FROM
	randomTable1 AS r1
	RIGHT JOIN randomTable2 AS r2 ON
	r1.ID = r2.id
	WHERE r1.ID IS NOT NULL 
	ORDER BY r1.ID
"""
print (sqlContext.sql(query).toPandas())
``` 
{{< /tab >}}
{{< tab ">>" >}}
|index|ID|VAR1|VAR2|id|val1|val2|
|:-|:-|:-|:-|:-|:-|:-|
|0|1|6| 4|   1|   4|   6|
|1|2|5| 7|   2|   3|   1|
|2|3|2| 0|   3|   9|  11|
|3|4|9|11|   4|   0|   2|
|4|5|4| 6|   5|   1|   3|
|6|9|2| 0|   9|   4|   6|
{{< /tab >}}
{{< /tabs >}}

## Inner Join
{{< tabs "pyInnerJoin" >}}
{{< tab "Inner Join" >}}
```python
query = """
SELECT
	*
FROM
	randomTable1 AS r1
	INNER JOIN randomTable2 AS r2 ON
	r1.ID = r2.id
	ORDER BY r1.ID
"""
print (sqlContext.sql(query).toPandas())
``` 
{{< /tab >}}
{{< tab ">>" >}}
|index|ID|VAR1|VAR2|id|val1|val2|
|:-|:-|:-|:-|:-|:-|:-|
|0|1|6| 4|   1|   4|   6|
|1|2|5| 7|   2|   3|   1|
|2|3|2| 0|   3|   9|  11|
|3|4|9|11|   4|   0|   2|
|4|5|4| 6|   5|   1|   3|
|6|9|2| 0|   9|   4|   6|
{{< /tab >}}
{{< /tabs >}}

## Full Outer Join
{{< tabs "pyFullOuter" >}}
{{< tab "Full Outer Join" >}}
```python
query = """
SELECT
	*
FROM
	randomTable1 AS r1
	FULL OUTER JOIN randomTable2 AS r2 ON
	r1.ID = r2.id
	ORDER BY r1.ID
"""
print (sqlContext.sql(query).toPandas())
``` 
{{< /tab >}}
{{< tab ">>" >}}
|index|ID|VAR1|VAR2|id|val1|val2|
|:-|:-|:-|:-|:-|:-|:-|
|0|None|None|None|10|6| 4|
|1|   1|   6|   4| 1|4| 6|
|2|   2|   5|   7| 2|3| 1|
|3|   3|   2|   0| 3|9|11|
|4|   4|   9|  11| 4|0| 2|
|5|   5|   4|   6| 5|1| 3|
|6|   8|   6|   4| None|None| None|
|7|   9|   2|   0| 9|4| 6|
{{< /tab >}}

{{< tab "Full Outer Join + Where" >}}
```python
query = """
SELECT
	*
FROM
	randomTable1 AS r1
	RIGHT JOIN randomTable2 AS r2 ON
	r1.ID = r2.id
	WHERE r1.ID IS NOT NULL 
	ORDER BY r1.ID
"""
print (sqlContext.sql(query).toPandas())
``` 
{{< /tab >}}

{{< tab ">>" >}}
|index|ID|VAR1|VAR2|id|val1|val2|
|:-|:-|:-|:-|:-|:-|:-|
|0|None|None|None|10|6| 4|
|1|   8|   6|   4| None|None| None|
{{< /tab >}}

{{< /tabs >}}

## Join using Python synthax
We can also join DataFrames with a Python command instead of an SQL query:

```python
db = dfRandom1.join(dfRandom2, dfRandom1["ID"] == dfRandom2["id"])

for row in db.take(5):
    print (row)
```

## SQL Join Diagram
Extracted from [Stackoverflow](https://stackoverflow.com/questions/6294778/mysql-quick-breakdown-of-the-types-of-joins)

![joinSQL](/img/SQL.png)
