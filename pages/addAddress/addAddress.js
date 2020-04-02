// pages/addAddress/addAddress.js
var app = getApp();
var url = require('../../utils/url.js');
var constant = require('../../utils/constant.js');
var isPhone = require('../../utils/isPhone.js');
var QQMapWX = require('../../map/qqmap-wx-jssdk.js');
var qqmapsdk;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    locationAddress: null,
    addressObj: null,
    isToast: true,
    isViewDisabled: true,
    revisePro: null,
    systheight:0,
    minheight:0,
    appendReceiverAddress:'',
    receiverPhone:'',
    sexname:'',
    receiverName:''

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    qqmapsdk = new QQMapWX({
      key: 'R3EBZ-36FCW-VGJRJ-RPKXD-R6HM6-OGFXQ'
    });
    wx.getSystemInfo({
      success: function (res) {
        console.log(res)
        that.setData({
          systheight: res.screenHeight,
          minheight: res.windowHeight
        })
      },
    })
  },
  submit: function () {
    var that = this;
    // var item = e.detail.value;
    var locationAddress = that.data.locationAddress;
    var addressObj = that.data.addressObj;
    var JSESSIONID = app.globalData.JSESSIONID;
    that.setData({
      isViewDisabled: false
    })

    if (that.data.revisePro.receiverName == '') {
      wx.showToast({
        title: '联系人不能为空',
        icon: 'none',
        duration: 2000
      })
      that.setData({ isViewDisabled: true})
    } else if (that.data.revisePro.receiverPhone == '') {
      wx.showToast({
        title: '手机号不能为空',
        icon: 'none',
        duration: 2000
      })
      that.setData({ isViewDisabled: true })
    } else if (!isPhone.phone(that.data.revisePro.receiverPhone)) {
      wx.showToast({
        title: '手机号格式不对',
        icon: 'none',
        duration: 2000
      })
      that.setData({ isViewDisabled: true })
    } else if (that.data.revisePro.appendReceiverAddress == '') {
      wx.showToast({
        title: '详细地址不能为空',
        icon: 'none',
        duration: 2000
      })
      that.setData({ isViewDisabled: true })
    } 
    // else if (!locationAddress) {
    //   that.setData({
    //     isToast: false,
    //     toastData: '收获地址不能为空',
    //     isViewDisabled: true
    //   })

    //   setTimeout(function () {
    //     that.setData({
    //       isToast: true,

    //     })

    //   }, 2000)
    // } 
    else {
      var URL = ""
      var msg = "添加地址成功！"
      var content = {
        receiverName: that.data.revisePro.receiverName,
        receiverPhone: that.data.revisePro.receiverPhone,
        receiverAddress:that.data.revisePro.receiverAddress,
        appendReceiverAddress: that.data.revisePro.appendReceiverAddress,
        longitude: addressObj.longitude,
        latitude: addressObj.latitude,
        cityId: app.globalData.cityId}
      //   if(item.sex=="男"){
      //     content.sex=1
      //   }else if(item.sex=="女"){

      // } content.sex = 2
console.log(app.globalData.revisePro.aid)
       if(app.globalData.revisePro.aid){
         URL = url.reviseAddress
         content.addressId = app.globalData.revisePro.aid
         msg="更新地址成功！"
       }else{
         URL = url.addAddress
         
       }
      
      wx.request({
        url: url.defaultS,
        data: {
          actionName: URL,
          content: content
         },
        method: 'POST',
        header: JSESSIONID ? { 'Cookie': 'JSESSIONID=' + JSESSIONID } : {},
        success: function (res) {
          console.log(res);

          if (res.data.status == 1) {

            app.globalData.locationAddress = null;
            app.globalData.addressObj = null;
            app.globalData.adressName = '';
            app.globalData.adressPhone = '';
            app.globalData.addressJ = '';
            app.globalData.revisePro = null;
            wx.showToast({
              title: msg,
              icon: 'none',
              duration: 2000
            })
            that.setData({ isViewDisabled: true })
            setTimeout(function () {
              wx.navigateBack({
                delta: 1
              })
            }, 2000)
          } else if (res.data.status == 9) {
            wx.navigateTo({
              url: '../login/login',
            })
          } else if (res.data.status == 11) {
            that.setCacheData(app.globalData.openId, app.globalData.cityName, app.globalData.JSESSIONID);
          } else {
            wx.showToast({
              title: res.data.msg,
              icon: 'none',
              duration: 2000
            })
            that.setData({ isViewDisabled: true })
          }
        }
      })
    }
  },
  btn_location_address(){
    var that = this;
    app.globalData.dingwei = that.data.revisePro 
    wx.navigateTo({
            url: '../map/map',
          })
    //  var pro = {};
    // if (app.globalData.revisePro.receiverAddress){
    //   pro.name = app.globalData.revisePro.receiverAddress;
    //   app.globalData.dingwei = pro;
    //   wx.navigateTo({
    //     url: '../map/map',
    //   })
    
    // }else{
    //   wx.getLocation({
    //     type: 'gcj02',
    //     success: function (res) {
    //       console.log(res)
    //       pro.name =""
    //       pro.longitude = res.longitude;
    //       pro.latitude = res.latitude;
    //       app.globalData.longitude = res.longitude;
    //       app.globalData.latitude = res.latitude;
    //       app.globalData.dingwei = pro
    //       wx.navigateTo({
    //         url: '../map/map',
    //       })
    //     },
    //     fail: function () {
    //       that.setData({
    //         isToast: false,
    //         toastData: "定位失败",
    //         isViewDisabled: true
    //       })

    //       setTimeout(function () {
    //         that.setData({
    //           isToast: true
    //         })
    //       }, 2000)
    //     }
    //   })

    // }
     },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  input_name: function (e) {
    var revisePro = this.data.revisePro;
    revisePro.receiverName = e.detail.value;
    this.setData({
      revisePro: revisePro
    })
  },
  input_phone: function (e) {

    var revisePro = this.data.revisePro;
    revisePro.receiverPhone = e.detail.value;

    this.setData({
      revisePro: revisePro
    })
  },
  input_address: function (e) {

    var revisePro = this.data.revisePro;
    revisePro.appendReceiverAddress = e.detail.value;

    this.setData({
      revisePro: revisePro
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    console.log(app.globalData.revisePro)
    if (app.globalData.revisePro){
      app.globalData.dingwei = app.globalData.revisePro;
    }

    if (that.data.revisePro) {
      console.log(222)
      var data = that.data.revisePro;
      data.receiverAddress = app.globalData.dingwei.receiverAddress;
      console.log(data)
      that.setData({
        revisePro: data
      })
    } else {
      that.setData({
        revisePro: app.globalData.dingwei,
      })
    }
    console.log(that.data.revisePro)
    if (that.data.revisePro){
    qqmapsdk.reverseGeocoder({
      location: { latitude: that.data.revisePro.latitude, longitude: that.data.revisePro.longitude },
      success: function (res) {
        //address 城市
        console.log(res)
        // that.setData({ name: res.result.address_component.city })
        app.globalData.wmCityName = res.result.address_component.city
        app.globalData.wmSName = res.result.address_component.province
        that.setData({

          locationAddress: app.globalData.wmSName + app.globalData.wmCityName + app.globalData.dingwei.receiverAddress,
       
        })
        var content = { name: res.result.address_component.city }
        app.request.postRequest(url.getCityId, content, app.globalData.JSESSIONID)
          .then(res => {
            app.globalData.cityId = res.data.data
            console.log(app.globalData.cityId)
          })
          .catch(res => {


          })
      }
    })
    }
    that.setData({
      
   
      addressObj: app.globalData.dingwei
    })
 
  },
  del:function(){
    var that = this;
    var JSESSIONID = app.globalData.JSESSIONID;

    that.setData({
      isViewDisabled: false
    })
    wx.showModal({
      title: '删除地址',
      content: '确认要删除改地址',
      confirmColor: '#CAA284',
      confirmText: '确认',
      success: function (res) {
        console.log(res);
        if (res.confirm) {
          wx.request({
            url: url.defaultS,
            data: {
              actionName: url.deleteAddress,
              content: {
                addressId: that.data.revisePro.aid
              }

            },
            method: 'POST',
            header: JSESSIONID ? { 'Cookie': 'JSESSIONID=' + JSESSIONID } : {},
            success: function (res) {
              that.setData({
                isViewDisabled: true
              })
              if (res.data.status == 1) {
                console.log('+++++++++++++++++++++++++++++++'); app.globalData.locationAddress = null;
                app.globalData.addressObj = null;
                app.globalData.adressName = '';
                app.globalData.adressPhone = '';
                app.globalData.addressJ = '';
                app.globalData.revisePro = null;


                wx.navigateBack({
                  delta: 1,
                })
              } else if (res.data.status == 9) {
                wx.navigateTo({
                  url: '../login/login',
                })
              } else if (res.data.status == 11) {
                that.setCacheData(app.globalData.openId, app.globalData.cityName, app.globalData.JSESSIONID);
              }
            }
          })

        }
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