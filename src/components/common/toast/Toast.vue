<template>
  <div class='toast' v-show="isShow">
    <div>{{message}}</div>
  </div>
</template>

<script>
  export default {
    name: 'Toast',

    data() {
      return {
        message: '',
        isShow: false
      }
    },
    components: {},
    created() {},
    mounted() {},
    methods: {
      show(message, duration = 1000) {
        this.isShow = true;
        this.message = message

        setTimeout(() => {
          this.isShow = false;
          this.message = ''
        }, duration)
      }
    }
  }

</script>
<style scoped>
  .toast {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 8px 10px;
    border-radius: 5px;
    color: #fff;
    background: rgba(0, 0, 0, .6);
    z-index: 999;
  }

</style>
