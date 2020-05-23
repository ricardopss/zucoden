---
title: "Add Time Delays to Code"
date: 2020-05-05T14:46:35+02:00
series: ['time']
tags: ['sleep']
categories: ["Python"]
---

There are several ways one can add time delay to execute a code

## Adding a Python sleep call With `time.sleep()`

```python
import time

stringText = "1, 2, 3, 4, 5"

for el in stringText.split(','):
	print(el.strip()) 	# to remove the empty before/after spaces 
	time.sleep(3) 		# Sleep for 3 seconds
```

{{< betonen red >}}
**Attention:** the <code style="color:black;background-color:rgba(255, 0, 0, 0.2);">.sleep()</code> method consider _seconds_, not _microseconds_.
{{< /betonen >}}
