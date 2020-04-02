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
    nousseData:[],
    chaPro:{},
    useData:[],
    isNotAddress_:true,
    type: [{ name: "未使用", isSel: 1, idFlag: 'bleft', typeNum: 0 }, { name: "已使用", isSel: 0, idFlag: 'bcenter', typeNum: 1 }, { name: "已过期", isSel: 0, idFlag: 'bright', typeNum: 2}],
    idFlag: 'bleft', date:'',
    typeName:'未使用',
    transId:'',
    isToast: true,
    toastData: '',
		detail_view:false,
    coupon_info_view:false,
    couponPro: [],
    isShow:0,
    hiddenLoading: true,
    vouchName:"",
    vouvhNumber:"",  
    vouchRemark:"",
    vouchimg:"",
		systheight:0,
    isShare:0,
    minheight:0,
    typeNum: 0,
    bgArr: [
      "../../imgs/Coupon_01.png", "../../imgs/Coupon_02.png", "../../imgs/Coupon_03.png", "../../imgs/Coupon_04.png", "../../imgs/Coupon_05.png", "../../imgs/Coupon_06.png"]
  },
 

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
		console.log(options)
		var that=this
    that.getcoupons()
		wx.setNavigationBarTitle({
			title: '我的优惠券',
		})
		wx.getSystemInfo({
			success: function (res) {
				that.setData({
					systheight: res.screenHeight,
          minheight:res.screenHeight-50
				})
			},
		})
  },
  go_code: function () {
    wx.navigateTo({
      url: '../codeCoupons/codeCoupons',
    })
  },
  choice:function(e){
  console.log(e)
    // typeName
    var that = this;
    var titledata = that.data.type
    if (e.currentTarget.dataset.item.name!=that.data.typeName){
      for(var i = 0; i < that.data.type.length;i++){
        if (that.data.type[i].name == e.currentTarget.dataset.item.name){
          that.setData({
            typeName: that.data.type[i].name,
            idFlag: that.data.type[i].idFlag,
            typeNum: that.data.type[i].typeNum
            
          })

          titledata[i].isSel = 1
        }else{
          titledata[i].isSel=0
        }
      }
      if (that.data.idFlag =="bleft"){
        that.setData({
          minheight:that.data.systheight-50,
        })
      }else{
        minheight: that.data.systheight 
      }
      that.setData({
        type:titledata
      })
      that.getcoupons()
      console.log(that.data.type)
    }
  },
share:function(){
  var that = this;
  console.log(that.data.transId)
  that.setData({
    hiddenLoading: false
  })
  wx.request({
    url: url.share + that.data.transId,
    method: 'Get',
    header: {
      accessToken: constant.accessToken,
      cardId: app.globalData.cardId

    },
    success: function (res) {
      that.setData({
        hiddenLoading: true
      })
      console.log(res);
      if (res.data.code == 200) {
        that.setData({
          transId: '',
          isShare:0
        })
        that.getcoupons()
      } else {
        that.setData({
          hiddenLoading: true
        })
        wx.showModal({
          title: '分享失败',
          content: '网络开小差了，是否重试？',
          // showCancel: false,
          cancelText: "取消",//默认是“取消”
          // cancelColor: 'skyblue',//取消文字的颜色
          confirmText: "确定",//默认是“确定”
          success: function (res) {
            if (res.confirm) {
            //  that.share()
            }
          }
        })
      }
    },
    fail: function (error) {
      that.setData({
        hiddenLoading: true
      })
      wx.showModal({
        title: '分享失败',
        cancelText: "取消",//默认是“取消”
        // cancelColor: 'skyblue',//取消文字的颜色
        confirmText: "确定",//默认是“确定”
        content: '网络开小差了，是否重试？',
        // showCancel: false,
        success: function (res) {
          if (res.confirm) {
            that.share()
          }
        }
      })

    }
  })
},
  cha:function(e){
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
    var that=this;
    // that.getcoupons()
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
    var that = this;
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log('111')
      that.setData({
        coupon_info_view: false,

      })
      that.share()
      return {
        title: '我给你分享了一张' + this.data.vouchName + ',快来领取吧',
				path: '/pages/menu/menu?ticketId=' + that.data.transId + "&shareCardId=" + app.globalData.cardId + "&registPay=" + app.globalData.registPay,
        imageUrl: '/imgs/share.png',
        success: function (res) {
          // 转发成功
          console.log('成功')
          console.log(res)
        
        },
        fail: function (res) {
          // 转发失败
          that.coupClose()

          wx.showToast({
            title: constant.warm,
            icon: 'none',
            duration: 2000
          })
         
        }
        
      }
    }
  },
	check_detail:function(e){
    var that=this;
    this.setData({
      isNotAddress_: false
    })
    var data = e.currentTarget.dataset.item;
    console.log(e)
    that.setData({
      chaPro:data
    })
   
 


    
	},

	getcoupons:function(){
		var that = this
    if (app.globalData.isVka==0){
    var JSESSIONID = app.globalData.JSESSIONID
      var actionName = url.Coupons;
    if(that.data.typeNum==2){
      actionName = url.hisCoupons
    }
    wx.request({
      url: url.defaultS,
      data: {
        actionName: actionName,
        content: {
          pageSize: 0, pageNow:100000
        }

      },
      method: 'POST',
      header: JSESSIONID ? { 'Cookie': 'JSESSIONID=' + JSESSIONID } : {},
      success: function (res) {
        
        if (res.data.status == 1) {
         if(res.data.data){
           var arr1=[];
           var arr2=[];
           if(that.data.typeNum==2){
             var arr = res.data.data.outOfTimeCoupons;
             for (var i = 0; i < res.data.data.outOfTimeCoupons.length;i++){
               arr[i].coupon.bTime = arr[i].coupon.startTime.substring(0, 10)
               arr[i].coupon.eTime = arr[i].coupon.endTime.substring(0, 10)
             }
             that.setData({
               couponPro: arr
             })
           }else{
             for (var i = 0; i < res.data.data.length; i++) {
               res.data.data[i].coupon.bTime = res.data.data[i].coupon.startTime.substring(0, 10)
               res.data.data[i].coupon.eTime = res.data.data[i].coupon.endTime.substring(0, 10)
               if (res.data.data[i].isUsed) {
                 arr1.push(res.data.data[i])

               } else {
                 arr2.push(res.data.data[i])
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
        } else if (res.data.status == 9) {
          
        } else if (res.data.status == 11) {
          
        }
      }
    })
    }else{
      var str = '';
      var dict = {
        brandId: constant.brandId, storeCode: app.globalData.storeCode, clientId: constant.clientId, timestamp: Date.parse(new Date()) + app.globalData.CurrentTimeMilli, cardNo: app.globalData.vkaInfon.cardNo, type: that.data.typeNum
      }
      var exceptStr = except.except(dict)
      console.log(exceptStr)
      var header = except.removeEmpty(dict);
      header.sign = md5.hexMD5(exceptStr)
      console.log(header)
      wx.request({
        url: url.getCouponLib + app.globalData.vkaInfon.cardNo + "/" + that.data.typeNum,

        data: {
        },
        header: header,
        success: function (res) {
          console.log('++++++++++++++');
          console.log(res);
          if (res.data.code == 200) {
            console.log(res)
            for(var i = 0; i < res.data.data.length;i++){
              res.data.data[i].bTime = res.data.data[i].beginTime.substring(0, 10)
              res.data.data[i].eTime = res.data.data[i].endTime.substring(0, 10)
            }
            that.setData({
              couponPro: res.data.data
            })
            if(res.data.total <1){
              that.setData({
                isShow:1
              })
            }else{
              that.setData({
                isShow: 0
              })
            }
          }
        }
      })
    }    
		
	},
  clear:function(){
    var that = this;
    that.setData({
      isNotAddress_:true
    })
  },
  myCatchTouch(){
    console.log('stop user scroll it!');
    return;
  }
})