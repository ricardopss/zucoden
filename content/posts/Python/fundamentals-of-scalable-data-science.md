---
title: "PySpark Primer"
date: 2020-02-04T16:43:08+01:00
draft: True
tags: ['Towards Data Science']
categories: ['Python']
---

# Introduction to Spark

Apache Spark was designed as a computing platform to be fast, general-purpose, and easy to use. It extends the MapReduce model and takes it to a whole other level.

The site [Towards Data Science](https://towardsdatascience.com/a-neanderthals-guide-to-apache-spark-in-python-9ef1f156d427) gives the simplest definition:






## Analyze text data from a file


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