<template>
  <div id="detail">
    <detail-navbar class="detail-nav"   @titleClick="titleClick" ref="nav" />
    <scroll class="content" ref="scroll" :probeType="3" @scroll="contentScroll">
      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
      <detail-param-info ref="params" :param-info="paramInfo"/>
      <detail-comment-info ref="comment" :comment-info="commentInfo"/>
      <goods-list ref="recommend" :goods="recommends"/>
     </scroll>
    <detail-bottom-bar @addCart="addToCart"/>
    <back-top />
  </div>
</template>

<script>
  import DetailNavbar from "./childComps/DetailNavbar";
  import DetailSwiper from "./childComps/DetailSwiper";
  import DetailBaseInfo from "./childComps/DetailBaseInfo";
  import DetailShopInfo from "./childComps/DetailShopInfo";
  import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
  import DetailParamInfo from "./childComps/DetailParamInfo";
  import DetailCommentInfo from "./childComps/DetailCommentInfo";
  import DetailBottomBar from "./childComps/DetailBottomBar";

  import Scroll from "components/common/scroll/Scroll";
  import GoodsList from "components/content/goods/GoodsList";
  import BackTop from "components/content/backTop/BackTop";

  import {getDetail, Goods,Shop,GoodsParam,getRecommend} from "../../network/detail";



  export default {
    name: "Detail",
    components:{
      DetailNavbar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      DetailBottomBar,
      Scroll,
      GoodsList,
      BackTop
    },

    data(){
      return {
        iid: null,
        res:null,
        topImages: [],
        goods: {},
        shop:{},
        detailInfo:{},
        paramInfo:{},
        commentInfo: {},
        recommends: [],
        themeTopYs:[],
        currentIndex:0,
        isShowBackTop: false
      }
    },
    created() {
      // 1.保存传入的iid
      this.iid  = this.$route.params.iid
      // 2.根据iid获取数据 请求详情数据
      getDetail(this.iid).then(res => {
        console.log(res);
      //  1.获取顶部的图片轮播数据
        const data = res.data.result
        this.topImages = data.itemInfo.topImages
      //  2.获取商品信息
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
      //  3.创建店铺信息的对象
        this.shop = new Shop(data.shopInfo)
      //  4.保存商品的详情数据
        this.detailInfo = data.detailInfo;
      //  5.获取参数的信息
        this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)
      //  6.取出评论的信息
        if(data.rate.cRate !== 0){
          this.commentInfo = data.rate.list[0]
        }
      //  渲染完之后会调用这个回调函数
      //   this.$nextTick( ()=> {
      //     this.themeTopYs = []
      //     this.themeTopYs.push(0);
      //     this.themeTopYs.push(this.$refs.params.$el.offsetTop)
      //     this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
      //     this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
      //     console.log(this.themeTopYs);
      //   })

      })
      // 3.请求推荐数据
      getRecommend().then(res => {
        this.recommends = res.data.data.list
        console.log(res);
      })
    },
    mounted() {

    },
    updated() {

    },
    methods:{
      imageLoad(){
        this.$refs.scroll.refresh()

        this.$nextTick( ()=> {
          this.themeTopYs = []
          this.themeTopYs.push(0);
          this.themeTopYs.push(this.$refs.params.$el.offsetTop)
          this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
          this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
          this.themeTopYs.push(Number.MAX_VALUE) //hack
          console.log(this.themeTopYs);
        })
      },
      titleClick(index){
        // console.log(index);
        this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 100)
      },
      contentScroll(position){
        // console.log(position);
        // 1.获取y值
        const positionY = -position.y

      //  2.positionY和主题中的值进行对比
      //     [0, 6277, 7079, 7294]
        let length = this.themeTopYs.length
        for (let i = 0; i < length-1; i++){
          // 普通做法
          // if(this.currentIndex !== i && (( i < length -1 && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1]) ||( i === length -1 && positionY >= this.themeTopYs[i] ))){
          //   this.currentIndex = i;
          //   console.log(this.currentIndex);
          //   this.$refs.nav.currentIndex = this.currentIndex
          // }
          // hack做法
          if(this.currentIndex !== i && (positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1])){
            this.currentIndex = i;
            this.$refs.nav.currentIndex = this.currentIndex
          }
        }
      },
      addToCart(){
        // console.log('-----');
      //  1.获取购物车需要展示的信息
        const product = {}
        product.image = this.topImages[0]
        product.title = this.goods.title;
        product.desc = this.goods.desc;
        product.price = this.goods.realPrice;
        product.iid = this.goods.iid;
        console.log(product);

      //  2.将商品添加到到购物车  vuex
      //   this.$store.commit('addCart',product)
        this.$store.dispatch('addCart',product)
      }
    }
  }
</script>

<style scoped>
  #detail{
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
  }
  .content{
    height: calc(100% - 44px);
    overflow: hidden;
  }
  .detail-nav{
    position: relative;
    z-index: 9;
    background-color: #fff;
  }
</style>
