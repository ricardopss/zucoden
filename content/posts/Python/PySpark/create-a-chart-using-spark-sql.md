---
title: "Create a chart using Spark SQL"
date: 2020-02-21T18:24:27+01:00
series: ['pyspark', 'matplotlib', 'numpy']
tags: ['toPandas', 'head', 'value_counts', 'to_frame', 'rename_axis', 'reset_index', 'groupBy', 'count', 'sql', 'bar']
categories: ["Python"]
---

For data visualization, we will use [this data set](/posts/python/pyspark/convert-a-pandas-dataframe-to-a-spark-dataframe), the matplotlib library to create graphs and the NumPy package for computing.

To create a chart using Pandas, we call the `.plot()` method and specify the type of chart, the columns for the X and Y axes, and, optionally, the size of the chart.

## Sorting/Aggregating Data using Pandas

{{< tabs "Data Visualization1" >}}
{{< tab "py" >}}
```python
%matplotlib inline  ### to show graphs inline
import matplotlib.pyplot as plt
import numpy as np

sales_df = spark_df.toPandas() 						# sales_df is a Pandas DataFrame object 
sales_df.head()

### SELECT DATA TO PLOT
sales_df_plot = (sales_df["GENDER"].value_counts()  # (1) 
                .to_frame("Count")      			# (2) 
                .rename_axis("GENDER")  			# (3) 
                .reset_index()         				# (4) 
				)
sales_df_plot

sales_df_plot.plot.bar(x="GENDER", y="Count", rot=0, figsize=(12, 5))  # Set the rot as 0 if you don't want the x ticks be 90 degrees rotated.
``` 
{{< /tab >}}
{{< tab ">>" >}}
```
| |GENDER|Count|
|0|M|35748|
|1|F|24504|
```
![Chart1](/img/Create_a_Chart_Using_SparkSQL_1.png)

{{< /tab >}}
{{< /tabs >}}

{{< betonen grey >}}
**Pandas Methods:**
- (1) Select the "GENDER" column and Count the number of each gender..
- (2) Since value_counts() returns a Pandas Series, convert it into a Pandas DataFrame. Also, rename the "GENDER" column as "Count".
- (3) Rename the "index" of the DataFrame - M/F - as "GENDER".
- (4) Create the "GENDER" column.
{{< /betonen >}}

## Sorting/Aggregating Data using PySpark
The same output can be achieved using PySpark by aggregating the data by GENDER:

- Run an SQL query on the {{< code gold>}}GENDER{{< /code >}} column to output the count of the {{< code gold>}}GENDER{{< /code >}}, and then run a `.groupBy()` operation on the {{< code gold>}}GENDER{{< /code >}}.
- Create a simple Python function to aggregate by {{< code gold>}}GENDER{{< /code >}}, and then run the function in an SQL query.
- Run the `map()` method on the PySpark DataFrame to append a new column that contains the aggregated count by {{< code gold>}}GENDER{{< /code >}}.
- Run the `groupBy()` and `count()` methods on the Spark DataFrame.

{{< tabs "Data Visualization2" >}}
{{< tab "py" >}}
```python
gender_df = spark_df.groupBy("GENDER").count()  	# spark_df is a PySpark DataFrame object
gender_df.show()

query = """
SELECT
    GENDER,
    count(GENDER) AS Count
FROM gosales_tx
GROUP BY GENDER
ORDER BY GENDER DESC
"""
spark_gender_df = sqlContext.sql(query).toPandas()	# (!) 
spark_gender_df.plot.bar(x="GENDER", y="Count", rot=0, figsize=(12, 5));
``` 
{{< /tab >}}

{{< tab ">>" >}}
```
+------+-----+
|GENDER|count|
+------+-----+
|     F|24504|
|     M|35748|
+------+-----+
```
|index|GENDER|Count|
|:-|:-|:-|
|0|	M|	35748|
|1|	F|	24504|

```
<class 'pandas.core.frame.DataFrame'>
```
![Chart1](/img/Create_a_Chart_Using_SparkSQL_1.png)
{{< /tab >}}
{{< /tabs >}}

{{< betonen red >}}
**Note:**
_gender_df_ is a Spark DataFrame, the _sqlContext.sql(query)_ results in a `pyspark.sql.dataframe.DataFrame`.

(!) the `.toPandas()` method convert a Spark DataFrame object into a Pandas DataFrame object. And therefore, the `.plot()` is possible.
{{< /betonen >}}