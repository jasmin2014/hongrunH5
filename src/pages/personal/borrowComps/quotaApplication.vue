<template>
  <div class="content iborrow-apply">
      <moudle-header :my-title="myTitle" :page-name="pageName"></moudle-header>
    
      <div class="form-items records clear">        
        <div class="column clear">
          <label class="label" for="quatoType"><i>*</i>申请类型：</label>
          <div class="control" :class="{ 'validated': errors.has('quatoType') }">
            <label class="longradio"><input name="quatoType" v-model="baseItems.quatoType" type="radio" value="quato" />借款信用额度 </label>
          </div>
        </div>
        <div class="column clear">
          <label class="label" for="applyamount"><i>*</i>申请金额（元）：</label>
          <p class="control" :class="{ 'validated': errors.has('applyamount') }">
            <input v-model="baseItems.applyamount" v-validate="'required|applyamount'" :class="{'input': true, 'is-danger': errors.has('applyamount') }" name="applyamount" type="text" placeholder="">
            <span v-show="errors.has('applyamount')" class="help is-danger">{{ errors.first('applyamount') }}</span>
          </p>
        </div>  
        <div class="column clear">
          <label class="label" for="message"><i>*</i>申请说明：</label>
          <p class="control">
            <textarea v-model="baseItems.explain" name="message" placeholder=""></textarea>             
          </p>
        </div>      
      </div>
      <div class="form-items-btn">提交申请</div>
      <div class="record-items" v-if="tableList.total > 0">
        <section class="records-item" v-for="item in tableList.data">
            <h3>提交时间：{{item.code}}</h3>
            <p>申请类型：{{item.type}}</p>
            <p>申请金额：{{item.amount}}元</p>
            <p>审核状态：{{item.status}}</p>
            <p>处理意见：{{item.opinion}}元</p>
            <p>授信额度：{{item.quato}}</p>
        </section>
      </div>
      <div class="record-blank" v-else>
          <p>暂无数据</p>
      </div>
      
    <moudle-footer :active-page="activePage"></moudle-footer>    
  </div>
</template>

<script>
import moudleHeader from '../../../components/headerComponent';

import moudleFooter from '../../../components/footerComponent';
export default {
  name: 'BaseSet',
  components: {moudleHeader,moudleFooter},
  data () {
    return { 
      activePage:'2',  
      myTitle:'宏润共创-借款管理-额度申请', 
      pageName:'QuotaApplicationPage',
      baseItems:{
        quatoType:'',
        applyamount:'',
        explain:''
      },
      tableList:{
        total:1,
        data:[{
          code:'fadga',
          type:'gagdsdg',
          amount:'1222',
          status:'审核中',
          opinion:'处理意见没有',
          quato:5000
        }]
      }
      
    }
  },
  created(){
  },
  methods: {
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

.form-items {
  width: 96%;
  margin: .5rem auto 0 auto;
  background: #fff;
  border-radius: .2rem;
  padding: 1rem .5rem;
  h2 {
    height: 2rem;
    line-height: 2rem;
    border-bottom: 1px solid #f30007;
    font-size: 120%;
    color: #f30007;
  }
  .column {
    line-height: 2rem;
    margin-top: 1rem;
    >label {
      width: 40%;
      float: left;
      text-align:right;
      i {
        color:#f50006;
        margin-right: 10px;
      }
    }   
    .control {      
      .is-danger {
        color: #f50006;
      }
      select {
        width: 100%;
        height: 2rem;
        border: 1px solid #ddd;
      }
      label.longradio {
        width: 100%;
        display:block;
        text-align: left;
        input {
          width: 16px;
          height: 16px;
        }
      }
      textarea {
        width: 100%;
        height: 4rem;
        border: 1px solid #ddd;
      }
    }
    >p,>div {
      width: 60%;
      float: left;
      height: 100%;
      input {
        width: 100%;
        height: 2rem;
        border: 1px solid #ddd;
      }
    }
  }
  .column:first-child {
    margin-top: 0;
  }
}
.records-item {
    width: 96%;
    margin: .5rem auto 0 auto;
    background: #fff;
    padding: .5rem 1rem;
    h3 {
        font-size: 100%;
        font-weight: normal;
        line-height: 2rem;
        border-bottom: 1px dashed #ddd;
    }
    p {
        font-size: 90%;
        line-height: 2rem;
        color: #999;
    }
}

.record-blank {
    text-align: center;
    line-height: 2rem;
    margin-top: 1rem;
}
.form-items-btn {
  width: 90%;
  margin: 1rem auto;
  background:#f60005;
  color:#fff;
  height: 2rem;
  line-height: 2rem;
  text-align: center;
  border-radius: 4px;
  font-size: 90%;
}
</style>
