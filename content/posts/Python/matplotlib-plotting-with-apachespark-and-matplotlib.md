---
title: "Plotting With Apachespark and Matplotlib"
date: 2020-05-12T21:13:29+02:00
series: ['pyspark', 'matplotlib']
tags: ['sql', 'sample', 'hist', 'boxplot', 'xlabel', 'add_subplot', 'figure', 'set_xlabel']
categories: ['Python']
---

Plotting graphs are data size dependent, since plotting libraries run usually on a single machine and it expects data that fits into memory. When we have too much data, we either run into main memory problems or performance problems. 

{{< betonen gold >}}<code style="color:black;background-color:rgba(255, 0, 0, 0.2);">rule of thumb:</code> no more of 100 data points should be plot{{< /betonen >}}

**What to do if you have more data than memory?** One solution is {{< color blue >}}sampling{{< /color >}}. 

Advantages of sampling:
- subset of original data
- preserve most properties of original data (due to inherent randomness)
- reduces computational costs

## Dataset 
As dataset, we will use the [washing file, storaged under parquet format](/posts/python/parquet-data-storage-format).

```python
sqlVoltage = spark.sql("SELECT voltage from washing where voltage is not null")

### with sampling (or not)
sampleVoltage = sqlVoltage.sample(False, 0.1).collect() 
```
{{< betonen gold >}}
Note that by allocating `.collect()` to a variable is a quick-way to convert a RDD to a list.
{{< /betonen >}}

## Histogram

```python
import matplotlib.pyplot as plt

sqldf = spark.sql("SELECT voltage from washing WHERE voltage is not null and speed is not null")

dfVoltage = sqldf.rdd.map(lambda x: x.voltage).collect()

plt.hist(dfVoltage)
plt.show()
```

## box-plot
Use the `.boxplot()` method:

```python
import matplotlib.pyplot as plt

plt.style.use(['tableau-colorblind10'])

plt.boxplot(sampleVoltage)
plt.show()
```

## time-series charts (aka run charts)
Use the basic `.plot()` method, where `.xlabel`, `.ylabel`, `.set_xlabel`, `.set_ylabel` control the X-Y axis:

```python
import matplotlib.pyplot as plt

sqlVoltage = spark.sql("SELECT voltage, ts from washing WHERE voltage is not null SORT BY ts")
sampleTsVoltage = sqlVoltage.rdd.map(lambda x: (x.ts, x.voltage)) ### use tuples are lighter than list

sampleTs = sampleTsVoltage.map(lambda x: x[0]).collect()
sampleVoltage = sampleTsVoltage.map(lambda x: x[1]).collect()

plt.plot(sampleTs, sampleVoltage)
plt.xlabel('time')
plt.ylabel('voltage')
plt.show()
```

{{< betonen gold >}}
Time-series data should always be sorted by the _timestamp_, as there isn´t garantees that the dataset is already sorted.
{{< /betonen >}}

## scatter plots
Individual data points addressed by 2 or 3 dimensions. Useful for boundaries classification, clustering visualization and anomalies identification.

To plot a 3D scatter use:

```python
import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d import Axes3D

query = """
		SELECT 
		flowrate, temperature, hardness 

		FROM washing 
		WHERE flowrate is not null AND 
			  temperature is not null AND
			  hardness is not null
		"""

sqldf = spark.sql(query)

dfFlowRate = sqldf.rdd.map(lambda x: x.flowrate).collect()
dfTemperature = sqldf.rdd.map(lambda x: x.temperature).collect()
dfHardness = sqldf.rdd.map(lambda x: x.hardness).collect()

fig = plt.figure()
ax = fig.add_subplot(111, projection='3d')

ax.scatter(dfHardness, dfTemperature, dfFlowRate, c='r', marker='o')

ax.set_xlabel('Hardness')
ax.set_ylabel('Temperature')
ax.set_zlabel('Flow Rate')

ax.set_zlim([10.99,11.01])

plt.show()
```


