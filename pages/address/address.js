// pages/address/address.js
var app = getApp();
var url = require('../../utils/url.js');
var constant = require('../../utils/constant.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isToast: true,
    isNotAddress_: true,
    addressPro:[],
    minheight: 0,
    systheight: 0,
    Rewite: true,
    typeNum: 0,
    islogin:1,
    value:"",
    sysWidth:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    console.log(options)
    if (options.typeNum) {
      that.setData({
        typeNum: options.typeNum,
        value:''
      })
    }else{
      that.setData({
        value: 'address'
      })
    }
    

  },
  getAllAdress: function () {
    var JSESSIONID = app.globalData.JSESSIONID;
    var that = this;
    var content = {}
    app.request.postRequestS(url.getAddressDataBase, content, JSESSIONID).then(res => {
      console.log(res)
      if (res.data.status == 1) {
        if (!res.data.data) {
          that.setData({
            addressPro: [],
          })
        } else {
          for (var i = 0; i < res.data.data.length; i++) {
            res.data.data[i].right = 0;
            res.data.data[i].address = res.data.data[i].receiverAddress + res.data.data[i].appendReceiverAddress
            if (res.data.data[i].sex == 0) {
              res.data.data[i].sexname = ""
            } else if (res.data.data[i].sex == 1) {
              res.data.data[i].sexname = "（男士）"
            } else if (res.data.data[i].sex == 2) {
              res.data.data[i].sexname = "女士"
            }
          }
        }
        that.setData({
          addressPro: res.data.data,
        })
      } else if (res.data.status == 9) {
        that.setData({
          islogin: 0
        })
      } else if (res.data.status == 11) {
        that.setCacheData(app.globalData.openId, app.globalData.cityName, app.globalData.JSESSIONID, 1);
      } else {
        that.setData({
          addressPro: []
        })

      }
    })

  },
  btn_add_adress: function () {
    var that = this;
    if(that.data.islogin==0){
      that.setData({
        isNotAddress_: false
      })
    }else{
      app.globalData.revisePro = {};
      app.globalData.dingwei = {}
      wx.navigateTo({
        url: '../addAddress/addAddress',
      })
    }
   
  },
  editor:function(e){
    var that = this;
    console.log(e)
    app.globalData.revisePro = e.currentTarget.dataset.item;
    wx.navigateTo({
      url: '../addAddress/addAddress',
    })
  },
  touchstart: function (e) {
    //开始触摸时 重置所有删除
    this.data.addressPro.forEach(function (v, i) {
      if (v.isTouchMove)//只操作为true的
        v.isTouchMove = false;
    })
    this.setData({
      startX: e.changedTouches[0].clientX,
      startY: e.changedTouches[0].clientY,
      addressPro: this.data.addressPro
    })
  },
  //滑动事件处理
  touchmove: function (e) {
    var that = this,
      index = e.currentTarget.dataset.index,//当前索引
      startX = that.data.startX,//开始X坐标
      startY = that.data.startY,//开始Y坐标
      touchMoveX = e.changedTouches[0].clientX,//滑动变化坐标
      touchMoveY = e.changedTouches[0].clientY,//滑动变化坐标
      //获取滑动角度
      angle = that.angle({ X: startX, Y: startY }, { X: touchMoveX, Y: touchMoveY });
    that.data.addressPro.forEach(function (v, i) {
      v.isTouchMove = false
      //滑动超过30度角 return
      if (Math.abs(angle) > 30) return;
      if (i == index) {
        if (touchMoveX > startX) //右滑
          v.isTouchMove = false
        else //左滑
          v.isTouchMove = true
      }
    })
    //更新数据
    that.setData({
      addressPro: that.data.addressPro
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        console.log(res)
        that.setData({
          sysWidth: res.screenWidth,
          systheight: res.screenHeight,
          minheight: res.windowHeight
        })
      },
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  var that = this;
    that.getAllAdress()
    
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
  choose_address(e){
    var that = this;
    console.log(that.data.value)
    if(!that.data.value){
      var typeNum = this.data.typeNum
      if (typeNum == 1) {
        this.choose_shop(e)
      } else {
        this.getDefaultData(e);
      }
    }
   
  },
  getDefaultData(e) {
    var that = this;
    var JSESSIONID = app.globalData.JSESSIONID;
    var item = e.currentTarget.dataset.item;
    console.log(item)
    var content = { storeId: app.globalData.shopId, coordinate: [item.longitude, item.latitude] }
    app.request.postRequest(url.getDefault, content, JSESSIONID)
      .then(res => {
        console.log(res)
        if (res.data.status == 1 & res.data.data != undefined) {
          if (res.data.data.length > 0) {
            app.globalData.sendAddress = item;
            console.log(app.globalData.sendAddress)
            wx.navigateBack({
              delta: 1
            })
          } else {
            wx.showModal({
              title: '该地址暂无法配送',
              content: '抱歉，目前该地址不在配送范围内，暂无法配送',
              showCancel: false,
              confirmText: '我知道了',
              confirmColor: '#CAA284',
              success(res) {
                if (res.confirm) {
                  console.log('用户点击确定')
                }
              }
            })
            that.setData({
              isNotAddress: false
            })
          }
        } else if (res.data.status == 11) {
          that.setCacheData(app.globalData.openId, app.globalData.cityName, app.globalData.JSESSIONID);
        } else {
          that.setData({
            isNotAddress: false,
          })
          wx.showToast({
            title: res.data.msg,
            icon: 'none'
          })
        }
      })

  },
  choose_shop: function (e) {
    var that = this;
    var JSESSIONID = app.globalData.JSESSIONID;
    var item = e.currentTarget.dataset.item;
    var typeNum = that.data.typeNum
    var boxtext
    if (typeNum==1){
      boxtext ='抱歉，目前该地址附近没有可配送的门店，暂无法配送'
    }else{
      boxtext = '抱歉，目前该地址不在配送范围内，暂无法配送'
    }
    console.log(item)
    var content = {
      coordinate: [item.longitude, item.latitude], searchName: item.address,
      businessType: [1, 4]
    }
    app.request.postRequestS(url.getStoreId, content, JSESSIONID)
      .then(res => { 
        console.log(res)
        if (res.data.status == 1 ) {
          app.globalData.sendAddress = item;    
          app.globalData.typeValue = 1;    
          app.globalData.shopId=null 
          app.globalData.menuPro = {};
          app.globalData.allpro = { 'menuNum': 0, 'menuPrice': 0 };
          app.globalData.menuProArray = {};
          app.globalData.specialOfferPrice = 0;
          app.globalData.typePro = {};
          app.globalData.meailFee = 0;   
              wx.navigateBack({
                delta: 1
              })
          
        } else if (res.data.status == 2) {
          wx.showModal({
            title: '该地址暂无法配送',
            content: '抱歉，目前该地址附近没有可配送的门店，暂无法配送',
            showCancel: false,
            confirmText: '我知道了',
            confirmColor: '#CAA284',
            success(res) {
              if (res.confirm) {
                console.log('用户点击确定')
              }
            }
          })
          that.setData({
            isNotAddress: false
          })
        }else if (res.data.status == 11) {
          that.setCacheData(app.globalData.openId, app.globalData.cityName, app.globalData.JSESSIONID);
        } 
      })
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
      console.log(e.detail.encryptedData)
      console.log(e.detail.iv)
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
          console.log(res)
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
    console.log(aa)
    that.setData({ isNotAddress_: true })
    wx.request({
      url: url.pwdLoginfast + '&encryptedData=' + encodeURI(encryptedData).replace(/\+/g, '%2B') + '&iv=' + encodeURI(iv).replace(/\+/g, '%2B'),
      data: {},
      method: 'POST',
      header: aa ? { 'Cookie': 'JSESSIONID=' + aa } : {},
      success: function (res) {
        console.log(res);
        if (res.data.status == 1) {
          wx.showToast({
            title: '登录成功',
            icon: 'none',
            duration: 2000
          })
          
          that.getUserInfoData(app.globalData.JSESSIONID);
        } else if (res.data.msg = "你已经登录过！") {
          wx.showToast({
            title: '登录成功',
            icon: 'none',
            duration: 2000
          })
          that.getUserInfoData(app.globalData.JSESSIONID)
        } else if (res.data.status == 11) {
          that.getOpenIdData()
          wx.showToast({
            title: '请重新登录',
            icon: 'none',
            duration: 2000
          })
          that.setData({ isNotAddress: true })
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 2000
          })
          that.setData({ isViewDisabled: true, })
        }

      }
    })
  },
  cancelBox() {
    this.setData({
      isNotAddress_: true
    })
  }
})