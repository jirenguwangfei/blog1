1.Object(1)将数字类型转化为数字对象；
 
  Object(sss)可以将字符串转化为字符串对象；
    
  Object()转化为空对象；
    
  new Object()依旧为空对象。

2.string()把其他类型转化为字符串类型；
   
  new string()则是生成string对象。

3.Number()把其他类型转化为Number类型;
    
  new Number()则是生成Number对象。

4.Boolean()把其他类型转化为ture or false;
  
  以下五个值为false：‘’，NaN, undefined ,null ,0;
  
  其余均为ture。
    
  new Boolean(）生成布尔值对象

***5. Array用于构造数组的全局对象。
    
    var a = Arraay(3)返回的是数组长度 a.length = 3;
        var a = Arraay(3,3)返回值a则是
        '0':3;
        '1':3;
        length:2
    （*不一致性）

   var a = new Array(3)返回的依旧是数组长度 a.length = 3;
   
   Array是否添加new属性，结果是相同的。

6.new Function的用法
  
  例子：
  
    var f = function(a,b){
        return a + b
    }
    等价于
    var f = new Function('a','b','return a+b')

7.function 关键字  if else var 也是关键字
  
  Function 全局对象

  var声明一个变量
  var a = 1
  
  function 声明一个函数
  function f(){}

  window.Object
  window.Function

  字符串string
  
  声明一个String(*没有小写这种类型）
  
  var s = new String()

8.共用属性--proto--
    
    公用属性( to String, value of )里含有
    String.prototype; Array.prototype; Function.prototype
    String.prototype( .trim() .split() )     *字符串类型
    Array.prototype( .push() .pop() .shift() .join() ) *数组类型
    Function.prototype( .call() .bind() .apply() )

9.数组与对象的区别
    
    数组的--proto--要指向共用对象Array.prototype，再指向Object.prototype
    而对象._proto_ ===函数.prototype

10.arguments伪数组
    function f(){
        console.dir(arguments)
    }
    f(1,2,3) ->
    0:1
    1:2
    2:3
    length:3

11.forEach() 方法对数组的每个元素执行一次提供的函数。
    
    var array1 = ['a', 'b', 'c'];
    
    array1.forEach(function(element) {
      console.log(element);
    });

    // expected output: "a"
    // expected output: "b"
    // expected output: "c"

       
       
       
       
     array.forEach(callback(currentValue, index, array){
        //do something
     }, this)

    array.forEach(callback[, thisArg])
    //callback
    //为数组中每个元素执行的函数，该函数接收三个参数：
    //currentValue(当前值)
    //数组中正在处理的当前元素。
    //index(索引)
    //数组中正在处理的当前元素的索引。
    //array
    //forEach()方法正在操作的数组。
    //thisArg
    //可选参数。当执行回调 函数时用作this的值(参考对象)。

12.


    ->function forEach(array,x){
        for(let i=0; i<array.length; i++){
            x(array[i], i)
        }
    }
    <-  undefined

    > forEach(['a', 'b', 'c'], function(value, key){
            console.log(value, key)
      })
        a 0
        b 1
        c 2
    <-  undefined
    
    > var a = ['a', 'b', 'c'];
            a.forEach(function(value, key){
            console.log(value, key)
      }
        a 0
        b 1
        c 2
    <-  undefined

13.join

    a = [1, 2, 3]
    a.join(',')
    <- "1, 2, 3"

14.concat(联结合并多个字符串)

    var a = [1,2,3]
    var b = [4,5,6]
    a.concat (b)
     <- [1,2,3,4,5,6]

    var a = [1,2,3]
    var b = a.concat([])
    得到b = [1,2,3]
    *此处a === b 为false

15.map功能与forEach功能相同，但是具有返回值

    a = [1,2,3]
    a.forEach(function(){})
    <-  undefined

    a.map(function(value, key)){
        return value *2
    }
    <-  [2,4,6]

16.reduce求和

    a = [1,2,3,4,5,6,7,8,9]
    a.reduce(function(sum, n){
        return sum + n
    }, 0)
    <-  45
    
    或者
    a.reduce((sum, n)=> sum + n ,0)
    <-  45