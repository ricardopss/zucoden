---
title: "Logistic Regression Using SparkML"
date: 2020-05-19T15:32:42+02:00
series: ['pyspark', 'mllib']
tags:
categories: ["Python"]
---

In statistics, the [logistic model](https://en.wikipedia.org/wiki/Logistic_regression) is used to model the probability of a certain class or event existing such as pass/fail, win/lose, alive/dead or healthy/sick

The model assumes a linear relationship between the predictor variables and the log-odds of the event that Y = 1. For {{< katex >}}p = P(Y=1){{< /katex >}}, its mathematical form can be described as:

{{< katex display >}}ln(\frac{p}{1-p}) = \beta_{1}+\beta_{2}+ ... + \beta_{n}{{< /katex >}}

and, therefore:

{{< katex display >}}p = \frac{1}{1 + e^{-(\beta_{1}+\beta_{2}+ ... + \beta_{n})}}{{< /katex >}}

## Application SparkML

```python

```