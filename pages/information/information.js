// pages/information/information.js

var app = getApp();
var url = require('../../utils/url.js');
var constant = require('../../utils/constant.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {

    orderInfo: null,
    orderMenu: null,
    id: 0,
    orderF: null,
    senderName: '',
    senderMobile: '',
    SenderView: true,
    orderlatitude: '',
    orderlongitude: '',
    iconPath: '',
    busyview: true, color:'',
    // isLoading1: false,

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;


    that.setData({
      id: options.id,
      color: app.globalData.color,
      statusName: options.statusName,
      iconPath: app.globalData.iconPath,
      typeValue: app.globalData.typeValue
    })

    console.log(app.globalData.typeValue)
    that.getOrderInformation(options.id, app.globalData.JSESSIONID);
    // that.getSenderPosition(options.id);    //获取骑手位置

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
    var that = this;

    // if (that.data.id != 0){
    //   that.getOrderInformation(id, app.globalData.JSESSIONID);
    //   that.getMenuInformation(id, app.globalData.JSESSIONID);
    // }
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
  btn_refurbish: function () {
    console.log(11111);
    this.getOrderInformation(this.data.id, app.globalData.JSESSIONID);
    // this.getMenuInformation(this.data.id, app.globalData.JSESSIONID);
  },

  getOrderInformation: function (orderId, JSESSIONID) {
    var that = this;

    wx.request({
      url: url.defaultS,
      data: {
        actionName: url.getOrderInformation,
        content: { orderId: orderId }

      },
      method: 'POST',
      header: JSESSIONID ? { 'Cookie': 'JSESSIONID=' + JSESSIONID } : {},
      success: function (res) {
        console.log(res)
        if (res.data.status == 1) {
          that.getMenuInformation(res);
          // res.data.data.wxaDeliveryTips='提示'
          var item = res.data.data;
          item.orderNo_ = res.data.data.orderNo.substring(res.data.data.orderNo.length - 4)
          var index = item.storeName.indexOf('(')
          item.name1 = item.storeName.substring(index, item.storeName.length);
          item.name1_ = item.storeName.substring(0, index);
          if (item.wxaDeliveryTips && item.sendType == 3 && item.wxaDeliveryTips != '' && item.wxaDeliveryTips != null && item.wxaDeliveryTips != undefined) {
            if (item.wxaDeliveryTips == '很抱歉，门店正繁忙时段，请你根据通知自行取餐') {
              item.wxaDeliveryTips = '请留意提示，到取餐处取餐'
            }
            that.setData({
              busyview: false,
            })
          }
          that.setData({
            orderInfo: item,
            orderlatitude: item.latitude,
            orderlongitude: item.longitude,
            // isLoading1: true,
          })
        }

        for (var i = 0; i < that.data.orderInfo.progress.length; i++) {
          if (that.data.orderInfo.progress[i].status != -1 & that.data.senderMobile != undefined & that.data.senderMobile != null & that.data.senderMobile != '') {
            that.setData({
              SenderView: false,
            })
          }
          console.log(that.data.SenderView)
        }
      }
    })
  },
  getMenuInformation: function (res) {
    var that = this;


    // wx.request({
    //   url: url.getOrderMenuInformation,
    //   data: {
    //     orderId: orderId
    //   },
    //   method: 'POST',
    //   header: JSESSIONID ? { 'Cookie': 'JSESSIONID=' + JSESSIONID } : {},
    //   success: function (res) {
    // if (res.data.status == 1) {
    var item = res.data.data;
    console.log(item)
    var itemF = item.orderPreferentials;
    for (var i = 0; i < itemF.length; i++) {
      if (itemF[i].content){
      var index = itemF[i].content.indexOf('#');
      itemF[i].content = itemF[i].content.substring(index + 1, itemF[i].content.length);
      var index1 = itemF[i].content.indexOf('#');
      if (itemF[i].content.includes('￥') == '' | itemF[i].content.indexOf('￥') == undefined) {
        that.setData({
          subview: true
        })
        itemF[i].sub = itemF[i].content.substring(index1 + 1);
      } else if (itemF[i].content.indexOf('￥') != '' | itemF[i].content.indexOf('￥') != undefined) {
        that.setData({
          subview: true
        })
        var index2 = itemF[i].content.indexOf('￥');
        itemF[i].sub = itemF[i].content.substring(index1 + 1, index2);
        itemF[i].sub = itemF[i].content.substring(index1 + 1, index2);
        if (itemF[i].sub.length > 20) {
          itemF[i].sub = itemF[i].sub.substring(0, 20) + '...'
        }
      }
      itemF[i].content = itemF[i].content.substring(0, index1);
      }
    }
    console.log(itemF);
    that.setData({
      orderMenu: item,
      orderF: itemF
    })
    for (var t = 0; t < item.orderProducts.length; t++) {
      if (item.orderProducts[t].products) {
        this.getGroupNameDetails(item.orderProducts[t].products, t)
      }
    }
    // } else if (res.data.status == 9) {
    //   wx.navigateTo({
    //     url: '../login/login',
    //   })
    // } else if (res.data.status == 11) {
    //   that.setCacheData(app.globalData.openId, app.globalData.cityName, app.globalData.JSESSIONID,1);
    // }
    // console.log(res);



    // }
    // })
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
        that.getOrderInformation(id, app.globalData.JSESSIONID);
        // that.getMenuInformation(id, app.globalData.JSESSIONID);
      }
    })
  },

  btn_go_pay: function () {
    var that = this;
    var JSESSIONID = app.globalData.JSESSIONID;

    wx.request({
      url: url.defaultS,
      data: {
        actionName: url.getPay,
        content: {
          payType: 2,
          orderId: that.data.id,
          // PayMode: 50,
          // openId: app.globalData.openId,
          // useuserWalletEnvelope: 0,
          // useWallet: 
        }

      },

      method: 'POST',
      header: JSESSIONID ? { 'Cookie': 'JSESSIONID=' + JSESSIONID } : {},
      success: function (res) {
        console.log(res);

        if (res.data.status == 1) {
          var item = res.data.data
          wx.requestPayment({
            timeStamp: item.timeStamp,
            nonceStr: item.nonceStr,
            package: item.package,
            signType: item.signType,
            paySign: item.paySign,
            success: function (res) {

              that.getOrderInformation(id, app.globalData.JSESSIONID);
              // that.getMenuInformation(id, app.globalData.JSESSIONID);
            },
            fail: function () {



            }
          })
        }
      }
    })
  },
  getGroupNameDetails(res, i) {
    console.log(res)
    var orderMenu = this.data.orderMenu
    var name = ''
    if (res.length > 0) {
      for (var j = 0; j < res.length; j++) {
        var name_ = ''
        if (res[j].listRequirements) {
          for (var y = 0; y < res[j].listRequirements[0].propertys.length; y++) {
            if (res[j].listRequirements[0].propertys[y].items.length > 0) {
              if (res[j].listRequirements[0].propertys[y].items[0].price > 0) {
                name_ += res[j].listRequirements[0].propertys[y].items[0].name + '¥' + res[j].listRequirements[0].propertys[y].items[0].price + '+'
              } else {
                name_ += res[j].listRequirements[0].propertys[y].items[0].name + '+'
              }

            }
          }
          if (res[j].price > 0) {
            name += res[j].name + '¥' + res[j].price + '*' + res[j].num + '(特殊要求：' + name_.substr(0, name_.length - 1) + ')' + ';' + " \n "
          } else {
            name += res[j].name + '*' + res[j].num + '(特殊要求：' + name_.substr(0, name_.length - 1) + ')' + ';' + " \n "
          }

        } else {
          if (res[j].price > 0) {
            name += res[j].name + '¥' + res[j].price + '*' + res[j].num + ';' + " \n "
          } else {
            name += res[j].name + '*' + res[j].num + ';' + " \n "

          }
        }

      }
    }
    console.log(name)
    console.log(orderMenu)
    orderMenu.orderProducts[i].groupname = name
    this.setData({
      orderMenu: orderMenu
    })
  },
  btn_sender_position: function () {
    var that = this;
    var JSESSIONID = app.globalData.JSESSIONID;
    // var value = e.detail.value
    var orderId = that.data.id
    that.getOrderInformation()
    console.log(app.globalData.shopId)
    console.log(that.data.orderlatitude, that.data.orderlongitude);
    wx.navigateTo({
      url: '../senderPosition/senderPosition?orderId=' + orderId + '&storeId=' + app.globalData.shopId + '&latitude=' + that.data.orderlatitude + '&longitude=' + that.data.orderlongitude,
    })
    console.log(app.globalData.extId)
  },
  getSenderPosition(orderId) {
    var that = this;
    var JSESSIONID = app.globalData.JSESSIONID;
    var orderId = that.data.id
    console.log(orderId)
    wx.request({
      url: url.getSenderPosition,
      data: {
        orderId: orderId
      },
      method: 'POST',
      header: JSESSIONID ? { 'Cookie': 'JSESSIONID=' + JSESSIONID } : {},
      success: function (res) {
        console.log(res);
        that.setData({
          senderName: res.data.data.senderName,
          senderMobile: res.data.data.senderMobile
        });
      }
    })
  },
  btn_go_cancel: function () {
    var that = this;
    var JSESSIONID = app.globalData.JSESSIONID;

    wx.showModal({
      title: '提示',
      content: '是否取消该订单',
      confirmColor: '#CAA284',
      // cancelColor:'#3d231a',
      confirmText: '确认',
      success: function (res) {
        console.log(res);

        if (res.confirm) {

          wx.request({
            url: url.defaultS,
            data: {
              actionName: url.cancelOrder,
              content: { orderId: that.data.id }

            },

            method: 'POST',
            header: JSESSIONID ? { 'Cookie': 'JSESSIONID=' + JSESSIONID } : {},
            success: function (res) {
              console.log(res);
              if (res.data.status == 1) {
                wx.request({
                  url: url.cancelOrderVk + that.data.id,
                  header: {
                    clientId: '32e58123cb58fe0bc7ed15933b4537f4fa0d07',
                    storeId: app.globalData.extId,
                  },
                  success: function (res) {
                    console.log(res);
                  }
                })
                console.log(app.globalData.extId)

                that.getOrderInformation(that.data.id, app.globalData.JSESSIONID);
                // that.getMenuInformation(that.data.id, app.globalData.JSESSIONID);
              }
            }
          })
        }
      }
    })
  },
  btn_go_confirm: function () {
    var that = this;
    var JSESSIONID = app.globalData.JSESSIONID;

    wx.request({
      url: url.default,
      data: {
        actionName: url.confirmOrder,
        content: {
          orderId: that.data.id
        }
      },
      header: JSESSIONID ? { 'Cookie': 'JSESSIONID=' + JSESSIONID } : {},
      success: function (res) {
        console.log(res);
        if (res.data.status == 1) {

          wx.request({
            url: url.confirmOrderVk + that.data.id,
            header: {
              clientId: '32e58123cb58fe0bc7ed15933b4537f4fa0d07',
              storeId: app.globalData.extId,
            },
            success: function (res) {
              console.log(res);
            }
          })
          that.getOrderInformation(that.data.id, app.globalData.JSESSIONID);
          // that.getMenuInformation(that.data.id, app.globalData.JSESSIONID);
        }
      }
    })
  },
  btn_busy: function () {
    this.setData({
      busyview: true
    })
  },
  seetextornot(e) {
    console.log(e)

    var arr = this.data.orderMenu.orderProducts
    var i = e.currentTarget.dataset.i
    if (!e.currentTarget.dataset.info.see) {
      arr[i].see = true
    } else {
      arr[i].see = false

    }
    var obj = this.data.orderMenu
    obj.orderProducts = arr
    this.setData({
      orderMenu: obj
    })
  },
  makeCall(e) {
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.info
    })
  },
})