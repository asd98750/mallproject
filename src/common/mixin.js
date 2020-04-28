import {
  debounce
} from 'common/utils'
import {BACK_POSITION} from 'common/const'
export const itemListenerMixin = {
  data() {
    return {
      ItemImageListener: null,
      newRefresh: null
    }
  },
  mounted() {
    this.newRefresh = debounce(this.$refs.scroll.refresh, 50)
    this.ItemImageListener = () => {
      // console.log('------------');
      this.newRefresh()
      // console.log('5555');
    }
    this.$bus.$on('itemImageLoad', this.ItemImageListener)

  }
}

import BackTop from 'components/content/backtop/BackTop'
export const backTopMixin = {
  components: {
    BackTop
  },
  data() {
    return {
      isShow: false,
    }
  },
  methods: {
    backClick() {
      // console.log('回到顶部');
      this.$refs.scroll.scrollTo(0, 0, 500)
    },
    listenShowBackTop(position) {
      this.isShow = (-position.y) > BACK_POSITION
    }
  }
}
