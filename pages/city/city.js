// pages/city/city.js
var app = getApp();
var url = require('../../utils/url.js');
var constant = require('../../utils/constant.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shiName:"",
    shiID:"",
    quID:"",
    quName:"",
    citydata:[],
    isCity:1,
    xianData:[],
    choiceCityName:"",
    choiceCityId:'',
    listProvince:[],
    listcity:[],
    provincename: '', cityname: '', disname:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.getCityList()
  },

  getCityList:function(){
    var that = this
    var content = { sortType: 0 }
    app.request.postRequest(url.OpenCityList, content,         app.globalData.JSESSIONID)
      .then(res => {
        console.log(res)
        var listProvince = []
        if (res.data.status == 1) {
          
          for (var i = 0; i < res.data.data.length;i++){
            res.data.data[i].isCity = 2;
            var obj={}
            // for (var j in listProvince){
              // console.log(j)
              // if (res.data.data[i].provinceId == listProvince[j].provinceId){
              //   console.log(j)

              // }else{
              //   console.log(j)

                obj.provinceId = res.data.data[i].provinceId
                obj.provinceName = res.data.data[i].provinceName
                listProvince.push(obj)
              
              // }
            }
          // }
          listProvince = that.filterByName(listProvince,'provinceId')
          console.log(listProvince)
          that.setData({
            citydata: res.data.data,
            listProvince: listProvince
          })
        }

      })
  },
  go_city(e){

  },
filterByName(data, Name) {   //data是json对象，Name是根据什么字段去重
    var dest = [];
    for(var i = 0; i<data.length; i++) {
      var ai = data[i];
      if (i == 0) {
        dest.push(ai);
      } else {
        var filterData = dest.filter(function (e) {
          return e[Name] == ai[Name];
        })
        if (filterData.length == 0) {
          dest.push(ai);
        }
      }
    }
    return dest;
},
  getXianList: function (cityid) {
    var that = this
   
    var content = { cityId: cityid }
    app.request.postRequest(url.listDistrict, content, app.globalData.JSESSIONID)
      .then(res => {
        console.log(res)
        if (res.data.status == 1) {
          var data = {
            name: "全部地区", districtId: ""
          }
          res.data.data.unshift(data)
          that.setData({
            xianData: res.data.data,
            isCity:3
          })

        }

      })
  },
  go_back:function(e){
    var that = this;
    console.log(e)
      that.setData({
        disname: e.currentTarget.dataset.item.name
      })
     
      var content={}; 
    if (that.data.quID){
      content = { districtId: that.data.quID, cityId: that.data.shiID, businessType: [2], pageNow: 0, pageSize: 10000 }
    }else{
      content = {  cityId: that.data.shiID, businessType: [2], pageNow: 0, pageSize: 10000 }
    }
      app.request.postRequest(url.getStoreList, content, app.globalData.JSESSIONID)
        .then(res => {
          console.log(res)
          if(res.data.status==1){
            if (res.data.data.rows.length < 1){ wx.showToast({ title: '附近无门店', icon: 'none', duration: 2000 });}else{
              app.globalData.hasShops=true
                 app.globalData.choiceCityName = that.data.shiName;
                 app.globalData.choiceCityId = that.data.shiID;
              app.globalData.choiceXianName = e.currentTarget.dataset.item.name;
              app.globalData.choiceXianId = e.currentTarget.dataset.item.districtId;
              wx.navigateTo({
                url: '../shops/shops',
              })
            }
          }else{
            wx.showToast({ title: res.data.msg, icon: 'none', duration: 2000 })
          }
        })
    
   
   
  },
  choice(){
    this.setData({
      isCity: 2
    })
  },
  choiceprovince(){
    this.setData({
      isCity: 1
    })
  },
  choiceCity(e){
    console.log(e)
    var provinceId = e.currentTarget.dataset.item.provinceId
    var citydata = this.data.citydata
    var listcity=[]
    for (var i = 0; i < citydata.length;i++){
      if (citydata[i].provinceId == provinceId) listcity.push(citydata[i])
    }
    console.log(listcity)
    this.setData({
      provincename: e.currentTarget.dataset.item.provinceName,
      listcity: listcity,
      isCity:2
    })
  },
  choiceDis(e){
    console.log(e)
    // app.globalData.choiceCityName = e.currentTarget.dataset.item.cityName;
    // app.globalData.choiceCityId = e.currentTarget.dataset.item.cityId;

    this.setData({ 
      cityname: e.currentTarget.dataset.item.cityName,
      shiName: e.currentTarget.dataset.item.cityName,
      shiID: e.currentTarget.dataset.item.cityId
      })
    this.getXianList(e.currentTarget.dataset.item.cityId)
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