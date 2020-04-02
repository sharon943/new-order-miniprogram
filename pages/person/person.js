// pages/person/person.js
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
    memberData:{},
    minheight: 0,
    systheight: 0,
    sex: 1,
    Datevalue: '',
    minTime: '',
    maxTime: '',
    date:'',
    isBirthday:false,
    ischange:0,
    name:"",
    phnoe:'',changeindex:0,
    ischangeName:false,
    ischangeSex:false,
    ischangeDate:false,
    hiddenLoading: true
    

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var that = this;
      if(app.globalData.isVka==0){
        that.getUserInfoData()
      }else{
      that.getMemberInformation(app.globalData.phone)
      }
   

    wx.getSystemInfo({
      success: function (res) {
        console.log(res)
        that.setData({
          systheight: res.screenHeight,
          minheight: res.windowHeight,
          maxTime: that.Format()
        })
        console.log(that.data.maxTime)
      },
    })
  },
  Format(){
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    if (month < 10) {
      month = "0" + month;
    }
    if (day < 10) {
      day = "0" + day;
    }
    var nowDate = year + "-" + month + "-" + day;
    return nowDate;
  },
  getUserInfoData: function () {
    var that = this;
    var JSESSIONID = app.globalData.JSESSIONID;
    wx.request({
      url: url.defaultS,
      data: {
        actionName: url.getUserInformation,
      },
      method: 'POST',
      header: JSESSIONID ? { 'Cookie': 'JSESSIONID=' + JSESSIONID } : {},
      success: function (res) {
        console.log(res.data)
        if (res.data.status == 1) {
          if (res.data.data.sex == 1) {
            that.setData({
              items: [
                { name: '0', value: '男', checked: 'true' },
                { name: '1', value: '女' },
              ]
            })
          } else {
            that.setData({
              items: [
                { name: '0', value: '男' },
                { name: '1', value: '女', checked: 'true' },
              ]
            })
          }
          app.globalData.phone = res.data.data.phone;
          that.setData({
            memberData: res.data.data,
            Datevalue: res.data.data.birthday,
            name: res.data.data.nacompellationme,
            sex: res.data.data.sex
          })
         
          if (res.data.data.birthday){
            that.setData({
              isBirthday:true
            })
          }
          that.setData({
            isLogin: 1
          })
        } else {
          that.setData({
            isLogin: -1
          })
        }
      }
    })
  },
  btn_sex: function (e) {
    console.log(e)
    var that = this;
  
    var value = e.detail.value;
    that.setData({
      ischange: 1,
      sex: parseInt(value),
      ischangeSex:true
    })
    console.log(value)
    var JSESSIONID = app.globalData.JSESSIONID;
    console.log(e);
  },
  

  bindDateChange: function (e) {
    var that = this;
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      ischange: 1,
      Datevalue: e.detail.value,
      ischangeDate:true
    })

    if(!that.data.Datevalue){
      return
    }
    var JSESSIONID = app.globalData.JSESSIONID;

  },
  input_name: function (e) {
    console.log(e)
    var that = this;
    var JSESSIONID = app.globalData.JSESSIONID;
    this.setData({
      ischange: 1,
      name: e.detail.value,
      ischangeName:true
    })
    console.log(that.data.ischange)
  },
  submit:function(){
    var that =this;
    var phone = app.globalData.phone
    var data={};
    var JSESSIONID = app.globalData.JSESSIONID;
    if(that.data.ischange==1){//是否有更改
      if (app.globalData.isVka==0){
        if (that.data.ischangeName) {
         that.changenName()
        } 
        if(that.data.ischangeDate){
          that.changedDate()
        }
        if(that.data.ischangeSex){
          that.changeSex()
        }
      }else{
        console.log(that.data.name)
        if(that.data.name==''){
          wx.showToast({
            title: '请填写姓名',
            icon: 'none',
            duration: 2000
          })
          return
        }
        if (!that.data.Datevalue) {
          wx.showToast({
            title: '请选择生日',
            icon: 'none',
            duration: 2000
          })
          return
        }
        var that = this;
        var str = '';
        var dict = {
          brandId: constant.brandId, storeCode: app.globalData.storeCode, clientId: constant.clientId, mobile: phone, timestamp: Date.parse(new Date()) + app.globalData.CurrentTimeMilli, birthday: that.data.Datevalue, cardId: app.globalData.cardId, headUrl: app.globalData.vkaInfon.headUrl, name: that.data.name, openId: app.globalData.openId, sex: parseInt(that.data.sex)
        }
        var exceptStr = except.except(dict)
        console.log(exceptStr)
        var dd = {
          brandId: constant.brandId, storeCode: app.globalData.storeCode, clientId: constant.clientId, timestamp: Date.parse(new Date()) + app.globalData.CurrentTimeMilli
        }
        var header = except.removeEmpty(dd);
        header.sign = md5.hexMD5(exceptStr)
        that.setData({
          hiddenLoading:false
        })
        wx.request({
          url: url.updateInfoVK,
          method: 'post',
          data: {
            name:that.data.name,
            cardId: app.globalData.cardId,
            headUrl: app.globalData.vkaInfon.headUrl,
            openId:app.globalData.openId,
            mobile:app.globalData.phone,
            sex: parseInt(that.data.sex) ,
            birthday:that.data.Datevalue
          },
          header: header,
          success: function (res) {
            console.log('++++++++++++++');
            console.log(res);
            that.setData({
              hiddenLoading: true
            })
            if(res.data.code==200){
              wx.showToast({
                title: '更新成功',
                icon: 'none',
                duration: 2000
              })
              wx.navigateBack({
                delta: 1
              })
              that.setData({
                hiddenModal: true,
                ischangeName: false
              })
              app.globalData.vkaInfon = res.data.data[0]
              app.globalData.cardId = res.data.data[0].id
              res.data.data[0].phone = res.data.data[0].otherMobile;
              res.data.data[0].compellation = res.data.data[0].name;

              if (res.data.data[0].sex == 0) {

                that.setData({
                  items: [
                    { name: '0', value: '男', checked: 'true' },
                    { name: '1', value: '女' },
                  ]
                })
              } else {
                that.setData({
                  items: [
                    { name: '0', value: '男' },
                    { name: '1', value: '女', checked: 'true' },
                  ]
                })
              }
              app.globalData.phone = res.data.data[0].otherMobile;
              that.setData({
                memberData: res.data.data[0],
                Datevalue: res.data.data[0].birthday,
                name: res.data.data[0].name,
                sex: res.data.data[0].sex ? res.data.data[0].sex:0,
              })

              if (res.data.data[0].birthday) {
                that.setData({
                  isBirthday: true
                })
              }
            }else{
              wx.showToast({
                title: res.data.message,
                icon: 'none',
                duration: 2000
              })
              that.setData({
                hiddenModal: true,
                ischangeName: false
              })
            }
       
          }
        })
      }
    
    }

  },
  changenName:function(){
    var that = this;
    var JSESSIONID = app.globalData.JSESSIONID;
    var data = {
      actionName: url.name,
      content: { compellation: that.data.name }
    }
    wx.request({
      url: url.defaultS,
      data: data,
      method: 'POST',
      header: JSESSIONID ? { 'Cookie': 'JSESSIONID=' + JSESSIONID } : {},
      success: function (res) {
        if (res.data.status == 1) {
          that.getUserInfoData(JSESSIONID);
          wx.showToast({
            title: '更新姓名成功',
            icon: 'none',
            duration: 2000
          })
          that.setData({
            hiddenModal: true,
            ischangeName:false
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
  },
  changeSex:function(){
    var that = this;
    var JSESSIONID = app.globalData.JSESSIONID;
    var data = {
      actionName: url.setSex,
      content: { sex: parseInt(that.data.sex) + 1 }
    }
    wx.request({
      url: url.defaultS,
      data: data,
      method: 'POST',
      header: JSESSIONID ? { 'Cookie': 'JSESSIONID=' + JSESSIONID } : {},
      success: function (res) {
        if (res.data.status == 1) {
          that.getUserInfoData(JSESSIONID);
          wx.showToast({
            title: '更新性别成功',
            icon: 'none',
            duration: 2000
          })
          that.setData({
            hiddenModal: true,
            ischangeSex:false
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
  },
  changedDate:function(){
    var that = this;
    var JSESSIONID = app.globalData.JSESSIONID;
    var data = {
      actionName: url.birtnday,
      content: { birthday: that.data.Datevalue }
    }
    wx.request({
      url: url.defaultS,
      data: data,
      method: 'POST',
      header: JSESSIONID ? { 'Cookie': 'JSESSIONID=' + JSESSIONID } : {},
      success: function (res) {
        if (res.data.status == 1) {
          that.getUserInfoData(JSESSIONID);
          wx.showToast({
            title: '更新生日成功',
            icon: 'none',
            duration: 2000
          })
          that.setData({
            hiddenModal: true,
            ischangeName:false
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
  },

  //vk获取会员信息

  getMemberInformation: function (phone) {
    var that = this;
    console.log(phone);
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
          app.globalData.vkaInfon = res.data.data[0]
          app.globalData.cardId = res.data.data[0].id
          res.data.data[0].phone = res.data.data[0].otherMobile;
          res.data.data[0].compellation = res.data.data[0].name;
          
          if (res.data.data[0].sex == 0) {
            
            that.setData({
              items: [
                { name: '0', value: '男', checked: 'true' },
                { name: '1', value: '女' },
              ]
            })
          } else {
            that.setData({
              items: [
                { name: '0', value: '男' },
                { name: '1', value: '女', checked: 'true' },
              ]
            })
          }
          app.globalData.phone = res.data.data[0].otherMobile;
          that.setData({
            memberData: res.data.data[0],
            Datevalue: res.data.data[0].birthday,
            name: res.data.data[0].name,
            sex: res.data.data[0].sex ? res.data.data[0].sex:1
          })
          if (res.data.data[0].birthday) {
            console.log(111)
            that.setData({
              isBirthday: true
            })
          }
          that.setData({
            isLogin: 1
          })
        }
        console.log(that.data.isBirthday)
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