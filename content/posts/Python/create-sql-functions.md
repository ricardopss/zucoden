---
title: "Create SQL Functions"
date: 2020-02-21T18:23:17+01:00
series: ['pyspark']
tags: ['registerFunction', 'sql', 'cast', 'show']
categories: ["Python"]
---

SQL queries can be runned through functions. Once a function is declared, it muss be registered as an SQL function with the `.registerFunction()` method:

{{< tabs "SQL Functions" >}}
{{< tab "py" >}}
```python
def simpleFunction(v):
    return int(v * 10)

### test the function
print(simpleFunction(3))

sqlContext.registerFunction("simple_func", simpleFunction)

query = """
select
    ID,
    VAL1,
    VAL2,
    simple_function(cast(VAL1 as int)) as s_VAL1,
    simple_function(cast(VAL2 as int)) as s_VAL2
from
 	randomTable1
"""
sqlContext.sql(query).show()
``` 
{{< /tab >}}
{{< tab ">>" >}}
```
30

<function __main__.simple_function>

+---+----+----+------+------+
| ID|VAR1|VAR2|s_VAR1|s_VAR2|
+---+----+----+------+------+
|  1|   6|   4|    60|    40|
|  2|   5|   7|    50|    70|
|  3|   2|   0|    20|     0|
|  4|   9|  11|    90|   110|
|  5|   4|   6|    40|    60|
|  8|   6|   4|    60|    40|
|  9|   2|   0|    20|     0|
+---+----+----+------+------+
```
{{< /tab >}}
{{< /tabs >}}

{{< betonen gold >}}
Attention to the `cast()` function since string is the default data type for columns in Spark DataFrames.

Cast the values in the VAL1 and VAL2 columns to integers before using the SQL function, otherwise it will returned a formated table:

|index|ID|VAR1|VAR2|s_VAR1|s_VAR2|
|:-|:-|:-|:-|:-|:-|
|0|	1|	6|	4|	6666666666|	4444444444|
|1|	2|	5|	7|	5555555555|	7777777777|
|2|	3|	2|	0|	2222222222|	0|
|3|	4|	9|	11|	9999999999|	11111111111111111111|
|4|	5|	4|	6|	4444444444|	6666666666|
|5|	8|	6|	4|	6666666666|	4444444444|
|6|	9|	2|	0|	2222222222|	0|

{{< /betonen >}}