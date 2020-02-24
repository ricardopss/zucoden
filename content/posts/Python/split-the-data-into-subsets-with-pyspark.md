---
title: "Split the Data Into Subsets With Pyspark"
date: 2020-02-23T23:26:34+01:00
series: ['PySpark']
tags: ['querying data', 'SQL', 'big data', 'url']
categories: ["Python"]
---

For data set we well use the [OnlineRetail.csv](/posts/python/prepare-and-shape-the-data-in-pyspark-an-example):

To split the data randomly into subsets, use the `.randomSplit()` method of PySpark.

E.g. to split the OnlineRetail data into three sets:

1. a testing data set (10% of the data): {{< code gold>}}testDf{{< /code >}}
2. a cross-validation data set (10% of the data): {{< code gold>}}cvDf{{< /code >}}
3. a training data set (80% of the data): {{< code gold>}}trainDf{{< /code >}}

{{< tabs "Split Data Set Randomly" >}}
{{< tab "python" >}}
```python
testDf, cvDf, trainDf = retailDf.randomSplit([.1,.1,.8], 1) ### retailDf is a PySpark DataFrame

print("trainDf count: ", trainDf.count(), " example: ")
for row in trainDf.take(2): 
	print(row)
	print()

print("cvDf count: ", cvDf.count(), " example: ")
for row in cvDf.take(2): 
	print(row)
	print()

print("testDf count: ", testDf.count(), " example: ")
for row in testDf.take(2): 
	print(row)
	print() 
``` 
{{< /tab >}}
{{< tab ">>" >}}
```
trainDf count:  208123  example: 
Row(custId=12359, stockCode=23345, purch=1)
Row(custId=12363, stockCode=20685, purch=1)

cvDf count:  25876  example: 
Row(custId=12349, stockCode=23545, purch=1)
Row(custId=12388, stockCode=22960, purch=1)

testDf count:  26113  example: 
Row(custId=12362, stockCode=22372, purch=1)
Row(custId=12391, stockCode=20985, purch=1)
```
{{< /tab >}}
{{< /tabs >}}




