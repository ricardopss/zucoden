---
title: "Parallel Data Processing Strategies of Apache Spark"
date: 2020-05-02T19:57:35+02:00
series: ['pyspark']
tags: ['data science', 'nosql', 'objectstorage']
categories: ["Python"]
---

ApacheSpark (AS) is one of the most exciting developments in Data Science since the last decade.

When we talk about AS, we talk about a {{< code gold >}}Java Virtual Machine (JVM){{< /code >}}. The underlying execution engine in As is written in `Scala`.

Let's consider your data analysis application is running on a single JVM, and therefore is limited to the resources a single node provides.

if we want to use large compute clusters but still don't want to take care of parallelizing our programs, AS kicks in. 

Let's turn our single node JVM application into a so called driver program which is not involved in any computations anymore, but only managing remote _Compute Nodes_ (we call those Compute Nodes the `Worker Nodes`). And those remote Worker Nodes at JVM is running, and {{< color blue >}}they are responsible for executing your parallel version of your analytics workflow{{< /color >}}.

Of course, multiple JVM instances can be started on the Worker Nodes. _As a rule of thumb, one JVM per available CPU core._

Since the driver only talks to multiple remote JVM's it basically doesn't matter on which Worker Node it resides.

But what about the data ? Doesn't it matter that the data resides?

Basically there are two options for attaching to an ApacheSpark cluster. The simplest one is using an **off node storage approach**, where the third system is attached to the cluster using a fast network connection.

In case high out bandwidth is needed a certain type of network technology called switching fabric is used which guarantees the maximum network performance between the storage system and the worker nodes. In this course, we will only use this topology. But there's another option.

You can simply attach hard drives directly to the worker nodes.

This is called the JBOD approach, Just a Bunch Of Discs, or sometimes this approach is called directly attached storage.

In order to retrieve the combined storage capacity of all disks as one large virtual file system, we have to add a software component to the cluster.

This component is called HDFS which stands for Hadoop Distributed File System.

Note that HDFS is not compliant. You can't mount it to an operating systems, file system tree. In contrast, rest API's are used to interact with this file system, but there's also a command line lined.

Let's consider a file, too big to fit on a single disk.

What we have to do then is divide it in equal size chunks and distribute them over the physical disks.

This is where HDFS comes into play.

HDFS creates a virtual view on top of those chunks so that it can be treated as a single large file spanning the whole cluster.

One advantage of the technology is data locality. Since HDFS is aware of the location of individual chunks of the file, computations can be done in parallel using CPU's residing on the same physical worker node. The central first class citizen in the ApacheSpark is the so called Resilient Distributed Dataset RDD.

It is a distributed immutable collection or list data. RDDs can be typed so for example only containing strings or double values and they are created from existing data from different sources like HDFS, ObjectStore, NoSQL or SQL databases or simply files on a local file system.

Once an RDD is created, it resides distributed in the main memory of the different worker nodes.

When the aggregated main memory of all the worker nodes is not sufficient, then data gets split to disk.

Finally, RDDs are lazy. That means only if the data is really needed for a certain computation, it is read from the underlying storage system, otherwise not.

Let's have a look at ApacheSpark from a developer's perspective. We use the IBM Data Scientist Workbench, also called DSX, which is tightly connected to IBM BLuemix so all store services, for instance, running in BLuemix are accessible from DSX. DSX is basically an ApacheSpark as a service, that's a user interface based on the so called Jupiter Notebooks which you can see here.

Let's create an RDD using Python. The spark context available in the SC variable can be used to create RDDs from any type of source including lists and arrays which in most cases only make sense for demo purposes. But best in the play button, the code in the selected frame gets executed. Now we have created an RDD from a list of integers ranging from zero to 99. This RDD is lazy. Unless we execute a function on the RDD API, nothing will happen on the ApacheSpark cluster.

Let's call the count function.

This triggers the execution of a spark trip which gets divided into individual spark tasks. Those spark tasks are executed in parallel on the cluster using this spark executor JVMs. Now let's look at the first ten elements of this RDD.

As expected, we get a list from 0 to 9.

Finally, we copy the complete contents of the list to the local ApacheSpark driver JVM using the collect function. Note that you should do this only for very small RDDs, otherwise your driver JVM will crash with an out of memory error.

Other programming becomes easy when using ApacheSpark because when using the RDD API you simply can't write non parallel programs.

It doesn't matter how much data you process, the program always stays the same. RDD provides the central API for achieving this. And you don't have to worry about data and task distribution. ApacheSpark will handle this for you.

Fortunately using ApacheSpark neither forces you to use a JVM language like Scaler of Java.




## Programming language options on ApacheSpark

|criteria\language|Scala|Java|R|Python|
|:-|:-|:-|:-|:-|
|Spark API|complete|complete|very limited|limited|
|Ease of use|low|very low|high|very high|
|Speed|very high|high|very low|low|
|3rd party libs|few|few|many|many|


{{< expand >}}


{{< /expand >}}

{{< expand "Code" >}}
One of the main discussions developers usually have in their coffee breaks is about what's the best programming language and framework for supporting their particular projects?

Such discussions are less prominent among data scientists. The general understanding is that R and Python are the languages at present, and Scala and Julia are the languages of the future. The prefered framework is ApacheSpark, a framework already used in this course. So let's have a look at the programming language options and why we have chosen Python for this course. ApacheSpark is a fast and general engine for big data processing with built in modules for streaming, SQL, machine learning, and graph processing.

One thing to notice is that ApacheSpark itself has been implemented in Scala. It runs on top of the java virtual machine, but fortunately this fact doesn't limit us to implementing Spark only in Scala. In fact, currently there are bindings for Java, Scala, Python and ever R.

So with ApacheSpark, we generally have the choice among the most prominent languages R and Python.

So let's have a brief look at each option and provide you with some support for such decisions in the future.

Scala is the defector standard when it comes to ApacheSpark.

Every ApacheSpark API is supported in Scala. And Scala code normally runs faster than all other options.

Let's see what our first example looks like when using Scala, instead of Python. Remember that the example just invokes basic functions on the RDD API.

This is a good example to compare the languages because it demonstrates using the RDD API from different languages. We start Scala effort by creating a jupiter notebook in the data science workbench.

Choose any name and choose Scala as the programming language.

Click on Create Notebook.

Now, you have a new and empty notebook ready to write ApacheSpark applications in Scala.

Once again we creat an RBD, a resilient distributive data set. In Scala you have to use the val key work, which tells tally that a constant variable is defined.

In a SpacheSpark, RBD is used in the same was the c s object us used in Python. SC stands for Spark Context and it is used to create an oddity from an array or any other supported data source. And here is the main synthetic difference between the two languages. In Scala, the generation of an array ranging from 0 to 100 looks a bit different than in Python.

Let's run the code. Since Spark uses lazy evaluation this doesn't take long.

Now, we count the number of elements. Rdd.count gives back the value of 100 as answer.

There are 100 elements in the array. Rdd.take with a parameter of 10 to just take the first 10 elements. Or rdd.collect to copy the whole contents of this rdd to the Spark driver.

Until now, everything looks quite similar. The difference becomes more noticeable when you use external libraries like Num Py, which provide Python with powerful access to matrix and vector operations, which is lacking in ApacheSpark. This is beyond the scope of this topic.

So let's have a look at Java. Java is definitely not a primary choice of data scientists because of the overhead of Java syntax.

But when using ApacheSpark the same complete set of API is available for Java as it is for Scala. Java is also the de-factor standard in Enterprise IT. So if you are not in academic research of blocking for strata you most probably will have to use the Java on some point or another.

Finally, Java is the programming language of Hadoop which cause the de-factor standard for big data processing before a patches back came into play. So let's see our simple example and how to implement it in Java. We are in an Eclipse environment. For our Java application, the first thing to do is creating a new class.

Within the class, we actually create a Spark configuration, which can be used to create a Spark context.

So now, let's create the spa context out of the spa configuration object, using a java context implementing the context interface. Now we are ready to create an RDT. Java is strongly typed so we have to declare the type of the RDT as well as the type of the contents of the RDT we are intending to create. Now, it's time to create an array containing integers from 0 to 99, but unfortunately there is no way to do this in Java inline. Therefore, we will create an empty list and loop in order to fill the list with integers from 0 to 99. The oddity is type integer, the oddity is now ready to be used, let's start with the count part.

Now let's get the first 10 records. And conclude with a call to the collect method to copy all contents of the oddity vector out of travel venture machine. Note, that in Java return values of method calls are not automatically printed to stand out as contributor notebooks. Therefore, we have to add an additional command to achieve this.

Let's do this for all three commands.

Now, we are ready to run this class on an ApacheSpark cluster.

R is THE Data Science programming language.

But, there is only a subset of the ApacheSpark API available to R Despite the newest academic research. An academic research is basically the main contributor of more than 8,000 add-on packages. R has awesome plotting and charting libraries, which are simply outstanding.

But R is one of the slowest programming languages I've ever seen. As long as you're using R only to execute computations on ApacheSpark this won't be a problem. But as soon as you mix and match local and parallel computations, you will notice the limitations of the language. Once again let's create a new notebook in the IBM data science experience tool.

Provide a name for the notebook, select R as the programming language. Finally, click on create notebook.

Let's again create an RDD from an array ranging from 0-99. Running the application, let's count the number of elements. Take the first 10 RDD elements using R.

You have already seen the Python example in the IBM Data Science Workbench. Let me highlight a few more reasons as to why we have chosen Python for the course and why it is the preferred language for data scientists. Python is nearly as widely used in Data Science as R. But, from a developers point of view, Python is much more common, and, in case you neither know Python, or R, you will have an easier learning Python than R.

The same holds for Skyler in Java, with the additional disadvantage that, among Data Scientists, those languages are less widely used.

Again, not all APIs of ApacheSpark have bindings for Python, but for this course, this will not limit us.

Python has a very nice plotting library called matplotlib, which we are going to use. But it can't compete with the plotting capabilities you find in R. Finally, Python is an interpreted language and that can get slow sometimes, especially when used in conjunction with ApacheSpark since a lot of inter-process memory copying is taking place.

This decision matrix summarizes some of the key considerations and how they're address by each language in order to help you decide on the best programming language to use in your own projects.

Scala and Java have complete API support with the ApacheSpark. So in case you want, for example, to use a craft processing engine for draft x, there is no way of using it in our Python. In contrast to R and Python, Scala and Java are more complex to learn. As you have seen Java is a very language and in my opinion you should only it if theres no other choice. Python and R on the other hand are very easy to use and interpret. This is specially cruel for python but R can also be learned in a very short timeframe Java and Scala usually perform better than R and Python. Scala is one of the fastest languages and is only surpassed by C and C++. When it comes to third party libraries that support data signs that tries on the java virtual machine is still limited although catching up.

So, for example indy for J and indy for S are provided the functionality of the famous python, non pi library but for say we R and Python, in contrast, are very rich in libraries that support a data scientist.

And in Python, the famous pandas, NumPy, and SciPy libraries are commonly used among data scientists. But unfortunately, all those libraries are not parallelized. So unless you are using the ApacheSpark API you are only running on a single machine.

So in the next video, we'll get our hands dirty and actually learn how to compute on oddities using the oddity functional programming API in order to 
create distributed parallel data processing chops.

One of the main discussions developers usually have in their coffee breaks is about what's the best programming language and framewo: Added to 
{{< /expand >}}