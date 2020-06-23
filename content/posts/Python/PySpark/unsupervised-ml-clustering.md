---
title: "Unsupervised ML - Clustering"
date: 2020-05-26T13:12:24+02:00
series: ['pyspark', 'mllib']
tags: ['concept', 'clustering', 'VectorAssembler', 'KMeans', 'Pipeline', 'sql', 'computeCost']
categories: ["Python"]
---

Unsupervised ML is mostly about computing distances between points in hyper-dimensional vector space[^1]. The main distane measure is the _Euclidean distance_, where:

{{< katex display >}}\textbf{d(p,q)} = \textbf{d(q,p)} = \sqrt{\sum_{i}(p_{i} - q_{i})^{2}}{{< /katex >}}

Another more outlier-robust measure[^2] of distance is the _Manhattan Distance_, where

{{< katex display >}}\textbf{d(p,q)} = \textbf{d(q,p)} = \sum_{i}|p_{i} - q_{i}|{{< /katex >}}

{{< betonen gold >}}Up to 3D, it is always possible to draw insights about clusters using the naked eye. For higher dimensional datasets, it is not so obvious, once we can not plot it.{{< /betonen >}}

## k-means

The k-means algorithm is the simplest clustering algorithm. K-means is initialized with a given fixed number of potential clusters (`k`). Then, the algorithm randomly assign for each clusters, `k` cluster centroids. For each cluster centroids, it then computes the Euclidean distance between every point and every cluster centroid and takes the minimum for each point and assigns each point to the minimum distance.  After this has happened, for average centroid, the point cloud surrounding the centroid is taken, and the mean of all those points is computed, and that gives us a new centroid.

It is an iterative algorithm and it basically stops when have converged, where by converging we mean that the actually optimizing over the function: 

{{< katex display >}} argmin_{s} =\sum_{i=1}^{k} \sum_{x \in S_{i}} ||x - \mu_{i}||^{2}{{< /katex >}}

What the k-means algorithm search is the optimal assignment of points to cluster centroids, and in addition, the optimal positions of those cluster centroids. 

{{< betonen red >}}_Limitations of k-means approach:_ 
- is that one can only define and learn spherical cluster boundaries.
- is that one has to specify the number of clusters it expects.
{{< /betonen >}}

### An example
```python
df = spark.read.load('a2.parquet')

df.createOrReplaceTempView("df")
df = spark.sql("SELECT * from df")

from pyspark.ml.feature import VectorAssembler
from pyspark.ml.clustering import KMeans
from pyspark.ml import Pipeline

vectorAssembler = VectorAssembler(inputCols=['X', 'Y', 'Z'], outputCol="features")
kmean = KMeans().setK(13).setSeed(1) # k = 13 clusters
pipeline = Pipeline(stages=[vectorAssembler, kmean])

model = pipeline.fit(df)
wssse = model.stages[1].computeCost(vectorAssembler.transform(df)) ### within set sum of squared errors

print(wssse) ## 12000970.702
```
{{< betonen gold >}}
_Within Set Sum of Squared Errors_ (`wssse`) is a measure where you compute the distance of each point to its nearest cluster centroid and you sum those up and you square it, and then you get a measure of how good your points are assigned to cluster centroids.
{{< /betonen >}}

## hierarchical clustering

_Hierarchical clustering_ overcomes the limitations of k-means algorithm, i.e. one don't have to pre-specify k-clusters[^3], and it can also learn non-spherical boundaries.

The hierarchical clustering has 2 approaches: _top-down_ and _bottom-up_.

### bottom-up
In a bottom-up approach, each point is assigned into a specific individual cluster. In the next step, we take always the closest points together and form a two-point cluster. From there, we again search the two nearest cluster and form another cluster out of those, and they contain four points. We continue with that by continuously merging until _we reach a peak cluster containing all the points_ (stop rule). 

### top-down
In a top-down approach, initially all the points are assigned to the same cluster, and then we divide. So, we divide by distance, and we form four clusters in this case, and then we further divide again, until we reach the point where each individual point forms its own cluster. 

{{< betonen gold >}}No matter which approach we use, the end of this algorithm as output is a hierarchy between point relationships. {{< /betonen >}}

## density-based clustering
Aka DBSCAN or Density-based Spatial Clustering Applications with Noise.

It works by defining a cluster as the maximal set of density connected points, where there are two parameters that are taken into account:
- `epsilon`: is the maximum radius of the neighborhood 
- `minimum points`: is the minimum number of points in the epsilon neighborhood to define a cluster.

There are three classifications of points: `core`, `border`, and `outlier`.

- A core point has at least minimum points within its epsilon neighborhood including itself.
- A border point has less than minimum points within its epsilon neighborhood but can be reached by the cluster (i.e.it's in the neighborhood of a core point)
- An outlier or noise point is a point that cannot be reached[^4] by a cluster.

Density based clustering works by picking a random point that does not belong to a cluster or is an outlier, and determines if that point is a core point. If not, label it as an outlier.

Now we'll pick another core point at random and determine if it is a core point. If it is a core point, then all of the directly reachable nodes are assigned to the cluster.

Then do neighbor jumps to all reachable points and add them to the cluster. Keep finding neighbors until you're unable to. This point would be labelled as a border.

Now keep repeating steps one and two until all points have been labelled or assigned to a cluster.


## clustering evaluation and assessment

See [Evaluation and assessment](https://en.wikipedia.org/wiki/Cluster_analysis#Evaluation_and_assessment)

[^1]: this also holds for Supervised ML but the fact that you have a target or labor makes it more easy to ignore this fact.

[^2]: therefore, it's better suited for high dimensional data.

[^3]: the hierarchical means that you can have a look at the result, and later decide how many clusters you expect.

[^4]: A point y is said to be reachable from x if there is a path p1 to pn with p1 = x and pn = y, where each pi + 1 on the path must be core points, with the possible exception of pn.