// pages/member/equits/equits.js
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
    equits: [],
    exp:[],
    logoArr:[
      '../../../images/my/exp-1.png' ,
    '../../../images/my/exp-2.png' ,
     '../../../images/my/exp-3.png' ,
     '../../../images/my/exp-4.png' ,
      '../../../images/my/exp-5.png',
    ],
    sh:0,
    memberData:{},
    upperExperience:'',
    percent_:0,
    levelNum:'',
    isIpx:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      sh: app.globalData.sy,
      memberData: app.globalData.memberData,
      upperExperience: options.upperExperience,
      levelNum: options.levelNum,
      isIpx:app.globalData.isIpx
    })
    this.getLeve();
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
  getLeve: function () {
    var that = this;
    var timestamp = Date.parse(new Date());
    var str = '';
    var dict = {
      brandId: constant.brandId, storeCode: app.globalData.storeCode, clientId: constant.clientId, timestamp: Date.parse(new Date()) + app.globalData.CurrentTimeMilli
    }
    var exceptStr = except.except(dict)
    var header = except.removeEmpty(dict);
    header.sign = md5.hexMD5(exceptStr)
    wx.request({
      url: url.level,
      data: {
      },
      header: header,
      success: function (res) {
        console.log('++++++++++++++');
        console.log(res);
        if (res.data.code == 200) {
          var exparr = [];
          for (var i = 0; i < res.data.data.length; i++) {
             var dic = res.data.data[i];
            // [
            //   { level: 'LV.1', name: '耀石', logo: '../../../images/my/exp-1.png' },
            //   { level: 'LV.2', name: '璞玉', logo: '../../../images/my/exp-2.png' },
            //   { level: 'LV.3', name: '翡翠', logo: '../../../images/my/exp-3.png' },
            //   { level: 'LV.4', name: '莲华', logo: '../../../images/my/exp-4.png' },
            //   { level: 'LV.5', name: '同辉', logo: '../../../images/my/exp-5.png' },
            // ],
            var num = i+1;
            dic.level ="LV."+num;
            dic.name = dic.levelName;
            dic.logo=that.data.logoArr[i];

            if(i<=4){
              exparr.push(dic)
            }

            if (that.data.memberData.levelName == res.data.data[i].levelName) {
              if (i == res.data.total - 1) {
                that.setData({
                  nextLevelName: "",
                  upperExperience: res.data.data[i].upperLimit,
                  percent_: (that.data.memberData.experience / res.data.data[i].upperLimit) * 100
                })
              } else {
                that.setData({
                  nextLevelName: res.data.data[i + 1].levelName,
                  upperExperience: res.data.data[i + 1].lowerLimit,
                  percent_: (that.data.memberData.experience / res.data.data[i + 1].lowerLimit) * 100
                })
              }
              var privilege = res.data.data[i].privilege
              var arr=[]
              if (privilege){
                arr = privilege.split(';');
                arr = arr.slice(0, arr.length - 1)
                for (var j = 0; j < arr.length; j++) {
                  arr[j] = arr[j].split(',')
                }
              }
              
             that.setData({
               background: res.data.data[i].background,
               levelNum:i+1,
               equits: arr
             })
            }
          }
          that.setData({
            exp: exparr
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