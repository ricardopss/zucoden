---
title: "Difference between `is` and `==` operator"
date: 2020-05-16T22:36:50+02:00
series: 
tags:
categories: ['Python']
---

The `==` operator compares the values of both the operands and checks for value equality. Whereas `is` operator checks whether both the operands refer to the same object or not.

```python
list1 = [] 
list2 = [] 
list3 = list1 

### [1]  
if (list1 == list2): ### True
    print("True") 
else: 
    print("False") 

### [2]
if (list1 is list2): ### False
    print("True") 
else: 
    print("False") 
  
### [3]
if (list1 is list3): ### True
    print("True") 
else:     
    print("False") 
  
list3 = list3 + list2 
### [4]  
if (list1 is list3): ### False
    print("True") 
else:     
    print("False") 
```
* [1]: it is `True` because it both objects have the same value and type (i.e. both are empty lists).
* [2]: it is `False` because, though both are empty lists, they are at different memory locations.
* [3]: it is `True` because they are allocated at the same memory location (pointing at the same object).
* [4]: it is `False` because concatenation of two list is always produce a new list.
