---
title: "PySpark Primer"
date: 2020-02-04T16:43:08+01:00
draft: True
tags: ['PySpark', 'Data Science', 'Big Data', 'Towards Data Science']
categories: ['Python']
---

# Introduction to Spark

Apache Spark was designed as a computing platform to be fast, general-purpose, and easy to use. It extends the MapReduce model and takes it to a whole other level.

The site [Towards Data Science](https://towardsdatascience.com/a-neanderthals-guide-to-apache-spark-in-python-9ef1f156d427) gives the simplest definition:

{{< betonen green >}}
_**Spark** is a general-purpose distributed data processing engine_ (Google definition), where:

- `Distributed Data/Distributed Computing` — Apache Spark operates in a world that is slightly different from run-of-the-mill computer science. When datasets get too big, or when new data comes in too fast, it can become too much for a single computer to handle. _This is where distributed computing comes in_. Instead of trying to process a huge dataset or run super computationally-expensive programs on one computer, these tasks can be divided between multiple computers that communicate with each other to produce an output. This technology has some serious benefits, but allocating processing tasks across multiple computers has its own set of challenges and can’t be structured the same way as normal processing. When Spark says it has to do with distributed data, this means _that it is designed to deal with very large datasets and to process them on a distributed computing system_.
{{< /betonen >}}

- `Processing Engine/Processing Framework` — A processing engine, sometimes called a processing framework, is responsible for performing data processing tasks (an illuminating explanation, I know). A comparison is probably the best way to understand this. Apache Hadoop is an open source software platform that also deals with “Big Data” and distributed computing. Hadoop has a processing engine, distinct from Spark, called MapReduce. MapReduce has its own particular way of optimizing tasks to be processed on multiple nodes and Spark has a different way. One of Sparks strengths is that it is a processing engine that can be used on its own, or used in place of Hadoop MapReduce, taking advantage of the other features of Hadoop.

- `General-Purpose` — 	One of the main advantages of Spark is how flexible it is, and how many application domains it has. It supports Scala, Python, Java, R, and SQL. It has a dedicated SQL module, it is able to process streamed data in real-time, and it has both a machine learning library and graph computation engine built on top of it. All these reasons contribute to why Spark has become one of the most popular processing engines in the realm of Big Data.

**Distributed Computing Terms**
- `Partitioned Data` — When working with a computer cluster, you can’t just throw in a vanilla dataframe and expect it to know what to do. Because the processing tasks will be divided across multiple nodes, the data also has to be able to be divided across multiple nodes. Partitioned data refers to data that has been optimized to be able to be processed on multiple nodes.

- `Fault Tolerance` — In short, fault tolerance refers to a distributed system’s ability to continue working properly even when a failure occurs. A failure could be a node bursting into flames for example, or just a communication breakdown between nodes. Fault tolerance in Spark revolves around Spark’s RDDs (which will be discussed later). Basically, the way data storage is handled in Spark allows Spark programs to function properly despite occurences of failure.

- `Lazy Evaluation` — Lazy evaluation, or lazy computing, has to do with how code is compiled. When a compiler that is not lazy (which is called strict evaluation) compiles code, it sequentially evaluates each expression it comes across. A lazy compiler on the other hand, doesn’t continually evaluate expressions, but rather, waits until it is actually told to generate a result, and then performs all the evaluation all at once. So as it compiles code, it keeps track of everything it will eventually have to evaluate (in Spark this kind of evaluation log, so to speak, is called a lineage graph), and then whenever it is prompted to return something, it performs evaluations according to what it has in its evaluation log. This is useful because it makes programs more efficient as the compiler doesn’t have to evaluate anything that isn’t actually used.


## Work with Resilient Distributed Datasets

Apache Spark uses an abstraction for working with data called a Resilient Distributed Dataset (RDD). An RDD is a collection of elements that can be operated on in parallel. RDDs are immutable, so you can't update the data in them. To update data in an RDD, you must create a new RDD.

In Apache Spark, all work is done by creating new RDDs, transforming existing RDDs, or using RDDs to compute results. When working with RDDs, the Spark driver application automatically distributes the work across the cluster.

You can construct RDDs by parallelizing existing Python collections (lists), by manipulating RDDs, or by manipulating files in HDFS or any other storage system.

You can run these types of methods on RDDs:

- **Actions**: query the data and return values
- **Transformations**: manipulate data values and return pointers to new RDDs.

## Installing PySpark in Google Colab
To get Spark running in Colab run the following block of code:

```python
!apt-get install openjdk-8-jdk-headless -qq > /dev/null
!wget -q https://www-us.apache.org/dist/spark/spark-2.4.5/spark-2.4.5-bin-hadoop2.7.tgz
!tar xf spark-2.4.5-bin-hadoop2.7.tgz
!pip install -q findspark
import os
os.environ["JAVA_HOME"] = "/usr/lib/jvm/java-8-openjdk-amd64"
os.environ["SPARK_HOME"] = "/content/spark-2.4.5-bin-hadoop2.7"
import findspark
findspark.init()
```
{{< betonen red >}}
If it returns a error it is probably because the Spark version in the code is outdate. Check the [Spark](https://spark.apache.org/downloads.html) website, search for the newst version and replace in the code above.
{{< /betonen >}}

## Create a SparkContext



## Some methods to view the data in RDD 

## Manipulate data in RDDs

Remember that to manipulate data, you use transformation functions.

Some common Python transformation functions:

- `map(func)`: returns a new RDD with the results of running the specified function on each element
- `flatMap(func)`: returns a new RDD by first running the specified function on all elements, returning 0 or more results for each original element, and then flattening the results into individual elements
- `filter(func)`: returns a new RDD with the elements for which the specified function returns true
- `distinct([numTasks]))`: returns a new RDD that contains the distinct elements of the source RDD

### Using the `map(func)` method

{{< tabs "map(func)" >}}
{{< tab "python" >}}
```python
x_nbr_rdd_2 = x_nbr_rdd.map(lambda x: x+1) # create a new RDD (since RDD are immutables) and assign each value + 1 of x_nbr_rdd to x_nbr_rdd_2
x_nbr_rdd_2.collect()  
``` 
{{< /tab >}}
{{< tab ">>" >}}
```
[2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
```
{{< /tab >}}
{{< /tabs >}}

#### Add numbers in an array
An array of values is a common data format where multiple values _are contained in one element (string)_ . You can manipulate the individual values if you split them up into separate elements.

{{< tabs "Add numbers in an array" >}}
{{< tab "python" >}}
```python
X = ["1,2,3,4,5,6,7,8,9,10"]

y_rd = sc.parallelize(X)

# to split the values at commas use the map method:

y_rd2 = y_rd.map(lambda y: y.split(','))

y_rd2.collect() # list

print(type(y_rd2.collect()))
print(len(y_rd2.collect()))
print(len(y_rd2.collect())[0])

# Split the values at commas and add values in the positions 2 and 9 in the array.
# One can use a backslash character, \, to break the line of code for clarity.

Sum_rd = y_rd.map(lambda y: y.split(',')).map(lambda y: (int(y[2]) + int(y[9])))
Sum_rd.first() # prefer to use the first() to collect()
``` 
{{< /tab >}}
{{< tab ">>" >}}
```
[['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']]

<class 'list'>
1
10

13
```
{{< /tab >}}
{{< /tabs >}}


### Using `flatMap()` method

The `flatMap()` method has advantages over `map()` when it comes to work with strings. E.g.

{{< tabs "Split and Count Text Strings" >}}
{{< tab "python" >}}
```python
Words = ["Hallo Welt. Das ist meine erste Arbeit mit Apache Spark. So far, really excited"]

words_rd = sc.parallelize(Words)
words_rd.first()

# Suppose that we want to split the strings into words. Using the map() method:

words_rd2 = words_rd.map(lambda word: word.split(" "))
words_rd2.first()
words_rd2.count()
``` 
{{< /tab >}}
{{< tab ">>" >}}
```
"Hallo Welt. Das ist meine erste Arbeit mit Apache Spark. So far, really excited"
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
Note that 

`words_rd2.collect() = [['Hallo',..., 'excited']]` 

and therefore: 

`words_rd2.first() = ['Hallo',..., 'excited']`
`type(words_rd2.first()) = list`
{{< /betonen >}}

In other words, it was expected that `words_rd2.count() = 1`. So how to count the number of words in a string? Or to display the first 5 words?

For this one has to use the `flatMap()` method:

{{< tabs "flat Map" >}}
{{< tab "python" >}}
```python
words_rd3 = words_rdd.flatMap(lambda y: y.split(" "))

words_rd3.first()
words_rd3.take(5)
``` 
 {{< /tab >}}
{{< tab ">>" >}}
```
'Hallo'

['Hallo', 'Welt.', 'Das', 'ist', 'meine']
```
{{< /tab >}}
{{< /tabs >}}

#### Count words with a pair RDD

A common way to count the number of instances of words in an RDD is to create **a pair RDD**.

A pair RDD converts each word into a **key-value pair**, where the word is the key and the number 1 is the value. Because the values are all 1, when you add the values for a particular word, you get the number of instances of that word.

{{< tabs "pair RDD" >}}
{{< tab "python" >}}
```python
z = ["First,Line", "Second,Line", "and,Third,Line"]
z_str_rdd = sc.parallelize(z)
z_str_rdd.first()

z_str_rdd_flat = z_str_rdd.flatMap(lambda line: line.split(",")) 
z_str_rdd_flat.collect() # only to illustration NOT RECOMMENDED!!!

count_word = z_str_rdd_flat.map(lambda word: (word,1))

``` 
{{< /tab >}}
{{< tab ">>" >}}
```
"First, Line"

['First', 'Line', 'Second', 'Line', 'and', 'Third', 'Line']

[('First', 1),
 ('Line', 1),
 ('Second', 1),
 ('Line', 1),
 ('and', 1),
 ('Third', 1),
 ('Line', 1)]
```
{{< /tab >}}
{{< /tabs >}}

To sum all the values by key, use the action `reduceByKey(func)`  from operator module:

{{< tabs "ReduceByKey" >}}
{{< tab "python" >}}
```python
from operator import add

count_word2 = count_word.reduceByKey(add)
countWord2.collect() # The word Line has a count of 3.
``` 
{{< /tab >}}
{{< tab ">>" >}}
```
[('Line', 3), ('Second', 1), ('First', 1), ('and', 1), ('Third', 1)] 
```
{{< /tab >}}
{{< /tabs >}}

### Using `filter()` to filter data (and to count it)
Another alternative to count the number of instances of a word in a text is using the `filter()` method, where the syntax is given by:

`.filter(lambda line: "Filter Criteria Value" in line)`

Using the same created RDD `z_str_rdd`:

{{< tabs "FilterData" >}}
{{< tab "python" >}}
```python
z_str_rdd_filter = z_str_rdd.flatMap(lambda line: line.split(",")).filter(lambda line: "Line" in line)

z_str_rdd_filter.collect()

print("The count of words '" + str(z_str_rdd_filter.first()) + "'")
print("Is: " + str(z_str_rdd_filter.count())) # count()~ len() in Python
``` 
{{< /tab >}}
{{< tab ">>" >}}
```
['Line', 'Line', 'Line']

The count of words 'Line'
Is: 3
```
{{< /tab >}}
{{< /tabs >}}

To count the number of differents words use the `distinct()` method:

{{< tabs "Distinct" >}}
{{< tab "python" >}}
```python
z_rdd_distinct = z_str_rdd.flatMap(lambda line: line.split(",")).distinct()
z_rdd_distinct.collect()
``` 
{{< /tab >}}
{{< tab ">>" >}}
```
['Line', 'Second', 'First', 'and', 'Third']
```
{{< /tab >}}
{{< /tabs >}}

## Analyze text data from a file

### Get the file from a URL
to run shell commands in Python Notebooks, use {{< code gold>}}!{{< /code >}}

```python
!rm README.md* -f  # removes any file with the README.md
!wget https://raw.githubusercontent.com/carloapp2/SparkPOT/master/README.md
```

to create an RDD from the file, use the `textFile()` method

{{< tabs "textFile" >}}
{{< tab "python" >}}
```python
textfile_rdd = sc.textFile("README.md")
textfile_rdd.count()
textfile_rdd.take(20)
``` 
{{< /tab >}}
{{< tab ">>" >}}
```
98

['# Apache Spark',
 '',
 'Spark is a fast and general cluster computing system for Big Data. It provides',
 'high-level APIs in Scala, Java, and Python, and an optimized engine that',
 'supports general computation graphs for data analysis. It also supports a',
 'rich set of higher-level tools including Spark SQL for SQL and structured',
 'data processing, MLlib for machine learning, GraphX for graph processing,',
 'and Spark Streaming for stream processing.',
 '',
 '<http://spark.apache.org/>',
 '',
 '',
 '## Online Documentation',
 '',
 'You can find the latest Spark documentation, including a programming',
 'guide, on the [project web page](http://spark.apache.org/documentation.html)',
 'and [project wiki](https://cwiki.apache.org/confluence/display/SPARK).',
 'This README file only contains basic setup instructions.',
 '',
 '## Building Spark']
```
{{< /tab >}}
{{< /tabs >}}

#### Filter for a word
Filter the RDD to keep only the elements that contain the word _"Spark"_ with the `filter()` transformation:

{{< tabs "Filter for a word" >}}
{{< tab "python" >}}
```python
textfile_rdd_filtred = textfile_rdd.filter(lambda line: "Spark" in line)
textfile_rdd_filtred.count()

``` 
{{< /tab >}}
{{< tab ">>" >}}
```
19 
```
{{< /tab >}}
{{< /tabs >}}

### To count the instances of a string at the beginning of words
E.g. to count the number of times the substring _"Spark"_ appears at the beginning of a word in the original text:

1. Use `flatMap()` to split each line of the text file into words
2. Use the `tuple(word, 1) + reduceByKey` to count the number of instances
3. Use the filter `str().startswith("token")` 

{{< tabs "startswith" >}}
{{< tab "python" >}}
```python
textfile_rdd_filtred = textfile_rdd.filter(lambda line: "Spark" in line)

temp_rdd = textfile_rdd_filtred.flatMap(lambda w: w.split(" "))\
.map(lambda word: (word,1)).reduceByKey(add)

temp_rdd_filtred = temp_rdd.filter(lambda k: k[0].startswith("Spark"))
temp_rdd_filtred.collect()
"""
textfile_rdd_filtred filter all text-line that has the Word "Spark" in it.

temp_rdd split each text-line into words, create the tuple() and then sum by 

temp_rdd_filtred filter for words that start with "Spark"
"""
``` 
{{< /tab >}}
{{< tab ">>" >}}
```
[('Spark', 14),
 ('Spark"](http://spark.apache.org/docs/latest/building-spark.html).', 1),
 ('SparkPi', 2),
 ('Spark](#building-spark).', 1),
 ('Spark.', 1)]

```
{{< /tab >}}
{{< /tabs >}}

{{< betonen gold >}}
to count instances of a string within words, use:

`temp_rdd_filtred = temp_rdd.filter(lambda k: "Spark" in k[0])).collect()`

{{< /betonen >}}

## Analyze numeric data from file
You'll analyze a sample file that contains instructor names and scores. 

The file has the following format: `Instructor Name,Score1,Score2,Score3,Score4.` 

Here is an example line from the text file: "Carlo,5,3,3,4"

Add all scores and report on results:

1. Download the file.
2. Load the text file into an RDD.
3. Run a transformation to create an RDD with the instructor names and the sum of the 4 scores per instructor.
4. Run a second transformation to compute the average score for each instructor.
5. Display the first 5 results.

{{< tabs "Analyze numeric data from file" >}}
{{< tab "python" >}}
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

{{< betonen red >}}
**When to use <code style="color:black;background-color:rgba(255, 0, 0, 0.2);">map()</code> vs. <code style="color:black;background-color:rgba(255, 0, 0, 0.2);">flatMap()</code>**

_raw_rdd = ['Carlo,5,3,3,4', 'Mokhtar,2,5,5,3', 'Jacques,4,2,4,5']_
_raw_rdd.count() = 3_

when one uses the **map()** he maintains the _line structure_ as:

_dbRDD1 = raw_rdd.map(lambda line:line.split(","))_

_[['Carlo', '5', '3', '3', '4'], ['Mokhtar', '2', '5', '5', '3'],['Jacques', '4', '2', '4', '5']]_

_dbRDD1.count() = 3_

while with **flatMap()** the reference (i.e. instructors name) is lost:

_dbRDD2 = raw_rdd.flatMap(lambda line:line.split(","))_

_['Carlo', '5', '3', '3', '4', 'Mokhtar', '2', '5', '5', '3', 'Jacques', '4', '2', '4', '5']_

_dbRDD2.count() = 15_

{{< /betonen >}}

# Querying Data

{{< betonen green >}}
This sections shows _how to_ querying data with Spark, including:

- create and use Dataframes
- run SQLs queries
- apply functions to SQLs queries
- join data from different sources
- visualize data in graphs 

{{< /betonen >}}


## Download the data file

## Create a DataFrame
Remeber that RDD do not have a schema, i.e. they do not have a column structure (records are just record row by row). Therefore, RDDs are not suitable for working with SQL. 

For this, you'll need to create a Spark DataFrame. Spark DataFrame have all of the features of RDDs but also have a schema, which supplies the necessary structure for SQL queries.

{{< betonen gold >}}what holds for an RDD also holds for a DataFrame, since the last are just organized into a columnar structure.{{< /betonen >}}

A self-describing format like JSON is ideal for DataFrames, but many other file types are supported, including text (CSV) and Parquet.

For the `world_bank.json.gz` json file, use the `read.json()` method:

{{< tabs "Create a Data Frame" >}}
{{< tab "python" >}}
```python
df_json = sqlContext.read.json("world_bank.json.gz")
df_json.count()
len(df_json.columns) # use .columns to list the columns in the file
``` 
{{< /tab >}}
{{< tab ">>" >}}
```
500
50
```
{{< /tab >}}
{{< /tabs >}}

use `printSchema()` to print the schema and to see how Spark SQL inferred the shape of the data:

{{< tabs "printSchema" >}}
{{< tab "python" >}}
```python
print(df_json.printSchema())` 
``` 
{{< /tab >}}
{{< tab ">>" >}}
```
root
 |-- _id: struct (nullable = true)
 |    |-- $oid: string (nullable = true)
 |-- approvalfy: string (nullable = true)
 |-- board_approval_month: string (nullable = true)
 |-- boardapprovaldate: string (nullable = true)
 |-- borrower: string (nullable = true)
 |-- closingdate: string (nullable = true)
 |-- country_namecode: string (nullable = true)
 |-- countrycode: string (nullable = true)
 |-- countryname: string (nullable = true)
 |-- countryshortname: string (nullable = true)
 |-- docty: string (nullable = true)
 |-- envassesmentcategorycode: string (nullable = true)
 |-- grantamt: long (nullable = true)
 |-- ibrdcommamt: long (nullable = true)
 |-- id: string (nullable = true)
 |-- idacommamt: long (nullable = true)
 |-- impagency: string (nullable = true)
 |-- lendinginstr: string (nullable = true)
 |-- lendinginstrtype: string (nullable = true)
 |-- lendprojectcost: long (nullable = true)
 |-- majorsector_percent: array (nullable = true)
 |    |-- element: struct (containsNull = true)
 |    |    |-- Name: string (nullable = true)
 |    |    |-- Percent: long (nullable = true)
 |-- mjsector_namecode: array (nullable = true)
 |    |-- element: struct (containsNull = true)
 |    |    |-- code: string (nullable = true)
 |    |    |-- name: string (nullable = true)
 |-- mjtheme: array (nullable = true)
 |    |-- element: string (containsNull = true)
 |-- mjtheme_namecode: array (nullable = true)
 |    |-- element: struct (containsNull = true)
 |    |    |-- code: string (nullable = true)
 |    |    |-- name: string (nullable = true)
 |-- mjthemecode: string (nullable = true)
 |-- prodline: string (nullable = true)
 |-- prodlinetext: string (nullable = true)
 |-- productlinetype: string (nullable = true)
 |-- project_abstract: struct (nullable = true)
 |    |-- cdata: string (nullable = true)
 |-- project_name: string (nullable = true)
 |-- projectdocs: array (nullable = true)
 |    |-- element: struct (containsNull = true)
 |    |    |-- DocDate: string (nullable = true)
 |    |    |-- DocType: string (nullable = true)
 |    |    |-- DocTypeDesc: string (nullable = true)
 |    |    |-- DocURL: string (nullable = true)
 |    |    |-- EntityID: string (nullable = true)
 |-- projectfinancialtype: string (nullable = true)
 |-- projectstatusdisplay: string (nullable = true)
 |-- regionname: string (nullable = true)
 |-- sector: array (nullable = true)
 |    |-- element: struct (containsNull = true)
 |    |    |-- Name: string (nullable = true)
 |-- sector1: struct (nullable = true)
 |    |-- Name: string (nullable = true)
 |    |-- Percent: long (nullable = true)
 |-- sector2: struct (nullable = true)
 |    |-- Name: string (nullable = true)
 |    |-- Percent: long (nullable = true)
 |-- sector3: struct (nullable = true)
 |    |-- Name: string (nullable = true)
 |    |-- Percent: long (nullable = true)
 |-- sector4: struct (nullable = true)
 |    |-- Name: string (nullable = true)
 |    |-- Percent: long (nullable = true)
 |-- sector_namecode: array (nullable = true)
 |    |-- element: struct (containsNull = true)
 |    |    |-- code: string (nullable = true)
 |    |    |-- name: string (nullable = true)
 |-- sectorcode: string (nullable = true)
 |-- source: string (nullable = true)
 |-- status: string (nullable = true)
 |-- supplementprojectflg: string (nullable = true)
 |-- theme1: struct (nullable = true)
 |    |-- Name: string (nullable = true)
 |    |-- Percent: long (nullable = true)
 |-- theme_namecode: array (nullable = true)
 |    |-- element: struct (containsNull = true)
 |    |    |-- code: string (nullable = true)
 |    |    |-- name: string (nullable = true)
 |-- themecode: string (nullable = true)
 |-- totalamt: long (nullable = true)
 |-- totalcommamt: long (nullable = true)
 |-- url: string (nullable = true)

```
{{< /tab >}}
{{< /tabs >}}

To print the first 2 rows

{{< tabs "To print the first 2 rows" >}}
{{< tab "python" >}}
```python
for row in example1_df.take(2):
    print (row)
    print ("*" * 20)
``` 
{{< /tab >}}
{{< tab ">>" >}}
```
Row(_id=Row($oid='52b213b38594d8a2be17c780'), approvalfy='1999', board_approval_month='November', boardapprovaldate='2013-11-12T00:00:00Z', borrower='FEDERAL DEMOCRATIC REPUBLIC OF ETHIOPIA', closingdate='2018-07-07T00:00:00Z', country_namecode='Federal Democratic Republic of Ethiopia!$!ET', countrycode='ET', countryname='Federal Democratic Republic of Ethiopia', countryshortname='Ethiopia', docty='Project Information Document,Indigenous Peoples Plan,Project Information Document', envassesmentcategorycode='C', grantamt=0, ibrdcommamt=0, id='P129828', idacommamt=130000000, impagency='MINISTRY OF EDUCATION', lendinginstr='Investment Project Financing', lendinginstrtype='IN', lendprojectcost=550000000, majorsector_percent=[Row(Name='Education', Percent=46), Row(Name='Education', Percent=26), Row(Name='Public Administration, Law, and Justice', Percent=16), Row(Name='Education', Percent=12)], mjsector_namecode=[Row(code='EX', name='Education'), Row(code='EX', name='Education'), Row(code='BX', name='Public Administration, Law, and Justice'), Row(code='EX', name='Education')], mjtheme=['Human development'], mjtheme_namecode=[Row(code='8', name='Human development'), Row(code='11', name='')], mjthemecode='8,11', prodline='PE', prodlinetext='IBRD/IDA', productlinetype='L', project_abstract=Row(cdata='The development objective of the Second Phase of General Education Quality Improvement Project for Ethiopia is to improve learning conditions in primary and secondary schools and strengthen institutions at different levels of educational administration. The project has six components. The first component is curriculum, textbooks, assessment, examinations, and inspection. This component will support improvement of learning conditions in grades KG-12 by providing increased access to teaching and learning materials and through improvements to the curriculum by assessing the strengths and weaknesses of the current curriculum. This component has following four sub-components: (i) curriculum reform and implementation; (ii) teaching and learning materials; (iii) assessment and examinations; and (iv) inspection. The second component is teacher development program (TDP). This component will support improvements in learning conditions in both primary and secondary schools by advancing the quality of teaching in general education through: (a) enhancing the training of pre-service teachers in teacher education institutions; and (b) improving the quality of in-service teacher training. This component has following three sub-components: (i) pre-service teacher training; (ii) in-service teacher training; and (iii) licensing and relicensing of teachers and school leaders. The third component is school improvement plan. This component will support the strengthening of school planning in order to improve learning outcomes, and to partly fund the school improvement plans through school grants. It has following two sub-components: (i) school improvement plan; and (ii) school grants. The fourth component is management and capacity building, including education management information systems (EMIS). This component will support management and capacity building aspect of the project. This component has following three sub-components: (i) capacity building for education planning and management; (ii) capacity building for school planning and management; and (iii) EMIS. The fifth component is improving the quality of learning and teaching in secondary schools and universities through the use of information and communications technology (ICT). It has following five sub-components: (i) national policy and institution for ICT in general education; (ii) national ICT infrastructure improvement plan for general education; (iii) develop an integrated monitoring, evaluation, and learning system specifically for the ICT component; (iv) teacher professional development in the use of ICT; and (v) provision of limited number of e-Braille display readers with the possibility to scale up to all secondary education schools based on the successful implementation and usage of the readers. The sixth component is program coordination, monitoring and evaluation, and communication. It will support institutional strengthening by developing capacities in all aspects of program coordination, monitoring and evaluation; a new sub-component on communications will support information sharing for better management and accountability. It has following three sub-components: (i) program coordination; (ii) monitoring and evaluation (M and E); and (iii) communication.'), project_name='Ethiopia General Education Quality Improvement Project II', projectdocs=[Row(DocDate='28-AUG-2013', DocType='PID', DocTypeDesc='Project Information Document (PID),  Vol.', DocURL='http://www-wds.worldbank.org/servlet/WDSServlet?pcont=details&eid=090224b081e545fb_1_0', EntityID='090224b081e545fb_1_0'), Row(DocDate='01-JUL-2013', DocType='IP', DocTypeDesc='Indigenous Peoples Plan (IP),  Vol.1 of 1', DocURL='http://www-wds.worldbank.org/servlet/WDSServlet?pcont=details&eid=000442464_20130920111729', EntityID='000442464_20130920111729'), Row(DocDate='22-NOV-2012', DocType='PID', DocTypeDesc='Project Information Document (PID),  Vol.', DocURL='http://www-wds.worldbank.org/servlet/WDSServlet?pcont=details&eid=090224b0817b19e2_1_0', EntityID='090224b0817b19e2_1_0')], projectfinancialtype='IDA', projectstatusdisplay='Active', regionname='Africa', sector=[Row(Name='Primary education'), Row(Name='Secondary education'), Row(Name='Public administration- Other social services'), Row(Name='Tertiary education')], sector1=Row(Name='Primary education', Percent=46), sector2=Row(Name='Secondary education', Percent=26), sector3=Row(Name='Public administration- Other social services', Percent=16), sector4=Row(Name='Tertiary education', Percent=12), sector_namecode=[Row(code='EP', name='Primary education'), Row(code='ES', name='Secondary education'), Row(code='BS', name='Public administration- Other social services'), Row(code='ET', name='Tertiary education')], sectorcode='ET,BS,ES,EP', source='IBRD', status='Active', supplementprojectflg='N', theme1=Row(Name='Education for all', Percent=100), theme_namecode=[Row(code='65', name='Education for all')], themecode='65', totalamt=130000000, totalcommamt=130000000, url='http://www.worldbank.org/projects/P129828/ethiopia-general-education-quality-improvement-project-ii?lang=en')
********************
Row(_id=Row($oid='52b213b38594d8a2be17c781'), approvalfy='2015', board_approval_month='November', boardapprovaldate='2013-11-04T00:00:00Z', borrower='GOVERNMENT OF TUNISIA', closingdate=None, country_namecode='Republic of Tunisia!$!TN', countrycode='TN', countryname='Republic of Tunisia', countryshortname='Tunisia', docty='Project Information Document,Integrated Safeguards Data Sheet,Integrated Safeguards Data Sheet,Project Information Document,Integrated Safeguards Data Sheet,Project Information Document', envassesmentcategorycode='C', grantamt=4700000, ibrdcommamt=0, id='P144674', idacommamt=0, impagency='MINISTRY OF FINANCE', lendinginstr='Specific Investment Loan', lendinginstrtype='IN', lendprojectcost=5700000, majorsector_percent=[Row(Name='Public Administration, Law, and Justice', Percent=70), Row(Name='Public Administration, Law, and Justice', Percent=30)], mjsector_namecode=[Row(code='BX', name='Public Administration, Law, and Justice'), Row(code='BX', name='Public Administration, Law, and Justice')], mjtheme=['Economic management', 'Social protection and risk management'], mjtheme_namecode=[Row(code='1', name='Economic management'), Row(code='6', name='Social protection and risk management')], mjthemecode='1,6', prodline='RE', prodlinetext='Recipient Executed Activities', productlinetype='L', project_abstract=None, project_name='TN: DTF Social Protection Reforms Support', projectdocs=[Row(DocDate='29-MAR-2013', DocType='PID', DocTypeDesc='Project Information Document (PID),  Vol.1 of 1', DocURL='http://www-wds.worldbank.org/servlet/WDSServlet?pcont=details&eid=000333037_20131024115616', EntityID='000333037_20131024115616'), Row(DocDate='29-MAR-2013', DocType='ISDS', DocTypeDesc='Integrated Safeguards Data Sheet (ISDS),  Vol.1 of 1', DocURL='http://www-wds.worldbank.org/servlet/WDSServlet?pcont=details&eid=000356161_20131024151611', EntityID='000356161_20131024151611'), Row(DocDate='29-MAR-2013', DocType='ISDS', DocTypeDesc='Integrated Safeguards Data Sheet (ISDS),  Vol.1 of 1', DocURL='http://www-wds.worldbank.org/servlet/WDSServlet?pcont=details&eid=000442464_20131031112136', EntityID='000442464_20131031112136'), Row(DocDate='29-MAR-2013', DocType='PID', DocTypeDesc='Project Information Document (PID),  Vol.1 of 1', DocURL='http://www-wds.worldbank.org/servlet/WDSServlet?pcont=details&eid=000333037_20131031105716', EntityID='000333037_20131031105716'), Row(DocDate='16-JAN-2013', DocType='ISDS', DocTypeDesc='Integrated Safeguards Data Sheet (ISDS),  Vol.1 of 1', DocURL='http://www-wds.worldbank.org/servlet/WDSServlet?pcont=details&eid=000356161_20130305113209', EntityID='000356161_20130305113209'), Row(DocDate='16-JAN-2013', DocType='PID', DocTypeDesc='Project Information Document (PID),  Vol.1 of 1', DocURL='http://www-wds.worldbank.org/servlet/WDSServlet?pcont=details&eid=000356161_20130305113716', EntityID='000356161_20130305113716')], projectfinancialtype='OTHER', projectstatusdisplay='Active', regionname='Middle East and North Africa', sector=[Row(Name='Public administration- Other social services'), Row(Name='General public administration sector')], sector1=Row(Name='Public administration- Other social services', Percent=70), sector2=Row(Name='General public administration sector', Percent=30), sector3=None, sector4=None, sector_namecode=[Row(code='BS', name='Public administration- Other social services'), Row(code='BZ', name='General public administration sector')], sectorcode='BZ,BS', source='IBRD', status='Active', supplementprojectflg='N', theme1=Row(Name='Other economic management', Percent=30), theme_namecode=[Row(code='24', name='Other economic management'), Row(code='54', name='Social safety nets')], themecode='54,24', totalamt=0, totalcommamt=4700000, url='http://www.worldbank.org/projects/P144674?lang=en')
********************
```
{{< /tab >}}
{{< /tabs >}}




## Run SQL queries

#### create a Table
SQL statements must be run against a table, so the first step is to create a table that's a pointer to the DataFrame:

example1_df.registerTempTable("world_bank")

You must define a new DataFrame for the results of the SQL query and put the SQL statement inside the sqlContext.sql() method.

Run the following cell to select all columns from the table and print information about the resulting DataFrame and schema of the data:

```python
temp_df =  sqlContext.sql("select * from world_bank")

print(type(temp_df))
print("*" * 20)
print(temp_df)
```

The first print command shows that the DataFrame is a Spark DataFrame. The last print command shows the column names and data types of the DataFrame.


### Display query results with a pandas DataFrame

The `print()` command doesn't show the data in a useful format. Instead of creating a Spark DataFrame, use the pandas open-source data analytics library to create a pandas DataFrame that shows the data in a table.

```python
import pandas as pd

sqlContext.sql("select id, borrower from world_bank limit 2").toPandas()
```
## Run a group by query
You can make your SQL queries easier to read by using the query keyword

```python
query = """
select
    regionname ,
    count(*) as project_count
from world_bank
group by regionname 
order by count(*) desc
"""

sqlContext.sql(query).toPandas()
```

## Run a subselect query
Calculate a count of projects by region again, but this time using a subselect:

```python
query = """

select * from
    (select
        regionname ,
        count(*) as project_count
    from world_bank
    group by regionname 
    order by count(*) desc) table_alias
limit 2
"""

sqlContext.sql(query).toPandas()
```


## Return nested JSON field values