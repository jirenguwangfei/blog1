**计算属性**

1.什么是计算属性
示例：

    <div id= "app">
        {{ text.split(',').reverse().join(',') }}
    </div>
    
    这里的表达式包含三个操作，不清晰，所以可以用计算属性进行改写：
    
    <div id= "app">
        {{ reversedText }}
    </div>
    <script>
        var app = new Vue({
            el: '#app',
            data: {
                text: '123,456'
            },
            computed: {
                reversedText: function(){
                    //这里的this指向的是当前的Vue实例
                    return this.text.split(',').reverse().join(',');
                }
            }
        })
    </script>
    
所有的计算属性都以函数的形式卸载Vue实例内的computed选项内，最终返回计算后的结果。

2.计算属性用法

计算属性是用来声明式的描述一个值依赖了其它的值。当你在模板里把数据绑定到一个计算属性上时，Vue 会在其依赖的任何值导致该计算属性改变时更新 DOM。
这个功能非常强大，它可以让你的代码更加声明式、数据驱动并且易于维护。

例如：

    var vm = new Vue({
        el:'#demo',
        data: {
            firstName: 'Foo',
            lastName: 'Bar'
        },
        computed: {
            fullName: function () {
                return this.firstName + ' ' + this.lastName
            }
        }
    })
另外，你还可以为计算属性提供一个 setter：

    computed: {
        fullName: {
            // getter
            get: function () {
                return this.firstName + ' ' + this.lastName
            },
            // setter
            set: function (newValue) {
                var names = newValue.split(' ')
                this.firstName = names[0]
                this.lastName = names[names.length - 1]
            }
        }
    }

3.计算属性缓存

    var app = new Vue({
        el: '#app',
        data: {
            text: '123,456'
        },
        methods: {
            reversedText: function(){
                //这里的this指向的是当前Vue实例
                return this.text.split(',').reverse().join(',');
            }
        }
    })
    
在上面的例子中，没有使用计算属性，但在 methods 里定义了一个方法实现了相同的效果，甚至该方法还可以接受参数。
但因为计算属性是基于它的依赖缓存的。一个计算属性所以来的数据发生变化时，它才会重新取值，所以只要 text 不变，计算属性不更新。

例如：

    computed: {
        example: {
            cache: false,
            get: function () {
                return Date.now() + this.msg
            }
        }
    }

这里的 Date.now() 不是响应式依赖，所以计算属性 now 不会更新。但是 methods 不同，只要重新渲染，就会被调用，函数因此会被执行。

使用计算属性还是 methods 属性取决于你是否需要缓存，当遍历大数组和需要大量计算式，应当使用计算属性。








