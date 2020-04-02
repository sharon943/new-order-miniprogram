// pages/huiyuanma/huiyuanma.js
var app = getApp();
var url = require('../../utils/url.js');
var QQMapWX = require('../../map/qqmap-wx-jssdk.js');
var constant = require('../../utils/constant.js');
var except = require('../../utils/except.js');
var md5 = require('../../utils/md5.js');

import { toBarcode, toQrcode } from '../../utils/index.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    taocan_detail_view: false,
    canInterval: true, //判断能不能轮询
    code: '', // 转换成条形码、二维码的数字
    codeStr: '',
    time: 120,         //初始时间
    interval: "",    //定时器
    hiddenLoading: true,
    isToast: true,
    toastData: '',
    mycards: [],
    defaultcard: {},
    isshow: true,
    systWidth: 0,
    systHeight: 0,
    isIphoneX: false,
    isIphone5: false,
    showVcards: false,
    acId: '',
    cardHei: 0, OScreenBright: null,
  },

  changeScreenLight: function () {
    var that = this;
    wx.getScreenBrightness({
      success: function (res) {
        console.log(res)
        app.globalData.OScreenBright = res.value
      }
    })
    wx.setScreenBrightness({
      value: 0.85,
      success(res){
        console.log(res)
      },
      fail(res){
        console.log(res)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    console.log(options.id)
    if (options.id) {
      that.setData({
        acId: options.id
      })
      // that.setdefault(that.data.acId)
    }
    // that.getmycard()


  },
	/**
			* 开始倒计时
		 */
  startTap: function () {
    var that = this;
    that.init(that);          //这步很重要，没有这步，重复点击会出现多个定时器
    var time = that.data.time;
    // console.log("倒计时开始")
    that.getCode()
    var interval = setInterval(function () {
      time--;
      that.setData({
        time: time
      })
      if (time == 0) {           //归0时回到60
        that.restartTap();
      }
    }, 1000)

    that.setData({
      interval: interval
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */

	/**
		* 暂停倒计时
	 */
  stopTap: function () {
    var that = this;
    // console.log("倒计时暂停")
    that.clearTimeInterval(that)
  },

	/**
		* 重新倒计时
	 */
  restartTap: function () {
    var that = this;
    that.init(that);
    // console.log("倒计时重新开始")
    that.startTap()
  },

	/**
		* 初始化数据
	 */
  init: function (that) {
    var time = 120;
    var interval = ""
    that.clearTimeInterval(that)
    that.setData({
      time: time,
      interval: interval,
    })
  },

	/**
		* 清除interval
	 * @param that
	 */
  clearTimeInterval: function (that) {
    var interval = that.data.interval;
    clearInterval(interval)
  },

	/**
		* 生命周期函数--监听页面卸载
		* 退出本页面时停止计时器
	 */
  onUnload: function () {
    var that = this;
    that.clearTimeInterval(that)
  },

  onReady: function () {
var that = this;

    wx.getSystemInfo({
      success: function (res) {
        console.log(res)
        if (res.model == 'iPhone X') {
          that.setData({
            isIphoneX: true
          })
        }
        that.setData({
          systWidth: res.screenWidth,
          systHeight: res.screenHeight
        })
        if (res.screenHeight >= 812) {
          that.setData({
            isIphoneX: true
          })
        }
        if (that.data.systHeight <= 568) {
          that.setData({
            isIphone5: true
          })
        }
        if (that.data.systHeight <= 568) {
          that.setData({
            cardHei: 20
          })
        } else if (res.screenHeight > 568 && res.screenHeight <= 667) {
          that.setData({
            cardHei: 50
          })
        } else if (res.screenHeight > 667 && res.screenHeight <= 736) {
          console.log(222)
          that.setData({
            cardHei: 80
          })
        } else if (res.screenHeight > 736 && res.screenHeight <= 812) {
          that.setData({
            cardHei: 130
          })
        } else if (res.screenHeight > 812) {
          that.setData({
            cardHei: 150
          })
        }
        console.log(that.data.systHeight)
      },
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    that.startTap()
    that.changeScreenLight()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    var that = this;
    that.clearTimeInterval(that)
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
  getCode: function () {
    var that = this
    var str = '';
    var dict = {
      brandId: constant.brandId, storeCode: app.globalData.storeCode, clientId: constant.clientId, timestamp: Date.parse(new Date()) + app.globalData.CurrentTimeMilli, cardNo: app.globalData.vkaInfon.cardNo
    }
    var exceptStr = except.except(dict)
    console.log(exceptStr)
    var header = except.removeEmpty(dict);
    header.sign = md5.hexMD5(exceptStr)
console.log(header)
    wx.request({
      url: url.getHuiyuanma + app.globalData.vkaInfon.cardNo,
      method: 'GET',
      header,
      success: function (res) {
        console.log(res);
        setTimeout(function () {
          that.setData({
            hiddenLoading: true
          })
        }, 1000)
        if (res.data.code == 200) {
          var code = res.data.data.code
          setTimeout(function () {
            toBarcode('barcode', code, 320, 100);
            toQrcode('qrcode', code, 220, 220);
          }, 400)
          const codeStr = `${code.slice(0, 4)}****${code.slice(16, 20)}`;
          that.setData({
            code: code,
            codeStr: code
          })
          that.getStatus(code);
        }

      },
      fail: function (error) {
        wx.showToast({
          title: constant.warm,
          icon: 'none',
          duration: 2000
        })
        that.setData({
          isViewDisabled: true,
          hiddenLoading: true })
      }
    })
  },
  refreshbutton() {
    this.getCode()
  },
  getStatus: function () {

  },
  getmycard() {
    var that = this
    that.setData({
      hiddenLoading: false
    })
    wx.request({
      url: url.findGiftCard,
      method: 'GET',
      header: {
        cardId: app.globalData.cardId,
        token: app.globalData.token,
      },
      success: function (res) {
        that.setData({
          hiddenLoading: true
        })
        console.log(res.data);
        // var cardArr=res.data.data;
        var selCard = {}
        if (res.data.code == 200) {
          // var sel={}
          for (var i = 0; i < res.data.data.length; i++) {
            if (res.data.data[i].cardNo != null && res.data.data[i].cardNo != "null" && res.data.data[i].cardNo != "") {
              console.log(123)
              var no = res.data.data[i].cardNo.substring(res.data.data[i].cardNo.length - 3)
              res.data.data[i].title = res.data.data[i].name + "(" + no + ")"
            } else {
              console.log(456)
              res.data.data[i].title = res.data.data[i].name
            }

          }
          if (that.data.acId) {
            for (var i = 0; i < res.data.data.length; i++) {

              if (res.data.data[i].id == that.data.acId) {
                selCard = res.data.data[i]
              }

            }
          } else {
            selCard = res.data.data[0]
          }
          console.log(res.data.data)
          that.setData({
            mycards: res.data.data,
            defaultcard: selCard
          })
          if (that.data.defaultcard) {
            that.setData({
              showVcards: true
            })
          }
        } else {
          wx.showToast({
            title: res.data.message,
            icon: 'none',
            duration: 2000
          })
          that.setData({
            isViewDisabled: true,
          })
        }
      },

    })
  },
  setdefault(id) {
    var that = this
    that.setData({
      hiddenLoading: false
    })
    wx.request({
      url: url.setDefaultCard,
      method: 'POST',
      header: {
        cardId: app.globalData.cardId,
        token: app.globalData.token,
      },
      data: {
        giftCardId: id,
        payBound: 1,
      },
      success: function (res) {
        that.setData({
          hiddenLoading: true
        })
        console.log(res.data);
        if (res.data.code == 200) {

        } else {
          wx.showToast({
            title: res.data.message,
            icon: 'none',
            duration: 2000
          })
          that.setData({
            isViewDisabled: true,
          })
        }
      },

    })
  },
  showcards() {
    var that = this
    var isshow = that.data.isshow
    var taocan_detail_view = that.data.taocan_detail_view
    // console.log(!isshow)
    that.setData({
      isshow: !isshow,
      taocan_detail_view: !taocan_detail_view
    })
    console.log(that.data.isshow)
  },
  changedefault(e) {
    console.log(e)
    var that = this
    that.setData({
      defaultcard: e.currentTarget.dataset.item,
      isshow: true
    })
    // that.setdefault(that.data.defaultcard.id)
  },
  cha() {
    var that = this
    that.setData({
      isshow: true
    })
  },
})