<template>
  <div>
    <form>
        <div class="form-items">
          还在开发中，敬请等待！
        </div>
       
      </form> 
  </div>
</template>

<script>
export default {
  name: 'HeadInfo',
  data () {
    return {       
      companyname:'', 
      telephone:'',
      companyaddress:'',
      workYears:'10'
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
      .base-pickers {
        >.picker {
          width: 50%;
          float: left;
        }
      }
      .base-address {
        position: relative;
        .iconfont {
          position: absolute;
          right: .5rem;
          top: 50%;
          margin-top: -1rem;
        }
      }
      label.radio {
        width:30%;
        float:left;
        text-align: left;
        input {
          width: 16px;
          height: 16px;
        }
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
    >p,>div {
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
