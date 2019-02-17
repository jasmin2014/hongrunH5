<template>
    <div>
        <header class="home-header" v-if="pageName==='homePage'">
            <!-- <span class="icon iconfont">&#xe61d;</span> -->
            <p class="clear logo-txt"><!-- <span class="h-logo"></span> --><span>{{myTitle}}</span></p>
            <p class="clear logo-logandreg" v-if="!isLogin">
                <router-link to="/login"><span class="icon iconfont">&#xe607;</span></router-link>
                <router-link to="/reg"><span class="icon iconfont">&#xe606;</span></router-link>
            </p>
            <p v-else class="islogin">
                <router-link to="personal/home"><i class="icon iconfont">&#xe60b;</i>{{userInfo.username}}</router-link>
            </p>
        </header>
        <header class="else-header" v-else>
            <p class="logo-txt"><span style="color: #fff">{{myTitle}}</span></p>
            <span class="icon iconfont" @click="HandleReturnBack">&#xe625;</span>
        </header>
        <div style="height: 2.6rem"></div>
    </div>
</template>

<script type="text/ecmascript-6">
    import {mapActions, mapGetters} from 'vuex';
    export default {
        props: {
            pageName: String,
            myTitle: String,
            backUrl: String
        },
        data () {
            return {
                isLogin: false
            }
        },
        created () {
            this.initUserInfo();
        },
        mounted (){
            if (JSON.stringify(this.userInfo) !== '{}') {
                this.isLogin = true;
            }
        },
        computed: mapGetters([
            'userInfo'
        ]),
        methods: {
            ...mapActions([
                'setUserInfo'
            ]),
            initUserInfo() {
                let authUser = sessionStorage.getItem('authUser');
                if (authUser) {
                    let authUser = JSON.parse(Base64.decode(sessionStorage.getItem('authUser')));
                    this.setUserInfo(authUser);
                } else {
                }
            },
            HandleReturnBack() {
                if (this.backUrl) {
                    this.$router.push({path: this.backUrl});
                } else {
                    this.$router.go(-1);
                }
            }
        }
    }
</script>
<style lang="scss" scoped>
    header {
        height: 2.6rem;
        line-height: 2.6rem;
        background: #f30007;
        color: #fff;
        text-align: center;
        p {
            color: #fff;
        }
    }

    .else-header {
        /*position: relative;*/
        position: fixed;
        top: 0px;
        width: 100%;
        font-size: 90%;
        z-index: 999;
        p {
            color: #fff;
        }
        > span {
            position: absolute;
            left: .3rem;
            top: 0;
            font-size: 120%;
            width: 2.7rem;
            height: 2.7rem;
            line-height: 2.7rem;
            text-align: center;
            color: #fff;
        }
    }

    .home-header {
        /*position: relative;  */
        position: fixed;
        top: 0px;
        width: 100%;
        font-size: 90%;
        z-index: 999;
        > span.iconfont {
            display: block;
            width: 2rem;
            height: 2rem;
            position: absolute;
            left: 0;
            top: 0;
            font-size: 160%;
            color: #fff;
        }
        p.logo-txt {
            width: 50%;
            margin: 0 auto;
            position: relative;
            color: #fff;
            span {
                color: #fff;
            }
            /*.h-logo {
                display: block;
                width: 1.4rem;
                height: 1.4rem;
                position: absolute;
                left:50%;
                top:50%;
                margin: -.7rem 0 0 -4.5rem;
                background: url("../assets/images/logo-alone.png") no-repeat center center;
                background-size: 100%;
            }*/
        }
        p.logo-logandreg {
            position: absolute;
            right: 0;
            top: 0;
            a {
                display: inline-block;
                width: 2rem;
                height: 2rem;
                float: left;
                font-size: 85%;
                margin-left: .5rem;
                span {
                    font-size: 180%;
                    color: #fff;
                }
            }
        }
        p.islogin {
            position: absolute;
            right: 1.5rem;
            top: 0;
            color: #fff;
            a {
                display: inline-block;
                width: 2rem;
                height: 2rem;
                font-size: 85%;
                margin: 0 .5rem;
                color: #ffd3d4;
                text-decoration: underline;
                i {
                    color: #fff;
                }
            }
        }
    }
</style>

