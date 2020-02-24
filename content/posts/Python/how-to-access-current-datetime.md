---
title: "How to Access Current Datetime"
date: 2020-01-18T16:31:45+01:00
series: ['datetime']
tags: ['date', 'time']
categories: ['Python']
---

To access the current datetime, use the `today()` method from the `datetime` class from the `datetime` module.

{{< tabs "Uniqueid" >}}
{{< tab "python" >}} 
```python
import datetime as dt

today_date = dt.datetime.today()
print(today_date)
print(today_date.year)
print(today_date.month)
print(today_date.day)
print(today_date.hour)
print(today_date.minute)
print(today_date.second)
print(today_date.microsecond)

```
{{< /tab >}}
{{< tab ">>" >}}
```
2020-01-19 09:22:51.622819
2020
1
19
9
22
51
622819
```
{{< /tab >}}
{{< /tabs >}}

{{< betonen gold >}}
Note that `today()` date format returns also the microseconds (`datetime.microsecond`). 
{{< /betonen >}}

###Some date formats code:

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

For diferent dateformats, see [documentation](https://docs.python.org/3/library/datetime.html#strftime-and-strptime-format-codes)
