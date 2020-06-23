---
title: "Applied AI With Deeplearning"
date: 2020-06-05T16:04:32+02:00
series: 
tags: ['deep learning']
categories: ['Python']
---

## Foundations on Neural Networks and DeepLearning

### Deep Feedforward Neural Networks
Simplest form of a neural network is a Perceptron, where:

FIGU

### Convolutional Neural Networks

### Recurrent Neural Networks

### Auto encoders and Representation Learning

### Methods for Neural Network training

### Gradient Descent Updater Strategies

### How to choose the correct activation function

### The bias-variance tradeoff in Deep Learning

## Deep Learning Frameworks

### Tensorflow
TensorFlow is an open-source library in numerical computation using data flow graphs (every numerical computation is a graph, and the actions are performed by tensors)

It allows us to express ML and DL algorithms and prints along an execution engine, which allows these algorithms to run at scale on multiple nodes in a cluster backed by CPUs, GPUs, TPU's and mobile devices.

TensorFlow has a couple of built in datasets, .e.g we will use a complex Python object called MNIST.

```python
import tensorflow.compat.v1 as tf
tf.disable_v2_behavior()

(train_images, train_labels), (test_images, test_labels) = tf.keras.datasets.mnist.load_data()

print(train_images.shape) # (60000, 28, 28) i.e. 60000 images with 784 pixels (28 x 28)

%matplotlib inline
import matplotlib.pyplot as plt
import random

random.seed(100)
rnd = random.randint(0,60001)

img = train_images[rnd].reshape([28,28])
plt.gray()
plt.imshow(x, cmap='gray')
``` 

### Keras



### Apache SystemML

### PyTorch





