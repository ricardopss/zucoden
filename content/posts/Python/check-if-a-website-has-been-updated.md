---
title: "Check if a website has been updated"
date: 2020-05-05T16:05:31+02:00
series: ['bs4', 'requests', 'time']
tags: ['web scrapping', 'html', 'xml', 'beautiful soup', 'find', 'find_all', 'parents']
categories: ["Python"]
---

To check if a website has changed/updated, one must to consider the following steps:
1. definition of update (including which parts of HTML should be monitored)
2. time frequency for monitoring
3. rule to alert for future updates (sound, email, popup window, etc.) 

{{< mermaid >}}
graph LR;
	A("definition of<br/>website update")-- monitoring -->B("frequency:<br>5min, 1hr, 24hrs?");
	B("frequency:<br>5min, 1hr, 24hrs?")-- alert -->C("sound (music, bip)?<br>e-mail?<br>pop-up window?");
{{< /mermaid >}}

E.g., using the monitoring of the [Deutsche Nationalbibliothek](https://www.dnb.de/DE/Home/home_node.html). 

```python
from bs4 import BeautifulSoup
import requests
import winsound
import datetime as dt
import tkinter as tk
from tkinter import ttk
import time

def webScrapping():

	sUrl = 'https://www.dnb.de/SiteGlobals/Forms/DNBWeb/Veranstaltungsuebersicht/Veranstaltungsuebersicht_Formular.html?cl2Location_Ortsangabe=frankfurtammain&cl2Categories_Typ=reservierungf'
	mainPage = BeautifulSoup(requests.get(sUrl).content, 'html.parser')

	listPages = mainPage.find_all('div', {'class':'small-12 large-6 columns'})
	listDates = ['20200513', '20200514', '20200515', '20200516', '20200517', '20200518', '20200519', '20200520', '20200521', '20200522', '20200523', '20200524', '20200525', '20200526', '20200527', '20200528', '20200529', '20200530', '20200531']

	for date in listPages:
		### [1] criteria for update (check if new dated pages were added)
		stringDate = date.a.get('href')[date.a.get('href').rfind("/")+1:date.a.get('href').rfind("/")+9]

		if stringDate not in listDates:
			pass
		else:
			### [3] Alert methods: sound & pop-up msg
			frequency = 2500  # Set Frequency To 2500 Hertz
			duration = 1000  # Set Duration To 1000 ms == 1 second
			winsound.Beep(frequency, duration)
			popupMsg(stringDate)
			break

def popupMsg(sDatum):
	styleFont = ("Verdana", 10)

	popup = tk.Tk()
	popup.wm_title("DNB")
	
	label = ttk.Label(popup, text="%s is available.\n\n%s" % (sDatum, dt.datetime.today()), font=styleFont)
	label.pack(side="top", fill="both", pady=50, padx=50)
	
	B1 = ttk.Button(popup, text="Confirm", command = popup.destroy)
	B1.pack()
	
	popup.mainloop()

### [2] time frequency: 
### code started at 16h, end at 21h, i.e. 6 hours of execution, at 5min interval = 6 x 12 (= 1hr/5min) = 72  
for t in range(0, 72):
	webScrapping()
	time.sleep(300) # 5min
```


