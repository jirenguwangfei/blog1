
一.首先：

 var $div = $('div')

     $div.addClass('red') // 可将所有 div 的 class 添加一个 red
     $div.setText('hi') // 可将所有 div 的 textContent 变为 hi

jQuery本质上就是一个构造函数，我们需要给它输入参数，就可以返回对应参数的jQuery实例。
    
    window.jQuery=function (){}

(1)
jQuery的核心思想就是先选择后处理，jQuery构造函数的参数，主要是CSS选择器。选择一个参数，比如，需求1 是让<div>的class='red', 其中'div'就是要传入的参数。

(2)

    window.jQuery=function (nodeOrSelector){
      var nodes={}
      let temp=document.querySelectorAll(nodeOrSelector)
      for(let i=0;i<temp.length;i++){
        nodes[i]=temp[i]
      }
      nodes.length=temp.length
      return nodes
    }
使用document.querySelectorAll, 因为它遵循的是css选择器的规则，可以帮助我们获取一个或者多个元素节点，用它确定选中参数的结果，在html文档中会获取到多个结果，这个结果集是一个伪数组，遍历这个伪数组，将遍历的结果存放在nodes对象中。

(3)

    window.jQuery=function (nodeOrSelector){
      var nodes={}
      let temp=document.querySelectorAll(nodeOrSelector)
      for(let i=0;i<temp.length;i++){
        nodes[i]=temp[i]
      }
      nodes.length=temp.length
      nodes.addClass=function (className) {
        for(i=0;i<nodes.length;i++){
          nodes[i].classList.add(className)
        }
    }
      return nodes
    }
获取到这个nodes对象之后，通过nodes创建一个构造函数,这个函数中的className，就是在window.jQuery使用addClass这个属性时要输入的参数。在这个函数内部创建一个for循环，

遍历nodes,每一轮给nodes中对应的节点添加一个className。

就可以实现 需求1了。

(4)

    window.jQuery=function (nodeOrSelector){
       var nodes={}
       let temp=document.querySelectorAll(nodeOrSelector)
       for(let i=0;i<temp.length;i++){
        nodes[i]=temp[i]
       }
       nodes.length=temp.length
       nodes.addClass=function (className) {
        for(i=0;i<nodes.length;i++){
          nodes[i].classList.add(className)
        }
     }
     nodes.setText=function (text){
      for(i=0;i<nodes.length;i++){
        nodes[i].textContent=text
      }
     }
       return nodes
    }
    window.$ = jQuery

与需求1 同样的步骤，nodes.setText接受一个参数text,在这个函数内部创建一个for循环，遍历nodes每一轮给nodes中对应的节点添加一个text。

这样两个API就可以实现这两个需求了。它们可以同时给1个或多个元素节点，添加class和textContent。