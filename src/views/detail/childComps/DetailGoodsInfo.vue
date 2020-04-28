<template>
  <div v-if="Object.keys(detailInfo).length !== 0" class='goods-info'>
    <div class="info-desc clear-fix">
      <div class="start liner-box">
        <i class="liner"></i>
      </div>
      <div class="desc">{{detailInfo.desc}}</div>
      <div class="end liner-box"><i class="liner"></i></div>
    </div>
    <div class="info-key">{{detailInfo.detailImage[0].key}}</div>
    <div class="info-list">
      <img v-for="(item, index) in detailInfo.detailImage[0].list" :key="index" :src="item" @load="imgLoad" alt="">
    </div>
  </div>
</template>

<script>
  export default {
    name: 'DetailGoodsInfo',
    props: {
      detailInfo: {
        type: Object,
        default () {
          return {
            
            imagesLength: 0
          }
        }
      }
    },
    data() {
      return {
        counter: 0,
      }
    },
    components: {},
    created() {},
    mounted() {},
    watch: {
      //watch监听组件变化

      detailInfo() {
        //获取图片个数
        this.imagesLength = this.detailInfo.detailImage[0].list.length

      }
    },
    methods: {
      imgLoad() {
        //判断图片都加载完了，进行一次回调
        if ( ++this.counter === this.imagesLength) {
          this.$emit('imgLoad')
        }
      },

    }
  }

</script>
<style scoped>
  .goods-info {
    padding: 20px 5px;
    border-bottom: 5px solid #f2f5f8;
  }

  .desc {
    font-size: 14px;
    color: #727272;
    padding: 20px 5px;
  }

  .start {
    float: left;
  }

  .start i {
    position: absolute;
    left: 0;
  }

  .end {
    float: right;
  }

  .end i {
    position: absolute;
    right: 0;

  }

  .liner {
    display: inline-block;

    width: 8px;
    height: 8px;
    background-color: #000;
    border-radius: 50%;
    top: -4px;
  }

  .liner-box {
    width: 100px;
    height: 1px;
    background: #a3a3a5;
    position: relative;
  }

  /* .info-list{
  width: 100%;
} */
  .info-key {
    color: #333;
    padding: 15px 5px 0;
  }

  .info-list img {
    width: 100%;
  }

</style>
