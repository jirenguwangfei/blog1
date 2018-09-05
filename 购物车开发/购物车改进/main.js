let title =['序号','名称','单价','数量','操作'];
let context = [
    [
        {name:'冰箱',price:5600,amount:2,check:false},
        {name:'电视机',price:3400,amount:1,check:false},
        {name:'空调',price:3100,amount:1,check:false}
    ],
    [
        {name:'iPhone 7',price:6188,amount:2,check:false},
        {name:'iPad Pro',price:5888,amount:1,check:false},
        {name:'MacBook Pro',price:21488,amount:1,check:false}
    ],
    [
        {name:'青菜',price:5600,amount:2,check:false},
        {name:'黄瓜',price:3400,amount:1,check:false},
        {name:'西红柿',price:3100,amount:1,check:false},
        {name:'西红柿',price:3100,amount:1,check:false}
    ],
]

let app = new Vue({
    el:'#app',
    data:{
        title:title,
        context:context,
        checked:false,
        num:0,

    },
    computed:{
        totals:function(){
            let info = this.context;
            let total=0;
            for (let i=0;i<info.length;i++){
                for(let j=0;j<info[i].length;j++){
                    if (info[i][j]['check']){
                        total+=info[i][j]['price']*info[i][j]['amount'];
                    }
                }
            }
            return total;
        },


    },
    methods:{
        nums:function(index,indexs){

            if (indexs == 0){
                num = index+1;
                return index+1;
            }else{
                num += 1;
                return num
            }
        },
        del:function(index,indexs){
            //删除当前索引下的数据

            return this.context[indexs].splice(index,1);
        },
        add:function(index,indexs){
            return this.context[indexs][index].amount++;
        },
        checks:function(index,indexs){
            this.context[indexs][index].check=true;
            return this.context[indexs][index].check
        },
        reduce:function(index,indexs){
            //再判断一遍数量，如果为1，就不让减了
            if(this.context[indexs][index].amount===1) return;
            return this.context[indexs][index].amount--;
        },
        handlall:function(){
            if (this.checked){
                console.log("全没选中");
                let arr = this.context;
                for (let i=0;i<arr.length;i++){
                    for(let j=0;j<arr[i].length;j++){
                        arr[i][j]['check'] = false
                    }

                }

            }else{
                console.log("全选中了");
                let arr = this.context;
                for (let i=0;i<arr.length;i++){
                    for(let j=0;j<arr[i].length;j++){
                        arr[i][j]['check'] = true
                    }

                }

            }
        }


    }
})