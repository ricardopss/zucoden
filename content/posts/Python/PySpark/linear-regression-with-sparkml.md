---
title: "Linear Regression with SparkML"
date: 2020-05-14T16:13:43+02:00
series: ['pyspark', 'mllib']
tags: ['sql', 'createOrReplaceTempView', 'inner join', 'VectorAssembler', 'Normalizer', 'LinearRegression', 'Pipeline', 'fit', 'transform', 'randomSplit']
categories: ["Python"]
---

For ilustrate a linear regression we will use the a [csv dataset](/posts/python/extracting-data-from-github) with 3 columns (`x`, `y` and `z`), as well the same pre-processing tasks, just like [here](setting-ml-pipelines).

{{< tabs "LinReg1" >}}
{{< tab "py" >}}
```python
df.createOrReplaceTempView('df')

query = """   
SELECT sqrt(sum(x*x) + sum(y*y) + sum(z*z)) as label,
       class 
FROM df
GROUP BY class
"""

df_energy = spark.sql(query)
df_energy.show()

df_energy.createOrReplaceTempView('df_energy')

query2 = """
SELECT 
  * 
FROM 
  df AS D1
  INNER JOIN df_energy AS D2
  ON D1.class = D2.class
"""

df_join = spark.sql(query2)
df_join.show()
``` 
{{< /tab >}}
{{< tab ">>" >}}
```
+------------------+--------------+
|             label|         class|
+------------------+--------------+
| 8959.680239829991| Use_telephone|
| 9737.511232342687| Standup_chair|
| 12542.96539897962|      Eat_meat|
|13225.945637269193|     Getup_bed|
|15003.269043778426|   Drink_glass|
|14454.885091207056|    Pour_water|
|10616.408809008817|     Comb_hair|
|11082.626493751379|  Climb_stairs|
|10261.338314274606| Sitdown_chair|
|6783.4063714331605|   Liedown_bed|
| 7173.493500380411|Descend_stairs|
| 11785.39634462923|   Brush_teeth|
| 6071.460120926432|      Eat_soup|
+------------------+--------------+

+---+---+---+--------------+--------------------+-----------------+--------------+
|  x|  y|  z|         class|              source|            label|         class|
+---+---+---+--------------+--------------------+-----------------+--------------+
| 37| 38| 47|Descend_stairs|Accelerometer-201...|7173.493500380411|Descend_stairs|
| 37| 38| 47|Descend_stairs|Accelerometer-201...|7173.493500380411|Descend_stairs|
| 57| 37| 38|Descend_stairs|Accelerometer-201...|7173.493500380411|Descend_stairs|
| 37| 41| 48|Descend_stairs|Accelerometer-201...|7173.493500380411|Descend_stairs|
| 37| 39| 44|Descend_stairs|Accelerometer-201...|7173.493500380411|Descend_stairs|
| 36| 41| 45|Descend_stairs|Accelerometer-201...|7173.493500380411|Descend_stairs|
| 35| 42| 46|Descend_stairs|Accelerometer-201...|7173.493500380411|Descend_stairs|
| 35| 40| 45|Descend_stairs|Accelerometer-201...|7173.493500380411|Descend_stairs|
| 32| 40| 45|Descend_stairs|Accelerometer-201...|7173.493500380411|Descend_stairs|
| 30| 40| 46|Descend_stairs|Accelerometer-201...|7173.493500380411|Descend_stairs|
| 28| 39| 47|Descend_stairs|Accelerometer-201...|7173.493500380411|Descend_stairs|
| 25| 43| 51|Descend_stairs|Accelerometer-201...|7173.493500380411|Descend_stairs|
| 24| 40| 49|Descend_stairs|Accelerometer-201...|7173.493500380411|Descend_stairs|
| 21| 45| 50|Descend_stairs|Accelerometer-201...|7173.493500380411|Descend_stairs|
| 21| 44| 48|Descend_stairs|Accelerometer-201...|7173.493500380411|Descend_stairs|
| 19| 39| 46|Descend_stairs|Accelerometer-201...|7173.493500380411|Descend_stairs|
| 17| 44| 48|Descend_stairs|Accelerometer-201...|7173.493500380411|Descend_stairs|
| 16| 43| 45|Descend_stairs|Accelerometer-201...|7173.493500380411|Descend_stairs|
| 15| 42| 44|Descend_stairs|Accelerometer-201...|7173.493500380411|Descend_stairs|
| 16| 40| 42|Descend_stairs|Accelerometer-201...|7173.493500380411|Descend_stairs|
+---+---+---+--------------+--------------------+-----------------+--------------+
only showing top 20 rows

```
{{< /tab >}}
{{< /tabs >}}

## Setting a Pipeline

Linear regression in Spark ML can executed within a [Pipeline](/posts/python/pyspark/setting-ml-pipelines)

Before runnning the linear regression, we need to vectorize and normalize the dimensions/features, just like [here](/posts/python/pyspark/setting-ml-pipelines#normalizing)

{{< tabs "LinReg2" >}}
{{< tab "py" >}}
```python
from pyspark.ml.feature import VectorAssembler
from pyspark.ml.feature import Normalizer
from pyspark.ml.regression import LinearRegression

from pyspark.ml import Pipeline

vectorAssembler = VectorAssembler(inputCols=['x', 'y', 'z'], outputCol="features")
normalizer = Normalizer(inputCol = 'features', outputCol='normFeatures', p=1.0)
linreg = LinearRegression(maxIter = 10, regParam=0.3, elasticNetParam=0.8)

### setting the pipeline
linregPipeline = Pipeline(stages=[vectorAssembler, normalizer, linreg])

modelDf = linregPipeline.fit(df_join)
predictionDf = modelDf.transform(df_join)

predictionDf.show()
``` 
{{< /tab >}}
{{< tab ">>" >}}
```
+---+---+---+--------------+--------------------+-----------------+--------------+----------------+--------------------+------------------+
|  x|  y|  z|         class|              source|            label|         class|        features|        normFeatures|        prediction|
+---+---+---+--------------+--------------------+-----------------+--------------+----------------+--------------------+------------------+
|  3| 38| 32|Descend_stairs|Accelerometer-201...|653.4898622013964|Descend_stairs| [3.0,38.0,32.0]|[0.04109589041095...|1064.3390556919785|
| 14| 40| 36|Descend_stairs|Accelerometer-201...|653.4898622013964|Descend_stairs|[14.0,40.0,36.0]|[0.15555555555555...|1063.5395202113223|
| 20| 46| 38|Descend_stairs|Accelerometer-201...|653.4898622013964|Descend_stairs|[20.0,46.0,38.0]|[0.19230769230769...|1030.5003445550499|
|  5| 41| 36|Descend_stairs|Accelerometer-201...|653.4898622013964|Descend_stairs| [5.0,41.0,36.0]|[0.06097560975609...|1053.4708613585606|
| 14| 36| 36|Descend_stairs|Accelerometer-201...|653.4898622013964|Descend_stairs|[14.0,36.0,36.0]|[0.16279069767441...|1089.8066851053777|
| 20| 34| 36|Descend_stairs|Accelerometer-201...|653.4898622013964|Descend_stairs|[20.0,34.0,36.0]|[0.22222222222222...| 1105.274845971904|
|  1| 38| 33|Descend_stairs|Accelerometer-201...|653.4898622013964|Descend_stairs| [1.0,38.0,33.0]|[0.01388888888888...| 1065.574359518135|
| 13| 37| 33|Descend_stairs|Accelerometer-201...|653.4898622013964|Descend_stairs|[13.0,37.0,33.0]|[0.15662650602409...| 1076.810307580646|
| 25| 33| 35|Descend_stairs|Accelerometer-201...|653.4898622013964|Descend_stairs|[25.0,33.0,35.0]|[0.26881720430107...|1111.7736225790106|
|  0| 41| 29|Descend_stairs|Accelerometer-201...|653.4898622013964|Descend_stairs| [0.0,41.0,29.0]|[0.0,0.5857142857...|1037.4309029137196|
| 10| 39| 31|Descend_stairs|Accelerometer-201...|653.4898622013964|Descend_stairs|[10.0,39.0,31.0]|[0.125,0.4875,0.3...| 1058.482442658557|
|  2| 38| 40|Descend_stairs|Accelerometer-201...|653.4898622013964|Descend_stairs| [2.0,38.0,40.0]|   [0.025,0.475,0.5]| 1080.057932349977|
|  1| 37| 38|Descend_stairs|Accelerometer-201...|653.4898622013964|Descend_stairs| [1.0,37.0,38.0]|[0.01315789473684...| 1082.208633904929|
| 18| 39| 33|Descend_stairs|Accelerometer-201...|653.4898622013964|Descend_stairs|[18.0,39.0,33.0]|[0.2,0.4333333333...| 1065.622207149867|
| 19| 37| 36|Descend_stairs|Accelerometer-201...|653.4898622013964|Descend_stairs|[19.0,37.0,36.0]|[0.20652173913043...|1085.1853758981126|
|  7| 35| 34|Descend_stairs|Accelerometer-201...|653.4898622013964|Descend_stairs| [7.0,35.0,34.0]|[0.09210526315789...| 1089.622808240831|
| 21| 33| 35|Descend_stairs|Accelerometer-201...|653.4898622013964|Descend_stairs|[21.0,33.0,35.0]|[0.23595505617977...|1110.2172369660116|
| 34| 35| 48|Descend_stairs|Accelerometer-201...|653.4898622013964|Descend_stairs|[34.0,35.0,48.0]|[0.29059829059829...|1128.3173639857591|
| 14| 49| 37|Descend_stairs|Accelerometer-201...|653.4898622013964|Descend_stairs|[14.0,49.0,37.0]|    [0.14,0.49,0.37]|1006.4518958323538|
| 12| 42| 35|Descend_stairs|Accelerometer-201...|653.4898622013964|Descend_stairs|[12.0,42.0,35.0]|[0.13483146067415...| 1047.614248325139|
+---+---+---+--------------+--------------------+-----------------+--------------+----------------+--------------------+------------------+
only showing top 20 rows

```
{{< /tab >}}
{{< /tabs >}}

{{< betonen gold >}}
For definition of parameters, see the [Documentation](https://spark.apache.org/docs/latest/ml-classification-regression.html#linear-regression) and the [Python API Documentation](https://spark.apache.org/docs/latest/api/python/pyspark.ml.html#pyspark.ml.regression.LinearRegression)
{{< /betonen >}}


## Splitting, Training, Validation

In ML, splitting the training data (i.e. data used to model) is a _requirement_, where a good practice is to split your training data into two sets. One remains called {{< code gold >}}training data{{< /code >}}, the other one is called {{< code gold >}}validation data{{< /code >}}.

Good splits avoid the ocurrence of overfitting:

- _overfitting_: when the performance in the training data set is satisfatory but in the validation set not[^1]:
- _underfitting_: when the performance in both training data set and the validation set are not satisfactory

{{< betonen gold >}}
<code style="color:black;background-color:rgba(255, 180, 0, 0.2);">Rule of thumb:</code> Good splits are divided: 70\%-80% in training data vs. 20%-30% in validation data.
{{< /betonen >}}

Given a dataset (`df`), we can split it using the `.randomSplit()` method

```python
df_split = df.randomSplit([0.7, 0.3])
df_training = df_split[0]
df_validation = df_split[1]  
```
For another example, see also [Split the data into subsets within Pyspark](/posts/python/pyspark/split-the-data-into-subsets-with-pyspark) 

## Evaluation 

{{< tabs "LinReg3" >}}
{{< tab "py" >}}
```python
### Evaluation
lr = modelDf.stages[2] ### stage [2] in the pipeline is the linreg

# Print the coefficients, intercept and some metrics
print("Coefficients: %s" % str(lr.coefficients))
print("Intercept: %s" % str(lr.intercept))
print("numIterations: %d" % lr.summary.totalIterations)
print("RMSE: %f" % lr.summary.rootMeanSquaredError)
print("r2: %f" % lr.summary.r2)

print("objectiveHistory: %s" % str(lr.summary.objectiveHistory))

# print residuals
lr.summary.residuals.show()


from pyspark.mllib.evaluation import RegressionMetrics

ObsAndPredict = predictionDf.rdd.map(lambda p: (p.prediction, p.label))

metrics = RegressionMetrics(ObsAndPredict)

print("MSE = %s" % metrics.meanSquaredError)
print("RMSE = %s" % metrics.rootMeanSquaredError)
print("R-squared = %s" % metrics.r2)
print("MAE = %s" % metrics.meanAbsoluteError)
print("Explained variance = %s" % metrics.explainedVariance)
``` 
{{< /tab >}}
{{< tab ">>" >}}
```
Coefficients: [0.5398321255364059,-8.136668316921575,2.8701050382691564]
Intercept: 1265.8376806515334
numIterations: 9
RMSE: 226.964843
r2: 0.062502

objectiveHistory: [0.5000000000000018, 0.48784973680688243, 0.4692474823944737, 0.4691522517789692, 0.46911733544374207, 0.46909267233113455, 0.46909253825887626, 0.4690925337570476, 0.469092533753237]

+-------------------+
|          residuals|
+-------------------+
|-364.74211641981094|
|-359.30460873057143|
|-343.74204863285183|
|-337.69913616901465|
| -304.2437430608426|
| -343.8082339605022|
|-332.30081491365047|
|-245.21969520449272|
|-403.15953238356826|
|-340.39768411810735|
| -302.8215773100061|
| -318.5556944969022|
| -330.9448344904646|
|-260.85940281278465|
| -348.1654647200795|
|-361.33156657741586|
| -335.3026779286314|
|-300.22778844385016|
|-392.02222640884486|
|-385.80775685583114|
+-------------------+
only showing top 20 rows

MSE = 54716.54322343232
RMSE = 233.9156754547081
R-squared = 0.03715397509617302
MAE = 185.52096287152784
Explained variance = 2081.8992033878776
```
{{< /tab >}}
{{< /tabs >}}


[^1]: i.e. the model fits too strongly to the training data, and therefore, is not generalizing good enough to unseen data.

## 