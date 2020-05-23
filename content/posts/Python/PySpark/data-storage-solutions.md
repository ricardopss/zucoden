---
title: "Data Storage Solutions"
date: 2020-05-02T17:31:40+02:00
series: ['pyspark']
tags: ['sql', 'nosql', 'objectstorage']
categories: ["Python"]
---

When working with datasets, we must consider that:

- datasets can become quite huge (_big-data_)
- datasets can have also different schemas (_changing schemas_)
- datasets might need to be stored for months, even years (_long-term storage_)

Within PySpark, there are different data storages solutions ranging from SQL/No SQL to ObjectDatastorage (behaves like remote file system), which one with its advantages/disadvantages related to:

|category \ solution|SQL|NoSQL|ObjectStorage|
|:-|:-|:-|:-|
|storage cost|high|low|very low|
|scalability[^1]|low|high|very high|
|query speed|high|low|very low|
|flexibility|low|high|very high|

{{< betonen gold >}}
The SQL database is the most common type of data storage.
{{< /betonen >}}

## SQL Database
#### Advantages
- well known, well established
- support high integrity, high data normalization
- subsets of data can be access immediately through fast indexed access
- is a open standard

#### Disadvantages
- change of schema need DDL (Data Definition Language)
- hard to scale
- high storage cost 

## NoSQL database
#### Advantages
- don't force data to comply any predefined schema, therefore change of schema is no problem (_dynamic schema_)[^2]
- low storage cost
- linearly scalable[^3]

#### Disadvantages
- no data normalization, no data integrity
- less established
- generally slower in access than SQL

## Object Storage
#### Advantages
- very low cost
- linearly scalable
- seamless schema migration (_schema-less_)
- open standard storage

## Data storage decision matrix

The choice will depend on:
- amount of data needed to store/process
- variety of schemas (also frequency of schemas changes)
- query performance requirements (e.g. accessing subsets of data)
- additional data types like images, audio or video

{{< mermaid >}}
graph LR;
	A["best initial decision"]-- low amount of data or <br/>very stable schema -->B("SQL");
	B("SQL")-- as amount of data increases or<br/>cope with changing schemas -->C("NoSQL");
	C("NoSQL")-- very high amount of data<br/>unstable schema<br/>e.g. audio/video data -->D("Object Storage");
{{< /mermaid >}}


[^1]: **Database scalability** is the ability to scale out or scale up a database to allow it to hold increasing amounts of data without sacrificing performance. ... For relational databases, the typical approach is to shard the database and distribute it across multiple servers in a cluster. ([source](https://www.gridgain.com/technology/overview/database-scalability))

[^2]: each entry can have its own schema, and a table can have a mix of schemas. 

[^3]: to **double** the amount of storage just **double** amount of disks. Likewise, to **double** the processing power just **double** the number of servers.