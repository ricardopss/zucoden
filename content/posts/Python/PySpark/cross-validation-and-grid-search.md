---
title: "Cross Validation and Grid Search"
date: 2020-05-25T20:24:09+02:00
series: ['pyspark', 'mllib']
tags: ['concept', 'GridSearch']
categories: ["Python"]
---

## (k-fold) X-validation
We [have seen](/posts/python/pyspark/linear-regression-with-sparkml#splitting-training-validation) that in a ML context, splitting the dataset in 2 sets (_training set_ and _validation set_) is a good practice to assess and avoid overfitting.

Another approach is the {{< color blue >}}Cross(X)-Validation{{< /color >}}. In a X-Validation, we using the same dataset, we create multiple _folds_[^1] where each fold contain a _training set_ and _validation set_ but from different regions/records/parts of your data.

Once we have created k-folds, we can create k individual models based on the set of _training sets_, and combine them, e.g. in case of classification, you can do it by voting, in case of regression, you just take the average.

{{< betonen gold >}}
**In summary,** x-validation takes all the data into account to train the model and therefore we will get the maximum out of the data.
{{< /betonen >}}

## Hyper-parameter tuning using _GridSearch_

Some nomenclature:

- {{< code gold >}}parameter:{{< /code >}} the parameters of a model are those that we are learning and training
- {{< code gold >}}hyperparameter:{{< /code >}} are those specified in the model instantiation

The GridSearch approach is nothing else than nested `for loops`, but this approach helps to identify how to set the hyperparameters.

```python
for p1 in parameter_set1:
	for p2 in parameter_set2:
		for p3 in parameter_set3:
			for p4 in parameter_set4:
				for p5 in parameter_set5:
					
					model = train(data, p1, p2, p3, p4, p5)
					evaluate(model)
```
{{< betonen gold >}}
When adding pipeline or model hyper-parameters to the search grid, there is a exponential relation between number of tune-able hyper-parameters and the growth in computational complexity.
{{< /betonen >}}

Since the GridSearch approach tunes the hyperparameters to increase the performance both in _training_ and _validation set_, we could end with in a {{< color blue >}}over-fitting hyper-parameters{{< /color >}}. To avoid such ocurrence, we have to set a part a third set called _test set_, i.e. the purpose of a _test set_ in contrast of a _train_ and _validation set_ is to assess over-fitting hyper-parameters.

[^1]: a _fold_ is a set of records of the dataset. The idea of k-fold x-validation is to split the dataset into a fixed k number of folds.