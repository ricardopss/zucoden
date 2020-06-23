---
title: "121 - Best Time to Buy and Sell Stock"	
date: 2020-05-29T17:28:46+02:00
series:
tags: ['leetcode', 'array']
categories: ['Python']
---
{{< betonen blue >}}source: https://leetcode.com/problems/best-time-to-buy-and-sell-stock{{< /betonen >}}

Say you have an array for which the ith element is the price of a given stock on day i.

If you were only permitted to complete at most one transaction (i.e., buy one and sell one share of the stock), design an algorithm to find the maximum profit.

**Note that you cannot sell a stock before you buy one.**

```
Example 1:
Input: [7,1,5,3,6,4]
Output: 5
Explanation: Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5.
             Not 7-1 = 6, as selling price needs to be larger than buying price.

Example 2:
Input: [7,6,4,3,1]
Output: 0
Explanation: In this case, no transaction is done, i.e. max profit = 0.
```

## Solution - brute the force
```python
def maxProfit(prices):
    """
    :type prices: List[int]
    :rtype: int
    """
    if prices == []:
    	return 0

    listProfit = []
    for p1 in range(len(prices)):
    	for p2 in range(p1+1, len(prices)):
    		if prices[p1] < prices[p2]:
    			listProfit.append(prices[p2]-prices[p1])

    return 0 if listProfit == [] else max(listProfit)
```

## Solution - loop over values
The solution consists of looping over the prices and at each price, updating the min. price and computing its profits based on this min. price.

The tricky part here is to initialize the minPrice value: obviously, we cannot choose `0` or `min(price)`, otherwise, the min. price will no update as we loop over the prices. The solution must be a price higher than the given ones. 

{{< tabs "Stock" >}}
{{< tab "py" >}}
```python
def maxProfit(prices):
    """
    :type prices: List[int]
    :rtype: int
    """
    if prices == []:
    	return 0

    buyPrice = max(prices) + 1 ### alternatives are: float('inf') or sys.maxint
    maxProfit = 0

    for p in prices:
    	buyPrice = min(p, buyPrice)
    	maxProfit = max(p - buyPrice, maxProfit) 

    return maxProfit
``` 
{{< /tab >}}
{{< tab ">>" >}}
```
e.g. for prices = [8, 6, 8, 1, 2, 1]

for t = 0: buyPrice = min(8, 9) = 8 | maxProfit(8 - 8, 0) = 0
for t = 1: buyPrice = min(6, 8) = 6 | maxProfit(6 - 6, 0) = 0
for t = 2: buyPrice = min(8, 6) = 6 | maxProfit(8 - 6, 0) = 2
for t = 3: buyPrice = min(1, 6) = 1 | maxProfit(1 - 1, 2) = 2
for t = 4: buyPrice = min(2, 1) = 1 | maxProfit(2 - 1, 2) = 2
for t = 5: buyPrice = min(1, 1) = 1 | maxProfit(1 - 1, 2) = 2

return 2
```
{{< /tab >}}
{{< /tabs >}}