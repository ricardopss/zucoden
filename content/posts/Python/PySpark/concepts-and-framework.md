---
title: "PySpark Concepts and Framework"
date: 2020-03-19T11:44:10+01:00
series: ['pyspark']
tags: ['concepts', 'distributed computing', 'RDD']
categories: ['Python']
---

{{< betonen gold >}}
**Source:** [Towards Data Science](https://towardsdatascience.com/a-neanderthals-guide-to-apache-spark-in-python-9ef1f156d427)
{{< /betonen >}}

## Key Terminology and Concepts

### What is Spark
**General definition:** _Spark is a general-purpose distributed data processing engine_.  The main feature of Spark is its _in-memory cluster computing_ that increases the processing speed of an application.

**Distributed Computing/Data:** When datasets get too big, or when new data comes in too fast, it can become too much for a single computer to handle. This is where `distributed computing` comes in. Instead of trying to process a huge dataset or run super computationally-expensive programs on one computer, these tasks can be divided between multiple computers that communicate with each other to produce an output. This technology has some serious benefits, but _allocating processing tasks across multiple computers has its own set of challenges_ and can’t be structured the same way as normal processing. When Spark says it has to do with `distributed data`, this means that it is _designed to deal with very large datasets and to process them on a distributed computing system_. In a distributed computing system, each individual computer is called a `node` and the collection of all of them is called a `cluster`.

{{< betonen blue >}}**Further Reading:** [Introduction to distributed computing](https://medium.com/baseds/many-nodes-one-distributed-system-9921f85205c4){{< /betonen >}}

**Processing Engine/Framework:** A `processing engine`, sometimes called a `processing framework`, is responsible for performing data processing tasks. A comparison is probably the best way to understand this. _Apache Hadoop_ is an open source software platform that also deals with “Big Data” and distributed computing. Hadoop has a processing engine, distinct from Spark, called `MapReduce`. MapReduce has its own particular way of optimizing tasks to be processed on multiple nodes and Spark has a different way. One of Sparks strengths is that _it is a processing engine that can be used on its own_, or used in place of Hadoop MapReduce, taking advantage of the other features of Hadoop.

{{< betonen blue >}}**Further Reading:** [Processing Engines explained and compared](https://www.digitalocean.com/community/tutorials/hadoop-storm-samza-spark-and-flink-big-data-frameworks-compared){{< /betonen >}}

**General-Purpose:** One of the main advantages of Spark is how flexible it is, and how many application domains it has. It supports Scala, Python, Java, R, and SQL. It has a dedicated SQL module, it is able to process streamed data in real-time, and it has both a machine learning library and graph computation engine built on top of it. All these reasons contribute to why _Spark has become one of the most popular processing engines_ in the realm of Big Data.

{{< betonen blue >}}**Further Reading:** [5 minute guide to understanding the significance of Spark](https://mapr.com/blog/5-minute-guide-understanding-significance-apache-spark/){{< /betonen >}}

### Distributed Computing Terms
**Partitioned Data:** When working with a _computer cluster_, you can’t just throw in a vanilla dataframe and expect it to know what to do. {{< color blue >}}Because the processing tasks will be divided across multiple nodes, the data also has to be able to be divided across multiple nodes.{{< /color >}} `Partitioned data` refers to data that has been optimized to be able to be processed on multiple nodes.

{{< betonen blue >}}**Further Reading:** [Explanation of Data Partitioning](https://towardsdatascience.com/database-terminologies-partitioning-f91683901716){{< /betonen >}}

**Fault Tolerance:** In short, `fault tolerance` refers to a distributed system’s ability to continue working properly even when a failure occurs. A failure could be a node bursting into flames e.g., or just a communication breakdown between nodes. Fault tolerance in Spark revolves around [_Spark’s RDDs_](#spark-terms) . Basically, the way data storage is handled in Spark allows Spark programs to function properly despite occurences of failure.

{{< betonen blue >}}**Further Reading:** [How is Spark fault tolerant](https://www.quora.com/How-is-fault-tolerance-achieved-in-Apache-Spark){{< /betonen >}}

**Lazy Evaluation:** `Lazy evaluation`, or `lazy computing`, has to do with _how code is compiled_. When a compiler that is not lazy (which is called strict evaluation) compiles code, it sequentially evaluates each expression it comes across. A lazy compiler on the other hand, doesn’t continually evaluate expressions, but rather, _waits until it is actually told to generate a result, and then performs all the evaluation all at once_. So as it compiles code, it keeps track of everything it will eventually have to evaluate (in Spark this kind of evaluation log, so to speak, is called a lineage graph), and then whenever it is prompted to return something, it performs evaluations according to what it has in its evaluation log. This is useful because it makes programs more efficient as the compiler doesn’t have to evaluate anything that isn’t actually used.

{{< betonen blue >}}**Further Reading:** [What is Lazy Evaluation](https://medium.com/background-thread/what-is-lazy-evaluation-programming-word-of-the-day-8a6f4410053f){{< /betonen >}}

### Spark Terms
**RDDs, DataFrames, DataSets:** Spark `RDDs` (Resilient Distributed Datasets) are data structures that _are the core building blocks of Spark_. A RDD is an _immutable_, _partitioned collection of records_, which means that it can hold values, tuples, or other objects, these records are partitioned so as to be processed on a distributed system, and that once an RDD has been made, it is impossible to alter it. That basically sums up its acronym: {{< color blue >}}they are resilient due to their immutability and lineage graphs (see below){{< /color >}}, they can be distributed due to their partitions, and they are datasets because, well, they hold data.

A crucial thing to note is that {{< code gold>}}RDDs do not have a schema{{< /code >}}, which means that they do not have a columnar structure. Records are just recorded _row-by-row_, and are displayed similar to a list. 

`Spark DataFrames:` Not to be confused with Pandas DataFrames, as they are distinct, Spark DataFrame have all of the features of _RDDs but also have a schema_. This will make them our data structure of choice for getting started with PySpark.

`Spark DataSets`: Spark has another data structure, _Spark DataSets_. These are similar to DataFrames but are _strongly-typed_, meaning that the type is specified upon the creation of the DataSet and is not inferred from the type of records stored in it. This means DataSets are not used in PySpark because Python is a dynamically-typed language.

{{< betonen gold >}}Know that what is true for an RDD is also true for a DataFrame, DataFrames are just organized into a columnar structure.{{< /betonen >}}
{{< betonen blue >}}
**Further Reading:**
- [RDDs, DataFrames, & DataSets compared](https://databricks.com/blog/2016/07/14/a-tale-of-three-apache-spark-apis-rdds-dataframes-and-datasets.html)
- [Pandas v. Spark DataFrames](https://medium.com/@chris_bour/6-differences-between-pandas-and-spark-dataframes-1380cec394d2)
- [Helpful RDD Documentation](https://jaceklaskowski.gitbooks.io/mastering-apache-spark/spark-rdd.html)
{{< /betonen >}}

**Transformations:** `Transformations` are one of the things you can do to an RDD in Spark. They are _lazy operations_ that create one or more new RDDs. It’s important to note that _Transformations create new RDDs because, remember, RDDs are immutable_ so they can’t be altered in any way once they’ve been created. So, in essence, Transformations take an RDD as an input and perform some function on them based on what Transformation is being called, and outputs one or more RDDs. Recalling the section on lazy evaluation, as a compiler comes across each Transformation, it doesn’t actually build any new RDDs, _but rather constructs a chain of hypothetical RDDs_ that would result from those Transformations which will only be evaluated once an Action is called. This chain of hypothetical, or “child”, RDDs, all connected logically back to the original “parent” RDD, _is what a lineage graph is_.

{{< betonen blue >}}
**Further Reading:**
- [Helpful Transformation Documentation](https://jaceklaskowski.gitbooks.io/mastering-apache-spark/spark-rdd-transformations.html)
- [More in-depth Documentation](https://data-flair.training/blogs/spark-rdd-operations-transformations-actions/)
{{< /betonen >}}

**Lineage Graph:** Most of what a lineage graph is was described in the Transformations and Actions sections, but to summarize, a lineage graph outlines what is called a _“logical execution plan”_. What that means is that the compiler begins with the earliest RDDs that aren’t dependent on any other RDDs, and follows a logical chain of Transformations until it ends with the RDD that an Action is called on. _This feature is primarily what drives Spark’s fault tolerance_. If a node fails for some reason, all the information about what that node was supposed to be doing is stored in the lineage graph, which can be replicated elsewhere.

{{< mermaid >}}
graph TD;
	a((r00)) --> c((r10));
	a((r00)) --> d((r11));
	a((r00)) --> e((r12));
	b((r01)) --> f((r13));
	b((r01)) --> e((r12));			
	c((r10)) --> g((r20));
	d((r11)) --> g((r20));
	e((r12)) --> g((r20));
	f((r13)) --> g((r20));
{{< /mermaid >}}

{{< betonen blue >}}**Further Reading:** [Helpful Lineage Documentation](https://jaceklaskowski.gitbooks.io/mastering-apache-spark/spark-rdd-lineage.html#logical-execution-plan){{< /betonen >}}

**Spark Applications and Jobs:** There is a lot of nitty gritty when it comes to how a processing engine like Spark actually executes processing tasks on a distributed system. The following is just as much as you’ll need to know in order to have a working understanding of what certain snippets of Spark code do. 
In Spark, when an item of processing has to be done, there is a “driver” process that is in charge of taking the user’s code and converting it into a set of multiple tasks. There are also “executor” processes, each operating on a separate node in the cluster, that are in charge of running the tasks, as delegated by the driver. Each driver process has a set of executors that it has access to in order to run tasks. A Spark application is a user built program that consists of a driver and that driver’s associated executors. A Spark job is task or set of tasks to be executed with executor processes, as directed by the driver. A job is triggered by the calling of an RDD Action. This stuff can be rather confusing, so don’t sweat it if it doesn’t make total sense at first, it’s just helpful to be familiar with these terms when they are implemented in code later on. I’ve included extra resources on this topic if you want more information.

{{< betonen blue >}}
**Further Reading:** 
- [Cluster Mode Overview from Spark API](https://spark.apache.org/docs/latest/cluster-overview.html)
- [Helpful Answer on StackOverflow](https://stackoverflow.com/questions/32621990/what-are-workers-executors-cores-in-spark-standalone-cluster)
- [Spark Application Overview on Cloudera](https://www.cloudera.com/documentation/enterprise/5-6-x/topics/cdh_ig_spark_apps.html)
{{< /betonen >}}

## Installing (Py)Spark
There are several ways to work with PySpark:

- [Google Colab](/posts/python/pyspark/installing-in-google-colab)
- Getting Started with PySpark and Jupyter
- How to install PySpark locally 
- How to use PySpark on your computer
- How to Get Started with PySpark


## Test Data Generator (Optional)
In this video we will put everything together.

So we will implement a small data simulator workflow which is simulating Node-RED running on an IoT device and publishing data through the IBM Watson IoT platform using the `MQTT protocol`. The IBM Watson IoT platform includes an `MQTT broker`, as a service with built in fault tolerance, load balancing and failover in over 50 IBM Data Centers spread around the globe.

Then again, using Node-RED, we'll subscribe to the data created by our virtual device. And finally, we will just stream the data into Apache CouchDB, so let's do it together one by one. So let's open the Node-RED instance you've created in week one and get rid of the sample flow by selecting it, and pressing the Delete key on your keyboard. Let's take flow1.js from the Coursera download page and open it using a text editor.

Select everything and paste it to Node-RED by clicking on the menu > Import > Clipboard.

Paste the flow from the JSON file to the text area, and click on Import.

Direct the flow to the panel.

Click on the + symbol to create a new panel for a new flow. We are now importing flow2.js. Again, we select and copy to the Clipboard and paste the flow to Node-RED. So the Cloudant connector should be configured to use the Cloudant database from your Node-RED application running on Bluemix. As long as the service dropdown is not empty you are fine. And on the Watson IoT Platform connector side, you basically define to subscribe to add data without filtering it by subscribing to certain device types, device IDs, or event names. Note how fast this is.

Once we activate the debug node, we will see test data generated by the test data generator. We'll have a look at this later. But basically, it is important to notice that this particular flow normally doesn't run in the cloud, but on an IoT device or gateway reading raw sensor data directly from the built-in sensors and transmitting those directly to the cloud. This is hypothetical sensor data coming from a washing machine. Let's deactivate the debug node and add one on the cloud side.

Now we can see the very same data, but now we are officially on the cloud and not pretending we are on an IoT device anymore.

We are currently streaming those data into Cloudant at the speed of more than one record per second.

So now let's have a brief look at the test data generator.

This inject node simulates a sensor node you would normally have on a IoT device. So for instance, on a Raspberry Pi, it would have a GPIO node.

This inject node creates a message every second, with some simulated sensor data concerning the fluid in the washing machine.

Every three seconds we create a message containing information on the voltage and frequency. And every five seconds we sample the actual speed of the motor. So now let's create some randomness. This is implemented in JavaScript and is beyond the course, but basically, we create data fluctuating around some average value, and certainly also at some odd values, which we are calling outliers.

We'll detect those during a later stage in the course.

We do the same for voltage and for the motor.

In addition, we add a timestamp to each message independently from which sensor it is generated.

Note that since Node-RED simply passes JSON objects between the nodes and JavaScript can access individual parts of the JSON object using a so-called OGN annotation, we can assign the timestamp to this JSON object in a very convenient way. Finally, we have to publish these messages via MQTT to the IBM Watson IoT Platform. Bluemix Service means that the credentials, in order to send messages to the IBM Watson IoT platform MQTT message broker are injected into the node via Cloud Foundry. And you basically don't have to care about them. So what we want to create from each message is a so-called Device Event. Device Events are meant to send sensor data upstream to the cloud.

Every IoT device has to have a type in order to correctly classify it. And every device needs a unique device ID. Event Type is a way to assign some sort of category to each message, which is used for subscribing to events. So, for example, we could publish events as alerts as well. And the downstream subscriber could only subscribe to alerts, basically ignoring status messages. So let's have a look at the Cloudant user interface to see whether the data we are storing actually arrives in the database. So we open the Bluemix user interface and scroll down to the Cloudant service which is bound to our Node-RED application. You can easily make autocorrect one since by default it has the same name as the URL of your application.

Now we click on LAUNCH in order to be taken to the Cloudant dashboard which is running outside of Bluemix. So let's click on washing, which is the database we are streaming data to. Now let's have a look at one single JSON document which represents one single sensor measurement.

You can see that this value is coming from a shaft sensor where the motor is attached to.

Now let's have a look at another measurement. This entry reflects a measurement from the current sensor, so we are mixing schemas here which is not a problem in NoSQL, but very tedious in the SQL database. In order to access Cloudant data on Apache Spark, we need to obtain the Cloudant credentials. So again, we enter the IBM Bluemix dashboard, click on our Node-RED application.

Now we want to check which services are bound to our application by clicking on Connections.

We see that there are three services bound to it. A relational database called dashDB, the IBM Watson IoT Platform, and the Cloudant service where we actually store our data in.

Therefore, we have to obtain the credentials of the database.

This is the username, this is the password and this is the host name. The database name is washing, as defined in the Node-RED flow. So now if we have all information to access the database from Apache Spark, so let's have a look how this works. So let's again have a look at the code from the previous video.

There are basically four parameters you have to specify when accessing Cloudant from Apache Spark using the Cloudant connector. Three of them, you have obtained in the previous step by directly accessing the user interface of IBM Bluemix. And the last one, you basically defined in the Cloudant connector node of Node_RED when providing the database name. This is the host name of Cloudant, as in the credentials. This is the username, and this is the password. This is the Cloudant database name. So let's sum this up. Of course, IoT data comes from IoT devices, where on many of them, Node-RED can be run as well. Therefore, it is easy and convenient to simulate test data also using Node-RED in the cloud. As we have seen, it is very easy and straightforward to stream these data to Cloudant or any other data store covered in the previous video of this week. The Apache Spark Cloudant connector makes it very easy to create the Apache Spark data frame out of a Cloudant database. And from there on, you have the full power of the Apache Spark data frame API, and can basically forget where your data resides on. So as you now know the basic tooling, let's dive into some math in order to lay the foundations to exploratory data analysis of IoT sensor data. This will be fun so let's get started.


