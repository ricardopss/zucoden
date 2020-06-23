---
title: "1051 - Height Checker"	
date: 2020-05-29T17:28:46+02:00
series:
tags: ['leetcode', 'array', 'zip', 'sum', 'sorted']
categories: ['Python']
---

{{< betonen blue >}}source: https://leetcode.com/problems/height-checker{{< /betonen >}}

Students are asked to stand in non-decreasing order of heights for an annual photo.

Return the _minimum number of students_[^1] that must move in order for all students to be standing in non-decreasing order of height.

**Constraints:**
1 <= heights.length <= 100
1 <= heights[i] <= 100

{{< betonen gold >}}Notice that when a group of students is selected they can reorder in any possible way between themselves and the non selected students remain on their seats.{{< /betonen >}}

``` 
Example 1:
Input: heights = [1,1,4,2,1,3]
Output: 3

Explanation: 
Current array : [1,1,4,2,1,3]
Target array  : [1,1,1,2,3,4]
On index 2 (0-based) we have 4 vs 1 so we have to move this student.
On index 4 (0-based) we have 1 vs 3 so we have to move this student.
On index 5 (0-based) we have 3 vs 4 so we have to move this student.

Example 2:
Input: heights = [5,1,2,3,4]
Output: 5

Example 3:
Input: heights = [1,2,3,4,5]
Output: 0
``` 

## Solution
The key to solve this problem is to notice that the solution is really just the numbers of different elements between two lists: _given_ and _sorted_ 

```py
def heightChecker(self, heights):
    ### type heights: List[int]
    ### rtype: int
    j = 0
    for h in range(len(heights)):
        if heights[h] != sorted(heights)[h]:
            j +=1
    
    return j
```
A more cleaner solution is given using the lambda expression, realizing that the `True = 1`

```py
def heightChecker(heights):
	### :type heights: List[int]
	### :rtype: int
	return sum(h1 != h2 for h1, h2 in zip(heights, sorted(heights)))
```

[^1]: not moves