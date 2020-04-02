// pages/order/order.js
var app = getApp();
var url = require('../../utils/url.js');
var constant = require('../../utils/constant.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderMenu: null,color:'',
    orderF: null,
    openId: null,
    orderPro: [],
    isViewDisabled: true,
    isLoading: false,
    iconPath: '',
    isNotAddress_: true,
    isToast: true,
    k: 0,
    item: []
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '订单',
    })
    this.setData({
      iconPath: app.globalData.iconPath,
color:app.globalData.color
    })
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
    wx.showLoading({ title: '加载中…' })
    this.getOpenData();

    this.setData({
      isViewDisabled: true,
      iconPath: app.globalData.iconPath,
    })
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
    // console.log(111111)
    if (app.globalData.JSESSIONID) {
      var k = this.data.k
      k++
      this.setData({
        k: k
      })
      console.log(k)
      this.getOrderData(app.globalData.JSESSIONID, k)
    }

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
  getOpenData: function () {

    var openId;
    if (app.globalData.openId) {
      openId = app.globalData.openId;
      this.setData({
        openId: app.globalData.openId
      })

      this.getOrderData(app.globalData.JSESSIONID);
    } else {
      app.openIdReadyCallback = res => {
        console.log(res);
        openId = res.openId
        this.setData({
          openId: res.openId
        })

        this.getOrderData(app.globalData.JSESSIONID);
      }

    }

  },

  getOrderData: function (JSESSIONID, i) {

    var that = this;
    var k
    var item
    if (i) {
      k = i
      item = that.data.orderPro
    } else {
      k = 0
      item=[]
    }
    wx.request({
      url: url.defaultS,
      data: {
        actionName: url.getOrderLib,
        content: {
          pageNow: k,
          pageSize: 10
        }
      },
      method: 'POST',
      header: JSESSIONID ? { 'Cookie': 'JSESSIONID=' + JSESSIONID } : {},
      success: function (res) {
        console.log(res) 
        wx.hideLoading();
        if (res.data.status == 1) {
          for (var j = 0; j < res.data.data.length; j++) {
            item.push(res.data.data[j]);
          }
          that.setData({
            isNotAddress_: true
          })
          for (var i = 0; i < item.length; i++) {
            var index = item[i].storeName.indexOf('(')
            item[i].name = item[i].storeName.substring(index, item[i].storeName.length);
            switch (item[i].orderType){
              case 1: item[i].orderType_ = '外卖配送'; break;
              case 2: item[i].orderType_ = '门店自取'; break;
              case 3: item[i].orderType_ = '门店自取'; break;
              case 4: item[i].orderType_='外卖配送';break;
            }
            
          }
          if (res.data.data == [] && !k) {
            that.setData({
              orderPro: null,
              isLoading: true
            })
          } else {
            that.setData({
              orderPro: item,
              isLoading: true
            })
          }

        } else if (res.data.status == 9) {

          that.setData({
            isNotAddress_: false
          })
          // wx.navigateTo({
          //   url: '../login/login',
          // })
        } else if (res.data.status == 11) {
          that.setCacheData(app.globalData.openId, app.globalData.cityName, app.globalData.JSESSIONID, 1);
        } else {
          that.setData({
            isLoading: true
          })
        }
      }
    })
  },

  btn_information: function (e) {
    console.log(e)
    var that = this;

    this.setData({
      isViewDisabled: false
    })



    wx.navigateTo({
      url: '../information/information?id=' + e.currentTarget.dataset.item.orderId,
    })

  },
  setCacheData: function (openId, city, JSESSIONID, num = 0) {
    //that.setCacheData1(app.globalData.openId, app.globalData.cityName, app.globalData.JSESSIONID);
    /**else if(res.data.status == 9){
          wx.navigateTo({
            url: '../login/login',
          })
        }else if(res.data.status == 11){
          that.setCacheData1(app.globalData.openId, app.globalData.cityName, app.globalData.JSESSIONID);
        } */
    var that = this;
    wx.request({
      url: url.setCache,
      data: {
        cityName: city,
        openId: openId
      },
      method: 'POST',
      header: JSESSIONID ? { 'Cookie': 'JSESSIONID=' + JSESSIONID } : {},
      success: function (res) {

        if (num == 1) {
          that.getOpenData();
        }
      }
    })
  },
  go_comment: function (e) {
    console.log(e)
    var row = e.currentTarget.dataset.item.orderId
    console.log(row)
    wx.navigateTo({
      url: '../WebView/webview?orderId=' + row
    })
  },
  getMemberInformation: function (phone) {
    var that = this;
    console.log(phone);
    wx.request({
      url: url.getMemberInformation + phone,
      data: {
      },
      header: {
        clientId: constant.clientId,
        brandId: constant.brandId,
        // openId: app.globalData.openId
      },
      success: function (res) {
        console.log('++++++++++++++');
        console.log(res);
        if (res.data.code == 200) {
          app.globalData.Discount = res.data.data[0].discount
          app.globalData.memberId = res.data.data[0].id
        }
      }
    })
  },
  getopenid: function () {
    var that = this
    wx.login({
      success: res => {
        console.log(res);
        app.globalData.code = res.code
        wx.request({
          url: url.getOpenId + '&code=' + res.code,
          data: {},
          method: 'POST',
          success: resOp => {
            console.log(resOp);
            if (resOp.data.status == 1) {
              console.log(resOp.header);
              app.globalData.openId = resOp.data.data.openid;
              console.log(app.globalData.openId)
              app.globalData.session_key = resOp.data.data.session_key;
              console.log(app.globalData.session_key)
              app.globalData.JSESSIONID = resOp.header["Set-Cookie"].match(/JSESSIONID=(.*)?;/)[1];
              if (that.openIdReadyCallback) {
                that.openIdReadyCallback(resOp.data.data.openid)
              }
            }
          }

        })
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
        } else if (res.data.msg == "你已经登录过！") {
          wx.showToast({
            title: '登录成功',
            icon: 'none',
            duration: 2000
          })
          that.getUserInfoData(app.globalData.JSESSIONID);
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