//index.js

// 引用百度地图微信小程序JSAPI模块 
var bmap = require('../../libs/bmap-wx.js');

//获取应用实例
const app = getApp();
var count = 0;
Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    weatherData: '',
    weatherResults: ''
  },
  //下拉刷新
  onPullDownRefresh() {
    wx.showNavigationBarLoading()

    var that = this;
    // 新建百度地图对象 
    var BMap = new bmap.BMapWX({
      ak: 'GBiDGoZTXIZYTzpIQ7YySTg6VkeAgj10'
    });
    var fail = function (data) {
      console.log(data)
    };
    var success = function (data) {
      var weatherData = data.currentWeather[0];
      var weatherResults = data.originalData.results[0];
      that.setData({
        weatherData: weatherData,
        weatherResults: weatherResults,
      });
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
    }
    BMap.weather({
      fail: fail,
      success: success
    });
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    this.setData({
      namejson: app.globalData.namejson
    })
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }

    var that = this;
    // 新建百度地图对象 
    var BMap = new bmap.BMapWX({
      ak: 'GBiDGoZTXIZYTzpIQ7YySTg6VkeAgj10'
    });
    var fail = function (data) {
      console.log(data)
    };
    var success = function (data) {
      var weatherData = data.currentWeather[0];
      var weatherResults = data.originalData.results[0];
      that.setData({
        weatherData: weatherData,
        weatherResults: weatherResults,
      });
    }
    // 发起weather请求 
    BMap.weather({
      fail: fail,
      success: success
    });
  },
  //改变城市
  changeCity: function () {
    var that = this;
    wx.chooseLocation({
      success: function (res) {
        //console.log(res, "location")//获取选取的地点
        // 新建百度地图对象 
        var BMap = new bmap.BMapWX({
          ak: 'GBiDGoZTXIZYTzpIQ7YySTg6VkeAgj10'
        });
        var fail = function (data) {
          console.log(data)
        };
        var success = function (data) {
          var weatherData = data.currentWeather[0];
          var weatherResults = data.originalData.results[0];
          that.setData({
            weatherData: weatherData,
            weatherResults: weatherResults,
          });
        }
        BMap.weather({
          location: res.longitude + ',' + res.latitude,
          fail: fail,
          success: success
        });
      }
    })



    // //请求经纬度
    //     wx.request({
    //       url: 'https://api.map.baidu.com/geocoder?address=鹰潭市&output=json&key=37492c0ee6f924cb5e934fa08c6b1676&city=%E5%8C%97%E4%BA%AC%E5%B8%82',
    //       header: {
    //         'content-type': 'application/json' // 默认值
    //       },
    //       success: function (res) {
    //         var lat = res.data.result.location.lat;
    //         var lng = res.data.result.location.lng;

    //         // 发起weather请求 
    //         var jwd = lng + ',' +lat;
    //         //console.log(jwd);
    //         BMap.weather({
    //           location: jwd,
    //           fail: fail,
    //           success: success
    //         }); 
    //       }
    //     })
  },
  getUserInfo: function (e) {
    // console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
