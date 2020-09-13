<template>
  <div class="cart">
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{cartLength}})</div>
    </nav-bar>

    <!-- 商品的列表-->
     <cart-list/>
    <!-- 底部汇总-->
    <cart-bottom-bar/>
  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";
  import CartList from "./childComps/CartList";
  import CartBottomBar from "./childComps/CartBottomBar";


  export default {
    name: "Cart",
    components:{
      NavBar,
      CartList,
      CartBottomBar
    },
    computed:{
      cartLength(){
        return this.$store.state.cartList.length
      }
    },
  }
</script>

<style scoped>
  .cart{
    height: 100vh;
  }

  .nav-bar{
    position: fixed;
    width: 100%;
    background-color: var(--color-tint);
    color: #fff;
    z-index: 99;
  }
</style>
