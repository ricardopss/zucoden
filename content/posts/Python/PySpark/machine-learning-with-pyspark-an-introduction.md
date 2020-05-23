---
title: "Machine Learning with Pyspark - An Introduction"
date: 2020-02-23T20:12:05+01:00
series: ['pyspark', 'mllib', 'ml']
tags: ['machine learning', 'alternating least squares algorithm', 'als', 'fit', 'set', 'transform', 'map', 'filter', 'select', 'distinct', 'withColumn', 'toPandas', 'registerTempTable', 'toDF']
categories: ["Python"]
---

{{< betonen green >}}
_A computer program is said to learn from experience <code style="color:black;background-color:rgba(0, 180, 0, 0.2);">E</code> with respect to some class of tasks <code style="color:black;background-color:rgba(0, 180, 0, 0.2);">T</code> and performance measure <code style="color:black;background-color:rgba(0, 180, 0, 0.2);">P</code> if its performance at tasks in <code style="color:black;background-color:rgba(0, 180, 0, 0.2);">T</code>, as measured by <code style="color:black;background-color:rgba(0, 180, 0, 0.2);">P</code>, improves with experience <code style="color:black;background-color:rgba(0, 180, 0, 0.2);">E</code>._   
Tom M. Mitchell
{{< /betonen >}}

## Spark Machine Learning (ML) Library
The Spark machine learning library makes practical machine learning scalable and easy. 
The library consists of common machine learning algorithms and utilities, including: 
- classification, 
- regression, 
- clustering, 
- collaborative filtering[^1], 
- dimensionality reduction, 
- lower-level optimization primitives, and 
- higher-level pipeline APIs.

The library has two packages:

- `spark.mllib` contains the original API that handles data in RDDs. It's in maintenance mode, but fully supported.
- `spark.ml` contains a newer API for constructing ML pipelines. It handles data in DataFrames. It's being actively enhanced.

For this introduction, we'll learn how to create a model for purchase recommendations using the alternating least squares algorithm of the Spark machine learning library. For this we will use the [OnlineRetail](/posts/python/pyspark/prepare-and-shape-the-data-in-pyspark-an-example) data set and the data sets will be [splitted in 3 subsets accordingly](posts/python/pyspark/split-the-data-into-subsets-with-pyspark)

## Alternating Least Squares (ALS) algorithm
The alternating least squares (ALS) algorithm provides _collaborative filtering_ between customers and products to find products that the customers might like, based on their previous purchases or ratings.

The {{< code gold>}}ALS algorithm{{< /code >}} creates a matrix of all customers versus all products. Most cells in the matrix are empty, which means the customer hasn't bought that product. 

The ALS algorithm then fills in the probability of customers buying products that they haven't bought yet, based on similarities between customer purchases and similarities between products. The algorithm uses the least squares computation to minimize the estimation errors, and alternates between fixing the customer factors and solving for product factors and fixing the product factors and solving for customer factors.

## Build recommendation models
Machine learning algorithms have _standard parameters_ and _hyperparameters_: 
- Standard parameters specify data and options. 
- Hyperparameters control the performance of the algorithm.

The ALS algorithm has these hyperparameters:

- The {{< code gold>}}rank{{< /code >}} hyperparameter represents the number of features. The default value of rank is 10.
- The {{< code gold>}}maxIter{{< /code >}} hyperparameter represents the number of iterations to run the least squares computation. The default value of maxIter is 10.
- Use the {{< code gold>}}training DataFrame{{< /code >}} to train three models with the ALS algorithm with different values for the rank and maxIter hyperparameters. 

Assign the `.userCol`, `.itemCol`, and `.ratingCol` parameters to the appropriate data columns. Set the `implicitPrefs` parameter to true so that the algorithm can predict latent factors.

{{< tabs "ML 1" >}}
{{< tab "py" >}}
```python
from pyspark.ml.recommendation import ALS

als1 = ALS(rank=3, maxIter=15, userCol="custId", itemCol="stockCode", ratingCol="purch", implicitPrefs=True)
model1 = als1.fit(trainDf)

als2 = ALS(rank=15, maxIter=3, userCol="custId", itemCol="stockCode", ratingCol="purch", implicitPrefs=True)
model2 = als2.fit(trainDf)

als3 = ALS(rank=15, maxIter=15, userCol="custId", itemCol="stockCode", ratingCol="purch", implicitPrefs=True)
model3 = als3.fit(trainDf)

print ("The models are trained")
``` 
{{< /tab >}}
{{< tab ">>" >}}
```
```
{{< /tab >}}
{{< /tabs >}}

## Test The Models
Test the three models on the cross-validation data set (`cvDf`), and then on the testing data set (`testDf`).

The model is accurate when the prediction values for products that the customers have already bought are close to 1.


### Clean the cross validation data set
Remove any of the customers or products in `cvDf` that are not in `testDf`:

{{< tabs "Test The Models" >}}
{{< tab "py" >}}
```python
from pyspark.sql.functions import UserDefinedFunction
from pyspark.sql.types import BooleanType

customers = set(trainDf.rdd.map(lambda line: line.custId).collect())
stock = set(trainDf.rdd.map(lambda line: line.stockCode).collect())

print(cvDf.count())

cvDf = cvDf.rdd.filter(lambda line: line.stockCode in stock and\
                                    line.custId in customers).toDF()
print(cvDf.count())
``` 
{{< /tab >}}
{{< tab ">>" >}}
```
25876
25846
```
{{< /tab >}}
{{< /tabs >}}

### Run the models on the cross-validation data set
Run the model with the cross-validation DataFrame by using the `.transform()` function and print the first two rows of each set of predictions:

{{< tabs "Models on the Cross-Validation" >}}
{{< tab "py" >}}
```python
predictions1 = model1.transform(cvDf)
predictions2 = model2.transform(cvDf)
predictions3 = model3.transform(cvDf)

print (predictions1.take(2))
print (predictions2.take(2))
print (predictions3.take(2))
``` 
{{< /tab >}}
{{< tab ">>" >}}
```
[Row(custId=14606, stockCode=20735, purch=1, prediction=0.022955073043704033), Row(custId=16464, stockCode=20735, purch=1, prediction=0.009864546358585358)]
[Row(custId=14606, stockCode=20735, purch=1, prediction=0.03385702893137932), Row(custId=16464, stockCode=20735, purch=1, prediction=0.0012353317579254508)]
[Row(custId=14606, stockCode=20735, purch=1, prediction=0.105044886469841), Row(custId=16464, stockCode=20735, purch=1, prediction=0.00531972199678421)]
```
{{< /tab >}}
{{< /tabs >}}

### Calculate the accuracy for each model
You'll use the mean squared error calculation to determine accuracy by comparing the prediction values for products to the actual purchase values. Remember that if a customer purchased a product, the value in the purch column is 1. The mean squared error calculation measures the average of the squares of the errors between what is estimated and the existing data. The lower the mean squared error value, the more accurate the model.

For all predictions, subtract the prediction from the actual purchase value (1), square the result, and calculate the mean of all of the squared differences:

{{< tabs "Calculate the accuracy for each model" >}}
{{< tab "py" >}}
```python
meanSquaredError1 = predictions1.rdd.map(lambda line: (line.purch - line.prediction)**2).mean()
meanSquaredError2 = predictions2.rdd.map(lambda line: (line.purch - line.prediction)**2).mean()
meanSquaredError3 = predictions3.rdd.map(lambda line: (line.purch - line.prediction)**2).mean()
    
print ('Mean squared error = %.4f for our first model' % meanSquaredError1)
print ('Mean squared error = %.4f for our second model' % meanSquaredError2)
print ('Mean squared error = %.4f for our third model' % meanSquaredError3) 
``` 
{{< /tab >}}
{{< tab ">>" >}}
```
Mean squared error = 0.7391 for our first model
Mean squared error = 0.7013 for our second model
Mean squared error = 0.6680 for our third model
```
{{< /tab >}}
{{< /tabs >}}

{{< betonen gold >}}
The third model (model3) has the lowest MSE value, so it's the most accurate.

Notice that of the three models, model3 has the highest values for the hyperparameters. At this point you might be tempted to run the model with even higher values for rank and maxIter. However, you might not get better results. Increasing the values of the hyperparameters increases the time for the model to run. Also, you don't want to overfit the model so that it exactly fits the original data. In that case, you wouldn't get any recommendations! For best results, keep the values of the hyperparameters close to the defaults.
{{< /betonen >}}

### Confirm the best model
Now run model3 on the testing data set to confirm that it's the best model. You want to make sure that the model is not over-matched to the cross-validation data. It's possible for a model to match one subset of the data well but not another. If the values of the mean squared error for the testing data set and the cross-validation data set are close, then you've confirmed that the model works for all the data.

Clean the testing data set, run model3 on the testing data set, and calculate the mean squared error:

{{< tabs "Confirm the Best Model" >}}
{{< tab "py" >}}
```python
filteredTestDf = testDf.rdd.filter(lambda line: line.stockCode in stock and\
                                              line.custId in customers).toDF()
predictions4 = model3.transform(filteredTestDf)
meanSquaredError4 = predictions4.rdd.map(lambda line: (line.purch - line.prediction)**2).mean()
    
print ('Mean squared error = %.4f for our best model' % meanSquaredError4)
``` 
{{< /tab >}}
{{< tab ">>" >}}
```
Mean squared error = 0.6694 for our best model
```
{{< /tab >}}
{{< /tabs >}}

## Implement the model
Use the best model to predict which products a specific customer might be interested in purchasing.

### Create a DataFrame for the customer and all products
Create a DataFrame in which each row has the customer ID (15544) and a product ID:

{{< tabs "CLientDataFrame" >}}
{{< tab "py" >}}
```python
from pyspark.sql.functions import lit

stock15544 = set(trainDf.filter(trainDf['custId'] == 15544).rdd.map(lambda line: line.stockCode).collect())

userItems = trainDf.select("stockCode").distinct().\
            withColumn('custId', lit(15544)).\
            rdd.filter(lambda line: line.stockCode not in stock15544).toDF()

for row in userItems.take(5):
    print (row.stockCode, row.custId)

``` 
{{< /tab >}}
{{< tab ">>" >}}
```
21899 15544
22429 15544
22201 15544
22165 15544
21209 15544
```
{{< /tab >}}
{{< /tabs >}}

### Rate each product and Find the top recommendations
Run the transform function to create a prediction value for each product:

{{< tabs "Rate Each Product" >}}
{{< tab "py" >}}
```python
userItems = model3.transform(userItems)

for row in userItems.take(5):
	print (row.stockCode, row.custId, row.prediction)

userItems.registerTempTable("predictions")
query = "select * from predictions order by prediction desc limit 5"

sqlContext.sql(query).toPandas()
``` 
{{< /tab >}}
{{< tab ">>" >}}
```
20735 15544 0.0012392014032229781
21220 15544 0.05721517279744148
21700 15544 0.06490270793437958
22097 15544 0.004561366513371468
22223 15544 0.01928507536649704
```

|index|stockCode|custId|prediction|
|:-|:-|:-|:-|
|0|21242|15544|0.508990|
|1|22326|15544|0.506971|
|2|21559|15544|0.496477|
|3|22090|15544|0.493870|
|4|22554|15544|0.489654|

{{< /tab >}}
{{< /tabs >}}

### Compare purchased and recommended products

{{< tabs "Compare Purchassed vs Recommended" >}}
{{< tab "py" >}}
```python
tockItems = sqlContext.sql("select distinct stockCode, description from retailPurchases")
stockItems.registerTempTable("stockItems")

query = """
SELECT 
    predictions.*,
    stockItems.description
FROM
    predictions
INNER JOIN stockItems ON
    predictions.stockCode = stockItems.stockCode
ORDER BY predictions.prediction DESC
LIMIT 10
"""
sqlContext.sql(query).toPandas()

``` 
{{< /tab >}}
{{< tab ">>" >}}

|index|stockCode|custId|prediction|description|
|:-|:-|:-|:-|:-|
|0|21242|15544|0.508990|RED RETROSPOT PLATE|
|1|22326|15544|0.506971|ROUND SNACK BOXES SET OF4 WOODLAND|
|2|21559|15544|0.496477|STRAWBERRY LUNCH BOX WITH CUTLERY|
|3|22090|15544|0.493870|PAPER BUNTING RETROSPOT|
|4|22554|15544|0.489654|PLASTERS IN TIN WOODLAND ANIMALS|
|5|21987|15544|0.467810|PACK OF 6 SKULL PAPER CUPS|
|6|22367|15544|0.464652|CHILDRENS APRON SPACEBOY DESIGN|
|7|21122|15544|0.462207|SET/10 PINK POLKADOT PARTY CANDLES|
|8|22328|15544|0.452040|ROUND SNACK BOXES SET OF 4 FRUITS|
|9|21156|15544|0.450038|RETROSPOT CHILDRENS APRON|

{{< /tab >}}
{{< /tabs >}}

The recommended products look pretty similar to the purchased products, and, in some cases, are actually the same. The model works!

[^1]: [From Apache Spark Docs](https://spark.apache.org/docs/latest/ml-collaborative-filtering.html): _collaborative filtering is commonly used for recommender systems. These techniques aim to fill in the missing entries of a user-item association matrix. spark.ml currently supports model-based collaborative filtering, in which users and products are described by a small set of latent factors that can be used to predict missing entries. spark.ml uses the alternating least squares (ALS) algorithm to learn these latent factors._
