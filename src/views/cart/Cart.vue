<template>
  <div class="cart">
    <!-- 导航 -->
    <nav-bar class="cart-nav">
      <div slot="center">购物车({{cartLength}})</div>
    </nav-bar>
    <!-- 商品列表 -->
    <cart-list></cart-list>
    <!-- 底部汇总 -->
    <cart-bottom-bar></cart-bottom-bar>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  import CartList from './childComps/CartList'
import CartBottomBar from './childComps/CartBottomBar'

  import {
    mapGetters
  } from 'vuex'


  export default {
    name: 'Cart',
    data() {
      return {}
    },
    components: {
      NavBar,
      CartList,
      CartBottomBar
    },
    computed: {
      // cartLength() {
      //   return this.$store.getters.cartLength
      // },
      // cartLength() {
      //   return this.$store.state.cartList.length
      // }
      //两种写法
      ...mapGetters(['cartLength'])
      // ...mapGetters({
      //   length: 'cartLength'
      // })
    },
    created() {},
    mounted() {},
    methods: {}
  }

</script>
<style scoped>
.cart {
    height: 100vh;
  }
  .cart-nav {
    background-color: var(--color-tint);
    color: #fff;

  }

</style>
