<template>
  <div class='bottom-bar'>
    <div class="check-content">
      <check-button @click.native="checkClick" :is-checked="isSelectAll" class="check-button"></check-button>
      <span>全选</span>
    </div>
    <div class="total-price">
      合计：{{totalPrice}}
    </div>

    <div class="calculate" @click="calcClick">
      去结算：{{checkLength}}
    </div>
  </div>
</template>

<script>
  import CheckButton from 'components/content/checkButton/CheckButton'

  export default {
    name: 'CartBottomBar',
    data() {
      return {}
    },
    components: {
      CheckButton
    },
    computed: {
      totalPrice() {
        return '￥' + this.$store.state.cartList.filter(item => {
          return item.checked
        }).reduce((preValue, item) => {
          return preValue + item.price * item.count
        }, 0).toFixed(2)
      },
      checkLength() {
        return this.$store.state.cartList.filter(item => {
          return item.checked
        }).length
      },
      isSelectAll() {
        // if (this.$store.state.cartList.length === 0) {
        //   return false
        // }
        // return !(this.$store.state.cartList.filter(item => !item.checked).length)

        // if (this.$store.state.cartList.length === 0) {
        //   return false
        // }
        // return !this.$store.state.cartList.find(item => !item.checked)
        if (this.$store.state.cartList.length === 0) {
          return false
        }
        for (let item of this.$store.state.cartList) {
          if (!item.checked) {
            return false
          }
        }
        return true
      }
    },
    created() {},
    mounted() {},
    methods: {
      checkClick() {
        if (this.isSelectAll) { //全选中
          this.$store.state.cartList.forEach(item => item.checked = false)

        } else {
          //部分或全不选中
          this.$store.state.cartList.forEach(item => item.checked = true)
        }

        // this.$store.state.cartList.forEach(item => item.checked = !this.isSelectAll)
      },
      calcClick() {
        if (!this.isSelectAll) {
          this.$toast.show('请选择购买的商品', 1500)
        }
      }
    }
  }

</script>
<style scoped>
  .bottom-bar {
    display: flex;
    position: relative;

    /* bottom: 49px; */
    line-height: 40px;
    height: 40px;
    font-size: 14px;
    background-color: #eee;
  }

  .check-content {
    margin-left: 10px;
    display: flex;
    align-items: center;

    width: 60px;
  }

  .check-button {
    line-height: 20px;
    width: 20px;
    height: 20px;
    margin-right: 5px;
  }

  .total-price {
    margin-left: 10px;

    flex: 1;
  }

  .calculate {
    width: 90px;
    background-color: #f60;
    color: #fff;
    text-align: center;
  }

</style>
