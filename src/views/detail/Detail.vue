<template>
  <div id='detail'>
    <!-- 导航栏 -->
    <detail-nav-bar ref="nav" class="detail-nav" @titleItemClick="titleItemClick" />
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">
      <!-- <ul>
        <li v-for="(item, index) in $store.state.cartList" :key="index">{{item}}</li>
      </ul> -->
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @imgLoad="imgLoad"></detail-goods-info>
      <detail-param-info ref="params" :param-info="paramInfo"></detail-param-info>
      <detail-comment-info ref="comment" :comment-info="commentInfo"></detail-comment-info>
      <goods-list ref="recommend" :goods="recommends"></goods-list>
    </scroll>
    <back-top @click.native="backClick" v-show="isShow"></back-top>
    <detail-button-bar @addToCart="addToCart"></detail-button-bar>
    <!-- <toast :message="message" :show="show"></toast> -->
  </div>
</template>

<script>
  import DetailNavBar from './childComps/DetailNavBar'
  import DetailSwiper from './childComps/DetailSwiper'
  import DetailBaseInfo from './childComps/DetailBaseInfo'
  import DetailShopInfo from './childComps/DetailShopInfo';
  import DetailGoodsInfo from './childComps/DetailGoodsInfo'
  import DetailParamInfo from './childComps/DetailParamInfo'
  import DetailCommentInfo from './childComps/DetailCommentInfo'
  import DetailButtonBar from './childComps/DetailButtonBar'

  import Scroll from 'components/common/scroll/Scroll'
  import GoodsList from 'components/content/goods/GoodsList'
  // import Toast from 'components/common/toast/Toast'

  import {
    getDetail,
    getRecommend,
    GoodsInfo,
    Shop,
    GoodsParams
  } from 'network/detail'

  import {
    mapActions
  } from 'vuex'
  import {
    itemListenerMixin,
    backTopMixin
  } from 'common/mixin'
  import {
    debounce
  } from 'common/utils'
  export default {
    name: 'Detail',
    mixins: [itemListenerMixin, backTopMixin],
    data() {
      return {
        iid: null,
        topImages: [],
        goods: {},
        shop: {},
        detailInfo: {},
        paramInfo: {},
        commentInfo: {},
        recommends: [],
        themeTopYs: [],
        getThemeTopY: null,
        currentIndex: 0,
        // message:'',
        // show:false

      }
    },
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      DetailButtonBar,
      Scroll,
      GoodsList,
      // Toast
    },
    created() {
      //1.保存传入的iid
      this.iid = this.$route.params.iid

      //2.根据iid请求详情数据
      getDetail(this.iid).then(res => {
        console.log(res);
        const data = res.result
        //1.获取顶部轮播数据
        this.topImages = data.itemInfo.topImages

        //2.获取商品信息
        this.goods = new GoodsInfo(data.itemInfo, data.columns, data.shopInfo.services)
        //3.创建店铺信息的对象
        this.shop = new Shop(data.shopInfo)

        //4.获取商品详情数据
        this.detailInfo = data.detailInfo

        //5.获取参数信息
        this.paramInfo = new GoodsParams(data.itemParams.info, data.itemParams.rule)

        //6.取出评论信息 
        if (data.rate.cRate !== 0) {
          this.commentInfo = data.rate.list[0]
        }



        //第一次获取值不对
        //原因： this.$refs.params没有渲染
        // this.themeTopYs = [];
        // this.themeTopYs.push(0);
        // this.themeTopYs.push(this.$refs.params.$el.offsetTop - 44);
        // this.themeTopYs.push(this.$refs.comment.$el.offsetTop - 44);
        // this.themeTopYs.push(this.$refs.recommend.$el.offsetTop - 44);

        // console.log(this.themeTopYs);

        this.$nextTick(() => {
          //根据最新的数据，对应的dom是已经被渲染出来
          //但是图片是没有加载
          //offsetTop值不对的时候都是因为图片的问题
          // this.themeTopYs = [];
          // this.themeTopYs.push(0);
          // this.themeTopYs.push(this.$refs.params.$el.offsetTop - 44);
          // this.themeTopYs.push(this.$refs.comment.$el.offsetTop - 44);
          // this.themeTopYs.push(this.$refs.recommend.$el.offsetTop - 44);

          // console.log(this.themeTopYs);
        })
        //7.请求
      })


      getRecommend().then(res => {
        // console.log(res);
        this.recommends = res.data.list

      })


      //给getThemeTopY赋值
      this.getThemeTopY = debounce(() => {
        this.themeTopYs = []
        this.themeTopYs.push(0);
        this.themeTopYs.push(this.$refs.params.$el.offsetTop - 44);
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop - 44);
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop - 44);
        this.themeTopYs.push(Number.MAX_VALUE)
        console.log(this.themeTopYs);
      }, 50)
    },
    mounted() {

    },
    updated() {

    },
    methods: {
      ...mapActions(['addCart']),
      imgLoad() {
        this.newRefresh();
        this.getThemeTopY();

      },

      titleItemClick(index) {
        // console.log(index);
        // console.log(this.themeTopYs);
        this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 300)

      },
      contentScroll(position) {
        //获取y值
        const positionY = -position.y
        //2.和主题中值进行对比
        //[0,600,1000,9666,MAX_VALUE]
        //positonY 在 0-600之间 index = 0
        //positonY 在 600-1000之间 index = 1
        //positonY 在 1000-9666之间 index = 2
        //positonY 在 9666和非常大的值之间 index = 3
        let length = this.themeTopYs.length
        for (let i = 0; i < length - 1; i++) {

          if (this.currentIndex !== i && (positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i + 1])) {
            this.currentIndex = i;
            this.$refs.nav.currentIndex = this.currentIndex
          }

          this.listenShowBackTop(position)

          // if (this.currentIndex !== i && ((i < length - 1 && positionY >= this.themeTopYs[i] && positionY < this
          //     .themeTopYs[i + 1]) || (i === length - 1 && positionY >= this.themeTopYs[i]))) {
          //   this.currentIndex = i;
          //   this.$refs.nav.currentIndex = this.currentIndex
          // }

        }

      },
      addToCart() {
        //1.获取购物车需要展示的信息
        const product = {}
        product.image = this.topImages[0];
        product.title = this.goods.title;
        product.desc = this.goods.desc;
        product.price = this.goods.realPrice;
        product.iid = this.iid

        //2.将商品添加到购物车
        // this.$store.commit('addCart', product)
        this.addCart(product).then(res => {
          // this.show = true;
          // this.message = res;
          // setTimeout(() => {
          //   this.show = false;
          //   this.message = '';
          // },1500)
          this.$toast.show(res,1500)
          console.log(res);

        })

        // this.$store.dispatch('addCart', product).then(res => {
        //   console.log(res);

        // })

        //3.添加购物车成功
      }
    },
    destroyed() {
      //2.取消全局事件监听
      this.$bus.$off('itemImageLoad', this.ItemImageListener)
    }
  }

</script>
<style scoped>
  #detail {
    height: 100vh;
    position: relative;
    z-index: 10;
    background-color: #fff;
  }

  .detail-nav {
    position: relative;
    z-index: 10;
    background-color: #fff;
  }

  .content {
    height: calc(100% - 44px - 49px);
    overflow: hidden;
  }

</style>
