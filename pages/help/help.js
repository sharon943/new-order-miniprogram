// pages/help/help.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      helpData:[
        { name: '会员等级', icon: '../../images/help/class.png', route:'../member/levelPreferential/levelPreferential' },
        { name: '会员权益', icon: '../../images/help/equities.png', route: '../member/equits/equits' },
        { name: '其他', icon: '../../images/help/other.png', route:'../member/getUserAgreement/getUserAgreement'},
      ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  go_page: function (e) {
    console.log(e)
    var item = e.currentTarget.dataset.item
      wx.navigateTo({
        url: e.currentTarget.dataset.item.route,
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