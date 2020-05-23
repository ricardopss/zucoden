---
title: "Support Vector Machines Using SparkML"
date: 2020-05-19T19:44:19+02:00
series: ['pyspark', 'mllib']
tags: ['sql', 'Pipeline', 'LinearSVC', 'createOrReplaceTempView', 'randomSplit', 'BinaryClassificationEvaluator', 'transform', 'fit', 'evaluate']
categories: ["Python"]
---

Support Vector Machines (SVM) have been the most used ML model for long[^1]. SVMs is a binary linear classifier, though it can be used for multi-classification as well, which means, that it will always get the ideas, separation, hyperplane between point clouds. 

In other words, SVM will always finds the best hyperplane of separation (linear separation) because of the context nature of its optimization objective.

Though SVM results in a linear separation, it can be used also for non-linear modelling, by means of data transformation (aka _corners trick_). I.e. one can transform the training data into another space (called _feature-space_), in which SVM will produce a linear separation.

Multi-classification can be achieved by SVM executing the so called one-versus-all classifier, where we just take one class versus the others and times and then we output the one with the best call.

## Application in SparkML

As Dataset we will use the same `csv` used to illustrate a [pipeline](/posts/python/pyspark/setting-ml-pipelines), as well we will execute the same pre-processing tasks

{{< tabs "SVM1" >}}
{{< tab "py" >}}
```python
df.show()

### importing the pre-processing classes for the Pipeline
from pyspark.ml.feature import StringIndexer
from pyspark.ml.feature import OneHotEncoder
from pyspark.ml.linalg import Vectors
from pyspark.ml.feature import VectorAssembler
from pyspark.ml.feature import Normalizer
from pyspark.ml import Pipeline

stringIndexer = StringIndexer(inputCol = 'class', outputCol ='label')
onehotEncoder = OneHotEncoder(inputCol = 'label', outputCol = 'labelVec')
vecAssembler = VectorAssembler(inputCols=['x', 'y', 'z'], outputCol="features")
normalizer = Normalizer(inputCol = 'features', outputCol='normFeatures', p=1.0)
```
{{< /tab >}}
{{< tab ">>" >}}
```
+---+---+---+----------+--------------------+
|  x|  y|  z|     class|              source|
+---+---+---+----------+--------------------+
| 34| 50| 43|Pour_water|Accelerometer-201...|
| 34| 50| 43|Pour_water|Accelerometer-201...|
| 23| 34| 50|Pour_water|Accelerometer-201...|
| 36| 50| 43|Pour_water|Accelerometer-201...|
| 36| 50| 43|Pour_water|Accelerometer-201...|
| 35| 51| 43|Pour_water|Accelerometer-201...|
| 37| 49| 43|Pour_water|Accelerometer-201...|
| 35| 50| 43|Pour_water|Accelerometer-201...|
| 35| 51| 43|Pour_water|Accelerometer-201...|
| 36| 50| 42|Pour_water|Accelerometer-201...|
| 35| 49| 43|Pour_water|Accelerometer-201...|
| 36| 50| 42|Pour_water|Accelerometer-201...|
| 36| 50| 43|Pour_water|Accelerometer-201...|
| 35| 50| 43|Pour_water|Accelerometer-201...|
| 34| 50| 43|Pour_water|Accelerometer-201...|
| 35| 51| 43|Pour_water|Accelerometer-201...|
| 35| 51| 44|Pour_water|Accelerometer-201...|
| 35| 50| 44|Pour_water|Accelerometer-201...|
| 35| 51| 43|Pour_water|Accelerometer-201...|
| 35| 50| 43|Pour_water|Accelerometer-201...|
+---+---+---+----------+--------------------+
only showing top 20 rows
```
{{< /tab >}}
{{< /tabs >}}

After setting the tasks in the Pipeline, we will set the Support Vector Classifier (SVC). To test the performance of model, we execute the evaluation:

```python
from pyspark.ml.classification import LinearSVC

lsvc = LinearSVC(maxIter=10, regParam=0.1) 

df.createOrReplaceTempView('df') 

## read note below
df_TwoClasses = spark.sql("SELECT * FROM df WHERE class IN ('Use_telephone', 'Standup_chair')")

splitDf = df_TwoClasses.randomSplit([0.8, 0.2]) # 80-20%
trainDf = splitDf[0]
testDf = splitDf[1] 

pipeline = Pipeline(stages=[stringIndexer, onehotEncoder, vecAssembler, normalizer, lsvc])

model = pipeline.fit(trainDf)
predictions = model.transform(trainDf)

### Evaluation
from pyspark.ml.evaluation import BinaryClassificationEvaluator

evaluator = BinaryClassificationEvaluator(rawPredictionCol='rawPrediction')
evaluator.evaluate(predictions) 	### 0.9382943236363954

### Check with Validation Test
predictionsTest = model.transform(testDf)
evaluator.evaluate(predictionsTest) ### 0.9408602257748678
```
{{< betonen gold >}}
At the moment, the linear vector machine classifier only supports binary classification, so we need to create a new dataset containing only 2 classes (e.g. `Use_telephone` and `Standup_chair`).
{{< /betonen >}}

Both training data set and validation data set performed well, excluding the hypothesis of (under-)overfitting.

[^1]: today, there are other used approaches as e.g. the _gradient boosting_.