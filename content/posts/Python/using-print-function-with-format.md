---
title: "Using ``print`` function with format"
date: 2020-01-09T14:17:48+01:00
draft: false
tags: ['strings', 'print', 'format']
categories: ['Python']
---

{{< tabs "Uniqueid" >}}
{{< tab "python" >}}  
```python
stringMessage = "There are two types of people in the world. One that {att1} and others that {att2}."

print(stringMessage.format(att1 = "plays to win", att2="play not to lose"))
print(stringMessage.format(att1 = "prefers to be right alone", att2="prefer to be wrong with the majority"))
```
{{< /tab >}}
{{< tab ">>" >}}
```
There are two types of people in the world. One that plays to win and other that plays not to lose.
There are two types of people in the world. One that prefers to be right alone and others that prefer to be wrong with the majority.
```  
{{< /tab >}}
{{< /tabs >}}
