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
      url: url.memLevel,
      header: header,
      success: function (res) {
        that.setData({
          hiddenLoading: true
        })
        console.log(res.data);

        if (res.data.code == 200) {

          for (var i = 0; i < res.data.data.length; i++) {
            if (i == 0) {
              res.data.data[i].isSel = 1;
              that.setData({
                itemId: res.data.data[i].id,
                itemData: res.data.data[i]
              })
            } else {
              res.data.data[i].isSel = 0;
            }
          }
          
          res.data.data[0].logo = '../../../images/my/level1.png'
          res.data.data[0].logo_ ='../../../images/my/level1_.png'
          console.log(res.data.data)

          res.data.data[1].logo = '../../../images/my/level2.png'
          res.data.data[1].logo_ = '../../../images/my/level2_.png'
          console.log(res.data.data)

          res.data.data[2].logo = '../../../images/my/level3.png'
          res.data.data[2].logo_ = '../../../images/my/level3_.png'
          console.log(res.data.data)

          res.data.data[3].logo = '../../../images/my/level4.png'
          res.data.data[3].logo_ = '../../../images/my/level4_.png'
          console.log(res.data.data)

          if (res.data.data.length>4){
            res.data.data[4].logo = '../../../images/my/level5.png'
            res.data.data[4].logo_ = '../../../images/my/level5_.png'
          }
          console.log(res.data.data)
          that.setData({
            levelData: res.data.data
          })
          console.log(that.data.levelData)
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
  clickItem: function (e) {
    var that = this
    if (e.currentTarget.dataset.item.id == that.data.itemId) {
      return
    }

    var leData = that.data.levelData;

    for (var i = 0; i < leData.length; i++) {
      if (e.currentTarget.dataset.item.id == leData[i].id) {
        leData[i].isSel = 1;

        that.setData({
          itemData: leData[i],
          itemId: e.currentTarget.dataset.item.id
        })


      } else {
        leData[i].isSel = 0;
      }

    }
    console.log(that.data.itemData)
    that.setData({
      levelData: leData
    })
    console.log(that.data.levelData)
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