<template>
    <div id="container">
        <moudle-header :my-title="myTitle" :page-name="pageName" :back-url="backUrl"></moudle-header>
        <iframe name="ipsFrame" id="ipsFrame" frameborder=0  width="100%" height="100%"></iframe>
        <form name="ipsForm" id="ipsForm" method="post" :action="ips.url" target="ipsFrame">
            <input type="hidden" name="operationType" v-model="ips.operationType"/>
            <input type="hidden" name="merchantID" v-model="ips.merchantID"/>
            <input type="hidden" name="sign" v-model="ips.sign"/>
            <input type="hidden" name="request" v-model="ips.request"/>
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
                    operationType: '',
                    merchantID: '',
                    sign: '',
                    request: '',
                },
                backUrl: ''
            }
        },
        mounted (){
            this.ips = JSON.parse(Base64.decode(sessionStorage.getItem('ips')));
            this.backUrl = sessionStorage.getItem('backUrl');
            if (this.ips.request) {
                this.$nextTick(function () {
                    document.ipsForm.submit();
                    $('#container').height($(document).height() - 40);
                    sessionStorage.removeItem('ips');
                })
            }
        }
    }
</script>

