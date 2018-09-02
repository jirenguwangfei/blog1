1.关于 v-blind 指令

其基本用途是动态更新 HTML 上的属性，如：id，class等。
    
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

2.绑定 class 的几种方式

2.1对象语法

给 v-blind:class 设置一个对象，可以动态地切换 class，例如：

    <div id='app'>
        <div :class="{ 'active': isActive }"></div>
    </div>
    <script>
        var app = new Vue({
             el: '#app',
             data: {
                  isActive: true
             }
        })
    </script>
    
上面示例中，类名 active依赖于数据 isActive，当其为 ture 时，div 会拥有类名 isActive,为 false 时则没有，所以上例最终渲染完的结果是：

    <div class="active"></div>
对象中也可以传入多个属性，来动态切换 class。另外，:class也可以与普通 class 共存。 

2.2绑定的数据对象不必内联定义在模板里：

    <div v-bind:class="classObject"></div>
    data: {
      classObject: {
        active: true,
        'text-danger': false
      }
    }
渲染的结果和上面一样。我们也可以在这里绑定一个返回对象的计算属性。这是一个常用且强大的模式：

    <div v-bind:class="classObject"></div>
    data: {
      isActive: true,
      error: null
    },
    computed: {
      classObject: function () {
        return {
          active: this.isActive && !this.error,
          'text-danger': this.error && this.error.type === 'fatal'
        }
      }
    }
3.数组语法

我们可以把一个数组传给 v-bind:class，以应用一个 class 列表：

    <div v-bind:class="[activeClass, errorClass]"></div>
    data: {
      activeClass: 'active',
      errorClass: 'text-danger'
    }
渲染为：

    <div class="active text-danger"></div>
如果你也想根据条件切换列表中的 class，可以用三元表达式：

    <div v-bind:class="[isActive ? activeClass : '', errorClass]"></div>
这样写将始终添加 errorClass，但是只有在 isActive 是 truthy[1] 时才添加 activeClass。

不过，当有多个条件 class 时这样写有些繁琐。所以在数组语法中也可以使用对象语法：

    <div v-bind:class="[{ active: isActive }, errorClass]"></div>
    
4.用在组件上

当在一个自定义组件上使用 class 或 :class属性时，这些类将被添加到该组件的根元素上面。这个元素上已经存在的类不会被覆盖。

例如，如果你声明了这个组件：
    
    Vue.component('my-component', {
      template: '<p class="foo bar">Hi</p>'
    })
然后在使用它的时候添加一些 class：

    <my-component class="baz boo"></my-component>
    
HTML 将被渲染为:

    <p class="foo bar baz boo">Hi</p>
对于带数据绑定 class 也同样适用：

    <my-component v-bind:class="{ active: isActive }"></my-component>
当 isActive 为 truthy[1] 时，HTML 将被渲染成为：

    <p class="foo bar active">Hi</p>
    
5.绑定内联样式

v-bind:style 可以给元素绑定内联样式，方法与 :class 类似。

5.1对象语法

v-bind:style CSS 属性名可以用驼峰式 (camelCase) 或短横线分隔 (kebab-case，记得用单引号括起来) 来命名：

    <div v-bind:style="{ color: activeColor, fontSize: fontSize + 'px' }"></div>
    data: {
      activeColor: 'red',
      fontSize: 30
    }
    
直接绑定到一个样式对象通常更好，这会让模板更清晰：

    <div v-bind:style="styleObject"></div>
    data: {
      styleObject: {
        color: 'red',
        fontSize: '13px'
      }
    }
同样的，对象语法常常结合返回对象的计算属性使用。

5.2数组语法

v-bind:style 的数组语法可以将多个样式对象应用到同一个元素上：

    <div v-bind:style="[baseStyles, overridingStyles]"></div>
5.3自动添加前缀

当 v-bind:style 使用需要添加浏览器引擎前缀的 CSS 属性时，如 transform，Vue.js 会自动侦测并添加相应的前缀。
