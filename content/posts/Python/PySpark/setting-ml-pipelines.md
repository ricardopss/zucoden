---
title: "Setting ML Pipelines"
date: 2020-05-15T10:02:51+02:00
series: ['pyspark', 'mllib']
tags: ['etl', 'StructType', 'StructField', 'csv', 'lit', 'withColumn', 'union', 'StringIndexer', 'fit', 'transform', 'OneHotEncoder', 'VectorAssembler', 'Normalizer', 'Pipeline', 'drop', 'select']
categories: ["Python"]
---
[ETL-pipelines](/posts/python/pyspark/pipeline-basics) are a convenient process of designing your _data processing_ in a machine learning flow. Basically, one could loosely describe pipelines as a script for preprocessing the data (or _feature engineering_ in the ML jargon)

## Extracting (**E**TL)
As extracting, we will use the proceedure described in [extracting data from Github](/posts/python/extracting-data-from-github) 

```python
!git clone https://github.com/wchill/HMP_Dataset.git 
!ls HMP_Dataset/Brush_teeth

### under Python environment
import os

folderFiles = os.listdir('HMP_Dataset')
print(folderFiles) 

### since the folders of interest have a '_' in the name, 
### we create a filtered list
filteredList = [s for s in folderFiles if '_' in s]
```

The next step is to concatenate all files `csv` inside the set of folders, within the _PySpark framework_ (i.e. using a dataframe):
1. create a scheme to be used when extracting the data files, using [`StructType()`](/posts/python/pyspark/converting-rdds-to-dataframes#apply-a-schema), since the `csv` files have no scheme  
2. to read all data files, using `pyspark.read().csv()`
3. create a column using `.withColumn()` to add the files names (`class`) and files folder (`source`)
4. to concatenate, we will use the `.union()` method

{{< tabs "ETL1" >}}
{{< tab "py" >}}
```python
from pyspark.sql.types import StructType, StructField, IntegerType

# (1)
### since the csv files have only 3 dimensions/features, we only need 3 StructField
schema = StructType([
        StructField('x', IntegerType(), True),
        StructField('y', IntegerType(), True),
        StructField('z', IntegerType(), True)])

### read the datafile
from pyspark.sql.functions import lit 

df = None

for folder in filteredList:
    datafolder = os.listdir('HMP_Dataset/' + folder)
    for datafile in datafolder:
      
      print(datafile)
      # (2) & (3)
      temp_df = spark.read.option('header', 'false').option('delimiter', ' ').csv('HMP_Dataset/' + folder + '/' + datafile, schema=schema)
      temp_df = temp_df.withColumn('class', lit(folder))
      temp_df = temp_df.withColumn('source', lit(datafile))

      # (4)
      if df is None:
      	df = temp_df
      else:
        df = df.union(temp_df)

df.show()

print(type(df))
print(df.count())
print(df.take(5))
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

<class 'pyspark.sql.dataframe.DataFrame'>

354275

[
Row(x=34, y=50, z=43, class='Pour_water', source='Accelerometer-2012-06-07-21-29-09-pour_water-f4.txt'), 
Row(x=34, y=50, z=43, class='Pour_water', source='Accelerometer-2012-06-07-21-29-09-pour_water-f4.txt'), 
Row(x=23, y=34, z=50, class='Pour_water', source='Accelerometer-2012-06-07-21-29-09-pour_water-f4.txt'), 
Row(x=36, y=50, z=43, class='Pour_water', source='Accelerometer-2012-06-07-21-29-09-pour_water-f4.txt'), 
Row(x=36, y=50, z=43, class='Pour_water', source='Accelerometer-2012-06-07-21-29-09-pour_water-f4.txt')
]
```
{{< /tab >}}
{{< /tabs >}}


## Transforming (E**T**L)
Though, any sort of data processing could be included in a pipeline, we will cover here:
- string indexing[^2]
- normalizing
- one-hot encoding

### String Indexing
String indexing is the process to create numerical variables for string categorical variables. In the ML module, it is constructed using the `.StringIndexer()` method: 

{{< tabs "ETL2" >}}
{{< tab "py" >}}
```python
from pyspark.ml.feature import StringIndexer

### 'Class' is the categorical variable, and classIndex is the numerical counterpart.
stringIndexer = StringIndexer(inputCol = 'class', outputCol ='classIndex')
indexedDf = stringIndexer.fit(df).transform(df)
indexedDf.show() 
``` 
{{< /tab >}}
{{< tab ">>" >}}
```
+---+---+---+-------------+--------------------+----------+
|  x|  y|  z|        class|              source|classIndex|
+---+---+---+-------------+--------------------+----------+
| 24| 46| 46|Standup_chair|Accelerometer-201...|       6.0|
| 24| 46| 33|Standup_chair|Accelerometer-201...|       6.0|
| 27| 45| 47|Standup_chair|Accelerometer-201...|       6.0|
| 25| 46| 46|Standup_chair|Accelerometer-201...|       6.0|
| 26| 45| 46|Standup_chair|Accelerometer-201...|       6.0|
| 26| 46| 47|Standup_chair|Accelerometer-201...|       6.0|
| 25| 47| 46|Standup_chair|Accelerometer-201...|       6.0|
| 26| 46| 47|Standup_chair|Accelerometer-201...|       6.0|
| 25| 46| 46|Standup_chair|Accelerometer-201...|       6.0|
| 24| 46| 46|Standup_chair|Accelerometer-201...|       6.0|
| 24| 46| 47|Standup_chair|Accelerometer-201...|       6.0|
| 25| 45| 47|Standup_chair|Accelerometer-201...|       6.0|
| 24| 46| 46|Standup_chair|Accelerometer-201...|       6.0|
| 24| 46| 46|Standup_chair|Accelerometer-201...|       6.0|
| 24| 46| 46|Standup_chair|Accelerometer-201...|       6.0|
| 25| 46| 45|Standup_chair|Accelerometer-201...|       6.0|
| 25| 46| 46|Standup_chair|Accelerometer-201...|       6.0|
| 26| 45| 47|Standup_chair|Accelerometer-201...|       6.0|
| 25| 44| 47|Standup_chair|Accelerometer-201...|       6.0|
| 26| 46| 46|Standup_chair|Accelerometer-201...|       6.0|
+---+---+---+-------------+--------------------+----------+
only showing top 20 rows
```
{{< /tab >}}
{{< /tabs >}}

### One hot encoding
[One hot encoding](https://en.wikipedia.org/wiki/One-hot) is a process by which categorical variables are converted into a numerical-form (\~ dummy variables) that could be provided to ML algorithms to do a better job in prediction[^1]. 

{{< tabs "ETL3" >}}
{{< tab "py" >}}
```python
from pyspark.ml.feature import OneHotEncoder

onehotEncoder = OneHotEncoder(inputCol = 'classIndex', outputCol = 'onehotCategory')
encodedDf = onehotEncoder.transform(indexedDf)
encodedDf.show() 
``` 
{{< /tab >}}
{{< tab ">>" >}}
```
+---+---+---+-------------+--------------------+----------+--------------+
|  x|  y|  z|        class|              source|classIndex|onehotCategory|
+---+---+---+-------------+--------------------+----------+--------------+
| 24| 46| 46|Standup_chair|Accelerometer-201...|       6.0|(12,[6],[1.0])|
| 24| 46| 33|Standup_chair|Accelerometer-201...|       6.0|(12,[6],[1.0])|
| 27| 45| 47|Standup_chair|Accelerometer-201...|       6.0|(12,[6],[1.0])|
| 25| 46| 46|Standup_chair|Accelerometer-201...|       6.0|(12,[6],[1.0])|
| 26| 45| 46|Standup_chair|Accelerometer-201...|       6.0|(12,[6],[1.0])|
| 26| 46| 47|Standup_chair|Accelerometer-201...|       6.0|(12,[6],[1.0])|
| 25| 47| 46|Standup_chair|Accelerometer-201...|       6.0|(12,[6],[1.0])|
| 26| 46| 47|Standup_chair|Accelerometer-201...|       6.0|(12,[6],[1.0])|
| 25| 46| 46|Standup_chair|Accelerometer-201...|       6.0|(12,[6],[1.0])|
| 24| 46| 46|Standup_chair|Accelerometer-201...|       6.0|(12,[6],[1.0])|
| 24| 46| 47|Standup_chair|Accelerometer-201...|       6.0|(12,[6],[1.0])|
| 25| 45| 47|Standup_chair|Accelerometer-201...|       6.0|(12,[6],[1.0])|
| 24| 46| 46|Standup_chair|Accelerometer-201...|       6.0|(12,[6],[1.0])|
| 24| 46| 46|Standup_chair|Accelerometer-201...|       6.0|(12,[6],[1.0])|
| 24| 46| 46|Standup_chair|Accelerometer-201...|       6.0|(12,[6],[1.0])|
| 25| 46| 45|Standup_chair|Accelerometer-201...|       6.0|(12,[6],[1.0])|
| 25| 46| 46|Standup_chair|Accelerometer-201...|       6.0|(12,[6],[1.0])|
| 26| 45| 47|Standup_chair|Accelerometer-201...|       6.0|(12,[6],[1.0])|
| 25| 44| 47|Standup_chair|Accelerometer-201...|       6.0|(12,[6],[1.0])|
| 26| 46| 46|Standup_chair|Accelerometer-201...|       6.0|(12,[6],[1.0])|
+---+---+---+-------------+--------------------+----------+--------------+
only showing top 20 rows

```
{{< /tab >}}
{{< /tabs >}}

### Normalizing
Normalizing is the process of transforming data in other that each feature/column/dimension stays the same value range.

{{< betonen red >}}Unfortunatelly, pyspark ml only works with vectors and does not recognize python´s array class. Therefore, the first task is to convert the dimensions/features/columns using the `.VectorAssembler()`.
{{< /betonen >}}

The next step is to execute the normalization using the `.Normalizer()`:

{{< tabs "ETL4" >}}
{{< tab "py" >}}
```python
from pyspark.ml.linalg import Vectors
from pyspark.ml.feature import VectorAssembler
from pyspark.ml.feature import Normalizer

vecAssembler = VectorAssembler(inputCols=['x', 'y', 'z'], outputCol="features")
featuresVec = vecAssembler.transform(encodedDf)

normalizer = Normalizer(inputCol = 'features', outputCol='normFeatures', p=1.0)
normalizedDf = normalizer.transform(featuresVec)
normalizedDf.show()
```
{{< /tab >}}
{{< tab ">>" >}}
```
+---+---+---+-------------+--------------------+----------+--------------+----------------+--------------------+
|  x|  y|  z|        class|              source|classIndex|onehotCategory|        features|        normFeatures|
+---+---+---+-------------+--------------------+----------+--------------+----------------+--------------------+
| 24| 46| 46|Standup_chair|Accelerometer-201...|       6.0|(12,[6],[1.0])|[24.0,46.0,46.0]|[0.20689655172413...|
| 24| 46| 33|Standup_chair|Accelerometer-201...|       6.0|(12,[6],[1.0])|[24.0,46.0,33.0]|[0.23300970873786...|
| 27| 45| 47|Standup_chair|Accelerometer-201...|       6.0|(12,[6],[1.0])|[27.0,45.0,47.0]|[0.22689075630252...|
| 25| 46| 46|Standup_chair|Accelerometer-201...|       6.0|(12,[6],[1.0])|[25.0,46.0,46.0]|[0.21367521367521...|
| 26| 45| 46|Standup_chair|Accelerometer-201...|       6.0|(12,[6],[1.0])|[26.0,45.0,46.0]|[0.22222222222222...|
| 26| 46| 47|Standup_chair|Accelerometer-201...|       6.0|(12,[6],[1.0])|[26.0,46.0,47.0]|[0.21848739495798...|
| 25| 47| 46|Standup_chair|Accelerometer-201...|       6.0|(12,[6],[1.0])|[25.0,47.0,46.0]|[0.21186440677966...|
| 26| 46| 47|Standup_chair|Accelerometer-201...|       6.0|(12,[6],[1.0])|[26.0,46.0,47.0]|[0.21848739495798...|
| 25| 46| 46|Standup_chair|Accelerometer-201...|       6.0|(12,[6],[1.0])|[25.0,46.0,46.0]|[0.21367521367521...|
| 24| 46| 46|Standup_chair|Accelerometer-201...|       6.0|(12,[6],[1.0])|[24.0,46.0,46.0]|[0.20689655172413...|
| 24| 46| 47|Standup_chair|Accelerometer-201...|       6.0|(12,[6],[1.0])|[24.0,46.0,47.0]|[0.20512820512820...|
| 25| 45| 47|Standup_chair|Accelerometer-201...|       6.0|(12,[6],[1.0])|[25.0,45.0,47.0]|[0.21367521367521...|
| 24| 46| 46|Standup_chair|Accelerometer-201...|       6.0|(12,[6],[1.0])|[24.0,46.0,46.0]|[0.20689655172413...|
| 24| 46| 46|Standup_chair|Accelerometer-201...|       6.0|(12,[6],[1.0])|[24.0,46.0,46.0]|[0.20689655172413...|
| 24| 46| 46|Standup_chair|Accelerometer-201...|       6.0|(12,[6],[1.0])|[24.0,46.0,46.0]|[0.20689655172413...|
| 25| 46| 45|Standup_chair|Accelerometer-201...|       6.0|(12,[6],[1.0])|[25.0,46.0,45.0]|[0.21551724137931...|
| 25| 46| 46|Standup_chair|Accelerometer-201...|       6.0|(12,[6],[1.0])|[25.0,46.0,46.0]|[0.21367521367521...|
| 26| 45| 47|Standup_chair|Accelerometer-201...|       6.0|(12,[6],[1.0])|[26.0,45.0,47.0]|[0.22033898305084...|
| 25| 44| 47|Standup_chair|Accelerometer-201...|       6.0|(12,[6],[1.0])|[25.0,44.0,47.0]|[0.21551724137931...|
| 26| 46| 46|Standup_chair|Accelerometer-201...|       6.0|(12,[6],[1.0])|[26.0,46.0,46.0]|[0.22033898305084...|
+---+---+---+-------------+--------------------+----------+--------------+----------------+--------------------+
only showing top 20 rows
```
{{< /tab >}}
{{< /tabs >}}

## Setting the E**T**L pipeline:
The transformations above - String Indexing: `stringIndexer`, One-hot Encoding: `onehotEncoder`, vectorization: `vecAssembler` and Normalizing: `normalizer` - can all be automatically executed in a pipeline setting, using the `.Pipeline()` method:

{{< tabs "ETL5" >}}
{{< tab "py" >}}
```python
from pyspark.ml import Pipeline

pipeline = Pipeline(stages = [stringIndexer, onehotEncoder, vecAssembler, normalizer])

### using the original dataframe
etlDf = pipeline.fit(df)
etlDf = etlDf.transform(df)
etlDf.show() ### shows the same DF after all transformations


### Retain only dimensions/features necessary  
mlDf = etlDf.select('normfeatures', 'classIndex', 'onehotCategory')

### Alternatively
# mlDf = etlDf.drop('x').drop('y').drop('z').drop('class').drop('source').drop('features')

mlDf.show()
``` 
{{< /tab >}}
{{< tab ">>" >}}
```
+---+---+---+-------------+--------------------+----------+--------------+----------------+--------------------+
|  x|  y|  z|        class|              source|classIndex|onehotCategory|        features|        normFeatures|
+---+---+---+-------------+--------------------+----------+--------------+----------------+--------------------+
| 24| 46| 46|Standup_chair|Accelerometer-201...|       6.0|(12,[6],[1.0])|[24.0,46.0,46.0]|[0.20689655172413...|
| 24| 46| 33|Standup_chair|Accelerometer-201...|       6.0|(12,[6],[1.0])|[24.0,46.0,33.0]|[0.23300970873786...|
| 27| 45| 47|Standup_chair|Accelerometer-201...|       6.0|(12,[6],[1.0])|[27.0,45.0,47.0]|[0.22689075630252...|
| 25| 46| 46|Standup_chair|Accelerometer-201...|       6.0|(12,[6],[1.0])|[25.0,46.0,46.0]|[0.21367521367521...|
| 26| 45| 46|Standup_chair|Accelerometer-201...|       6.0|(12,[6],[1.0])|[26.0,45.0,46.0]|[0.22222222222222...|
| 26| 46| 47|Standup_chair|Accelerometer-201...|       6.0|(12,[6],[1.0])|[26.0,46.0,47.0]|[0.21848739495798...|
| 25| 47| 46|Standup_chair|Accelerometer-201...|       6.0|(12,[6],[1.0])|[25.0,47.0,46.0]|[0.21186440677966...|
| 26| 46| 47|Standup_chair|Accelerometer-201...|       6.0|(12,[6],[1.0])|[26.0,46.0,47.0]|[0.21848739495798...|
| 25| 46| 46|Standup_chair|Accelerometer-201...|       6.0|(12,[6],[1.0])|[25.0,46.0,46.0]|[0.21367521367521...|
| 24| 46| 46|Standup_chair|Accelerometer-201...|       6.0|(12,[6],[1.0])|[24.0,46.0,46.0]|[0.20689655172413...|
| 24| 46| 47|Standup_chair|Accelerometer-201...|       6.0|(12,[6],[1.0])|[24.0,46.0,47.0]|[0.20512820512820...|
| 25| 45| 47|Standup_chair|Accelerometer-201...|       6.0|(12,[6],[1.0])|[25.0,45.0,47.0]|[0.21367521367521...|
| 24| 46| 46|Standup_chair|Accelerometer-201...|       6.0|(12,[6],[1.0])|[24.0,46.0,46.0]|[0.20689655172413...|
| 24| 46| 46|Standup_chair|Accelerometer-201...|       6.0|(12,[6],[1.0])|[24.0,46.0,46.0]|[0.20689655172413...|
| 24| 46| 46|Standup_chair|Accelerometer-201...|       6.0|(12,[6],[1.0])|[24.0,46.0,46.0]|[0.20689655172413...|
| 25| 46| 45|Standup_chair|Accelerometer-201...|       6.0|(12,[6],[1.0])|[25.0,46.0,45.0]|[0.21551724137931...|
| 25| 46| 46|Standup_chair|Accelerometer-201...|       6.0|(12,[6],[1.0])|[25.0,46.0,46.0]|[0.21367521367521...|
| 26| 45| 47|Standup_chair|Accelerometer-201...|       6.0|(12,[6],[1.0])|[26.0,45.0,47.0]|[0.22033898305084...|
| 25| 44| 47|Standup_chair|Accelerometer-201...|       6.0|(12,[6],[1.0])|[25.0,44.0,47.0]|[0.21551724137931...|
| 26| 46| 46|Standup_chair|Accelerometer-201...|       6.0|(12,[6],[1.0])|[26.0,46.0,46.0]|[0.22033898305084...|
+---+---+---+-------------+--------------------+----------+--------------+----------------+--------------------+
only showing top 20 rows

+--------------------+----------+--------------+
|        normfeatures|classIndex|onehotCategory|
+--------------------+----------+--------------+
|[0.26771653543307...|       2.0|(12,[2],[1.0])|
|[0.26771653543307...|       2.0|(12,[2],[1.0])|
|[0.21495327102803...|       2.0|(12,[2],[1.0])|
|[0.27906976744186...|       2.0|(12,[2],[1.0])|
|[0.27906976744186...|       2.0|(12,[2],[1.0])|
|[0.27131782945736...|       2.0|(12,[2],[1.0])|
|[0.28682170542635...|       2.0|(12,[2],[1.0])|
|[0.2734375,0.3906...|       2.0|(12,[2],[1.0])|
|[0.27131782945736...|       2.0|(12,[2],[1.0])|
|[0.28125,0.390625...|       2.0|(12,[2],[1.0])|
|[0.27559055118110...|       2.0|(12,[2],[1.0])|
|[0.28125,0.390625...|       2.0|(12,[2],[1.0])|
|[0.27906976744186...|       2.0|(12,[2],[1.0])|
|[0.2734375,0.3906...|       2.0|(12,[2],[1.0])|
|[0.26771653543307...|       2.0|(12,[2],[1.0])|
|[0.27131782945736...|       2.0|(12,[2],[1.0])|
|[0.26923076923076...|       2.0|(12,[2],[1.0])|
|[0.27131782945736...|       2.0|(12,[2],[1.0])|
|[0.27131782945736...|       2.0|(12,[2],[1.0])|
|[0.2734375,0.3906...|       2.0|(12,[2],[1.0])|
+--------------------+----------+--------------+
only showing top 20 rows
```
{{< /tab >}}
{{< /tabs >}}

{{< betonen gold >}}Check the [list](https://spark.apache.org/docs/latest/ml-features.html) of all features/methods available to use in a Pipeline{{< /betonen >}}

## Loading (ET**L**)
Loading relates to downstream your transformed data to fit, evaluate or score.

[^2]: aka _Integer Encoding_ or _Label Encoding_.
[^1]: it differs from [String Indexing/Encoding](https://machinelearningmastery.com/why-one-hot-encode-data-in-machine-learning/), where it assumes that the higher the categorical value, better the category, in a regression context (e.g. `Standup_chair` has a String Encoding of `6`.