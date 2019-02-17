export default{
    BASIC : {
        ACTIVE : [1,'启用'],
        DELETE : [99,'禁用']
    },
    BOOL : {
        YES : [1,'是'],
        NO : [0,'否']
    },
    SEX : {
        MALE : [1,'男'],
        FEMALE : [2,'女']
    },
    NOTICE_TYPE : {
        BIDDING : [1,'发标预告'],
        WEBSITE : [2,'网站公告'],
        REPORT : [3,'前沿资讯']
    },
    EDUCATION : {
        LEVEL1 : [1,'高中以下'],
        LEVEL2 : [2,'大专或本科'],
        LEVEL3 : [3,'硕士或硕士以上']
    },
    HOUSE : {
        LEVEL1 : [1,'有商品房'],
        LEVEL2 : [2,'有其他（非商品房）'],
        LEVEL3 : [3,'无房']
    },
    INCOME : {
        LEVEL1 : [1,'5000以下'],
        LEVEL2 : [2,'5000-10000'],
        LEVEL4 : [3,'10000-50000'],
        LEVEL3 : [4,'50000以上']
    },
    BID_USEAGE : {
        TURNOVER : [1,'短期周转'],
        BUSINESS : [2,'生意周转'],
        LIVELIHOOD : [3,'生活周转'],
        SHOPPING : [4,'购物消费'],
        LOAN : [5,'不提现借款'],
        SETUP : [6,'创业借款'],
        OTHER : [7,'其它借款'],
    },
    BID_TYPE : {
        PLEDGE : [1,'抵押标'],
        GUARANTEE : [2,'担保标'],
        CREDIT : [3,'信用标'],
    },
    BID_STATUS : {
        UNCHECKED : [1,'待审核'],
        PROGRESS : [2,'进行中'],
        REVIEW : [3,'复审中'],
        REPAY : [4,'还款中'],
        FINISH : [5,'已完成'],
    },
    BID_REPAYMENT : {
        DISPOSABLE : [1,'一次性还款'],
        REPAYBYDAY : [2,'按天到期还款'],
        REPAYBYMOTH : [3,'按月分期还款'],
        REPAYBYQUARTER : [4,'按季分期还款'],
        PRINCIPAL : [5,'每月还息到期还本'],
    },
    USER_FUND : {
        UNFINISHED : [1,'未完成'],
        HANDLING : [2,'处理中'],
        SUCCESS : [3,'成功'],
        FAILED : [4,'失败'],
        RETURNED : [5,'退票'],
    },
    MARRY : {
        YES : [1,'已婚'],
        NO : [0,'未婚']
    },
    BID_TAB : {
        //TAB1 : [1,'优选理财'],
        TAB1 : [1,'散标投资'],
        TAB2 : [2,'债券转让'],
        TAB3 : [3,'理财债券转让']
    },
    WORK_YEAR : {
        LEVEL1 : [1,'1年以下'],
        LEVEL2 : [2,'1-3年'],
        LEVEL3 : [3,'3-5年'],
        LEVEL4 : [4,'5-10年'],
        LEVEL5 : [5,'10年以上']
    },
    FUND_TYPE : {
        CHARGE : [1,'充值'],
        WITHDRAW : [2,'提现']
    },
    SELECT_TERM : {
        LEVEL1 : [0, '不限制'],
        LEVEL2 : [1, '3个月以内'],
        LEVEL3 : [2, '4-6个月'],
        LEVEL4 : [3, '7-12个月'],
        LEVEL5 : [4,'13-24个月']
    },
    SELECT_RATE : {
        LEVEL1 : [0, '不限制'],
        LEVEL2 : [1, '10%以下'],
        LEVEL3 : [2, '10%-15%'],
        LEVEL4 : [3, '15%以上']
    },
    SELECT_STATUS : {
        UNLIMIT : [0, '不限制'],
        PROGRESS : [2, '进行中'],
        REVIEW : [3, '复审中'],
        REPAY : [4,'还款中'],
        FINISH : [5,'已完成']
    },
    SELECT_TYPE : {
        UNLIMIT : [0, '不限制'],
        PLEDGE : [1, '抵押标'],
        GUARANTEE : [2, '担保标'],
        CREDIT : [3,'信用标'],
    },
    COUPON_TYPE : {
        VIRTUAL : [1, '虚拟红包'],
        CASH : [2, '现金红包'],
    },
    COUPON_CATEGORY : {
        REGISTER : [1, '注册红包'],
        CASHBACK : [2, '满标立返'],
    },
    COUPON_STATUS : {
        UNGIVE : [1, '待发放'],
        UNUSED : [2, '未使用'],
        FREEZE : [3, '已冻结'],
        EXPIRED : [4, '已过期'],
        USED : [5, '已使用'],
        GIVEN : [6, '已发放'],
    },
    getValue: function(enumName,status) {
        var result = '';
        //$.each(this[enumName],function(index,item){
        //    if(index == status){
        //        result = item[0];
        //        return false;
        //    }
        //});
        for(let index in this[enumName]){
            if(index == status){
                result = this[enumName][index][0];
                break;
            }
        }
        return result;
    },
    getDesc: function(enumName,value) {
        var result = '未知';
        //$.each(this[enumName],function(index,item){
        //    if(item[0] == value){
        //        result = item[1];
        //        return false;
        //    }
        //});
        for(let index in this[enumName]){
            if(this[enumName][index][0] == value){
                result = this[enumName][index][1];
                break;
            }
        }

        return result;
    },
    getItems: function(enumName,except = []) {
        let result = [];
        //$.each(this[enumName],function(index,item){
        //    if($.inArray(index, except) == -1)
        //        result.push({value:item[0],label:item[1]});
        //});

        for(let index in this[enumName]){
            if(!this.in_array(index,except)){
                result.push({value:this[enumName][index][0],label:this[enumName][index][1]});
            }
        }
        return result;
    },
    in_array: function(needle, haystack) {
        let n = haystack.length;

        for (let i = 0;i < n; ++i){
            if (haystack[i] === needle)
                return true;
        }
        return false;
    }
};