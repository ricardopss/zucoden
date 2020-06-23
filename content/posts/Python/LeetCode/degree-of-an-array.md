---
title: "697 - Degree of an Array"	
date: 2020-05-29T17:28:46+02:00
series:
tags: ['leetcode', 'array']
categories: ['Python']
---
{{< betonen blue >}}source: https://leetcode.com/problems/degree-of-an-array{{< /betonen >}}

Given a non-empty array of non-negative integers nums, the degree of this array is defined as the {{< color blue >}}maximum frequency of any one of its elements{{< /color >}}.

Your task is to find the smallest possible length of a (contiguous) subarray of nums, that has the same degree as nums.

**Note:**
nums.length will be between 1 and 50,000.
nums[i] will be an integer between 0 and 49,999.

```
Example 1:
Input: [1, 2, 2, 3, 1]
Output: 2

Explanation: 
The input array has a degree of 2 because both elements 1 and 2 appear twice.
Of the subarrays that have the same degree:
[1, 2, 2, 3, 1], [1, 2, 2, 3], [2, 2, 3, 1], [1, 2, 2], [2, 2, 3], [2, 2]

The shortest length is 2. So return 2.

Example 2:
Input: [1,2,2,3,1,4,2]
Output: 6
```
