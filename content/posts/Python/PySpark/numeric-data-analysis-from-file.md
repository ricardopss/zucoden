---
title: "Numeric Data Analysis From File"
date: 2020-04-11T17:55:11+02:00
series: ['pyspark']
tags: ['RDD', 'textFile', 'map', 'split', 'take']
categories: ["Python"]
---

We'll analyze a sample file that contains instructor names and scores. The file has the following format: {{< code gold >}}Instructor Name,Score1,Score2,Score3,Score4{{< /code >}}.

Here is an example line from the text file: {{< code gold>}}"Carlo,5,3,3,4"{{< /code >}}

Steps:
1. Download the file.
2. Load the text file into an RDD.
3. Run a transformation to create an RDD with the instructor names and the sum of the 4 scores per instructor.
4. Run a second transformation to compute the average score for each instructor.
5. Display the first 5 results.

{{< tabs "Analyze numeric data from file" >}}
{{< tab "py" >}}
```python
!rm Scores.txt* -f
!wget https://raw.githubusercontent.com/carloapp2/SparkPOT/master/Scores.txt

raw_rdd = sc.textFile("Scores.txt")

sumScores_rdd = raw_rdd.map(lambda line:line.split(","))\
.map(lambda v: (v[0], int(v[1]) + int(v[2]) + int(v[3]) + int(v[4])))

finalScores_rdd = sumScores_rdd.map(lambda v:(v[0], v[1], v[1]/4.0))

finalScores_rdd.take(5)
``` 
{{< /tab >}}
{{< tab ">>" >}}
```
[('Carlo', 15, 3),
 ('Mokhtar', 15, 3),
 ('Jacques', 15, 3),
 ('Braden', 15, 3),
 ('Chris', 15, 3)]
```
{{< /tab >}}
{{< /tabs >}}

{{< betonen gold >}}
For an example highlighting the difference between `.flatMap()` and `.map()`, see [here](/posts/python/pyspark/difference-between-map-and-flatmap)
{{< /betonen >}}