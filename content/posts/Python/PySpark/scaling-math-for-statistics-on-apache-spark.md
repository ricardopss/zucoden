---
title: "Scaling Math for Statistics on Apache Spark"
date: 2020-05-07T23:11:50+02:00
series: ['pyspark', 'numpy', 'math', 'scipy', 'mllib', 'sql', 'random']
tags: ['mean', 'sum', 'count', 'sortBy', 'zipWithIndex', 'lookup', 'pow', 'zip', 'agg', 'sql']
categories: ['Python']
---

Basics of mathematical foundations on exploratory data analysis, focusing on the first four statistical moments.

Finalizing with one of the most important things in data mining: the ability to see data as points in multidimensional vector spaces.

## RDD

### averages

#### mean
```python
### RDD 
rdd = sc.parallelize(range(100))

### Code formula
numSum = rdd.sum()
intN = float(rdd.count()) ### use float() to avoid loss of precision
numMean = numSum/intN

print(numMean) 		### 49.5
### Counter-proof
print(rdd.mean())	### check 49.5 
```

{{< betonen red >}}
To determine the number of observations in the array use the <code style="color:black;background-color:rgba(255, 0, 0, 0.2);">.float()</code> to avoid loss of precision:

<code style="color:black;background-color:rgba(255, 0, 0, 0.2);">intN = float(rdd.count())</code>
{{< /betonen >}}

#### median
To calculate median, we need to:
1. sort the RDD in crescent order
2. add an index (which will be used later to access the 50th/51th percentil)
3. calculate the mean value of 50th and 51th (case len(rdd) is even), or get the 50th percentil

```python
import numpy as np

### RDD 
rdd = sc.parallelize(range(100))

### CODE FORMULA
#### sort by increasing order, add index 
indexedSortedRdd = rdd.sortBy(lambda x:x).zipWithIndex().map(lambda x: (x[1], x[0])) #x[1] = key, x[0] = value
intN = indexedSortedRdd.count()

if intN % 2 == 0: ### even number
	intIdx = int(intN/2 -1)
	numMedian = (indexedSortedRdd.lookup(intIdx)[0] + indexedSortedRdd.lookup(intIdx+1)[0])/2
else: ### odd number
	intIdx = int((intN-1)/2)
	numMedian = indexedSortedRdd.lookup(intIdx)[0]

print(numMedian) ### 49.5
### Counter-proof
print(np.median(rdd.collect()))	### check 49.5 
```
{{< betonen gold >}}
Unfortunatelly, the <code style="color:black;background-color:rgba(255, 180, 0, 0.2);">.zipWithIndex()</code> returns a (value, percentil) tuples instead of the contrary 
{{< /betonen >}}


### standard deviations
Given the mean ([`numMean`](#mean)):

```python
import math

### RDD 
rdd = sc.parallelize(range(100))

numSumSqr = rdd.map(lambda x: pow(x - numMean, 2)).sum()
numStDev = math.sqrt(numSumSqr/float(rdd.count()))

print(numStDev) 	### 28.86607004772212
### Counter-proof
print(rdd.stdev())	### 28.86607004772212 
```

### skewness
Given the mean ([`numMean`](#mean)) and the standard deviation ([`numStDev`](#standard-deviations)):

```python
import math
from scipy.stats import skew

### RDD 
rdd = sc.parallelize(range(100))

### Code formula
numWeightedSumCubic = rdd.map(lambda x: pow(x - numMean, 3)).sum()
numSkew = (numWeightedSumCubic / pow(numStDev, 3)) / float(rdd.count())

print(numSkew) 	### 0.0
### Counter-proof
print(skew(rdd.collect()))	### 0.0
```

### kurtosis
Given the mean ([`numMean`](#mean)) and the standard deviation ([`numStDev`](#standard-deviations)):

```python
import math
from scipy.stats import kurtosis

### RDD 
rdd = sc.parallelize(range(100))

### Code formula
numWeightedSumQ = rdd.map(lambda x: pow(x - numMean, 4)).sum()
numKurtosis = (numWeightedSumQ / pow(numStDev, 4)) / float(rdd.count())

print(numKurtosis) 	### 1,799759976
### Counter-proof
print(kurtosis(rdd.collect(), fisher=False)) ### 1.799759976
```

### covariance
Given the mean ([`numMean`](#mean)) and the standard deviation ([`numStDev`](#standard-deviations)):

```python
### RDD 
rddX = sc.parallelize(range(100))
rddY = sc.parallelize(range(100))
rddXY = rddX.zip(rddY) ### create arrays of tuples (x, y)
numCov = rddXY.map(lambda x: x[0]*x[1] - numMeanX*numMeanY).sum()/float(rddXY.count())

print(numCov) 	### 833.25
```

### correlation
Given the mean ([`numMean`](#mean)), the standard deviation ([`numStDev`](#standard-deviations)) and the [`numCov`](#covariance): 

```python
### RDD 
rddX = sc.parallelize(range(100))
rddY = sc.parallelize(range(100))
numCorr = numCov/(numStDevX*numStDevY)

print(numCorr) 	### 1.0
```

### matriz of correlation
```python
import random

from pyspark.mllib.stat import Statistics

col1 = sc.parallelize(range(100))
col2 = sc.parallelize(range(100,200))
col3 = sc.parallelize(list(reversed(range(100))))
col4 = sc.parallelize(random.sample(range(100),100))

rddFull = col1.zip(col2).zip(col3).zip(col4)

rddFullClean = rddFull.map(lambda x: [x[0][0][0], x[0][0][1], x[0][1], x[1]])

Statistics.corr(rddFullClean)
```

{{< betonen gold >}}
the <code style="color:black;background-color:rgba(255, 180, 0, 0.2);">.zip()</code> method creates severals tuples that needed to be converted in an single array for each row, therefore the _lambda_ transformation.

{{< code gold >}}((((5, 7), 8), 1), 5){{< /code >}}
_vs._
{{< code gold >}}[5, 7, 8, 1, 5]{{< /code >}}

{{< /betonen >}}

{{< tabs "MatrixCorr" >}}
{{< tab "py" >}}
```python
import random
from pyspark.mllib.stat import Statistics

def funcMatrixCorr(*arg):
    rdd = arg[0]
    rdd = rdd.map(lambda x: [x])
        
    for i in range(1,len(arg)):
        rdd = rdd.zip(arg[i]).map(lambda x: x[0] + [x[1]])       
    return Statistics.corr(rdd)
    
a1 = sc.parallelize(random.sample(range(100),100))
a2 = sc.parallelize(random.sample(range(100),100))
a3 = sc.parallelize(random.sample(range(100),100))
a4 = sc.parallelize(random.sample(range(100),100))
a5 = sc.parallelize(random.sample(range(100),100))

funcMatrixCorr(a1, a2, a3, a4, a5) 
``` 
{{< /tab >}}
{{< tab ">>" >}}
```
array([
	   [ 1.        , -0.05855386, -0.02531053, -0.14351035, -0.16406841],
       [-0.05855386,  1.        ,  0.11587159,  0.0129853 , -0.12643264],
       [-0.02531053,  0.11587159,  1.        ,  0.01161716,  0.05443744],
       [-0.14351035,  0.0129853 ,  0.01161716,  1.        , -0.12786079],
       [-0.16406841, -0.12643264,  0.05443744, -0.12786079,  1.        ]
       ])
```
{{< /tab >}}
{{< /tabs >}}

## Dataframes
```python
from pyspark.sql import functions as f

print(df.agg(f.mean("temperature")).first()[0])
print(df.agg(f.min("temperature")).first()[0])
print(df.agg(f.max("temperature")).first()[0])
print(df.agg(f.stddev("temperature")).first()[0])
print(df.agg(f.skewness("temperature")).first()[0])
print(df.agg(f.kurtosis("temperature")).first()[0])
print(df.agg(f.covar_pop("temperature", "hardness")).first()[0])
print(df.agg(f.corr("temperature", "hardness")).first()[0])
```

## SQL
```python
def minTemperature():
    return spark.sql("SELECT min(temperature) AS mintemp FROM washing").first().mintemp

def meanTemperature():
    return spark.sql("SELECT mean(temperature) AS meantemp FROM washing").first().meantemp

def maxTemperature():
    return spark.sql("SELECT max(temperature) AS maxtemp FROM washing").first().maxtemp

def sdTemperature():
    return spark.sql("SELECT stddev(temperature) AS sdtemp FROM washing").first().sdtemp

def skewTemperature():
    return spark.sql(
              """ 
              SELECT 
              (1/count(temperature)) *
              sum(power(temperature-%s,3)/power(%s,3))
              AS sktemperature FROM washing
              """
            %(meanTemperature(),sdTemperature())
            ).first().sktemperature    

def kurtosisTemperature():
    return spark.sql(
              """ SELECT 
              (1/count(temperature)) *
              sum(power(temperature-%s,4)/power(%s,4))
              AS ktemperature FROM washing
              """
            %(meanTemperature(),sdTemperature())
            ).first().ktemperature

def correlationTemperatureHardness():
    return spark.sql("SELECT corr(temperature,hardness) AS temperaturehardness FROM washing").first().temperaturehardness    
```
