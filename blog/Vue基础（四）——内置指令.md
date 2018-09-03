1.基本指令

1.1 v-cloak

v-cloak 不需要表达式，它会在 Vue 实例结束编译时从绑定的HTML元素上移除，经常和 CSS 的 display:none; 配合使用。
   
    <div id="app" v-cloak>
        {{ messaage }}
    </div>
    <script>
        var app = new Vue({
            el: '#app',
            data: {
                message: '这是一段文本'
            }
        })
    </script>
但是当网速较慢时，Vue.js 文件还没加载完时，在页面上会显示{{message}}的字样，直到Vue创建实例、编译模板时，
DOM才会被替换，所以这个过程屏幕是有闪动的。所以要加一句CSS：

    [v-cloak] {
        display:none;
    }

1.2 v-once

v-once也是一个不需要表达式的指令，作用是定义它的元素或组件只渲染一次，包括元素或组件的所有子节点。
首次渲染后，不再随数据变化重新渲染，将被视为静态页面：

    <div id="app">
        <span v-once>{{ message }}</div>
        <div v-once>
            <span>{{ message }}</span>
        </div>
    </div>
    <script>
        var app = new Vue({
            el: '#app',
            data: {
                message: '这是一段文本'
            }
        })
    </script>
    
2.条件渲染指令

2.1 v-if、v-else-if、v-else

v-else 元素必须紧跟在带 v-if 或者 v-else-if 的元素的后面，否则它将不会被识别。如：

    <div v-if="Math.random() > 0.5">
        Now you see me
    </div>
    <div v-else>
        Now you don't
    </div>

v-else-if 也必须紧跟在带 v-if 或者 v-else-if 的元素之后。如：
    
    <div v-if="type === 'A'">
         A
    </div>
    <div v-else-if="type === 'B'">
         B
    </div>
    <div v-else-if="type === 'C'">
         C
    </div>
    <div v-else>
         Not A/B/C
    </div>
    
2.2 key管理可复用的元素

    <template v-if="loginType === 'username'">
        <label>Username</label>
        <input placeholder="Enter your username">
    </template>
    <template v-else>
        <label>Email</label>
        <input placeholder="Enter your email address">
    </template>
那么在上面的代码中切换 loginType 将不会清除用户已经输入的内容。
因为两个模板使用了相同的元素，<input>仅仅是替换了它的 placeholder内容。说明<input>元素被复用了。

对此，添加一个具有唯一值的 key 属性即可：

    <template v-if="loginType === 'username'">
      <label>Username</label>
      <input placeholder="Enter your username" key="username-input">
    </template>
    <template v-else>
      <label>Email</label>
      <input placeholder="Enter your email address" key="email-input">
    </template>
现在，每次切换时，输入框都将被重新渲染。但 <label> 元素仍然会被高效地复用，因为它们没有添加 key 属性。

2.3 v-show

 v-show 是改变元素的CSS属性 display 。用法与 v-if 大致一样:

    <h1 v-show="ok">Hello!</h1>
当 v-show 表达式的值为 false 时，元素会隐藏。不同的是带有 v-show 的元素始终会被渲染并保留在 DOM 中。

2.4 v-if 与 v-show 的选择

v-if 是“真正”的条件渲染，因为它会根据表达式适当的销毁或重建元素及绑定的事件及子组件。
如果在初始渲染时条件为 false ，则什么也不做——直到条件第一次变为真时，才会开始渲染条件块。

相比之下，v-show 就简单得多——不管初始条件是什么，元素总是会被渲染，并且只是简单地基于 CSS 进行切换。
一般来说，v-if 有更高的切换开销，而 v-show 有更高的初始渲染开销。
因此，如果需要非常频繁地切换，则使用 v-show 较好；如果在运行时条件很少改变，则使用 v-if 较好。

3.列表渲染指令 v-for

3.1基本用法

将一个数组遍历或枚举一个对象循环显示时，就会用到列表渲染指令 v-for。
v-for 指令需要使用 item in items 形式的特殊语法，items 是源数据数组并且 item 是数组元素迭代的别名。
    
    <div id='app'>
        <ul>
          <li v-for="book in books">
            {{ book.name }}
          </li>
        </ul>
    </div>
    <script>
        var app = new Vue({
          el: '#app',
          data: {
            books: [
              { name: '《Vue.js实战》' },
              { name: '《JavaScript高级程序设计》' }
            ]
          }
        })
    </script>
列表渲染也支持用of来代替in作为分隔号。

    <div v-for="item of items"></div>

在 v-for 块中，我们拥有对父作用域属性的完全访问权限。v-for 还支持一个可选的第二个参数为当前项的索引。例如：

    <div id='app'>
        <ul>
          <li v-for="(book,index) in books">
            {{ index }} - {{ book.name }}
          </li>
        </ul>
    </div>
    <script>
        var app = new Vue({
          el: '#app',
          data: {
            books: [
              { name: '《Vue.js实战》' },
              { name: '《JavaScript高级程序设计》' }
            ]
          }
        })
    </script>

你也可以用 v-for 通过一个对象的属性来迭代。

    <div id='app'>
        <ul id="app" class="demo">
            <li v-for="value in object">
                {{ value }}
            </li>
        </ul>
    </div>
    <script>
        var app = new Vue({
            el: '#app',
            data: {
                object: {
                    firstName: 'John',
                    lastName: 'Doe',
                    age: 30
                }
            }
        })
    </script>


你也可以提供第二个的参数为键名：

    <div v-for="(value, key) in object">
      {{ key }}: {{ value }}
    </div>
    
第三个参数为索引：

    <div v-for="(value, key, index) in object">
      {{ index }}. {{ key }}: {{ value }}
    </div>
    
在遍历对象时，是按 Object.keys() 的结果遍历，但是不能保证它的结果在不同的 JavaScript 引擎下是一致的。

v-for还可以迭代整数：

    <div id='app'>
        <span v-for="n in 10">
            {{ n }}
        </span>
    </div>
    <script>
        var app = new Vue({
            el: '#app',
        })
    </script>
    
    渲染后的结果为
    1 2 3 4 5 6 7 8 9 10

建议尽可能在使用 v-for 时提供 key，除非遍历输出的 DOM 内容非常简单，或者是刻意依赖默认行为以获取性能上的提升。

2.数组更新

2.1 变异方法

Vue 包含一组观察数组的变异方法，所以它们也将会触发视图更新。这些方法如下：

    push()
    pop()
    shift()
    unshift()
    splice()
    sort()
    reverse()
你打开控制台，然后用前面例子的 items 数组调用*变异方法*：example1.items.push({ message: 'Baz' }) 。

**变异方法 (mutation method)，顾名思义，会改变被这些方法调用的原始数组。**

2.2 替换数组

相比之下，也有非变异 (non-mutating method) 方法，例如：filter(), concat() 和 slice() 。
这些不会改变原始数组，但总是返回一个新数组。当使用非变异方法时，可以用新数组替换旧数组：

    app.books = app.books.filter(function (item) {
      return item.name.match(/JavaScript/)
    })
    
由于 JavaScript 的限制，Vue 不能检测以下变动的数组：

当你利用索引直接设置一个项时，例如：app.books[3] = {...}
当你修改数组的长度时，例如：app.books.length = 1
举个例子：

    var app = new Vue({
      data: {
        books: ['a', 'b', 'c']
      }
    })
    app.books[1] = 'x' // 不是响应性的
    app.books.length = 2 // 不是响应性的
为了解决第一类问题，以下两种方式都可以实现相同的效果，同时也将触发状态更新：

第一种为使用Vue内置的 set 方法：

    // Vue.set
    Vue.set(app.books, indexOfItem, newValue)

    // Array.prototype.splice
    app.books.splice(indexOfItem, 1, newValue)

你也可以使用 app.$set 实例方法，该方法是全局方法 Vue.set 的一个别名：

    app.$set(app.books, indexOfItem, newValue)

为了解决第二类问题，你可以使用 splice：

    app.books.splice(1)
    
3.过滤与排序

当你不想改变原数组，想通过一个数组的副本来做过滤与排序的显示时，可以使用计算属性来返回过滤或排序后的数组，例如：

4.方法与事件

4.1基本用法——监听事件

可以用 v-on 指令监听 DOM 事件，并在触发时运行一些 JavaScript 代码。例如，按钮计数器：

    <div id='app'>
        点击次数： {{ counter }}
        <buttton @click="counter++">+ 1</button>
    </div>
    <script>
         new Vue({
            el: '#app',
            data: {
                counter: 0
            }
        })
    </script>
    
4.2 事件处理方法

许多事件处理逻辑会更为复杂，所以直接把 JavaScript 代码写在 v-on 指令中是不可行的。因此 v-on 还可以接收一个需要调用的方法名称。

    <div id="app">
        <!-- `greet` 是在下面定义的方法名 -->
        <button v-on:click="greet">Greet</button>
    </div>
    var app = new Vue({
        el: '#app',
        data: {
            name: 'Vue.js'
        },
        // 在 `methods` 对象中定义方法
        methods: {
            greet: function (event) {
                // `this` 在方法里指向当前 Vue 实例
                alert('Hello ' + this.name + '!')
                // `event` 是原生 DOM 事件
                if (event) {
                    alert(event.target.tagName)
                }
            }
        }
    })
    
    // 也可以用 JavaScript 直接调用方法
    app.greet() // => 'Hello Vue.js!'
    
4.3 内联处理器中的方法

除了直接绑定到一个方法，也可以在内联 JavaScript 语句中调用方法：

    <div id="app">
        <button v-on:click="say('hi')">Say hi</button>
        <button v-on:click="say('what')">Say what</button>
    </div>
    new Vue({
        el: '#app',
        methods: {
            say: function (message) {
                alert(message)
            }
        }
    })
    
有时也需要在内联语句处理器中访问原始的 DOM 事件，可以用特殊变量 $event 方法。
下面的实例可以阻止链接打开：

    <div id="app">
        <a href="http://www.baidu.com" @click="handleClick('禁止打开'， $event)">打开链接</a>
    </div>
    <script>
        var app = new Vue({
            el: '#app',
            methods: {
                handleClick: function (message, event) {
                    event.preventDefault();
                    window.alert(message);
                }
            }
        })
    </script>
    
5.修饰符

在事件处理程序中调用 event.preventDefault() 或 event.stopPropagation() 是非常常见的需求。
尽管我们可以在方法中轻松实现这点，但更好的方式是：方法只有纯粹的数据逻辑，而不是去处理 DOM 事件细节。
为了解决这个问题，Vue.js 为 v-on 提供了事件修饰符。之前提过，修饰符是由点开头的指令后缀来表示的。
Vue支持以下修饰符：

.stop

.prevent

.capture

.self

.once

.passive


    <!-- 阻止单击事件继续传播 -->
    <a v-on:click.stop="doThis"></a>
    
    <!-- 提交事件不再重载页面 -->
    <form v-on:submit.prevent="onSubmit"></form>
    
    <!-- 修饰符可以串联 -->
    <a v-on:click.stop.prevent="doThat"></a>
    
    <!-- 只有修饰符 -->
    <form v-on:submit.prevent></form>
    
    <!-- 添加事件监听器时使用事件捕获模式 -->    
    <!-- 即元素自身触发的事件先在此处理，然后才交由内部元素进行处理 -->
    <div v-on:click.capture="doThis">...</div>
    
    <!-- 只当在 event.target 是当前元素自身时触发处理函数 -->
    <!-- 即事件不是从内部元素触发的 -->
    <div v-on:click.self="doThat">...</div>
    
    <!-- 只有在 keyCode 是13时调用 vm.submit-->
    <input v-on:keyup.13="submit">

使用修饰符时，顺序很重要；相应的代码会以同样的顺序产生。
因此，用 v-on:click.prevent.self 会阻止所有的点击，而 v-on:click.self.prevent 只会阻止对元素自身的点击。
