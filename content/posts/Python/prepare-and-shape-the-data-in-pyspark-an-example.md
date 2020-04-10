---
title: "Prepare and Shape the Data in PySpark - an Example"
date: 2020-02-23T20:20:13+01:00
series: ['pyspark', 're']
tags: ['wget', 'textFile', 'SQLContext', 'filter', 'map', 'first', 'createDataFrame', 'sql', 'registerTempTable', 'printSchema', 'toPandas']
categories: ["Python"]
---

{{< betonen gold >}}Preparing and shaping data is 80% of a data scientist's job, in other words, having the right data in the right format is critical for getting accurate results.{{< /betonen >}}

## Get the data file from URL

For this example, we will use a data set contains the transactions of an online retailer of gift items for the period from 01/12/2010 to 09/12/2011[^1].

Data columns:
- [1] InvoiceNo
- [2] StockCode
- [3] Description
- [4] Quantity
- [5] InvoiceDate
- [6] UnitPrice
- [7] CustomerID
- [8] Country

Since we are using a [data file from URL](/posts/python/create-a-rdd-from-file), we use the `.textFile()` method to create a RDD.

{{< tabs "Get the Data File from URL" >}}
{{< tab "py" >}}
```python
### To run shell commands in Python Notebooks, use !

!rm 'OnlineRetail.csv.gz' -f
!wget https://raw.githubusercontent.com/rosswlewis/RecommendationPoT/master/OnlineRetail.csv.gz

loadRetailData = sc.textFile("OnlineRetail.csv.gz")

### Each row in the RDD is a string that correlates to a line in the CSV file
for row in loadRetailData.take(5):
    print(row)
``` 
{{< /tab >}}
{{< tab ">>" >}}
```
--2020-02-23 19:42:32--  https://raw.githubusercontent.com/rosswlewis/RecommendationPoT/master/OnlineRetail.csv.gz
Resolving raw.githubusercontent.com (raw.githubusercontent.com)... 151.101.0.133, 151.101.64.133, 151.101.128.133, ...
Connecting to raw.githubusercontent.com (raw.githubusercontent.com)|151.101.0.133|:443... connected.
HTTP request sent, awaiting response... 200 OK
Length: 7483128 (7.1M) [application/octet-stream]
Saving to: ‘OnlineRetail.csv.gz’

OnlineRetail.csv.gz 100%[===================>]   7.14M  16.5MB/s    in 0.4s    

2020-02-23 19:42:33 (16.5 MB/s) - ‘OnlineRetail.csv.gz’ saved [7483128/7483128]


InvoiceNo,StockCode,Description,Quantity,InvoiceDate,UnitPrice,CustomerID,Country
536365,85123A,WHITE HANGING HEART T-LIGHT HOLDER,6,12/1/10 8:26,2.55,17850,United Kingdom
536365,71053,WHITE METAL LANTERN,6,12/1/10 8:26,3.39,17850,United Kingdom
536365,84406B,CREAM CUPID HEARTS COAT HANGER,8,12/1/10 8:26,2.75,17850,United Kingdom
536365,84029G,KNITTED UNION FLAG HOT WATER BOTTLE,6,12/1/10 8:26,3.39,17850,United Kingdom
```
{{< /tab >}}
{{< /tabs >}}

## Format the data
{{< betonen grey >}}Remove the header from the RDD and split the string in each row with a comma:{{< /betonen >}}

{{< tabs "Format the data" >}}
{{< tab "py" >}}
```python
header = loadRetailData.first()

loadRetailData = loadRetailData.filter(lambda line: line != header)\
							   .map(lambda l: l.split(","))

print(loadRetailData.take(5))
``` 
{{< /tab >}}
{{< tab ">>" >}}
```
[
['536365', '85123A', 'WHITE HANGING HEART T-LIGHT HOLDER', '6', '12/1/10 8:26', '2.55', '17850', 'United Kingdom']
['536365', '71053', 'WHITE METAL LANTERN', '6', '12/1/10 8:26', '3.39', '17850', 'United Kingdom']
['536365', '84406B', 'CREAM CUPID HEARTS COAT HANGER', '8', '12/1/10 8:26', '2.75', '17850', 'United Kingdom']
['536365', '84029G', 'KNITTED UNION FLAG HOT WATER BOTTLE', '6', '12/1/10 8:26', '3.39', '17850', 'United Kingdom']
['536365', '84029E', 'RED WOOLLY HOTTIE WHITE HEART.', '6', '12/1/10 8:26', '3.39', '17850', 'United Kingdom']
]
```
{{< /tab >}}
{{< /tabs >}}

## Clean the data
{{< betonen grey >}}
Remove the rows that have incomplete data. Keep only the rows that meet the following criteria:
- the purchase quantity (column 4) is greater than 0 
- the customer ID (column 7) not equal to 0
- the stock code (column 2) is not blank after you remove non-numeric characters
{{< /betonen >}}

{{< tabs "Clean the data" >}}
{{< tab "py" >}}
```python
import re

loadRetailData = loadRetailData.filter(lambda l: int(l[3]) > 0\
                                and len(l[6]) != 0 \
                                and len(re.sub("\D", "", l[1])) != 0)

print(loadRetailData.take(2)) 
``` 
{{< /tab >}}
{{< tab ">>" >}}
```
[
['536365', '85123A', 'WHITE HANGING HEART T-LIGHT HOLDER', '6', '12/1/10 8:26', '2.55', '17850', 'United Kingdom'], 
['536365', '71053', 'WHITE METAL LANTERN', '6', '12/1/10 8:26', '3.39', '17850', 'United Kingdom']
]
```
{{< /tab >}}
{{< /tabs >}}

{{< betonen gold >}}
where \D [matches any character which is not a decimal digit.](https://docs.python.org/3.6/library/re.html#regular-expression-syntax)
{{< /betonen >}}

## Create a DataFrame
1. create an SQLContext and map each line to a row
2. Create a DataFrame and show the inferred schema
3. Register the DataFrame as a table so that you can run SQL queries on it and show the first two rows

{{< tabs "Create a DataFrame" >}}
{{< tab "py" >}}
```python
from pyspark.sql import SQLContext, Row
sqlContext = SQLContext(sc)

### Convert each line to a Row
loadRetailData = loadRetailData.map(lambda l: Row(inv=int(l[0]),\
                                    stockCode=int(re.sub("\D", "", l[1])),\
                                    description=l[2],\
                                    quant=int(l[3]),\
                                    invDate=l[4],\
                                    price=float(l[5]),\
                                    custId=int(l[6]),\
                                    country=l[7]))

retailDf = sqlContext.createDataFrame(loadRetailData)
print (retailDf.printSchema())

retailDf.registerTempTable("retailPurchases")

sqlContext.sql("SELECT * FROM retailPurchases limit 2").toPandas()
``` 
{{< /tab >}}
{{< tab ">>" >}}
```
root
 |-- country: string (nullable = true)
 |-- custId: long (nullable = true)
 |-- description: string (nullable = true)
 |-- inv: long (nullable = true)
 |-- invDate: string (nullable = true)
 |-- price: double (nullable = true)
 |-- quant: long (nullable = true)
 |-- stockCode: long (nullable = true)
```
|index|country|custId|description|inv|invDate|price|quant|stockCode|
|:-|:-|:-|:-|:-|:-|:-|:-|:-|
|0|United Kingdom|17850|WHITEHANGING HEART T-LIGHT HOLDER|536365|12/1/10 8:26|2.55|6|85123|
|1|United Kingdom|17850|WHITE METAL LANTERN|536365|12/1/10 8:26|3.39|6|71053|

{{< /tab >}}
{{< /tabs >}}

## Remove unneeded columns
{{< betonen grey >}}The only columns needed are custId, stockCode, and a new column, purch, which has a value of 1 to indicate that the customer purchased the product{{< /betonen >}}

{{< tabs "Remove unneeded columns" >}}
{{< tab "py" >}}
```python
query = """
SELECT 
    custId, stockCode, 1 AS purch
FROM 
    retailPurchases 
GROUP 
    BY custId, stockCode"""

retailDf = sqlContext.sql(query)
retailDf.registerTempTable("retailDf")

sqlContext.sql("select * from retailDf limit 10").toPandas()
``` 
{{< /tab >}}
{{< tab ">>" >}}
|custId|stockCode|purch|
|:-|:-|:-|:-|
|0|18074|22224|1|
|1|13705|21889|1|
|2|15862|22441|1|
|3|15862|21592|1|
|4|12838|22739|1|
|5|12838|22149|1|
|6|14078|22548|1|
|7|14078|22423|1|
|8|12433|21977|1|
|9|14696|84360|1|
{{< /tab >}}
{{< /tabs >}}

[^1]: It is a slightly modified version of [_UCI's Online Retail Data Set_](http://archive.ics.uci.edu/ml/datasets/Online+Retail).