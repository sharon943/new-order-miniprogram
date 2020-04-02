// pages/reCharge/reCharge.js
var app = getApp();
var url = require('../../utils/url.js');
var QQMapWX = require('../../map/qqmap-wx-jssdk.js');
var constant = require('../../utils/constant.js');
var except = require('../../utils/except.js');
var md5 = require('../../utils/md5.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    levelName:'',
    balance:0,
    bgUrl: "", taocanList:[],
    amount:0,
    taocanId:'',
    give:'',
    isToast: true,
    toastData: '',
    hiddenLoading:true,
    memberData:{},
    sysHeight:'',
    isIpx:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   var that = this;
    console.log(app.globalData.sy)
    that.setData({
      sysHeight: app.globalData.sy,
      isIpx: app.globalData.isIpx
    })
   that.detail()
    that.getList()
  },
  detail: function () {
    var that = this;
    var phone = app.globalData.phone;
    var str = '';
    var dict = {
      brandId: constant.brandId, storeCode: app.globalData.storeCode, clientId: constant.clientId, mobile: phone, timestamp: Date.parse(new Date()) + app.globalData.CurrentTimeMilli
    }
    var exceptStr = except.except(dict)
    console.log(exceptStr)
    var header = except.removeEmpty(dict);
    header.sign = md5.hexMD5(exceptStr)

    wx.request({
      url: url.getMemberInformation + phone,
      data: {
      },
      header: header,
      success: function (res) {
        console.log('++++++++++++++');
        console.log(res);
        if (res.data.code == 200) {
          app.globalData.Discount = res.data.data[0].discount
          app.globalData.cardId = res.data.data[0].id
          app.globalData.vkaInfon = res.data.data[0],
            app.globalData.vkaInfon = res.data.data[0]
    
          that.setData({
            memberData: res.data.data[0]
          })
        }
      }
    })  },
  //获取套餐

  getList:function(){
    var that = this;
    var phone = app.globalData.phone;
    console.log(phone);
    var str = '';
    var dict = {
      brandId: constant.brandId, storeCode: app.globalData.storeCode, clientId: constant.clientId, timestamp: Date.parse(new Date()) + app.globalData.CurrentTimeMilli
    }
    var exceptStr = except.except(dict)
    console.log(exceptStr)
    var header = except.removeEmpty(dict);
    header.sign = md5.hexMD5(exceptStr)
 
    wx.request({
      url: url.getRecharge,
      method: 'Get',
      header:header,
      success: function (res) {
        console.log(res);
        that.setData({
          hiddenLoading: true
        })

        if (res.data.code == 200) {
          for(var i = 0; i<res.data.data.length; i++){
            if(i == 0){
              res.data.data[i].isSel=1;
              that.setData({
                amount: res.data.data[i].amount,
                taocanId: res.data.data[i].id,
                give: '内含' + (res.data.data[i].amount ? '¥' + res.data.data[i].amount + '元储值金' : '') + (res.data.data[i].give ? '，额外赠送'+res.data.data[i].give + "元" : "") + (res.data.data[i].ticketNames ? ','+res.data.data[i].ticketNames : "") + (res.data.data[i].point ? ','+res.data.data[i].point + '灵气值' : "")
              })
            }else{
              res.data.data[i].isSel = 0;
            }
          }
          that.setData({
            taocanList: res.data.data,
           
          })
          console.log(that.data.taocanList)
         
          console.log()
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
        that.setData({
          hiddenLoading: true
        })
      }
    })
  },
  changeTaoCan:function(e){
    console.log(e)
    var that = this
    var item = e.currentTarget.dataset.item
    that.setData({
      taocanId: item.id,
      give: '内含' + (item.amount ? '¥' + item.amount + '元储值金' : '') + (item.give ? '，额外赠送' + item.give + "元" : "") + (item.ticketNames ? "," + item.ticketNames : "") + (item.point ? ","+item.point + "灵气值" : ""),
      amount:item.amount
    })

    for (var i = 0; i < that.data.taocanList.length;i++){
      if (that.data.taocanId == that.data.taocanList[i].id){
        that.data.taocanList[i].isSel = 1;
      }else{
        that.data.taocanList[i].isSel = 0;
      }
    }
    that.setData({
      taocanList: that.data.taocanList
    })
    console.log(that.data.taocanList)
  },
  btn_submit(){
    var that=this
    if (app.globalData.template2.length > 0) {
      wx.requestSubscribeMessage({
        tmplIds: app.globalData.template2,
        complete(res) {
          that.submit()
        },
      })
    } else {
      that.submit()
    }
  },
  submit:function(){
    var that = this;
          var pages = getCurrentPages() //获取加载的页面
          var currentPage = pages[pages.length - 1] //获取当前页面的对象

          var Curl = currentPage.route //当前页面url
          var str = '';
          var dict = {
            brandId: constant.brandId, storeCode: app.globalData.storeCode, clientId: constant.clientId, timestamp: Date.parse(new Date()) + app.globalData.CurrentTimeMilli, openId: app.globalData.openId, cardId: app.globalData.vkaInfon.id, amount: that.data.amount * 100, body: '会员充值', amountConfigId: that.data.taocanId, curUrl: Curl
          }
          var exceptStr = except.except(dict)
          console.log(exceptStr)
          var dd = {
            brandId: constant.brandId, storeCode: app.globalData.storeCode, clientId: constant.clientId, timestamp: Date.parse(new Date()) + app.globalData.CurrentTimeMilli
          }
          var header = except.removeEmpty(dd);
          header.sign = md5.hexMD5(exceptStr)
          wx.request({
            url: url.gorecharge,
            method: 'POST',
            data: {
              // parentId: constant.brandId,
              openId: app.globalData.openId,
              cardId: app.globalData.vkaInfon.id,
              amountConfigId: that.data.taocanId,
              amount: that.data.amount * 100,
              body: '会员充值',
              curUrl: Curl
            },
            header: header,
            success: function (res) {
              console.log(res)
              that.setData({
                hiddenLoading: true
              })
              var payData = res.data.payData;
              var signData = res.data.payData;
              console.log(res.data)
              if (res.data.code == 200) {
                wx.requestPayment({
                  timeStamp: payData.timeStamp,
                  nonceStr: payData.nonceStr,
                  package: payData.prepay_id,
                  signType: payData.signType,
                  paySign: payData.paySign,
                  success: function (res) {
                    console.log(res)
                    if (res.errMsg == 'requestPayment:ok') {
                      wx.showToast({
                        title: '充值成功',
                        icon: 'none',
                        duration: 2000
                      })
                      that.detail()
                    }
                    wx: wx.navigateTo({
                      url: '../record/record'
                    })
                  },
                  fail:function(res){
                    console.log(res)
                  }
                })
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
              that.setData({
                hiddenLoading: true
              })

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