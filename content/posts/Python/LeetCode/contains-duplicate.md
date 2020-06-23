---
title: "217 - Contains Duplicate"	
date: 2020-05-29T17:28:46+02:00
series:
tags: ['leetcode', 'array']
categories: ['Python']
---
{{< betonen blue >}}source: https://leetcode.com/problems/contains-duplicate{{< /betonen >}}

Given an array of integers, find if the array contains any duplicates.

Your function should return true if any value appears at least twice in the array, and it should return false if every element is distinct.

## Solution using hash table
A simple solution is using `set()`, which eliminates duplicates elements(keys). The solution in this approach would be given by returning `nums != list(set(nums))`. The problem is that `set()` changes the order of the element, therefore a _sorting_ by index is beforehand necessary.

```python
def containsDuplicate(nums):
    """
    :type nums: List[int]
    :rtype: bool
    """
    return nums != list(sorted(set(nums), key=nums.index))
```

## Solution looping over a sorted list
```python
def containsDuplicate(nums):
    """
    :type nums: List[int]
    :rtype: bool
    """
    sortedNum = sorted(nums)

    for i in range(len(sortedNum) -1):
    	if sortedNum[i] != sortedNum[i+1]:
    		pass
    	else:
    		return True

    return False
```

## Oficial solution
based on the size of array, since `set()` removes the duplicated elements.

```python
def containsDuplicate(nums):
    """
    :type nums: List[int]
    :rtype: bool
    """
    return len(set(nums)) != len(nums)
 ```