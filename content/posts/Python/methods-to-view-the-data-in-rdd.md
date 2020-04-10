---
title: "Methods to View the Data in RDD"
date: 2020-02-23T21:12:54+01:00
series: ['pyspark']
tags: ['RDD', 'collect', 'first', 'take', 'top']
categories: ["Python"]
---

The main methods to give an overview of the data are `.first()`, `.take(int)`, `.top(int)` and `.collect()`:

{{< tabs "View the data" >}}
{{< tab "py" >}}  
```python
print(x_nbr_rdd.first())  #View the first element in the RDD
print(x_nbr_rdd.take(5)) # view the first five elements in the RDD
print(x_nbr_rdd.top(2)) # view the top 2 elements in the RDD
print(x_nbr_rdd.collect()) # view the top 2 elements in the RDD
```
{{< /tab >}}
{{< tab ">>" >}} 
1

[1, 2, 3, 4, 5]

[10, 9]

[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
{{< /tab >}}
{{< /tabs >}}

{{< betonen gold >}}
Since `first()`, `take()`, `top()` methods returned a value, they are **actions**.
{{< /betonen >}}

{{< betonen red >}}
Be careful with the `collect` method if the data set is to large, since it returns all elements of the RDD to the driver.
{{< /betonen >}}
