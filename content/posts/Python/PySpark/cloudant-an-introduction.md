---
title: "Cloudant - An introduction"
date: 2020-05-07T13:42:58+02:00
series: ['pyspark']
tags: ['cloudant']
categories: ["Python"]
---

Cloudant is an IBM software product, primarily delivered as a cloud-based service. Cloudant is: 

- non-relational (NoSQL) with some unique features which can't be found in other NoSQL databases
- distributed database service of the same name. 
- based on the Apache-backed `CouchDB` project and the open source `BigCouch` project.

To create a Spark Dataframe froma a cloudant database directory first create a SparkContext and then enable the SQL process accordingly:
- [create a SparkContext](/posts/python/pyspark/create-a-sparkcontext)
- [enable the SQL process](/posts/python/pyspark/enabling-the-sql-process).

Created the SparkSession, we use it with the cloudant spark connector: we have to provide a cloudant.host name, the cloudant.username, and the cloudant.password, to the connector.  Finally, we specified a cloudant database where we want to read data from. All these credentials you can obtain using the IBM Bluemix dashboard.

```python
sparkSession = SQLContext.getOrCreate(sc).sparkSession

cloudantData = sparkSession.read.format("com.cloudant.spark").\
				option("cloudant.host", "credentialsHostName").\
				option("cloudant.username", "credentialsUserName").\
				option("cloudant-password", "credentialsPassword").\
				load("washingflat") 

cloudantData.count()

cloudantData.createOrReplaceTempView("washingflat") ## similar to .printSchema

sqlDF = spark.sql("SELECT * FROM washingflat")
sqlDF.show()

## to compute some aggregations, use e.g. minimum, maximum and average of the temperature column
'''
sqlDF = spark.sql("SELECT min(temperature) as minTemp,
						  max(temperature) as maxTemp,	 
						  avg(temperature) as avgTemp
				   FROM washingflat")
'''
```

## Cloudant - basic concepts

**horizontal scaling:** basically means you add additional physical machines to form a cluster.   
**vertical scaling:** adding additional CPU cores in the main memory.

Cloudant is a _NoSQL database_ as a service, with some unique features which can't be found in other NoSQL databases

All is based on open source technology, so there is no vendor login. 

Cloudant was founded 2008 by three MIT researchers working in the physics department. 

Cloudant was born in the {{< code gold >}}cloud solution{{< /code >}} so there doesn't exist an offering you can download and install yourself. 

It runs Apache NoSQL database in its core. 

ApacheCouchDB at that time was not horizontally scalable. So of course, {{< color blue >}}you could scale it vertically by{{< /color >}} just adding additional CPU cores in the main memory. But there was no support for _horizontal scaling_, which basically means you add additional physical machines to form a cluster. 

Therefore, Cloudant implemented a system called _BigCouch_ in order to add exactly this missing horizontal scaling support to ApacheCouchDB, and donated it as open source. 

`BigCouch`, by sitting in front of a ApacheCouchDB cluster, API-wise behaves like a single CouchDB instance but takes care about distributing the workload using a hashing algorithm. Using Multi-Version Concurrency Control (MVCC), CouchDB supports massively, parallel high throughput writes and updates.

Using MVCC, also ACID properties, as found in relational databases as supported. 

So, for example, concurrency is addressed by simply storing the same document twice, with different revision IDs, and leaving resolving of those conflicts up to the application, which can issue appropriate merge and delete operations. Horizontal scaling is supported by a replicated horizontally scaled cluster architecture with offline support. This means if a remote replica is not available during a write operation, data is replicated to the remote node once it is available again. Therefore, complying to the eventual consistency guarantee which CouchDB supports. This means, there is no guarantee that our replicas are in sync at a particular point in time, but each document will be in sync eventually. 

**So in summary,** thousands of clients worldwide are using `Cloudant`. And it is an ideal storage solution for `IOT sensor data` because it supports extraordinary high data ingestion rates due to a _highly scalable parallel architecture_. Storage costs are still relatively low. And the database can adapt to changing resource demand on your IOT application by dynamically add and remove resources on the fly without downtime.

As a side note, CouchDB even supports installation of updates without downtime. This is a feature of the Erlang programming language CouchDB is based on.

{{< betonen gold >}}
**What happens if in a globally distributed and replicated Cloudant environment writing to one replica fails?**  
Writing to the rest of the replicas still is performed. Through usage of internaly revision IDs the failed replica is eventually catching up and integrate this write operation into it's own replica. This is called "eventual consistency"
{{< /betonen >}}

