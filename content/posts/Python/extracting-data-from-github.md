---
title: "Extracting Data From Github"
date: 2020-05-15T10:35:53+02:00
series: ['os']
tags: ['cmd', 'data'] 
categories: ["Python"]
---

To clone a Github locally, use the cmd:

{{< tabs "GitHub" >}}
{{< tab "shell" >}}
```python
!git clone https://github.com/wchill/HMP_Dataset.git 
!ls HMP_Dataset/Brush_teeth

### under Python environment
import os

filesFolder = os.listdir('HMP_Dataset')
print(filesFolder) 

### to access a spefic folderName, use once more the os.listdir()
dataFolder = os.listdir('HMP_Dataset/folderName') ### e.g. Standup_chair

for datafiles in dataFolder:
	print(datafiles)
``` 
{{< /tab >}}
{{< tab ">>" >}}
```
Cloning into 'HMP_Dataset'...
remote: Enumerating objects: 865, done.
remote: Total 865 (delta 0), reused 0 (delta 0), pack-reused 865
Receiving objects: 100% (865/865), 1010.96 KiB | 2.29 MiB/s, done.

Accelerometer-2011-04-11-13-28-18-brush_teeth-f1.txt
Accelerometer-2011-04-11-13-29-54-brush_teeth-f1.txt
Accelerometer-2011-05-30-08-35-11-brush_teeth-f1.txt
Accelerometer-2011-05-30-09-36-50-brush_teeth-f1.txt
Accelerometer-2011-05-30-10-34-16-brush_teeth-m1.txt
Accelerometer-2011-05-30-21-10-57-brush_teeth-f1.txt
Accelerometer-2011-05-30-21-55-04-brush_teeth-m2.txt
Accelerometer-2011-05-31-15-16-47-brush_teeth-f1.txt
Accelerometer-2011-06-02-10-42-22-brush_teeth-f1.txt
Accelerometer-2011-06-02-10-45-50-brush_teeth-f1.txt
Accelerometer-2011-06-06-10-45-27-brush_teeth-f1.txt
Accelerometer-2011-06-06-10-48-05-brush_teeth-f1.txt

['Standup_chair', 'Climb_stairs', 'README.txt', 'impdata.py', 'Eat_soup', '.git', 'Eat_meat', 'final.py', 'Descend_stairs', 'Sitdown_chair', 'Drink_glass', 'Comb_hair', '.idea', 'Use_telephone', 'Pour_water', 'Getup_bed', 'Liedown_bed', 'Brush_teeth', 'Walk', 'MANUAL.txt']

Accelerometer-2011-04-11-13-28-18-standup_chair-f1.txt
Accelerometer-2011-04-11-13-29-54-standup_chair-f1.txt
Accelerometer-2011-05-30-08-35-11-standup_chair-f1.txt
Accelerometer-2011-05-30-09-36-50-standup_chair-f1.txt
Accelerometer-2011-05-30-10-34-16-standup_chair-m1.txt
Accelerometer-2011-05-30-21-10-57-standup_chair-f1.txt
Accelerometer-2011-05-30-21-55-04-standup_chair-m2.txt
Accelerometer-2011-05-31-15-16-47-standup_chair-f1.txt
Accelerometer-2011-06-02-10-42-22-standup_chair-f1.txt
Accelerometer-2011-06-02-10-45-50-standup_chair-f1.txt
Accelerometer-2011-06-06-10-45-27-standup_chair-f1.txt
Accelerometer-2011-06-06-10-48-05-standup_chair-f1.txt
```
{{< /tab >}}
{{< /tabs >}}

