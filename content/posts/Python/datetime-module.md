---
title: "Datetime Module"
date: 2020-01-18T16:31:33+01:00
series: ['datetime']
tags: ['date', 'time', 'datetime']
categories: ['Python']
---

`datetime` is a module to work with clocks and calendar.

{{< tabs "Tab1" >}}
{{< tab "python" >}} 
```python
import datetime

dir(datetime)
```
{{< /tab >}}
{{< tab ">>" >}}
```
['MAXYEAR', 'MINYEAR', 
'__builtins__', '__cached__', '__doc__', '__file__', '__loader__', '__name__', '__package__', '__spec__', 
'date', 'datetime', 'datetime_CAPI', 'time', 'timedelta', 'timezone', 'tzinfo']
``` 
{{< /tab >}}
{{< /tabs >}}

Where `date`, `time`, `datetime` and `timedelta` are some of the main classes.

### `date` class

To create a date
{{< tabs "Tab2" >}}
{{< tab "python" >}} 
```python
import datetime as dt

data_zB = dt.date(2016, 3, 15) # year, month, day

print(data_zB)
print(data_zB.year)
print(data_zB.month)
print(data_zB.day)
```
{{< /tab >}}
{{< tab ">>" >}} 
```
2016-03-15  
2016
3
15
```
{{< /tab >}}
{{< /tabs >}}

The main methods and attributes in `date` class are:

```
['__add__', '__class__', '__delattr__', '__dir__', '__doc__', '__eq__', '__format__', '__ge__', '__getattribute__', '__gt__', '__hash__', '__init__', '__init_subclass__', '__le__', '__lt__', '__ne__', '__new__', '__radd__', '__reduce__', '__reduce_ex__', '__repr__', '__rsub__', '__setattr__', '__sizeof__', '__str__', '__sub__', '__subclasshook__', 
'ctime', 'day', 'fromordinal', 'fromtimestamp', 'isocalendar', 'isoformat', 'isoweekday', 'max', 'min', 'month', 'replace', 'resolution', 'strftime', 'timetuple', 'today', 'toordinal', 'weekday', 'year']

```

### `time` class
To create a time stamp
{{< tabs "Tab3" >}}
{{< tab "python" >}} 
```python
import datetime as dt

time_zB = dt.time(13, 25, 15) # hour, minute, seconds

print(time_zB)
print(time_zB.hour)
print(time_zB.minute)
print(time_zB.second)
```
{{< /tab >}}
{{< tab ">>" >}} 
```
13:25:15  
13
25
15
```
{{< /tab >}}
{{< /tabs >}}

The main methods and attributes in `time` class are:  
```
['__class__', '__delattr__', '__dir__', '__doc__', '__eq__', '__format__', '__ge__', '__getattribute__', '__gt__', '__hash__', '__init__', '__init_subclass__', '__le__', '__lt__', '__ne__', '__new__', '__reduce__', '__reduce_ex__', '__repr__', '__setattr__', '__sizeof__', '__str__', '__subclasshook__', 
'dst', 'fold', 'hour', 'isoformat', 'max', 'microsecond', 'min', 'minute', 'replace', 'resolution', 'second', 'strftime', 'tzinfo', 'tzname', 'utcoffset']
```

### `datetime` class
The `datetime` class combines both `date` and `time` classes. 

{{< tabs "Tab4" >}}
{{< tab "python" >}} 
```python
import datetime as dt

launch_date = dt.datetime(2016, 3, 15, 13, 25, 15) # year, month, date, hour, minute, second

print(launch_date)
print(launch_date.year)
print(launch_date.month)
print(launch_date.day)
print(launch_date.hour)
print(launch_date.minute)
print(launch_date.second)
```
{{< /tab >}}
{{< tab ">>" >}} 
```
2016-03-15 13:25:15
2016
3
15  
13
25
15
```
{{< /tab >}}
{{< /tabs >}}

### access current datetime
To access the current datetime, use the `today()` method from the `datetime` class.

{{< tabs "Tab5" >}}
{{< tab "python" >}} 
```python
import datetime as dt

today_date = dt.datetime.today()
```
{{< /tab >}}
{{< tab ">>" >}} 
```
2020-01-19 09:22:51.040010
```
{{< /tab >}}
{{< /tabs >}}

{{< betonen red >}}
Note that `today()` date format returns also the microseconds (`datetime.microsecond`).

For diferent dateformats, see [documentation](https://docs.python.org/3/library/datetime.html#strftime-and-strptime-format-codes)
{{< /betonen >}}

### display date in differents formats

Suppose that we want to display a date following Day-name, Month-name Day-#, Year:

There are 2 ways to execute this taks:

#### use the `strftime`[^2] method:
{{< tabs "Tab6" >}}
{{< tab "python" >}} 
```python
import datetime as dt

some_date = '1/31/1956'
print(some_date.strftime("%A, %B %d, %Y"))
```
{{< /tab >}}
{{< tab ">>" >}} 
```
Tuesday, January 31, 1956
```
{{< /tab >}}
{{< /tabs >}}

#### create a string with a format
{{< tabs "Tab7" >}}
{{< tab "python" >}} 
```python
import datetime as dt

some_date = dt.date(1956, 1, 31)
msg = 'GVR was born on {:%A, %B %d, %Y}.' # attention to colon after the {
print(msg.format(some_date))
```
{{< /tab >}}
{{< tab ">>" >}} 
```
GVR was born on Tuesday, January 31, 1956.
```
{{< /tab >}}
{{< /tabs >}}

### Some Date formats code:

|Directive|Meaning|Example|
|:-|:-|:-|
|%a|Weekday as locale’s abbreviated name.|Mon|
|%A|Weekday as locale’s full name.|Monday|
|%w|Weekday as a decimal number, where 0 is Sunday and 6 is Saturday.|1|
|%d|Day of the month as a zero-padded decimal number.|30|
|%-d|Day of the month as a decimal number. (Platform specific)|30|
|%b|Month as locale’s abbreviated name.|Sep|
|%B|Month as locale’s full name.|September|
|%m|Month as a zero-padded decimal number.|9|
|%-m|Month as a decimal number. (Platform specific)|9|
|%y|Year without century as a zero-padded decimal number.|13|
|%Y|Year with century as a decimal number.|2013|
|%H|Hour (24-hour clock) as a zero-padded decimal number.|7|
|%-H|Hour (24-hour clock) as a decimal number. (Platform specific)|7|
|%I|Hour (12-hour clock) as a zero-padded decimal number.|7|
|%-I|Hour (12-hour clock) as a decimal number. (Platform specific)|7|
|%p|Locale’s equivalent of either AM or PM.|AM|
|%M|Minute as a zero-padded decimal number.|6|
|%-M|Minute as a decimal number. (Platform specific)|6|
|%S|Second as a zero-padded decimal number.|5|
|%-S|Second as a decimal number. (Platform specific)|5|
|%f|Microsecond as a decimal number, zero-padded on the left.|0|
|%z|UTC offset in the form +HHMM or -HHMM (empty string if the the object is naive).||
|%Z|Time zone name (empty string if the object is naive).||
|%j|Day of the year as a zero-padded decimal number.|273|
|%-j|Day of the year as a decimal number. (Platform specific)|273|
|%U|Week number of the year (Sunday as the first day of the week) as a zero padded decimal number. All days in a new year preceding the first Sunday are considered to be in week 0.|39|
|%W|Week number of the year (Monday as the first day of the week) as a decimal number. All days in a new year preceding the first Monday are considered to be in week 0.|39|
|%c|Locale’s appropriate date and time representation.|Mon Sep 30 07:06:05 2013|
|%x|Locale’s appropriate date representation.|41547|
|%X|Locale’s appropriate time representation.|0,295891203703704|
|%%|A literal '%' character.|%|

**Note:** Examples are based on `datetime.datetime(2013, 9, 30, 7, 6, 5)`


### convert strings to datetimes
To convert strings to datetimes use `strptime()`[^1] method 

{{< tabs "Tab8" >}}
{{< tab "python" >}} 
```python
import datetime as dt

moon_landing = '7/20/1969'
moon_landing_date = dt.datetime.strptime(moon_landing, "%m/%d/%Y")
print(moon_landing_date)
print(type(moon_landing_date))
```
{{< /tab >}}
{{< tab ">>" >}} 
```
1969-07-20 00:00:00
<class 'datetime.datetime'>
```
{{< /tab >}}
{{< /tabs >}}
### some basic operations with `timedelta`

The `timedelta` class allows to add (+)/subtract(-) a delta, in days, from a specific datetime.

{{< tabs "Tab9" >}}
{{< tab "python" >}} 
```python
import datetime as dt

some_date = dt.date(1956, 1, 31)
delta_date = dt.timedelta(100) # + add 100 days, - subtract 100 days
print(some_date + delta_date)
print(some_date - delta_date)
```
{{< /tab >}}
{{< tab ">>" >}} 
```
1956-05-10
1955-10-23
```
{{< /tab >}}
{{< /tabs >}}

[^1]: `strptime` short from _string parse time_.
[^2]: `strftime` short from _string format time_.