---
title: "Dimensionality Reduction"
date: 2020-05-13T17:17:12+02:00
series: ['pyspark', 'mllib']
tags: ['PCA']
categories: ['Python']
---

## PCA on ApacheSpark
As dataset, we will use the [washing file, storaged under parquet format](/posts/python/parquet-data-storage-format).

```python
df = spark.read.parquet('washing.parquet')
df.createOrReplaceTempView('washing')

query = """
		SELECT * from (
		    SELECT
		    min(temperature) over w as min_temperature,
		    max(temperature) over w as max_temperature, 
		    min(voltage) over w as min_voltage,
		    max(voltage) over w as max_voltage,
		    min(flowrate) over w as min_flowrate,
		    max(flowrate) over w as max_flowrate,
		    min(frequency) over w as min_frequency,
		    max(frequency) over w as max_frequency,
		    min(hardness) over w as min_hardness,
		    max(hardness) over w as max_hardness,
		    min(speed) over w as min_speed,
		    max(speed) over w as max_speed
		    FROM washing 
		    WINDOW w AS (ORDER BY ts ROWS BETWEEN CURRENT ROW AND 10 FOLLOWING) 
		)
		WHERE min_temperature is not null 
		AND max_temperature is not null
		AND min_voltage is not null
		AND max_voltage is not null
		AND min_flowrate is not null
		AND max_flowrate is not null
		AND min_frequency is not null
		AND max_frequency is not null
		AND min_hardness is not null
		AND min_speed is not null
		AND max_speed is not null
		"""

result = spark.sql(query)

result.count ### 2051
```
{{< betonen gold >}}
Since the table is mixing schemas from different sensor data sources we are creating new features (in other words, we use existing columns to calculate new ones). We only use _min_ and _max_ for now, but using more advanced aggregations may improve the results. 

We are calculating those aggregations over a sliding window <code style="color:black;background-color:rgba(255, 180, 0, 0.2);">w</code>. This window is defined in the SQL statement and basically reads the table by a one-by-one stride in direction of increasing _timestamp_. Whenever a row leaves the window a new one is included. Therefore this window is called sliding window (in contrast to tubling, time or count windows). More on this can be [found here](https://flink.apache.org/news/2015/12/04/Introducing-windows.html).
{{< /betonen >}}

Now we import some classes from `SparkML`: `PCA` for the actual algorithm, `Vectors` for the data structure expected by `PCA` and `VectorAssembler` to transform data into these vector structures.

{{< tabs "PCA" >}}
{{< tab "py" >}}
```python
from pyspark.ml.feature import PCA
from pyspark.ml.linalg import Vectors
from pyspark.ml.feature import VectorAssembler

### Define a vector transformation helper class which takes all our input features (result.columns) and
### created one additional column called "features" which contains all our input features as one single column wrapped in "DenseVector" objects
assembler = VectorAssembler(inputCols=result.columns, outputCol="features")

### Use the assembler to transform the input data. 
### The result is a dataframe containing the original columns, but also an additional column called features.
features = assembler.transform(result)

print(features.rdd.map(lambda r : r.features).take(10))
``` 
{{< /tab >}}
{{< tab ">>" >}}
```
// we obtain a list of so called DenseVector objects (a subtype of vector).
//As you can see here, the original values from different columns are represented as elements of this vector

[
DenseVector([81.0, 100.0, 221.0, 223.0, 11.0, 11.0, 68.0, 76.0, 71.0, 78.0, 1033.0, 1033.0]), 
DenseVector([81.0, 100.0, 221.0, 223.0, 11.0, 11.0, 68.0, 76.0, 72.0, 78.0, 1033.0, 1033.0]), 
DenseVector([81.0, 100.0, 221.0, 223.0, 11.0, 11.0, 68.0, 76.0, 72.0, 80.0, 1033.0, 1033.0]), 
DenseVector([81.0, 100.0, 222.0, 223.0, 11.0, 11.0, 68.0, 74.0, 72.0, 80.0, 1033.0, 1046.0]), 
DenseVector([81.0, 100.0, 222.0, 223.0, 11.0, 11.0, 68.0, 74.0, 73.0, 80.0, 1033.0, 1046.0]), 
DenseVector([80.0, 94.0, 222.0, 223.0, 11.0, 11.0, 68.0, 74.0, 73.0, 80.0, 1033.0, 1046.0]), 
DenseVector([80.0, 94.0, 222.0, 236.0, 11.0, 11.0, 68.0, 74.0, 73.0, 80.0, 1046.0, 1046.0]), 
DenseVector([80.0, 94.0, 222.0, 236.0, 11.0, 11.0, 68.0, 74.0, 73.0, 80.0, 1046.0, 1046.0]), 
DenseVector([80.0, 94.0, 222.0, 236.0, 11.0, 11.0, 71.0, 74.0, 73.0, 80.0, 1046.0, 1046.0]), 
DenseVector([80.0, 94.0, 222.0, 236.0, 11.0, 11.0, 71.0, 74.0, 73.0, 80.0, 1046.0, 1046.0])
]
```
{{< /tab >}}
{{< /tabs >}}

{{< betonen red >}}
Unfortunately, Spark machine learning is picky on what data type it accepts, so plain Python arrays will not work. Therefore, we have to convert each Python array to a Spark machine learning vector object, using a vector class called <code style="color:black;background-color:rgba(255, 0, 0, 0.2);">VectorAssembler</code>. 

We configure <code style="color:black;background-color:rgba(255, 0, 0, 0.2);">VectorAssembler</code> to take all 12 input columns and create a single _feature_ column containing vector objects with the values from the alternate columns.

There exist also another subtype called SparkVector especially made for vectors containing a huge fraction of zero values to save space.
{{< /betonen >}}

Since the source data set has been prepared as a list of DenseVectors we can now apply PCA (so let's reduce the dimensions of this vector from 12 to 3, so that we can plot them)

{{< tabs "PCA2" >}}
{{< tab "python" >}}
```python
pca = PCA(k=3, inputCol="features", outputCol="pcaFeatures")

model = pca.fit(features)

result_pca = model.transform(features).select("pcaFeatures")
result_pca.show(truncate=False)

### double-check if you still have the correct number of rows
result_pca.count() ### 2051 (same number as results) 
``` 
{{< /tab >}}
{{< tab ">>" >}}
```
+-----------------------------------------------------------+
|pcaFeatures                                                |
+-----------------------------------------------------------+
|[1459.9789705814187,-18.745237781780922,70.78430794796873] |
|[1459.995481828676,-19.11343146165273,70.72738871425986]   |
|[1460.0895843561282,-20.969471062922928,70.75630600322052] |
|[1469.6993929419532,-20.403124647615513,62.013569674880955]|
|[1469.7159041892107,-20.771318327487293,61.95665044117209] |
|[1469.7128317338704,-20.790751117222456,61.896106678330966]|
|[1478.3530264572928,-20.294557029728722,71.67550104809607] |
|[1478.3530264572928,-20.294557029728722,71.67550104809607] |
|[1478.3686036138165,-20.260626897636314,71.63355353606426] |
|[1478.3686036138165,-20.260626897636314,71.63355353606426] |
|[1483.5412027684088,-20.006222577501354,66.82710394284209] |
|[1483.5171090223353,-20.867020421583753,66.86707301954084] |
|[1483.4224268542928,-19.87574823665505,66.93027077913985]  |
|[1483.4224268542928,-19.87574823665505,66.93027077913985]  |
|[1488.103073547271,-19.311848573386925,72.1626182636411]   |
|[1488.1076926849646,-19.311945711095063,72.27621605605316] |
|[1488.0135901575127,-17.455906109824838,72.2472987670925]  |
|[1488.026374556614,-17.47632766649086,72.2214703423]       |
|[1465.1644738447062,-17.50333829280811,47.06072898272612]  |
|[1465.1644738447062,-17.50333829280811,47.06072898272612]  |
+-----------------------------------------------------------+
only showing top 20 rows

2051
```
{{< /tab >}}
{{< /tabs >}}

Now we have only 3 values per data aggregation instead of 12.

So let's plot the data, using a 3D scatter plot, and for that we need to extract the individual tree features as Python arrays.

```python
### when the dataset is large, we can sample for a small fraction
rdd = result_pca.rdd.sample(False,0.8)

x = rdd.map(lambda a : a.pcaFeatures).map(lambda a : a[0]).collect()
y = rdd.map(lambda a : a.pcaFeatures).map(lambda a : a[1]).collect()
z = rdd.map(lambda a : a.pcaFeatures).map(lambda a : a[2]).collect()

%matplotlib inline
import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d import Axes3D

fig = plt.figure()
ax = fig.add_subplot(111, projection='3d')

ax.scatter(x,y,z, c='r', marker='o')

ax.set_xlabel('dimension1')
ax.set_ylabel('dimension2')
ax.set_zlabel('dimension3')

plt.show()
```
{{< betonen gold >}}
Note since the newly created dimensions have nothing to do with the original ones, we simply call them dimension one, two, three
{{< /betonen >}}

We have plotted a 12-D dataset into a 3-D scatter plot.


## Principal Component Analysis (PCA) - Conceptual Framework
When working with multi-dimensional data, it becomes sometimes hard to choose the correct dimensions for plotting, so bellow we will learn how an algorithm can do this.

More than just getting rid of columns in a dataset, _dimensionality reduction_ it's about transforming everything to a new dataset but preserving some key properties. 

The idea behind the PCA is that you take an n-dimensional data set, where every row can be seen as a point in an n-dimensional euclidian vector space and each column is one coordinate in that space.

So PCA transforms your dataset by specifying the number of desired dimensions in a way that the new dataset represents the very same points with vectors of lower dimensions k, this process is also called {{< code gold>}}projection{{< /code >}}. 

One of the key properties which are preserved by PCA is the ratio of distances between the points. 

In mathematical notation this means that if you take the distance of two random points, (A) and (B) in the original dataset, and divide it by the distance of two other random points, (C) and (D), you get the same value as if you take the distance of two random points, (A\*) and (B\*) in the reduced dataset, and divide it by a distance of two other random points, (C\*) and (D\*). 

In other words: if two points in the original dataset have been far away (close) they are also far away (close) in the reduced dataset.

After this projection, the new `k` dimensions returned are explaining the majority of the datasets' variation. This is the key goal of PCA. In other words, the so-called _principal components_ are chosen as such that the information contents of each additional dimension is decreasing. This is a way of getting rid of highly correlated dimensions in the source dataset because their information content is _low_. 

## Loss of Information
Why it is possible to express the same amount of information in a k-dimensional vector space as in an n-dimensional vector space (`k<n`)? The obvious answer is that when applying {{< color >}}PCA we are losing information{{< /color >}}.

PCA is very intelligent in deciding what parts of the information is less relevant so that the pain of removing information is minimized[^1]. 

**The lower you choose k, the higher the loss is.**  Loss can be easily estimated by comparing the original dataset D with D prime where PCA was applied.

This way you get an idea of the percentage of information you are removing from your dataset. 

[^1]: one famous example is JPEG/MP3 compression, where images/audios files can be compressed using a very similar technique by removing all irrelevant information, and therefore achieving a very high compression rate.