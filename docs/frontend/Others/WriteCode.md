---
title: 手写代码
---

## 1 数组排序

### 1.1 冒泡排序

```js
function bubbleSort(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = 0; j < arr.length - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        let temp = arr[j]
        arr[j] = arr[j + 1]
        arr[j + 1] = temp
      }
    }
  }
  return arr
}
```

### 1.2 选择排序

```js
function chooseSort(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    let minIndex = i
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[minIndex] > arr[j]) {
        minIndex = j
      }
    }
    let temp = arr[i]
    arr[i] = arr[minIndex]
    arr[minIndex] = temp
  }
  return arr
}
```

### 1.3 插入排序

```js
function insertSort(arr) {
  for (i = 1; i < arr.length; i++) {
    prevIndex = i - 1
    current = arr[i]
    while (prevIndex >= 0 && arr[prevIndex] > current) {
      arr[prevIndex + 1] = arr[prevIndex]
      prevIndex--
    }
    arr[prevIndex + 1] = current
  }
}
```

## 2 实现防抖函数

> 防抖函数原理：在事件被触发 n 秒后再执行回调，如果在这 n 秒内又被触发，则重新计时

### 2.1 延迟执行

```js
const debance = (fun, wait) => {
  let timeId = null
  return (...args) => {
    if (timeId) clearTimeout(timeId)
    timeId = setTimeout(() => {
      fun.apply(fun, args)
    }, wait)
  }
}
```

### 2.1 先执行再延迟

```js
const debance = (fun, wait) => {
  let timeId = null
  return (...args) => {
    if (timeId) clearTimeout(timeId)
    let flag = !timeId
    timeId = setTimeout(() => {
      timeId = null
    }, wait)
    if (flag) fun.apply(fun, args)
  }
}
```

## 3 实现节流函数

> 节流函数原理:规定在一个单位时间内，只能触发一次函数。如果这个单位时间内触发多次函数，只有一次生效

### 3.1 定时器版本

```js
const throttle = (fun, wait) => {
  let timerId = null
  return (...args) => {
    if (!timerId) {
      timerId = setTimeout(() => {
        fun.apply(fun, args)
        timerId = null
      }, wait)
    }
  }
}
```

### 3.2 Date 版本

```js
const throttle2 = (fun, wait) => {
  let prev = new Date()
  return (...args) => {
    let now = new Date()
    if (now - prev > wait) {
      fun.apply(fun, args)
      prev = now
    }
  }
}
```

## 4 斐波那契数列

### 4.1 循环实现

```js
function fibonacci(n) {
  var res1 = 0
  var res2 = 1
  var sum = res2
  for (i = 1; i < n; i++) {
    sum = res2 + res1
    res1 = res2
    res2 = sum
  }
  return sum
}
```

### 4.2 递归实现

```js
function fibonacci(n) {
  if (n <= 1) return 1
  return fibonacci2(n - 1) + fibonacci2(n - 2)
}
```

### 4.3 递归+缓存（闭包）实现

```js
const fibonacci = (function(n) {
  let obj = {
    0: 1,
    1: 1
  }
  return function(n) {
    let ret = obj[n]
    if (ret) return ret
    ret = fibonacci3(n - 1) + fibonacci3(n - 2)
    obj[n] = ret
    return ret
  }
})()
```

## 5 匹配(){}[]

> 字符串只会出现"(",")","{","}","&#91;","&#93;"这 6 中字符，要求匹配如："&#40;&#91;&#93;&#41;","&#91;({})&#93;"等类似字符串

```js
function validBraces(str) {
  const reg = /\(\)|\[\]|\{\}/g
  while (reg.test(str)) {
    console.log(str)
    str = str.replace(reg, '')
  }
  return !str.length
}
```
