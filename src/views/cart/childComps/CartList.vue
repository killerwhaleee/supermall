<template>
  <div class="cart-list">
      <scroll class="content">
        <cart-list-item v-for="(item, index) in cartList" :key="index" :item-info="item" />
      </scroll>
  </div>
</template>

<script>
  import Scroll from "components/common/scroll/Scroll";
  import CartListItem from "./CartListItem";

  export default {
    name: "CartList",
    components:{
      Scroll,
      CartListItem
    },
    computed:{
      cartList(){
        return this.$store.state.cartList
      }
    }
  }
</script>

<style scoped>
  .cart-list{
    position: absolute;
    top: 44px;
    left: 0;
    right: 0;
    bottom: 93px;
  }
  .content{
    height: calc(100% - 44px);
  }

</style>
