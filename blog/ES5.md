ES5

ES5新语法主要是体现在Object和、Array操作,同时涉及到JSON、 Function、Date 和 String类型上。

1.Object

ES5最大的特点是对象扩展很多方法。

新建对象：create（ 新建一个"干净"的对象，这里的“干净”指的是没有原型链。）
语法：Object.create(proto, [ propertiesObject ]);
proto是一个对象，作为新创建对象的原型。
如果 proto 参数不是 null 或一个对象值，则抛出一个 TypeError 异常。null表示没有原型对象(这样就创建了一个”干净的对象”) 
propertiesObject 是一个对, 它有4个值和两个函数，分别是：

value : 设置属性的值
writable : 布尔值,设置属性是否可以被重写,默认属性值为false(不能被重写)
enumerable : 布尔值,设置属性是否可以被枚举,默认属性值为false(不能被枚举)
configurable : 布尔值,设置属性是否可以被删除，默认属性值为false(不能被删除)
    
两个函数：

get : 函数,设置属性返回结果
set : 函数,有一个参数
get和set的用法

注意：这个是用来获取和设置属性的值，它不能与writable用在一起，否则就报错，如下：

    function defineGetter(obj, name, getter) {
      Object.defineProperty(obj, name, {
        configurable: true,
        enumerable: true,
        get: getter
      });
    }; 
    var req = {};
    defineGetter(req, 'xhr', function xhr(){
      var val = 'xmlhttprequestx' || '';
      return val.toLowerCase() === 'xmlhttprequest';
    });
    console.log(req.xhr);  
    //false


设置属性：defineProperty(0bj)和设置多个属性defineProperties（Obj)。

冻结对象：

   seal(obj)  对应：   Object.isSealed
   
   freeze(obj)对应： Object.isFrozen（除了seal(obj)之外，其中的属性值也不能修改，即:writable:false,configureable:false);

遍历属性：

   Object.getOwnPropertyNames

   Object.keys
   keys是列出所有enumerable为true的值，用它可以方便判断一个对象是否是空对象。如

（options.meta && Object.keys(options.meta).length）？“options非空”:options为空对象

又如：

    var obj = {
        "x":"y",
        "x1":"y1"
    };
    var keys = Object.keys(obj);
    console.log(keys);
    //["x","x1"]  


而getOwnPropertyNames为列出所有defineProperty方法设置的值。

    var obj ={"attr1":"xyz"};
    Object.defineProperty(obj,'type',{
           value: "建设银行",
           enumerable: false,
           configurable: true,
           writable: false
       });
    var getPro = Object.getOwnPropertyNames(obj);
    console.log(getPro); //["attr1","type"]
    Object.keys(obj);// ["attr1"]

    Object.defineProperty(obj,'type',{
           value: "建设银行",
           enumerable: true,
           configurable: true,
           writable: false
       });
    var getPro = Object.getOwnPropertyNames(obj);
    console.log(getPro); //["attr1","type"]
    Object.keys(obj);// ["attr1","type"]

 
锁住对象

　 Object.preventExtensions(O) 对应Object.isExtensible：

   方法用于锁住对象属性，使其不能够拓展，也就是不能增加新的属性，但是属性的值仍然可以更改，也可以把属性删除，Object.isExtensible用于判断对象是否可以被拓展。

    var o = {};
    console.log(Object.isExtensible(o));   //true
    o.lastname ="yinlei";
    Object.preventExtensions(o);
    console.log(Object.isExtensible(o));   //false
    console.log(o.lastname);                  //yinlei
    o.firstname="liu";
    console.log(o.firstname);                //undefined
    delete o.lastname;                        
    console.log("lastname="+o.lastname);   //undefined   


   Object.getOwnPropertyDescriptor(O,property)
   这个方法用于获取defineProperty方法设置的property 特性。

    var account = Object.create(Object.prototype,{
       type: {
           value: "建设银行",
           enumerable: false,
           configurable: false,
           writable: false
       }
       });
    var getPro = Object.getOwnPropertyDescriptor(account,'type');
    console.log(getPro);
    //Object {value: "建设银行", writable: false, enumerable: false, configurable: false}


2.use strict

"严格模式"规定：

   未声明的变量赋值抛出一个ReferenceError, 而不是创建一个全局变量。
   不止一次对对象字面量分配相同的属性会抛出SyntaxError。
   使用with语句抛出SyntaxError。
   变量必须在声明后使用。

3.Array

 Array上构建了一个静态方法，用来判断数据类型是否为数组
 
    Array.isArray(["3","4"]);
    //true
    Array.isArray({"x":"y"});
    //false

操作数组的方法： indexOf、map、reduce、filter、forEach等。


4.Date获取时间戳

    var date = new Date();
    //1480312139830
    console.log(date.getTime());
     
    //ES5
    Date.now()      //Date构造类型添加一个now()静态方法

5.Function.prototype.bind(this,arg1,arg2)

    function A(x){
        this. x = x;  
    }
    
    function B(y){
        console.log(this.x + ":y=" + y );
    }
    B.bind(new A(5),6)();


另外还有一种写法：

    /*express-mysql-session源码*/
    var done = function() {
        this.setExpirationInterval();
        if (cb) {
            cb.apply(undefined, arguments);
        }
    }.bind(this);

 
6.String.prototype.trim

    var str = " hello world ";
    console.log(str.trim()); //可以忽略jquery的 $.trim() 了
    //hello world

7.JSON的方法

    //这两个已经用到很多了
    JSON.stringify(obj);  //obj ---> str
    JSON.parse(str);   //str ---> json
JSON.stringify(value[, replacer[, space]])

value是需要转换的值，必选。

replacer可以是函数，也可以是数组，如果是函数，则会显示函数返回值，参数为value中的key和val,如果是数组，则只会显示数组中与value对应的值。

space可选，文本添加缩进、空格和换行符
