---
title: "Rename Files Within a Folder"
date: 2020-05-14T12:51:51+02:00
series: ['os']
tags: ['rename']
categories: ['Python']
---

Renaming files withing a folder is pretty straight forward with `.listdir()` to create a list with the paths of files and the `.rename()` method, both from the `os` module:

```python
import os

folderPath = 'C:/Users/ricar/Desktop/PyLab/Hugo/zucoden/content/posts/Python/PySpark' 

vFiles = os.listdir(folderPath)

for filepath in vFiles:
	os.rename(os.path.join(folderPath, filepath), os.path.join(folderPath, filepath[8:]))
```