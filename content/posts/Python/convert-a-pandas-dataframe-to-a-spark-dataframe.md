---
title: "Convert a Pandas DataFrame to a Spark DataFrame"
date: 2020-02-21T18:23:53+01:00
series: ['pyspark', 'pandas']
tags: ['wget', 'read_csv', 'head', 'createDataFrame', 'registerTempTable', 'show']
categories: ["Python"]
---

Although pandas DataFrames display data in a friendlier format, Spark DataFrames can be faster and more scalable.

To show how to convert a pandas DataFrames to a Spark Dataframe, we will use a new data set (CSV) and the apply `.createDataFrame()` method:

{{< tabs "Pandas to Spark" >}}
{{< tab "py" >}}
```python
!rm GoSales_Tx.csv -f
!wget https://raw.githubusercontent.com/pmservice/wml-sample-models/master/spark/product-line-prediction/data/GoSales_Tx.csv

import pandas as pd

pandas_df = pd.read_csv("./GoSales_Tx.csv")
pandas_df.head()

spark_df = sqlContext.createDataFrame(pandas_df)
spark_df.show(2)

spark_df.registerTempTable("gosales_tx") ### to register the Table

### SQL statement to print the first 10 rows of the table
# print(sqlContext.sql("select * from gosales_tx limit 10").collect()) 
``` 
{{< /tab >}}
{{< tab ">>" >}}
```
--2020-02-21 18:04:22--  https://raw.githubusercontent.com/pmservice/wml-sample-models/master/spark/product-line-prediction/data/GoSales_Tx.csv
Resolving raw.githubusercontent.com (raw.githubusercontent.com)... 151.101.0.133, 151.101.64.133, 151.101.128.133, ...
Connecting to raw.githubusercontent.com (raw.githubusercontent.com)|151.101.0.133|:443... connected.
HTTP request sent, awaiting response... 200 OK
Length: 2470333 (2.4M) [text/plain]
Saving to: ‘GoSales_Tx.csv’

GoSales_Tx.csv      100%[===================>]   2.36M  --.-KB/s    in 0.08s   

2020-02-21 18:04:22 (31.0 MB/s) - ‘GoSales_Tx.csv’ saved [2470333/2470333]
```
|index|GENDER|AGE|MARITAL_STATUS|PROFESSION|PRODUCT_LINE|
|:-|:-|:-|:-|:-|:-|
|0|	M|	27|	Single|	Professional|	Personal Accessories|
|1|	F|	39|	Single|	Executive|	Personal Accessories|
|2|	M|	39|	Married|	Student|	Mountaineering Equipment|
|3|	F|	56|	Single|	Hospitality|	Personal Accessories|
|4|	M|	45|	Married|	Retired|	Golf Equipment|

```
+------+---+--------------+------------+--------------------+
|GENDER|AGE|MARITAL_STATUS|  PROFESSION|        PRODUCT_LINE|
+------+---+--------------+------------+--------------------+
|     M| 27|        Single|Professional|Personal Accessories|
|     F| 39|        Single|   Executive|Personal Accessories|
+------+---+--------------+------------+--------------------+
```
{{< /tab >}}
{{< /tabs >}}

