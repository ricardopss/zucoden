---
title: "Run Sql Queries"
date: 2020-02-20T16:10:31+01:00
series: ['PySpark']
tags: ['querying data', 'shell', 'SQL', 'big data']
categories: ["Python"]
---

For run some SQL queries, we will use the [DataFrame `dfWorldBank` generated](/posts/python/download-data-and-read-in-pyspark-sql) from the World Bank Series.

{{< betonen gold >}}
For how to display the contents(results) of a DataFrame(query):
 - [Display Query Results](/posts/python/display-query-results)
 - [Display Query Results with a Pandas DataFrame](/posts/python/display-query-results-with-a-pandas-dataframe) 
{{< /betonen >}}

{{< tabs "Run SQL Queries" >}}
{{< tab "python" >}}
```python
import pandas as pd

sqlContext.sql("select id, borrower from world_bank limit 2").toPandas()
``` 
{{< /tab >}}
{{< tab ">>" >}}

|index|id|borrower|
|:-|:-|:-|
|0|P129828|FEDERAL DEMOCRATIC REPUBLIC OF ETHIOPIA|
|1|P144674|GOVERNMENT OF TUNISIA|
{{< /tab >}}
{{< /tabs >}}

## Run a group by query
We can make SQL queries easier to read by using the query keyword and surrounding the SQL query with `"""` on separate lines:

{{< tabs "Run a group by query" >}}
{{< tab "python" >}}
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
{{< /tab >}}
{{< tab ">>" >}}
```
|index|regionname|project_count|
|:-|:-|:-|
|0|Africa|152|
|1|East Asia and Pacific|100|
|2|Europe and Central Asia|74|
|3|South Asia|65|
|4|Middle East and North Africa|54|
|5|Latin America and Caribbean|53|
|6|Other|2|
```
{{< /tab >}}
{{< /tabs >}}


## Run a subselect query
We can run subselect queries, e.g. calculate a count of projects by region again, but this time using a subselect and by creating a temporary table `table_alias`:

{{< tabs "Run a subselect query" >}}
{{< tab "python" >}}
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
{{< /tab >}}
{{< tab ">>" >}}
```
|index|regionname|project_count|
|:-|:-|:-|
|0|Africa|152|
|1|East Asia and Pacific|100|
```
{{< /tab >}}
{{< /tabs >}}

## Return nested JSON field values

Specially for JSON data, we can access/select the values of nested fields using _dot notation_.

[See world_bank schema](/posts/python/dataframe-overview-printschema): sector.Name is a nested field and then select its first two values:

{{< tabs "Return nested JSON field values" >}}
{{< tab "python" >}}
```python
sql = "select sector.Name from world_bank limit 5"

sqlContext.sql(sql).toPandas()
``` 
{{< /tab >}}
{{< tab ">>" >}}
```
|index|Name|
|:-|:-|
|0|[Primary education, Secondary education, Publi...|
|1|[Public administration- Other social services,...|
|2|[Rural and Inter-Urban Roads and Highways]|
|3|[Other social services]|
|4|[General industry and trade sector, Other indu...|
```
{{< /tab >}}
{{< /tabs >}}