---
title: "Building a Pop Up Message Window"
date: 2020-05-05T14:01:36+02:00
series: ['tkinter']
tags: ['tk', 'tkk', 'Tk']
categories: ["Python"]
---
To building a pop-up message window use the `tkinter` module

```python
import tkinter as tk
from tkinter import ttk

def popupMsg(stringMsg):
	styleFont = ("Verdana", 12)

	popup = tk.Tk()
	popup.wm_title("DNB") # window title
	
	popupLabel = ttk.Label(popup, text=stringMsg, font=styleFont)
	
	popupLabel.pack(side="top", fill="both", pady=50, padx=50)
		# side = top, bottom, left or right
		# pday/padx = size of window
		# fill: x, y or both 

	popupButtom = ttk.Button(popup, text="Confirm", command = popup.destroy)
	popupButtom.pack()
	
	popup.mainloop()
```

{{< betonen gold >}}
The _fill_ option tells the manager that the widget wants fill the entire space assigned to it. 
The value controls how to fill the space: x, y or both 

_both_ means that the widget should expand both horisontally and vertically, X means that it should expand only horisontally, and Y means that it should expand only vertically.



{{< /betonen >}}