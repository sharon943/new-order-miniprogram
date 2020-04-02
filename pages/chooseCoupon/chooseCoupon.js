// pages/mycoupons/mycoupons.js
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
    moimg: "../../images/morentubiao.png",
    nousseData: [],
    chaPro: {},
    useData: [],
    isNotAddress_: true,
    type: [{ name: "可使用", isSel: 1, idFlag: 'bleft', typeNum: 0 },  { name: "不可使用", isSel: 0, idFlag: 'bright', typeNum: 2 }],
    idFlag: 'bleft', date: '',
    typeName: '未使用',
    transId: '',
    isToast: true,
    toastData: '',
    detail_view: false,
    coupon_info_view: false,
    couponPro: [],
    isShow: 0,
    hiddenLoading: true,
    vouchName: "",
    vouvhNumber: "",
    vouchRemark: "",
    vouchimg: "",
    systheight: 0,
    isShare: 0,
    minheight: 0,
    typeNum: 0,
    bgArr: [
      "../../imgs/Coupon_01.png", "../../imgs/Coupon_02.png", "../../imgs/Coupon_03.png", "../../imgs/Coupon_04.png", "../../imgs/Coupon_05.png", "../../imgs/Coupon_06.png"]
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(app.globalData.couponPro)
    // app.globalData.couponPro=[
    //   {
    //     beginTime: "2020-03-02 00:00:00",
    //     canUse: 1,
    //     couponType: 3,
    //     eTime: "2020-03-08",
    //     endTime: "2020-03-08 23:59:59",
    //     gifts: "0",
    //     id: 299808296,
    //     moneyRestriction: 0,
    //     name: "【2月关怀】饮品买三赠一券",
    //     reportType: 2,
    //     state: 1,
    //     templateId: 7440,
    //     url: "https://merchants.oss-cn-hangzhou.aliyuncs.com/ticket/700400749b2c52f12a4c3370471572d2.jpg",
    //     useType: 0
    //   },
    //   {
    //     beginTime: "2020-03-02 00:00:00",
    //     canUse: 1,
    //     couponType: 3,
    //     eTime: "2020-03-08",
    //     endTime: "2020-03-08 23:59:59",
    //     gifts: "0",
    //     id: 299808297,
    //     moneyRestriction: 0,
    //     name: "【2月关怀】饮品买三赠一券",
    //     reportType: 2,
    //     state: 1,
    //     templateId: 7440,
    //     url: "https://merchants.oss-cn-hangzhou.aliyuncs.com/ticket/700400749b2c52f12a4c3370471572d2.jpg",
    //     useType: 0,
    //   }
    // ]
    var that = this
    that.getcoupons('bleft')
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          systheight: res.screenHeight,
          minheight: res.screenHeight - 50
        })
      },
    })
  },
  go_code: function () {
    wx.navigateTo({
      url: '../codeCoupons/codeCoupons',
    })
  },
  choice: function (e) {
    console.log(e)
    // typeName
    var that = this;
    var titledata = that.data.type
    if (e.currentTarget.dataset.item.name != that.data.typeName) {
      for (var i = 0; i < that.data.type.length; i++) {
        if (that.data.type[i].name == e.currentTarget.dataset.item.name) {
          that.setData({
            typeName: that.data.type[i].name,
            idFlag: that.data.type[i].idFlag,
            typeNum: that.data.type[i].typeNum

          })

          titledata[i].isSel = 1
        } else {
          titledata[i].isSel = 0
        }
      }
      if (that.data.idFlag == "bleft") {
        that.setData({
          minheight: that.data.systheight - 50,
        })
      } else {
        minheight: that.data.systheight
      }
      that.setData({
        type: titledata
      })
      that.getcoupons(e.currentTarget.dataset.item.idFlag)
      console.log(that.data.type)
    }
  },
  cha: function (e) {
    console.log(e)
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
  onShareAppMessage: function (res) {
    return {
      title: constant.title, // 分享标题
      desc: constant.desc, // 分享描述
      path: constant.sharePath // 分享路径
    }
  },
  check_detail: function (e) {
    var that = this;
    this.setData({
      isNotAddress_: false
    })
    var data = e.currentTarget.dataset.item;
    console.log(e)
    that.setData({
      chaPro: data
    })
  },
  getcoupons: function (type) {
    var that = this
  
    if (app.globalData.isVka == 0) {
            if (res) {
              var arr1 = [];
              var arr2 = [];
              if (that.data.typeNum == 2) {
                var arr = res.outOfTimeCoupons;
                for (var i = 0; i < res.outOfTimeCoupons.length; i++) {
                  arr[i].coupon.bTime = arr[i].coupon.startTime.substring(0, 10)
                  arr[i].coupon.eTime = arr[i].coupon.endTime.substring(0, 10)
                }
                that.setData({
                  couponPro: arr
                })
              } else {
                for (var i = 0; i < res.length; i++) {
                  res[i].coupon.bTime = res[i].coupon.startTime.substring(0, 10)
                  res[i].coupon.eTime = res[i].coupon.endTime.substring(0, 10)
                  if (res[i].isUsed) {
                    arr1.push(res[i])

                  } else {
                    arr2.push(res[i])
                  }
                }
                if (that.data.typeNum == 0) {
                  that.setData({
                    couponPro: arr2
                  })
                } else {
                  that.setData({
                    couponPro: arr1
                  })
                }
              }

              if (that.data.couponPro.length < 1) {
                that.setData({
                  isShow: 1
                })
              } else {
                that.setData({
                  isShow: 0
                })
              }
            }
    } else {  
      var res = app.globalData.couponPro
      console.log(res)
      var canuseCoupons = []
      var canNotuseCoupons=[]
      for (var i = 0; i < res.length; i++) {
              res[i].bTime = res[i].beginTime.substring(0, 10)
              res[i].eTime = res[i].endTime.substring(0, 10)
              
              res[i].couponIndex=i+1
              if (res[i].canUse==1){
                canuseCoupons.push(res[i])
              }else{
                canNotuseCoupons.push(res[i])
              }
        if (app.globalData.coupon){
          if (res[i].id == app.globalData.coupon.id){
            res[i].isSelect = 1
          }
        }else{
          res[i].isSelect = 2
        }
      }
      switch(type){
           case 'bleft': that.setData({ couponPro: canuseCoupons }); break;
           case 'bright': that.setData({ couponPro: canNotuseCoupons});break;
      }
    }

  },
  useCouponClick(e){
    var res = e.currentTarget.dataset.item
    var index = e.currentTarget.dataset.index
    var couponPro = this.data.couponPro
    if (this.data.idFlag !='bleft'){
      return
    }else{
      console.log(res)
      for (var i = 0; i < couponPro.length;i++){
        if(i==index){
          switch (res.isSelect) {
            case 1: couponPro[index].isSelect = 2; app.globalData.coupon = null; break;
            case 2: couponPro[index].isSelect = 1; app.globalData.coupon = res; break;
          }
        }else{
          couponPro[i].isSelect = 2
        }
      }
      this.setData({
        couponPro: couponPro
      })
      
    }
    
  },
  confirmCoupon(){
        wx.navigateBack({
          delta: 1
        })
  },
  clear: function () {
    var that = this;
    that.setData({
      isNotAddress_: true
    })
  },
  myCatchTouch() {
    console.log('stop user scroll it!');
    return;
  }
})