---
title: "Clarification Normalizer vs MinMaxScaler"
date: 2020-05-19T09:40:29+02:00
series: ['pyspark', 'mllib']
tags: ['sql', 'Normalizer', 'MinMaxScaler']
categories: ["Python"]
---

Scaling are the process of transforming the data in other that its ranges lies in a predefined interval (e.g. 0,1). Scaling can help standardize the input data and improve the behavior of learning algorithms.

The two most discussed scaling methods are `Normalization` and `Standardization`, where [Normalization](https://spark.apache.org/docs/latest/api/python/pyspark.ml.html#pyspark.ml.feature.Normalizer) typically means rescales the values into a range of [0,1], while [Standardization](https://spark.apache.org/docs/latest/api/python/pyspark.ml.html#pyspark.ml.feature.StandardScaler) typically means rescales data to have a mean of 0 and a standard deviation of 1 (unit variance).

An alternative approach to Z-score normalization (or standardization) is the so called Min-Max scaling (`MinMaxScaler`), which typically removes the min. value and weight it by its range interval, i.e.

{{< katex display >}}x_{min} = \frac{x - x_{min}}{x_{max} - x_{min}}{{< /katex >}}

The cost of having this bounded range, in contrast to standardization, is that we end up with smaller standard deviations, which can surpress the effects of outliers.

See also: [Linear Regression with SparkML](/posts/python/pyspark/linear-regression-with-sparkml)