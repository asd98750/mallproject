<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">商店街</div>
    </nav-bar>
    <tab-control @itemClick="tabClick" class="tab-control-show" v-show="isTabFixed" :titles="['流行', '新款', '精选']"
      ref="tabControl1"></tab-control>
    <scroll class="content" ref="scroll" :pull-up-load="true" :probe-type="3" @scroll="contentScroll"
      @pullingUp="loadMore">
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>

      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>
      <tab-control @itemClick="tabClick" :titles="['流行', '新款', '精选']" ref="tabControl"></tab-control>

      <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <back-top @click.native="backClick" v-show="isShow"></back-top>

  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  import TabControl from 'components/content/tabControl/TabControl'
  import GoodsList from 'components/content/goods/GoodsList'
  import Scroll from 'components/common/scroll/Scroll'
 
  import HomeSwiper from './childComps/HomeSwiper'
  import RecommendView from './childComps/RecommendView'
  import FeatureView from './childComps/FeatureView'

  import {
    getHomeMultidata,
    getHomeGoods
  } from 'network/home'

  import {
    itemListenerMixin,
    backTopMixin
  } from 'common/mixin'

  import {
    debounce
  } from 'common/utils'


import {BACK_POSITION} from 'common/const'
  // import Swiper from 'components/common/swiper/Swiper'
  // import SwiperItem from 'components/common/swiper/SwiperItem'


  export default {
    name: 'Home',
    mixins: [itemListenerMixin,backTopMixin],
    data() {
      return {
        banners: [],
        recommends: [],
        goods: {
          'pop': {
            page: 0,
            list: []
          },
          'new': {
            page: 0,
            list: []
          },
          'sell': {
            page: 0,
            list: []
          },
        },
        currentType: 'pop',
        
        tabOffsetTop: 0,
        isTabFixed: false,
        saveY: 0,

      }
    },
    components: {
      NavBar,
      TabControl,
      GoodsList,
      Scroll,
      HomeSwiper,
      RecommendView,
      FeatureView,
    },
    created() {
      //1.请求多个数据
      this.getHomeMultidata(),
        //请求商品数据
        this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')

    },
    mounted() {

      //3.监听item中图片加载
      // const refresh = debounce(this.$refs.scroll.refresh, 50)
      // this.ItemImageListener = () => {
      //   // console.log('------------');
      //   refresh()
      // }
      // this.$bus.$on('itemImageLoad',this.ItemImageListener )

    },
    computed: {
      showGoods() {
        return this.goods[this.currentType].list
      }
    },
    methods: {
      /*事件监听*/


      tabClick(index) {
        switch (index) {
          case 0:
            this.currentType = 'pop'
            break
          case 1:
            this.currentType = 'new'
            break
          case 2:
            this.currentType = 'sell'
            break

        }
        if (this.currentType !== undefined) {
          this.$refs.tabControl1.currentIndex = index;
          this.$refs.tabControl.currentIndex = index;
        }

      },
      contentScroll(position) {
        // console.log(position);
        //判断backtop是否显示
        this.listenShowBackTop(position)
        //
        this.isTabFixed = (-position.y) > this.offsetTop

      },
      loadMore() {
        console.log('上拉加载更多');
        this.getHomeGoods(this.currentType)
        this.$refs.scroll.scroll.refresh()


      },

     
      swiperImageLoad() {
        //2.获取tabControl的offsetTop
        //所有的组件都有一个$el 用于获取组件中的元素
        this.offsetTop = this.$refs.tabControl.$el.offsetTop;
      },

      /* 网络请求*/
      getHomeMultidata() {
        getHomeMultidata().then(res => {
          console.log(res);
          // this.result = res

          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list;
        })
      },
      getHomeGoods(type) {
        const page = this.goods[type].page + 1
        getHomeGoods(type, page).then(res => {
          // console.log(res);

          this.goods[type].list.push(...res.data.list);
          this.goods[type].page += 1;

          //完成上拉加载更多
          this.$refs.scroll.finishPullUp()
        })
      },

    },
    activated() {
      // console.log('actived');
      this.$refs.scroll.refresh()
      this.$refs.scroll.scrollTo(0, this.saveY, 0)


    },
    deactivated() {
      // console.log('deactived');
      this.saveY = this.$refs.scroll.getScrollY()

      //2.取消全局事件监听
      this.$bus.$off('itemImageLoad', this.ItemImageListener)
    }
  }

</script>
<style scoped>
  #home {
    /* padding-top: 44px; */
    position: relative;
    height: 100vh;
  }

  .home-nav {
    background-color: var(--color-tint);
    color: #fff;
    /* padding-bottom: 44px; */
    /* position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 10; */
  }

  /* .tab-control {
    position: sticky;
    top: 44px;
    z-index: 10;
  } */

  /* .content {
    height:calc(100%-93px);
    overflow: hidden;
     margin-top: 44px;
  } */
  .content {
    /* height: 300px; */
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }

  .tab-control-show {
    position: relative;
    z-index: 10;
  }

</style>
