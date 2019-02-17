<template>
  <div class="content iborrow-apply">
    <moudle-header :my-title="myTitle" :page-name="pageName"></moudle-header>
    <div class="form-items clear"> 
      <h2>我的红包</h2>
      <div class="column clear reditem">
        <label class="label" for="types"><i>*</i>类型：</label>
        <p class="control">
          <select v-model="types" name="types" placeholder="请选择">
            <option value="1">全部</option>
            <option value="2">全部2</option>
          </select>  
        </p>
      </div>
      <div class="column clear reditem">
        <label class="label" for="category"><i>*</i>分类：</label>
        <p class="control">
          <select v-model="category" name="category" placeholder="请选择">
            <option value="1">全部</option>
            <option value="2">全部2</option>
          </select>  
        </p>
      </div>
      <div class="column clear reditem">
        <label class="label" for="status"><i>*</i>状态：</label>
        <p class="control">
          <select v-model="status" name="status" placeholder="请选择">
            <option value="1">全部</option>
            <option value="2">全部2</option>
          </select>  
        </p>
      </div>
      <div class="form-items-btn reditem">
        搜索
      </div>
    </div>
    <div class="record-items" v-if="records.length>0">         
      <section class="records-item" v-for="item in records">
        <h3>红包名称：{{item.redname}}</h3>
        <p>全额：{{item.amount}}</p>
        <p>类型：{{item.type}}</p>
        <p>启用金额：{{item.useAmount}}</p>
        <p>领取时间:{{item.receivetime}}</p>
        <p>过期时间:{{item.pastdue}}</p>
        <p>状态:{{item.status}}</p>
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
  name: 'BaseInfo',
  components: {moudleHeader,moudleFooter},
  data () {
    return { 
      activePage:'2',  
      myTitle:'宏润共创-资金管理-我的红包', 
      pageName:'BaseSet', 
      selected:'1',
      types:'',
      category:'',
      status:'',
      records: [{
        redname: '003',
        amount:5000,
        type: '',
        useAmount:2000,
        receivetime:'2017-11-22',
        pastdue:'2017-11-24',
        status: '未使用'
      },{
        redname: '001',
        amount:5000,
        type: '',
        useAmount:2000,
        receivetime:'2017-11-22',
        pastdue:'2017-11-24',
        status: '已使用'
      },{
        redname: '002',
        amount:5000,
        type: '',
        useAmount:2000,
        receivetime:'2017-10-22',
        pastdue:'2017-10-24',
        status: '已过期'
      }]
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
.iborrow-apply {
  padding-bottom: 3rem;
  .mint-navbar {
    .mint-tab-item {
      .mint-tab-item-label.is-selected {
        color:#f30007;
      }
    }
  }
}
.form-items {
  width: 96%;
  margin: .5rem auto 0 auto;
  background: #fff;
  border-radius: .2rem;
  padding: 1rem .5rem;
  font-size: 90%;  
  h2 {
    height: 2rem;
    line-height: 2rem;
    border-bottom: 1px dashed #ddd;
    font-size: 120%;
    color: #333;
    font-weight: normal;
  }  
  .column {
    line-height: 2rem;
    margin-top: 1rem;
    >label {
      width: 30%;
      float: left;
      text-align:right;
      i {
        color:#f50006;
        margin-right: 10px;
      }
    }
    label.btitle {
      width: 30%;
    }
    label.award {
      width: 50%;
    }
    .control {
      .byday {
        input {
          width: 16px;
          height: 16px;
          float: left;
          margin: .5rem .5rem 0 0;
        }
        span {
          float: left;
        }        
      }
      .is-danger {
        color: #f50006;
      }
      select {
        width: 100%;
        height: 2rem;
        border: 1px solid #ddd;
      } 
    }   
    >p,>div {
      width: 70%;
      float: left;
      height: 100%;
      input {
        width: 100%;
        height: 2rem;
        border: 1px solid #ddd;
      }
    }
  }
  .reditem {
    width: 50%;
    float: left;
    label {
      width: 40%;
    }
    .control {
      width: 60%;
    }
  }
  .form-items-btn.reditem {
    width: 30%;
    margin-left: 20%;
  }
  .column:first-child {
    margin-top: 0;
  }
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
    color:#999;
  }
}
.record-blank {
  text-align: center;
  line-height: 2rem;
  margin-top:1rem;
}
</style>
