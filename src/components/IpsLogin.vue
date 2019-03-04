<template>
    <div id="container">
        <moudle-header :my-title="myTitle" :page-name="pageName" :back-url="backUrl"></moudle-header>
        <iframe name="ipsFrame" id="ipsFrame" frameborder=0 width="100%" height="100%"></iframe>
        <form name="ipsForm" id="ipsForm" method="post" :action="ips.url" target="ipsFrame">
            <input type="hidden" name="userName" v-model="ips.userName"/>
            <input type="hidden" name="merchantId" v-model="ips.merchantId"/>
        </form>
    </div>
</template>

<script type="text/ecmascript-6">
  import moudleHeader from './headerComponent';
  export default {
    name: 'Ips',
    components: {moudleHeader},
    data () {
      return {
        pageName: 'ips',
        myTitle: '宏润共创-环迅支付',
        ips: {
            url: '',
            userName: '',
            merchantId: '',
        },
        backUrl: '/personal/home'
      }
    },
    mounted (){
        this.ips = JSON.parse(Base64.decode(sessionStorage.getItem('ips')));
        if(this.ips.userName){
          this.$nextTick(function () {
            document.ipsForm.submit();
            $('#container').height($(document).height() - 40);
          })
        }
    }
  }
</script>

