---
title: "Principal Components Analysis in PySpark"
date: 2020-05-27T19:50:37+02:00
series: ['pyspark', 'mllib']
tags: ['PCA']
categories: ['Python']
---

One cannot speaks about Principal Components Analysis (PCA) without mention the _curse of dimensionality_. The [curse of dimensionality](https://en.wikipedia.org/wiki/Curse_of_dimensionality) is a well recognized problem, which has to do with various phenomena that emerge when dealing with multi-dimensional data. The most well-know phenomena are:

- data becomes sparse as we add dimensions
- distance lose meaning in high dimensions

## Dimensionality Reduction

In order to alleviating _curse of dimensionality_, one common pratice is the use of _Dimensionality Reduction_ ([here](/posts/python/pyspark/dimensionality-reduction)), which is a term for different techniques.

One approach for _dimensionality reduction_ is the {{< color blue >}}feature selection{{< /color >}}, where one hand pick specific features that have special predictive power to give a good prediction for the target, instead of blindly using all features that are available.

{{< betonen gold >}}
Feature selection can be automated (e.g. using information gained from information theory) and it can also use domain knowledge (e.g. use of experts that can tell which attribute has sufficient predictive power for the problem in question).
{{< /betonen >}}

Another approach for _dimensionality reduction_ is the {{< color blue >}}feature reduction{{< /color >}} which generally uses all the features from the dataset to generate artificial features, which: (i) are smaller than the original set and (ii) retain as much information as possible. 

_Feature Reduction_ encompasses a list of different methods as:

- linear
	* Principal Component Analysis (PCA)
	* Linear Discriminant Analysis (LDA)
	* Canonical correlation analysis
	* Multi-dimensional scaling
- non-linear
	* Manifold learning (e.g. SOM, autoencoders, etc.)

## Principal Component Analysis

When we're doing classification we are interested in how far apart the points are, so the basic intuition behind PCA, as dimensionality reduction, is to find a {{< color >}}direction{{< /color >}} in this data set that {{< color >}}preserves{{< /color >}} most of the variance[^1] of all data points in relation to this direction (know as _principal component_). 

Once you have found this direction, the precise line(s) that preserves most of the variance, then what you can do is you can project your points onto this line(s) and use this line(s) as your new coordinate system. 

So, that's the idea of principle component analysis, you weld us the idea of dimensionality reduction using the direction of greatest variance. You find the first line that explains most of the variance then you keep looking for perpendicular lines to the previous one that explain what's left of the variance and you keep going until you reach the number of dimensions in the data set. 

## Application of PCA - an example
We will execute an example, following the follow steps:
1. Centre the data
	* compute the covariance matrix Ω
	* find the eigenvectors (principal components) and eigenvalues (explained variance) of Ω
2. Select new dimensions
3. Project the data

### using numpy
{{< tabs "numpyPCA" >}}
{{< tab "py" >}}
```python
from math import pi 
from math import sin 
import matplotlib.pyplot as plt 
import numpy as np 
import math 

### function to create correlated random variables
def correlatedVars(start=-10, stop=10, step=0.5, mu = 0, sigma = 3, func=lambda x: x): 
  x = np.arange(start, stop, step) 
  
  e = np.random.normal(mu, sigma, x.size) 

  y = np.zeros(x.size)

  for ind in range(x.size): 
    y[ind] = func(x[ind]) + e[ind] 
  
  return (x, y) 

def createScatter(vecA):

  f, ax = plt.subplots(figsize=(10,10))

  ax.scatter(vecA[:,0], vecA[:,1])
  ax.set_title("Original Data")
  ax.set_aspect('equal')
  ax.grid('True')

  plt.xlim([-5,5])
  plt.ylim([-4,4])

  plt.show() 

np.random.seed(100) 

(x1,x2) = correlatedVars(start = 2, stop = 4, step = 0.2, sigma = 2, func=lambda x: 2*math.sin(x))

A = np.column_stack((x1, x2))
print(A)

%matplotlib inline

### plot chart
createScatter(A)

### remove the mean, i.e. center the data
Aminus = (A - np.mean(A, axis=0))

### to compute the eigenvectors, eigenvalue
eigenvec, eigenval, v = np.linalg.svd(Aminus.T, full_matrices=False)

### eigenvectos, i.e. principal components (there 2, one for each feature)
print(eigenvec)

### the first eigenvector explains 80% of the total variance
print(eigenval)


### OPTIONAL
### TO PLOT DIRECTION WIHT DATA POINTS
x = []
y = []

for i in range(-4, 4):
  x.append(i)
  y.append(eigenvec[1,0]*i/eigenvec[0,0])  ### first direction
  # y.append(eigenvec[1,1]*i/eigenvec[0,1])  ### second direction  

f, ax = plt.subplots(figsize=(10,10))

ax.scatter(Aminus[:,0], Aminus[:,1])
ax.set_title("Original Data")
ax.set_aspect('equal')
ax.grid('True')

plt.xlim([-5,5])
plt.ylim([-4,4])

ax.plot(x, y, linestyle = '-')

### to plot the equivalent data point, in the direction
p0 = [x[0], y[0]]
p1 = [x[len(x)-1], y[len(x)-1]]

a = np.array([[p1[0]-p0[0], p1[1]-p0[1]],
              [p0[1]-p1[1], p1[0]-p0[0]]])

for i in range(0, len(Aminus)):
  q = Aminus[i]
  
  b = -np.array([-q[0]*(p1[0]-p0[0]) - q[1]*(p1[1]-p0[1]),
                 -p0[1]*(p1[0]-p0[0]) + p0[0]*(p1[1]-p0[1])])

  proj = np.linalg.solve(a, b)

  ax.plot(proj[0], proj[1], 'bo', markersize = 5, color = 'red')
  ax.plot((q[0], proj[0]), (q[1], proj[1]), linestyle='--', color='red')
``` 
{{< /tab >}}
{{< tab ">>" >}}
```
array([[ 2.        , -1.68093609],
       [ 2.2       ,  2.30235361],
       [ 2.4       ,  3.65699797],
       [ 2.6       ,  0.52613067],
       [ 2.8       ,  2.63261787],
       [ 3.        ,  1.3106777 ],
       [ 3.2       ,  0.32561105],
       [ 3.4       , -2.65116887],
       [ 3.6       , -1.26403255],
       [ 3.8       , -0.71371289]])

[[-0.14027773  0.9901122 ]
 [ 0.9901122   0.14027773]]

[6.19647908 1.61106079]
```
{{< /tab >}}
{{< /tabs >}}

### manually
The formula to calculate the covariance matrix: {{< katex >}} \Omega = (X'X)(N-1)^{-1} {{< /katex >}}

```python
Sigma = np.dot(Aminus.T, Aminus)/(Aminus.shape[0]-1)
print(Sigma)
"""
[[ 0.36666667 -0.55248919]
 [-0.55248919  4.18798554]]
"""
```
The covariance matrix Ω has one extremely useful property: 

{{< betonen blue >}}_If you take this matrix and multiply any random vector by it, this vector will be turned towards the direction of greatest variance._{{< /betonen >}} 

So if we take a random vector, e.g. `rndVec = [-1, 0]`, and multiply this vector by Ω, `rndVec` will be turned towards the direction of greatest variance.

{{< tabs "manualPCA" >}}
{{< tab "py" >}}
```python
Msg = 'vector slope is {att1}'

rndVec = np.array([-1, 0])
print(Msg.format(att1 = rndVec[1]/rndVec[0]))

for iT in range(0, 10):
  rndVec = np.dot(Sigma, rndVec)
  print('Iteration %s: ' %(iT+1) + Msg.format(att1 = rndVec[1]/rndVec[0]))
```
{{< /tab >}}
{{< tab ">>" >}}
```
vector slope is -0.0
Iteration 1: vector slope is -1.506788713184242
Iteration 2: vector slope is -5.723130518802521
Iteration 3: vector slope is -6.9491123233544405
Iteration 4: vector slope is -7.05074640383986
Iteration 5: vector slope is -7.057721896617808
Iteration 6: vector slope is -7.05819391426455
Iteration 7: vector slope is -7.058225823949076
Iteration 8: vector slope is -7.0582279809902895
Iteration 9: vector slope is -7.058228126802018
Iteration 10: vector slope is -7.0582281366586
```
{{< /tab >}}
{{< /tabs >}}

{{< betonen gold >}}
We can see that the random vector slope converges to `-7.058`, which is just the ratios of the eigenvectors, i.e.

<code style="color:black;background-color:rgba(255, 180, 0, 0.2);">eigenvec[1,0]/eigenvec[0,0]</code>
{{< /betonen >}}

Analytically, we can determine the eigenvalues through:

{{< katex display >}} det|\Omega - \lambda I| = 0 {{< /katex >}}

which results in a quadratic equation {{< katex >}} (s_{1,1} - \lambda)(s_{2,2} - \lambda) - s_{1,2}s_{2,1} = 0{{< /katex >}}, whose solution will give the 2 eigenvalues.

For dimensions higher than 2, we can solve it [using](https://en.wikipedia.org/wiki/Eigenvalue_algorithm):

{{< katex display >}} \Lambda = \frac{trace(\Omega) \pm \sqrt{trace(\Omega)^{2} - 4 det(\Omega)}}{2} {{< /katex >}}  

```python
### Eigenvalues
eval1 = (Sigma.trace() + np.sqrt(pow(Sigma.trace(), 2) - 4*np.linalg.det(Sigma)))/2
eval2 = (Sigma.trace() - np.sqrt(pow(Sigma.trace(), 2) - 4*np.linalg.det(Sigma)))/2 
### Eigenvectors using the Cayley-Hamilton Theorem (A - λlI)(A - λ2I) = 0
A1 = Sigma - eval1*np.identity(2)
A2 = Sigma - eval2*np.identity(2)
e1 = A2[:,1]
e2 = A1[:,0]
e1 = e1/np.linalg.norm(e1) ## normalized eigenvectors
e2 = e2/np.linalg.norm(e2) ## normalized eigenvectors
e = np.column_stack((e1, e2))

print("Eigenvalue 1: %s" %l1) # Eigenvalue 1: 4.266261447240239
print("Eigenvalue 2: %s" %l2) # Eigenvalue 2: 0.28839076171131417
print("Eigenvector 1: %s" %e[0]) # Eigenvector 1: [-0.14027773 -0.9901122 ]
print("Eigenvector 2: %s" %e[1]) # Eigenvector 2: [ 0.9901122  -0.14027773]
``` 
{{< betonen gold >}} We can see that both eigenvectors are perpendicular, since eigenvector1 x eigenvector2 = 0 {{< /betonen >}}

To project the new data using the eigenvectors:

```python
F1 = np.dot(A, e1) # using the first component
F2 = np.dot(A, e2) # using the second component
``` 
```
array([-1.94487078,  1.97097739,  3.28417174,  0.1562063 ,  2.21380943,
        0.87688479, -0.12649725, -3.1018989 , -1.75653386, -1.2397112 ])
```

[^1]: the classical definition of variance, i.e. the expected value of the square deviation from the mean.