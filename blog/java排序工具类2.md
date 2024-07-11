---
id: sortUtil2
slug: /sortUtil2
title: java排序工具类
date: 2024-07-11
tags: [工具]
keywords: [工具]
---

> 近日复习泛型相关知识，对之前的排序工具类进行了些许改进，添加了对list的支持同时将所有方法变为静态方法

```java

class MySort{
    // 列表默认从小到大排序,不逆序
    public static <T,E extends Comparable<E>> void sort(List<T> collection,Function<T,E> fn){
        sort(collection,fn,false);
    }

    // 数组默认从小到大排序,不逆序
    public static <T,E extends Comparable<? super E>> void sort(T[] arr, Function<T,E> function){
        sort(arr,function,false);
    }

    public static <T,E extends Comparable<E>> void sort(List<T> collection,Function<T,E> fn, boolean reverse){
        // 调用列表的排序方法
        collection.sort((o1, o2) -> {
            if (reverse) {
                return fn.apply(o2).compareTo(fn.apply(o1));
            } else {
                return fn.apply(o1).compareTo(fn.apply(o2));
            }
        });
    }

    public static <T,E extends Comparable<? super E>> void sort(T[] arr, Function<T,E> function, boolean reverse){
        // 调用数组的排序方法
        Arrays.sort(arr,(o1, o2)->{
            if(reverse){
                return function.apply(o2).compareTo(function.apply(o1));
            }else{
                return function.apply(o1).compareTo(function.apply(o2));
            }
        });
    }
}
```

