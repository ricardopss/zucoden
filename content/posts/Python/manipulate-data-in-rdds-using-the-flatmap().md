---
title: "Manipulate Data in Rdds Using the `.flatMap()`"
date: 2020-02-23T21:13:08+01:00
series: ['pyspark']
tags: ['RDD', 'flatMap', 'parallelize', 'collect']
categories: ["Python"]
---

Remember that to manipulate data, you use {{< code gold >}}transformation functions{{< /code >}}, such as the `.flatMap(func)`.

The `.flatMap()` returns a new `RDD` by first running the specified function on all elements, returning 0 or more results for each original element, and then flattening the results into individual elements.

```python
Words = ["Hallo Welt. Das ist meine erste Arbeit mit Apache Spark. So far, really excited"]

words_rd = sc.parallelize(Words)
words_rd.first()

###  "Hallo Welt. Das ist meine erste Arbeit mit Apache Spark. So far, really excited"
```

The `.flatMap()` method has advantages over `map()` when it comes to work with strings, e.g. Suppose that we want to split the strings into words:

{{< tabs "FlatMap1" >}}
{{< tab "map()" >}}
```python
words_rd2 = words_rd.map(lambda word: word.split(" "))
words_rd2.first()
words_rd2.count() 
``` 
{{< /tab >}}
{{< tab ">>" >}}
```
['Hallo',
 'Welt.',
 'Das',
 'ist',
 'meine',
 'erste',
 'Arbeit',
 'mit',
 'Apache',
 'Spark.',
 'So',
 'far,',
 'really',
 'excited']
1
```
{{< /tab >}}
{{< /tabs >}}

{{< betonen gold >}}
Note that <code style="color:black;background-color:rgba(255, 180, 0, 0.2);">words_rd2.collect() = [['Hallo',..., 'excited']]</code> and therefore: 

- <code style="color:black;background-color:rgba(255, 180, 0, 0.2);">words_rd2.first() = ['Hallo',..., 'excited']</code>

where <code style="color:black;background-color:rgba(255, 180, 0, 0.2);">type(words_rd2.first()) = list</code>. In other words, it was expected that <code style="color:black;background-color:rgba(255, 180, 0, 0.2);">words_rd2.count() = 1</code>.
{{< /betonen >}}

So how to count the number of words in a string? Or to display the first 5 words?

For this one can use the `.flatMap()` method:

{{< tabs "FlatMap2" >}}
{{< tab "py" >}}
```python
words_rd3 = words_rdd.flatMap(lambda y: y.split(" "))

words_rd3.collect()
words_rd3.first()
words_rd3.take(5)
``` 
{{< /tab >}}
{{< tab ">>" >}}
```
['Hallo',
 'Welt.',
 'Das',
 'ist',
 'meine',
 'erste',
 'Arbeit',
 'mit',
 'Apache',
 'Spark.',
 'So',
 'far,',
 'really',
 'excited']

'Hallo'

['Hallo', 'Welt.', 'Das', 'ist', 'meine']
```
{{< /tab >}}
{{< /tabs >}}

{{< betonen gold >}}
- How to count the number of words [using `.flatMap()`](/posts/python/count-words-with-a-pair-rdd)
- An example highlighting the difference between [`.flatMap()` and `.map()`](/posts/python/difference-between-map-and-flatmap)
{{< /betonen >}}