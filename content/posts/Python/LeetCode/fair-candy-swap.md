---
title: "888 - Fair Candy Swap"	
date: 2020-05-29T17:28:46+02:00
series:
tags: ['leetcode', 'array', 'set']
categories: ['Python']
---
{{< betonen blue >}}source: https://leetcode.com/problems/fair-candy-swap{{< /betonen >}}

Alice and Bob have candy bars of different sizes: A[i] is the size of the i-th bar of candy that Alice has, and B[j] is the size of the j-th bar of candy that Bob has.

Since they are friends, they would like to exchange one candy bar each so that after the exchange, they both have the same total amount of candy.  (The total amount of candy a person has is the sum of the sizes of candy bars they have.)

Return an integer array `ans` where `ans[0]` is the size of the candy bar that Alice must exchange, and `ans[1]` is the size of the candy bar that Bob must exchange.

If there are multiple answers, you may return any one of them.  It is guaranteed an answer exists.

**Note:**
1 <= A.length <= 10000
1 <= B.length <= 10000
1 <= A[i] <= 100000
1 <= B[i] <= 100000

It is guaranteed that Alice and Bob have different total amounts of candy.

It is guaranteed there exists an answer.

```
Example 1:
Input: A = [1,1], B = [2,2]
Output: [1,2]

Example 2:
Input: A = [1,2], B = [2,3]
Output: [1,2]

Example 3:
Input: A = [2], B = [1,3]
Output: [2,3]

Example 4:
Input: A = [1,2,5], B = [2,4]
Output: [5,4]
``` 

## Solution
Let `sumA` and `sumB` be the sum of all candies owned by Alice and Bob, respectively, then solution is given by solving the equality {{< katex  >}}\sum{a} - i + j = \sum{b} + i - j{{< /katex >}}, i.e.

{{< katex display >}}j = i + \frac{\sum{b}-\sum{a}}{2}{{< /katex >}}   

i.e. for each _i-size_ candy in Alice, search for a _j-size_ in Bob. 

```python
def fairCandySwap(A, B):
    """
    :type A: List[int]
    :type B: List[int]
    :rtype: List[int]
    """
    half = (sum(B) - sum(A))/2

    setB = set(B)

    for i in A:
        if i + half in setB:
        	return [i, i + half]
    return []
```


