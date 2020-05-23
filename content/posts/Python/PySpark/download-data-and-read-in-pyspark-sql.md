---
title: "Downloading Data and Reading in PySpark SQL"
date: 2020-02-20T16:12:24+01:00
series: ['pyspark']
tags: ['wget', 'printSchema', 'json', 'registerTempTable', 'sql', 'dataframe']
categories: ["Python"]
---

As to our example, we will use a JSON file with data about world banks from GitHub. The data is adapted from this data set: http://data.worldbank.org/data-catalog/projects-portfolio.

{{< tabs "Download the data file" >}}
{{< tab "python" >}}
```python
!rm world_bank.json.gz -f
!wget https://raw.githubusercontent.com/bradenrc/sparksql_pot/master/world_bank.json.gz
``` 
{{< /tab >}}
{{< tab ">>" >}}
```
--2020-02-15 14:44:09--  https://raw.githubusercontent.com/bradenrc/sparksql_pot/master/world_bank.json.gz
Resolving raw.githubusercontent.com (raw.githubusercontent.com)... 151.101.0.133, 151.101.64.133, 151.101.128.133, ...
Connecting to raw.githubusercontent.com (raw.githubusercontent.com)|151.101.0.133|:443... connected.
HTTP request sent, awaiting response... 200 OK
Length: 446287 (436K) [application/octet-stream]
Saving to: ‘world_bank.json.gz’

world_bank.json.gz  100%[===================>] 435.83K  --.-KB/s    in 0.06s   

2020-02-15 14:44:09 (7.06 MB/s) - ‘world_bank.json.gz’ saved [446287/446287]
```
{{< /tab >}}
{{< /tabs >}}


## Create a DataFrame

Remeber that RDD do not have a _schema_, i.e. they do not have a column structure (records are just record row by row). Therefore, RDDs are not suitable for working with SQL. 

For this reason, we'll need to create a Spark DataFrame. Spark DataFrame have all of the features of RDDs but also have a _schema_, which supplies the necessary structure for SQL queries.

{{< betonen gold >}}what holds for an RDD also holds for a DataFrame, since the last are just organized into a columnar structure with names.{{< /betonen >}}

A self-describing format like JSON is ideal for DataFrames, but many other file types are supported, including text (CSV) and Parquet.

Create a DataFrame from JSON file using the `.read.json()` method:

{{< tabs "Create a DataFrame" >}}
{{< tab "py" >}}
```python
dfWorldBank = sqlContext.read.json("world_bank.json.gz") ### create a DataFrame

print(type(dfWorldBank))
print(dfWorldBank.printSchema())

### we can reference the columns names in DataFrames
for row in dfWorldBank.take(10):
    print(row.boardapprovaldate + "#" + row.closingdate)

``` 
{{< /tab >}}
{{< tab ">>" >}}
```
<class 'pyspark.sql.dataframe.DataFrame'>

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
 ...

2013-11-12T00:00:00Z#ET
2013-11-04T00:00:00Z#TN
2013-11-01T00:00:00Z#TV
2013-10-31T00:00:00Z#RY
2013-10-31T00:00:00Z#LS
2013-10-31T00:00:00Z#KE
2013-10-29T00:00:00Z#IN
2013-10-29T00:00:00Z#CN
2013-10-29T00:00:00Z#IN
2013-10-29T00:00:00Z#MA
```
{{< /tab >}}
{{< /tabs >}}

{{< betonen gold >}}
See also [DataFrame overview, using `printSchema`](/posts/python/pyspark/dataframe-overview-printschema)
{{< /betonen >}}

SQL statements must be run against a table, so we initially create a table, using the `.registerTempTable()` and then we define a new DataFrame for the results of the SQL query using the `.sqlContext.sql()` method.

{{< tabs "Run SQL Queries 1" >}}
{{< tab "py" >}}
```python
dfWorldBank.registerTempTable("world_bank") # where world_bank is the Table´s name

df = sqlContext.sql("select * from world_bank")

print(type(df))

print(df)
``` 
{{< /tab >}}
{{< tab ">>" >}}
```
<class 'pyspark.sql.dataframe.DataFrame'>

DataFrame[_id: struct<$oid:string>, approvalfy: string, board_approval_month: string, boardapprovaldate: string, borrower: string, closingdate: string, country_namecode: string, countrycode: string, countryname: string, countryshortname: string, docty: string, envassesmentcategorycode: string, grantamt: bigint, ibrdcommamt: bigint, id: string, idacommamt: bigint, impagency: string, lendinginstr: string, lendinginstrtype: string, lendprojectcost: bigint, majorsector_percent: array<struct<Name:string,Percent:bigint>>, mjsector_namecode: array<struct<code:string,name:string>>, mjtheme: array<string>, mjtheme_namecode: array<struct<code:string,name:string>>, mjthemecode: string, prodline: string, prodlinetext: string, productlinetype: string, project_abstract: struct<cdata:string>, project_name: string, projectdocs: array<struct<DocDate:string,DocType:string,DocTypeDesc:string,DocURL:string,EntityID:string>>, projectfinancialtype: string, projectstatusdisplay: string, regionname: string, sector: array<struct<Name:string>>, sector1: struct<Name:string,Percent:bigint>, sector2: struct<Name:string,Percent:bigint>, sector3: struct<Name:string,Percent:bigint>, sector4: struct<Name:string,Percent:bigint>, sector_namecode: array<struct<code:string,name:string>>, sectorcode: string, source: string, status: string, supplementprojectflg: string, theme1: struct<Name:string,Percent:bigint>, theme_namecode: array<struct<code:string,name:string>>, themecode: string, totalamt: bigint, totalcommamt: bigint, url: string]
```
{{< /tab >}}
{{< /tabs >}}

{{< betonen gold >}}
We can create a Table View also using the `.createOrReplaceTempView()`, e.g.

```python
dfWorldBank.createOrReplaceTempView('world_bank')

## or

dfWorldBank.registerTempTable("world_bank")
```
{{< /betonen >}}