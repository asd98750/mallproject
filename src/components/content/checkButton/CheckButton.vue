<template>
  <div class='check-button' :class="{check:isChecked}">
    <img src="~assets/img/cart/tick.svg" alt="">
  </div>
</template>

<script>
  export default {
    name: 'CheckButton',
    props: {
      isChecked: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {}
    },
    components: {},
    created() {},
    mounted() {},
    methods: {
      
    }
  }

</script>
<style scoped>
  .check-button {

    border: 2px solid #aaa;
    border-radius: 50%;
  }

  .check {
    background-color: var(--color-high-text);
    border-color: var(--color-high-text);
  }

</style>
