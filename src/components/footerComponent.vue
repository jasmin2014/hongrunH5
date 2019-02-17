<template>
    <footer class="myfooter clear">
        <section :class="{'isactive':activePage=='0'}">
            <router-link to="/">
                <p class="icon iconfont">&#xe604;</p>
                <p>首页</p>
            </router-link>
        </section>
        <section :class="{'isactive':activePage=='1'}">
            <router-link to="/finance/list">
                <p class="icon iconfont">&#xe683;</p>
                <p>我要投资</p>
            </router-link>
        </section>
        <section :class="{'isactive':activePage=='2'}">
            <router-link to="/personal/home">
                <p class="icon iconfont">&#xe60b;</p>
                <p>我的财富</p>
            </router-link>
        </section>
        <section :class="{'isactive':activePage=='3'}" @click="showchildMenuFn">
            <!-- <router-link to="/iborrow/list"> -->
            <p class="icon iconfont">&#xe639;</p>
            <p>更多</p>
            <div class="moreitems" v-show="showChildMenu">
                <div>
                    <router-link to="/more/service">
                        <span class="icon iconfont">&#xe737;</span>客服服务
                    </router-link>
                </div>
                <div>
                    <router-link to="/more/guide">
                        <span class="icon iconfont">&#xe622;</span>帮助中心
                    </router-link>
                </div>
                <div>
                    <router-link to="/more/aboutus">
                        <span class="icon iconfont">&#xe621;</span>关于我们
                    </router-link>
                </div>
            </div>
            <!-- </router-link> -->
        </section>
    </footer>

</template>

<script type="text/ecmascript-6">
    export default {
        name: 'footerComponent',
        props: {
            activePage: String
        },
        data () {
            return {
                showChildMenu: false
            }
        },
        methods: {
            showchildMenuFn(){
                let me = this;
                if (me.showChildMenu) {
                    me.showChildMenu = false;
//                    me.activePage = '4';
                } else {
                    me.showChildMenu = true;
//                    me.activePage = '3';
                }
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
    .myfooter {
        width: 100%;
        font-size: 90%;
        height: 3rem;
        background: #fff;
        position: fixed;
        bottom: 0;
        left: 0;
        border-top: 1px solid #ddd;

    section {
        position: relative;
        width: 25%;
        height: 100%;
        float: left;
        text-align: center;
        background: #fff;
        border-right: 1px solid #ddd;
        padding: .2rem 0;

    a {

    p {
        font-size: 85%;
        margin-top: 2px;
    }

    p.iconfont {
        font-size: 140%;
        margin-top: 0;
    }

    }
    .moreitems {
        position: absolute;
        width: 100%;
        left: -1px;
        top: -7.4rem;
        text-align: center;
        border-left: 1px solid #ddd;
        background: #fff;
        border-top: 1px solid #ddd;

    >
    div {
        padding: .6rem 0;
        border-bottom: 1px solid #ddd;

    span {
        margin-right: .3rem;
    }

    }
    }
    }
    section:last-child {
        border-right: none;
    }

    section.isactive {

    p {
        color: #f30007;
    }

    }
    }


</style>
