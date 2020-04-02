// pages/menu/menu.js
var app = getApp();
var url = require('../../utils/url.js');
var QQMapWX = require('../../map/qqmap-wx-jssdk.js');
var constant = require('../../utils/constant.js');
var except = require('../../utils/except.js');
var md5 = require('../../utils/md5.js');

var qqmapsdk;
var call;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    storeCode:"",
    ak: "j4ezbhizC8r7BgjbrfxORHMuFltUU5Xy", //填写申请到的ak  
    color:"rgb(253,193,72)",
    isNotAddress_: true, modes: ['自取', '外卖'], activeindex: 0,
    systWidth: 0,
    dataPro: {},
    shopPro: {},
    address: '',
    latitude: 0,
    longitude: 0,
    openId: null,
    isAddress: 0,
    addressStorage: null,
    isAddressOne: true,
    isLocation: false,
    actictyText: '',
    loadingIMG: '',
    loadingView: true,
    storeId: '',
    deskId: '',
    activeId: '',
    isToast: true,
    isIpx: false,
    Discounttype: 0,
    menuDataPro: [],
    discountMenu: [],
    // activityProMenu:[],
    typeId: 'a1',
    goodsIndex: 0,
    isSub: true,
    isNature: true,
    naturePro: [],
    naturePro_: {},
    menuName: '',
    menuId: '',
    menuIddd: '',
    menuPrice: 0,
    isHiddenScreenStatus: true,
    menuPro: {},
    typePro: {},
    isFalse: false,
    isTrue: true,
    menuNature: {},
    menuProArray: {},
    naturePrice: 0,
    allMenu: { 'menuNum': 0, 'menuPrice': 0 },
    isHiddenModal: true,
    buyCarListMaxHeight: 0, 
    isShopCarCommodity: true,
    hiddenBuyCarStatus: true,
    animationData: '',
    isLoading: true,
    menuType: 1,
    sw: 0,sy:0,
    isGoodsModal: true,
    isGoodsInformation: true,
    name: '',
    desc: '',
    imageInformation: '',
    isHiddenImageStatus: true,
    oIndex: 0,
    tIndex: 0,
    sIndex: 0,
    typeValue: 2,
    timeValue: null,
    text: '',
    marqueePace: 1,//滚动速度
    marqueeDistance: 30,//初始滚动距离
    marqueeDistance2: 0,
    marquee2copy_status: false,
    marquee2_margin: 60,
    size: 14,
    orientation: 'left',//滚动方向
    interval: 20, // 时间间隔
    shopId: null,
    menuId: null,
    extId: null,
    noticePro: null,
    typeNum: 1,
    index: 0,
    typeNamePro: null,
    name: 'name',
    appointTimes: null,
    takeSelfTimes: null,
    jump: null,
    latitude: null,
    longitude: null,
    specialOfferPrice: 0,
    costPrice: '',
    isBusiness: true,
    deliveryNum: 1,
    actictyText: '',
    productActicty: {},
    mealFeeMoney: 0,
    natureMealFee: 0,
    appinTimePro: [],
    isLoading1: false,
    isLoading2: false,
    isLoading3: false,
    latitude: 0,
    longitude: 0,
    isLogin: 0,
    typeName: '',
    typePro_: [],
    nameHH: '', priceHH: 0, numHH: 0, itemHH:{},
    iconPath: '',
    fastloginView: true,
    phone: '',
    timeData: '60s',
    isCode: false,//验证码按钮是否可点击
    timeInt: 60,
    shopdataId: '',
    phonedata: '',
    shopname: '',
    groupData: {},
    isGroup: true,
    groupProA: [],
    groupProB: [],
    groupProC: [],
    groupProD: [],
    groupProBF: [],
    groupProCF: [],
    groupProDF: [],
    mainFoodAreas: [],
    groupProBview: false,
    groupProCview: false,
    groupProDview: false,
    groupProBviewF: false,
    groupProCviewF: false,
    groupProDviewF: false,
    groupPrice: 0,
    groupPrice_: 0,
    _groupc: [],
    _groupcF: [],
    _groupD: [],
    _groupDF: [],
    Groupid: '',isVkamember:false,
    grouppppro: {}, groupisSoldOut: false,
    k: 0, groupnum: 1, choicesnature: {}, naturenum: 1, groupnatureid: '', mainview: false, curlistview: [], categorys: [], distance: '', hasnoShops: true, display: 0, display1: 0, shopDetailView: true, label: [], categoryHeight: [], isBusy: true,
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    // wx.showLoading({ title: '加载中…' })
    app.globalData.isAddressOne = false
    qqmapsdk = new QQMapWX({
      key: 'R3EBZ-36FCW-VGJRJ-RPKXD-R6HM6-OGFXQ'
    });
    that.setData({
      isVkamember: app.globalData.isVka==1?true:false,
      address: options.address,
      jump: options.jump,
      latitude: options.latitude,
      longitude: options.longitude,
      deskId: options.deskId,
      shopname: options.shopname,
      color: app.globalData.color,
      storeCode: options.storeCode
    })
    app.globalData.storeCode = options.storeCode;
    wx.getSystemInfo({
      success: function (res) {
        console.log(res)
        var model = res.model.substring(0, res.model.indexOf("X")) + 'X';
        var model1 = res.system.substring(0, 3);
        console.log(model1)
        if (model == 'iPhone X') app.globalData.isIpx = true
        if (model1 == 'iOS') app.globalData.isIos = true
        that.setData({
          buyCarListMaxHeight: (res.windowHeight * 0.6 - 37) + "px",
          sw: res.windowWidth,
          isIpx: app.globalData.isIpx,
          sy: res.screenHeight,
        
        })
      }
    })
    that.getOpenIdData();
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
    var that=this
    that.setData({
      isLoading2: false,
    })
    // wx.showLoading({ title: '加载中…' })
    if (JSON.stringify(app.globalData.menuPro)=='{}'){
      console.log(111)
      app.globalData.meailFee=0
    }
    that.setData({
      isBusy: true,
      shopId:app.globalData.shopId,
      menuPro: app.globalData.menuPro,
      allMenu: app.globalData.allpro,
      menuProArray: app.globalData.menuProArray,
      specialOfferPrice: app.globalData.specialOfferPrice,
      typePro: app.globalData.typePro,
      mealFeeMoney: app.globalData.meailFee,
      typeValue: app.globalData.typeValue, 
      activeindex: app.globalData.typeValue==1?1:0,
    })
    if (app.globalData.openId){
      if (app.globalData.shopId){  //选择门店后来到菜单页
        that.getShopData2(app.globalData.JSESSIONID, app.globalData.shopId, app.globalData.latitude, app.globalData.longitude,'nromal'); 
      }else{
        
        if (app.globalData.sendAddress) {   //外卖模式下，选择地址后就近匹配的门店
          that.setData({
            addressObj: app.globalData.sendAddress,
            address: app.globalData.sendAddress.address
          })
          var businessType
          if (app.globalData.typeValue == 1) {
            businessType = [1, 4]
          } else {
            businessType = [2]
          }
          that.getShopData(app.globalData.JSESSIONID, app.globalData.sendAddress.latitude, app.globalData.sendAddress.longitude, businessType);
        }else{
          that.getLocationData()
        }
      }
    }
    
  },
 
  getShopData2(JSESSIONID, shopId, latitude, longitude,type){
    var content = {
      storeId: shopId,
      businessType: [app.globalData.typeValue]
    }
    app.request.postRequest(url.getShopPosition, content, JSESSIONID)
      .then(res => {
        if (res.data.status == 1) {
          if (type == 'takeself') {
            if (res.data.data.businessType.indexOf(2) == -1) {
              wx.hideToast()
              wx.showModal({
                title: '提示',
                content: '该门店没有开通自取业务，请选择继续点外卖或重新选择自取门店',
                showCancel: true,
                confirmColor: '#283897',
                confirmText: '重新选择',
                CancelText: '继续点外卖',
                success: function (res) {
                  if (res.confirm) {
                    wx.navigateTo({
                      url: '../shops/shops',
                    })
                  }
                }
              })
              this.setData({
                activeindex: 1
              })
              return
            } else {
              app.globalData.typeValue = 2;
              this.setData({ typeValue: 2 })
            }
          } 

          this.give_data(res.data.data, latitude, longitude)
        } else if (res.data.status == 2){
          this.getDefaultMenu(JSESSIONID);
         
        } else {
          this.setData({
            shopPro: {}
          })
        }
      })
  },
  give_data(res, latitude, longitude){
    var that=this
    var typeValue = app.globalData.typeValue
    var distance
    var distance1 = that.getdistance(res.coordinate[1], res.coordinate[0], latitude, longitude)
    if (distance1 >= 1000) {
      distance = (distance1 / 1000).toFixed(1) + "km"
    } else {
      distance = distance1.toFixed() + "m"
    }
    that.setData({
      distance: '距您' + distance,
      shopPro: res,
      shopId: res.storeId,
      isLoading1:true,
    })
    app.globalData.shopLat = res.coordinate[1];
    app.globalData.shopLng = res.coordinate[0];
    app.globalData.shopId = res.storeId;
    app.globalData.extId = res.extraStoreId;//第三方id
    app.globalData.shopAddress = res.storeAddress
    app.globalData.shopName = res.storeName
    app.globalData.invoiceType = res.invoiceType;
    if (res.invoiceType.length > 0) {
      app.globalData.isInvoice = true; //是否开发票  不明确
    } else {
      app.globalData.isInvoice = false; //是否开发票  不明确
    }
    that.GetmenuData(app.globalData.JSESSIONID, that, res.storeId, typeValue)
    if (typeValue == 2 && res.businessStatus[1].busy) {
       that.setData({
         isBusy:false,
       })
      wx.showModal({
        title: '制作繁忙',
        content: '目前门店单量过多，因此我们不得不限制该门店小程序，非常抱歉，敬请谅解',
        confirmText: '切换门店',
        confirmColor: '#CAA284',
        success(res) {
          if (res.confirm) {
            wx.navigateTo({
              url: '../shops/shops',
            })
          } else if (res.cancel) {

          }
        }
      })
    } 
     if (typeValue == 1 && res.businessStatus[0].busy ){
      that.setData({
        isBusy: false,
      })
      if ( !res.businessStatus[3].busy){
        wx.showModal({
          title: '制作繁忙',
          content: '目前门店单量过多，因此我们不得不限制该门店小程序只可预约自取，非常抱歉，敬请谅解',
          cancelText: '继续下单',
          confirmText: '切换门店',
          confirmColor: '#CAA284',
          success(res) {
            if (res.confirm) {
              wx.navigateTo({
                url: '../Nearshops/Nearshops',
              })
            } else if (res.cancel) {

            }
          }
        })
      } else if (res.businessStatus[3].busy){
        wx.showModal({
          title: '制作繁忙',
          content: '目前门店单量过多，因此我们不得不限制该门店小程序，非常抱歉，敬请谅解',
          confirmText: '切换门店',
          confirmColor: '#CAA284',
          success(res) {
            if (res.confirm) {
              wx.navigateTo({
                url: '../Nearshops/Nearshops',
              })
            } else if (res.cancel) {

            }
          }
        })
      }
    }
  },
  openMap: function (e) {
    var that = this
    wx.getSetting({
      success(res) {
        console.log('res', res)
        //这里判断是否有地位权限
          wx.showModal({
            title: '地理位置未授权',
            content: '如需使用茶理宜世点餐，请开启您手机中的定位授权和GPS，开启后重新打开小程序',
            success: function (res) {
              if (res.confirm == false) {
                  wx.navigateTo({
                    url: '../city/city',
                  })
                return false;
              }
              wx.openSetting({
                success(res) {
                 
                }
              })
            }
          })
      }

    })
  },
  getOpenIdData: function () {
    var openId;
    var that=this
    console.log(111)
    if (app.globalData.openId) {
      openId = app.globalData.openId;
      that.setData({
        openId: app.globalData.openId
      })
      that.getLocationData(openId);
    } else {
      app.openIdReadyCallback = res => {
        openId = res
        // app.globalData.openId=res
        that.setData({
          openId: res
        })
        that.getLocationData(openId);
      }
    }
    
  },
  getLocationData: function (openId) {
    var that = this;
   
    wx.getLocation({
      type: 'gcj02',
      success: function (res) {
        console.log(res)
      
        app.globalData.longitude = res.longitude;
        app.globalData.latitude = res.latitude;
        that.setData({
          latitude: res.latitude,
          longitude: res.longitude,
          addressStorage: null
        })
        that.getCityAddress(openId, res.latitude, res.longitude)
        
      },
      fail: function (res) {
        console.log('gcj02', res)
        console.log('gcj02', app.globalData.getlocationDeny)
        if (!app.globalData.getlocationDeny){
          that.openMap()
         
        }else{
          that.setCacheData(app.globalData.openId, app.globalData.cityName, app.globalData.JSESSIONID, app.globalData.latitude, app.globalData.longitude, 'key');
        }
        that.setData({
          isLoading2: true,
          isLoading1: true,
          isAddress: 1,
          isLocation: true
        })
      }
    })
  },
  //计算经纬度距离
  getdistance: function (lat1, lng1, lat2, lng2) {
    var that = this
    var radLat1 = that.toRad(lat1);
    var radLat2 = that.toRad(lat2);
    var a = radLat1 - radLat2;
    var b = that.toRad(lng1) - that.toRad(lng2);
    var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
    s = s * 6378.137 * 1000;
    // EARTH_RADIUS;
    s = Math.round(s * 10000) / 10000;
    return s
  },
  toRad: function (d) {
    return d * Math.PI / 180;
  },
  getShopData(JSESSIONID, latitude, longitude, businessType){
    var that=this
    var distance
    var content = {
      coordinate: [longitude, latitude], searchName: this.data.address, businessType: businessType }
    app.request.postRequest(url.getStoreId, content, JSESSIONID)
      .then(res => {
        if (res.data.status == 1) {
          that.give_data(res.data.data, latitude, longitude)
        } else if (res.data.status == 2) {
          this.getDefaultMenu(JSESSIONID);
          wx.showModal({
            title: '提示',
            content: '没有找到附近店，跳转至门店列表？',
            showCancel: true,
            confirmColor: '#CAA284',
            confirmText: '确认',
            success: function (res) {
              if (res.confirm) {
                wx.navigateTo({
                  url: '../city/city',
                })
              }
            }
          })
        } else {
          that.setData({
            shopPro: {},
            isLoading2: true,
          })
        }
      })
      .catch(res => {
       console.log(res)
      })
  },
  getDefaultMenu(JSESSIONID) {
    
    var that = this;
    
    var content = {
      brandId: constant.brandIdc
    };
    app.request
      .postRequest(url.getDefaultMenu, content, JSESSIONID)
      .then(res => {
        console.log(res);
        wx.hideLoading();
        if (res.data.status == 1) {
          var goodsIndex = 0;
          var jumptemp = res.data.data.bigs[0].name;
          var bigs = res.data.data.bigs
          var a = 330
          var categoryHeight=[a]
          
          for (var j = 0; j < bigs.length; j++) {
            a += bigs[j].products.length*118+32
            categoryHeight.push(a)
           
          }
          
          that.setData({
            categoryHeight: categoryHeight,
            hasnoShops: true,
            menuDataPro: bigs,
            typeId: bigs[0].uid,
            //标记点
            isLoading: true,
            goodsIndex: goodsIndex,
            menuId: res.data.data.menuId,
            isLoading1: true,
            isLoading2: true,
            isLoading3: true,
          }); 
          
        } else {
          that.setData({
            menuDataPro: [],
            isLoading3:false,
          }); 
        }
        
      });
  },
  btn_image: function (e) {
    console.log(e)
    if (!this.data.shopPro.isServiceTime & !this.data.hasnoShops) {
      return
    }
    var that = this;
    var item = e.currentTarget.dataset.item;
    if (!item.isInServiceTime || item.isSoldOut ){
      return
    }
    var label=[]
    if (item.isSpicy) {
      label.push('辣')
    }
    if (item.isSideDish){
      label.push('配菜')
    }
    
    if (item.isNew) {
      label.push('新品')
    }
    if (item.isSpecialty) {
      label.push('招牌饮品')
    }
  
    var menuProArray = this.data.menuProArray
    that.setData({
      imageInformation: item.image ? item.image : '', nameHH: item.name,
      priceHH: item.price, desc: item.desc, label: label })
    if (item.type==2){
      that.choose_group(e)
      return
    }
    if (item.isRequirement){
      that.btnImageAdd(e)
      return
    }
    console.log(menuProArray['menuId' + item.uid])
    that.setData({
      isGoodsInformation: false,
      isHiddenImageStatus: false,
      itemHH: item,
      numHH: menuProArray['menuId' + item.uid]==undefined ? 0: menuProArray['menuId' + item.uid]['numdata'],
    })
    
  },

  hideImageScreen: function () {
    this.setData({
      isGoodsInformation: true,
      isHiddenImageStatus: true,
    })
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
        if(data.status==0){
          var add = data.result.address
          that.setData({
            wd: latitude,
            jd: longitude,
            address: add
          })
          app.globalData.address = that.data.address
          that.getCityId(data.result.ad_info.city, app.globalData.JSESSIONID)
          that.setCacheData(openId, data.result.address_component.city, app.globalData.JSESSIONID, latitude, longitude,'key');
        }else{
          
          if (app.globalData.wrongKey) {
            if (!app.globalData.shopId) {
              wx.showModal({
                title: '提示',
                content: '没有获取到定位信息，请手动选择门店',
                showCancel: false,
                confirmColor: '#CAA284',
                confirmText: '确认',
                success: function (res) {
                  if (res.confirm) {
                    wx.navigateTo({
                      url: '../city/city',
                    })
                  }
                }
              })
            } else {
              that.setCacheData(app.globalData.openId, app.globalData.cityName, app.globalData.JSESSIONID, app.globalData.latitude, app.globalData.longitude, 'wrongKey');
            }
          }else{
            app.globalData.wrongKey = true
            wx.showModal({
              title: '提示',
              content: '没有获取到定位信息，请手动选择门店',
              showCancel: false,
              confirmColor: '#CAA284',
              confirmText: '确认',
              success: function (res) {
                if (res.confirm) {
                  wx.navigateTo({
                    url: '../city/city',
                  })
                }
              }
            })
          }
          
        }
      },
      fail:function(data){
        app.globalData.wrongKey = true
        wx.showModal({
          title: '提示',
          content: '没有获取到定位信息，请手动选择门店',
          showCancel: false,
          confirmColor: '#CAA284',
          confirmText: '确认',
          success: function (res) {
            if (res.confirm) {
              wx.navigateTo({
                url: '../city/city',
              })
            }
          }
        })
      }
    });
  },
  setCacheData: function (openId, city, JSESSIONID, latitude, longitude,type) {
    var that = this;
    wx.request({
      url: url.setCache,
      data: {
        "cityName": city,
        "openId": openId
      },
      method: 'POST',
      header: JSESSIONID ? { 'Cookie': 'JSESSIONID=' + JSESSIONID } : {},
      success: function (res) {

      console.log(type)
        app.globalData.cityName = city;
        app.globalData.JSESSIONID = JSESSIONID;
        that.getPageData(JSESSIONID) 
        that.getUserInfoData(JSESSIONID,'normal');
        
        if (type == 'wrongKey') {
          app.globalData.wrongKey = true
        }else{
          var businessType
          if (app.globalData.typeValue == 1) {
            businessType = [1, 4]
          } else {
            businessType = [2]
          }
          if (app.globalData.shopId) {  //选择门店后来到菜单页
            that.getShopData2(JSESSIONID, app.globalData.shopId, app.globalData.latitude, app.globalData.longitude,'normal');
          } else {
          that.getShopData(JSESSIONID, latitude, longitude, businessType);
          }
        }
      }
    })
  },
  getUserInfoData: function (JSESSIONID,type) {
    var that = this;
    var content = {}
    
     app.request.postRequestS(url.getUserInformation, content, JSESSIONID).then(res => {
      if (res.data.status == 1) {
        //   res.data.data.nickName = res.data.data.nickName.replace(/(.{3}).*(.{4})/, "$1****$2");
        if (app.globalData.isVka==1){
          that.getMemberInformation(res.data.data.phone);
        }else{
          if (type == 'autologin') {
            that.btGoSend()
          }
        }
        app.globalData.phone = res.data.data.phone;
        that.setData({
          isLogin: 1
        })
        
      } else {
        that.setData({
          isLogin: -1
        })
      }
    })
  },
  getMemberInformation(phone){
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
          app.globalData.memberId = res.data.data[0].id
          app.globalData.cardNo = res.data.data[0].cardNo
          that.getActivityData(res.data.data[0].id);
            that.btGoSend()
        }
      }
    })
  },
 
  getPageData: function (JSESSIONID) {
    var that = this;
    var content = {}
    app.request.postRequest(url.getBanner, content, JSESSIONID)
      .then(res => {
        if (res.data.status == 1) {
            that.setData({
              dataPro: res.data.data,
              isLoading1: true
            })
        }
      })
      .catch(res => {
        // wx.showToast({
        //   title: '出错了！',
        //   icon: 'none'
        // })
      })
  },
  btnImageAdd: function (res) {
    console.log(res);
    
    if (!this.data.shopPro.isServiceTime & !this.data.hasnoShops) {
      return
    }
    this.setData({
      typeId: res.currentTarget.dataset.typyid ? res.currentTarget.dataset.typyid : this.data.typeId
    })
    console.log(this.data.typeId)
    if (res.currentTarget.dataset.item.isRequirement) {
      this.narurefunc(res, 'isNature', 'nature')
    } else {
      var menuPro = this.data.menuPro;
      console.log(menuPro)
      var typePro = this.data.typePro;
      var menuProArray = this.data.menuProArray;
      var goodsObj = {};
      var allMenu = this.data.allMenu;
      var typeId = this.data.typeId;
      var specialOfferPrice = this.data.specialOfferPrice;
      var item = res.currentTarget.dataset.item;
      var mealFeeMoney = this.data.mealFeeMoney;
      console.log(item)
      // item.mealFee=0.5
      if (menuPro['menuId' + item.uid]) {//已点餐品
        if (item.mealFeeMode==1){
          var tempnum1 = Math.ceil(menuPro['menuId' + item.uid]['num'] / item.part)
          menuPro['menuId' + item.uid]['num'] += 1;
          menuProArray['menuId' + item.uid]['numdata'] += 1;
          var tempnum2 = Math.ceil(menuPro['menuId' + item.uid]['num'] / item.part)
          mealFeeMoney += (tempnum2 - tempnum1)* item.mulMealFee * 100;
        }else{
          menuPro['menuId' + item.uid]['num'] += 1;
          menuProArray['menuId' + item.uid]['numdata'] += 1;
          mealFeeMoney += item.mealFee * 100;
        }
      } else {
        console.log(item)
        goodsObj['menuName'] = item.name;
        goodsObj['id'] = item.uid;
        goodsObj['extId'] = item.extId;
        goodsObj['num'] = 1;
        goodsObj['numdata'] = 1;
        goodsObj['price'] = parseFloat(item.price) * 100;
        goodsObj['costPrice'] = item.costPrice * 100;
        goodsObj['typeId'] = typeId;
        switch (item.mealFeeMode){
          case 0: goodsObj['mealFee'] = item.mealFee * 100; mealFeeMoney += item.mealFee * 100; break;
          case 1: goodsObj['mealFee'] = item.mulMealFee * 100; mealFeeMoney += item.mulMealFee * 100;
            goodsObj['part'] = item.part;break;
        }
        
        goodsObj['mealFeeMode'] = item.mealFeeMode;
        goodsObj['image'] = item.image;
        goodsObj['logo'] = item.logo;
        menuPro['menuId' + item.uid] = goodsObj;
        menuProArray['menuId' + item.uid] = goodsObj;
      }
      if (typePro['menuTypeId' + typeId]) {
        typePro['menuTypeId' + typeId] += 1;
      } else {
        typePro['menuTypeId' + typeId] = 1;
      }
      
      if (item.costPrice > 0) {
        specialOfferPrice += item.costPrice * 100;
      } else {
        specialOfferPrice += item.price * 100;
      }
      allMenu['menuNum'] += 1;
      allMenu['menuPrice'] += parseFloat(item.price) * 100;
      console.log(menuPro)
      this.setData({
        menuPro: menuPro,
        typePro: typePro,
        menuProArray: menuProArray,
        allMenu: allMenu,
        specialOfferPrice: specialOfferPrice,
        mealFeeMoney: mealFeeMoney
      })
      app.globalData.meailFee = mealFeeMoney
    }
  },
  narurefunc(res, type, status, mode) {
    console.log(res, type)
    if (status == 'group') {
      var naturePro = res.property.propertys;
      var naturePro_ = res.property.standard;
      var choices = res.property.choices;
      if (mode == 'yes') { var groupPrice_ = this.data.groupPrice_; if (res.num) { var number = parseFloat(res.num); } else { if (res.maxNum) { var number = parseFloat(res.maxNum) } else { var number = 1; } } } else { var groupPrice_ = 0; number = 1; }

      var groupPrice = this.data.groupPrice
      console.log(groupPrice_)
      if (naturePro) {
        if ((type == 'groupProDF' || type == 'groupProD') && res.num > 1) {
          for (var i = 0; i < naturePro.length; i++) {
            for (var j = 0; j < naturePro[i].items.length; j++) {
              if (naturePro[i].items[j].isChecked == '1') {
                groupPrice_ += parseFloat(naturePro[i].items[j].price) * 100 * this.data.groupnum;
              } else {
                naturePro[i].items[j].isChecked = '0';
              }

            }
          }
        } else {
          for (var i = 0; i < naturePro.length; i++) {
            for (var j = 0; j < naturePro[i].items.length; j++) {
              if (j == 0) {
                naturePro[i].items[j].isChecked = '1';
                //标记点
                groupPrice_ += parseFloat(naturePro[i].items[j].price) * 100 * this.data.groupnum * number;
              } else {
                naturePro[i].items[j].isChecked = '0';
              }
            }
          }
        }

      } else {
        naturePro = []
      }
      if (naturePro_) {
        if ((type == 'groupProDF' || type == 'groupProD') && res.num > 1) {
          for (var j = 0; j < naturePro_.items.length; j++) {
            if (naturePro_.items[j].isChecked == '1') {
              groupPrice_ += parseFloat(naturePro_.items[j].price) * 100 * this.data.groupnum;
            } else {
              naturePro_.items[j].isChecked = '0';
            }

          }
        } else {
          for (var j = 0; j < naturePro_.items.length; j++) {
            switch (naturePro_.items[0].isSoldOut) {
              case false:
                if (j == 0) {
                  naturePro_.items[j].isChecked = '1';
                  groupPrice_ += parseFloat(naturePro_.items[j].price) * 100 * this.data.groupnum * number;
                } else {
                  naturePro_.items[j].isChecked = '0';
                }; break;
              case true:
                if (naturePro_.items[j].isSoldOut) {
                  
                  naturePro_.items[j + 1].isChecked = '1';
                  groupPrice_ += parseFloat(naturePro_.items[j + 1].price) * 100 * this.data.groupnum * number;
                } else if (naturePro_.items[j].isChecked == '1' && !naturePro_.items[j].isSoldOut) {
                } else {
                  naturePro_.items[j].isChecked = '0';
                }
                break;
            }
          }
        }
      } else {
        naturePro_ = {}
      }
      if (choices) {
        if ((type == 'groupProDF' || type == 'groupProD') && res.num > 1) {
          for (var j = 0; j < choices.items.length; j++) {
            if (choices.items[j].isChecked == '1') {
              groupPrice_ += parseFloat(choices.items[j].price) * 100 * this.data.groupnum;
            } else {
              choices.items[j].isChecked = '0';
            }


          }
        } else {
          for (var j = 0; j < choices.items.length; j++) {
            choices.items[j].isChecked = '0';
          }

        }
      } else {
        choices = {}
      }
      groupPrice += groupPrice_
      this.setData({
        isHiddenScreenStatus: false,
        groupPrice_: groupPrice_,
        groupPrice: groupPrice,
        menuPrice: parseFloat(res.price) * 100,
        costPrice: res.costPrice,
        natureMealFee: res.mealFee * 100,
        extId: res.extId,
      })
      if (type == 'groupProA') {
        this.setData({
          choices: choices, isNatureA: false,
          naturePro: naturePro,
          naturePro_: naturePro_,
        })
      }
    } else {
      var item = res.currentTarget.dataset.item
      this.setData({ naturenum: 1 })
      var naturePrice = 0;
      var naturePro = item.property.propertys;
      var naturePro_ = item.property.standard;
      var choicesnature = item.property.choices;
      naturePrice += parseFloat(item.price) * 100;
      console.log(choicesnature)
      if (choicesnature != undefined && choicesnature != 'undefined' && choicesnature != null ) {
        for (var j = 0; j < choicesnature.items.length; j++) {
          choicesnature.items[j].isChecked = '0';
        }
      } else {
        choicesnature = {}
      }
      if (naturePro) {
        console.log(naturePro)
        for (var i = 0; i < naturePro.length; i++) {
          for (var j = 0; j < naturePro[i].items.length; j++) {
            console.log(naturePro[i].items[j])
            if (j == 0) {
              naturePro[i].items[j].isChecked = '1';
              naturePrice += parseFloat(naturePro[i].items[j].price) * 100;
            } else {
              naturePro[i].items[j].isChecked = '0';
            }
          }
        }
      } else {
        naturePro = []
      }
      if (naturePro_) {
        console.log(naturePro_)
        for (var j = 0; j < naturePro_.items.length; j++) {
          console.log(naturePro_.items[j])
          switch (naturePro_.items[0].isSoldOut) {
            case false:
              if (j == 0) {
                naturePro_.items[j].isChecked = '1';
                naturePrice += parseFloat(naturePro_.items[j].price) * 100
              } else {
                naturePro_.items[j].isChecked = '0';
              }; break;
            case true:
              if (naturePro_.items[j].isSoldOut) {
                if (naturePro_.items[j + 1]==undefined){
                  wx.showToast({
                    title: '餐品售罄',
                    icon: 'none',
                    duration: 2000
                  })
                  return
                }
                naturePro_.items[j + 1].isChecked = '1';
                naturePrice += parseFloat(naturePro_.items[j + 1].price) * 100
              } else if (naturePro_.items[j].isChecked == '1' && !naturePro_.items[j].isSoldOut) {
              } else {
                naturePro_.items[j].isChecked = '0';
              }
              break;
          }
        }
      } else {
        naturePro_ = {}
      }
    
     
      this.setData({
        isHiddenScreenStatus: false,
        isNature: false,
        naturePrice: naturePrice,
        menuIddd:item.uid,
        menuName: item.name,
        menuPrice: parseFloat(item.price) * 100,
        costPrice: item.costPrice,
        naturePro: naturePro,
        naturePro_: naturePro_,
        natureMealFee: item.mealFeeMode == 0 ? item.mealFee * 100 : item.mulMealFee* 100,
        natureFeeMode: item.mealFeeMode,
        naturepart:item.part,
        choicesnature: choicesnature,
        extId: item.extId,
        
      })
      
    }
  },
  btnType: function (res) {
    // console.log(res);
    var id = res.currentTarget.dataset.item.uid
    this.setData({
      goodsIndex: res.currentTarget.dataset.index,
      typeId: id,
      curlistview: 'list' + id,
      Discounttype: 0,
    })
  },
  scrollcontent(t) {
    var that=this
    for (var e = t.detail.scrollTop, a = this.data.categoryHeight, o = 0, i = 0; i < a.length; i++) e >= a[i] && e < a[i + 1] ? o = i : e >= a[a.length - 1] && (o = a.length - 1);
    if (o != this.data.goodsIndex) {
      var n =  this.data.menuDataPro[o].uid;
      this.setData({
        goodsIndex: o,
        typeId: n,
        curleftview:'list'+n
      });
    }
    
  },
  getCityId(name, JSESSIONID) {
    var that = this;
    var content = { name: name}
    app.request.postRequest(url.getCityId, content, JSESSIONID)
      .then(res => {
        app.globalData.cityId = res.data.data
      })
      .catch(res => {
        
       
      })
  },
  changeMode(){
    var activeindex = this.data.activeindex
    var typeValue = app.globalData.typeValue
    var that = this
    switch (activeindex){
      case 0: 
          activeindex = 1; 
          wx.navigateTo({
            url: '../address/address?typeNum=1',
          }); break;
      case 1: 
      activeindex = 0;
        wx.showToast({ title: '加载中', icon: 'loading', duration: 10000 });
        app.globalData.menuPro = {};
        app.globalData.allpro = { 'menuNum': 0, 'menuPrice': 0 };
        app.globalData.menuProArray = {};
        app.globalData.sendAddress = null;
        app.globalData.specialOfferPrice = 0;
        app.globalData.typePro = {};
        app.globalData.meailFee = 0;

        that.setData({
          menuPro: {},
          typePro: {},
          menuProArray: {},
          allMenu: { 'menuNum': 0, 'menuPrice': 0 },
          isShopCarCommodity: true,
          hiddenBuyCarStatus: true,
          hiddenMenuPro: true,
          isHiddenModal: true,
          isHiddenScreenStatus: true,
          specialOfferPrice: 0,
          mealFeeMoney: 0
        })
        that.getShopData2(app.globalData.JSESSIONID, app.globalData.shopId, app.globalData.latitude, app.globalData.longitude,'takeself');
      break;

    }
  
    this.setData({
      activeindex: activeindex
    })
    console.log(activeindex)
  },
  GetmenuData: function (JSESSIONID, that, id, typeValue, reserveDate) {
    var content = {storeId: id,sendType: typeValue,reserveDate: reserveDate}
    app.request.postRequest(url.getMenuId, content, JSESSIONID)
      .then(res => {
        console.log(res)
        wx.hideLoading()
        if (res.data.status == 1) {
          var bigs = res.data.data.bigs
          var a = 330
          var categoryHeight = [a]
          for (var j = 0; j < bigs.length; j++) {
            a += bigs[j].products.length * 118 + 32
            categoryHeight.push(a)
          }
          var goodsIndex = 0;
          var jumptemp = bigs[0].name;
          that.setData({
            categoryHeight: categoryHeight,
            hasnoShops: false,
            menuDataPro: bigs,
            typeId: bigs[0].uid,//标记点
            isLoading: true,
            goodsIndex: goodsIndex,
            menuId: res.data.data.menuId,
            isLoading2: true,
            isLoading3: true,
          })
        } else {
          that.setData({
            isLoading2: true,
            menuDataPro: [],
            isLoading3: false,
          })
        }
      })
      .catch(res => {
        
      })
  },
  /**选择门店 */
  go_store:function(){
    var that = this;
    if (that.data.activeindex==1){
      wx.navigateTo({
        url: '../address/address?typeNum=1',
      })
    }else{
      wx.navigateTo({
        url: '../shops/shops',
      })
    }
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
      path: constant.sharePath// 分享路径
    }
  },
  menuProBack: function () {
    this.setData({
      isNature: true,
      isHiddenScreenStatus: true, 
      display: 0,
      display1:0,
    })
  },
  menuProBack2: function () {
    this.setData({
      isGroup: true,
      isNatureA: true,
      isHiddenScreenStatus: true,
      display:0,
      display1:0
    })
  },
  modal_image_add_click: function () {
    console.log(this.data.naturePrice)
    var menuPro = this.data.menuPro;
    var typePro = this.data.typePro;
    var menuName = this.data.menuName;
    var extId = this.data.extId;
    var menuId = this.data.menuIddd;
    var menuPrice = this.data.menuPrice;
    var naturePro = this.data.naturePro;  //属性
    var natureProGG = this.data.naturePro_;//规格
    var choices = this.data.choicesnature;//加料
    console.log(naturePro)
    var natureId = '';
    var natureName = '';
    var naturePrice = 0;
    var goodsObj = {};
    var natureObj = {};
    var typeId = this.data.typeId;
    var menuProArray = this.data.menuProArray;
    var allMenu = this.data.allMenu;
    var specialOfferPrice = this.data.specialOfferPrice;
    var costPrice = this.data.costPrice;
    var mealFeeMoney = this.data.mealFeeMoney;
    var natureMealFee = this.data.natureMealFee;
    console.log(typeId)
    // console.log(menuId);
    var naturePro_ = [];
    var naturePro_1 = {};
    var naturePro_2 = [];
    if (naturePro) {
      if (naturePro.length > 0) {
        for (var i = 0; i < naturePro.length; i++) {
          var natureObj_1 = [];
          var natureObj_2 = {};
          for (var j = 0; j < naturePro[i].items.length; j++) {
            var natureObj_ = {};
            if (naturePro[i].items[j].isChecked == '1') {
              if (naturePro[i].items[j].price > 0){
                natureName += naturePro[i].items[j].name + "(¥" + naturePro[i].items[j].price + ") / ";
              }else{
                natureName += naturePro[i].items[j].name + " / ";
              }
              
              natureId += naturePro[i].uid + '' + j + ",";
              naturePrice += parseFloat(naturePro[i].items[j].price) * 100;
              natureObj_['index'] = j;
              natureObj_['uid'] = naturePro[i].items[j].uid;
              natureObj_['name'] = naturePro[i].items[j].name;
              natureObj_['price'] = naturePro[i].items[j].price;
              natureObj_1.push(natureObj_);
            }
          }
          natureObj_2['pid'] = naturePro[i].uid;
          natureObj_2['title'] = naturePro[i].title;
          natureObj_2['items'] = natureObj_1;
          console.log(natureObj_2);
          naturePro_.push(natureObj_2);
        }

      }
    }
    if (natureProGG.items) {
      if (natureProGG.items.length > 0) {
        for (var j = 0; j < natureProGG.items.length; j++) {
          var natureObj_1 = [];
          var natureObj_2 = {};
          var natureObj_ = {};
          if (natureProGG.items[j].isChecked == '1') {
            if (natureProGG.items[j].price > 0){
              natureName += natureProGG.items[j].name + "(¥" + natureProGG.items[j].price + ") / ";
            }else{
              natureName += natureProGG.items[j].name +" / ";
            }
            
            natureId += natureProGG.uid + '' + j + ",";
            naturePrice += parseFloat(natureProGG.items[j].price) * 100;
            natureObj_['index'] = j;
            natureObj_['uid'] = natureProGG.items[j].uid;
            natureObj_['name'] = natureProGG.items[j].name;
            natureObj_['price'] = natureProGG.items[j].price;
            natureObj_1.push(natureObj_);
          }
          natureObj_2['pid'] = natureProGG.uid;
          natureObj_2['title'] = natureProGG.title;
          natureObj_2['items'] = natureObj_1;
          console.log(natureObj_2);
          naturePro_.push(natureObj_2);
        }
      }
    }
    if (choices) {
      if (choices.items) {
        if (choices.items.length > 0) {
          for (var j = 0; j < choices.items.length; j++) {
            var natureObj_1 = [];
            var natureObj_2 = {};
            var natureObj_ = {};
            if (choices.items[j].isChecked == '1') {
              if (choices.items[j].price > 0){
                natureName += choices.items[j].name + "(¥" + choices.items[j].price + ") / ";
              }else{
                natureName += choices.items[j].name + " / ";
              }
              
              natureId += choices.uid + '' + j + ",";
              naturePrice += parseFloat(choices.items[j].price) * 100;
              natureObj_['index'] = j;
              natureObj_['name'] = choices.items[j].name;
              natureObj_['uid'] = choices.items[j].uid;
              natureObj_['price'] = choices.items[j].price;
              natureObj_1.push(natureObj_);
            }
            natureObj_2['pid'] = choices.uid;
            natureObj_2['title'] = choices.title;
            natureObj_2['items'] = natureObj_1;
            // console.log(natureObj_2);
            naturePro_.push(natureObj_2);
          }
        }
      }
    }
    naturePro_1['propertys'] = naturePro_;
    naturePro_2.push(naturePro_1);
    console.log(naturePro_1);
    natureName = natureName.substr(0, natureName.length - 3);
    natureId = natureId.substr(0, natureId.length - 1);
    console.log(natureName);
    console.log(natureId);

    if (menuProArray['menuId' + menuId]) {
      menuProArray['menuId' + menuId]['numdata'] += this.data.naturenum;
    } else {
      console.log(extId)
      goodsObj['menuName'] = menuName;
      goodsObj['id'] = this.data.menuIddd;
      goodsObj['extId'] = extId;
      goodsObj['num'] = this.data.naturenum;
      goodsObj['numdata'] = this.data.naturenum;
      goodsObj['price'] = menuPrice + naturePrice;
      goodsObj['typeId'] = typeId;
      goodsObj['costPrice'] = costPrice * 100 * this.data.naturenum;
      goodsObj['mealFeeMode'] = this.data.natureFeeMode;
      console.log(this.data.naturenum, this.data.naturepart, natureMealFee)
      switch (this.data.natureFeeMode){
        case 0: goodsObj['mealFee'] = natureMealFee ;break;
        case 1: goodsObj['mealFee'] = natureMealFee; goodsObj['part'] = this.data.naturepart;break;
      }

      menuProArray['menuId' + menuId] = goodsObj;
      // console.log(goodsObj)
    }
    console.log(menuId)
    console.log(menuProArray['menuId' + menuId])
    if (menuPro['menuId' + menuId + natureId]) {
      if (this.data.natureFeeMode== 1) {
        var tempnum1 = Math.ceil(menuPro['menuId' + menuId + natureId]['num'] / menuPro['menuId' + menuId + natureId].part)
        menuPro['menuId' + menuId + natureId]['num'] += this.data.naturenum;
        var tempnum2 = Math.ceil(menuPro['menuId' + menuId + natureId]['num'] / menuPro['menuId' + menuId + natureId].part) 
        mealFeeMoney += natureMealFee *(tempnum2 - tempnum1)
      } else {
        menuPro['menuId' + menuId + natureId]['num'] += this.data.naturenum;
        mealFeeMoney += natureMealFee * this.data.naturenum;
      }
      
    } else if (menuPro['menuId' + natureId]) {

    } else {
      console.log(11111)

      natureObj['natureName'] = natureName;
      natureObj['natureId'] = natureId;
      natureObj['naturePrice'] = naturePrice;
      natureObj['menuId'] = menuId;
      goodsObj['extId'] = extId;
      goodsObj['menuName'] = menuName;
      goodsObj['id'] = this.data.menuIddd;
      goodsObj['num'] = this.data.naturenum;
      goodsObj['menuNature'] = natureObj;
      goodsObj['typeId'] = typeId;
      goodsObj['mealFeeMode'] = this.data.natureFeeMode;
      switch (this.data.natureFeeMode) {
        case 0: goodsObj['mealFee'] = natureMealFee ; mealFeeMoney += natureMealFee * this.data.naturenum; break;
        case 1: goodsObj['mealFee'] = natureMealFee; goodsObj['part'] = this.data.naturepart; mealFeeMoney += natureMealFee * Math.ceil(this.data.naturenum / this.data.naturepart); break;
      }
      goodsObj['listRequirements'] = naturePro_2;
      goodsObj['price'] = menuPrice + naturePrice
      menuPro['menuId' + menuId + natureId] = goodsObj;

    }

    if (typePro['menuTypeId' + typeId]) {
      typePro['menuTypeId' + typeId] += this.data.naturenum;
    } else {
      typePro['menuTypeId' + typeId] = this.data.naturenum;
    }
    allMenu['menuNum'] += this.data.naturenum;
    allMenu['menuPrice'] += (naturePrice + menuPrice) * this.data.naturenum;

    if (costPrice > 0) {
      specialOfferPrice += costPrice * 100 * this.data.naturenum;
    } else {
      specialOfferPrice += (naturePrice + menuPrice) * this.data.naturenum;
    }
    
//标记点
    // console.log(menuProArray);
    console.log(menuPro);
    // console.log(typePro);

    this.setData({
      menuProArray: menuProArray,
      menuPro: menuPro,
      typePro: typePro,
      isNature: true,
      isHiddenScreenStatus: true,
      allMenu: allMenu,
      specialOfferPrice: specialOfferPrice,
      mealFeeMoney: mealFeeMoney
    })
    app.globalData.meailFee = mealFeeMoney
  },
  proListLiSelected: function (e) {
    console.log(e)
    var naturePro = this.data.naturePro;
    var naturePrice = this.data.naturePrice;
    var groupPrice = this.data.groupPrice
    var groupPrice_ = this.data.groupPrice_
    var specialOfferPrice = this.data.specialOfferPrice;
    if (e.currentTarget.dataset.info.items) {

      if (e.currentTarget.dataset.info.items[e.currentTarget.dataset.y].isChecked == '1') {
        return
      }
      if (e.currentTarget.dataset.info.items[e.currentTarget.dataset.y].iisSoldOut) {
        return
      }
    } else {
      if (e.currentTarget.dataset.info.isChecked == '1') {
        return
      }
      if (e.currentTarget.dataset.info.iisSoldOut) {
        return
      }
    }
    for (var i = 0; i < naturePro[e.currentTarget.dataset.z].items.length; i++) {
      if (e.currentTarget.dataset.y == i) {
        naturePro[e.currentTarget.dataset.z].items[i].isChecked = '1';
        naturePrice += parseFloat(naturePro[e.currentTarget.dataset.z].items[i].price) * 100;
        groupPrice += parseFloat(naturePro[e.currentTarget.dataset.z].items[i].price) * 100 * this.data.groupnum;
        groupPrice_ += parseFloat(naturePro[e.currentTarget.dataset.z].items[i].price) * 100 * this.data.groupnum;
        if (naturePro[e.currentTarget.dataset.z].items[i].costPrice > 0) {
          specialOfferPrice += naturePro[e.currentTarget.dataset.z].items[i].costPrice;
        } else {
          specialOfferPrice += parseFloat(naturePro[e.currentTarget.dataset.z].items[i].price) * 100;
        }
      } else {
        if (naturePro[e.currentTarget.dataset.z].items[i].isChecked == '1') {
          naturePrice -= parseFloat(naturePro[e.currentTarget.dataset.z].items[i].price) * 100;
          groupPrice -= parseFloat(naturePro[e.currentTarget.dataset.z].items[i].price) * 100 * this.data.groupnum;
          groupPrice_ -= parseFloat(naturePro[e.currentTarget.dataset.z].items[i].price) * 100 * this.data.groupnum;
          if (naturePro[e.currentTarget.dataset.z].items[i].costPrice > 0) {
            specialOfferPrice -= naturePro[e.currentTarget.dataset.z].items[i].costPrice;
          } else {
            specialOfferPrice -= parseFloat(naturePro[e.currentTarget.dataset.z].items[i].price) * 100;
          }
        }
        naturePro[e.currentTarget.dataset.z].items[i].isChecked = '0';
      }
    }
    this.setData({
      groupPrice_: groupPrice_,
      naturePro: naturePro,
      groupPrice: groupPrice,
      naturePrice: naturePrice
    })
  },
  proListLiSelected_(e) {
    console.log(e)
    var naturePro_ = this.data.naturePro_;
    var naturePrice = this.data.naturePrice;
    var groupPrice = this.data.groupPrice;
    var groupPrice_ = this.data.groupPrice_;
    if (e.currentTarget.dataset.info.items) {
      if (e.currentTarget.dataset.info.items[e.currentTarget.dataset.y].isChecked == '1') {
        return
      }

      if (e.currentTarget.dataset.info.items[e.currentTarget.dataset.y].isSoldOut) {
        return
      }
    } else {
      if (e.currentTarget.dataset.info.isChecked == '1') {
        return
      }
      if (e.currentTarget.dataset.info.isSoldOut) {
        return
      }
    }
    var specialOfferPrice = this.data.specialOfferPrice;
    for (var i = 0; i < naturePro_.items.length; i++) {
      console.log(i, e.currentTarget.dataset.y)
      if (e.currentTarget.dataset.y == i) {
        naturePro_.items[i].isChecked = '1';
        naturePrice += parseFloat(naturePro_.items[i].price) * 100;
        groupPrice += parseFloat(naturePro_.items[i].price) * 100 * this.data.groupnum;
        groupPrice_ += parseFloat(naturePro_.items[i].price) * 100 * this.data.groupnum;
        if (naturePro_.items[i].costPrice > 0) {
          specialOfferPrice += naturePro_.items[i].costPrice;
        } else {
          specialOfferPrice += parseFloat(naturePro_.items[i].price) * 100;
        }
      } else {
        if (naturePro_.items[i].isChecked == '1') {
          naturePrice -= parseFloat(naturePro_.items[i].price) * 100;
          groupPrice -= parseFloat(naturePro_.items[i].price) * 100 * this.data.groupnum;
          groupPrice_ -= parseFloat(naturePro_.items[i].price) * 100 * this.data.groupnum;
          if (naturePro_.items[i].costPrice > 0) {
            specialOfferPrice -= naturePro_.items[i].costPrice;
          } else {
            specialOfferPrice -= parseFloat(naturePro_.items[i].price) * 100;
          }
        }
        naturePro_.items[i].isChecked = '0';
      }
    }
    this.setData({
      groupPrice_: groupPrice_,
      groupPrice: groupPrice,
      naturePro_: naturePro_,
      naturePrice: naturePrice
    })
  },
  choicesSelected(e) {
    console.log(e)
    var naturePro_ = this.data.choices;
    var groupPrice = this.data.groupPrice;
    var groupPrice_ = this.data.groupPrice_;
    var specialOfferPrice = this.data.specialOfferPrice;
    var i = e.currentTarget.dataset.y
    if (naturePro_.items[i].isChecked == '1') {
      groupPrice -= parseFloat(naturePro_.items[i].price) * 100 * this.data.groupnum;
      groupPrice_ -= parseFloat(naturePro_.items[i].price) * 100 * this.data.groupnum;
      if (naturePro_.items[i].costPrice > 0) {
        specialOfferPrice -= naturePro_.items[i].costPrice;
      } else {
        specialOfferPrice -= parseFloat(naturePro_.items[i].price) * 100;
      }
      naturePro_.items[i].isChecked = '0';
    } else {
      groupPrice += parseFloat(naturePro_.items[i].price) * 100 * this.data.groupnum;
      groupPrice_ += parseFloat(naturePro_.items[i].price) * 100 * this.data.groupnum;
      if (naturePro_.items[i].costPrice > 0) {
        specialOfferPrice += naturePro_.items[i].costPrice;
      } else {
        specialOfferPrice += parseFloat(naturePro_.items[i].price) * 100;
      }
      naturePro_.items[i].isChecked = '1';
    }
    this.setData({
      groupPrice_: groupPrice_,
      groupPrice: groupPrice,
      choices: naturePro_,
    })
  },
  btnImageSub: function (e) {
    console.log(e);
    var item = e.currentTarget.dataset.item;
    var typeId = this.data.typeId;
    var specialOfferPrice = this.data.specialOfferPrice;
    var mealFeeMoney = this.data.mealFeeMoney;

    if (item.isRequirement) {
      this.setData({
        isGoodsModal: false
      })
    } else {
      var menuPro = this.data.menuPro;
      var typePro = this.data.typePro;
      var menuProArray = this.data.menuProArray;
      var allMenu = this.data.allMenu;

      allMenu['menuNum'] -= 1;
      allMenu['menuPrice'] -= menuPro['menuId' + item.uid]['price'];
      if (menuPro['menuId' + item.uid]['costPrice'] > 0) {
        specialOfferPrice -= menuPro['menuId' + item.uid]['costPrice'];
      } else {
        specialOfferPrice -= menuPro['menuId' + item.uid]['price'];
      }

      if (menuPro['menuId' + item.uid]['num'] == 1) {
        mealFeeMoney -= menuPro['menuId' + item.uid]['mealFee'];
        delete (menuPro['menuId' + item.uid]);
        delete (menuProArray['menuId' + item.uid])
      } else {
        var tempdata = menuPro['menuId' + item.uid]
        switch (tempdata.mealFeeMode) {
          case 0: menuPro['menuId' + item.uid]['num'] -= 1;
            mealFeeMoney -= tempdata['mealFee'];
            break;
          case 1:
            var tempnum1 = Math.ceil(tempdata['num'] / tempdata.part)
            tempdata['num'] -= 1;
            var tempnum2 = Math.ceil(tempdata['num'] / tempdata.part)
            mealFeeMoney -= (tempnum1 - tempnum2) * tempdata['mealFee']; break;
        } 
        menuProArray['menuId' + item.uid]['numdata'] -= 1;
      }

      if (typePro['menuTypeId' + typeId] == 1) {
        delete (typePro['menuTypeId' + typeId]);
      } else {
        typePro['menuTypeId' + typeId] -= 1
      }



      if (allMenu['menuNum'] < 0) {
        allMenu['menuNum'] = 0;
      }
      if (allMenu['menuPrice'] < 0) {
        allMenu['menuPrice'] = 0;
      }
      // console.log(menuPro);

      this.setData({
        menuPro: menuPro,
        typePro: typePro,
        menuProArray: menuProArray,
        allMenu: allMenu,
        specialOfferPrice: specialOfferPrice,
        mealFeeMoney: mealFeeMoney
      })
      app.globalData.meailFee = mealFeeMoney
    }
  },
  //弹出购物车
  burCarClick: function (event) {
    //点击购物车按钮弹出购物车已点餐品
    console.log(this.data.hiddenBuyCarStatus)
    if (!this.data.hiddenBuyCarStatus) {
      this.hideScreen();
      return;
    }

    if (this.data.allMenu['menuNum'] == 0) {
      return;
    }

    var animation = wx.createAnimation({ duration: 400, timingFunction: "ease" });
    this.animation = animation;

    animation.translateY(300).step();
    this.setData({
      animationData: animation.export(),
      isShopCarCommodity: false,
      hiddenBuyCarStatus: false
    });


    setTimeout(function () {
      animation.translateY(0).step();
      this.setData({
        animationData: animation.export()
      })
    }.bind(this), 50)
  },
  //隐藏购物车
  hideScreen: function () {
    //隐藏这招层
    var animation = wx.createAnimation({ duration: 400, timingFunction: "ease" });
    this.animation = animation;
    var that = this;
    // console.log(11111);

    setTimeout(function () {
      animation.translateY(300).step();

      this.setData({
        animationData: animation.export()
      })
    }.bind(this), 50);

    setTimeout(function () {
      that.setData({
        isShopCarCommodity: true,
        hiddenBuyCarStatus: true,
        hiddenMenuPro: true,
        isNature: true,
        isGroup:true,
        isHiddenScreenStatus: true
      })
    }, 400)
  },
  hideShopCarScreen: function () {
    this.setData({
      isShopCarCommodity: true,
      hiddenBuyCarStatus: true,
      hiddenMenuPro: true
    })
  },
  choose_group: function (e) {
    console.log(e)

    var that = this
    wx.showToast({ title: '加载中', icon: 'loading', duration: 10000 });
    var id = e.currentTarget.dataset.item.uid
    that.setData({
      menuName: e.currentTarget.dataset.item.name,
      grouppppro: e,
      typeId: e.currentTarget.dataset.typyid
    })
    that.getgroupData(id, app.globalData.JSESSIONID)

  },
  getgroupData: function (id, JSESSIONID) {
    var that = this
    wx.request({
      url: url.default,
      data: {
        actionName: url.getGroup,
        content: {
          storeId: that.data.shopId,
          menuId: that.data.menuId,
          pid: id
        }

      },
      method: 'POST',
      header: JSESSIONID ? { 'Cookie': 'JSESSIONID=' + JSESSIONID } : {},
      success: function (res) {
        console.log(res);
        wx.hideToast()
        if (res.data.status == 1) {
          var groupPrice = 0;
          that.setData({ groupnum: 1, groupPrice_: 0 })
          if (res.data.data.mainFoodAreas.length > 0) {
            that.setData({
              mainview: true,
            })
            if (res.data.data.mainFoodAreas[0].groupA) {
              var groupProA = res.data.data.mainFoodAreas[0].groupA;
              if (res.data.data.mainFoodAreas[0].associatedGroups) {
                var I = groupProA.cells[0].pid
                if (res.data.data.mainFoodAreas[0].associatedGroups[I].groupB) {
                  var groupProB = res.data.data.mainFoodAreas[0].associatedGroups[I].groupB;
                }
                if (res.data.data.mainFoodAreas[0].associatedGroups[I].groupC) {
                  var groupProC = res.data.data.mainFoodAreas[0].associatedGroups[I].groupC
                }
                if (res.data.data.mainFoodAreas[0].associatedGroups[I].groupD) {
                  var groupProD = res.data.data.mainFoodAreas[0].associatedGroups[I].groupD;
                }
              }
            } else {
              if (res.data.data.mainFoodAreas[0].associatedGroups[0]) {
                if (res.data.data.mainFoodAreas[0].associatedGroups[0].groupB) {
                  var groupProB = res.data.data.mainFoodAreas[0].associatedGroups[0].groupB;
                }
                if (res.data.data.mainFoodAreas[0].associatedGroups[0].groupC) {
                  var groupProC = res.data.data.mainFoodAreas[0].associatedGroups[0].groupC
                }
                if (res.data.data.mainFoodAreas[0].associatedGroups[0].groupD) {
                  var groupProD = res.data.data.mainFoodAreas[0].associatedGroups[0].groupD;
                }
              }
            }
          } else {
            that.setData({
              mainview: false,
            })
          }


          if (res.data.data.extFoodArea) {
            if (res.data.data.extFoodArea.groupB) {
              var groupProBF = res.data.data.extFoodArea.groupB;
            }
            if (res.data.data.extFoodArea.groupC) {
              var groupProCF = res.data.data.extFoodArea.groupC;
            }
            if (res.data.data.extFoodArea.groupD) {
              var groupProDF = res.data.data.extFoodArea.groupD;
            }
            that.setData({
              extFoodAreaview: false,
            })
          } else {
            that.setData({
              extFoodAreaview: true,
            })
          }
          if (groupProA) {
            var isflagA = false
            for (var i = 0; i < groupProA.cells.length; i++) {
              if (!groupProA.cells[i].isSoldOut) {
                isflagA = true
              }
            }
            if (!isflagA) {
              wx.showToast({
                title: '餐品售罄',
                icon: 'none',
                duration: 2000
              })
              return
            }
            for (var i = 0; i < groupProA.cells.length; i++) {
              switch (groupProA.cells[0].isSoldOut) {
                case false:
                  if (i == 0) {
                    groupProA.cells[i].isChecked = '1';
                    groupPrice += parseFloat(groupProA.cells[i].price) * 100;
                    if (groupProA.cells[i].property) {
                      that.narurefunc(groupProA.cells[i], 'groupProA', 'group', 'yes')
                    } else {
                      that.setData({
                        isNatureA: true,
                      })
                    }
                  } else {
                    groupProA.cells[i].isChecked = '0';
                  }
                  break;
                case true:
                  if (groupProA.cells[i].isSoldOut) {
                    groupProA.cells[i + 1].isChecked = '1';
                    groupPrice += parseFloat(groupProA.cells[i + 1].price) * 100;
                    if (groupProA.cells[i + 1].property) {
                      that.narurefunc(groupProA.cells[i + 1], 'groupProA', 'group', 'yes')
                    } else {
                      that.setData({
                        isNatureA: true,
                      })
                    }
                  } else if (groupProA.cells[i].isChecked == '1' && !groupProA.cells[i].isSoldOut) {
                  } else {
                    groupProA.cells[i].isChecked = '0';
                  }
                  break;
              }

            }
          } else {
            groupProA = []
          }
          console.log(groupPrice)
          if (groupProB != undefined) {
            for (var i = 0; i < groupProB.cells.length; i++) {
              if (i == 0) {
                groupProB.cells[i].isChecked = '1';
                groupPrice += parseFloat(groupProB.cells[i].price) * 100;
              } else {
                groupProB.cells[i].isChecked = '0';
              }
              if (groupProB.cells[i].isSoldOut || (groupProB.cells[i].stockNum < groupProB.cells[i].maxNum && groupProB.cells[i].stockNum != 0)) {
                that.setData({
                   isHiddenScreenStatus: true,
                })
                wx.showToast({
                  title: '餐品售罄',
                  icon: 'none',
                  duration: 2000
                })
                return
              }
              if (groupProB.cells[i].property) {
                that.narurefunc(groupProB.cells[i], 'groupProB', 'group', 'yes')
              }
            }
            that.setData({
              groupProBview: true,
              groupProB: groupProB,
            })
          } else {
            that.setData({
              groupProBview: false,
              groupProB: []
            })
          }
          if (groupProC != undefined) {
            console.log(groupProC.items)
            var issoldflagc = false
            for (var i = 0; i < groupProC.items.length; i++) {
              for (var j = 0; j < groupProC.items[i].cells.length; j++) {
                if (!groupProC.items[i].cells[j].isSoldOut) {
                  issoldflagc = true
                }
              }
            }
            if (!issoldflagc) {
              wx.showToast({
                title: '餐品售罄',
                icon: 'none',
                duration: 2000
              })
              return
            }
            for (var i = 0; i < groupProC.items.length; i++) {
              if (i == 0) {
                groupProC.items[i].isChecked = '1';
              } else {
                groupProC.items[i].isChecked = '0';
              }


              for (var j = 0; j < groupProC.items[i].cells.length; j++) {
                switch (groupProC.items[i].cells[0].isSoldOut) {
                  case false:
                    console.log(22)
                    if (j == 0 && groupProC.items[i].isNeedSelect) {
                      groupProC.items[i].cells[j].isChecked = '1';
                      groupPrice += parseFloat(groupProC.items[i].cells[j].price) * 100;
                      if (groupProC.items[i].cells[j].property) {
                        that.narurefunc(groupProC.items[i].cells[j], 'groupProC', 'group', 'yes')
                      }
                    } else {
                      groupProC.items[i].cells[j].isChecked = '0';
                    }
                    groupProC.items[i].cells[j].index = i;
                    break;
                  case true:
                    console.log(11)
                    if (groupProC.items[i].cells[j].isSoldOut && groupProC.items[i].isNeedSelect) {
                      groupProC.items[i].cells[j + 1].isChecked = '1';
                      groupPrice += parseFloat(groupProC.items[i].cells[j + 1].price) * 100
                      if (groupProC.items[i].cells[j + 1].property) {
                        that.narurefunc(groupProC.items[i].cells[j + 1], 'groupProC', 'group', 'yes')
                      }
                    } else if (groupProC.items[i].cells[j].isChecked == '1' && !groupProC.items[i].cells[j].isSoldOut) {
                    } else {
                      groupProC.items[i].cells[j].isChecked = '0';
                    }
                    groupProC.items[i].cells[j].index = i;
                    break;

                }
              }
            }
            that.setData({
              groupProCview: true,
              groupProC: groupProC,
              _groupc: groupProC.items[0],
            })
          } else {
            that.setData({
              groupProCview: false,
              groupProC: []
            })
          }
          if (groupProD != undefined && groupProD != 'undefined') {
            for (var i = 0; i < groupProD.items.length; i++) {
              if (i == 0) {
                groupProD.items[i].isChecked = '1';
              } else {
                groupProD.items[i].isChecked = '0';
              }

              for (var j = 0; j < groupProD.items[i].cells.length; j++) {
                groupProD.items[i].cells[j].num = 0;
                groupProD.items[i].cells[j].index = i;
              }

            }
            that.setData({
              groupProDview: true,
              groupProD: groupProD,
              _groupD: groupProD.items[0],
            })
          } else {
            that.setData({
              groupProDview: false,
              groupProD: []
            })
          }
          if (groupProBF != undefined && groupProBF.cells.length > 0) {
            for (var i = 0; i < groupProBF.cells.length; i++) {
              if (i == 0) {
                groupProBF.cells[i].isChecked = '1';
                groupPrice += parseFloat(groupProBF.cells[i].price) * 100;
              } else {
                groupProBF.cells[i].isChecked = '0';
              }
              if (groupProBF.cells[i].isSoldOut || (groupProBF.cells[i].stockNum < groupProBF.cells[i].maxNum && groupProBF.cells[i].stockNum != 0)) {
                wx.showToast({
                  title: '餐品售罄',
                  icon: 'none',
                  duration: 2000
                })
                return
              }
              if (groupProBF.cells[i].property) {
                that.narurefunc(groupProBF.cells[i], 'groupProBF', 'group', 'yes')
              }
            }
            that.setData({
              groupProBviewF: true,
              groupProBF: groupProBF,
            })
          } else {
            that.setData({
              groupProBviewF: false,
              groupProBF: []
            })
          }
          if (groupProCF != undefined) {
            console.log(groupProCF.items)
            var issoldflag = false
            for (var i = 0; i < groupProCF.items.length; i++) {
              for (var j = 0; j < groupProCF.items[i].cells.length; j++) {
                if (!groupProCF.items[i].cells[j].isSoldOut) {
                  issoldflag = true
                }
              }
            }
            if (!issoldflag) {
              wx.showToast({
                title: '餐品售罄',
                icon: 'none',
                duration: 2000
              })
              return
            }
            for (var i = 0; i < groupProCF.items.length; i++) {
              if (i == 0) {
                groupProCF.items[i].isChecked = '1';
              } else {
                groupProCF.items[i].isChecked = '0';
              }

              for (var j = 0; j < groupProCF.items[i].cells.length; j++) {
                switch (groupProCF.items[i].cells[0].isSoldOut) {
                  case false:
                    if (j == 0 && groupProCF.items[i].isNeedSelect) {
                      groupProCF.items[i].cells[j].isChecked = '1';
                      groupPrice += parseFloat(groupProCF.items[i].cells[j].price) * 100;
                      if (groupProCF.items[i].cells[j].property) {
                        that.narurefunc(groupProCF.items[i].cells[j], 'groupProCF', 'group', 'yes')
                      }
                    } else {
                      groupProCF.items[i].cells[j].isChecked = '0';
                    }
                    groupProCF.items[i].cells[j].index = i;
                    break;
                  case true:
                    if (groupProCF.items[i].cells[j].isSoldOut && groupProCF.items[i].isNeedSelect) {
                      groupProCF.items[i].cells[j + 1].isChecked = '1';
                      groupPrice += parseFloat(groupProCF.items[i].cells[j + 1].price) * 100
                      if (groupProCF.items[i].cells[j + 1].property) {
                        that.narurefunc(groupProCF.items[i].cells[j + 1], 'groupProCF', 'group', 'yes')
                      }
                    } else if (groupProCF.items[i].cells[j].isChecked == '1' && !groupProCF.items[i].cells[j].isSoldOut) {
                    } else {
                      groupProCF.items[i].cells[j].isChecked = '0';
                    }
                    groupProCF.items[i].cells[j].index = i;
                    break;

                }
              }
            }
            that.setData({
              groupProCviewF: true,
              groupProCF: groupProCF,
              _groupcF: groupProCF.items[0],
            })
          } else {
            that.setData({
              groupProCviewF: false,
              groupProCF: []
            })
          }
          if (groupProDF != undefined && groupProDF != 'undefined') {
            console.log(groupProDF.items)
            for (var i = 0; i < groupProDF.items.length; i++) {
              if (i == 0) {
                groupProDF.items[i].isChecked = '1';
              } else {
                groupProDF.items[i].isChecked = '0';
              }

              for (var j = 0; j < groupProDF.items[i].cells.length; j++) {
                groupProDF.items[i].cells[j].num = 0;
                groupProDF.items[i].cells[j].index = i;
              }
            }
            that.setData({
              groupProDviewF: true,
              groupProDF: groupProDF,
              _groupDF: groupProDF.items[0],
            })
          } else {
            that.setData({
              groupProDviewF: false,
              groupProDF: []
            })
          }
          groupPrice += parseFloat(res.data.data.price) * 100;
          groupPrice += parseFloat(that.data.groupPrice_);
          that.setData({
            mainFoodAreas: res.data.data.mainFoodAreas,
            isHiddenScreenStatus: false,
            Groupid: res.data.data.pid,
            isGroup: false,
            groupData: res.data.data,
            groupPro: res.data.data.mainFoodAreas,
            groupProA: groupProA,
            groupPrice: groupPrice,
            menuIdddd: res.data.data.pid,
          })
        }else{
          wx.showToast({
            title: res.data.msg,
            icon: 'none'
          })
        }
         
      }
    })
    
  },
  seetextornot(e) {
    console.log(e)
    console.log(this.data.menuPro)
    var arr = this.data.menuPro
    var i = e.currentTarget.dataset.i
    if (!e.currentTarget.dataset.info.see) {
      arr[i].see = true
    } else {
      arr[i].see = false
    }
    this.setData({
      menuPro: arr
    })
  },
  btndroupDAdd(e) {
    console.log(e)
    var that = this
    var groupProD = that.data.groupProD
    var i = e.currentTarget.dataset.item
    var ii = i.index
    var y = e.currentTarget.dataset.y
    var groupPrice = that.data.groupPrice
    if (e.currentTarget.dataset.item.isSoldOut) {
      wx.showToast({
        title: '该餐品售罄',
        icon: 'none',
        duration: 2000
      })
      return
    }
    if (i.hasStock && i.num >= i.stockNum) {
      wx.showToast({
        title: '库存不足',
        icon: 'none',
        duration: 2000
      })
      return
    }
    if (i.maxNum != 0 && i.num >= i.maxNum) {
      wx.showToast({
        title: '已达到本餐品最大限制数',
        icon: 'none',
        duration: 2000
      })
      return
    }
    if (groupProD.items[ii].maxNum != 0) {
      var Dnum = 0
      for (var j = 0; j < groupProD.items[ii].cells.length; j++) {
        Dnum += groupProD.items[ii].cells[j].num
      }
      if (Dnum >= groupProD.items[ii].maxNum) {
        wx.showToast({
          title: '已达到本分组最大限制数',
          icon: 'none',
          duration: 2000
        })
        return
      }
    }
    groupProD.items[ii].cells[y].num++
    groupPrice += parseFloat(groupProD.items[ii].cells[y].price) * 100 * that.data.groupnum;
    that.setData({ groupPrice: groupPrice })
    if (groupProD.items[ii].cells[y].property) {
      that.narurefunc(groupProD.items[ii].cells[y], 'groupProD', 'group', 'no')
    }
    that.setData({
      groupProD: groupProD,
      _groupD: groupProD.items[ii],
    })

  },
  btndroupDAddF(e) {
    console.log(e)
    var that = this
    var groupProDF = that.data.groupProDF
    var i = e.currentTarget.dataset.item
    var ii = i.index
    var y = e.currentTarget.dataset.y
    var groupPrice = that.data.groupPrice
    if (e.currentTarget.dataset.item.isSoldOut) {
      wx.showToast({
        title: '该餐品售罄',
        icon: 'none',
        duration: 2000
      })
      return
    }
    if (i.hasStock && i.num >= i.stockNum) {
      wx.showToast({
        title: '库存不足',
        icon: 'none',
        duration: 2000
      })
      return
    }
    if (i.maxNum != 0 && i.num >= i.maxNum) {
      wx.showToast({
        title: '已达到本餐品最大限制数',
        icon: 'none',
        duration: 2000
      })
      return
    }
    if (groupProDF.items[ii].maxNum != 0) {
      var Dnum = 0
      for (var j = 0; j < groupProDF.items[ii].cells.length; j++) {
        Dnum += groupProDF.items[ii].cells[j].num
      }
      if (Dnum >= groupProDF.items[ii].maxNum) {
        wx.showToast({
          title: '已达到本分组最大限制数',
          icon: 'none',
          duration: 2000
        })
        return
      }
    }
    groupProDF.items[ii].cells[y].num++
    groupPrice += parseFloat(groupProDF.items[ii].cells[y].price) * 100 * that.data.groupnum;

    that.setData({ groupPrice: groupPrice })
    if (groupProDF.items[ii].cells[y].property) {
      that.narurefunc(groupProDF.items[ii].cells[y], 'groupProDF', 'group', 'no')
    }
    that.setData({
      groupProDF: groupProDF,
      _groupDF: groupProDF.items[ii],
    })


  },
  btngroupDSub(e) {
    var that = this
    var groupProD = that.data.groupProD
    var i = e.currentTarget.dataset.item
    var ii = i.index
    var y = e.currentTarget.dataset.y
    var groupPrice = that.data.groupPrice
    groupProD.items[ii].cells[y].num--
    groupPrice -= parseFloat(groupProD.items[ii].cells[y].price) * 100 * this.data.groupnum;

    that.setData({ groupPrice: groupPrice })
    if (groupProD.items[ii].cells[y].property) {
      this.subgroupprice(groupProD.items[ii].cells[y], 'groupProD')
    }
    that.setData({
      groupProD: groupProD,
      _groupD: groupProD.items[ii],
    })

  },
  btngroupDSubF(e) {
    var that = this
    var groupProDF = that.data.groupProDF
    var i = e.currentTarget.dataset.item
    var ii = i.index
    var y = e.currentTarget.dataset.y
    var groupPrice = that.data.groupPrice
    groupProDF.items[ii].cells[y].num--
    groupPrice -= parseFloat(groupProDF.items[ii].cells[y].price) * 100 * that.data.groupnum;

    that.setData({ groupPrice: groupPrice })
    if (groupProDF.items[ii].cells[y].property) {
      that.subgroupprice(groupProDF.items[ii].cells[y], 'groupProDF')
    }
    that.setData({
      groupProDF: groupProDF,
      _groupDF: groupProDF.items[ii],

    })

  },
  change_groupc(e) {
    console.log(e)
    var cc = e.currentTarget.dataset.item
    var i = e.currentTarget.dataset.y
    var groupProC = this.data.groupProC

    for (var j = 0; j < groupProC.items.length; j++) {
      if (j == i) {
        groupProC.items[j].isChecked = '1'
      } else {
        groupProC.items[j].isChecked = '0'
      }
    }
    this.setData({
      groupProC: groupProC,
      _groupc: groupProC.items[i]
    })
  },
  change_groupcF(e) {
    var cc = e.currentTarget.dataset.item
    var i = e.currentTarget.dataset.y
    var groupProCF = this.data.groupProCF

    for (var j = 0; j < groupProCF.items.length; j++) {
      if (j == i) {
        groupProCF.items[j].isChecked = '1'
      } else {
        groupProCF.items[j].isChecked = '0'
      }
    }
    this.setData({
      groupProCF: groupProCF,
      _groupcF: groupProCF.items[i]
    })
  },
  change_groupd(e) {
    console.log(e)
    var cc = e.currentTarget.dataset.item
    var i = e.currentTarget.dataset.y
    var groupProD = this.data.groupProD

    for (var j = 0; j < groupProD.items.length; j++) {
      if (j == i) {
        groupProD.items[j].isChecked = '1'
      } else {
        groupProD.items[j].isChecked = '0'
      }
    }
    console.log(this.data.groupProD)
    this.setData({
      groupProD: groupProD,
      _groupD: groupProD.items[i]
    })
  },
  change_groupdF(e) {
    console.log(e)
    var cc = e.currentTarget.dataset.item
    var i = e.currentTarget.dataset.y
    var groupProDF = this.data.groupProDF

    for (var j = 0; j < groupProDF.items.length; j++) {
      if (j == i) {
        groupProDF.items[j].isChecked = '1'
      } else {
        groupProDF.items[j].isChecked = '0'
      }
    }
    this.setData({
      groupProDF: groupProDF,
      _groupDF: groupProDF.items[i]
    })
  },
  proGroupSelected(e) {
    console.log(e)
    var y = e.currentTarget.dataset.y;
    var groupProA = this.data.groupProA
    var groupPrice = this.data.groupPrice
    var groupPrice_ = this.data.groupPrice_
    if (e.currentTarget.dataset.info.isChecked == "1" || e.currentTarget.dataset.info.isSoldOut) {
      return
    }
    for (var i = 0; i < groupProA.cells.length; i++) {
      if (i == y) {
        console.log(groupProA.cells[i])
        groupProA.cells[i].isChecked = '1';
        groupPrice -= groupPrice_
        this.setData({
          groupPrice: groupPrice
        })
        if (groupProA.cells[i].property) {
          this.narurefunc(groupProA.cells[i], 'groupProA', 'group', 'no')
        } else {
          this.setData({
            isNatureA: true,
            groupPrice_: 0
          })
        }
      } else {

        groupProA.cells[i].isChecked = '0';
      }
    }


    this.setData({
      groupProA: groupProA,
    })


  },
  btn_groupc_method: function (e) {
    console.log(e)
    var z = e.currentTarget.dataset.info
    var i = e.currentTarget.dataset.item
    var ii = i.index
    var groupPrice = this.data.groupPrice
    var groupProC = this.data.groupProC
    var csub = true
    var csub2 = false
    console.log(groupProC)
    console.log(groupProC.items[ii])
    if (i.isSoldOut) {
      return
    }
    for (var v = 0; v < groupProC.items[ii].cells.length; v++) {
      if (groupProC.items[ii].cells[v].isChecked == '1') {
        csub = false
      }
    }
    if (groupProC.items[ii].canSelectNum == 1) {
      for (var k = 0; k < groupProC.items[ii].cells.length; k++) {
        if (k == z && groupProC.items[ii].cells[z].isChecked == '1') {
          if (groupProC.items[ii].isNeedSelect) {

          } else {
            console.log('jin')
            groupProC.items[ii].cells[z].isChecked = '0'
            var groupPrice = this.data.groupPrice
            csub2 = true
            groupPrice -= parseFloat(groupProC.items[ii].cells[z].price) * 100 * this.data.groupnum;
            this.setData({
              groupPrice: groupPrice
            })
            if (groupProC.items[ii].cells[z].property) {
              this.subgroupprice(groupProC.items[ii].cells[z], 'groupProC')
            }
          }

        } else if (k == z && groupProC.items[ii].cells[z].isChecked == '0') {
          console.log(groupProC.items[ii].cells[z])
          groupProC.items[ii].cells[z].isChecked = '1'
          var groupPrice = this.data.groupPrice
          groupPrice += parseFloat(groupProC.items[ii].cells[z].price) * 100 * this.data.groupnum;
          this.setData({
            groupPrice: groupPrice
          })
          if (groupProC.items[ii].cells[z].property) {
            this.narurefunc(groupProC.items[ii].cells[z], 'groupProC', 'group', 'no')
          }
        } else {

          if ((groupProC.items[ii].isNeedSelect || groupProC.items[ii].canSelectNum == 1) && groupProC.items[ii].cells[k].isChecked == '1') {
            groupProC.items[ii].cells[k].isChecked = '0'
            if (csub) { } else if (csub2) { } else {
              var groupPrice = this.data.groupPrice
              groupPrice -= parseFloat(groupProC.items[ii].cells[k].price) * 100 * this.data.groupnum;
              this.setData({
                groupPrice: groupPrice,

              })
              console.log(groupProC.items[ii].cells[k])
              if (groupProC.items[ii].cells[k].property) {
                this.subgroupprice(groupProC.items[ii].cells[k], 'groupProC')
              }
            }
          }
          // if()
        }
      }
    } else {
      if (groupProC.items[ii].cells[z].isChecked == '1') {
        if (groupProC.items[ii].isNeedSelect) {
          return
        } else {
          groupProC.items[ii].cells[z].isChecked = '0'
          var groupPrice = this.data.groupPrice
          groupPrice -= parseFloat(groupProC.items[ii].cells[z].price) * 100 * this.data.groupnum;
          this.setData({
            groupPrice: groupPrice
          })
          if (groupProC.items[ii].cells[z].property) {
            this.subgroupprice(groupProC.items[ii].cells[z], 'groupProC')
          }
        }

      } else {
        groupProC.items[ii].cells[z].isChecked = '1'
        var groupPrice = this.data.groupPrice

        groupPrice += parseFloat(groupProC.items[ii].cells[z].price) * 100 * this.data.groupnum;
        this.setData({
          groupPrice: groupPrice
        })
        if (groupProC.items[ii].cells[z].property) {
          this.narurefunc(groupProC.items[ii].cells[z], 'groupProC', 'group', 'no')
        }
      }
    }
    var groupPrice = this.data.groupPrice
    this.setData({
      groupProC: groupProC,
      _groupc: groupProC.items[ii],
      groupPrice: groupPrice
    })
  },
  btn_groupc_methodF(e) {
    console.log(e)
    var z = e.currentTarget.dataset.info
    var i = e.currentTarget.dataset.item
    var ii = i.index
    var groupPrice = this.data.groupPrice
    var groupProCF = this.data.groupProCF
    var csub = true
    var csub2 = false
    if (i.isSoldOut) {
      return
    }
    console.log(groupProCF.items[ii])
    console.log(groupProCF.items[ii].cells[z])
    console.log(z)
    for (var v = 0; v < groupProCF.items[ii].cells.length; v++) {
      if (groupProCF.items[ii].cells[v].isChecked == '1') {
        csub = false
      }
    }
    if (groupProCF.items[ii].canSelectNum == 1) {
      for (var k = 0; k < groupProCF.items[ii].cells.length; k++) {
        if (k == z && groupProCF.items[ii].cells[z].isChecked == '1') {
          console.log('1111')
          if (groupProCF.items[ii].isNeedSelect) {
            return
          } else {
            console.log(1222)
            groupProCF.items[ii].cells[z].isChecked = '0'
            var groupPrice = this.data.groupPrice
            csub2 = true
            groupPrice -= parseFloat(groupProCF.items[ii].cells[z].price) * 100 * this.data.groupnum;
            this.setData({
              groupPrice: groupPrice
            })
            if (groupProCF.items[ii].cells[z].property) {
              this.subgroupprice(groupProCF.items[ii].cells[z], 'groupProCF')
            }
          }
        } else if (k == z && groupProCF.items[ii].cells[z].isChecked == '0') {
          groupProCF.items[ii].cells[z].isChecked = '1'

          var groupPrice = this.data.groupPrice
          groupPrice += parseFloat(groupProCF.items[ii].cells[z].price) * 100 * this.data.groupnum;
          this.setData({
            groupPrice: groupPrice
          })
          if (groupProCF.items[ii].cells[z].property) {
            this.narurefunc(groupProCF.items[ii].cells[z], 'groupProCF', 'group', 'no')
          }
        } else {
          if ((groupProCF.items[ii].isNeedSelect || groupProCF.items[ii].canSelectNum == 1) && groupProCF.items[ii].cells[k].isChecked == '1') {
            groupProCF.items[ii].cells[k].isChecked = '0'
            if (csub) { } else if (csub2) { } else {
              var groupPrice = this.data.groupPrice
              groupPrice -= parseFloat(groupProCF.items[ii].cells[k].price) * 100 * this.data.groupnum;
              this.setData({
                groupPrice: groupPrice,

              })
              if (groupProCF.items[ii].cells[k].property) {
                this.subgroupprice(groupProCF.items[ii].cells[k], 'groupProCF')
              }
            }
          }
        }
      }
    } else {
      if (groupProCF.items[ii].cells[z].isChecked == '1') {
        if (groupProCF.items[ii].isNeedSelect) {
          return
        } else {
          groupProCF.items[ii].cells[z].isChecked = '0'
          var groupPrice = this.data.groupPrice
          groupPrice -= parseFloat(groupProCF.items[ii].cells[z].price) * 100 * this.data.groupnum;
          this.setData({
            groupPrice: groupPrice
          })
          if (groupProCF.items[ii].cells[z].property) {
            this.subgroupprice(groupProCF.items[ii].cells[z], 'groupProCF')
          }
        }

      } else {
        groupProCF.items[ii].cells[z].isChecked = '1'
        var groupPrice = this.data.groupPrice
        groupPrice += parseFloat(groupProCF.items[ii].cells[z].price) * 100 * this.data.groupnum;
        this.setData({
          groupPrice: groupPrice
        })
        if (groupProCF.items[ii].cells[z].property) {
          this.narurefunc(groupProCF.items[ii].cells[z], 'groupProCF', 'group', 'no')
        }
      }
    }
    var groupPrice = this.data.groupPrice
    this.setData({
      groupProCF: groupProCF,
      _groupcF: groupProCF.items[ii],
      groupPrice: groupPrice
    })
  },
  subgroupprice(res, type) {
    console.log(res, type)
    var naturePro = res.property.propertys;
    var naturePro_ = res.property.standard;
    var choices = res.property.choices;

    var groupPrice_ = 0;
    var groupPrice = this.data.groupPrice
    if (choices) {
      console.log(choices)

      for (var j = 0; j < choices.items.length; j++) {
        if (choices.items[j].isChecked == '1') {
          groupPrice_ += parseFloat(choices.items[j].price) * 100 * this.data.groupnum;
          if (type == 'groupProD' || type == 'groupProDF' && res.num > 0) {

          } else {
            choices.items[j].isChecked = '0';
          }
        }

      }

    }
    if (naturePro) {
      for (var i = 0; i < naturePro.length; i++) {
        for (var j = 0; j < naturePro[i].items.length; j++) {
          if (naturePro[i].items[j].isChecked == '1') {
            groupPrice_ += parseFloat(naturePro[i].items[j].price) * 100 * this.data.groupnum;
          }
        }
      }
    }
    if (naturePro_) {
      for (var j = 0; j < naturePro_.items.length; j++) {
        if (naturePro_.items[j].isChecked == '1') {
          groupPrice_ += parseFloat(naturePro_.items[j].price) * 100 * this.data.groupnum;
        }
      }
    }
    groupPrice -= groupPrice_
    this.setData({
      groupPrice: groupPrice,
    })
  },
  proListLiSelectedB: function (e) {
    console.log(e)
    var item = e.currentTarget.dataset
    var name = item.name
    if (e.currentTarget.dataset.info.isChecked == "1") {
      return
    }
    if (e.currentTarget.dataset.info.isSoldOut) {
      return
    }
    switch (name) {
      case 'nameB': var bb = this.data.groupProB; var naturePro = bb.cells[item.q].property.propertys; break;
      case 'nameC': var z = e.currentTarget.dataset.q; var i = e.currentTarget.dataset.item
        var ii = i.index; var cc = this.data.groupProC; var naturePro = cc.items[ii].cells[z].property.propertys; break;
      case 'nameD': var z = e.currentTarget.dataset.q; var i = e.currentTarget.dataset.item; var ii = i.index;
        var dd = this.data.groupProD; var naturePro = dd.items[ii].cells[z].property.propertys; break;
      case 'nameBF': var bb = this.data.groupProBF; var naturePro = bb.cells[item.q].property.propertys; break;
      case 'nameCF': var z = e.currentTarget.dataset.q; var i = e.currentTarget.dataset.item
        var ii = i.index; var ccf = this.data.groupProCF; var naturePro = ccf.items[ii].cells[z].property.propertys; break;
      case 'nameDF': var z = e.currentTarget.dataset.q; var i = e.currentTarget.dataset.item; var ii = i.index;
        var dd = this.data.groupProDF; var naturePro = dd.items[ii].cells[z].property.propertys; break;
    }
    var groupPrice = this.data.groupPrice
    var groupPrice_ = this.data.groupPrice_
    var specialOfferPrice = this.data.specialOfferPrice;

    console.log(naturePro)
    for (var i = 0; i < naturePro[e.currentTarget.dataset.z].items.length; i++) {
      if (e.currentTarget.dataset.y == i) {

        naturePro[e.currentTarget.dataset.z].items[i].isChecked = '1';
        if (name == 'nameB' || name == 'nameBF') {
          groupPrice += parseFloat(naturePro[e.currentTarget.dataset.z].items[i].price) * 100 * this.data.groupnum * bb.cells[item.q].maxNum;
          groupPrice_ += parseFloat(naturePro[e.currentTarget.dataset.z].items[i].price) * 100 * this.data.groupnum * bb.cells[item.q].maxNum;
        } else if (name == 'nameD' || name == 'nameDF') {
          groupPrice += parseFloat(naturePro[e.currentTarget.dataset.z].items[i].price) * 100 * this.data.groupnum * dd.items[ii].cells[z].num;
          groupPrice_ += parseFloat(naturePro[e.currentTarget.dataset.z].items[i].price) * 100 * this.data.groupnum * dd.items[ii].cells[z].num;
        } else {
          groupPrice += parseFloat(naturePro[e.currentTarget.dataset.z].items[i].price) * 100 * this.data.groupnum;
          groupPrice_ += parseFloat(naturePro[e.currentTarget.dataset.z].items[i].price) * 100 * this.data.groupnum;
        }

        if (naturePro[e.currentTarget.dataset.z].items[i].costPrice > 0) {
          specialOfferPrice += naturePro[e.currentTarget.dataset.z].items[i].costPrice;
        } else {
          specialOfferPrice += parseFloat(naturePro[e.currentTarget.dataset.z].items[i].price) * 100;
        }
      } else {
        if (naturePro[e.currentTarget.dataset.z].items[i].isChecked == '1') {
          if (name == 'nameB' || name == 'nameBF') {
            groupPrice -= parseFloat(naturePro[e.currentTarget.dataset.z].items[i].price) * 100 * this.data.groupnum * bb.cells[item.q].maxNum;
            groupPrice_ -= parseFloat(naturePro[e.currentTarget.dataset.z].items[i].price) * 100 * this.data.groupnum * bb.cells[item.q].maxNum;
          } else if (name == 'nameD' || name == 'nameDF') {
            groupPrice -= parseFloat(naturePro[e.currentTarget.dataset.z].items[i].price) * 100 * this.data.groupnum * dd.items[ii].cells[z].num;
            groupPrice_ -= parseFloat(naturePro[e.currentTarget.dataset.z].items[i].price) * 100 * this.data.groupnum * dd.items[ii].cells[z].num;
          } else {
            groupPrice -= parseFloat(naturePro[e.currentTarget.dataset.z].items[i].price) * 100 * this.data.groupnum;
            groupPrice_ -= parseFloat(naturePro[e.currentTarget.dataset.z].items[i].price) * 100 * this.data.groupnum;
          }

          if (naturePro[e.currentTarget.dataset.z].items[i].costPrice > 0) {
            specialOfferPrice -= naturePro[e.currentTarget.dataset.z].items[i].costPrice;
          } else {
            specialOfferPrice -= parseFloat(naturePro[e.currentTarget.dataset.z].items[i].price) * 100;
          }
        }
        naturePro[e.currentTarget.dataset.z].items[i].isChecked = '0';
      }
    }
    console.log(cc)
    switch (name) {
      case 'nameB': this.setData({ groupProB: bb }); break;
      case 'nameC': this.setData({ groupProC: cc, _groupc: cc.items[ii], }); break;
      case 'nameD': this.setData({ groupPrD: dd, _groupD: dd.items[ii] }); break;
      case 'nameBF': this.setData({ groupProBF: bb }); break;
      case 'nameCF': this.setData({ groupProCF: ccf, _groupcF: ccf.items[ii] }); break;
      case 'nameDF': this.setData({ groupProDF: dd, _groupDF: dd.items[ii] }); break;
    }
    this.setData({
      groupPrice_: groupPrice_,
      groupPrice: groupPrice,
    })
  },
  proListLiSelectedB_(e) {
    console.log(e)
    var item = e.currentTarget.dataset
    var name = item.name
    if (e.currentTarget.dataset.info.isChecked == "1") {
      return
    }
    if (e.currentTarget.dataset.info.isSoldOut) {
      return
    }
    switch (name) {
      case 'nameB': var bb = this.data.groupProB; console.log(bb.cells[item.q]); var naturePro_ = bb.cells[item.q].property.standard; break;
      case 'nameC': var z = e.currentTarget.dataset.q; var i = e.currentTarget.dataset.item; var ii = i.index;
        var cc = this.data.groupProC; var naturePro_ = cc.items[ii].cells[z].property.standard; break;
      case 'nameD': var z = e.currentTarget.dataset.q; var i = e.currentTarget.dataset.item; var ii = i.index;
        var dd = this.data.groupProD; var naturePro_ = dd.items[ii].cells[z].property.standard; console.log(dd.items[ii].cells[z])
        break;
      case 'nameBF': var bb = this.data.groupProBF; var naturePro_ = bb.cells[item.q].property.standard; break;
      case 'nameCF': var z = e.currentTarget.dataset.q; var i = e.currentTarget.dataset.item
        var ii = i.index;//0
        var ccf = this.data.groupProCF;
        var naturePro_ = ccf.items[ii].cells[z].property.standard; break;
      case 'nameDF': var z = e.currentTarget.dataset.q; var i = e.currentTarget.dataset.item; var ii = i.index;
        var dd = this.data.groupProDF; var naturePro_ = dd.items[ii].cells[z].property.standard; console.log(dd.items[ii].cells[z]); break;
    }
    console.log(name)
    var groupPrice = this.data.groupPrice;
    var groupPrice_ = this.data.groupPrice_;

    var specialOfferPrice = this.data.specialOfferPrice;
    for (var i = 0; i < naturePro_.items.length; i++) {
      console.log(i, e.currentTarget.dataset.y)
      if (e.currentTarget.dataset.y == i) {
        naturePro_.items[i].isChecked = '1';
        if (name == 'nameB' || name == 'nameBF') {
          groupPrice += parseFloat(naturePro_.items[i].price) * 100 * this.data.groupnum * bb.cells[item.q].maxNum;
          groupPrice_ += parseFloat(naturePro_.items[i].price) * 100 * this.data.groupnum * bb.cells[item.q].maxNum;
        } else if (name == 'nameD' || name == 'nameDF') {
          groupPrice += parseFloat(naturePro_.items[i].price) * 100 * this.data.groupnum * dd.items[ii].cells[z].num;
          groupPrice_ += parseFloat(naturePro_.items[i].price) * 100 * this.data.groupnum * dd.items[ii].cells[z].num;
        } else {
          groupPrice += parseFloat(naturePro_.items[i].price) * 100 * this.data.groupnum;
          groupPrice_ += parseFloat(naturePro_.items[i].price) * 100 * this.data.groupnum;
        }

        if (naturePro_.items[i].costPrice > 0) {
          specialOfferPrice += naturePro_.items[i].costPrice;
        } else {
          specialOfferPrice += parseFloat(naturePro_.items[i].price) * 100;
        }
      } else {
        if (naturePro_.items[i].isChecked == '1') {
          console.log(naturePro_.items[i])
          if (name == 'nameB' || name == 'nameBF') {
            groupPrice -= parseFloat(naturePro_.items[i].price) * 100 * this.data.groupnum * bb.cells[item.q].maxNum;
            groupPrice_ -= parseFloat(naturePro_.items[i].price) * 100 * this.data.groupnum * bb.cells[item.q].maxNum
          } else if (name == 'nameD' || name == 'nameDF') {
            groupPrice -= parseFloat(naturePro_.items[i].price) * 100 * this.data.groupnum * dd.items[ii].cells[z].num;
            groupPrice_ -= parseFloat(naturePro_.items[i].price) * 100 * this.data.groupnum * dd.items[ii].cells[z].num
          } else {
            groupPrice -= parseFloat(naturePro_.items[i].price) * 100 * this.data.groupnum;
            groupPrice_ -= parseFloat(naturePro_.items[i].price) * 100 * this.data.groupnum
          }
          if (naturePro_.items[i].costPrice > 0) {
            specialOfferPrice -= naturePro_.items[i].costPrice;
          } else {
            specialOfferPrice -= parseFloat(naturePro_.items[i].price) * 100;
          }
        }
        naturePro_.items[i].isChecked = '0';
      }
    }
    switch (name) {

      case 'nameB': this.setData({ groupProB: bb }); break;
      case 'nameC': this.setData({
        groupProC: cc,
        _groupc: cc.items[ii],
      }); break;
      case 'nameD': this.setData({ groupPrD: dd, _groupD: dd.items[ii] }); break;
      case 'nameBF': this.setData({ groupProBF: bb }); break;
      case 'nameCF': this.setData({ groupProCF: ccf, _groupcF: ccf.items[ii] }); break;
      case 'nameDF': this.setData({ groupProDF: dd, _groupDF: dd.items[ii] }); break;
    }
    this.setData({
      groupPrice_: groupPrice_,
      groupPrice: groupPrice,
    })
  },
  choicesSelectedB(e) {
    console.log(e)
    var item = e.currentTarget.dataset
    var name = item.name
    switch (name) {
      case 'nameB': var bb = this.data.groupProB; var naturePro_ = bb.cells[item.q].property.choices; break;
      case 'nameC': var z = e.currentTarget.dataset.q; var i = e.currentTarget.dataset.item; var ii = i.index;
        var cc = this.data.groupProC; var naturePro_ = cc.items[ii].cells[z].property.choices; break;
      case 'nameD': var z = e.currentTarget.dataset.q; var i = e.currentTarget.dataset.item; var ii = i.index;
        var dd = this.data.groupProD; var naturePro_ = dd.items[ii].cells[z].property.choices; break;

      case 'nameBF': var bb = this.data.groupProBF; var naturePro_ = bb.cells[item.q].property.choices; break;
      case 'nameCF': var z = e.currentTarget.dataset.q; var i = e.currentTarget.dataset.item
        var ii = i.index; var ccf = this.data.groupProCF; var naturePro_ = ccf.items[ii].cells[z].property.choices; break;
      case 'nameDF': var z = e.currentTarget.dataset.q; var i = e.currentTarget.dataset.item; var ii = i.index;
        var dd = this.data.groupProDF; var naturePro_ = dd.items[ii].cells[z].property.choices; break;
      case 'naturechoices': var naturePro_ = this.data.choicesnature; break;
    }
    var groupPrice = this.data.groupPrice;
    var groupPrice_ = this.data.groupPrice_;
    var specialOfferPrice = this.data.specialOfferPrice;
    var i = e.currentTarget.dataset.y
    console.log(naturePro_.items[i])
    if (naturePro_.items[i].isChecked == '1') {
      if (name == 'nameDF' || name == 'nameD') {
        groupPrice -= parseFloat(naturePro_.items[i].price) * 100 * this.data.groupnum * dd.items[ii].cells[z].num;
        groupPrice_ -= parseFloat(naturePro_.items[i].price) * 100 * this.data.groupnum * dd.items[ii].cells[z].num;
      } else if (name == 'nameBF' || name == 'nameB') {
        groupPrice -= parseFloat(naturePro_.items[i].price) * 100 * this.data.groupnum * bb.cells[item.q].maxNum;
        groupPrice_ -= parseFloat(naturePro_.items[i].price) * 100 * this.data.groupnum * bb.cells[item.q].maxNum;
      } else {
        groupPrice -= parseFloat(naturePro_.items[i].price) * 100 * this.data.groupnum;
        groupPrice_ -= parseFloat(naturePro_.items[i].price) * 100 * this.data.groupnum;
      }

      if (naturePro_.items[i].costPrice > 0) {
        specialOfferPrice -= naturePro_.items[i].costPrice;
      } else {
        specialOfferPrice -= parseFloat(naturePro_.items[i].price) * 100;
      }
      naturePro_.items[i].isChecked = '0';
    } else {
      if (name == 'nameDF' || name == 'nameD') {
        groupPrice += parseFloat(naturePro_.items[i].price) * 100 * this.data.groupnum * dd.items[ii].cells[z].num;
        groupPrice_ += parseFloat(naturePro_.items[i].price) * 100 * this.data.groupnum * dd.items[ii].cells[z].num;
      } else if (name == 'nameBF' || name == 'nameB') {
        groupPrice += parseFloat(naturePro_.items[i].price) * 100 * this.data.groupnum * bb.cells[item.q].maxNum;
        groupPrice_ += parseFloat(naturePro_.items[i].price) * 100 * this.data.groupnum * bb.cells[item.q].maxNum;
      } else {
        groupPrice += parseFloat(naturePro_.items[i].price) * 100 * this.data.groupnum;
        groupPrice_ += parseFloat(naturePro_.items[i].price) * 100 * this.data.groupnum;
      }

      if (naturePro_.items[i].costPrice > 0) {
        specialOfferPrice += naturePro_.items[i].costPrice;
      } else {
        specialOfferPrice += parseFloat(naturePro_.items[i].price) * 100;
      }
      naturePro_.items[i].isChecked = '1';
    }
    switch (name) {
      case 'nameB': this.setData({ groupProB: bb }); break;
      case 'nameC': this.setData({ groupProC: cc, _groupc: cc.items[ii], }); break;
      case 'nameD': this.setData({ groupPrD: dd, _groupD: dd.items[ii] }); break;
      case 'nameBF': this.setData({ groupProBF: bb }); break;
      case 'nameCF': this.setData({ groupProCF: ccf, _groupcF: ccf.items[ii] }); break;
      case 'nameDF': this.setData({ groupProDF: dd, _groupDF: dd.items[ii] }); break;
      case 'naturechoices': this.setData({ choicesnature: naturePro_ }); break;
    }
    this.setData({
      groupPrice_: groupPrice_,
      groupPrice: groupPrice,
    })
  },
  group_image_add_click() {

    var that = this
    var goodsObj = {};
    var natureObj = {};
    var natureMealFee = that.data.natureMealFee;
    var res = that.data.grouppppro
    var menuPro = that.data.menuPro;
    var typePro = that.data.typePro;
    var menuProArray = that.data.menuProArray;
    var goodsObj = {};
    var allMenu = that.data.allMenu;
    var typeId = that.data.typeId;
    var specialOfferPrice = that.data.specialOfferPrice;
    console.log(specialOfferPrice)
    var item = res.currentTarget.dataset.item;
    var mealFeeMoney = that.data.mealFeeMoney;

    console.log('mealFeeMoney', mealFeeMoney)

    var groupspro = []
    var groups = []
    var groupsF = []
    var groupsobj = {}
    var groupsobj_ = {}
    var exAreaobj = {}
    var mains = []
    var exArea = []

    var menuName = that.data.menuName;
    var menuId = that.data.menuIdddd;
    var menuPrice = that.data.menuPrice;
    var Groupid = that.data.Groupid
    var groupProA = that.data.groupProA
    var groupProB = that.data.groupProB
    var groupProC = that.data.groupProC
    var groupProD = that.data.groupProD
    var groupProBF = that.data.groupProBF
    var groupProCF = that.data.groupProCF
    var groupProDF = that.data.groupProDF

    var groupId = '';
    var groupName = '';
    var groupPrice = that.data.groupPrice;
    var goodsObj = {};
    var groupObj = {};
    var costPrice = that.data.costPrice;

    var groupMealFee = that.data.groupMealFee;

    console.log(groupProA)
    if (groupProA.cells) {
      if (groupProA.cells.length > 0) {
        for (var i = 0; i < groupProA.cells.length; i++) {
          var bb = {}
          var cc = {}
          var dd = []
          if (groupProA.cells[i].isChecked == '1') {
            groupId += groupProA.cells[i].pid + '' + i + ",";
            groupsobj['mid'] = that.data.mainFoodAreas[0].areaId;  //areaid
            groupsobj['name'] = that.data.mainFoodAreas[0].title;//title
            // cc['itemIndex'] = 0
            cc['index'] = i
            cc['pid'] = groupProA.cells[i].pid
            cc['price'] = groupProA.cells[i].price
            cc['num'] = groupProA.cells[i].maxNum
            cc['name'] = groupProA.cells[i].name
            if (groupProA.cells[i].property) {
              cc['listPropertys'] = that.groupNature(that.data.naturePro, that.data.naturePro_, that.data.choices, groupProA.cells[i].maxNum);
              groupId += that.data.groupnatureid
            }
            dd.push(cc)
            bb['type'] = groupProA.type
            bb['name'] = groupProA.title
            bb['products'] = dd
            console.log(bb)
            groups.push(bb)
          }

        }

      }
    }
    console.log(111111)

    if (groupProB.cells) {
      var aa = {}
      aa['name'] = groupProB.title
      aa['type'] = groupProB.type
      if (groupProB.cells.length > 0) {
        for (var i = 0; i < groupProB.cells.length; i++) {
          groupId += groupProB.cells[i].pid + '' + i + ",";
          groupProB.cells[i]['num'] = groupProB.cells[i].maxNum
          if (groupProB.cells[i].property) {
            groupProB.cells[i]['listPropertys'] = that.groupNature(groupProB.cells[i].property.propertys, groupProB.cells[i].property.standard, groupProB.cells[i].property.choices, groupProB.cells[i].maxNum);
            groupId += that.data.groupnatureid

          }
        }
        aa['products'] = groupProB.cells

      }

      groups.push(aa)

    }

    if (groupProC.items) {
      if (groupProC.items.length > 0) {
        for (var i = 0; i < groupProC.items.length; i++) {
          var natureObj_1 = [];
          var natureObj_2 = {};
          console.log(groupProC.items[i])
          for (var j = 0; j < groupProC.items[i].cells.length; j++) {
            var natureObj_ = {};
            if (groupProC.items[i].cells[j].isChecked == '1') {
              // natureName += naturePro[i].items[j].name + "(¥" + naturePro[i].items[j].price + ")+";
              groupId += groupProC.items[i].cells[j].pid + '' + j + ",";
              // natureId += this.data.Groupid + '' + j + ",";
              // groupPrice += parseFloat(groupProC.items[i].cells[j].price) * 100;
              natureObj_['itemIndex'] = i;
              natureObj_['index'] = j;
              natureObj_['pid'] = groupProC.items[i].cells[j].pid;
              natureObj_['name'] = groupProC.items[i].cells[j].name;
              natureObj_['num'] = groupProC.items[i].cells[j].maxNum;
              natureObj_['price'] = groupProC.items[i].cells[j].price;
              if (groupProC.items[i].cells[j].property) {
                natureObj_['listPropertys'] = that.groupNature(groupProC.items[i].cells[j].property.propertys, groupProC.items[i].cells[j].property.standard, groupProC.items[i].cells[j].property.choices, groupProC.items[i].cells[j].maxNum);
                groupId += that.data.groupnatureid

              }
              natureObj_1.push(natureObj_);
            }
          }
          natureObj_2['type'] = groupProC.type;
          natureObj_2['name'] = groupProC.items[i].title;
          natureObj_2['products'] = natureObj_1;
          // console.log(natureObj_2);
          groups.push(natureObj_2);
        }

      }
    }
    console.log(groupProD.items)
    console.log(groups)
    if (groupProD.items) {
      if (groupProD.items.length > 0) {
        for (var i = 0; i < groupProD.items.length; i++) {
          var natureObj_1 = [];
          var natureObj_2 = {};
          var minnum = 0
          for (var j = 0; j < groupProD.items[i].cells.length; j++) {
            // 判断groupd各分类下的子餐品份数是否达到该分类的最小数目，不需要判断最大数目，添加行为时已经作出限制
            minnum += groupProD.items[i].cells[j].num
            console.log(minnum)
          }
          if (minnum < groupProD.items[i].minNum) {
            wx.showToast({
              title: '主食区的' + groupProD.items[i].title + '必须选择' + groupProD.items[i].minNum + '份',
              icon: 'none',
              duration: 2000
            })
            return
          }
          for (var j = 0; j < groupProD.items[i].cells.length; j++) {
            var natureObj_ = {};
            if (groupProD.items[i].cells[j].num > 0) {
              console.log(groupProD.items[i].cells[j])

              groupId += groupProD.items[i].cells[j].pid + '' + j + groupProD.items[i].cells[j].num + ",";

              natureObj_['itemIndex'] = i;
              natureObj_['index'] = j;
              natureObj_['pid'] = groupProD.items[i].cells[j].pid;
              natureObj_['name'] = groupProD.items[i].cells[j].name;
              natureObj_['num'] = groupProD.items[i].cells[j].num;
              natureObj_['price'] = groupProD.items[i].cells[j].price;
              if (groupProD.items[i].cells[j].property) {
                natureObj_['listPropertys'] = that.groupNature(groupProD.items[i].cells[j].property.propertys, groupProD.items[i].cells[j].property.standard, groupProD.items[i].cells[j].property.choices, groupProD.items[i].cells[j].num);
                groupId += that.data.groupnatureid

              }
              natureObj_1.push(natureObj_);


            }

          }
          natureObj_2['type'] = groupProD.type;
          natureObj_2['name'] = groupProD.title;
          natureObj_2['products'] = natureObj_1;
          groups.push(natureObj_2);
          console.log(groups)
        }

      }
    }
    console.log(groups)
    if (groupProBF.cells) {
      var aa = {}
      aa['name'] = groupProBF.title
      aa['type'] = groupProBF.type
      if (groupProBF.cells.length > 0) {
        for (var i = 0; i < groupProBF.cells.length; i++) {
          groupProBF.cells[i]['num'] = groupProBF.cells[i].maxNum
          groupId += groupProBF.cells[i].pid + '' + i + ",";

          if (groupProBF.cells[i].property) {
            groupProBF.cells[i]['listPropertys'] = that.groupNature(groupProBF.cells[i].property.propertys, groupProBF.cells[i].property.standard, groupProBF.cells[i].property.choices, groupProBF.cells[i].maxNum);
            groupId += that.data.groupnatureid
          }
        }
        aa['products'] = groupProBF.cells

      }

      groupsF.push(aa)

    }
    console.log(111111)

    if (groupProCF.items) {

      if (groupProCF.items.length > 0) {
        for (var i = 0; i < groupProCF.items.length; i++) {
          var natureObj_1 = [];
          var natureObj_2 = {};
          console.log(groupProCF.items[i])
          for (var j = 0; j < groupProCF.items[i].cells.length; j++) {
            var natureObj_ = {};
            if (groupProCF.items[i].cells[j].isChecked == '1') {
              groupId += groupProCF.items[i].cells[j].pid + '' + j + ",";
              natureObj_['itemIndex'] = i;
              natureObj_['index'] = j;
              natureObj_['pid'] = groupProCF.items[i].cells[j].pid;
              natureObj_['name'] = groupProCF.items[i].cells[j].name;
              natureObj_['num'] = groupProCF.items[i].cells[j].maxNum;
              natureObj_['price'] = groupProCF.items[i].cells[j].price;
              if (groupProCF.items[i].cells[j].property) {
                natureObj_['listPropertys'] = that.groupNature(groupProCF.items[i].cells[j].property.propertys, groupProCF.items[i].cells[j].property.standard, groupProCF.items[i].cells[j].property.choices, groupProCF.items[i].cells[j].maxNum);
                groupId += that.data.groupnatureid

              }
              natureObj_1.push(natureObj_);
            }
          }
          natureObj_2['type'] = groupProCF.type;
          natureObj_2['name'] = groupProCF.items[i].title;
          natureObj_2['products'] = natureObj_1;
          // console.log(natureObj_2);
          groupsF.push(natureObj_2);
        }

      }
    }
    console.log(111111)

    if (groupProDF.items) {
      if (groupProDF.items.length > 0) {
        for (var i = 0; i < groupProDF.items.length; i++) {
          var natureObj_1 = [];
          var natureObj_2 = {};
          var minnum = 0
          for (var j = 0; j < groupProDF.items[i].cells.length; j++) {
            minnum += groupProDF.items[i].cells[j].num
          }
          if (minnum < groupProDF.items[i].minNum) {
            wx.showToast({
              title: '副食区的' + groupProDF.items[i].title + '必须选择' + groupProDF.items[i].minNum + '份',
              icon: 'none',
              duration: 2000
            })
            return
          }
          for (var j = 0; j < groupProDF.items[i].cells.length; j++) {
            var natureObj_ = {};
            if (groupProDF.items[i].cells[j].num > 0) {
              console.log(groupProDF.items[i].cells[j])
              groupId += groupProDF.items[i].cells[j].pid + '' + j + groupProDF.items[i].cells[j].num + ",";
              natureObj_['itemIndex'] = i;
              natureObj_['index'] = j;
              natureObj_['pid'] = groupProDF.items[i].cells[j].pid;
              natureObj_['name'] = groupProDF.items[i].cells[j].name;
              natureObj_['num'] = groupProDF.items[i].cells[j].num;
              natureObj_['price'] = groupProDF.items[i].cells[j].price;
              if (groupProDF.items[i].cells[j].property) {
                natureObj_['listPropertys'] = that.groupNature(groupProDF.items[i].cells[j].property.propertys, groupProDF.items[i].cells[j].property.standard, groupProDF.items[i].cells[j].property.choices, groupProDF.items[i].cells[j].num);
                groupId += that.data.groupnatureid

              }
              natureObj_1.push(natureObj_);
            }
          }

          natureObj_2['type'] = groupProDF.type;
          natureObj_2['name'] = groupProDF.title;
          natureObj_2['products'] = natureObj_1;
          groupsF.push(natureObj_2);
        }
      }
    }
    // var groupnatureid = 
    // console.log(groupnatureid)
    // groupId = groupId + groupnatureid
    console.log(groups)
    for (var k = 0; k < groups.length; k++) {
      if (groups[k].products.length == 0) {
        groups.splice(k, 1)
      }
    }
    for (var k = 0; k < groupsF.length; k++) {
      if (groupsF[k].products.length == 0) {
        groupsF.splice(k, 1)
      }
    }
    console.log(groups)
    groupId = groupId.substr(0, groupId.length - 1)
    console.log(groupId)
    groupsobj['groups'] = groups
    console.log(groupsF)
    if (groupsF.length > 0) {
      exAreaobj['groups'] = groupsF
      groupsobj_['exArea'] = exAreaobj

    }
    mains.push(groupsobj)
    groupsobj_['mains'] = mains
    groupsobj_['index'] = 0
    groupsobj_['num'] = that.data.groupnum

    groupspro.push(groupsobj_)
    console.log(groupspro)
    app.globalData.groupspro = groupspro
    var k = that.data.k
    k++
    that.setData({
      k: k
    })
    var tt = ''
    console.log(groupspro[0].mains[0].groups)
    for (var t = 0; t < groupspro[0].mains[0].groups.length; t++) {

      for (var j = 0; j < groupspro[0].mains[0].groups[t].products.length; j++) {
        var tt_ = ''
        if (groupspro[0].mains[0].groups[t].products[j].listPropertys) {
          for (var m = 0; m < groupspro[0].mains[0].groups[t].products[j].listPropertys[0].propertys.length; m++) {

            if (groupspro[0].mains[0].groups[t].products[j].listPropertys[0].propertys[m].items.length > 0) {
              if (groupspro[0].mains[0].groups[t].products[j].listPropertys[0].propertys[m].items[0].price > 0) {

                tt_ += groupspro[0].mains[0].groups[t].products[j].listPropertys[0].propertys[m].items[0].name + '¥' + groupspro[0].mains[0].groups[t].products[j].listPropertys[0].propertys[m].items[0].price + '+'
              } else {

                tt_ += groupspro[0].mains[0].groups[t].products[j].listPropertys[0].propertys[m].items[0].name + '+'
              }

            }
          }
          if (groupspro[0].mains[0].groups[t].products[j].price > 0) {
            tt += groupspro[0].mains[0].groups[t].products[j].name + '¥' + groupspro[0].mains[0].groups[t].products[j].price + '*' + groupspro[0].mains[0].groups[t].products[j].num + '份(特殊要求：' + tt_.substring(0, tt_.length - 1) + ')' + ';' + " \n "
          } else {
            tt += groupspro[0].mains[0].groups[t].products[j].name + '*' + groupspro[0].mains[0].groups[t].products[j].num + '份(特殊要求：' + tt_.substring(0, tt_.length - 1) + ')' + ';' + " \n "
          }

        } else {
          if (groupspro[0].mains[0].groups[t].products[j].price > 0) {
            tt += groupspro[0].mains[0].groups[t].products[j].name + '(¥' + groupspro[0].mains[0].groups[t].products[j].price + '*' + groupspro[0].mains[0].groups[t].products[j].num + '份)' + ';' + " \n "
          } else {
            tt += groupspro[0].mains[0].groups[t].products[j].name + '(' + groupspro[0].mains[0].groups[t].products[j].num + '份)' + ';' + " \n "
          }

        }
      }
    }
    if (groupspro[0].exArea) {
      for (var t = 0; t < groupspro[0].exArea.groups.length; t++) {
        for (var j = 0; j < groupspro[0].exArea.groups[t].products.length; j++) {
          var tt_ = ''
          if (groupspro[0].exArea.groups[t].products[j].listPropertys) {
            for (var m = 0; m < groupspro[0].exArea.groups[t].products[j].listPropertys[0].propertys.length; m++) {
              if (groupspro[0].exArea.groups[t].products[j].listPropertys[0].propertys[m].items.length > 0) {
                if (groupspro[0].exArea.groups[t].products[j].listPropertys[0].propertys[m].items[0].price > 0) {
                  tt_ += groupspro[0].exArea.groups[t].products[j].listPropertys[0].propertys[m].items[0].name + '¥' + groupspro[0].exArea.groups[t].products[j].listPropertys[0].propertys[m].items[0].price + '+'
                } else {
                  tt_ += groupspro[0].exArea.groups[t].products[j].listPropertys[0].propertys[m].items[0].name + '+'
                }

              }
            }
            if (groupspro[0].exArea.groups[t].products[j].price > 0) {
              tt += groupspro[0].exArea.groups[t].products[j].name + '¥' + groupspro[0].exArea.groups[t].products[j].price + '*' + groupspro[0].exArea.groups[t].products[j].num + '份(特殊要求：' + tt_.substring(0, tt_.length - 1) + ')' + ';' + " \n "
            } else {
              tt += groupspro[0].exArea.groups[t].products[j].name + '*' + groupspro[0].exArea.groups[t].products[j].num + '份(特殊要求：' + tt_.substring(0, tt_.length - 1) + ')' + ';' + " \n "
            }

          } else {
            if (groupspro[0].exArea.groups[t].products[j].price > 0) {
              tt += groupspro[0].exArea.groups[t].products[j].name + '(¥' + groupspro[0].exArea.groups[t].products[j].price + '*' + groupspro[0].exArea.groups[t].products[j].num + '份)' + '; ' + " \n "
            } else {
              tt += groupspro[0].exArea.groups[t].products[j].name + '(' + groupspro[0].exArea.groups[t].products[j].num + '份)' + '; ' + " \n "
            }

          }

        }
      }
    }
    if (menuPro['menuId' + menuId + groupId]) {//已点餐品
      menuPro['menuId' + menuId + groupId]['num'] += that.data.groupnum;
      menuProArray['menuId' + item.uid + groupId]['numdata'] += that.data.groupnum;
      menuPro['menuId' + menuId + groupId]['groups'][0]['num'] += that.data.groupnum;
      menuProArray['menuId' + item.uid + groupId]['groups'][0]['numdata'] += that.data.groupnum;
    } else {
      goodsObj['menuName'] = item.name;
      goodsObj['id'] = item.uid;
      goodsObj['num'] = that.data.groupnum;
      goodsObj['numdata'] = that.data.groupnum;
      goodsObj['price'] = groupPrice / that.data.groupnum;
      goodsObj['costPrice'] = item.costPrice * 100;
      goodsObj['typeId'] = typeId;
      goodsObj['groups'] = groupspro;
      switch (item.mealFeeMode) {
        case 0: goodsObj['mealFee'] = item.mealFee * 100; break;
        case 1: goodsObj['mealFee'] = item.mulMealFee * 100;
          goodsObj['part'] = item.part; break;
      }
      goodsObj['mealFeeMode'] = item.mealFeeMode;
      goodsObj['k'] = k;
      goodsObj['groupsname'] = tt;
      goodsObj['mixid'] = 'menuId' + menuId + groupId;
      goodsObj['see'] = false;
      // menuPro['menuId' + item.uid + k] = goodsObj;
      menuPro['menuId' + menuId + groupId] = goodsObj;
      menuProArray['menuId' + menuId + groupId] = goodsObj;
      menuProArray['menuId' + item.uid + k] = goodsObj;
      console.log(goodsObj)
    }
    if (typePro['menuTypeId' + typeId]) {
      typePro['menuTypeId' + typeId] += 1;
    } else {
      typePro['menuTypeId' + typeId] = 1;
    }
    mealFeeMoney += item.mealFee * 100 * that.data.groupnum;
    if (item.costPrice > 0) {
      specialOfferPrice += item.costPrice * 100 * that.data.groupnum;
    } else {
      specialOfferPrice += that.data.groupPrice * that.data.groupnum;
    }

    allMenu['menuNum'] += that.data.groupnum;
    allMenu['menuPrice'] += that.data.groupPrice;
    that.setData({
      menuProArray: menuProArray,
      menuPro: menuPro,
      typePro: typePro,
      isGroup: true,
      isNatureA: true,
      isHiddenScreenStatus: true,
      allMenu: allMenu,
      specialOfferPrice: specialOfferPrice,
      mealFeeMoney: mealFeeMoney,
    })
    app.globalData.meailFee = mealFeeMoney
  },
  groupnumAdd(e) {
    var that = this
    var B = that.data.groupProB
    var BF = that.data.groupProBF

    var info = e.currentTarget.dataset.info
    switch (info) {
      case 'group': var num = that.data.groupnum; var price = that.data.groupPrice;
        if (B.cells) {
          for (var i = 0; i < B.cells.length; i++) {
            if (B.cells[i].hasStock && B.cells[i].stockNum <= num) {
              wx.showToast({
                title: '库存不足',
                icon: 'none',
                duration: 2000
              })
              return
            }
          }
        };
        if (BF.cells) {
          for (var i = 0; i < BF.cells.length; i++) {
            if (BF.cells[i].hasStock && BF.cells[i].stockNum <= num) {
              wx.showToast({
                title: '库存不足',
                icon: 'none',
                duration: 2000
              })
              return
            }
          }
        };
        break;
      case 'nature': var num = that.data.naturenum; var price = that.data.naturePrice; break;
    }
    num++
    price += price / (num - 1)
    switch (info) {
      case 'group': that.setData({ groupnum: num, groupPrice: price }); break;
      case 'nature': that.setData({ naturenum: num, naturePrice: price }); break;
    }
  },
  groupnumSub(e) {
    var info = e.currentTarget.dataset.info
    switch (info) {
      case 'group': var num = this.data.groupnum; var price = this.data.groupPrice; break;
      case 'nature': var num = this.data.naturenum; var price = this.data.naturePrice; break;
    }

    num--
    price -= price / (num + 1)
    if (num == 0) {
      return
    } else {
      switch (info) {
        case 'group': this.setData({ groupnum: num, groupPrice: price }); break;
        case 'nature': this.setData({ naturenum: num, naturePrice: price }); break;
      }

    }
  },
  groupNature(naturePro, natureProGG, choices, number) {
    var natureName = '';
    var groupId = '';
    var naturePrice = 0;
    var naturePro_1 = {};
    var naturePro_2 = [];
    var naturePro_ = []
    if (naturePro) {
      if (naturePro.length > 0) {
        console.log(222)
        for (var i = 0; i < naturePro.length; i++) {
          var natureObj_1 = [];
          var natureObj_2 = {};
          for (var j = 0; j < naturePro[i].items.length; j++) {
            var natureObj_ = {};
            if (naturePro[i].items[j].isChecked == '1') {
              if (naturePro[i].items[j].price>0){
                natureName += naturePro[i].items[j].name + "(¥" + naturePro[i].items[j].price + ") / ";
              }else{
                natureName += naturePro[i].items[j].name + " / ";
              }
              groupId += naturePro[i].items[j].uid + '' + j + ",";
              naturePrice += parseFloat(naturePro[i].items[j].price) * 100;
              natureObj_['index'] = j;
              natureObj_['name'] = naturePro[i].items[j].name;
              natureObj_['price'] = naturePro[i].items[j].price;
              natureObj_['uid'] = naturePro[i].items[j].uid;
              natureObj_1.push(natureObj_);
            }
          }
          natureObj_2['pid'] = naturePro[i].uid;
          natureObj_2['title'] = naturePro[i].title;
          natureObj_2['items'] = natureObj_1;
          // console.log(natureObj_2);
          naturePro_.push(natureObj_2);
        }

      }
    }
    console.log(natureProGG)
    if (natureProGG) {
      if (natureProGG.items) {
        console.log(12)
        for (var j = 0; j < natureProGG.items.length; j++) {
          var natureObj_1 = [];
          var natureObj_2 = {};
          var natureObj_ = {};
          if (natureProGG.items[j].isChecked == '1') {
            if (natureProGG.items[j].price>0){
              natureName += natureProGG.items[j].name + "(¥" + natureProGG.items[j].price + ") / ";
            }else{
              natureName += natureProGG.items[j].name + " / ";
            }
            groupId += natureProGG.items[j].uid + '' + j + ",";
            naturePrice += parseFloat(natureProGG.items[j].price) * 100;
            natureObj_['index'] = j;
            natureObj_['name'] = natureProGG.items[j].name;
            natureObj_['price'] = natureProGG.items[j].price;
            natureObj_['uid'] = natureProGG.items[j].uid;
            natureObj_1.push(natureObj_);
          }
          natureObj_2['pid'] = natureProGG.uid;
          natureObj_2['title'] = natureProGG.title;
          natureObj_2['items'] = natureObj_1;
          // console.log(natureObj_2);
          naturePro_.push(natureObj_2);
        }
      }
    }
    if (choices) {
      if (choices.items) {
        if (choices.items.length > 0) {
          console.log(12)
          for (var j = 0; j < choices.items.length; j++) {
            var natureObj_1 = [];
            var natureObj_2 = {};
            var natureObj_ = {};
            if (choices.items[j].isChecked == '1') {
              if (choices.items[j].price>0){
                natureName += choices.items[j].name + "(¥" + choices.items[j].price + ") / ";
              }else{
                natureName += choices.items[j].name +" / ";
              }
              
              groupId += choices.items[j].uid + '' + j + ",";
              naturePrice += parseFloat(choices.items[j].price) * 100;
              natureObj_['index'] = j;
              natureObj_['name'] = choices.items[j].name;
              natureObj_['price'] = choices.items[j].price;
              natureObj_['uid'] = choices.items[j].uid;
              natureObj_1.push(natureObj_);
            }
            natureObj_2['pid'] = choices.uid;
            natureObj_2['title'] = choices.title;
            natureObj_2['items'] = natureObj_1;
            // console.log(natureObj_2);
            naturePro_.push(natureObj_2);
          }
        }
      }
    }
    console.log(groupId)
    this.setData({
      groupnatureid: groupId
    })
    for (var k = 0; k < naturePro_.length; k++) {
      if (naturePro_[k].items.length == 0) {
        naturePro_.splice(k, 1)
      }
    }
    naturePro_1['propertys'] = naturePro_;
    naturePro_1['index'] = 1;
    naturePro_1['num'] = number;
    naturePro_2.push(naturePro_1);
    return naturePro_2
  },
  menuAddBuyCarInfo(){
    console.log(this.data.numHH)
    if (!this.data.shopPro.isServiceTime & !this.data.hasnoShops) {
      return
    }

    var num = this.data.numHH
    num++
    this.setData({
      numHH:num
    })
  },
  menuDelBuyCar: function (e) {
    // console.log(e);
    var menuPro = this.data.menuPro;
    var typePro = this.data.typePro;
    var menuProArray = this.data.menuProArray;
    var allMenu = this.data.allMenu;
    var item = e.currentTarget.dataset.info;
    var mealFeeMoney = this.data.mealFeeMoney;
    var specialOfferPrice = this.data.specialOfferPrice;

    // console.log(specialOfferPrice);

    if (item.menuNature) {
      var tempdata = menuPro['menuId' + item.menuNature.menuId + item.menuNature.natureId]
      console.log(tempdata)
      
      if (menuPro['menuId' + item.menuNature.menuId + item.menuNature.natureId]['costPrice'] > 0) {
        specialOfferPrice -= menuPro['menuId' + item.menuNature.menuId + item.menuNature.natureId]['costPrice'];
      } else {
        specialOfferPrice -= menuPro['menuId' + item.menuNature.menuId + item.menuNature.natureId]['price'];
      }
      if (menuPro['menuId' + item.menuNature.menuId + item.menuNature.natureId]['num'] == 1) {
        mealFeeMoney -= tempdata['mealFee'];
        delete (menuPro['menuId' + item.menuNature.menuId + item.menuNature.natureId]);
        if (menuProArray['menuId' + item.id]['numdata'] == 1) {
          delete (menuProArray['menuId' + item.id]);
        } else {
          menuProArray['menuId' + item.id]['numdata'] -= 1;
        }
      } else {
        switch (tempdata.mealFeeMode) {
          case 0: menuPro['menuId' + item.menuNature.menuId + item.menuNature.natureId]['num'] -= 1;menuProArray['menuId' + item.id]['numdata'] -= 1;mealFeeMoney -= tempdata['mealFee']; break;
          case 1: 
            var tempnum1 = Math.ceil(menuPro['menuId' + item.menuNature.menuId + item.menuNature.natureId]['num'] / menuPro['menuId' + item.menuNature.menuId + item.menuNature.natureId].part)
            menuPro['menuId' + item.menuNature.menuId + item.menuNature.natureId]['num'] -= 1;
            menuProArray['menuId' + item.id]['numdata'] -= 1;
            var tempnum2 = Math.ceil(menuPro['menuId' + item.menuNature.menuId + item.menuNature.natureId]['num'] / menuPro['menuId' + item.menuNature.menuId + item.menuNature.natureId].part)
            mealFeeMoney -= (tempnum1- tempnum2) * tempdata['mealFee']; break;
        } 
      }
    } else if (item.groups) {
      mealFeeMoney -= menuPro[item.mixid]['mealFee'];
      if (menuPro[item.mixid]['costPrice'] > 0) {
        specialOfferPrice -= menuPro[item.mixid]['costPrice'];
      } else {
        specialOfferPrice -= menuPro[item.mixid]['price'];
      }
      if (menuPro[item.mixid]['num'] == 1) {
        delete (menuPro[item.mixid]);
        menuProArray[item.mixid]['groups'][0]['numdata'] += 1;

        delete (menuProArray[item.mixid]);
      } else {
        menuPro[item.mixid]['num'] -= 1;
        menuPro[item.mixid]['groups'][0]['num'] -= 1;
        menuProArray[item.mixid]['numdata'] -= 1;
        menuProArray[item.mixid]['groups'][0]['numdata'] -= 1;
      }
    } else {
      if (menuPro['menuId' + item.id]['costPrice'] > 0) {
        specialOfferPrice -= menuPro['menuId' + item.id]['costPrice'];
      } else {
        specialOfferPrice -= menuPro['menuId' + item.id]['price'];
      }
      if (menuPro['menuId' + item.id]['num'] == 1) {
        mealFeeMoney -= menuPro['menuId' + item.id]['mealFee'];
        delete (menuPro['menuId' + item.id]);
        delete (menuProArray['menuId' + item.id]);
       
        
      } else {
        
        var tempdata = menuPro['menuId' + item.id]
        switch (tempdata.mealFeeMode) {
          case 0: menuPro['menuId' + item.id]['num'] -= 1;
           mealFeeMoney -= tempdata['mealFee'];
            break;
          case 1:
            var tempnum1 = Math.ceil(tempdata['num'] / tempdata.part)
            tempdata['num'] -= 1;
            var tempnum2 = Math.ceil(tempdata['num'] / tempdata.part)
            mealFeeMoney -= (tempnum1 - tempnum2) * tempdata['mealFee']; break;
        } 
        menuProArray['menuId' + item.id]['numdata'] -= 1;
      }

    }

    if (typePro['menuTypeId' + item.typeId] == 1) {
      delete (typePro['menuTypeId' + item.typeId]);
    } else {
      typePro['menuTypeId' + item.typeId] -= 1
    }

    allMenu['menuNum'] -= 1;
    allMenu['menuPrice'] -= item.price;

    if (allMenu['menuNum'] < 0) {
      allMenu['menuNum'] = 0;
    }
    if (allMenu['menuPrice'] < 0) {
      allMenu['menuPrice'] = 0;
    }

    // console.log(menuPro);
    // console.log(menuProArray);
    this.setData({
      menuPro: menuPro,
      typePro: typePro,
      menuProArray: menuProArray,
      allMenu: allMenu,
      mealFeeMoney: mealFeeMoney,
      specialOfferPrice: specialOfferPrice
    })
    app.globalData.meailFee = mealFeeMoney
  },
  menuAddBuyCar: function (e) {
    console.log(this.data.menuPro)
    var menuPro = this.data.menuPro;
    var typePro = this.data.typePro;
    var menuProArray = this.data.menuProArray;
    var allMenu = this.data.allMenu;
    var item = e.currentTarget.dataset.info;
    var mealFeeMoney = this.data.mealFeeMoney;
    var specialOfferPrice = this.data.specialOfferPrice;

    // console.log(e);
    if (item.menuNature) {
      if (menuPro['menuId' + item.menuNature.menuId + item.menuNature.natureId]['costPrice'] > 0) {
        specialOfferPrice += menuPro['menuId' + item.menuNature.menuId + item.menuNature.natureId]['costPrice'];
      } else {
        specialOfferPrice += menuPro['menuId' + item.menuNature.menuId + item.menuNature.natureId]['price'];
      }
      var tempdata = menuPro['menuId' + item.menuNature.menuId + item.menuNature.natureId]
      console.log(tempdata)
      switch (tempdata.mealFeeMode){
        case 0: menuPro['menuId' + item.menuNature.menuId + item.menuNature.natureId]['num'] += 1;mealFeeMoney += tempdata['mealFee'];break;
        case 1: var tempnum1 = Math.ceil(menuPro['menuId' + item.menuNature.menuId + item.menuNature.natureId]['num'] / menuPro['menuId' + item.menuNature.menuId + item.menuNature.natureId].part);
        menuPro['menuId' + item.menuNature.menuId + item.menuNature.natureId]['num'] += 1;
          var tempnum2 = Math.ceil(menuPro['menuId' + item.menuNature.menuId + item.menuNature.natureId]['num'] / menuPro['menuId' + item.menuNature.menuId + item.menuNature.natureId].part);
          mealFeeMoney += (tempnum2 - tempnum1)* tempdata['mealFee']; break;
      }
      console.log(mealFeeMoney)
      menuProArray['menuId' + item.id]['numdata'] += 1;
    } else if (item.groups) {

      if (menuPro[item.mixid]['costPrice'] > 0) {
        specialOfferPrice += menuPro[item.mixid]['costPrice'];
      } else {
        specialOfferPrice += menuPro[item.mixid]['price'];
      }
      mealFeeMoney += menuPro[item.mixid]['mealFee'];
      menuPro[item.mixid]['num'] += 1;
      menuPro[item.mixid]['groups'][0]['num'] += 1;
      menuProArray[item.mixid]['numdata'] += 1;
      menuProArray[item.mixid]['groups'][0]['numdata'] += 1;
    } else {
      console.log(menuPro['menuId' + item.id])
      if (menuPro['menuId' + item.id]['costPrice'] > 0) {
        specialOfferPrice += menuPro['menuId' + item.id]['costPrice'];
      } else {
        specialOfferPrice += menuPro['menuId' + item.id]['price'];
      }
      var tempdata = menuPro['menuId' + item.id]
      switch (tempdata.mealFeeMode) {
        case 0: mealFeeMoney += tempdata['mealFee']; menuPro['menuId' + item.id]['num'] += 1; break;
        case 1: 
          var tempnum1 = Math.ceil(tempdata['num'] / tempdata['part'])
          menuPro['menuId' + item.id]['num'] += 1
          var tempnum2 = Math.ceil(tempdata['num'] / tempdata['part'])

          mealFeeMoney += (tempnum2 - tempnum1)* tempdata['mealFee']; break;
      }
      menuProArray['menuId' + item.id]['numdata'] += 1;
     
    }
    typePro['menuTypeId' + item.typeId] += 1;

    allMenu['menuNum'] += 1;
    allMenu['menuPrice'] += item.price;

    this.setData({
      menuPro: menuPro,
      typePro: typePro,
      menuProArray: menuProArray,
      allMenu: allMenu,
      mealFeeMoney: mealFeeMoney,
      specialOfferPrice: specialOfferPrice
    })
    app.globalData.meailFee = mealFeeMoney
  },
  menuDelBuyCarInfo(){
    var num = this.data.numHH
    num--
    this.setData({
      numHH: num
    })
  },
  carsHH(){
    var menuPro = this.data.menuPro;
    var typePro = this.data.typePro;
    var menuProArray = this.data.menuProArray;
    var goodsObj = {};
    var allMenu = this.data.allMenu;
    var typeId = this.data.typeId;
    var specialOfferPrice = this.data.specialOfferPrice;
    var item = this.data.itemHH
    var mealFeeMoney = this.data.mealFeeMoney;
    var singlenum = this.data.numHH
    if (singlenum<1){
      this.setData({
        isGoodsInformation: true,
        isHiddenImageStatus: true,
      })
      return}
    if (menuPro['menuId' + item.uid]) {//已点餐品
      menuPro['menuId' + item.uid]['num'] += singlenum;
      menuProArray['menuId' + item.uid]['numdata'] += singlenum;
    } else {
      console.log(item)
      goodsObj['menuName'] = item.name;
      goodsObj['id'] = item.uid;
      goodsObj['extId'] = item.extId;
      goodsObj['num'] = singlenum;
      goodsObj['numdata'] = singlenum;
      goodsObj['price'] = parseFloat(item.price) * 100;
      goodsObj['costPrice'] = item.costPrice * 100;
      goodsObj['typeId'] = typeId;
      switch (item.mealFeeMode) {
        case 0: goodsObj['mealFee'] = item.mealFee * 100; break;
        case 1: goodsObj['mealFee'] = item.mulMealFee * 100;
          goodsObj['part'] = item.part; break;
      }
      goodsObj['mealFeeMode'] = item.mealFeeMode;
      menuPro['menuId' + item.uid] = goodsObj;
      menuProArray['menuId' + item.uid] = goodsObj;
    }
    if (typePro['menuTypeId' + typeId]) {
      typePro['menuTypeId' + typeId] += singlenum;
    } else {
      typePro['menuTypeId' + typeId] = singlenum;
    }
    mealFeeMoney += item.mealFee * 100 * singlenum;
    if (item.costPrice > 0) {
      specialOfferPrice += item.costPrice * 100 * singlenum;
    } else {
      specialOfferPrice += item.price * 100 * singlenum;
    }
    allMenu['menuNum'] += singlenum;
    allMenu['menuPrice'] += parseFloat(item.price) * 100 * singlenum;
    this.setData({
      menuPro: menuPro,
      typePro: typePro,
      menuProArray: menuProArray,
      allMenu: allMenu,
      specialOfferPrice: specialOfferPrice,
      mealFeeMoney: mealFeeMoney,
      isGoodsInformation: true,
      isHiddenImageStatus: true,
    })
    app.globalData.meailFee = mealFeeMoney
  },
  buyCarClear: function () {

    this.setData({
      isHiddenModal: false,
      isHiddenScreenStatus: false
    })
  },
  buyCarClearCancel: function () {
    this.setData({
      isHiddenModal: true,
      isHiddenScreenStatus: true
    })
  },
  buyCarClearConfirm: function () {
    var menuPro = this.data.menuPro;
    var typePro = this.data.typePro;
    var menuProArray = this.data.menuProArray;
    var allMenu = this.data.allMenu;
    var specialOfferPrice = this.data.specialOfferPrice;

    app.globalData.menuPro = {};
    app.globalData.allpro = { 'menuNum': 0, 'menuPrice': 0 };
    app.globalData.menuProArray = {};
    app.globalData.sendAddress = null;
    app.globalData.specialOfferPrice = 0;
    app.globalData.typePro = {};
    app.globalData.meailFee = 0;

    this.setData({
      menuPro: {},
      typePro: {},
      menuProArray: {},
      allMenu: { 'menuNum': 0, 'menuPrice': 0 },
      isShopCarCommodity: true,
      hiddenBuyCarStatus: true,
      hiddenMenuPro: true,
      isHiddenModal: true,
      isHiddenScreenStatus: true,
      specialOfferPrice: 0,
      mealFeeMoney: 0
    })

  },
  btGoSend(){
    var that = this
    var menuPro = that.data.menuPro;
    var allMenu = that.data.allMenu;
    var menuProArray = that.data.menuProArray;
    var typeName = that.data.typeName;
    console.log(typeName)
    app.globalData.menuPro = menuPro;
    app.globalData.allpro = allMenu;
    app.globalData.menuProArray = menuProArray;
    app.globalData.specialOfferPrice = that.data.specialOfferPrice;
    app.globalData.sendMoney = that.data.shopPro.fee * 100;
    var money = allMenu['menuPrice'] + that.data.shopPro.fee * 100;
    app.globalData.meailFee = that.data.mealFeeMoney;
    if (isNaN(app.globalData.meailFee)) {
      app.globalData.meailFee = 0;
    }
    if (isNaN(app.globalData.sendMoney)) {
      app.globalData.sendMoney = 0;
    }

    app.globalData.typePro = that.data.typePro;
    if (!that.data.isBusy) {
      if (app.globalData.typeValue == 1 && !that.data.shopPro.businessStatus[3].busy){

      }else{
        wx.showModal({
          title: '提示',
          content: '当前门店处于繁忙状态，请稍后下单',
          confirmColor: '#CAA284',
          confirmText: '确认',
        })
        return;
      }
    }
    if (that.data.isLogin == 1) {
      console.log(allMenu['menuNum'])
      // if (allMenu['menuNum'] > 0) {
      
      if (allMenu['menuPrice'] / 100 + that.data.mealFeeMoney / 100 >= that.data.shopPro.reachFee & allMenu['menuNum'] > 0 | (that.data.typeValue == 3 & allMenu['menuNum'] > 0) | (that.data.typeValue == 2 & allMenu['menuNum'] > 0)) {
        app.globalData.globalmenu = JSON.stringify(that.data.menuDataPro)
        wx.navigateTo({
          url: '../send/send?shopId=' + that.data.shopId + '&menuId=' + that.data.menuId + '&money=' + money + '&goodsMoney=' + allMenu['menuPrice'] + '&deskId=' + that.data.deskId + '&reachFee=' + that.data.shopPro.reachFee,
        })
        //bjd
      } else if (!that.data.shopPro.isServiceTime) {
        return
      } else if (allMenu['menuPrice'] / 100 + that.data.mealFeeMoney / 100 < 20 & allMenu['menuNum'] > 0) {
        return
      }

    } else {
      that.setData({
        isNotAddress_: false
      })
      // wx.navigateTo({
      //   url: '../login/login',
      // })
    }
  },
  getPhoneNumber: function (e) {
    var that = this

    if (e.detail.errMsg == 'getPhoneNumber:fail user deny') {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '未授权',
        success: function (res) { }
      })
    } else if (e.detail.errMsg == 'getPhoneNumber:fail 用户未绑定手机，请先在微信客户端进行绑定后重试') {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '请输入手机号',
      })
    } else if (e.detail.errMsg == 'getPhoneNumber:ok') {
      console.log(e.detail.encryptedData)
      console.log(e.detail.iv)
      that.setData({
        encryptedData: e.detail.encryptedData,
        iv: e.detail.iv
      })
      that.pwdLoginData(e.detail.encryptedData, e.detail.iv)
      // that.setphonenumber(e.detail.encryptedData, e.detail.iv)
    }
    else {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '同意授权',
        success: function (res) {
          console.log(res)
        }
      })
    }
    that.setData({
      isNotAddress_: true
    })
  },
  pwdLoginData: function (encryptedData, iv) {
    var that = this;
    var aa = app.globalData.JSESSIONID
    console.log(aa)
    that.setData({ isNotAddress_: true })
    wx.request({
      url: url.pwdLoginfast + '&encryptedData=' + encodeURI(encryptedData).replace(/\+/g, '%2B') + '&iv=' + encodeURI(iv).replace(/\+/g, '%2B'),
      data: {},
      method: 'POST',
      header: aa ? { 'Cookie': 'JSESSIONID=' + aa } : {},
      success: function (res) {
        console.log(res);
        if (res.data.status == 1) {
          wx.showToast({
            title: '登录成功',
            icon: 'none',
            duration: 2000
          })
          that.getUserInfoData(app.globalData.JSESSIONID,'autologin');
        } else if (res.data.msg =="你已经登录过！"){
          //bjd
          wx.showToast({
            title: '登录成功',
            icon: 'none',
            duration: 2000
          })
          that.getUserInfoData(app.globalData.JSESSIONID,'autologin');
          
        } else if (res.data.status == 11) {
          that.getOpenIdData()
          wx.showToast({
            title: '请重新登录',
            icon: 'none',
            duration: 2000
          })
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 2000
          })
        }
        
      }
    })
  },
  cancelBox() {
    this.setData({
      isNotAddress_: true
    })
  },
  //获取满减活动
  getActivityData: function (id) {
    var that = this;
    wx.request({
      url: url.getActivityLib + '/' + id,
      data: {},
      header: {
        clientId: constant.clientId,
        brandId: constant.brandId,
        storeId: app.globalData.extId
        // storeId: 459
      },
      success: function (res) {
        console.log(res);
        if (res.statusCode == 200) {
          if (res.data.data.length > 0) {

            for (var k = 0; k < res.data.data.length; k++) {
              if (res.data.data[k].type == 3) {
                that.setData({
                  actictyText: res.data.data[k].ruleDetail
                })
              } else if (res.data.data[k].type == 5) {
                that.setData({
                  productActicty: res.data.data[k]
                })
                console.log(that.data.productActicty)
                var menuPro1 = that.data.menuDataPro;
                var discountMenu = that.data.productActicty.productsBonus.bonusProducts;
                var activityPro1 = that.data.productActicty;
                for (var i = 0; i < menuPro1.length; i++) {
                  for (var j = 0; j < menuPro1[i].products.length; j++) {
                    for (var h = 0; h < activityPro1.productsBonus.bonusProducts.length; h++) {

                      if (activityPro1.productsBonus.bonusProducts[h].productPosId == menuPro1[i].products[j].uid) {
                        if (activityPro1.productsBonus.bonusProducts[h].discountType == 2) {

                          activityPro1.productsBonus.bonusProducts[h].activityPrice = activityPro1.productsBonus.bonusProducts[h].value;

                        } else if (activityPro1.productsBonus.bonusProducts[h].discountType == 1) {
                          var price = menuPro1[i].products[j].price - activityPro1.productsBonus.bonusProducts[h].value;
                          activityPro1.productsBonus.bonusProducts[h].activityPrice = price;
                        } else if (activityPro1.productsBonus.bonusProducts[h].discountType == 0) {
                          var price = menuPro1[i].products[j].price * (activityPro1.productsBonus.bonusProducts[h].value) / 10;
                          activityPro1.productsBonus.bonusProducts[h].activityPrice = price.toFixed(2);
                        }

                        activityPro1.productsBonus.bonusProducts[h].Vprice = menuPro1[i].products[j].price;
                        activityPro1.productsBonus.bonusProducts[h].price = menuPro1[i].products[j].price;
                        activityPro1.productsBonus.bonusProducts[h].image1 = menuPro1[i].products[j].image1;
                        activityPro1.productsBonus.bonusProducts[h].num = menuPro1[i].products[j].num;
                        activityPro1.productsBonus.bonusProducts[h].uid = menuPro1[i].products[j].uid;
                        activityPro1.productsBonus.bonusProducts[h].name = menuPro1[i].products[j].name;
                        activityPro1.productsBonus.bonusProducts[h].desc = menuPro1[i].products[j].desc;
                        activityPro1.productsBonus.bonusProducts[h].sales = menuPro1[i].products[j].sales;
                        activityPro1.productsBonus.bonusProducts[h].isInServiceTime = menuPro1[i].products[j].isInServiceTime;
                        activityPro1.productsBonus.bonusProducts[h].mealFee = menuPro1[i].products[j].mealFee
                        activityPro1.productsBonus.bonusProducts[h].isFirstOrder = menuPro1[i].products[j].isFirstOrder;
                        activityPro1.productsBonus.bonusProducts[h].isSoldOut = menuPro1[i].products[j].isSoldOut;
                        activityPro1.productsBonus.bonusProducts[h].type = menuPro1[i].products[j].type;
                        console.log(that.data.productActicty.isFirstOrder);
                      }
                      if (activityPro1.isFirstOrder == 1) {
                        menuPro1[i].products[j].isFirstOrder = 1;
                      } else {
                        menuPro1[i].products[j].isFirstOrder = 0;
                      }
                      // console.log(menuPro[i].products[j].activityPrice + "111111111113" + menuPro[i].products[j].isFirstOrder);
                    }

                  }
                }


                console.log(activityPro1)
                that.setData({
                  discountMenu: that.discountMenu(activityPro1)
                })
              
              }
            }
            console.log(that.data.productActicty)
            var menuPro = that.data.menuDataPro;
            var activityPro = that.data.productActicty;
            for (var i = 0; i < menuPro.length; i++) {
              for (var j = 0; j < menuPro[i].products.length; j++) {
                menuPro[i].products[j].Vprice = menuPro[i].products[j].price
                for (var h = 0; h < activityPro.productsBonus.bonusProducts.length; h++) {
                  if (activityPro.productsBonus.bonusProducts[h].productPosId == menuPro[i].products[j].uid) {
                    if (activityPro.productsBonus.bonusProducts[h].discountType == 2) {
                      menuPro[i].products[j].activityPrice = activityPro.productsBonus.bonusProducts[h].value
                    } else if (activityPro.productsBonus.bonusProducts[h].discountType == 1) {
                      var price = menuPro[i].products[j].price - activityPro.productsBonus.bonusProducts[h].value;
                      menuPro[i].products[j].activityPrice = price;
                    } else if (activityPro.productsBonus.bonusProducts[h].discountType == 0) {
                      var price = menuPro[i].products[j].price * (activityPro.productsBonus.bonusProducts[h].value) / 10;
                      menuPro[i].products[j].activityPrice = price.toFixed(2);
                    }
                  }
                  if (activityPro.isFirstOrder == 1) {
                    menuPro[i].products[j].isFirstOrder = 1;
                  } else {
                    menuPro[i].products[j].isFirstOrder = 0;
                  }
                  // console.log(menuPro[i].products[j].activityPrice + "111111111113" + menuPro[i].products[j].isFirstOrder);
                }

              }
            }
            that.setData({
              menuDataPro: menuPro
            })
          }
        }
      }
    })
  },
  discountMenu: function (activityPro1) {
    var discountProcuts = [];
    for (var j = 0; j < activityPro1.productsBonus.bonusProducts.length; j++) {
      if (activityPro1.productsBonus.bonusProducts[j].price != undefined &
        activityPro1.productsBonus.bonusProducts[j].price != null) {
        discountProcuts.push(activityPro1.productsBonus.bonusProducts[j]);
      }
    }
    console.log(discountProcuts);
    return discountProcuts;
  },
  shopDetail(){
     this.setData({
       shopDetailView: !this.data.shopDetailView
     })
  },
  moreSendShopsView(){
    console.log(app.globalData.sendAddress)
    
  }
})