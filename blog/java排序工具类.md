---
id: sortUtil
slug: /sortUtil
title: java排序工具类
date: 2024-03-31
tags: [工具]
keywords: [工具]
---

由于在写算法题时发现java的排序方法需要传入比较器，比较器又是通过返回正数负数0来判断大小，理解起来比较抽象，遂突发奇想，制作一个java排序工具类，仿照python里面的排序函数，对java的排序进行封装
```java
public class Main {
    public static void main(String[] args){
        SortObj[] arr = new SortObj[]{
                new SortObj(1,"aaa"),
                new SortObj(4,"bbb"),
                new SortObj(-1,"ccc")
        };
        MySort<SortObj, Integer> mySort = new MySort<>( );

        mySort.sort(arr, SortObj::getVal, false);
        System.out.println(Arrays.deepToString(arr) );

        mySort.sort(arr, SortObj::getVal, true);
        System.out.println(Arrays.deepToString(arr) );

        MySort<SortObj, String> mySort2 = new MySort<>( );

        mySort2.sort(arr, SortObj::getName, false);
        System.out.println(Arrays.deepToString(arr) );

        mySort2.sort(arr, SortObj::getName, true);
        System.out.println(Arrays.deepToString(arr) );
    }
}

class SortObj{
    private int val;
    private String name;

    public int getVal() {
        return val;
    }

    public void setVal(int val) {
        this.val = val;
    }

    public SortObj(int val){this.val = val; }
    public SortObj(){}

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public String toString() {
        return "SortObj{" +
                "val=" + val +
                ", name='" + name + '\'' +
                '}';
    }

    public SortObj(int val, String name) {
        this.val = val;
        this.name = name;
    }
}

class MySort<T,E extends Comparable<E>>{
    public void sort(T[] arr, Function<T,E> function, boolean reverse){

        Arrays.sort(arr,(o1,o2)->{
            if(reverse){
                return function.apply(o2).compareTo(function.apply(o1));
            }else{
                return function.apply(o1).compareTo(function.apply(o2));
            }
        });
    }
}
```

