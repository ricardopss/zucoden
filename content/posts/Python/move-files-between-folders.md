---
title: "Move Files Between Folders"
date: 2020-06-12T20:33:40+02:00
series: ['os', 'shutil']
tags: ['listdir', 'move']
categories: ['Python']
---

For example, we have a folder (`folderOrigin`) with MP3 files and we want to move the files to another folder (`folderDestin`). To execute this task, use the method `.move()`, from the {{< code gold >}}shutil{{< /code >}} module:

```python
from os import listdir
from os.path import isfile, join
import shutil

folderOrigin = 'C:/Users/ricar/AppData/Roaming/Anki2/User 1/collection.media/'
folderDestin = 'C:/Users/ricar/Desktop/AnkiAudio/'

listFiles = [f for f in listdir(folderOrigin)]

for f in listFiles:
	if f[-3:] == 'mp3':
		shutil.move(folderOrigin + f, folderDestin + f)
	else:
		pass
```