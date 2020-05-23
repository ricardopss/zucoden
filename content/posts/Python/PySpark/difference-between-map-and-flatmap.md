---
title: "Difference between `.map()` and `.flatMap()`"
date: 2020-04-11T18:25:00+02:00
series: ['pyspark']
tags: ['RDD', 'map', 'flatMap', 'count']
categories: ["Python"]
---

Suppose the RDD `raw_rdd`, where:

```
raw_rdd = ['Carlo,5,3,3,4', 'Mokhtar,2,5,5,3', 'Jacques,4,2,4,5']
raw_rdd.count() = 3
```
When one uses the `.map()` he maintains the _line structure_ as:

```
dbRDD1 = raw_rdd.map(lambda line:line.split(","))

[['Carlo', '5', '3', '3', '4'], ['Mokhtar', '2', '5', '5', '3'],['Jacques', '4', '2', '4', '5']]

dbRDD1.count() = 3
```

With `.flatMap()`, on the other hand, the reference (i.e. _instructors name_) is lost:

```
dbRDD2 = raw_rdd.flatMap(lambda line:line.split(","))

['Carlo', '5', '3', '3', '4', 'Mokhtar', '2', '5', '5', '3', 'Jacques', '4', '2', '4', '5']

dbRDD2.count() = 15
```