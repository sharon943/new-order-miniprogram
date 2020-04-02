// pages/Nearshops/Nearshops.js
var app = getApp();
var url = require('../../utils/url.js');
var constant = require('../../utils/constant.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shopData:[],
    systheight:0,
    address:{},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    console.log(app.globalData.sendAddress)
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          systheight: res.screenHeight,
          address: app.globalData.sendAddress
        })
      },
    })
    that.getnearshops()
  },
  getnearshops(){
    var longitude = app.globalData.sendAddress.longitude
    var latitude = app.globalData.sendAddress.latitude
    var content = {
      coordinate: [longitude, latitude],
      businessType: [1, 4],
      pageNow: 0,
      pageSize: 10000,
    }
    app.request.postRequest(url.nearshops, content, app.globalData.JSESSIONID)
      .then(res => {
        console.log(res)
        this.setData({
          shopData:res.data.data.rows
        })
      })
  },
  gomenu(e) {
    console.log(e)
    var res = e.currentTarget.dataset.item
    if (res.businessStatus[0].busy && res.businessStatus[1].busy){
      wx.showToast({
        title: '门店外卖忙碌中，请选择其他门店',
        icon: 'none',
        duration: 2000
      })
      return
    }
    if (app.globalData.shopId != res.storeId){
      app.globalData.shopId = res.storeId;
      app.globalData.cityName = res.cityName;
      app.globalData.menuPro = {};
      app.globalData.allpro = { 'menuNum': 0, 'menuPrice': 0 };
      app.globalData.menuProArray = {};
      app.globalData.specialOfferPrice = 0;
      app.globalData.typePro = {};
      app.globalData.meailFee = 0;  
    }
    app.globalData.typeValue = 1;   

    wx.navigateBack({
      delta: 1
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

  }
})