---
title: "Making a Beep Noise"
date: 2020-05-05T13:54:00+02:00
series: ['winsound']
tags:
categories: ["Python"]
---

To code the computer to produce a beep sound on Windows, use the `winsound` with the `.Beep()` method:

```python
freq = 2500  # Set Frequency To 2500 Hertz

dur = 1000  # Set Duration to 1000 ms (microseconds) == 1 second

winsound.Beep(freq, dur)
```