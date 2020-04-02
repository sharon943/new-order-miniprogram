//app.js
import request from './utils/request.js'
let url = require('/utils/url.js');
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    // 登录
    wx.login({
      success: res => {
        var that=this
        that.globalData.code = res.code
        wx.request({
          url: url.getOpenId + '&code=' + res.code,
          data: {},
          method: 'POST',
          success: resOp => {
            if (resOp.data.status == 1) {
              console.log(resOp)
              that.globalData.openId = resOp.data.data.openid;
              that.globalData.session_key = resOp.data.data.session_key;
              that.globalData.JSESSIONID = resOp.header["Set-Cookie"].match(/JSESSIONID=(.*)?;/)[1];
             
              if (that.openIdReadyCallback) {
                that.openIdReadyCallback(resOp.data.data.openid)
              }
            }
          }
        })
        wx.getSystemInfo({
          success: function (res) {
            console.log(res)
            var model = res.model.substring(0, res.model.indexOf("X")) + 'X';
            if (model == 'iPhone X') { that.globalData.isIpx = true }
            that.globalData.sw = res.screenWidth
            that.globalData.sy = res.screenHeight
          }
        })
        wx.request({
          url: url.getTimestamp, 
          method: 'GET',
          success: function (res) {
            if (res.data.data){
              that.globalData.CurrentTimeMilli = res.data.data - Date.parse(new Date())
            }else{
              that.globalData.CurrentTimeMilli = 0
            }
          },
          fail:function(){
            that.globalData.CurrentTimeMilli = 0
          }
        })
      }
    })
  },
  request: new request(),
  globalData: {
    code: '',
    userInfo: null,
    openId: null,
    customInfo: [],
    payConfirm: 0,
    shopId: 172,
    MenuUrl: '',
    menuPro: {},
    allpro: { 'menuNum': 0, 'menuPrice': 0 },
    XHNum: '',
    shopImg: '',
    shopName: '',
    JSESSIONID: '',
    sendMoney: '',
    address: '',
    locationAddress: null,
    addressObj: null,
    longitude: null,
    latitude: null,
    typeValue: 2,
    timeValue: 0,
    cityName: null,
    menuProArray: {},
    sendAddress: null,
    shopId: '',
    memberId: null,//会员id
    extId: '',//第三方门店ID
    phone: null,
    revisePro: null,
    specialOfferPrice: 0,
    onlinePay: 3,
    typePro: {},
    adressName: '',
    adressPhone: '',
    addressJ: '',
    isAddress: 0,
    isInvoice: true,//是否开发票
    invoiceType: null,
    meailFee: 0,
    isAddressOne: false,
    oIndex: 0,
    tIndex: 0,
    sIndex: 0,
    shopAddress: null,
    shopLat: 0,
    shopLng: 0,
    personName: '',
    iconPath: '',
    session_key: '',
    LogiN: 1,
    Discount: '',
    Phone: '',
    ForgetPhone: '',
    isIpx: false,
    wxnick: '',
    wxnickimg: '',
    balance: '',
    point: '',
    levelName: '',
    cityId: '',
    types: [],
    deskId: '',
    globalmenu: [],
    choiceCityName:'',//选择城市名字
    choiceCityId:'',//选择城市id
    choiceXianName:'',//选择县名字
    choiceXianId: "",//选择县id
    revisePro:{},//地址data
    dingwei:{},
    color:'#CAA284',
    note:'',
    ispack:0,
    isVka:1,//是否开通vka会员
    uid:'',
    cardID:'',//VKA会员id
    hasShops:false,
    isIos:false,
    vkaInfon:{},//vka会员信息
    wmCityName:'',//外卖城市name
    wmSName:'',//外卖省份名字,
    cardNo:'',
    sw:'',    //屏幕宽度
    sy: '',    //屏幕高度
    CurrentTimeMilli:0,//服务器与本地时间戳差值
    OScreenBright: 0,
    template2:[],//充值订阅消息
    unionid:null,
    wrongKey: false,//逆解析地址是否出错，true出错，false正常
    getlocationDeny: false,//true 准许定位
    couponPro:[],
    coupon: null,
  }
})