// pages/levelPreferential/levelPreferential.js
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
    nodes: 'nikankanni',
    levelData: [],
    itemId: '',
    itemData: {},
    hiddenLoading: true,
    isToast: true,
    toastData: ''

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.getLevel();
  },
  /*获取会员等级*/
  getLevel: function () {
    var that = this
    console.log(app.globalData.cardId)
    that.setData({
      hiddenLoading: false
    })
    var timestamp = Date.parse(new Date());
    var str = '';
    var dict = {
      brandId: constant.brandId, storeCode: app.globalData.storeCode, clientId: constant.clientId, timestamp: Date.parse(new Date()) + app.globalData.CurrentTimeMilli
    }
    var exceptStr = except.except(dict)
    var header = except.removeEmpty(dict);
    header.sign = md5.hexMD5(exceptStr)
    wx.request({
      url: url.getUserAgreement,
      header: header,
      success: function (res) {
        that.setData({
          hiddenLoading: true
        })
        console.log(res.data);
      
 
        if (res.data.code == 200) {
          that.setData({
            Agreement: res.data.data
          })
        } else {

          that.setData({
            toastData: res.data.message,
            isToast: false,
            isViewDisabled: true,
          })

          setTimeout(function () {
            that.setData({
              isToast: true
            })
          }, 2000)
        }
      },
      fail: function (error) {
        that.setData({
          toastData: constant.warm,
          isToast: false,
          isViewDisabled: true,
          hiddenLoading: true
        })

        setTimeout(function () {
          that.setData({
            isToast: true
          })
        }, 2000)

      }
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
    return {
      title: constant.title, // 分享标题
      desc: constant.desc, // 分享描述
      path: constant.sharePath // 分享路径
    }
  }

})