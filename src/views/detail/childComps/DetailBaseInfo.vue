<template>
  <div v-if="Object.keys(goods).length !== 0" class="base-info">
    <div class="info-title">{{goods.title}}</div>
    <div class="info-price">
      <span class="n-price">{{goods.newPrice}}</span>
      <span class="o-price">{{goods.oldPrice}}</span>
      <span v-if="goods.discount" class="discount">{{goods.discount}}</span>
    </div>
    <div class="info-other">
      <span>{{goods.columns[0]}}</span>
      <span>{{goods.columns[1]}}</span>
      <span>{{goods.services[goods.services.length-1].name}}</span>
    </div>
    <div class="info-services">
      <span class="info-services-item" v-for="index in goods.services.length-1" :key="index">
        <img :src="goods.services[index-1].icon" alt="">
        <span>{{goods.services[index-1].name}}</span>
      </span>


    </div>
  </div>
</template>

<script>
  export default {
    name: 'DetailBaseInfo',
    data() {
      return {}
    },
    props: {
      goods: {
        type: Object,
        default () {
          return {}
        }
      }
    },
    components: {},
    created() {},
    mounted() {},
    methods: {}
  }

</script>

<style scoped>
  .base-info {
    color: #999;
    padding: 0 10px;
    margin-top: 10px;
  }

  .info-title {
    margin-top: 10px;
    font-size: 16px;
    color: #000;
    /* text-indent: 10px; */
  }

  .info-price {
    margin-top: 10px;
  }

  .info-price .n-price {
    color: var(--color-tint);
    font-size: 24px;
    margin-right: 5px;
    font-weight: 400;
  }

  .info-price .o-price {
    font-size: 12px;
    text-decoration: line-through;
    margin-right: 10px;
  }

  .info-price .discount {
    position: relative;
    /* display: inline-block; */
    padding: 1px 4px;
    bottom: 8px;
    color: #fff;
    font-size: 12px;
    background: var(--color-tint);
    border: 1px solid var(--color-tint);
    border-radius: 10px;

  }

  .info-other {
    display: flex;
    align-items: center;
    font-size: 14px;
    margin: 20px 0;
    /* text-align: center; */
    padding-bottom: 10px;
    border-bottom: 1px solid #eee;
    justify-content: space-between;

  }

  .info-other span {
    flex: 1;
  }

  /* .info-other span:nth-child(1){
    text-align: left;
  } */
  /* .info-other span:nth-child(3){
    text-align: right;
  }  */
  .info-services {
    display: flex;
    color: #000;
    /* align-items: center; */
    justify-content: space-between;
    font-size: 12px;
  }

  .info-services-item {
    flex: 1;
  }

  .info-services .info-services-item img {
    width: 12px;
    height: 12px;
    padding-top: 2px;
    /* color: #f00; */
  }

</style>
