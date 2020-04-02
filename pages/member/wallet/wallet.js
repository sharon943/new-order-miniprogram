// pages/member/wallet/wallet.js
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
    balance: 0,
    img:'',
    helpData: [
      { name: '充值记录', route: '../../member/RechargeRecord/RechargeRecord' },
      // { name: '修改交易密码', route: '../../member/changepwd/changepwd' },
      // { name: '重置交易密码', icon: '../../images/help/other.png' },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(app.globalData.memberData)
     this.setData({
       balance: options.balance,
       img: app.globalData.memberData.levelImg
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
  },
  go_page: function (e) {
    console.log(e)
    var item = e.currentTarget.dataset.item
      wx.navigateTo({
        url: item.route+'?type=1',
      })
    

  },
})