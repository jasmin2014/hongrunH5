<template>
  <div class="content iborrow-apply">
    <moudle-header :my-title="myTitle" :page-name="pageName"></moudle-header>
      <form>
        <div class="form-items">
          <h2>借款信息</h2>
          <div class="column clear">
            <label class="label" for="amount"><i>*</i>信贷总金额：</label>
            <p class="control" :class="{ 'validated': errors.has('amount') }">
              <input v-model="amount" v-validate="'required|amount'" :class="{'input': true, 'is-danger': errors.has('amount') }" name="amount" type="text" placeholder="">
              <span v-show="errors.has('amount')" class="help is-danger">{{ errors.first('amount') }}</span>
            </p>
          </div>
          <div class="column clear">
            <label class="label" for="interest"><i>*</i>年利率(%)：</label>
            <p class="control" :class="{ 'validated': errors.has('interest') }">
              <input v-model="interest" v-validate="'required|interest'" :class="{'input': true, 'is-danger': errors.has('interest') }" name="interest" type="text" placeholder="">
              <span>(利率范围：0.00%-24%)</span><br/>
              <span v-show="errors.has('interest')" class="help is-danger">{{ errors.first('interest') }}</span>
            </p>
          </div>
          <div class="column clear">
            <label class="label" for="purpose"><i>*</i>借款用途：</label>
            <p class="control" :class="{ 'validated': errors.has('purpose') }">
              <select v-model="purpose" name="purpose" v-validate="'required|purpose'" :class="{'input': true, 'is-danger': errors.has('purpose') }" placeholder="请选择借款用途">
                <option>短期周转</option>
                <option>生意周转</option>
                <option>生活周转</option>
                <option>购物消费</option>
                <option>不提现借款</option>
                <option>创业借款</option>
                <option>其它借款</option>
              </select>              
              <span v-show="errors.has('purpose')" class="help is-danger">{{ errors.first('purpose') }}</span>
            </p>
          </div>
          <div class="column clear">
            <label class="label" for="iborrowLimit"><i>*</i>借款期限：</label>
            <p class="control" :class="{ 'validated': errors.has('iborrowLimit') }">
              <select v-model="iborrowLimit" name="iborrowLimit" v-validate="'required|iborrowLimit'" :class="{'input': true, 'is-danger': errors.has('iborrowLimit') }"  placeholder="请选择借款用途">
                <option>一个月</option>
                <option>两个月</option>
                <option>三个月</option>
                <option>四个月</option>
                <option>五个月</option>
                <option>六个月</option>
                <option>七个月</option>
                <option>八个月</option>
                <option>九个月</option>
                <option>十个月</option>
                <option>十一个月</option>
                <option>十二个月</option>
                <option>十三个月</option>
                <option>十四个月</option>
                <option>十五个月</option>
                <option>十六个月</option>
                <option>十七个月</option>
                <option>十八个月</option>
                <option>十九个月</option>
                <option>二十个月</option>
                <option>二十一个月</option>
                <option>二十二个月</option>
                <option>二十三个月</option>
                <option>二十四个月</option>
              </select>
              <label class="byday clear">
                <input name="byday" type="checkbox" value="" />
                <span>按天</span>
              </label>
              <span v-show="errors.has('iborrowLimit')" class="help is-danger">{{ errors.first('iborrowLimit') }}</span>
            </p>
          </div>
          <div class="column clear">
            <label class="label" for="minimum"><i>*</i>最低投标金额：</label>
            <p class="control" :class="{ 'validated': errors.has('minimum') }">
              <select v-model="minimum" name="minimum" v-validate="'required|minimum'" :class="{'input': true, 'is-danger': errors.has('minimum') }"  placeholder="请选择">
                <option>100</option>
                <option>200</option>
                <option>300</option>
                <option>500</option>
                <option>1000</option>
                <option>2000</option>
                <option>3000</option>
                <option>4000</option>
                <option>5000</option>
                <option>10000</option>                
              </select>              
              <span v-show="errors.has('minimum')" class="help is-danger">{{ errors.first('minimum') }}</span>
            </p>
          </div>
          <div class="column clear">
            <label class="label" for="tallest"><i>*</i>最多投标金额：</label>
            <p class="control" :class="{ 'validated': errors.has('tallest') }">
              <select v-model="tallest" name="tallest" v-validate="'required|tallest'" :class="{'input': true, 'is-danger': errors.has('tallest') }"  placeholder="没有限制">
                <option>没有限制</option>
                <option>1500元</option>
                <option>2000元</option>
                <option>3000元</option>
                <option>4000元</option>
                <option>5000元</option>
                <option>20000元</option>             
              </select>              
              <span v-show="errors.has('tallest')" class="help is-danger">{{ errors.first('tallest') }}</span>
            </p>
          </div>
          <div class="column clear">
            <label class="label" for="validtime"><i>*</i>有效时间：</label>
            <p class="control" :class="{ 'validated': errors.has('validtime') }">
              <select v-model="validtime" name="validtime" v-validate="'required|validtime'" :class="{'input': true, 'is-danger': errors.has('validtime') }"  placeholder="没有限制">
                <option>1天</option>
                <option>2天</option>
                <option>3天</option>
                <option>4天</option>
                <option>5天</option>
                <option>6天</option>
                <option>7天</option>             
              </select>              
              <span v-show="errors.has('validtime')" class="help is-danger">{{ errors.first('validtime') }}</span>
            </p>
          </div>
          <div class="column clear">
            <label class="label" for="repayment"><i>*</i>还款方式：</label>
            <p class="control" :class="{ 'validated': errors.has('repayment') }">
              <select v-model="repayment" name="repayment" v-validate="'required|repayment'" :class="{'input': true, 'is-danger': errors.has('repayment') }"  placeholder="没有限制">
                <option>按天到期还款</option>
                <option>按月分期还款</option>
                <option>按季分期还款</option>
                <option>每月还息到期还本</option>
                <option>一次性还款</option>      
              </select>              
              <span v-show="errors.has('repayment')" class="help is-danger">{{ errors.first('repayment') }}</span>
            </p>
          </div>
          <div class="column clear">
            <label class="label award" for="award"><i>*</i>是否有投标奖励：</label>
            <p class="control award" :class="{ 'validated': errors.has('repayment') }">
              <label class="byday clear">
                <input name="award" v-model="award" type="checkbox" value="" />
              </label>       
              <span v-show="errors.has('award')" class="help is-danger">{{ errors.first('award') }}</span>
            </p>
          </div>
          <div class="column clear">
            <label class="label award" for="bidlimit"><i>*</i>是否有投标待收限制：</label>
            <p class="control award" :class="{ 'validated': errors.has('bidlimit') }">
              <label class="byday clear">
                <input name="bidlimit" v-model="bidlimit" type="checkbox" value="" />
              </label>       
              <span v-show="errors.has('bidlimit')" class="help is-danger">{{ errors.first('bidlimit') }}</span>
            </p>
          </div>
        </div>
        <div class="form-items">
          <h2>借款的详细说明</h2>
          <div class="column clear">
            <label class="label btitle" for="btittle">标题：</label>
            <p class="control btitle">
              <input v-model="btittle" name="btittle" type="text" placeholder="">              
            </p>
          </div>
          <div class="column clear">
            <label class="label btitle" for="biddirection">是否定向标：</label>
            <p class="control btitle">  
              <label class="byday clear">
                <input name="biddirection" v-model="biddirection" type="checkbox" value="" />
                <span>备选项</span>
              </label>           
            </p>
          </div>
          <div class="column clear">
            <label class="label btitle" for="explain">借款说明：</label>
            <p class="control itextarea">
              <textarea rows="3" cols="20" v-model="explain" placeholder="请输入"></textarea>
            </p>
          </div>
        </div>
        <div class="form-items-btn">
          提交接口申请
        </div>
      </form>
    <moudle-footer :active-page="activePage"></moudle-footer>    
  </div>
</template>

<script>
import moudleHeader from '../../components/headerComponent';
import moudleFooter from '../../components/footerComponent';
export default {
  name: 'HelloWorld',
  components: {moudleHeader,moudleFooter},
  data () {
    return { 
      activePage:'2',  
      myTitle:'宏润共创-申请借款', 
      pageName:'apply',  
      amount:'',
      interest:'',
      purpose:'',
      iborrowLimit:'',
      minimum:'',
      tallest:'',
      validtime:'',
      repayment:'',
      award:'',
      bidlimit:'',
      btittle:'',
      biddirection:'',
      explain:''
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
}
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
    label {
      width: 35%;
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
    .control.itextarea {
      width: 70%;
    }
    .control.itextarea textarea {
      width: 100%;
      border: 1px solid #ddd;
    }
    .control.award {
      width: 50%;
    }
    .control.btitle {
      width: 70%;
    }
    p {
      width: 65%;
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
