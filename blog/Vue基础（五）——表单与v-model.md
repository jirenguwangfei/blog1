1基本用法

1.1 Vue.js提供了 v-model 指令，用于在表格类元素上双向绑定数据，例如：

    <div id="app">
        <input type="text" v-model="message" plaaceholder="输入...">
        <p>输入的内容是：{{ messaage }}</p>
    </div>
    <script>
        var app = new Vue({
            el: '#aapp',
            data: {
                message: ''
            }
        })
    </script> 
对于文本域 textarea 也是相同的用法：

    <div id="app">
        <textarea v-model="text" plaaceholder="输入..."></textarea>
        <p>输入的内容是：</p>
        <p style="white-space: pre">{{ text }}</p>
    </div>
    <script>
        var app = new Vue({
            el: '#aapp',
            data: {
                text: ''
            }
        })
    </script> 

1.2单选按钮

单选按钮在单独使用时，不需要 v-model 直接使用 v-bind 绑定一个布尔值，为真时选中，为否时不选。

1.3 复选框

复选框分为单独使用和组合使用，不过用法与单选不同。
复选框单独使用时，也是用 v-model 来绑定一个布尔值，例如：

    <div id="app">
        <input type="checkbox" v-model="checked" id="checked">
        <label for="checked">选择状态： {{ checked }}</label>
    </div>
    <script>
        var app = new Vue({
            el: '#aapp',
            data: {
                checked: false
            }
        })
    </script> 
    
1.4 选择列表

选择列表就是下拉选择器，同样也分单选和多选俩种方式。

1.4.1 单选

    <div id="app">
        <select v-model="selected">
            <option>html</option>
            <option value="js">JavaScript</option>
            <option>css</option>
        </select>
    </div>
    <script>
        var app = new Vue({
            el: '#aapp',
            data: {
                selected: 'html'
            }
        })
    </script> 
<option>是备选项，如果含有 value 属性，v-model就会优先匹配 value 的值；如果没有，就会直接匹配 <option> 的text。

给 <selected> 添加属性 multiple 就可以多选，此时 v-model 绑定的是一个数组，与复选框用法类似：

    <div id="app">
        <select v-model="selected" multiple>
            <option>html</option>
            <option value="js">JavaScript</option>
            <option>css</option>
        </select>
        <p>选择的项是：{{ selected }}</p>
    </div>
    <script>
        var app = new Vue({
            el: '#aapp',
            data: {
                selected: ['html','js']
            }
        })
    </script>
在业务中，<option>经常用v-for动态输出，value和text也是用v-bind来动态输出的。

    <div class="app">
        <select name="" v-model="selected">
            <option v-for="option in options" :value="option.value">{{option.text}}</option>
        </select>
        <p>选择的项是：{{selected}}</p>
    </div>
    <script>
        var app = new Vue({
            el: '#app',
            data:{
                selected:'html',
                options:[
                    {
                        text:'HTML',
                        value:'html'
                    },
                    {
                        text:'JavaScript',
                        value:'js'
                    },
                    {
                        text:'CSS',
                        value:'css'
                    }
                ]
            }
        })
    </script>
    
2.绑定值

v-model 绑定的值是一个静态字符串或布尔值，在业务中，有时需要绑定一个动态的数据，这时可以用v-bind来实现。

2.1 单选按钮：

    <div class="app">
        <input type="radio" name="" id="" :value="value" v-model="picked" />
        <label for="">单选按钮</label>
        <p>{{picked}}</p>
        <p>{{value}}</p>
    </div>
    <script>
        var app = new Vue({
            el: '#app',
            data:{
                picked:false,
                value:123
            }
        })
    </script>
在选中时，app.picked === app.value,值都是123.

2.2复选框：

    <div class="app">
        <input type="checkbox" v-model="toggle" :true-value='value1' :false-value="value2" />
        <label for="">复选框</label>
        <p>{{toggle}}</p>
        <p>{{value1}}</p>
        <p>{{value2}}</p>
    </div>
    <script>
        var app = new Vue({
            el: '#app',
            data:{
                toggle:false,
                value1:'a',
                value2:'b'
            }
        })
    </script>
勾选时，app.taggle === app.value1; 未勾选时，app.taggle === app.value2。

2.3 选择列表：

    <div class="app">
        <select name="" v-model="selected">
            <option :value="{number:123}">123</option>
        </select>
        {{selected.number}}
    </div>
    <script>
        var app = new Vue({
            el: '#app',
            data:{
                selected:''
            }
        })
    </script>
当选中时，app.selected 是一个 Object，所以 app.selected.number === 123。

3.修饰符

与事件的修饰符类似，v-model也有修饰符，用于控制数据同步的时机。

**.lazy：**

在输入框中，v-model默认是在input事件中同步输入框的数据（除了提示中介绍的中文输入法情况外），使用修饰符 .lazy 会转变为在change事件中同步。


    <div class="app">
        <input type="text" name="" id="" value="" v-model.lazy="message"/>
        <p>{{message}}</p>
    </div>
    <script>
        var app = new Vue({
            el: '#app',
            data:{
                message:''
            }
        })
    </script>

这时，message并不是实时改变的，而是在失焦或按回车时才更新。

**.number：**

使用修饰符.number可以将输入转换为Number类型，否则虽然你输入的数字，但它的类型其实是String，比如在数字输入框时会比较有用。

    <div class="app">
        <input type="text" name="" id="" value="" v-model.number="message"/>
        <p>{{typeof message}}</p>
    </div>
    </script>
        var app = new Vue({
            el: '#app',
            data:{
                message:'123'
            }        
        })
    </script>

**.trim：**

修饰符 .trim可以自动过滤输入的首尾空格。

    <div class="app">
        <input type="text" name="" id="" value="" v-model.trim="message"/>
        <p>{{message}}</p>
    </div>
    </script>
        var app = new Vue({
            el: '#app',
            data:{
                message:''
            }
        })
    </script>
从Vue.js 2.x 开始，v-model还可以用于自定义组件，满足定制化的需求。

 