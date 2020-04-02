// pages/member/RechargeRecord/RechargeRecord.js
var url = require('../../../utils/url.js');
var constant = require('../../../utils/constant.js');
var except = require('../../../utils/except.js');
var md5 = require('../../../utils/md5.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    recordData:[],
    isShow: 1,

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    var type
    if(options.type=='1'){
      type=1
      wx.setNavigationBarTitle({ title: '充值记录' })
      this.getData(type)
    }else{
      type=2
      wx.setNavigationBarTitle({ title: '消费记录' })
      this.getData(type)
    }
    this.setData({
      isShow:type
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
  getData: function (type) {
    var that = this
    console.log(app.globalData.cardId)
    that.setData({
      hiddenLoading: false
    })
    var str = '';
    var dict = {
      brandId: constant.brandId, cardNo: app.globalData.vkaInfon.cardNo, type: type, storeCode: app.globalData.storeCode, clientId: constant.clientId, timestamp: Date.parse(new Date()) + app.globalData.CurrentTimeMilli
    }
    var exceptStr = except.except(dict)
    var header = except.removeEmpty(dict);
    header.sign = md5.hexMD5(exceptStr)
    wx.request({
      url: url.recordData,
      method: 'post',
      header: header,
      data: {
        cardNo: app.globalData.vkaInfon.cardNo,
        type: type
      },
      success: function (res) {
        that.setData({
          hiddenLoading: true
        })
        console.log(res.data);
        if (res.data.code == 200) {
          if (res.data.data.length>0){
            for (var i = 0; i < res.data.data.length; i++) {
              var date = new Date(res.data.data[i].created);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
              var Y = date.getFullYear() + '-';
              var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
              var D = date.getDate() + ' ';
              var h = date.getHours() + ':';
              var m = date.getMinutes() + ':';
              var s = date.getSeconds();

              var dateArr = res.data.data[i].created.split(" ")
              res.data.data[i].created_ = dateArr[0];//时间
            }
          }
          that.setData({
            recordData: res.data.data
          })
          
        } else if (res.data.code == 1022) {
      
        } else {
          wx.showToast({
            title: res.data.message,
            icon: 'none',
            duration: 2000
          })
        }
      },
      fail: function (error) {
        wx.showToast({
          title: constant.warm,
          icon: 'none',
          duration: 2000
        })
      }
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
  }
})