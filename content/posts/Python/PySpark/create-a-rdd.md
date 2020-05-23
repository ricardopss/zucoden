---
title: "Create a RDD using `parallelize()`"
date: 2020-02-23T21:12:48+01:00
series: ['pyspark']
tags: ['RDD', 'parallelize', 'collect']
categories: ["Python"]
---

The `.parallelize()` method is the main method to create a RDD.

{{< tabs "Create a collection" >}}
{{< tab "py" >}} 
```python
x = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] # collection of numbers (nbr)

x_nbr_rdd = sc.parallelize(x)

print(type(x_nbr_rdd))
```
{{< /tab >}}
{{< tab ">>" >}}
```
<class 'pyspark.rdd.RDD'>
``` 
{{< /tab >}}
{{< /tabs >}}

{{< betonen gold >}}
The <code style="color:black;background-color:rgba(255, 180, 0, 0.2);">.parallelize()</code> method returns no value (since it is a _transformation_ and not an _action_). Spark just recorded how to create the RDD.
{{< /betonen >}}

Another method to create a RDD is the [`.textFile()`](/posts/python/pyspark/create-a-rdd-from-file) 

## convert RDD to Python-list
The simplest way to convert an RDD to a Python list is using the `.collect()` method:

```python
rddRange = sc.parallelize(range(100))
listRange = rddRange.collect() 

print(type(rddRange)) 	## <class 'pyspark.rdd.PipelinedRDD'>
print(type(listRange))	## <class 'list'>
```

See also [Converting Dataframes to RDDs](/posts/python/pyspark/converting-dataframes-to-rdds)

## Create a RDD from a file in Github
Following the procedures to [clone a Github](/posts/python/extracting-data-from-github), we can create a RDD using the `.textFile()`, just like [here](/posts/python/pyspark/create-a-rdd-from-file).

{{< tabs "GitHub" >}}
{{< tab "py" >}}
```python
!git clone https://github.com/wchill/HMP_Dataset.git 
!ls HMP_Dataset/Brush_teeth

### under Python environment
import os

filesFolder = os.listdir('HMP_Dataset')
print(filesFolder)

textfile_rdd = sc.textFile("HMP_Dataset/impdata.py")
textfile_rdd.take(20) 
```
{{< /tab >}}
{{< tab ">>" >}}
```
['import os',
 'import numpy as np',
 'from collections import defaultdict',
 'from sklearn.cluster import KMeans',
 'import matplotlib.pyplot as plt',
 '',
 'all_arrays = defaultdict(list)',
 'for dirname in os.listdir("."):',
 '\tif not os.path.isdir(dirname): continue',
 '\tfor filename in os.listdir(dirname):',
 '\t\tif filename.startswith("."): continue  # Edit added 12/7',
 '\t\t#print "Loading in: ", dirname + os.sep + filename',
 '\t\tarray = np.loadtxt(dirname + os.sep + filename)',
 ' \t\tall_arrays[dirname].append(array)',
 '',
 'all_the_z = list() #initialize another list to hold all the zbarprimes (step 4 in your notes)',
 'k = 1',
 'for arraylist in all_arrays.values():  # Each "value" in the dictionary is a list of arrays',
 '\tfor array in arraylist:',
 '\t\tflattened = array.flatten()']
```
{{< /tab >}}
{{< /tabs >}}

