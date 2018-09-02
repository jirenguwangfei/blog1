1.Vue.js 是什么

Vue.js（读音 /vjuː/，类似于 view） 是一套构建用户界面的渐进式框架。与其他重量级框架不同的是，Vue 采用自底向上增量开发的设计。Vue 的核心库只关注视图层，它不仅易于上手，还便于与第三方库或既有项目整合。另一方面，当与单文件组件和 Vue 生态系统支持的库结合使用时，Vue 也完全能够为复杂的单页应用程序提供驱动。

2.Vue的简单用法

    <html> 
    <head>
        <meta charset="utf-8" />
        <script type="text/javascript" src='https://unpkg.com/vue'></script>
    </head> 
    <body>
        <div id="app">
            {{ message }}
        </div>
    </body>
        <script>
            var app = new Vue({
                el: '#app',
                data: {
                    message: 'Hello Vue!'
                }
            })
        </script>    
    </html>
运行结果：
    Hello Vue!
    
3.MVVM 模式

MVVM 模式是由经典的软件架构 MVC 衍生而来的。当 View 变化时，会自动更新到 ViewModel，反之亦然。
View和ViewModel之间通过双向绑定建立联系。

3.1 ViewModel

一个同步View和Model的对象，使用new Vue()来创建。

    var vm = new Vue({ /* options */ })

3.2 View

被 Vue 实例管理的 DOM 节点

    vm.$el // The View
3.3 Model

一个轻微改动过的原生 JavaScript 对象。Vue.js 中的模型就是普通的 JavaScript 对象 —— 也可以称为数据对象。

    vm.$data // The Model
    
4.生命周期

每个 Vue 实例在被创建之前都要经过一系列的初始化过程。
例如，实例需要配置数据观测(data observer)、编译模版、挂载实例到 DOM ，然后在数据变化时更新 DOM 。在这个过程中，实例也会调用一些 生命周期钩子 ，这就给我们提供了执行自定义逻辑的机会。

Vue的生命周期钩子与之类似，比较常用的有：

•created： 实例创建完成后调用，此阶段完成了了数据的观测等，但尚未挂载，$el还不可用。
          需要初始化处理一些数据时会比较有用。
         
•mounted： el挂载到实例上后调用，一般我们的第一个业务逻辑会在这里开始。
 
•beforeDestroy： 实例销毁前调用。主要用于解绑一些使用addEventListener 监听的事件等。

这些钩子与el和data类似，作为选项写入Vue实例内，并且钩子的 this 指向的是调用它的 Vue实例：
    
    var app = new Vue({
        el: '#app',
        data: {
            a: 2
        },
        created: function(){
            console.log(this.a); // 2
        },
        mounted: function(){
            console.log(this.$el); // <div id= "app"></div>
        }
    })
5.插值与表达式

使用双大括号“ {{ }}”是最基本的文本插值方法，它会自动将我们双向绑定的数据实时显示出来，
例如：

    <div id="app">
        {{book}}
    </div>
    <script>
        var app = new Vue({
            el: '#app',
            data: {
                book: '《Vue.js实战》'
            }
        })
    </script>
    
在{{}}中，除了简单的绑定属性值外，还可以使用JS表达式进行简单的运算，
例如：

    <div id="app">
        {{ number /10 }}
        {{ isOK ? '确定' : '取消' }}
        {{ text。split(',').reverse().join(',') }}
    </div>
    <script>
        var app = new Vue({
            el: '#app',
            data: {
                number: 100,
                isOK: false,
                text: '123,456'
            }
        })
    </script>
   显示的结果依次为：10、取消、456，123。
   
6.指令与事件

指令是Vue.js模板中最常用的功能，它带有前缀 v-。
指令的主要职责就是当其表达式的值改变时，相应地将某些行为应用到 DOM 上。

6.1 v-bind

v-bind的基本用途是动态更新HTML元素上的属性，比如id、class等。例如：

    <div id='app'>
        <a :href="url">链接</a>
        <img :src="imgUrl">
    </div>
    <script>
        var app = new Vue({
            el: '#app',
            data: {
                url: 'http://xxxxxxxx.com',
                imgUrl: 'http://xxxxxxxx/img.png'
            }
        })
    </script>
实例中的链接地址与图片的链接地址都与数据进行了绑定，当通过各种方式改变数据时，链接和图片都会自动更新。

6.2 v-on

用于绑定事件监听器，用于制作一些交互。
PS：如果绑定的事件要处理复杂的业务逻辑，建议 methods 里声明一个方法，提高代码的可读性也方便维护。
