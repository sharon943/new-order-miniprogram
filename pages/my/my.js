// pages/my/my.js
var app = getApp();
var url = require('../../utils/url.js');
var QQMapWX = require('../../map/qqmap-wx-jssdk.js');
var constant = require('../../utils/constant.js');
var except = require('../../utils/except.js');
var md5 = require('../../utils/md5.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    CouponCount:0,
    titleData: [{ name: '地址管理', img: "../../images/my/address.png", route: "../address/address" }, { name: '个人资料', img: "../../images/my/person.png", route: "../person/person" }],
   imgData:[],
   routeData:[],
    isNotAddress_: true,
    memberData:{},
    isVka:1,
    nowExperience:0,
    upperExperience: 0,
    levelName:'',
    addExperience:0,
    nextLevelName:'',
    percent_:0,
    sw:'',
    serviceLogo: [
      { name: '消费记录', logo: '../../images/my/orders.png', route: "../member/RechargeRecord/RechargeRecord" },
      { name: '地址', logo: '../../images/my/address.png', route: "../address/address" },
      { name: '个人资料', logo: '../../images/my/info.png', route: "../person/person" },
      { name: '帮助中心', logo: '../../images/my/help.png', route: "../help/help"  },
      { name: '充值', logo: '../../images/my/Recharge.png', route: "../reCharge/reCharge" },
      { name: '灵气商城', logo: '../../images/my/mall.png', route: "../help/help"  },
      { name: '关于茶理', logo: '../../images/my/about.png', route: "../member/about/about" }
    ],
    avatarUrl: null, nikeName: null, levelNum: 0, IsshowCompleteBox: true, IsshowCompleteBox_:true
  }, template1: [], template2: [], islogin: 0,//0未登录，1已登陆

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     var that = this;
    if (app.globalData.isVka==1){
      that.setData({
        isVka:1
      })
    }else{
      that.setData({
        isVka: 0
      })
    }
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          sw: res.windowWidth,
        })
      },
      
    })
    if (app.globalData.userInfo){
      that.setData({
        nikeName: app.globalData.userInfo.nickName
      })
    }
   
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  getUnionId() {
    var that=this
    wx.login({
      success: res => {
        wx.request({
          url: 'https://api.weixin.qq.com/sns/jscode2session?appid=' + constant.appid + '&secret=' + constant.secret +'&js_code=' + res.code + '&grant_type=authorization_code',
          data: {},
          method: 'GET',
          success: resOp => {
            console.log(resOp)
            app.globalData.unionid = resOp.data.unionid ? resOp.data.unionid:'hasnot'
            console.log(app.globalData.unionid)
            that.addOpenId()
            that.getopenid()
          }
        })
      }
    })
  },
  go_equits:function(){
    if (this.data.islogin != 1) {
      this.setData({
        isNotAddress_: false,
      })
    } else {
      wx.navigateTo({
        url: '../member/equits/equits?levelNum=' + this.data.levelNum + '&upperExperience=' + this.data.upperExperience,
      })
    }
  },
  go_page:function (e){
    console.log(e)
    var item = e.currentTarget.dataset.item
    if (this.data.islogin!=1){
      this.setData({
        isNotAddress_: false,
      })
    }else{
      if (item.name == "地址管理") {
        wx.navigateTo({
          url: "../address/address?name=address",
        })
      } else if (item.name == "灵气商城") {
        this.go_mall()

      } else {
        wx.navigateTo({
          url: e.currentTarget.dataset.item.route,
        })
      }
    }
  },
  go_mall(){
    if (this.data.islogin != 1) {
      this.setData({
        isNotAddress_: false,
      })
    } else {
      wx.navigateToMiniProgram({
        appId: 'wx4f8e92f3c8f5a1dd',
        path: '/pages/mall/mall',
        extraData: {
          foo: 'bar'
        },
      })
    }
  }, 
   /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    if (app.globalData.OScreenBright > 0) {
      console.log(app.globalData.OScreenBright)
      wx.setScreenBrightness({
        value: app.globalData.OScreenBright
      })
    }
    that.getOpenIdData()
     
  },
  getOpenIdData: function () {
    var openId;
    var that = this
    console.log(111)
    if (app.globalData.openId) {
      openId = app.globalData.openId;
      that.setData({
        openId: app.globalData.openId
      })
      if (that.data.isVka == 1) {
        that.getUserInfoData(app.globalData.JSESSIONID);
      } else {
        that.getUserInfoData(app.globalData.JSESSIONID);
        that.getcoupons();
        that.getLeve();
      }
    } else {
      app.openIdReadyCallback = res => {
        openId = res
        that.setData({
          openId: res
        })
        if (that.data.isVka == 1) {
          that.getUserInfoData(app.globalData.JSESSIONID);
        } else {
          that.getUserInfoData(app.globalData.JSESSIONID);
          that.getcoupons();
          that.getLeve();
        }
      }
    }

  },
  go_huiyuanma:function(){
    console.log(this.data.template1)
    var template1 = this.data.template1
    if (!template1){
      template1=[]
    }
    if (this.data.islogin != 1) {
      this.setData({
        isNotAddress_: false,
      })
    } else {
      if (template1.length>0){
        wx.requestSubscribeMessage({
          tmplIds: this.data.template1,
          complete(res) {
            console.log(res)
            wx.navigateTo({
              url: '../huiyuanma/huiyuanma',
            })
          },
        })
      }else{
        wx.navigateTo({
          url: '../huiyuanma/huiyuanma',
        })
      }
    }
  },
  go_recharge: function () {
    if(app.globalData.isVka!=1){
      return
    }
    if (this.data.islogin != 1) {
      this.setData({
        isNotAddress_: false,
      })
    } else {
      wx.navigateTo({
        url: '../member/wallet/wallet?balance=' + this.data.memberData.balance
      })
    }
  },
  getPhoneNumber: function (e) {
    var that = this
    if (e.detail.errMsg == 'getPhoneNumber:fail user deny') {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '未授权',
        success: function (res) { }
      })
    } else if (e.detail.errMsg == 'getPhoneNumber:fail 用户未绑定手机，请先在微信客户端进行绑定后重试') {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '请输入手机号',
      })
    } else if (e.detail.errMsg == 'getPhoneNumber:ok') {
      that.setData({
        encryptedData: e.detail.encryptedData,
        iv: e.detail.iv
      })
      that.pwdLoginData(e.detail.encryptedData, e.detail.iv)
      // that.setphonenumber(e.detail.encryptedData, e.detail.iv)
    }
    else {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '同意授权',
        success: function (res) {
        }
      })
    }
    that.setData({
      isNotAddress_: true
    })
  },
 
  pwdLoginData: function (encryptedData, iv) {
    var that = this;
    var aa = app.globalData.JSESSIONID
    that.setData({ isNotAddress_: true })
    wx.request({
      url: url.pwdLoginfast + '&encryptedData=' + encodeURI(encryptedData).replace(/\+/g, '%2B') + '&iv=' + encodeURI(iv).replace(/\+/g, '%2B'),
      data: {},
      method: 'POST',
      header: aa ? { 'Cookie': 'JSESSIONID=' + aa } : {},
      success: function (res) {
        console.log(res)
        if (res.data.status == 1) {
          wx.showToast({
            title: '登录成功',
            icon: 'none',
            duration: 2000
          })
          that.getUserInfoData(app.globalData.JSESSIONID);
        }else if (res.data.msg == "你已经登录过！") {
          wx.showToast({
            title: '登录成功',
            icon: 'none',
            duration: 2000
          })
          that.getUserInfoData(app.globalData.JSESSIONID);
        }else if (res.data.status == 11) {
          that.getopenid()
          wx.showToast({
            title: '请重新登录',
            icon: 'none',
            duration: 2000
          })
          that.setData({ isNotAddress_: true })
        } else {
          wx.showToast({
            title: res.data.msg + 'res.data.status:' + res.data.status + 'encryptedData:' + encryptedData + 'iv:'+iv,
            icon: 'none',
            duration: 20000
          })
          console.log('res.data.status:', res.data.status)
          console.log('encryptedData:', encryptedData)
          console.log('iv:', iv)
          that.setData({ isViewDisabled: false, })
        }
        // that.getUserInfoData(app.globalData.JSESSIONID);
      }
    })
  },
  getopenid: function () {
    var that = this
    wx.login({
      success: res => {
        app.globalData.code = res.code
        wx.request({
          url: url.getOpenId + '&code=' + res.code,
          data: {},
          method: 'POST',
          success: resOp => {
            if (resOp.data.status == 1) {
              app.globalData.openId = resOp.data.data.openid;
              app.globalData.session_key = resOp.data.data.session_key;
              app.globalData.JSESSIONID = resOp.header["Set-Cookie"].match(/JSESSIONID=(.*)?;/)[1];
           
            }
          }

        })
      }
    })
  },
  getUserInfoData: function (JSESSIONID) {
    var that = this;
    wx.request({
      url: url.defaultS,
      data: {
        actionName: url.getUserInformation,
      },
      method: 'POST',
      header: JSESSIONID ? { 'Cookie': 'JSESSIONID=' + JSESSIONID } : {},
      success: function (res) {
        console.log(res.data)
        if (res.data.status == 9) {
          that.setData({
            isNotAddress_: false,
            islogin:0,
          })
        } else if (res.data.status == 1) {
          if (app.globalData.isVka==1) {
            that.getMemberInformation(res.data.data.phone);
          }else{
            var data = res.data.data;
            data.name = res.data.data.compellation;
            data.otherMobile = res.data.data.phone;
            that.setData({
              memberData: data
            })
          }
          app.globalData.phone = res.data.data.phone;
          app.globalData.uid = res.data.data.uid
          that.setData({
            islogin: 1,
          })
        } else if (res.data.status == 11) {
          that.setCacheData(app.globalData.openId, app.globalData.cityName, app.globalData.JSESSIONID, 1);
        }
      }
    })
  },
  getMemberInformation: function (phone) {
    var that = this;
    var str='';
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
          app.globalData.Discount = res.data.data[0].discount
          app.globalData.cardId = res.data.data[0].id
          app.globalData.vkaInfon=res.data.data[0],
          app.globalData.vkaInfon = res.data.data[0]
          that.getcoupons()
          that.getLeve();
          console.log(app.globalData.unionid)
          if (app.globalData.unionid == '' || app.globalData.unionid == undefined || app.globalData.unionid == 'undefined' || app.globalData.unionid==null){
            that.getUnionId()
          }
           
          if (!res.data.data[0].birthday && !that.data.IsshowCompleteBox_){
            that.setData({
              IsshowCompleteBox: false,
            })
          }
          that.setData({
            memberData: res.data.data[0],
            nowExperience: res.data.data[0].experience,
            levelName: res.data.data[0].levelName
          })
          app.globalData.memberData = res.data.data[0]
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    var that = this;
    that.setData({
      IsshowCompleteBox_: true,
      IsshowCompleteBox:true
    })
  },
  go_mycoupons:function(){
    if (this.data.islogin != 1) {
      this.setData({
        isNotAddress_: false,
      })
    } else {
      wx.navigateTo({
        url: '../mycoupons/mycoupons',
      })
    }
  },
 getLeve:function(){
   var that = this;
   var str = '';
   var dict = {
     brandId: constant.brandId, storeCode: app.globalData.storeCode, clientId: constant.clientId, timestamp: Date.parse(new Date()) + app.globalData.CurrentTimeMilli
   }
   var exceptStr = except.except(dict)
   var header = except.removeEmpty(dict);
   header.sign = md5.hexMD5(exceptStr)
   wx.request({
     url: url.level,
     data: {
     },
     header: header,
     success: function (res) {
       console.log('++++++++++++++');
       console.log(res);
       if (res.data.code == 200) {
         for(var i = 0;i<res.data.data.length;i++){
           if (that.data.levelName == res.data.data[i].levelName){
             if (i == res.data.total-1){
               that.setData({
                 nextLevelName:"",
                 upperExperience: res.data.data[i].upperLimit,
                 levelNum:i+1,
                 percent_: (that.data.nowExperience / res.data.data[i].upperLimit) * 100
               })
             }else{
               that.setData({
                 levelNum: i+1,
                 nextLevelName: res.data.data[i + 1].levelName,
                 upperExperience: res.data.data[i + 1].lowerLimit,
                 percent_: (that.data.nowExperience / res.data.data[i + 1].lowerLimit) * 100
               })
             }

           }
         }
         that.setData({
           
         })
       }
     }
   })
 },
  getcoupons: function () {
    var that = this
    var JSESSIONID = app.globalData.JSESSIONID
    if(app.globalData.isVka==1){
      var str = '';
      var dict = {
        brandId: constant.brandId, storeCode: app.globalData.storeCode, clientId: constant.clientId, timestamp: Date.parse(new Date()) + app.globalData.CurrentTimeMilli, cardNo: app.globalData.vkaInfon.cardNo, type: 0
      }
      var exceptStr = except.except(dict)
      var header = except.removeEmpty(dict);
      header.sign = md5.hexMD5(exceptStr)
      wx.request({
        url: url.getCouponLib +app.globalData.vkaInfon.cardNo+"/"+0,
        data: {
        },
        header: header,
        success: function (res) {
          console.log('++++++++++++++');
          console.log(res);
          if (res.data.code == 200) {
            that.setData({
              CouponCount: res.data.total
            })
          }
        }
      })
    }else{
      wx.request({
        url: url.defaultS,
        data: {
          actionName: url.Coupons,
          content: {
            pageSize: 0, pageNow: 100000
          }

        },
        method: 'POST',
        header: JSESSIONID ? { 'Cookie': 'JSESSIONID=' + JSESSIONID } : {},
        success: function (res) {

          if (res.data.status == 1) {
            if (res.data.data) {
              that.setData({
                CouponCount: res.data.data.length
              })
            }
          } else if (res.data.status == 9) {

          } else if (res.data.status == 11) {

          }
        }
      })
    }
 


  },
  cancelBox() {
    this.setData({
      isNotAddress_: true,
      IsshowCompleteBox_:true
    })
     console.log(this.IsshowCompleteBox_)


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
  go_fiInfo(){
    if (this.data.islogin != 1) {
      this.setData({
        isNotAddress_: false,
      })
    } else {
      wx.navigateTo({
        url: e.currentTarget.dataset.item.route,
      })
    }
  },
  cha(){
    this.setData({
      IsshowCompleteBox:true,
      IsshowCompleteBox_:true
    })
  },

  onTabItemTap(item) {
    var that = this;
      that.setData({
        IsshowCompleteBox_: false,
      })
 
    console.log(item)
  },
  addOpenId(){
    var that = this
    var json = {
      brandId: constant.brandId, storeCode: app.globalData.storeCode, clientId: constant.clientId, timestamp: Date.parse(new Date()) + app.globalData.CurrentTimeMilli, type: constant.type, openId: app.globalData.openId, cardId: app.globalData.cardId, unionId: app.globalData.unionid
    }
    var dd = {
      brandId: constant.brandId, storeCode: app.globalData.storeCode, clientId: constant.clientId, timestamp: Date.parse(new Date()) + app.globalData.CurrentTimeMilli,
    }
    var body = {
      type: constant.type,
      openId: app.globalData.openId,
      cardId: app.globalData.cardId,
      unionId: app.globalData.unionid
    }
    var dict = except.getKeyvalue(json)
    var exceptStr = except.except(dict)

    var header = except.removeEmpty(dd);
    header.sign = md5.hexMD5(exceptStr)
    that.setData({
      hiddenLoading: false
    })
    
    wx.request({
      url: url.addOpenId,
      method: 'POST',
      header: header,
      data: except.getKeyvalue(body),
      success: function (res) {
        console.log(res);
        that.subscription()

      }
    })
  },
  subscription(){
    var that=this
    var dict = {
      brandId: constant.brandId, storeCode: app.globalData.storeCode, clientId: constant.clientId, timestamp: Date.parse(new Date()) + app.globalData.CurrentTimeMilli
    }
    var exceptStr = except.except(dict)
    var header = except.removeEmpty(dict);
    header.sign = md5.hexMD5(exceptStr)
    wx.request({
      url: url.subscription,
      method:'GET',
      header: header,
      success: function (res) {
        console.log(res);
        if(res.data.code==200){
          if (parseInt(res.data.storeConfig.value) == 1) {
            if (res.data.wxTemplateMsg) {
              var types = res.data.wxTemplateMsg
              for (var i = 0; i < types.length; i++) {
                switch (types[i].type) {
                  case 21: that.setData({ template1: [types[i].templateId] }); break;
                  case 22: app.globalData.template2 = [types[i].templateId]; break;
                }
              }
            }
          } else {
            that.setData({
              template1: [],
            })
            app.globalData.template2 = []
          }
        }else{
          that.setData({
            template1: [],
          })
          app.globalData.template2 = []
        }
        
        
      },
      fail:function(){
        that.setData({
          template1: [],
        })
        app.globalData.template2 = []
      }
    })
  }
})