---
title: "Installing PySpark in IBM Cloud"
date: 2020-05-01T18:34:42+02:00
series: ['pyspark']
tags: ['pip','install', 'SparkConf', 'SparkContext', 'sql']
categories: ["Python"]
---

To get Spark running in [IBM Cloud](https://www.ibm.com/cloud) run the following block of code:

{{< tabs "IBM" >}}
{{< tab "ibm-notebook" >}}
```html
!pip install pyspark 
``` 
{{< /tab >}}
{{< tab ">>" >}}
```
Collecting pyspark
  Downloading https://files.pythonhosted.org/packages/9a/5a/271c416c1c2185b6cb0151b29a91fff6fcaed80173c8584ff6d20e46b465/pyspark-2.4.5.tar.gz (217.8MB)
     |████████████████████████████████| 217.8MB 154kB/s  eta 0:00:01    |██████████▉                     | 74.1MB 38.3MB/s eta 0:00:04
Collecting py4j==0.10.7 (from pyspark)
  Downloading https://files.pythonhosted.org/packages/e3/53/c737818eb9a7dc32a7cd4f1396e787bd94200c3997c72c1dbe028587bd76/py4j-0.10.7-py2.py3-none-any.whl (197kB)
     |████████████████████████████████| 204kB 30.4MB/s eta 0:00:01
Building wheels for collected packages: pyspark
  Building wheel for pyspark (setup.py) ... done
  Stored in directory: /home/dsxuser/.cache/pip/wheels/bf/db/04/61d66a5939364e756eb1c1be4ec5bdce6e04047fc7929a3c3c
Successfully built pyspark
Installing collected packages: py4j, pyspark
Successfully installed py4j-0.10.7 pyspark-2.4.5
```
{{< /tab >}}
{{< /tabs >}}

For install a specific version, use:

```html
!pip install pyspark==2.4.5
```

{{< betonen red >}}
Apparently this code is still experimental, [source](https://github.com/IBM/skillsnetwork/blob/master/spark_setup_anaconda.ipynb)
{{< /betonen >}}

