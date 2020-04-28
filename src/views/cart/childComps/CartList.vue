<template>
  <div class='cart-list'>
    <scroll class="content" ref="scroll">
      <cart-list-item v-for="(item, index) in cartList" :key="index" :product="item"></cart-list-item>

    </scroll>
  </div>
</template>

<script>
  import {
    mapGetters
  } from 'vuex'

  import Scroll from 'components/common/scroll/Scroll'
  import CartListItem from './CartListItem'
  export default {
    name: 'CartList',
    data() {
      return {}
    },
    computed: {
      ...mapGetters(['cartList'])
    },
    components: {
      Scroll,
      CartListItem
    },
    created() {},
    activated () {
      this.$refs.scroll.refresh()
    },
    mounted() {},
    methods: {}
  }

</script>
<style scoped>
  .cart-list {
    height: calc(100% - 44px - 49px - 40px);
  }

  .content {
    height: 100%;
    overflow: hidden;
  }

</style>
