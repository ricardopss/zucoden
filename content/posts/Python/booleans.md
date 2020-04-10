---
title: "Booleans"
date: 2020-01-18T16:31:25+01:00
draft: false
tags: ['boolean', 'Logic']
categories: ["Python"]
---

Booleans are a built-in data type in Python. There are two boolean values: `True` and `False`.

```python
bool(VarName) = True  # for most of the values, exception:

bool(0) = False
bool('') = False

```

## Basic operations with booleans

```python
str(True) = 'True'
str(False) = 'False'

int(True) = 1
int(False) = 0
```
{{< betonen gold >}}
Note that `5 + int(True) = 6` and `10*False = 0`
{{< /betonen >}}