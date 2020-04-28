<template>
  <div class='goods-list-item' @click="goodsItemClick">
    <img v-lazy="showImage" alt="" @load="imageLoad">
    <div class="items-info">
      <p>{{goodsItem.title}}</p>
      <span class="price">{{goodsItem.price}}</span>
      <span class="collect">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'GoodsListItem',
    props: {
      goodsItem: {
        type: Object,
        default () {
          return {}
        }
      }
    },
    data() {
      return {}
    },
    computed: {
      showImage() {
        return this.goodsItem.image || this.goodsItem.show.img
      }
    },
    components: {},
    created() {},
    mounted() {},
    methods: {
      imageLoad() {
        this.$bus.$emit('itemImageLoad')
        // if (this.$route.path.indexOf('/home')) {
        //   this.$bus.$emit('homeitemImageLoad')
        // }else if(this.$route.path.indexOf('/detail')) {
        //   this.$bus.$emit('detailitemImageLoad')
        // }


      },
      goodsItemClick() {
        // console.log('跳转到详情页');
        this.$router.push('/detail/' + this.goodsItem.iid)

      }
    }
  }

</script>
<style scoped>
  .goods-list-item {
    padding-bottom: 40px;
    position: relative;
    width: 48%;
  }

  .goods-list-item img {
    width: 100%;
    height: 100%;
    border-radius: 5px;
    border: 2px solid rgba(0, 0, 0, .2);
  }

  .items-info {
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
  }

  .items-info p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;

  }

  .items-info .price {
    color: var(--color-high-text);
    margin-right: 30px;
  }

  .items-info .collect {
    position: relative;

  }

  .items-info .collect::before {
    content: '';
    position: absolute;
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px;
    background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
  }

</style>
