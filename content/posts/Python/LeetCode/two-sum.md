---
title: "1. Two Sum"
date: 2020-05-29T17:28:46+02:00
series:
tags: ['leetcode', 'array', 'enumerate', 'index']
categories: ["Python"]
---
Given an array of integers, return indices of the two numbers such that they add up to a specific target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

```
Example: 

Given nums = [2, 7, 11, 15], target = 9,

Because nums[0] + nums[1] = 2 + 7 = 9,

return [0, 1].
``` 

## brute force approach
Loop through each element of `nums` and find if there is another value that equals to `target - num[i]`.

```python
	def twoSumBrute(sel, nums, target):
		"""
		: type nums: List[int]
		: type target: int
		: rtype: List[int]
		"""
		for i in range(len(nums)):
			for j in range(i + 1, len(nums)):
				if nums[i] + nums[j] == target:
					return [i, j]
					break
				else:
					pass
		return "No Two Sum Solution"

vec = [0, 3, 5, 7, 9, 11]

print(Solution().twoSum(vec, 12)) ## [1, 4]
```

## Hash Table approach
Find the solution by mapping the list into a dictionary, using `.enumerate()` 

{{< tabs "TwoSum" >}}
{{< tab "py" >}}
```python
class Solution(object):
	def twoSum(sel, nums, target):
		"""
		: type nums: List[int]
		: type target: int
		: rtype: List[int]
		"""
		for i, v in enumerate(nums):
			if target - v in nums[i+1:]:
				return [i, nums[i+1:].index(target - v) + i + 1]
				break

		return 0  


### TESTING
Msg = "The vector is {att1} and for Target = {att2} the solution is {att3}"

iT = 0 
while iT < 20:
	vec = [random.randint(1, 10) for i in range(5)]
	target = random.randint(2, 10)
	sol = Solution().twoSum(vec, target)
	if sol != 0:
		iT += 1
		print(Msg.format(att1 = vec, att2 = target, att3 = sol))
	else:
		pass
``` 
{{< /tab >}}
{{< tab ">>" >}}
```
The vector is [5, 4, 9, 5, 6] and for Target = 9 the solution is [0, 1]
The vector is [8, 1, 2, 5, 7] and for Target = 7 the solution is [2, 3]
The vector is [4, 7, 9, 1, 2] and for Target = 3 the solution is [3, 4]
The vector is [3, 5, 9, 1, 7] and for Target = 4 the solution is [0, 3]
The vector is [2, 5, 7, 1, 8] and for Target = 7 the solution is [0, 1]
The vector is [5, 6, 9, 1, 2] and for Target = 7 the solution is [0, 4]
The vector is [2, 5, 4, 3, 5] and for Target = 9 the solution is [1, 2]
The vector is [3, 6, 1, 3, 9] and for Target = 7 the solution is [1, 2]
The vector is [5, 7, 2, 1, 8] and for Target = 6 the solution is [0, 3]
The vector is [10, 1, 5, 7, 4] and for Target = 9 the solution is [2, 4]
The vector is [8, 3, 6, 5, 1] and for Target = 9 the solution is [0, 4]
The vector is [1, 10, 8, 4, 5] and for Target = 6 the solution is [0, 4]
The vector is [6, 3, 1, 3, 1] and for Target = 7 the solution is [0, 2]
The vector is [9, 1, 8, 2, 3] and for Target = 9 the solution is [1, 2]
The vector is [2, 4, 2, 8, 6] and for Target = 8 the solution is [0, 4]
The vector is [4, 1, 6, 4, 6] and for Target = 10 the solution is [0, 2]
The vector is [3, 9, 8, 2, 6] and for Target = 10 the solution is [2, 3]
The vector is [10, 2, 2, 2, 6] and for Target = 8 the solution is [1, 4]
The vector is [6, 4, 4, 1, 2] and for Target = 7 the solution is [0, 3]
The vector is [10, 1, 8, 9, 2] and for Target = 3 the solution is [1, 4]
[Finished in 0.9s]
```
{{< /tab >}}
{{< /tabs >}}


