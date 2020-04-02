// pages/shops/shops.js
var app = getApp();
var url = require('../../utils/url.js');
var QQMapWX = require('../../map/qqmap-wx-jssdk.js');
var constant = require('../../utils/constant.js');
var qqmapsdk;
var call;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isshow:0,
    cityName:'',
    minheight:0,
    systheight: 0,
    shopPro:"",
    nearlatitude:0,
    nearlongitude:0,
    latitude:0 ,
    longitude: 0,
    markers: [],
    shopData:[],
    keywords:'',
    issou:1,
    isToast:true,
    address:'',
    nowcity:'',
    nowdis:'',
    k: 1,h:1,
    loading2: true, deadline: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          systheight: res.screenHeight,
          minheight: res.screenHeight - 50,
          latitude: app.globalData.latitude,
          longitude: app.globalData.longitude
        })
      },
    })
    that.getCityAddress(app.globalData.openId, app.globalData.latitude, app.globalData.longitude)
  },
  
  getCityAddress: function (openId, latitude, longitude) {
    var that = this;
    qqmapsdk.reverseGeocoder({
      location: {
        latitude: latitude,
        longitude: longitude
      },
      success: function (data) {
        console.log(data);
        var add = data.result.address
        that.setData({
          nowcity: data.result.address_component.city,
          nowdis:data.result.address_component.district,
        })
        // that.getshops(app.globalData.JSESSIONID, latitude, longitude, that.data.address)
      }
    });
  },
  
//获取附近门店
  getshops(JSESSIONID, latitude, longitude, address,val) {
    var that = this
    var k
    var k
    var item
    console.log(val)
    if (val) {
      k = val
      item = that.data.shopData
    } else {
      k = 1
      item = []
    }
    var content = { coordinate: [longitude.toString(), latitude.toString()], businessType: [app.globalData.typeValue], pageNow: k, pageSize: 5 }
    app.request.postRequest(url.nearshops, content, JSESSIONID)
      .then(res => {
        console.log(res)
        if (res.data.status == 1) {
          if (val >= res.data.data.pages) {
            that.setData({
              deadline: true,
              loading2: true,
            })
            return
          }
          if (res.data.data.rows.length>0) {
            var arr=[];
            for (var i = 0; i < res.data.data.rows.length;i++){
              var data = res.data.data.rows[i];
              data.iconPath = "../../images/map/shop.png"
              data.longitude = data.coordinate[0];
              data.latitude = data.coordinate[1];
              var callout = {
                content: data.storeName,
                color: "#333333",
                fontSize: 11,
                display: "ALWAYS",
                padding: 6,
                borderRadius: 3,
                borderColor: "#ffc345",
                borderWidth: 1,
                bgColor:"#ffc345",
                height:25,
                margin:0

              }
              data.callout = callout
              arr.push(data)
              var distance = that.getDisance(that.data.latitude, that.data.longitude, data.coordinate[1], data.coordinate[0]);
              res.data.data.rows[i].distance = distance;
              item.push(res.data.data.rows[i]);
            }

            that.setData({
              loading2: true,
              shopPro: res.data.data.rows[0] ,
              shopData: item,
              nearlongitude: res.data.data.rows[0].coordinate[0],
              nearlatitude: res.data.data.rows[0].coordinate[1],
              markers:arr
            })
            app.globalData.choiceCityName = that.data.shopPro.cityName;
            app.globalData.cityName = that.data.shopPro.cityName;
            app.globalData.choiceCityId = that.data.shopPro.cityId;
            app.globalData.choiceXianName = that.data.shopPro.districtName;
            app.globalData.choiceXianId = that.data.shopPro.districtId;
            if (app.globalData.choiceCityId) {
              if (app.globalData.choiceCityId == "") {
                that.setData({
                  cityName: app.globalData.choiceCityName
                })
              } else {
                that.setData({
                  cityName: app.globalData.choiceCityName + " " + app.globalData.choiceXianName
                })
              }
            }
            console.log(that.data.shopData)
            // that.GetData(app.globalData.JSESSIONID, that, res.data.data.rows[0].storeId)
          } else {
            if (val) {
              that.setData({
                deadline: true,
                loading2: true,
              })
            }
            var arr = [];
            var data = {};
            data.iconPath = "../../images/map/shop.png"
            data.longitude = longitude;
            data.latitude = latitude;
            arr.push(data)
            that.setData({
              nearlongitude: longitude,
              nearlatitude: latitude,
              markers: arr
            })
          }

        }

      })
  },
  gomenu(e){
    console.log(e)
    var res = e.currentTarget.dataset.item
    for (var i = 0; i < res.businessStatus.length; i++) {
      if (res.businessStatus[i].businessId == 2) {
        if (res.businessStatus[i].busy) {
          wx.showToast({
            title: '门店自取忙碌中，请选择其他门店',
            icon: 'none',
            duration: 2000
          })
          return
        }
      }

    }
    if (app.globalData.shopId != res.storeId) {
      app.globalData.shopId = res.storeId;
      app.globalData.cityName = res.cityName;
      app.globalData.menuPro = {};
      app.globalData.allpro = { 'menuNum': 0, 'menuPrice': 0 };
      app.globalData.menuProArray = {};
      app.globalData.specialOfferPrice = 0;
      app.globalData.typePro = {};
      app.globalData.meailFee = 0;  
    }
    app.globalData.typeValue = 2;
    app.globalData.getlocationDeny = true
    wx.reLaunch({
      url: '../menu/menu',
    })
  },
  //计算距离
  getDisance: function (lat1, lng1, lat2, lng2) {
    var that = this;
    var dis = 0;
    var radLat1 = that.toRad(lat1);
    var radLat2 = that.toRad(lat2);
    var deltaLat = radLat1 - radLat2;
    var deltaLng = that.toRad(lng1) - that.toRad(lng2);
    var distance;
    var dis = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(deltaLat / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(deltaLng / 2), 2)));
  
    var distance = Math.ceil(dis * 6378137)/1000;

    return distance;
  }, 
  toRad: function (d) {
    return d * Math.PI / 180;
  },
  go_map: function (e) {
    console.log(e)
    if (e.currentTarget.dataset.item.longitude && e.currentTarget.dataset.item.latitude) {
      // success
      wx.openLocation({
        latitude: e.currentTarget.dataset.item.latitude, // 纬度，范围为-90~90，负数表示南纬
        longitude: e.currentTarget.dataset.item.longitude, // 经度，范围为-180~180，负数表示西经
        scale: 15, // 缩放比例
        name: e.currentTarget.dataset.item.storeName,
        address: e.currentTarget.dataset.item.storeAddress
      })

      // wx.navigateTo({
      // url: '../map/map?longitude=' + e.currentTarget.dataset.item.longitude + '&latitude=' + e.currentTarget.dataset.item.latitude + '&storepro=' + JSON.stringify(e.currentTarget.dataset.item),
      // })
    }

  },
  call: function (e) {
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.item.phoneNumberList[0],
    })
  },
  go_city(){
    wx.navigateTo({
      url: '../city/city',
    })
  },

  //获取门店列表
  getshopsBycity(val) {
    var that = this
    var content = {};
    var cid="";
    if(app.globalData.choiceCityId){
      cid = app.globalData.choiceCityId
    }else{
      cid = app.globalData.cityId
    }
    var k
    var item
    console.log(val)
    if (val) {
      k = val
      item = that.data.shopData
    } else {
      k = 1
      item = []
    }
    if (app.globalData.longitude){
      if (app.globalData.choiceXianId) {
        content = { coordinate: [app.globalData.longitude, app.globalData.latitude], districtId: app.globalData.choiceXianId, cityId: cid, businessType: [2], pageNow: k, pageSize: 5 }
      } else {
        content = { coordinate: [app.globalData.longitude, app.globalData.latitude], cityId: cid, businessType: [2], pageNow: k, pageSize: 5 }
      } 
    }else{
      if (app.globalData.choiceXianId) {
        content = {  districtId: app.globalData.choiceXianId, cityId: cid, businessType: [2], pageNow: k, pageSize: 5 }
      } else {
        content = {  cityId: cid, businessType: [2], pageNow: k, pageSize: 5 }
      } 
    }
    
    app.request.postRequest(url.getStoreList, content,app.globalData.JSESSIONID)
      .then(res => {
        console.log(res)
        if (res.data.status == 1) {
          console.log(val)
          if (val > res.data.data.pages){
            that.setData({
              deadline: true,
              loading2: true,
            })
            return
          }
          if (res.data.data.rows.length > 0) {
            var arr = [];
            for (var i = 0; i < res.data.data.rows.length; i++) {
              var data = res.data.data.rows[i];
              data.iconPath = "../../images/map/shop.png"
              data.longitude = data.coordinate[0];
              data.latitude = data.coordinate[1];
              var callout = {
                content: data.storeName,
                color: "#535353",
                fontSize: 12,
                display: "ALWAYS",
                padding: 5,
                borderRadius: 8,
                borderColor: "#f2f2f2",
                borderWidth: 1
              }
              data.callout = callout
              arr.push(data)
              var distance = that.getDisance(that.data.latitude, that.data.longitude, data.coordinate[1], data.coordinate[0]);
              res.data.data.rows[i].distance = distance;
              item.push(res.data.data.rows[i]);
            }

            that.setData({
              loading2:true,
              shopPro: res.data.data.rows[0],
              shopData: item,
              nearlongitude: res.data.data.rows[0].coordinate[0],
              nearlatitude: res.data.data.rows[0].coordinate[1],
              markers: arr,
              keywords:"",
              isshow: 1
            })

            console.log(that.data.shopData)
            // that.GetData(app.globalData.JSESSIONID, that, res.data.data.rows[0].storeId)
          } else {
            console.log(val)
            if(val){
              that.setData({
                deadline:true,
                loading2: true,
              })
            }else{
              wx.showToast({
                title: '无匹配门店',
                icon: 'none',
                duration: 2000
              })
              that.setData({
                shopPro: []
              })
            }
            
            var arr = [];
            var data = {};
            data.iconPath = "../../images/map/shop.png"
            data.longitude = that.data.longitude;
            data.latitude = that.data.latitude;
            arr.push(data)
            that.setData({
              nearlongitude: longitude,
              nearlatitude: latitude,
              markers: arr
            })
          }

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

  var that = this;
    that.setData({
      k: 1, h: 1,
    })
    if (app.globalData.choiceCityId==""){
      that.setData({
        cityName: app.globalData.choiceCityName
      })
    }else{
      that.setData({
        cityName: app.globalData.choiceCityName + " " + app.globalData.choiceXianName
      })
    }
    
      if (app.globalData.cityId || app.globalData.choiceCityId) {
        that.getshopsBycity()
      }
    
      
  
  },
  btn_address_input: function (e) {
    console.log(e);
    var that = this;
    var name = e.detail.value;
   

    that.setData({
      keywords: name
    })

    // that.getSearchData(name, region);
  },
  searchBtn:function(){
    
    var that = this;
    console.log(that.data.keywords)
    that.getshopsBycity()
  },
  changeSou:function(){
    var that = this;
    if(that.data.issou==1){
      that.setData({
        issou: 2
      })
    }else{
      that.setData({
        issou: 1
      })
    }

    
  },
  buyCarClearCancel:function(){
    wx.navigateBack({
      delta: 1
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
    if (app.globalData.JSESSIONID && this.data.shopData.length > 0) {
      if (app.globalData.cityId || app.globalData.choiceCityId){
        var k = this.data.k
        k++
        this.setData({
          k: k,
          loading2: false,
        })
        console.log(k)
        this.getshopsBycity(k)
      }else{
        var h = this.data.h
        h++
        this.setData({
          h: h,
          loading2: false,
        })
        console.log(h)
        this.getshops(app.globalData.JSESSIONID, this.data.latitude, this.data.longitude, this.data.address,h)
      }
      
    }

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