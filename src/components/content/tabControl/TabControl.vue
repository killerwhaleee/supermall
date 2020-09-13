<template>
  <div class="tab-control">
<!--    如果只是文字不一样的话，没有必要搞插槽-->
    <div v-for="(item, index) in titles"
         class="tab-control-item"
         :class= "{active: index === currentIndex}"
         @click = "itemClick(index)"
    >
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "TabControl",
    props:{
      titles:{
        type:Array,
        default (){  //默认的对象是数组或对象时，必须写成函数
          return []
        }
      }
    },
    data(){
      return{
        currentIndex:0
      }
    },
    methods:{
      itemClick(index){
        this.currentIndex = index
        this.$emit('tabClick', index)
      }
    }
  }
</script>

<style scoped>
  .tab-control{
    display: flex;
    text-align: center;
    background-color: #fff;
  }
  .tab-control-item{
    flex: 1;
    height: 40px;
    line-height: 40px;
  }
  .active{
    color: var(--color-high-text);
  }
  .active span{
    border-bottom: 1px solid var(--color-high-text);
    padding: 3px;
  }
</style>
