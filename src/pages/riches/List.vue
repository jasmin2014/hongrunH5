<template>
  <div class="fund-items">
    <moudle-header :my-title="myTitle"></moudle-header>
    
    <moudle-footer :active-page="activePage"></moudle-footer> 
  </div>
</template>

<script>
import moudleHeader from '../../components/headerComponent';
import moudleFooter from '../../components/footerComponent';
export default {
  name: 'InvestList',
  components: {moudleHeader,moudleFooter},
  data () {
    return {
      activePage:"2",
      myTitle:"理财产品"
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

</style>
