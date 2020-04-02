/**餐道 */
// var url = 'https://beta-wxa.can-dao.com/';
// var url = 'https://qc.can-dao.com:7776/';//测试
var url = "https://open6-wxa.can-dao.com/";//正式
// var key = '&key=ea38129a996bff2b';
// var key = '&key=93ba9db2f9f4f0e4';//测试
// var key1 = 'key=93ba9db2f9f4f0e4';//测试
var key = '&key=125e01d2fee75cee'//正式
var key1 ='key=125e01d2fee75cee'//正式

/**VKA */
// var urlk = 'https://api.vi-ni.com/';
var urlk = 'https://api.v-ka.com/';//正式
// var storeID='123487';
var storeID = '5771';//正式
module.exports = {
  name:"candao.user.updateCompellation",//修改姓名
  birtnday:"candao.user.updateBirthday",
  Coupons:'candao.coupon.getValidateCoupons',
  hisCoupons:"candao.coupon.getHistoryCoupons" ,
  getCityId: 'candao.base.getCityIdByCityName',           //获取cityid
  youhui: 'candao.preferential.getStorePres',
  getGroup: 'candao.product.getGroupData',
  //获取门店优惠
  default: url + 'Action?' + key1,
  defaultS: url + 'SecretAction?' + key1,
  getSenderPosition: url + 'Action?actionId=1&serviceId=17' + key,        
  getShopPosition: 'candao.storeStandard.getStore',                 
  getOpenId: url + 'LocalAction?method=getOpenId' + key,
  getBanner: 'candao.storeOwn.getWeChatAppSetting',                            
  getCache: url + 'Cache?actionId=2',
  setCache: url + 'Cache?actionId=1',
  getStoreId: 'candao.storeStandard.getNearStore',      
  getdisInfo:'candao.preferential.canPreList',                            
  getUserInformation: 'candao.user.getBaseInfo', 
  getMenu: url + 'Action?actionId=1&serviceId=5' + key,  
  getSelectableCoupons:'candao.coupon.getSelectableCoupons',
  getAddressDataBase: 'candao.userAddress.getList',                                   
  codeLogin: 'candao.user.sendLoginVerificCode',                                       
  phoneLogin: 'candao.user.phoneLogin',                                               
  registerCodeGo: url + 'Action?actionId=33&serviceId=4' + key,
  getCity: url + 'Action?actionId=4&serviceId=1' + key,
  getIsLogin: url + 'LocalAction?method=isLogin' + key,                               
  addAddress: 'candao.userAddress.add',                                               
  getNotice: url + 'SecretAction?actionId=5&serviceId=3' + key,                
  getDefault: 'candao.storeStandard.getStoreDeliveryRange',   
  getSendOrder: 'candao.orderOwn.postOrder',                                           
  getPay: 'candao.pay.orderPay',                                                       
  getMenuId: 'candao.product.getProductMenu',
  getmenuedefault: 'candao.product.getBrandDefaultMenu',                               
  getOrderLib: 'candao.orderOwn.getUserOrders',                                        
  getOrderInformation: 'candao.orderOwn.getOrderDetail',
  getOrderMenuInformation: url + 'SecretAction?actionId=4&serviceId=7' + key,          
  deleteAddress: 'candao.userAddress.delete', getDefaultMenu:'candao.product.getBrandDefaultMenu',     
  reviseAddress: 'candao.userAddress.update',
  pwdLogin: 'candao.user.passwdLogin',                                                
  pwdLoginfast: url + 'LocalAction?method=autoLogin' + key,                            
  exitLogin: 'candao.user.logout',                                                     
  registerCode: 'candao.user.phoneRegistSendVerficCode',                               
  registerNumber: 'candao.user.phoneRegist',                                           
  setUserName: 'candao.user.updateNickName',    
  setName: url + 'SecretAction?actionId=44&serviceId=4' + key,
  setSex: 'candao.user.updateSex',         
  setBirthday: url + 'SecretAction?actionId=47&serviceId=4' + key,
  revisePwd: url + 'SecretAction?actionId=15&serviceId=4' + key,
  cancelOrder: 'candao.orderOwn.cancelOrder',
  confirmOrder: 'candao.orderOwn.finishOrder',
  nearshops: 'candao.storeStandard.getNearStoreList',
  getMemberInformation: urlk + 'openapi/v4_3/card/by/',
  getActivityLib: urlk + 'openapi/v4_2/salesPromotion/list',
  getCouponLib: urlk + 'openapi/v4_3/coupon/by/',//根据卡号和状态查询优惠券 （有效/已使用/已过期）
  getCouponQ: urlk + 'openapi/v4_2/pickUpCoupon/pickUp',
  useCoupon: urlk + 'openapi/v4_3/coupon/verification',
  // useCoupon: urlk + 'openapi/v4_2/coupon/verification',
  couponlist: urlk +'openapi/v4_3/calculation/coupon',
  cancelOrderVk: urlk + 'openapi/v4_2/order/cancel/',
  updateInfoVK: urlk +"openapi/v4_3/card/update",//修改会员信息
  confirmOrderVk: urlk + 'openapi/v4_2/order/complete/',
  getloadingImg: urlk + 'webapi/v4_1/getParentStartImg/' + storeID,
  GetSharepersoninfo: urlk + 'webapi/v4_1/activity/participation/information/',
  getActivityList: urlk + 'webapi/v4_1/activity/',
  getActivity: urlk + 'webapi/v4_1/activity/getBrandActivity/',
  getUseIt: urlk + 'webapi/v4_1/activity/participate',
  fastRegister: urlk + 'openapi/v4_2/card/fastRegister',
  refund: url + 'SecretAction?actionId=14&serviceId=7' + key,
  cash: urlk + 'webapi/v4_1/activity/rewardMoneyConvertCardBalance',
  OpenCityList: "candao.storeStandard.getOpenCityList",//开放城市
  listDistrict: "candao.base.listDistrict",//获取县/区列表
  getStoreList: "candao.storeStandard.getStoreList",//获取门店列表
  listProvince: 'candao.base.listProvince', 
  listCity: 'candao.base.listCity', 
  listDistrict: 'candao.base.listDistrict', 
  getTemplates:"candao.sms.getWxaSubscribeTemplates",
  getPayCode: urlk + 'miniapiplus/v1/card/paymentcode',//获取付款码
  getHuiyuanma: urlk +"openapi/v4_3/cardCode/queryByCardNo/",//获取会员码
  key:"jdhajshdjf871238767o",
  getRecharge: urlk +"openapi/v4_3/recharge/getPackage",
  gorecharge:urlk +"openapi/v4_3/weixin/recharge",
  addfromId: urlk +"openapi/v4_3/push/addfromId" ,
  level: urlk + "openapi/v4_3/level/by",//等级权益查询
  exchangegift: urlk + 'miniapiplus/v1/point_exchange_gifts/add',//兑换礼品
  getgoodsDetail: urlk + 'miniapiplus/v4/pointProduct/get/',//获取商品详情
  getproductlists: urlk + 'miniapiplus/v4/pointProduct/list/',//获取商品列表
  getLogin: urlk + 'miniapiplus/user/login/member/login',  //登录 
  verifyMon: urlk + 'miniapiplus/user/center/asset/verify',  //资产转移(01)输入密码之前调用
  transfer: urlk + 'miniapiplus/user/center/asset/transfer',//资产转移02-输入密码之后调用         
  view: urlk + 'miniapiplus/user/center/feedback/add',//意见反馈        
  veriBir: urlk + 'user/center/birth/update?birth=2018-09-18',//修改生日    
  veriSex: urlk + 'miniapiplus/user/center/sex/update/{sex}',//修改性别     
  veriPwd: urlk + 'miniapiplus/user/center/password/update',//修改密码      
  fullGive: urlk + 'miniapiplus/v1/card/levelPrivileges',//消费满送信息      
  resetPwd1: urlk + 'miniapiplus/user/sendCode/forPass/',//重置密码第一步获取验证码        
  memLevel: urlk + 'openapi/v4_3/levellist',//会员等级查询 
  recordData: urlk + 'openapi/v4_3/transList',//查询交易记录
  getUserAgreement: urlk + 'openapi/v4_3/brand/getUserAgreement',//查询交易记录
  getTimestamp: urlk + 'openapi/v4_3/getCurrentTimeMilli',//获取服务器时间戳
  subscription: urlk + 'openapi/v4_3/get/subscription',//获取订阅权限templateid
  addOpenId: urlk +'openapi/v4_3/card/addOpenId',//获取订阅权限templateid
}