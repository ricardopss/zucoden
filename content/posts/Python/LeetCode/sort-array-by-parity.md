---
title: "905 - Sort Array By Parity"	
date: 2020-05-29T17:28:46+02:00
series:
tags: ['leetcode', 'array', 'sorted', 'enumerate']
categories: ['Python']
---
{{< betonen blue >}}source: https://leetcode.com/problems/sort-array-by-parity{{< /betonen >}}

Given an array A of non-negative integers, return an array consisting of all the even elements of A, followed by all the odd elements of A.

You may return any answer array that satisfies this condition.

**Note:**
- 1 <= A.length <= 5000
- 0 <= A[i] <= 5000

```
Example 1:
Input: [3,1,2,4]
Output: [2,4,3,1]

The outputs [4,2,3,1], [2,4,1,3], and [4,2,1,3] would also be accepted.
```

## Solution
{{< betonen red >}}do not use `set()` as sets are just like dictionaries and, therefore, they eliminate eventuall equal numbers(keys){{< /betonen >}}

```python
def sortArrayByParity(A):
	"""
	:type A: List[int]
	:rtype: List[int]
	"""
	return [x for x in A if x % 2 == 0 ] + [x for x in A if x % 2 == 1 ]
```

## Solution - brute force
```python
def sortArrayByParity(A):
	"""
	:type A: List[int]
	:rtype: List[int]
	"""
	lenA = len(A)
	sortedA = {}
	e, o = 0, 0

	for k,i  in enumerate(A):
		if i % 2 == 0:
			sortedA.update({e:i})
			e +=1
		else:
			sortedA.update({lenA - o - 1:i})
			o += 1

	return [y for (x,y) in sorted(sortedA.items())]
```
