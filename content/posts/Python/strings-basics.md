---
title: "Strings Basics"
date: 2020-01-18T16:31:17+01:00
draft: false
tags: ['strings', 'print']
categories: ["Python"]
---

There are 3 methods to create a **`str()`** object in Python:

## 1st method: using 'string'
```python
msg = 'Hello world!'
```
## 2nd method: using "string"
```python
msg = "Hello world!"
```

## 3rd method: using """string"""
```python
msg = """Hello world!"""
```
{{< betonen gold >}}
The option to create strings with both `'` and `"` allow to create strings objects with quotes marks, z.B.

`msg = "I'm ready!"`  
`msg = 'There is "nothing" here.'`  
`msg = """... and then he said: "I don't mind helping him.". No one believes him."""`  
{{< /betonen >}}

**Obs:** one can also create a string using the escape character `\'`, z.b.
```python
msg = 'I\'m ready!'
```
## Operations with string

Python can perform basics arithmetics operations using strings:

```python
print(5*'s')
print('Ich bin' + 'lustig')
``` 
```
sssss   
Ich bin lustig
```

### main functions of str()

```
dir(str())
>
[...
'capitalize', 'casefold', 'center', 'count', 'encode', 'endswith', 'expandtabs', 'find', 'format', 'format_map', 'index', 'isalnum', 'isalpha', 
'isdecimal', 'isdigit', 'isidentifier', 'islower', 'isnumeric', 'isprintable', 'isspace', 'istitle', 'isupper', 'join', 'ljust', 'lower', 'lstrip', 
'maketrans', 'partition', 'replace', 'rfind', 'rindex', 'rjust', 'rpartition', 'rsplit', 'rstrip', 'split', 'splitlines', 'startswith', 
'strip', 'swapcase', 'title', 'translate', 'upper', 'zfill'
]
```