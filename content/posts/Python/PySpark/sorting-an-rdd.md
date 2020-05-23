---
title: "Sorting an Rdd"
date: 2020-05-12T01:08:37+02:00
series: ['pyspark']
tags: ['sortBy']
categories: ['Python']
---

To sort a RDD use the `.sortBy()` method 

```python
### RDD 
rdd = sc.parallelize([12, 45, 79, 1, 3, 55, 97, 156, 53, 21, 64, 78, 11, 24, 0])

#### sort by increasing order, add index 
sortedRdd = rdd.sortBy(lambda x:x)

print(sortedRdd) # [0, 1, 3, 11, 12, 21, 24, 45, 53, 55, 64, 78, 79, 97, 156]
```

Se an application in [Median](/posts/python/pyspark/scaling-math-for-statistics-on-apache-spark#median)