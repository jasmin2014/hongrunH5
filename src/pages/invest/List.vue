<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <router-link to="invest/detail">标的详情</router-link>
  </div>
</template>

<script>
export default {
  name: 'InvestList',
  data () {
    return {
      msg: 'This is invest list page'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
