---
title: "Reverse Integer"
date: 2020-05-31T14:44:33+02:00
series:
tags: ['leetcode', 'string', 'array']
categories: ["Python"]
---

Given a 32-bit signed integer, reverse digits of an integer.

```
Example 1:

Input: 123
Output: 321
Example 2:

Input: -123
Output: -321
Example 3:

Input: 120
Output: 21
```
{{< betonen gold >}}
Assume we are dealing with an environment which could only store integers within the 32-bit signed integer range: [−2^31,  2^31 − 1]. For the purpose of this problem, _assume that your function returns 0 when the reversed integer overflows_.
{{< /betonen >}}

## reverse using string
The problem must consider both positive/negative numbers and the possibility that the reverse number has more than 32-bit.

The string conversion has the advantages that we can simply reverse it by `string[::-1]` 

```python
def reverse(x):
	reverseInt = int(str(abs(x))[::-1])
    
	if reverseInt >= 2**31 - 1 or - reverseInt <= -2**31:
		return 0
	else:
		return reverseInt if x > 0 else - reverseInt 

A = -101010990
B = 987654321
C = 999999999999999
print(A, reverse(A)) ### -101010990 -99010101
print(B, reverse(B)) ###  987654321  123456789
print(C, reverse(C)) ###  999999999999999  0
``` 