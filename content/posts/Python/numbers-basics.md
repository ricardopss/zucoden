---
title: "Numbers Basics"
date: 2020-01-18T16:31:22+01:00
draft: false
tags: ['numbers', 'float', 'int', 'complex']
categories: ['Python']
---

In Python 3 there are 3 types of numbers: `int`, `float`, `complex`.

```python
a = 496 # int type
b = 3.4 # float type
c = 3 + 5j # complex type
```

{{< betonen gold >}}
`int` are narrower than `floats`  

`floats` are narrower than `complex`
{{< /betonen >}}

### to convert numbers types in different types
```python
a_float = float(a) # int -> float 
b_int = int(b) # float -> int
b_complex = complex(b) # float -> complex
```
{{< betonen red >}}
`complex` cannot be converted in narrower type (`int`, `float`).  
{{< /betonen >}}

### arithmetic operations
**Rule of thumb**: when combining two numbers of different type, Python converts the narrower type into the wider and then perform the operation. z.B.

 - (+): `int` + `float` -> `float`
 - (-): `int` + `float` -> `float`
 - (x): `int` x `float` -> `float`
 - (/): `int`/`int` -> `float` 
 - (/): `complex`/`float` -> `complex` 

{{< betonen gold >}}
From the basic notation:    
 - 16 // 5 returns the quotient (i.e. 3)  
 - 16 % 5 returns the remainder (i.e. 1)   

Note that even if there is no remainder, `int`/`int` gives a `float` type.
{{< /betonen >}}
 