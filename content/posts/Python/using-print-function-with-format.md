---
title: "Using ``print`` function with format"
date: 2020-01-09T14:17:48+01:00
draft: false
tags: ['string', 'print', 'format']
categories: ['Python']
---

```python
stringMessage = "There are two types of people in the world. One that {att1} and others that {att2}."

print(stringMessage.format(att1 = "plays to win", att2="play not to lose"))
print(stringMessage.format(att1 = "prefers to be right alone", att2="prefer to be wrong with the majority"))
```
Will produce:

```
There are two types of people in the world. One that plays to win and other that plays not to lose.
There are two types of people in the world. One that prefers to be right alone and others that prefer to be wrong with the majority.
```  

Note that the position of the variable `att1` or `att2` will not change the `string`.

We can also print a formated string without variables. In this case, the position of the variable is important e.g.

```python
stringMessage = "There are two types of people in the world. One that {0} and others that {1}."

print(stringMessage.format("plays to win", "play not to lose"))
print(stringMessage.format("prefers to be right alone", "prefer to be wrong with the majority"))
```

