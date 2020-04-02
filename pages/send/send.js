// pages/send/send.js
var app = getApp();
const url = require('../../utils/url.js');
var constant = require('../../utils/constant.js');
var isPhone = require('../../utils/isPhone.js');
var except = require('../../utils/except.js');
var md5 = require('../../utils/md5.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    beizhu: '',
    hiddenModal: true,
    menuPro: {},
    allMenu: {},
    orderRemark: '',
    TimeInfo: [{ id: 1, text: '微信在线支付' }, { id: 2, text: '现金支付' }],
    TimeMethodIndex: 0,
    ZHNum: '',
    shopName: '',
    shopImg: '',
    addressNum: 0,
    addressObj: null,
    menuId: null,
    payId: 2,
    moneyAll: 0,
    toastData: '',
    isToast: true,
    typeValue: null,
    goodsMoney: 0,
    sendMoney: 0,
    isViewDisabled: true,
    shopId: null, appinTimePro: [],
    memberInformation: null,
    specialOfferPrice: 0,
    PreferentialActivitiesPro: {},
    discountObj: { 'price': 0 },
    remarks: '',
    isInvoice: true,
    invoiceType: null,
    isInvoiceName: false,
    isYE: false,
    couponPro: [], tablewareIndex:0,
    tablewarePro: [{ 'name': '不需要餐具', 'id': 99 }, { 'name': '1份', 'id': 1 }, { 'name': '2份', 'id': 2 }, { 'name': '3份', 'id': 3 }, { 'name': '4份', 'id': 4 }, { 'name': '5份', 'id': 5 }, { 'name': '6份', 'id': 6 }, { 'name': '7份', 'id': 7 }, { 'name': '8份', 'id': 8 }, { 'name': '9份', 'id': 9 }, { 'name': '10份', 'id': 10 }, { 'name': '10份以上', 'id': -10 }],
    couponIndex: 0,
    cardNo: 0,
    ye: 0,
    isLoading: false,
    couponObj: {},
    goodsMenus: 0,
    syGoodsPrice: 0,
    meailFeeMoney: 0,
    yhPro: [],
    personName: '',
    personPhone: '',
    shopAddress: null,
    shopLat: 0,
    shopLng: 0,
    isJD: false,
    f_p_1: '',
    f_p_2: '',
    invoiceId: 0,
    discountNamePro: [],
    discountProType1: {},
    menuPro1: [],
    menuDataPro: [],
    normalView: false,
    discountProType22: [],
    deskId: '',
    isNotmember: true,
    isNotmembermsg: '',
    //自取，外卖时间
    name: 'name', timeValue: null, 
   
    index: 0,
    typeNamePro: null,
    typeNamePro_: null,
    appointTimes: null,
    takeSelfTimes: null,
    typePro_: [], ispack: '',
    typePro1_: [], packPro: [{ id: 1, name: '打包' }, { id: 2, name: '不打包' }],
    packindex: 0, isVkamember:true,
    isNotmember: true, isTaketime1: true, isTaketime:true,
    isNotmembermsg: '', color: '', tablewareObj: {}, canPreList: [], couponId: 0,
    templateIds: [], couponNum: 0, reachFee:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var b = JSON.parse(app.globalData.globalmenu)
    app.globalData.coupon = null
    //暂不支持类型
    this.setData({
      reachFee: options.reachFee ? options.reachFee: 0,
      isVkamember: app.globalData.isVka == 1 ? true : false,
      color: app.globalData.color,
      deskId: app.globalData.deskId,
      menuDataPro: b,
      menuPro: app.globalData.menuPro,
      allMenu: app.globalData.allpro,
      ZHNum: app.globalData.XHNum,
      shopName: app.globalData.shopName,
      shopImg: app.globalData.shopImg,
      shopId: options.shopId ? options.shopId : app.globalData.shopId,
      // shopId: 10029639,
      menuId: options.menuId,
      moneyAll: options.money,
      typeValue: app.globalData.typeValue,
      goodsMoney: options.goodsMoney,
      sendMoney: app.globalData.sendMoney,
      specialOfferPrice: app.globalData.specialOfferPrice,
      isInvoice: app.globalData.isInvoice,
      goodsMenus: options.goodsMoney,
      meailFeeMoney: app.globalData.meailFee,
      shopAddress: app.globalData.shopAddress,
      shopLat: app.globalData.shopLat,
      shopLng: app.globalData.shopLng,
      personPhone: app.globalData.phone,
      personName: app.globalData.personName,
      remarks: app.globalData.note,
      ispack: app.globalData.ispack==0?'不打包':'打包'
    })
    this.getInvoice();
    this.getShopData(app.globalData.JSESSIONID, options.shopId, app.globalData.latitude, app.globalData.longitude,'no');
    this.getTemplates()
    if (app.globalData.typeValue != 2) {
      this.getAllAdress(app.globalData.JSESSIONID, this.data.shopId, this.data.moneyAll);
    }
    if (app.globalData.isVka==1){
      this.getdiscountInfovka(options.shopId ? options.shopId : app.globalData.shopId, options.goodsMoney, options.money)
      //vka营销活动
    }else{
      this.getdiscountInfo(options.shopId ? options.shopId : app.globalData.shopId, options.goodsMoney, options.money, 'fir', 'none')
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;

    that.setData({
      isViewDisabled: true,
      addressNum: 0,
      remarks: app.globalData.note,
      ispack: app.globalData.ispack == 0 ? '不打包' : '打包'
    })
    console.log(app.globalData.sendAddress)
    if (app.globalData.sendAddress) {
      that.setData({
        addressObj: app.globalData.sendAddress
      })

    }
    if (app.globalData.coupon){
      that.bindCouponChangevka()
    }else{
      that.notCouponPrice(0)
    }

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: constant.title, // 分享标题
      desc: constant.desc, // 分享描述
      path: constant.sharePath // 分享路径
    }
  },
  btn_pre(e){
    var that=this
    var canPreList = that.data.canPreList
    var item = e.currentTarget.dataset.item
    var items = canPreList[item.index].items
    var index = e.currentTarget.dataset.index//小数组下标
    var y = e.currentTarget.dataset.i //大数组下标
    console.log(e)
    if (!item.isCompatible){
      wx.showModal({
        title: '提示',
        content: '当前活动与其他活动不能同时享受，是否继续使用？',
        confirmColor: '#CAA284',
        confirmText: '继续',
        success: function (res) {
          console.log(res);
          if (res.confirm) {
            for (var r = 0; r < canPreList.length;r++){
              for (var i = 0; i < items.length; i++) {
                console.log(i, index)
                if (i == index&&r==y) {
                  canPreList[r].items[i].isSelect = true
                } else {
                  canPreList[r].items[i].isSelect = false
                }
              }
            }
            var obj = {}
            var obj1 = {}
            var pres = []
            obj1[item.index] = item.num
            obj[canPreList[y].pid] = obj1
            that.getdiscountInfo(that.data.shopId, that.data.goodsMoney, that.data.moneyAll, 'sec', obj)
          }
        }
      })
    }else{
      canPreList[y].items[index].isSelect = true
      var pres = []
      var obj = {}
      for (var r = 0; r < canPreList.length; r++) {
        for (var i = 0; i < items.length; i++) {
          var obj1 = {}
          if (canPreList[r].items[i].isSelect) {
            obj1[item.index] = item.num
            obj[canPreList[r].pid] = obj1
          } 
        }
      }
      that.getdiscountInfo(that.data.shopId, that.data.goodsMoney, that.data.moneyAll, 'sec', obj)
    }
    console.log(canPreList)
  },
  getdiscountInfovka(shopId, goodsMoney, money){
    
    var that=this
    var str = '';
    var menuPro = that.data.menuPro;
    var cardNo = app.globalData.cardNo;
    var sendMoney = that.data.sendMoney;
    var goodsMoney = that.data.goodsMoney;
    var menuArray = [];
    for (var i in menuPro) {
      var menuObj = {};
      menuObj['name'] = menuPro[i].menuName;
      menuObj['price'] = menuPro[i].price / 100;
      console.log(menuPro[i])
      if (menuPro[i].extId != '' && menuPro[i].extId != null && menuPro[i].extId != undefined) {
        menuObj['product_no'] = menuPro[i].extId;
      } else {
        menuObj['product_no'] = menuPro[i].id;
      }
      menuObj['qty'] = menuPro[i].num;
      // menuObj['desc'] = ''
      menuArray.push(menuObj);
    }
    var params = { "member": { "cardNo": cardNo }, "order": { "products": menuArray }, storeCode: app.globalData.extId, "brandId": constant.brandId, timestamp: Date.parse(new Date()) + app.globalData.CurrentTimeMilli, clientId: constant.clientId}
    var exceptStr = except.except(params)
    var dict = {
      brandId: constant.brandId, storeCode: app.globalData.extId, clientId: constant.clientId, timestamp: Date.parse(new Date()) + app.globalData.CurrentTimeMilli
    }
    var header = except.removeEmpty(dict);
    header.sign = md5.hexMD5(exceptStr)
  
    wx.request({
      url: url.couponlist ,
      data:{ "member": { "cardNo": cardNo }, "order": { "products": menuArray }},
      method:'POST',
      header: header,
      success: function (res) {
        console.log('couponsCanuse1111',res)
        let num = 0
        if (res.data.data.length>0){
          app.globalData.couponPro = res.data.data
          
          for (var j = 0; j < res.data.data.length; j++) {
            if (res.data.data[j].canUse == 1) {
              num++
            }
          }
        }else{
          app.globalData.couponPro = []
        }
        that.setData({
          couponsCanuse: res.data.data,
          couponNum: num
        })
       
        that.getActivityData(shopId, goodsMoney, money)
      },
      fail:function(res){
        console.log(res)
      }
    })
  },
  getdiscountInfo(id, money, moneyAll,isfir,presA){
    var menuId = this.data.menuId;
    var menuPro = JSON.parse(JSON.stringify(this.data.menuPro));
    var menuArray = [];
    for (var i in menuPro) {
      menuPro[i]['pid'] = menuPro[i].id;
      menuPro[i]['price'] = menuPro[i].price / 100;
      menuArray.push(menuPro[i]);
    }
    for (var z = 0; z < menuArray.length; z++) {
      if (menuArray[z].listRequirements) {
        menuArray[z].listRequirements[0]['index'] = z;
        menuArray[z].listRequirements[0]['num'] = menuArray[z].num;
      }
    }
    if (isfir == 'fir'){
      var content = {storeId: id,menuId: parseInt(menuId),products: menuArray,
orderType: app.globalData.typeValue,price: parseInt(money) / 100,payType: 1,isFirst:true}
    }else{
      // app.globalData.presObj = presA
      var content = {
        storeId: id, menuId: parseInt(menuId), products: menuArray,
        orderType: app.globalData.typeValue, price: parseInt(money) / 100, payType: 1, isFirst: false, pres: presA
      }
    }
    app.request.postRequestS(url.getdisInfo, content, app.globalData.JSESSIONID)
      .then(res => {
          console.log(res)
          if(res.data.status==1){
            var syGoodsPriceTemp = res.data.data.aftPrePrice;
            if (app.globalData.typeValue == 2) {
              syGoodsPriceTemp = parseFloat(syGoodsPriceTemp)*100 + app.globalData.meailFee;
            } else {
              syGoodsPriceTemp = parseFloat(syGoodsPriceTemp)*100 + app.globalData.sendMoney + app.globalData.meailFee;
            }
            var pres = []
            var obj = {}
            
            for (var r = 0; r < res.data.data.pres.length; r++) {
              for (var i = 0; i < res.data.data.pres[r].items.length; i++) {
                var obj1 = {}
                if (res.data.data.pres[r].items[i].isSelect) {
                  obj1[res.data.data.pres[r].items[i].index] = res.data.data.pres[r].items[i].num
                  obj[res.data.data.pres[r].pid] = obj1
                }
              }
            }
            app.globalData.presObj = obj
            this.setData({
              canPreList: res.data.data.pres,
              syGoodsPrice:syGoodsPriceTemp
            })
            this.getSelectableCoupons(id)
          }else{
           
          }
        wx.hideLoading();
      })
  },
  getSelectableCoupons(id){
    var menuId = this.data.menuId;
    var menuPro = JSON.parse(JSON.stringify(this.data.menuPro));
    var menuArray = [];
    var syGoodsPrice = this.data.syGoodsPrice
    console.log(syGoodsPrice)
    var timeValue = this.data.timeValue;
    var specialOfferPrice = this.data.specialOfferPrice
    for (var i in menuPro) {
      menuPro[i]['pid'] = menuPro[i].id;
      menuPro[i]['price'] = menuPro[i].price / 100;
      menuArray.push(menuPro[i]);
    }
    for (var z = 0; z < menuArray.length; z++) {
      if (menuArray[z].listRequirements) {
        menuArray[z].listRequirements[0]['index'] = z;
        menuArray[z].listRequirements[0]['num'] = menuArray[z].num;
      }
    }
      var content = {
        storeId: id, menuId: parseInt(menuId), amount: parseFloat(syGoodsPrice)/100, products: menuArray,
        orderType: app.globalData.typeValue, price: parseInt(specialOfferPrice) / 100, payType: 1, orderType: app.globalData.typeValue, selfGetTime: timeValue,
      }
    app.request.postRequestS(url.getSelectableCoupons, content, app.globalData.JSESSIONID)
      .then(res => {
          console.log(res)
        if (res.data.status==1){
          if (res.data.data.length > 0) {
            
            this.setData({
              couponPro: res.data.data,
            })
          } else {
            this.setData({
              couponPro: []
            })
          }
        }
      })
  },
  bindpackChange: function (e) {
    console.log(e)
    var index = e.detail.value
    var that = this
    var packPro = that.data.packPro
    that.setData({
      ispack: packPro[index].name
    })
    console.log(that.data.ispack)
  },
  getShopData(JSESSIONID, shopId, latitude, longitude,timetype){
    var that=this
    var time1 = Date.parse(new Date())
    wx.showLoading({ title: '加载中…' })
    var content = {
      coordinate: [longitude, latitude], storeId: shopId,
      businessType: app.globalData.typeValue,
    }
    app.request.postRequestS(url.getShopPosition, content, JSESSIONID)
      .then(res => {
        console.log(res)
        wx.hideLoading();
        var time2 = Date.parse(new Date())
        if (res.data.status == 1) {
          app.globalData.types = res.data.data.businessType;
          
          //首页外卖，预约
          var typeNamePro = [];
          var typeNamePro_ = [];
          var timeValue = 0;
          var isTaketime = true
          var isTaketime1=true
          var typeObj1 = null;
          var typeObj2 = null;
          var typeObj3 = null;

          for (var q = 0; q < res.data.data.businessType.length; q++) {
            if (res.data.data.businessType[q] == 1) {
              var typeObj = { 'name': '外卖', 'id': 1 }
              for (var i = 0; i < res.data.data.businessStatus.length; i++) {
                if (res.data.data.businessStatus[i].businessId == 1) {
                  if (res.data.data.businessStatus[i].busy) {
                    typeObj = { 'name': '外卖(繁忙)', 'id': 1 };
                  }
                }
              }
              typeObj1 = typeObj;

            }else if (res.data.data.businessType[q] == 2) {
              var typeObj = { 'name': '自取', 'id': 2 }
              for (var i = 0; i < res.data.data.businessStatus.length; i++) {
                if (res.data.data.businessStatus[i].businessId == 2) {
                  if (res.data.data.businessStatus[i].busy) {
                    typeObj = { 'name': '自取(繁忙)', 'id': 2 };
                  }
                }
              }
              typeObj2 = typeObj
            } else if (res.data.data.businessType[q] == 4) {
              var typeObj = { 'name': '预约', 'id': 4 }
              for (var i = 0; i < res.data.data.businessStatus.length; i++) {
                if (res.data.data.businessStatus[i].businessId == 4) {
                  if (res.data.data.businessStatus[i].busy) {
                    typeObj = { 'name': '预约(繁忙)', 'id': 4 };
                  }
                }
              }

              typeObj3 = typeObj
            }
          }
          var typePro_ = [];
          var typePro1_ = [];
          if (res.data.data.appointmentTime.length > 0) {
            if (res.data.data.takeSelfTime.length > 0) {
              isTaketime=true
              isTaketime1=true
              if (typeObj1) {
                typePro_.push(typeObj1);
              }
              if (typeObj2) {
                typePro1_.push(typeObj2);
              }
              if (typeObj3) {
                typePro_.push(typeObj3);
              }
            } else {
              isTaketime=false
              isTaketime1 = false
              if (typeObj1) {
                typePro_.push(typeObj1);
              }
              if (typeObj3) {
                typePro_.push(typeObj3);
              }
            }
          } else {
            if (res.data.data.takeSelfTime.length > 0) {
              isTaketime = true
              isTaketime1 = true
              if (typeObj1) {
                typePro_.push(typeObj1);
              }
              if (typeObj2) {
                typePro1_.push(typeObj2);
              }
            } else {
              isTaketime = false
              isTaketime1 = false
              if (typeObj1) {
                typePro_.push(typeObj1);
              }
            }
          }
          typeNamePro=[[],[]]
          typeNamePro_=[[],[]]
          var appointTimes = res.data.data.appointmentTime;
          var takeSelfTimes = res.data.data.takeSelfTime;

          for (var i = 0; i < appointTimes.length; i++) {

            res.data.data.appointmentTime[i].times = that.setTimeQuantun(res.data.data.appointmentTime[i].date, appointTimes[i].times[0], 45);
            res.data.data.appointmentTime[i].times.reverse();
          }
          for (var i = 0; i < takeSelfTimes.length; i++) {

            res.data.data.takeSelfTime[i].times = that.setTimeQuantun(res.data.data.takeSelfTime[i].date, takeSelfTimes[i].times[0], 15);
            res.data.data.takeSelfTime[i].times.reverse();

          }
          if (typePro1_.length > 0) {

            if (typePro1_[0].id == 2) {
              var takeSelfTimes1 = [];
              var takeSelfTimes2 = [];
              for (var i = 0; i < takeSelfTimes.length; i++) {
                var takeObj = {};
                takeObj['name'] = takeSelfTimes[i].date
                takeSelfTimes1.push(takeObj);
              }
              for (var j = 0; j < takeSelfTimes[0].times.length; j++) {
                var takeObj = {};

                takeObj['name'] = takeSelfTimes[0].times[j]
                takeSelfTimes2.push(takeObj);
              }
              typeNamePro_[0] = takeSelfTimes1;
              typeNamePro_[1] = takeSelfTimes2;
              if (app.globalData.typeValue == 2 || app.globalData.typeValue == 3){
              if (takeSelfTimes1.length > 0) {
                if (takeSelfTimes2.length > 0) {
                  timeValue = takeSelfTimes1[0].name + ' ' + takeSelfTimes2[0].name + ':00';
                } else {
                  timeValue = 0;
                }
              } else {
                timeValue = 0;
              }
            }
            } 
            console.log(typePro_)
            if (typePro_.length>0){
                  if (typePro_[1].id == 4) {
                    console.log(111)
                    var appointTimes1 = [];
                    var appointTimes2 = [];
                    for (var i = 0; i < appointTimes.length; i++) {
                      var takeObj = {};

                      takeObj['name'] = appointTimes[i].date
                      appointTimes1.push(takeObj);
                    }
                    for (var j = 0; j < appointTimes[0].times.length; j++) {
                      var takeObj = {};

                      takeObj['name'] = appointTimes[0].times[j]
                      appointTimes2.push(takeObj);
                    }
                    appointTimes2.unshift({ name:'立即送出'});
                    typeNamePro[0] = appointTimes1;
                    typeNamePro[1] = appointTimes2;
                    if (app.globalData.typeValue == 1 || app.globalData.typeValue == 4) {
                      timeValue = '立即送出';
                    }
                  }
                  console.log(app.globalData.typeValue)
            }
          }
          console.log(app.globalData.typeValue)
          if (app.globalData.typeValue == undefined | app.globalData.typeValue == null | app.globalData.typeValue == 0) {
            app.globalData.typeValue = res.data.data.deliveryType;
          }

          that.judgeShopBusiness(res.data.data.businessTimes);
          console.log(typeNamePro, typeNamePro_);
          var time3 = Date.parse(new Date())
          that.setData({
            typeNamePro: typeNamePro,
            typeNamePro_: typeNamePro_,
            appointTimes: res.data.data.appointmentTime,
            takeSelfTimes: res.data.data.takeSelfTime,
            typeValue: app.globalData.typeValue,
            typePro_: typePro_,
            typePro1_: typePro1_,
            timeValue: timeValue,
            isTaketime: isTaketime,
            isTaketime1: isTaketime1
          })
          if (timetype=='yes'){
            wx.showModal({
              title: '提示',
              content: '当前时间已超过了预约时间，预约时间调整为' + timeValue + '，是否确认下单?',
              showCancel: true,
              confirmColor: '#CAA284',
              confirmText: '确认',
              success: function (res) {
                if (res.confirm) {
                  that.btn_send()
                }
              }
            })
          }
        } else {
          
        }
      })
      .catch(res => {
       
      })

  },
  bindcolumnchange_: function (e) {
    var that = this
    console.log(e);
    var takeSelfTimes = that.data.takeSelfTimes;
    var item = e.detail;
    var typeNamePro = that.data.typeNamePro_;
    var typeValue = that.data.typeValue;
    var typePro_ = that.data.typePro1_;
    console.log(typePro_)
    switch (item.column) {
      case 0:
          var takeSelfTimes1 = [];
          for (var i = 0; i < takeSelfTimes[item.value].times.length; i++) {
            var takeObj = {};
            takeObj['name'] = takeSelfTimes[item.value].times[i];
            takeSelfTimes1.push(takeObj);
          }
          typeNamePro[1] = takeSelfTimes1;
          console.log(typeNamePro)
          that.setData({
            typeNamePro_: typeNamePro,
          })
        break;
      case 1:
       
        break;
    }
  },
  typeChange_: function (e) {
    console.log(e)
    var that = this;
    var takeSelfTimes = that.data.takeSelfTimes;
    var typeValue = that.data.typeValue;
    var timeValue = that.data.timeValue;
    var shopId = that.data.shopId;
    var value1 = e.detail.value[0]
    var value2=e.detail.value[1]
    var typePro_ = that.data.typePro1_;
    timeValue = takeSelfTimes[value1].date + ' ' + takeSelfTimes[value1].times[value2] + ':00';
      console.log(timeValue)
    typeValue= 2
    app.globalData.typeValue = typeValue;
    app.globalData.timeValue = timeValue;
    that.setData({
      typeValue: typeValue,
      timeValue: timeValue,
    })
    app.globalData.typeName = that.data.typeName;
    // wx.navigateTo({
    //   url: '../menu/menu?typeNum=1&shopId=' + that.data.shopPro.storeId + '&jump=' + '&address=' + that.data.address + '&latitude=' + that.data.latitude + '&longitude=' + that.data.longitude,
    // })
  },
  typeChange: function (e) {
    console.log(e)
    var that = this;
    var value1 = e.detail.value[0]
    var value2=e.detail.value[1]
    var appointTimes = that.data.appointTimes;
    var takeSelfTimes = that.data.takeSelfTimes;
    var typeValue = that.data.typeValue;
    var timeValue = that.data.timeValue;
    var shopId = that.data.shopId;
    var typePro_ = that.data.typePro_;
    if (value1 == 0 && value2==0){
      timeValue = '立即送出';
      typeValue=1
    }else{
      timeValue = appointTimes[value1].date + ' ' + appointTimes[value1].times[value2-1] + ':00';
      console.log(timeValue)
      typeValue=4
    
    }
    app.globalData.typeValue = typeValue;
    app.globalData.timeValue = timeValue;
    that.setData({
      typeValue: typeValue,
      timeValue: timeValue,
    })
  },
  bindcolumnchange: function (e) {
    console.log(e)
    var that = this
    var appointTimes = that.data.appointTimes;
    var takeSelfTimes = that.data.takeSelfTimes;
    var item = e.detail;
    var typeNamePro = that.data.typeNamePro;
    var typeValue = that.data.typeValue;
    var typePro_ = that.data.typePro_;
    switch (item.column) {
      case 0:
          var appointTimes1 = [];
        for (var i = 0; i < appointTimes[item.value].times.length; i++) {
          var takeObj = {};
          takeObj['name'] = appointTimes[item.value].times[i];
          appointTimes1.push(takeObj);
        }
        if (item.value == 0) {
          appointTimes1.unshift({ name: '立即送出' })
        }
          typeNamePro[1] = appointTimes1;
          that.setData({
            typeNamePro: typeNamePro,
          })
          console.log(typeNamePro)
        break;
      case 1:
        break;
    }
  },
  setTimeQuantun: function (dateName, timeQuantun, minuteNum) {
    var index = timeQuantun.indexOf('~');
    var timeQuantunBefore = timeQuantun.substring(0, index);
    var timeQuantunAfter = timeQuantun.substring(index + 1, timeQuantun.length);

    var time2 = dateName + ' ' + timeQuantunAfter + ':00';

    var nowDate = this.strToDate(this.getNowDate());
    var quantunDate = this.strToDate(dateName);

    if (quantunDate > nowDate) {
      this.setData({
        appinTimePro: []
      })
      var appinTimePro = this.getNextTimeData(dateName, time2, [], timeQuantunBefore);

      return this.data.appinTimePro;
    } else {
      var appinTimePro = this.getTimeData(dateName, time2, [], timeQuantunBefore, minuteNum);
      return this.data.appinTimePro;
    }
  },
  getNextTimeData: function (dateName, time2, pushPro, timeQuantunBefore) {
    var endTime = this.strToDate(time2);
    var pushPro = pushPro ? pushPro : [];
    // console.log('第二天');

    var dates1 = this.strToDate(endTime.getFullYear() + '-' + (endTime.getMonth() + 1) + '-' + endTime.getDate() + ' ' + endTime.getHours() + ':' + endTime.getMinutes());

    var hour = endTime.getHours();
    var minutes = endTime.getMinutes();
    if (minutes < 10) {
      minutes = '00';
    }
    if (hour < 10) {
      hour = '0' + hour;
    }
    // console.log(hour + ':' + minutes);
    var dates2 = this.strToDate(dateName + ' ' + hour + ':' + minutes);

    var dates3 = dates2 - dates1;
    var time3 = this.strToDate(dateName + ' ' + hour + ':' + minutes);

    var time5 = this.strToDate(dateName + ' ' + timeQuantunBefore);
    // console.log(timeQuantunBefore);
    if (dates3 == 0) {
      if (time3 >= time5) {

        pushPro.push(hour + ':' + minutes);

        endTime.setMinutes(endTime.getMinutes() - 15);

        var hour = endTime.getHours();
        var minutes = endTime.getMinutes();

        time2 = endTime.getFullYear() + '-' + (endTime.getMonth() + 1) + '-' + endTime.getDate() + ' ' + hour + ':' + minutes;

        this.getNextTimeData(dateName, time2, pushPro, timeQuantunBefore);
      } else {
        this.setData({
          appinTimePro: pushPro
        })
      }
    } else {
      this.setData({
        appinTimePro: pushPro
      })
    }
  },
  judgeShopBusiness: function (date) {
    console.log(date)
    var that = this;
    var date1;
    var date2;
    // var index = date.indexOf('~');

    // console.log(index);

    var date1 = date[0].beginTime;
    // console.log(date1);

    var date2 = date[0].endTime;
    // console.log(date2);

    var t = new Date().toLocaleTimeString();

    if (t > date1 || t < date2) {
      that.setData({
        isBusiness: true
      })
    } else {
      that.setData({
        isBusiness: false
      })
    }
  },
  getTimeData: function (dateName, time2, pushPro, timeQuantunBefore, minuteNum) {
    var endTime = this.strToDate(time2);
    var pushPro = pushPro ? pushPro : [];

    // endTime.setMinutes(endTime.getMinutes() - 15);

    var hour = endTime.getHours();
    var minutes = endTime.getMinutes();

    var name1 = dateName + ' ' + hour + ':' + minutes;
    var name2 = this.getNowTimes(minuteNum);
    var name3 = dateName + ' ' + timeQuantunBefore;
    var time3 = this.strToDate(name1);

    var time4 = this.strToDate(name2);
    var time5 = this.strToDate(name3);

    if (time3 >= time4) {
      if (time3 >= time5) {



        if (minutes == '0') {
          minutes = '00'
        }

        if (hour < 10) {
          hour = '0' + hour;
        }

        pushPro.push(hour + ':' + minutes);

        endTime.setMinutes(endTime.getMinutes() - 15);

        var hour = endTime.getHours();
        var minutes = endTime.getMinutes();
        time2 = dateName + ' ' + hour + ':' + minutes;

        this.getTimeData(dateName, time2, pushPro, timeQuantunBefore, minuteNum);

      } else {

        this.setData({
          appinTimePro: pushPro
        })
      }
    } else {

      this.setData({
        appinTimePro: pushPro
      })
    }
  },
  getNowTimes: function (minuteNum) {

    var myDate = new Date();
    myDate.setMinutes(myDate.getMinutes());

    return myDate.getFullYear() + '-' + (myDate.getMonth() + 1) + '-' + myDate.getDate() + ' ' + myDate.getHours() + ':' + myDate.getMinutes();
  },
  getNowDate: function () {

    var myDate = new Date();
    myDate.getFullYear();    //获取完整的年份(4位,1970-????)
    myDate.getMonth();       //获取当前月份(0-11,0代表1月)
    myDate.getDate();

    return myDate.getFullYear() + '-' + (myDate.getMonth() + 1) + '-' + myDate.getDate();
  },
  editRemark: function () {
    //var orderRemarkTemp = ;
    this.setData({
      hiddenModal: false,
      orderRemarkPre: this.data.orderRemark
    })
  },
  editRemarkCancel: function () {
    var orderRemarkTemp = this.data.orderRemarkPre;
    this.setData({
      hiddenModal: true,
      orderRemark: orderRemarkTemp
    })
  },
  editRemarkConfirm: function () {
    var orderRemarkTemp = this.data.orderRemark;
    if (orderRemarkTemp == "") orderRemarkTemp = "填写订单备注";
    this.setData({
      hiddenModal: true,
      orderRemark: orderRemarkTemp
    })
  },
  remarkInputChange: function (event) {
    this.setData({
      orderRemark: event.detail.value
    })
  },
  TimeMethodPickerChange: function (e) {
    console.log(e);
    this.setData({
      TimeMethodIndex: e.detail.value
    })
  },
  getAllAdress: function (JSESSIONID, shopId) {
    var that = this;

    wx.request({
      url: url.defaultS,
      data: {
        actionName: url.getAddressDataBase,
      },
      method: 'POST',
      header: JSESSIONID ? { 'Cookie': 'JSESSIONID=' + JSESSIONID } : {},
      success: function (res) {
        console.log("++++++++++++++++++");
        console.log(res);

        if (res.data.status == 1) {
          if (res.data.data) {
            console.log('+++++++++++55555555555+++++++++++++++');
            console.log(JSON.parse(JSON.stringify(res.data.data)));
            that.getDefaultData(res.data.data, JSESSIONID, shopId);

          }
        }
      }
    })
  },
  getDefaultData: function (addressPro, JSESSIONID, shopId) {
    var that = this;
    var addressNum = that.data.addressNum;

    wx.request({
      url: url.default,
      data: {
        actionName: url.getDefault,
        content: {
          storeId: shopId,
          coordinate: [addressPro[addressNum].longitude, addressPro[addressNum].latitude],
        }
      },
      method: 'POST',
      header: JSESSIONID ? { 'Cookie': 'JSESSIONID=' + JSESSIONID } : {},
      success: function (res) {
        console.log(res);
        addressNum++;

        that.setData({
          addressNum: addressNum
        })
        if (addressNum == addressPro.length) {
          console.log('-------------没有数据了');
          console.log(res);
          if (res.data.data.length > 0) {
            that.setData({
              addressObj: addressPro[addressNum - 1]
            })
          }
          return;
        } else {
          console.log('11111111111111');
          console.log(res);
          if (res.data.data.length > 0 && res.data.data[0] != null) {
            console.log(addressPro[addressNum - 1]);
            that.setData({
              addressObj: addressPro[addressNum - 1]
            })
            return;
          } else {
            console.log('++++++++++++++错误地址++++++++++');
            console.log(res);
            that.setData({
              addressObj: null,
            })
            that.getDefaultData(addressPro, JSESSIONID, shopId);
          }
        }
      }
    })
  },
  getTemplates() {
    var that = this
    var content = {}
    app.request.postRequestS(url.getTemplates, content, app.globalData.JSESSIONID)
      .then(res => {
        console.log(res)
        that.setData({
          templateIds: res.data.data.templateIds
        })
      })
  },
  btn_send: function () {
    
    var that = this; 
    var JSESSIONID = app.globalData.JSESSIONID;
    var addressObj = that.data.addressObj;
    var shopId = that.data.shopId;
    console.log(that.data.menuPro)
    var syGoodsPrice = parseFloat(that.data.syGoodsPrice/100)
    var reachFee = parseFloat(that.data.reachFee)
    var typeValue = that.data.typeValue;
    var isYE = that.data.isYE;
    var memberInformation = that.data.memberInformation;
    var yh_price = memberInformation['yh_price'] ? parseInt(memberInformation['yh_price']) / 100 : 0

    if (that.data.menuPro1.length > 0 & that.data.discountProType22.length > 0) {
      var u = []
      var p = JSON.parse(JSON.stringify(that.data.menuPro))
      u = that.data.menuPro1
      if (u.length == 0) {
        p = u
      } else {
        console.log('u.lebnedfaes')
        for (var m = 0; m < u.length; m++) {
          console.log('p[length+m]')
          var length = u.length
          p[length + m] = u[m]
          console.log(p)
        }
      }
      console.log(u, p)
      var menuPro = p;
      //至此处结束
      console.log(menuPro)
    } else {
      var menuPro = JSON.parse(JSON.stringify(that.data.menuPro));
    }
    console.log(menuPro)
    // var menuPro = JSON.parse(JSON.stringify(that.data.menuPro));
    var menuId = that.data.menuId;
    var menuArray = [];
    var timeValue = that.data.timeValue;
    
    console.log(typeValue)
    var typeName = 0;
    var payId = that.data.payId;
    var remarks = that.data.remarks;
    var isInvoiceName = that.data.isInvoiceName;
    var invoiceType = that.data.invoiceType;
    var invoiceId = that.data.invoiceId;
    var discountObj = that.data.discountObj;
    var discountPro = [];
    var couponObj = that.data.couponObj;
    var couponIndex = that.data.couponIndex;
    var sendMoney = that.data.sendMoney;
    var moneyAll = that.data.moneyAll;
    var personName = that.data.personName;
    var personPhone = that.data.personPhone;
    var shopAddress = that.data.shopAddress;
    var shopLat = that.data.shopLat;
    var shopLng = that.data.shopLng;
    var f_p_1 = that.data.f_p_1;
    var f_p_2 = that.data.f_p_2;
    var isJD = that.data.isJD;
    var discountNamePro = that.data.discountNamePro;
    var templateIds = that.data.templateIds
    that.setData({
      isViewDisabled: false,
    })
    if (typeValue == 2 && !that.data.isTaketime1){
      that.setData({
        isTaketime: false
      })
      return  
    }
    wx.showLoading({ title: '加载中…' })
    if (typeValue == 2) {
      if (timeValue == 0 || !timeValue) {
        wx.showModal({
          title: '提示',
          content: '请重新选择时间',
          showCancel: false,
          confirmColor: '#283897',
          confirmText: '确定',
          success: function (res) {
            that.setData({
              isViewDisabled: false,
            })
            if (res.confirm) {
              that.getShopData(app.globalData.JSESSIONID, that.data.shopId, app.globalData.latitude, app.globalData.longitude,'no');
            }
          }
        })
        
        return
      }
            if (personPhone == '') {
                  that.setData({
                    isViewDisabled: true,
                  })
                  wx.hideLoading();
                  wx.showModal({
                    title: '提示',
                    content: '您没有输入联系电话',
                    confirmColor: '#CAA284',
                    confirmText: '确认',
                  })
            } else if (!isPhone.phone(personPhone)) {
                  that.setData({
                    isViewDisabled: true,
                  })
                  wx.hideLoading();
                  wx.showModal({
                    title: '提示',
                    content: '手机号格式不对',
                    confirmColor: '#CAA284',
                    confirmText: '确认',
                  })
            } else if (that.data.ispack == '') {
                  that.setData({
                    isViewDisabled: true,
                  })
                  wx.hideLoading();
                  wx.showModal({
                    title: '提示',
                    content: '请选择是否打包',
                    confirmColor: '#CAA284',
                    confirmText: '确认',
                  })
                  return;
            } else if (isJD && f_p_1 == '') {

                  that.setData({
                    isViewDisabled: true,
                  })
                  wx.hideLoading();
                  wx.showModal({
                    title: '提示',
                    content: '请输入个人或公司的抬头',
                    confirmColor: '#CAA284',
                    confirmText: '确认',
                  })
                  return;
            } else if (f_p_2 == '' && isJD) {
                  that.setData({
                    isViewDisabled: true,
                  })
                  wx.hideLoading();
                  wx.showModal({
                    title: '提示',
                    content: '请输入税号或社会信用代码',
                    confirmColor: '#CAA284',
                    confirmText: '确认',
                  })
                  return;
            } else {
              wx.hideLoading();
              wx.showModal({
                title: '是否前往【' + that.data.shopName + '】自提',
                content: '订单确认后将无法更改',
                showCancel: true,
                confirmColor: '#CAA284',
                confirmText: '确认',
                success: function (res) {
                if (res.confirm) { 
                  wx.requestSubscribeMessage({
                    tmplIds: templateIds,
                    success(res) {
                      console.log(res)
                    },
                    fail(res) {
                      console.log(res)
                    },
                    complete(res) {
                      console.log(res)
                        wx.showLoading({ title: '加载中…' })
                        if(app.globalData.isVka==1){
                          if (memberInformation['discount'] < 10) {
                          var memberObj1 = {};
                          memberObj1['rate'] = memberInformation['discount'];

                          memberObj1['prePrice'] = -memberInformation['discountPrice'] / 100

                          memberObj1['content'] = 0 + '#' + 'levelDiscount' + '#' + memberInformation['discount'] + '折'

                          discountPro.push(memberObj1);
                          }
                          if (discountNamePro.length > 0) {
                            for (var i = 0; i < discountNamePro.length; i++) {
                              var memberObjD = {};
                              memberObjD['prePrice'] = -discountNamePro[i].value;
                              memberObjD['content'] = discountNamePro[i].pid + '#' + 'promotions' + '#' + discountNamePro[0]['title'];
                              discountPro.push(memberObjD);
                              console.log(discountPro);
                            }
                          }
                        }
                        if (isYE) {
                          var memberObj = {};
                          memberObj['prePrice'] = - memberInformation['yh_price'] / 100;
                          memberObj['content'] = 0 + '#' + 'card' + '#¥' + memberInformation['discountPrice'] / 100;
                          discountPro.push(memberObj);
                        }
                        if (discountObj.price != 0) {
                          discountObj['prePrice'] = - discountObj['price'] / 100;
                          discountObj['content'] = discountObj['pid'] + '#' + 'promotions' + '#' + discountObj['title'];
                          discountPro.push(discountObj);
                        }
                        if (couponIndex > 0) {
                          couponObj['prePrice'] = - couponObj.couponPrice;
                          couponObj['content'] = couponObj.id + '#' + couponObj['couponType'] + '#' + couponObj.name;

                          discountPro.push(couponObj);
                          console.log(discountPro);
                        }
                        for (var i in menuPro) {
                          menuPro[i]['pid'] = menuPro[i].id;

                          menuPro[i]['price'] = menuPro[i].price / 100;
                          menuArray.push(menuPro[i]);
                        }
                        for (var z = 0; z < menuArray.length; z++) {

                          if (menuArray[z].listRequirements) {

                            menuArray[z].listRequirements[0]['index'] = z;
                            menuArray[z].listRequirements[0]['num'] = menuArray[z].num;
                          }
                        }
                        console.log(that.data.menuArray);
                        if (typeValue == 3) {
                          typeName = 4;
                        } else {
                          typeName = typeValue;
                        }
                        var requestData = {};
                        var discountPro_ = []
                        for (var i = 0; i < discountPro.length; i++) {
                          var aa = {}
                          if (discountPro[i].id != '' & discountPro[i].id != undefined & discountPro[i].id != null) {
                            aa.pid = discountPro[i].id.toString()
                          }
                          aa.content = discountPro[i].content
                          aa.prePrice = discountPro[i].prePrice
                          aa.type = 7
                          aa.childType = 0
                          aa.title = discountPro[i].name
                          discountPro_.push(aa)
                        }
                        discountPro = discountPro_
                        console.log(discountPro);
                        if (invoiceId == 2) {
                          if (isJD) {
                            requestData = {
                              storeId: parseInt(shopId),
                              longitude: shopLng,
                              latitude: shopLat,
                              menuId: parseInt(menuId),
                              type: typeName,
                              selfGetTime: timeValue,
                              payType: payId,
                              name: personName,
                              phone: personPhone,
                              address: shopAddress,
                              tableNum: '',
                              products: menuArray,
                              randomCode: that.getNowDate(),
                              userNote: '选择打包：' + that.data.ispack + ';' + remarks,
                              invoiceType: invoiceId,
                              isInvoice: that.data.isInvoice,
                              invoiceDesc: f_p_2,
                              taxNo: f_p_1,
                              memberPreferentials: discountPro,
                              // form_id: e.detail.formId,
                              couponId: that.data.couponId,
                              pres:app.globalData.presObj,
                              peopleNum: that.data.tablewareIndex,
                            }
                          }

                        } else {
                          requestData = {
                            storeId: parseInt(shopId),
                            longitude: shopLng,
                            latitude: shopLat,
                            menuId: parseInt(menuId),
                            type: typeName,
                            selfGetTime: timeValue,
                            payType: payId,
                            name: personName,
                            phone: personPhone,
                            address: shopAddress,
                            products: menuArray,
                            randomCode: that.getNowDate(),
                            userNote: '选择打包：' + that.data.ispack + ';' + remarks,
                            invoiceType: invoiceId,
                            isInvoice: that.data.isInvoice,
                            memberPreferentials: discountPro,
                            // form_id: e.detail.formId,
                            couponId: that.data.couponId,
                            peopleNum: that.data.tablewareIndex,
                            pres: app.globalData.presObj


                          }
                        }
                        wx.request({
                          url: url.default,
                          data: {
                            actionName: url.getSendOrder,
                            content: JSON.parse(JSON.stringify(requestData))

                          },
                          method: 'POST',
                          header: JSESSIONID ? { 'Cookie': 'JSESSIONID=' + JSESSIONID } : {},
                          success: function (res) {
                            console.log(res);

                            console.log(payId);

                            if (res.data.status == 1) {
                              var orderId = res.data.data;
                              wx.request({
                                url: url.defaultS,
                                data: {
                                  actionName: url.getOrderInformation,
                                  content: { orderId: orderId }

                                },
                                method: 'POST',
                                header: JSESSIONID ? { 'Cookie': 'JSESSIONID=' + JSESSIONID } : {},
                                success: function (orderInfo) {
                                  console.log('++++++++++');
                                  console.log(orderInfo);
                                  if (orderInfo.data.status == 1) {
                                    if (orderInfo.data.data.progress[0].status == 1) {
                                      wx.request({

                                        url: url.defaultS,
                                        data: {
                                          actionName: url.getPay,
                                          content: {
                                            payType: 2,
                                            orderId: orderId,
                                          }

                                        },

                                        method: 'POST',
                                        header: JSESSIONID ? { 'Cookie': 'JSESSIONID=' + JSESSIONID } : {},
                                        success: function (res) {
                                          console.log(res);
                                          if (res.data.status == 1) {
                                            var item = res.data.data
                                            wx.requestPayment({
                                              timeStamp: item.timeStamp,
                                              nonceStr: item.nonceStr,
                                              package: item.package,
                                              signType: item.signType,
                                              paySign: item.paySign,
                                              success: function (res) {
                                                console.log(res);
                                                app.globalData.menuPro = {};
                                                app.globalData.allpro = { 'menuNum': 0, 'menuPrice': 0 };
                                                app.globalData.menuProArray = {};
                                                app.globalData.coupon={}
                                                app.globalData.sendAddress = null;
                                                app.globalData.specialOfferPrice = 0;
                                                app.globalData.typePro = {};
                                                app.globalData.meailFee = 0;
                                                wx.redirectTo({
                                                  url: '../information/information?id=' + orderId,
                                                })
                                              },
                                              fail: function () {
                                                console.log(1111);
                                                app.globalData.menuPro = {};
                                                app.globalData.allpro = { 'menuNum': 0, 'menuPrice': 0 };
                                                app.globalData.menuProArray = {};
                                                app.globalData.coupon = {}
                                                app.globalData.sendAddress = null;
                                                app.globalData.specialOfferPrice = 0;
                                                app.globalData.typePro = {};
                                                app.globalData.meailFee = 0;
                                                wx.redirectTo({
                                                  url: '../information/information?id=' + orderId,
                                                })
                                              }
                                            })

                                          }
                                          // else if (res.data.status == 11){
                                          //   // that.getopenid()
                                          // }
                                          else {
                                            that.setData({
                                              isViewDisabled: true,
                                            })
                                            wx.hideLoading();
                                            if (payId == 1) {
                                              app.globalData.menuPro = {};
                                              app.globalData.allpro = { 'menuNum': 0, 'menuPrice': 0 };
                                              app.globalData.menuProArray = {};
                                              app.globalData.coupon = null
                                              app.globalData.sendAddress = null;
                                              app.globalData.specialOfferPrice = 0;
                                              app.globalData.typePro = {};
                                              app.globalData.meailFee = 0;
                                              wx.redirectTo({
                                                url: '../information/information?id=' + orderId,
                                              })
                                            } else {
                                              wx.showModal({
                                                title: '提示',
                                                content: res.data.msg,
                                                confirmColor: '#CAA284',
                                                confirmText: '确认',
                                                showCancel: false,
                                                success: function (res) {

                                                }
                                              })
                                            }
                                          }

                                        }
                                      })
                                    } else {

                                      that.setData({
                                        isViewDisabled: true,
                                      })
                                      wx.hideLoading();
                                      app.globalData.menuPro = {};
                                      app.globalData.allpro = { 'menuNum': 0, 'menuPrice': 0 };
                                      app.globalData.menuProArray = {};
                                      app.globalData.coupon = null
                                      app.globalData.sendAddress = null;
                                      app.globalData.specialOfferPrice = 0;
                                      app.globalData.typePro = {};
                                      app.globalData.meailFee = 0;
                                      wx.redirectTo({
                                        url: '../information/information?id=' + orderId,
                                      })

                                    }
                                  }
                                }
                              })


                            } else if (res.data.status == 4){
                              wx.hideLoading();
                              that.setData({
                                isViewDisabled: true,
                              })
                              that.getShopData(app.globalData.JSESSIONID, that.data.shopId, app.globalData.latitude, app.globalData.longitude,'yes');
                             
                            } else {
                              wx.hideLoading();
                              // if (payId == 1) {
                              //   var orderId = res.data.data;
                              //   app.globalData.menuPro = {};
                              //   app.globalData.allpro = { 'menuNum': 0, 'menuPrice': 0 };
                              //   app.globalData.menuProArray = {};
                              // app.globalData.coupon = null
                              //   app.globalData.sendAddress = null;
                              //   app.globalData.specialOfferPrice = 0;
                              //   app.globalData.typePro = {};
                              //   app.globalData.meailFee = 0;
                              //   wx.redirectTo({
                              //     url: '../information/information?id=' + orderId,
                              //   })
                              // } else {
                              that.setData({
                                isViewDisabled: true,
                              })
                              wx.showModal({
                                title: '提示',
                                content: res.data.msg,
                                showCancel: false,
                                confirmColor: '#CAA284',
                                confirmText: '确认',
                                success: function (res) {
                                  
                                }
                              })
                              
                              // }
                            }

                          }
                        })
                    }
                  })
                } else {
                  that.setData({
                    isViewDisabled: true,
                  })
                  wx.hideLoading();
                }
                }
            })
      }
          
    } else if (typeValue == 3) {
      if (that.data.deskId == '') {
        that.setData({
          isViewDisabled: true,
        })
        wx.hideLoading();
        wx.showModal({
          title: '提示',
          content: '您没有输入桌号',
          confirmColor: '#CAA284',
          confirmText: '确认',
          success: function (res) {

          }
        })
      } else if (isJD && f_p_1 == '') {

        that.setData({
          isViewDisabled: true,
        })
        wx.hideLoading();
        wx.showModal({
          title: '提示',
          content: '请输入个人或公司的抬头',
          confirmColor: '#CAA284',
          confirmText: '确认',
        })
        return;
      } else if (f_p_2 == '' && isJD) {
        that.setData({
          isViewDisabled: true,
        })
        wx.hideLoading();
        wx.showModal({
          title: '提示',
          content: '请输入税号或社会信用代码',
          confirmColor: '#CAA284',
          confirmText: '确认',
        })
        return;
      } else {
          wx.requestSubscribeMessage({
            tmplIds: templateIds,
            success(res) {
              console.log(res)
            },
            fail(res) {
              console.log(res)
            },
            complete(res) {
              console.log(res)
              if (app.globalData.isVka == 1) {
                if (memberInformation['discount'] < 10) {
                  var memberObj1 = {};
                  memberObj1['rate'] = memberInformation['discount'];

                  memberObj1['prePrice'] = -memberInformation['discountPrice'] / 100

                  memberObj1['content'] = 0 + '#' + 'levelDiscount' + '#' + memberInformation['discount'] + '折'

                  discountPro.push(memberObj1);
                }
              }
              if (discountNamePro.length > 0) {
                console.log(discountNamePro)
                for (var i = 0; i < discountNamePro.length; i++) {
                  var memberObjD = {};
                  memberObjD['prePrice'] = -discountNamePro[i].value;
                  memberObjD['content'] = discountNamePro[i].pid + '#' + 'promotions' + '#' + discountNamePro[0]['title'];
                  discountPro.push(memberObjD);
                  console.log(discountPro);
                }
              }
              if (isYE) {
                var memberObj = {};
                memberObj['prePrice'] = - memberInformation['yh_price'] / 100;
                memberObj['content'] = 0 + '#' + 'card' + '#¥' + memberInformation['discountPrice'] / 100;
                discountPro.push(memberObj);
              }
              if (discountObj.price != 0) {
                discountObj['prePrice'] = - discountObj['price'] / 100;
                discountObj['content'] = discountObj['pid'] + '#' + 'promotions' + '#' + discountObj['title'];

                discountPro.push(discountObj);
              }
              if (couponIndex > 0) {
                couponObj['prePrice'] = - couponObj.couponPrice;
                couponObj['content'] = couponObj.id + '#' + couponObj['couponType'] + '#' + couponObj.name;

                discountPro.push(couponObj);
                console.log(discountPro);
              }
              var discountPro_ = []
              console.log(discountPro)
              for (var i = 0; i < discountPro.length; i++) {
                var aa = {}
                if (discountPro[i].id != '' & discountPro[i].id != undefined & discountPro[i].id != null) {
                  aa.pid = discountPro[i].id.toString()
                }
                aa.content = discountPro[i].content
                aa.prePrice = discountPro[i].prePrice
                aa.type = 7
                aa.childType = 0
                aa.title = discountPro[i].name
                discountPro_.push(aa)
              }
              discountPro = discountPro_
              for (var i in menuPro) {
                if (menuPro[i] != undefined) {
                  menuPro[i]['pid'] = menuPro[i].id;
                  menuPro[i]['price'] = menuPro[i].price / 100;
                  menuArray.push(menuPro[i]);
                }

              }
              for (var z = 0; z < menuArray.length; z++) {
                if (menuArray[z].listRequirements) {

                  menuArray[z].listRequirements[0]['index'] = z;
                  menuArray[z].listRequirements[0]['num'] = menuArray[z].num;
                }
              }
              console.log(menuArray);
              // if (typeValue == 3) {
              //   typeName = 4;
              // } else {
              typeName = typeValue;
              // }
              var requestData = {};
              if (invoiceId == 2) {
                if (isJD) {
                  requestData = {

                    storeId: parseInt(shopId),
                    longitude: shopLng,
                    latitude: shopLat,

                    menuId: parseInt(menuId),
                    type: typeName,
                    selfGetTime: timeValue,
                    payType: payId,
                    name: personName,
                    phone: personPhone,
                    address: shopAddress,
                    tableNum: that.data.deskId,
                    products: menuArray,
                    randomCode: that.getNowDate(),
                    userNote: remarks,
                    invoiceType: invoiceId,
                    isInvoice: that.data.isInvoice,
                    invoiceDesc: f_p_2,
                    taxNo: f_p_1,
                    memberPreferentials: discountPro,
                    // form_id: e.detail.formId,
                    couponId: that.data.couponId,
                    peopleNum: that.data.tablewareIndex,
                    pres: app.globalData.presObj

                  }
                }

              } else {
                requestData = {
                  storeId: parseInt(shopId),
                  longitude: shopLng,
                  latitude: shopLat,

                  menuId: parseInt(menuId),
                  type: typeName,
                  selfGetTime: timeValue,
                  payType: payId,
                  name: personName,
                  phone: personPhone,
                  address: shopAddress,
                  tableNum: that.data.deskId,
                  products: menuArray,
                  randomCode: that.getNowDate(),
                  userNote: remarks,
                  invoiceType: invoiceId,
                  isInvoice: that.data.isInvoice,
                  memberPreferentials: discountPro,
                  // form_id: e.detail.formId,
                  couponId: that.data.couponId,
                  peopleNum: that.data.tablewareIndex,
                  pres: app.globalData.presObj
                }
              }
              wx.request({

                url: url.default,
                data: {
                  actionName: url.getSendOrder,
                  content: JSON.parse(JSON.stringify(requestData))
                },
                method: 'POST',
                header: JSESSIONID ? { 'Cookie': 'JSESSIONID=' + JSESSIONID } : {},
                success: function (res) {
                  console.log(res);

                  console.log(payId);

                  if (res.data.status == 1) {
                    var orderId = res.data.data;

                    wx.request({
                      url: url.defaultS,
                      data: {
                        actionName: url.getOrderInformation,
                        content: { orderId: orderId }

                      },
                      method: 'POST',
                      header: JSESSIONID ? { 'Cookie': 'JSESSIONID=' + JSESSIONID } : {},
                      success: function (orderInfo) {
                        console.log('++++++++++');
                        console.log(orderInfo);
                        if (orderInfo.data.status == 1) {

                          if (orderInfo.data.data.progress[0].status == 1) {
                            wx.request({
                              url: url.defaultS,
                              data: {
                                actionName: url.getPay,
                                content: {
                                  payType: 2,
                                  orderId: orderId,
                                  // PayMode: 50,
                                  // openId: app.globalData.openId,
                                  // useuserWalletEnvelope: 0,
                                  // useWallet: 
                                }

                              },
                              method: 'POST',
                              header: JSESSIONID ? { 'Cookie': 'JSESSIONID=' + JSESSIONID } : {},
                              success: function (res) {
                                console.log(res);
                                if (res.data.status == 1) {

                                  var item = res.data.data
                                  wx.requestPayment({
                                    timeStamp: item.timeStamp,
                                    nonceStr: item.nonceStr,
                                    package: item.package,
                                    signType: item.signType,
                                    paySign: item.paySign,
                                    success: function (res) {
                                      console.log(res);
                                      app.globalData.menuPro = {};
                                      app.globalData.allpro = { 'menuNum': 0, 'menuPrice': 0 };
                                      app.globalData.menuProArray = {};
                                      app.globalData.coupon = null
                                      app.globalData.sendAddress = null;
                                      app.globalData.specialOfferPrice = 0;
                                      app.globalData.typePro = {};
                                      app.globalData.meailFee = 0;
                                      wx.redirectTo({
                                        url: '../information/information?id=' + orderId,
                                      })
                                    },
                                    fail: function () {
                                      console.log(1111);
                                      app.globalData.menuPro = {};
                                      app.globalData.allpro = { 'menuNum': 0, 'menuPrice': 0 };
                                      app.globalData.menuProArray = {};
                                      app.globalData.coupon = null
                                      app.globalData.sendAddress = null;
                                      app.globalData.specialOfferPrice = 0;
                                      app.globalData.typePro = {};
                                      app.globalData.meailFee = 0;
                                      wx.redirectTo({
                                        url: '../information/information?id=' + orderId,
                                      })
                                    }
                                  })

                                }
                                // else if (res.data.status == 11) {
                                //   // that.getopenid()
                                // }
                                else {
                                  that.setData({
                                    isViewDisabled: true,
                                  })
                                  wx.hideLoading();
                                  if (payId == 1) {
                                    app.globalData.menuPro = {};
                                    app.globalData.allpro = { 'menuNum': 0, 'menuPrice': 0 };
                                    app.globalData.menuProArray = {};
                                    app.globalData.coupon = null
                                    app.globalData.sendAddress = null;
                                    app.globalData.specialOfferPrice = 0;
                                    app.globalData.typePro = {};
                                    app.globalData.meailFee = 0;
                                    wx.redirectTo({
                                      url: '../information/information?id=' + orderId,
                                    })
                                  } else {
                                    wx.showModal({
                                      title: '提示',
                                      content: res.data.msg,
                                      confirmColor: '#CAA284',
                                      confirmText: '确认',
                                      showCancel: false,
                                      success: function (res) {

                                      }
                                    })
                                  }
                                }

                              }
                            })
                          } else {

                            that.setData({
                              isViewDisabled: true,
                            })
                            wx.hideLoading();
                            app.globalData.menuPro = {};
                            app.globalData.allpro = { 'menuNum': 0, 'menuPrice': 0 };
                            app.globalData.menuProArray = {};
                            app.globalData.coupon = null
                            app.globalData.sendAddress = null;
                            app.globalData.specialOfferPrice = 0;
                            app.globalData.typePro = {};
                            app.globalData.meailFee = 0;
                            wx.redirectTo({
                              url: '../information/information?id=' + orderId,
                            })

                          }
                        }
                      }
                    })


                  } else if (res.data.status == 4) {
                    wx.hideLoading();
                    that.setData({
                      isViewDisabled: true,
                    })
                    that.getShopData(app.globalData.JSESSIONID, that.data.shopId, app.globalData.latitude, app.globalData.longitude,'yes');
                    
                  } else {

                    that.setData({
                      isViewDisabled: true,
                    })
                    wx.hideLoading();
                    
                    // if (payId == 1) {
                    //   var orderId = res.data.data;
                    //   app.globalData.menuPro = {};
                    //   app.globalData.allpro = { 'menuNum': 0, 'menuPrice': 0 };
                    //   app.globalData.menuProArray = {};
                    //   app.globalData.sendAddress = null;
                    //   app.globalData.specialOfferPrice = 0;
                    //   app.globalData.typePro = {};
                    //   app.globalData.meailFee = 0;
                    //   wx.redirectTo({
                    //     url: '../information/information?id=' + orderId,
                    //   })
                    // } else {
                    wx.showModal({
                      title: '提示',
                      content: res.data.msg,
                      showCancel: false,
                      confirmColor: '#CAA284',
                      confirmText: '确认',
                      success: function (res) {
                      }
                    })
                    // }
                  }

                }
              })
            }
          })
      }
    } else {
      
      if (!addressObj) {
        that.setData({
          toastData: '当前没有配送地址',
          isToast: false,
          isViewDisabled: true,
        })
        wx.hideLoading();
        setTimeout(function () {
          that.setData({
            isToast: true
          })
        }, 2000)
      } else if (isYE && (yh_price + syGoodsPrice) < reachFee) {
        let sum = yh_price + syGoodsPrice
        let temp = that.accSub(reachFee, sum);
        wx.hideLoading();
        wx.showModal({
          title: '提示',
          content: '还差' + temp + '元才能起送，是否返回点餐页？',
          confirmColor: '#CAA284',
          confirmText: '返回点餐',
          success: function (res) {
            console.log(res);
            if (res.confirm) {
              wx.navigateBack({
                delta: 1
              })
            }
          }
        })
      } else if (!isYE && syGoodsPrice < reachFee) {
        wx.hideLoading();
        wx.showModal({
          title: '提示',
          content: '需满足' + reachFee + '元起送，是否返回点餐页？',
          confirmColor: '#CAA284',
          confirmText: '返回点餐',
          success: function (res) {
            console.log(res);
            if (res.confirm) {
              wx.navigateBack({
                delta: 1
              })
            }
          }
        })
      }  else if (isJD && f_p_1 == '') {

        that.setData({
          isViewDisabled: true,
        })
        wx.hideLoading();
        wx.showModal({
          title: '提示',
          content: '请输入个人或公司的抬头',
          confirmColor: '#CAA284',
          confirmText: '确认',
        })
        return;
      } else if (f_p_2 == '' && isJD) {
        that.setData({
          isViewDisabled: true,
        })
        wx.hideLoading();
        wx.showModal({
          title: '提示',
          content: '请输入税号或社会信用代码',
        })
        return;
      } else {
        wx.requestSubscribeMessage({
          tmplIds: templateIds,
          success(res) {
            console.log(res)
          },
          fail(res) {
            console.log(res)
          },
          complete(res) {
            console.log(res)
            if (app.globalData.isVka == 1) {
              if (memberInformation['discount'] < 10) {
                var memberObj1 = {};
                memberObj1['rate'] = memberInformation['discount'];

                memberObj1['prePrice'] = -memberInformation['discountPrice'] / 100

                memberObj1['content'] = 0 + '#' + 'levelDiscount' + '#' + memberInformation['discount'] + '折'

                discountPro.push(memberObj1);
              }
              console.log(discountNamePro)
            }
            if (discountNamePro.length > 0) {
              for (var i = 0; i < discountNamePro.length; i++) {
                var memberObjD = {};
                memberObjD['prePrice'] = - discountNamePro[i].value;
                memberObjD['productName'] = discountNamePro[i].productName;
                memberObjD['content'] = discountNamePro[i].pid + '#' + 'promotions' + '#' + discountNamePro[i].title;
                discountPro.push(memberObjD);
              }
              console.log(discountPro);
            }
            if (isYE) {
              var memberObj = {};
              memberObj['prePrice'] = - memberInformation['yh_price'] / 100;
              memberObj['content'] = 0 + '#' + 'card' + '#¥' + memberInformation['discountPrice'] / 100;
              discountPro.push(memberObj);
            }
            if (discountObj.price != 0) {
              discountObj['prePrice'] = - discountObj['price'] / 100;
              discountObj['content'] = discountObj['pid'] + '#' + 'promotions' + '#' + discountObj['title'];

              discountPro.push(discountObj);
              console.log(memberObjD);
            }
            if (couponIndex > 0) {
              couponObj['prePrice'] = - couponObj.couponPrice;
              couponObj['content'] = couponObj.id + '#' + couponObj['couponType'] + '#' + couponObj.name;

              discountPro.push(couponObj);
            }
            console.log(JSON.stringify(menuPro));
            console.log(menuPro);
            for (var i in menuPro) {
              if (menuPro[i] != undefined) {
                menuPro[i]['pid'] = menuPro[i].id;

                menuPro[i]['price'] = menuPro[i].price / 100;
                menuArray.push(menuPro[i]);
              }

            }
            for (var z = 0; z < menuArray.length; z++) {

              if (menuArray[z].listRequirements) {

                menuArray[z].listRequirements[0]['index'] = z;
                menuArray[z].listRequirements[0]['num'] = menuArray[z].num;
              }
            }
            var discountPro_ = []
            console.log(discountPro)
            for (var i = 0; i < discountPro.length; i++) {
              var aa = {}
              if (discountPro[i].id != '' & discountPro[i].id != undefined & discountPro[i].id != null) {
                aa.pid = discountPro[i].id.toString()
              }

              aa.content = discountPro[i].content
              aa.prePrice = discountPro[i].prePrice
              aa.type = 7
              aa.childType = 0
              aa.title = discountPro[i].name
              discountPro_.push(aa)
            }
            discountPro = discountPro_
            console.log(menuArray);
            console.log(typeValue)
            typeName = typeValue;
            var requestData = {};
            if (invoiceId == 2) {
              if (isJD) {
                requestData = {
                  storeId: parseInt(shopId),
                  longitude: shopLng,
                  latitude: shopLat,
                  menuId: parseInt(menuId),
                  type: typeName,
                  selfGetTime: timeValue == 0 ? '' : timeValue,
                  payType: payId,
                  name: personName,
                  phone: personPhone,
                  address: shopAddress,
                  products: menuArray,
                  randomCode: that.getNowDate(),
                  userNote: remarks,
                  invoiceType: invoiceId,
                  isInvoice: that.data.isInvoice,
                  invoiceDesc: f_p_2,
                  taxNo: f_p_1,
                  memberPreferentials: discountPro,
                  // form_id: e.detail.formId,
                  couponId: that.data.couponId,
                  peopleNum: that.data.tablewareIndex,
                  pres: app.globalData.presObj

                }
              }

            } else {
              requestData = {
                storeId: parseInt(shopId),
                longitude: addressObj.longitude,
                latitude: addressObj.latitude,
                menuId: parseInt(menuId),
                type: typeName,
                selfGetTime: timeValue == 0 ? '' : timeValue,
                payType: payId,
                name: addressObj.receiverName,
                phone: addressObj.receiverPhone,
                address: addressObj.receiverAddress + addressObj.appendReceiverAddress,
                products: menuArray,
                randomCode: that.getNowDate(),
                userNote:  remarks,
                invoiceType: invoiceId,
                isInvoice: that.data.isInvoice,
                memberPreferentials: discountPro,
                // form_id: e.detail.formId,
                couponId: that.data.couponId,
                peopleNum: that.data.tablewareIndex,
                pres: app.globalData.presObj
              }
            }
            wx.request({
              url: url.default,
              data: {
                actionName: url.getSendOrder,
                content: JSON.parse(JSON.stringify(requestData))
              },
              method: 'POST',
              header: JSESSIONID ? { 'Cookie': 'JSESSIONID=' + JSESSIONID } : {},
              success: function (res) {
                if (res.data.status == 1) {
                  var orderId = res.data.data;
                  wx.request({
                    url: url.defaultS,
                    data: {
                      actionName: url.getOrderInformation,
                      content: { orderId: orderId }

                    },
                    method: 'POST',
                    header: JSESSIONID ? { 'Cookie': 'JSESSIONID=' + JSESSIONID } : {},
                    success: function (orderInfo) {
                      console.log('++++++++++');
                      console.log(orderInfo);
                      if (orderInfo.data.status == 1) {
                        if (orderInfo.data.data.progress[0].status == 1) {
                          wx.request({
                            url: url.defaultS,
                            data: {
                              actionName: url.getPay,
                              content: {
                                payType: 2,
                                orderId: orderId,

                              }

                            },
                            method: 'POST',
                            header: JSESSIONID ? { 'Cookie': 'JSESSIONID=' + JSESSIONID } : {},
                            success: function (res) {
                              console.log(res);
                              if (res.data.status == 1) {
                                var item = res.data.data
                                wx.requestPayment({
                                  timeStamp: item.timeStamp,
                                  nonceStr: item.nonceStr,
                                  package: item.package,
                                  signType: item.signType,
                                  paySign: item.paySign,
                                  success: function (res) {
                                    console.log(res);
                                    app.globalData.menuPro = {};
                                    app.globalData.allpro = { 'menuNum': 0, 'menuPrice': 0 };
                                    app.globalData.menuProArray = {};
                                    app.globalData.coupon = null
                                    app.globalData.sendAddress = null;
                                    app.globalData.specialOfferPrice = 0;
                                    app.globalData.typePro = {};
                                    app.globalData.meailFee = 0;
                                    wx.redirectTo({
                                      url: '../information/information?id=' + orderId,
                                    })
                                  },
                                  fail: function () {
                                    console.log(1111);
                                    app.globalData.menuPro = {};
                                    app.globalData.allpro = { 'menuNum': 0, 'menuPrice': 0 };
                                    app.globalData.menuProArray = {};
                                    app.globalData.coupon = null
                                    app.globalData.sendAddress = null;
                                    app.globalData.specialOfferPrice = 0;
                                    app.globalData.typePro = {};
                                    app.globalData.meailFee = 0;
                                    wx.redirectTo({
                                      url: '../information/information?id=' + orderId,
                                    })
                                  }
                                })

                              }
                              // else if (res.data.status == 11) {
                              //   that.getopenid()
                              // } 
                              else {
                                that.setData({
                                  isViewDisabled: true,
                                })
                                wx.hideLoading();
                                if (payId == 1) {
                                  app.globalData.menuPro = {};
                                  app.globalData.allpro = { 'menuNum': 0, 'menuPrice': 0 };
                                  app.globalData.menuProArray = {};
                                  app.globalData.coupon = null
                                  app.globalData.sendAddress = null;
                                  app.globalData.specialOfferPrice = 0;
                                  app.globalData.typePro = {};
                                  app.globalData.meailFee = 0;
                                  wx.redirectTo({
                                    url: '../information/information?id=' + orderId,
                                  })
                                } else {
                                  wx.showModal({
                                    title: '提示',
                                    content: res.data.msg,
                                    showCancel: false,
                                    confirmColor: '#CAA284',
                                    confirmText: '确认',
                                    success: function (res) {

                                    }
                                  })
                                }
                              }

                            }
                          })
                        } else {

                          that.setData({
                            isViewDisabled: true,
                          })
                          wx.hideLoading();
                          app.globalData.menuPro = {};
                          app.globalData.allpro = { 'menuNum': 0, 'menuPrice': 0 };
                          app.globalData.menuProArray = {};
                          app.globalData.sendAddress = null;
                          app.globalData.specialOfferPrice = 0;
                          app.globalData.typePro = {};
                          app.globalData.meailFee = 0;
                          wx.redirectTo({
                            url: '../information/information?id=' + orderId,
                          })

                        }
                      }
                    }
                  })


                } else if (res.data.status == 4) {
                  wx.hideLoading();
                  that.setData({
                    isViewDisabled: true,
                  })
                  that.getShopData(app.globalData.JSESSIONID, that.data.shopId, app.globalData.latitude, app.globalData.longitude,'yes');
                 
                }  else {
                  that.setData({
                    isViewDisabled: true,
                  })
                  wx.hideLoading();
                  // if (payId == 1) {
                  //   var orderId = res.data.data;
                  //   app.globalData.menuPro = {};
                  //   app.globalData.allpro = { 'menuNum': 0, 'menuPrice': 0 };
                  //   app.globalData.menuProArray = {};
                  // app.globalData.coupon = null
                  //   app.globalData.sendAddress = null;
                  //   app.globalData.specialOfferPrice = 0;
                  //   app.globalData.typePro = {};
                  //   app.globalData.meailFee = 0;
                  //   wx.redirectTo({
                  //     url: '../information/information?id=' + orderId,
                  //   })
                  // } else {
                  wx.showModal({
                    title: '提示',
                    content: res.data.msg,
                    showCancel: false,
                    confirmColor: '#CAA284',
                    confirmText: '确认',
                    success: function (res) {
                    }
                  })
                  // }
                }
              }
            })

          }
        })
      }
    }
  },
  btn_address: function () {
    this.setData({
      isViewDisabled: true
    })

    wx.navigateTo({
      url: '../address/address?typeNum=2',
    })
  },
  strToDate: function (dateObj) {
    dateObj = dateObj.replace(/(-)/g, '/');
    // console.log(dateObj);
    return new Date(dateObj)
  },
  getNowDate: function () {
    var myDate = new Date();

    var year = myDate.getFullYear();    //获取完整的年份(4位,1970-????)
    var month = myDate.getMonth() + 1;       //获取当前月份(0-11,0代表1月)
    var day = myDate.getDate();        //获取当前日(1-31)
    var hour = myDate.getHours();       //获取当前小时数(0-23)
    var minutes = myDate.getMinutes();     //获取当前分钟数(0-59)
    var second = myDate.getSeconds();     //获取当前秒数(0-59)
    myDate.toLocaleDateString();     //获取当前日期
    var mytime = myDate.toLocaleTimeString();     //获取当前时间
    return year + '' + month + '' + day + '' + hour + '' + minutes + '' + second;
  },

  getActivityData: function (shopId, money, moneyAll) {
    var that = this;
    var menuPro = app.globalData.menuPro;
    var menuPro1;
    var menuProId = '';
    var menuPro2 = []
    for (var i in menuPro) {
      if (menuPro[i].id) {
        menuProId += menuPro[i].id + ',';
      }
    }
    menuProId = menuProId.substring(0, menuProId.length - 1);

    if (app.globalData.extId == '' | app.globalData.extId == null) {
      app.globalData.extId = this.data.shopId
    }
    if (app.globalData.memberId == '' | app.globalData.memberId == null) {
      app.globalData.memberId = 0
    }
    wx.request({
      url: url.getActivityLib + '/' + app.globalData.memberId,
      data: {},
      header: {
        clientId: constant.clientId,
        storeId: app.globalData.extId,
        brandId: constant.brandId,
        // storeId: 459,
        productsPosId: menuProId
      },
      success: function (res) {
        console.log(res);

        if (res.data.code == 200) {
          var price = 0;
          var item = res.data.data;
          var discountObj = { 'price': 0 };
          console.log(money);
          var indexNum = 0;
          var discountPro = [];
          var zKMoney = 0;
          var PreferentialActivitiesPro = {};
          var discountProType1 = {};
          for (var i = 0; i < item.length; i++) {

            if (item.length > 0) {

              if (item[i].type == 3) {
                console.log(item[i]);
                console.log('测试3');
                PreferentialActivitiesPro = item[i]
                if (item[i].moneyOff) {

                  for (var z = 0; z < item[i].moneyOff.length; z++) {

                    if (money / 100 >= item[i].moneyOff[z].moneyCondition) {
                      if (price < item[i].moneyOff[z].discount) {
                        price = item[i].moneyOff[z].discount;
                        discountObj['price'] = item[i].moneyOff[z].discount * 100;
                        discountObj['moneyCondition'] = item[i].moneyOff[z].moneyCondition;
                        discountObj['name'] = item[i].moneyOff[z].ruleDetail;
                        discountObj['pid'] = item[i].id;
                        discountObj['type'] = item[i].type;
                        discountObj['title'] = item[i].title;
                      }
                    }
                  }
                }
              } else if (item[i].type == 1) {
                discountProType1 = item[i];
                if (money >= item[i].moneyCondition * 100) {

                  if (item[i].productsBonus.bonusProducts.length > 0) {
                    var z = []
                    for (var j = 0; j < item[i].productsBonus.bonusProducts.length; j++) {

                      var discountObj1 = {};
                      discountObj1 = item[i].productsBonus.bonusProducts[j];
                      discountObj1['title'] = item[i].title;
                      discountObj1['pid'] = item[i].id;
                      discountObj1['moneyCondition'] = item[i].moneyCondition;
                      discountPro.push(discountObj1);
                    }
                    console.log(discountPro)
                    console.log(that.data.menuDataPro)
                    //把折扣商品加入已点餐单
                    console.log(app.globalData.menuPro)
                    for (var q = 0; q < that.data.menuDataPro.length; q++) {
                      for (var w = 0; w < that.data.menuDataPro[q].products.length; w++) {
                        for (var e = 0; e < discountPro.length; e++) {
                          if (that.data.menuDataPro[q].products[w].extId == discountPro[e].productPosId) {
                            var h = {}
                            that.setData({
                              normalView: true
                            })
                            discountPro[e].count = discountPro[e].count == 0 ? 1 : discountPro[e].count
                            console.log('有符合情况')
                            h['menuName'] = discountPro[e].productName
                            h['id'] = that.data.menuDataPro[q].products[w].uid
                            h['pid'] = that.data.menuDataPro[q].products[w].uid
                            h['num'] = discountPro[e].count
                            h['price'] = that.data.menuDataPro[q].products[w].price * 100
                            h['typeId'] = that.data.menuDataPro[q].products[w].bigTypeId
                            h['costPrice'] = 0
                            h['mealFee'] = 0
                            console.log(h)
                            z.push(h)
                            menuPro1 = z
                            menuPro1[e] = z[e]

                            discountPro[e].value = that.data.menuDataPro[q].products[w].price * discountPro[e].count
                            discountPro[e].setdiscount = true
                            that.setData({
                              menuPro1: menuPro1
                            })
                          } else {
                            if (discountPro[e].setdiscount == undefined | !discountPro[e].setdiscount) {
                              discountPro[e].value = 0
                            }
                          }
                        }

                      }

                    }
                  }
                }
              } else if (item[i].type == 5) {


                for (var a = 0; a < item[i].productsBonus.bonusProducts.length; a++) {

                  if (item[i].productsBonus.bonusProducts[a].discountType == 0) {

                    for (var k in menuPro) {

                      if (item[i].productsBonus.bonusProducts[a].productPosId == menuPro[k].id) {
                        zKMoney += parseInt(menuPro[k].price * menuPro[k].num - menuPro[k].price * item[i].productsBonus.bonusProducts[a].value * menuPro[k].num / 10);

                      }
                    }
                  } else if (item[i].productsBonus.bonusProducts[a].discountType == 1) {
                    for (var k in menuPro) {

                      if (item[i].productsBonus.bonusProducts[a].productPosId == menuPro[k].id) {
                        zKMoney += parseInt(item[i].productsBonus.bonusProducts[a].value * 100 * menuPro[k].num);
                      }
                    }
                  } else if (item[i].productsBonus.bonusProducts[a].discountType == 2) {

                    for (var k in menuPro) {

                      if (item[i].productsBonus.bonusProducts[a].productPosId == menuPro[k].id) {

                        zKMoney += parseInt(menuPro[k].price * menuPro[k].num - item[i].productsBonus.bonusProducts[a].value * 100 * menuPro[k].num);
                        console.log(zKMoney);
                      }
                    }

                  }

                }
                console.log('测试1');
                console.log(zKMoney);


                if (zKMoney > 0) {
                  console.log(zKMoney);

                  discountObj['price'] = parseInt(zKMoney);
                  discountObj['pid'] = item[i].id;
                  discountObj['type'] = item[i].type;
                  discountObj['title'] = item[i].title;
                }
              }
            }
          }
          console.log(99999999);
          console.log(money);
          //清除线金额的计算
          if (app.globalData.typeValue == 2) {
            that.setData({
              specialOfferPrice: parseInt(money) + parseInt(app.globalData.meailFee)
            })
          } else {

            that.setData({
              specialOfferPrice: parseInt(money) + parseInt(app.globalData.sendMoney) + parseInt(app.globalData.meailFee)
            })
          }
          var syGoodsPrice = 0;
          if (discountObj.price > 0) {
            if (discountObj.type == 5) {
              syGoodsPrice = parseInt(money - zKMoney);

            } else {

              syGoodsPrice = that.accSub(money, discountObj.price);
              console.log(syGoodsPrice);
            }
          } else {

            syGoodsPrice = that.accSub(money, discountObj.price);
            console.log(syGoodsPrice);
          }
          var discountProType2 = [];
          if (discountPro.length > 0) {
            for (var y = 0; y < discountPro.length; y++) {
              console.log(syGoodsPrice);
              console.log(discountPro[y].moneyCondition);
              if (syGoodsPrice >= discountPro[y].moneyCondition * 100) {
                discountProType2.push(discountPro[y]);
              }
            }
          }
          console.log(discountProType2);
          that.setData({
            discountProType22: discountProType2,
          })
          console.log(syGoodsPrice);
          that.getMemberInformation(syGoodsPrice, app.globalData.phone);

          if (discountObj != undefined && discountObj.title != undefined && discountObj.title.length > 15) {
            discountObj.title = discountObj.title.substring(0, 15) + '...'
          }


          that.setData({
            PreferentialActivitiesPro: PreferentialActivitiesPro,
            discountObj: discountObj,
            discountNamePro: discountProType2,
            discountProType1: discountProType1
          })

        } else {
          that.setData({
            PreferentialActivitiesPro: [],
        })
          wx.hideLoading();
        }
      }


    })
  },
  getMemberInformation: function (syGoodsPrice, phone) {
    var that = this;
    var str = '';
    var dict = {
      brandId: constant.brandId, storeCode: app.globalData.storeCode, clientId: constant.clientId, mobile: phone, timestamp: Date.parse(new Date()) + app.globalData.CurrentTimeMilli}
    var exceptStr = except.except(dict)
    var header = except.removeEmpty(dict);
    header.sign = md5.hexMD5(exceptStr)
    wx.request({
      url: url.getMemberInformation + phone,
      data: {},
      header: header,
      success: function (res) {
        console.log(res);
        if (res.data.code == 200) {
          var syGoodsPriceTemp = syGoodsPrice;
          app.globalData.memberId = res.data.data[0].id;
          var couponPro = that.data.couponPro;
          var couponsCanuse = that.data.couponsCanuse
          console.log('couponsCanuse',couponsCanuse)
          for (var i = 0; i < couponsCanuse.length; i++) {
            if (couponsCanuse[i].useStores) {
              if (couponsCanuse[i].useStores.indexOf(app.globalData.extId) > -1) {
                couponPro.push(couponsCanuse[i]);
              }
            } else {
              couponPro.push(couponsCanuse[i]);
            }


          }
          console.log(couponPro);
          res.data.data[0]['balances'] = res.data.data[0].balance * 100;
          res.data.data[0]['discountPrice'] = that.accSub(syGoodsPriceTemp, parseInt(syGoodsPriceTemp * res.data.data[0].discount / 10));
          if (isNaN(app.globalData.meailFee)) {
            console.log(app.globalData.meailFee + "ddd")
            app.globalData.meailFee = 0;
          }
          //打折后的金额＋配送费金额
          if (app.globalData.typeValue == 2) {

            syGoodsPriceTemp = parseInt(syGoodsPriceTemp * res.data.data[0].discount / 10) + app.globalData.meailFee;
            console.log(syGoodsPriceTemp + "ddd")
          } else {
            console.log(syGoodsPriceTemp + "ddd" + app.globalData.sendMoney)
            syGoodsPriceTemp = parseInt(syGoodsPriceTemp * res.data.data[0].discount / 10) + app.globalData.sendMoney + app.globalData.meailFee;
            console.log(syGoodsPriceTemp + "ddd" + syGoodsPrice + app.globalData.sendMoney + app.globalData.meailFee)
          }
          
          that.setData({
            memberInformation: res.data.data[0],
            cardNo: res.data.data[0].cardNo,
            couponPro: couponPro,
            syGoodsPrice: syGoodsPriceTemp,
          })
          wx.hideLoading();
        } else {

          that.setData({
            isNotmember: false,
            isNotmembermsg: res.data.message,
            syGoodsPrice: syGoodsPriceTemp,
          })
          wx.hideLoading();
          // var syGoodsPriceTemp = syGoodsPrice;
          // if (app.globalData.typeValue == 2) {
          //   syGoodsPriceTemp = parseInt(syGoodsPriceTemp * res.data.data[0].discount / 10) + app.globalData.meailFee;
          // } else {
          //   syGoodsPriceTemp = parseInt(syGoodsPriceTemp * res.data.data[0].discount / 10) + app.globalData.sendMoney + app.globalData.meailFee;
          // }

          // console.log(syGoodsPriceTemp)
          // that.setData({
          //   syGoodsPrice: syGoodsPriceTemp,
          //   isLoading: true
          // })
          // console.log(that.data.syGoodsPrice)
        }
      }
    })
  },
  btn_addres_confirm() {

    wx.navigateBack({
      delta: 1
    })
  },
  btn_time_confirm(){
     this.setData({
       isTaketime:true
     })
  },
  input_remarks: function (e) {
    var that = this;

    that.setData({
      remarks: e.detail.value
    })
  },
  /**
   *  20180110 yly 添加位置 ＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊
   * 
   */

  /**
   *    end ****************************************************
   */

  getInvoice: function () {
    var that = this;

    var isInvoice = app.globalData.isInvoice;
    var invoiceType = app.globalData.invoiceType;
    if (isInvoice) {
      var invoicePro = [];

      for (var z = 0; z < invoiceType.length; z++) {
        var invoiceObj = {};

        invoiceObj['type'] = invoiceType[z];
        invoiceObj['isChecks'] = true;
        if (z == 0) {
          invoiceObj['isInvoice'] = false;
        } else {
          invoiceObj['isInvoice'] = true;
        }
        invoicePro.push(invoiceObj);
      }
      that.setData({
        invoiceType: invoicePro,
      })
      console.log(that.data.invoiceType)
    }
  },
  
  btn_open: function () {
    var that = this;
    var isInvoiceName = that.data.isInvoiceName;
    var invoiceType = that.data.invoiceType;
    var invoiceId = that.data.invoiceId;
    var isJD = that.data.isJD;
    console.log(invoiceType);

    if (isInvoiceName) {
      isInvoiceName = false;
      for (var i = 0; i < invoiceType.length; i++) {

        invoiceType[i]['isChecks'] = true;
        invoiceId = 0;

      }
      isJD = false;
    } else {
      isInvoiceName = true;
      for (var i = 0; i < invoiceType.length; i++) {

        invoiceType[i]['isChecks'] = false;
        if (!invoiceType[i]['isInvoice']) {

          invoiceId = invoiceType[i].type;

          if (invoiceType[i].type == 2) {
            isJD = true;
          }
        }

      }
    }

    console.log(invoiceId);
    console.log('____________________________')
    console.log(invoiceType)
    that.setData({
      invoiceType: invoiceType,
      isInvoiceName: isInvoiceName,
      invoiceId: invoiceId,
      isJD: isJD
    })

  },
  btn_k_p: function (e) {
    var that = this;
    var item = e.currentTarget.dataset.item;
    var index = e.currentTarget.dataset.index;
    var invoiceType = that.data.invoiceType;
    var isJD = that.data.isJD;
    var invoiceId = that.data.invoiceId;

    for (var i = 0; i < invoiceType.length; i++) {

      if (index == i) {
        if (item.isInvoice) {
          invoiceType[index].isInvoice = false;
          invoiceId = item.type;
          if (item.type == 2) {
            isJD = true;
          } else {
            isJD = false;
          }
        }


      } else {
        invoiceType[i].isInvoice = true;
      }
    }

    that.setData({
      invoiceType: invoiceType,
      isJD: isJD,
      invoiceId: invoiceId
    })
  },
  btn_h_p: function () { //使用会员余额支付
    var that = this;
    var memberInformation = that.data.memberInformation;
    var isYE = that.data.isYE;
    var moneyAll = that.data.moneyAll;
    var discountObj = that.data.discountObj;
    var sendMoney = that.data.sendMoney;
    var typeValue = that.data.typeValue;
    var money = 0;
    var syGoodsPrice = that.data.syGoodsPrice;
    var meailFeeMoney = that.data.meailFeeMoney;
    console.log(syGoodsPrice);
    if (memberInformation.balance > 0) {
      console.log(memberInformation);
      if (isYE) {
        isYE = false;
        memberInformation['balances'] = memberInformation.balance * 100;
        if (memberInformation['yh_price']) {
          syGoodsPrice = parseInt(parseInt(syGoodsPrice) + parseInt(memberInformation['yh_price']));

          that.setData({
            syGoodsPrice: syGoodsPrice,
            memberInformation: memberInformation
          })
        }


      } else {

        isYE = true;


        money = syGoodsPrice;

        if (money > memberInformation.balance * 100) {
          memberInformation['yh_price'] = memberInformation.balance * 100;
          money = that.accSub(money, memberInformation.balance * 100);
          memberInformation['balances'] = 0;

        } else {
          memberInformation['yh_price'] = money;
          money = 0;
          memberInformation['balances'] = that.accSub(memberInformation.balance * 100, memberInformation['yh_price']);
        }
        console.log(memberInformation);
        that.setData({
          memberInformation: memberInformation,
          syGoodsPrice: money
        })
      }
      that.setData({
        isYE: isYE
      })


    }

  },
  getDayData: function (endTime) {

    var that = this;

    var nowTime = new Date(getNowFormatDate());

    var endTime = new Date(endTime);

    var nextTime = new Date(endTime - nowTime);

    var day = Math.floor(nextTime / (24 * 1000 * 3600));

    return day;

    function getNowFormatDate() {
      var date = new Date();
      var seperator1 = "-";
      var seperator2 = ":";
      var month = date.getMonth() + 1;
      var strDate = date.getDate();
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }

      var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate;
      return currentdate;
    }
  },
  bindCouponChangevka: function () {
    var that = this;
    console.log(1111);
    var coupon=app.globalData.coupon 

   
      var couponPro = that.data.couponPro;
      var menuPro = that.data.menuPro;
      var cardNo = that.data.cardNo;
      var sendMoney = that.data.sendMoney;
      var goodsMoney = that.data.goodsMoney;
      if (goodsMoney >= coupon.gifts * 100) {
        var menuArray = [];
        for (var i in menuPro) {
          var menuObj = {};
          menuObj['name'] = menuPro[i].menuName;
          menuObj['price'] = menuPro[i].price / 100;
          if (menuPro[i].extId != '' && menuPro[i].extId != null && menuPro[i].extId != undefined) {
            menuObj['product_no'] = menuPro[i].extId;
          } else {
            menuObj['product_no'] = menuPro[i].id;
          }
          menuObj['qty'] = menuPro[i].num;

          menuArray.push(menuObj);
        }
        var params = {
          "cardNo": cardNo, "couponIds": coupon.id, "order": { "products": menuArray }, storeCode: app.globalData.extId, "brandId": constant.brandId, timestamp: Date.parse(new Date()) + app.globalData.CurrentTimeMilli, clientId: constant.clientId }
        var exceptStr = except.except(params)
        var dict = {
          brandId: constant.brandId, storeCode: app.globalData.extId, clientId: constant.clientId, timestamp: Date.parse(new Date()) + app.globalData.CurrentTimeMilli
        }
        var header = except.removeEmpty(dict);
        header.sign = md5.hexMD5(exceptStr)
        console.log(header.sign)
        wx.request({
          url: url.useCoupon,
          data: {
            couponIds: coupon.id,
            cardNo: cardNo,
            "order": { "products": menuArray }
          },
          method: 'POST',
          header: header,
          success: function (res) {
            console.log(res);
            if (res.data.code == 200) {
              var couponObj = that.data.couponObj;
              couponObj = coupon;
              couponObj['couponType'] = res.data.data.coupons[0].couponType;
              couponObj['couponPrice'] = (parseInt(goodsMoney) - parseInt(res.data.amount * 100)) / 100;


              var memberInformation = that.data.memberInformation;
              var isYE = that.data.isYE;
              var moneyAll = that.data.moneyAll;
              var discountObj = that.data.discountObj;
              var sendMoney = that.data.sendMoney;
              var typeValue = that.data.typeValue;
              var money = 0;
              var syGoodsPrice = 0;
              var meailFeeMoney = that.data.meailFeeMoney;
              var PreferentialActivitiesPro = that.data.PreferentialActivitiesPro;
              var discountProType1 = that.data.discountProType1;
              var discountNamePro = [];
              syGoodsPrice = res.data.amount * 100;
              console.log(syGoodsPrice);
              var price = 0;

              if (PreferentialActivitiesPro.moneyOff) {
                for (var i = 0; i < PreferentialActivitiesPro.moneyOff.length; i++) {
                  console.log();
                  var moneyCondition = PreferentialActivitiesPro.moneyOff[i].moneyCondition * 100;
                  if (syGoodsPrice >= moneyCondition) {
                    if (price < PreferentialActivitiesPro.moneyOff[i].discount) {
                      price = PreferentialActivitiesPro.moneyOff[i].discount;
                      discountObj['price'] = PreferentialActivitiesPro.moneyOff[i].discount * 100;
                      discountObj['moneyCondition'] = PreferentialActivitiesPro.moneyOff[i].moneyCondition;
                      discountObj['name'] = PreferentialActivitiesPro.moneyOff[i].ruleDetail;
                      discountObj['pid'] = PreferentialActivitiesPro.id;
                      discountObj['type'] = PreferentialActivitiesPro.type;
                      discountObj['title'] = PreferentialActivitiesPro.title;
                    }
                  }
                }
              }

              console.log(discountObj);
              console.log(syGoodsPrice);
              if (discountObj.price > 0) {
                var moneyCondition1 = discountObj['moneyCondition'] * 100;
                console.log(moneyCondition1);
                if (syGoodsPrice >= moneyCondition1) {
                  console.log(111111);
                  syGoodsPrice = that.accSub(syGoodsPrice, discountObj.price);
                } else {
                  discountObj = { 'price': 0 }
                }

              }
              if (syGoodsPrice < 0) {
                syGoodsPrice = 0;
              }

              if (syGoodsPrice >= discountProType1.moneyCondition * 100) {

                if (discountProType1.productsBonus.bonusProducts.length > 0) {

                  for (var j = 0; j < discountProType1.productsBonus.bonusProducts.length; j++) {

                    var discountObj1 = {};
                    discountObj1 = discountProType1.productsBonus.bonusProducts[j];
                    discountObj1['title'] = discountProType1.title;
                    discountObj1['pid'] = discountProType1.id;
                    discountObj1['moneyCondition'] = discountProType1.moneyCondition;
                    discountNamePro.push(discountObj1);
                  }
                }
              }


              memberInformation['discountPrice'] = that.accSub(syGoodsPrice, parseInt(syGoodsPrice * memberInformation.discount / 10));

              if (syGoodsPrice < 0) {
                syGoodsPrice = 0;
              }

              if (typeValue == 2) {
                syGoodsPrice = parseInt(syGoodsPrice * memberInformation.discount / 10) + meailFeeMoney;
              } else {
                syGoodsPrice = parseInt(syGoodsPrice * memberInformation.discount / 10) + sendMoney + meailFeeMoney;
              }
              if (isYE) {

                if (memberInformation.balance > 0) {
                  if (syGoodsPrice > memberInformation.balance * 100) {
                    syGoodsPrice = that.accSub(syGoodsPrice, memberInformation.balance * 100);
                    memberInformation['balances'] = 0;
                    memberInformation['yh_price'] = memberInformation.balance * 100;
                  } else {
                    memberInformation['balances'] = that.accSub(memberInformation.balance * 100, syGoodsPrice);
                    memberInformation['yh_price'] = syGoodsPrice;
                    syGoodsPrice = 0;
                  }
                }

              }
              console.log(memberInformation);


              that.setData({
                couponIndex: coupon.couponIndex,
                couponObj: couponObj,
                syGoodsPrice: syGoodsPrice,
                memberInformation: memberInformation,
                discountObj: discountObj,
                discountNamePro: discountNamePro
              })
            } else {
              that.notCouponPrice(0);
              wx.showModal({
                title: '提示',
                content: res.data.message,
                success: function () {
                }
              })
            }
          }
        })
      } else {
        that.notCouponPrice(0);
      }
    

  },
  bindCouponChange: function (e) {
    var that = this;
    var index = e.detail.value;
    var selectCoupons = this.data.couponPro
    var syGoodsPrice = that.data.syGoodsPrice;
    var menuPro = that.data.menuPro
    var meailFeeMoney = that.data.meailFeeMoney;
    var sendMoney = that.data.sendMoney;
    var typeValue = that.data.typeValue;
    var couponObj = that.data.couponObj;
    console.log(menuPro);
    // for (var i in menuPro){
    //   syGoodsPrice += menuPro[i].price
    // }
    
    if (selectCoupons[index].couponName == "暂无可用优惠券") return
    syGoodsPrice = that.accSub(syGoodsPrice, parseFloat(selectCoupons[index].coupon.offsetMoney)*100);
    console.log(syGoodsPrice)
    if (typeValue == 2) {
      // syGoodsPrice = parseInt(syGoodsPrice) + meailFeeMoney;
      syGoodsPrice = parseInt(syGoodsPrice);
      console.log(syGoodsPrice)

    } else if (typeValue == 3) {
      syGoodsPrice = parseInt(syGoodsPrice);
      console.log(syGoodsPrice)

    } else {
      // syGoodsPrice = parseInt(syGoodsPrice) + sendMoney + meailFeeMoney;
      syGoodsPrice = parseInt(syGoodsPrice);
      console.log(syGoodsPrice)

    }
    couponObj = selectCoupons[index].coupon
    console.log(that.data.discountObj)
    that.setData({
      couponId: selectCoupons[index].couponId,
      couponObj: couponObj,
      couponIndex: index,
      syGoodsPrice: syGoodsPrice
    })
  },
  btn_pay_method: function (e) {
    var that = this;

    that.setData({
      payId: e.currentTarget.dataset.info
    })

  },
  accMul: function (arg1, arg2) {
    var m = 0, s1 = arg1.toString(), s2 = arg2.toString();
    try { m += s1.split(".")[1].length } catch (e) { }
    try { m += s2.split(".")[1].length } catch (e) { }
    return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m)
  },
  accSub: function (arg1, arg2) {
    console.log(arg1, arg2)
    var r1, r2, m, n;
    try { r1 = arg1.toString().split(".")[1].length } catch (e) { r1 = 0 }
    try { r2 = arg2.toString().split(".")[1].length } catch (e) { r2 = 0 }
    m = Math.pow(10, Math.max(r1, r2));
    //last modify by deeka
    //动态控制精度长度
    n = (r1 >= r2) ? r1 : r2;
    return ((arg1 * m - arg2 * m) / m).toFixed(n);
  },
  inputPhone: function (e) {
    this.setData({
      personPhone: e.detail.value
    })
  },
  inputName: function (e) {
    this.setData({
      personName: e.detail.value
    })
  },
  input_f_1: function (e) {

    this.setData({
      f_p_1: e.detail.value
    })
  },
  input_f_2: function (e) {

    this.setData({
      f_p_2: e.detail.value
    })
  },
  notCouponPrice: function (index) {
    var that = this;
    var memberInformation = that.data.memberInformation;
    console.log(memberInformation)
    if (!memberInformation){
      return
    }
    var isYE = that.data.isYE;
    var moneyAll = that.data.moneyAll;
    var discountObj = that.data.discountObj;
    var sendMoney = that.data.sendMoney;
    var typeValue = that.data.typeValue;
    var goodsMoney = that.data.goodsMoney;
    var money = 0;
    var syGoodsPrice = 0;
    var meailFeeMoney = that.data.meailFeeMoney;
    var PreferentialActivitiesPro = that.data.PreferentialActivitiesPro;
    var discountProType1 = that.data.discountProType1;
    var discountNamePro = [];
    console.log('不使用优惠券');
    console.log(PreferentialActivitiesPro);
    var syGoodsPrice = goodsMoney;
    var indexNum = 0;
    var price = 0;
    if (PreferentialActivitiesPro.moneyOff) {
      for (var i = 0; i < PreferentialActivitiesPro.moneyOff.length; i++) {
        var moneyCondition = PreferentialActivitiesPro.moneyOff[i].moneyCondition * 100;
        console.log(moneyCondition);
        if (syGoodsPrice >= moneyCondition) {
          if (price < PreferentialActivitiesPro.moneyOff[i].discount) {
            price = PreferentialActivitiesPro.moneyOff[i].discount;
            discountObj['price'] = PreferentialActivitiesPro.moneyOff[i].discount * 100;
            discountObj['moneyCondition'] = PreferentialActivitiesPro.moneyOff[i].moneyCondition;
            discountObj['name'] = PreferentialActivitiesPro.moneyOff[i].ruleDetail;
            discountObj['pid'] = PreferentialActivitiesPro.id;
            discountObj['type'] = PreferentialActivitiesPro.type;
            discountObj['title'] = PreferentialActivitiesPro.title;
          }
        }
      }
    }
    console.log(discountObj);
    if (discountObj.price > 0) {
      if (goodsMoney >= discountObj['moneyCondition'] * 100) {
        syGoodsPrice = that.accSub(goodsMoney, discountObj.price);
      } else {
        discountObj = { 'price': 0 }
      }
    }

    if (syGoodsPrice < 0) {
      syGoodsPrice = 0;
    }



    if (syGoodsPrice >= discountProType1.moneyCondition * 100) {

      if (discountProType1.productsBonus.bonusProducts.length > 0) {

        for (var j = 0; j < discountProType1.productsBonus.bonusProducts.length; j++) {

          var discountObj1 = {};
          discountObj1 = discountProType1.productsBonus.bonusProducts[j];
          discountObj1['title'] = discountProType1.title;
          discountObj1['pid'] = discountProType1.id;
          discountObj1['moneyCondition'] = discountProType1.moneyCondition;
          discountNamePro.push(discountObj1);
        }
      }
    }

    memberInformation['discountPrice'] = that.accSub(syGoodsPrice, parseInt(syGoodsPrice * memberInformation.discount / 10));

    if (syGoodsPrice < 0) {
      syGoodsPrice = 0;
    }
    if (typeValue == 2) {
      syGoodsPrice = parseInt(syGoodsPrice * memberInformation.discount / 10) + meailFeeMoney;
    } else {
      syGoodsPrice = parseInt(syGoodsPrice * memberInformation.discount / 10) + sendMoney + meailFeeMoney;
    }
    if (isYE) {

      if (memberInformation.balance > 0) {
        if (syGoodsPrice > memberInformation.balance * 100) {
          syGoodsPrice = that.accSub(syGoodsPrice, memberInformation.balance * 100);
          memberInformation['balances'] = 0;
          memberInformation['yh_price'] = memberInformation.balance * 100;
        } else {
          memberInformation['balances'] = that.accSub(memberInformation.balance * 100, syGoodsPrice);
          memberInformation['yh_price'] = syGoodsPrice;
          syGoodsPrice = 0;
        }
      }

    }
    that.setData({
      couponIndex: index,
      moneyAll: moneyAll,
      memberInformation: memberInformation,
      syGoodsPrice: syGoodsPrice,
      discountObj: discountObj,
      discountNamePro: discountNamePro
    })
  },
  getopenid: function () {
    wx.request({
      url: url.getOpenId + '&code=' + app.globalData.code,
      data: {},
      method: 'POST',
      success: function (res) {
        console.log(res);
      }
    })
  },
  seetextornot(e) {
    console.log(e)
    console.log(this.data.menuPro)
    var arr = this.data.menuPro
    var i = e.currentTarget.dataset.i
    if (!e.currentTarget.dataset.info.see) {
      arr[i].see = true
    } else {
      arr[i].see = false

    }
    this.setData({
      menuPro: arr
    })
  },
  bindtablewareChange(e){
    console.log(e)
    this.setData({
      tablewareIndex: this.data.tablewarePro[e.detail.value].id,
      tablewareObj: this.data.tablewarePro[e.detail.value]
    })
    console.log(this.data.tablewareObj)
  }

})