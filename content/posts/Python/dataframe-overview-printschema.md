---
title: "DataFrame Overview `printSchema()`"
date: 2020-02-20T16:10:08+01:00
series: ['pyspark']
tags: ['json', 'printSchema']
categories: ["Python"]
---

Use the `.printSchema()` to display the schema to see how Spark SQL inferred the shape of the data

{{< tabs "printSchema" >}}
{{< tab "python" >}}
```python
dfWorldBank = sqlContext.read.json("world_bank.json.gz")

print(dfWorldBank.printSchema())
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

