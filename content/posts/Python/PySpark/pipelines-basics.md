---
title: "Pipelines Basics"
date: 2020-05-14T15:17:52+02:00
series: ['pyspark', 'mllib']
tags: ['concepts', 'Pipeline', 'etl'] 
categories: ["Python"]
---

Pipelines is a very convenient process of _designing your data processing_ in machine learning flow. 

There are a some steps of which one always have to do before the actual machine learning stops (they are called {{< code gold >}}data preprocessing{{< /code >}} and or {{< code gold >}}feature engineering{{< /code >}}). 

The advantages when using _pipelines_ is that you get some sort of a {{< color blue >}}recipe{{< /color >}} or a {{< color blue >}}predefined list{{< /color >}} of steps which you have to do:

- e.g., we have a dataset which contains `strings` in a table (i.e. each string is a class, e.g.). ML algorithms cannot make use of simple text and, therefore, we have to translate from _text to number_, i.e. we give each class a class label which is a number (this is called [{{< code gold >}}string indexing{{< /code >}}](/posts/python/pyspark/setting-ml-pipelines#string-indexing))[^1].

- e.g., we have some measurements of different values which may range from minus infinity to plus infinity. So, what we do is in ML we {{< code gold >}}[normalize](/posts/python/pyspark/setting-ml-pipelines#normalizing){{< /code >}} the data and squash it to a range between zero and one or minus one to plus one, making sure that each feature/column/ dimension has the same value range that makes machine learning much more easy.

- e.g. there's a step called {{< code gold >}}[one hot encoding](/posts/python/pyspark/setting-ml-pipelines#one-hot-encoding){{< /code >}}, where we basically go from a single column which contains multiple class numbers into multiple columns which only contains binary class numbers (\~ _dummy variables_). 

The final step of pipeline is {{< color blue >}}modeling{{< /color >}}, where we basically train your machine learning algorithm. 

The pipeline, as a ML algorithm, has functions/methods which are called [`fit`](/posts/python/pyspark/setting-ml-pipelines#splitting-training-validation), [`evaluate or score`](/posts/python/pyspark/setting-ml-pipelines#evaluation), and `score`, where: 
- fit basically starts the training and 
- score gives you back the predicted value. 

**In summary:** the idea behind using pipelines is that you can keep the preprocessing and just switch out different modeling algorithms or different parameter sets of your modeling algorithm without changing anything before (which is very handy). In other words, one can fuse his complete data processing flow into one single pipeline, which one can be used further in downstream data processing.

[^1]: e.g. on class could be `round` and other class could be `square`. We could assign number 1 to class `round` and number 2 to class `square`.