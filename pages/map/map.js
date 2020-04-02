 // pages/map/map.js
var app = getApp();
var url = require('../../utils/url.js');
var QQMapWX = require('../../map/qqmap-wx-jssdk.js');
var constant = require('../../utils/constant.js');
var qqmapsdk;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    locationAddress:'',
    isToast: true,
    name:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;

    // wx.setNavigationBarTitle({
    //   title: '定位地址',
    // })

    console.log(app.globalData.JSESSIONID);

    qqmapsdk = new QQMapWX({
      key: 'R3EBZ-36FCW-VGJRJ-RPKXD-R6HM6-OGFXQ'
    });
    // var locationAddress = app.globalData.pro.name;

    // this.getSearchData(locationAddress);
    wx.chooseLocation({
      success: function (res) {
        console.log(res)   
        var pro = app.globalData.dingwei;
        pro.receiverAddress= res.name;
        // console.log(app.globalData.revisePro)
        // var address = res.address
        pro.latitude = res.latitude
        pro.longitude = res.longitude
        app.globalData.dingwei = pro
        if (app.globalData.revisePro){
          app.globalData.revisePro = pro
        }
        wx:wx.navigateBack({
          delta: 1,
        })
      },
      complete(r) {
        console.log(r)
        if (r.errMsg =="chooseLocation:fail cancel"){
          wx: wx.navigateBack({
            delta: 1,
          })
        }
        console.log(222)
      }
    })

  },
  btn_search: function () {
    var locationAddress = this.data.locationAddress;

    this.getSearchData(locationAddress);
  },
  getSearchData: function (name) {
    var that = this;

    qqmapsdk.getSuggestion({
      keyword: name,
      policy: 1,
      success: function (res) {
        console.log(res);

        if (res.message == 'query ok') {
          that.setData({
            addressPro: res.data,
          })
        }
      },
      fail: function (res) {
        console.log(res);
      },
      complete: function (res) {
        console.log(res);
      }
    });
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