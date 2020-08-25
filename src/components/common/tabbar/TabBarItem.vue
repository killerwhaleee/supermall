<template>
  <div class="tab_bar_item" @click="itemClick">
    <div v-if="!isActive"><slot name="item-icon"></slot></div>
    <div v-else><slot  name="item-icon-active"></slot></div>
    <div :style="activeStyle"><slot  name="item-text"></slot></div>
<!--    slot里面不写属性等等 因为slot就是用来被替换掉的 如果属性都写在slot里，就会被最终替换掉而不起效果-->

<!--    下面这样是写死的-->
<!--    <img src="../../assets/img/tabbar/home.svg" alt="">-->
<!--    <div>首页</div>-->
  </div>
</template>

<script>
  export default {
    name: "TabBarItem",
    props:{
      path:String,
      activeColor:{
        type:String,
        default:'hotpink'
      }
    },
    data(){
      return {
        // isActive:true,
        // path:'/home'
      }
    },
    computed: {
      isActive(){
        return this.$route.path.indexOf(this.path) !== -1
      },
      activeStyle(){
        return this.isActive ? {color: this.activeColor} : {}
      }
    },
    methods:{
      itemClick(){
        // console.log('itemClick');
        this.$router.push('/location').catch(err => { console.log(err)})  //解决重复点击报错问题
        this.$router.replace(this.path)
      }
    }
  }
</script>

<style scoped>

  .tab_bar_item{
    flex: 1;
    text-align: center;
    height: 49px;
    font-size: 14px;
  }
  .tab_bar_item img{
    height: 24px;
    width: 24px;
    margin-top: 3px;
    vertical-align: middle;
    margin-bottom: 2px;
  }
  .active{
    color: deeppink;
  }
</style>
