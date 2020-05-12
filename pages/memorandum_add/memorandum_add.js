// pages/memorandum_add/memorandum_add.js
var util = require('../../utils/util.js');

// 引进Bmob后端云JS
var Bmob = require('../../utils/bmob.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    txtarea: '',
    username: '',
    openid: '',
    curday: ''

  },

  /**
 * 文本框的值
 */
  txtarea(e) {
    var txtarea = e.detail.value;
    this.setData({
      txtarea
    })
  },

  /**
 * 提交按钮
 */
  save() {
    var that = this;
    var suggestContent = that.data.txtarea;
    var openid = that.data.openid;
    var username = that.data.username;
    var curday = util.formatTime(new Date());
    if (suggestContent == "") {
      wx.showToast({
        title: '请编辑意见',
        icon: 'none',
        duration: 2000
      })

    } else if (username.length == 0 || username == "undefined") {
      wx.showToast({
        title: '请重新登录',
        icon: 'none',
        duration: 2000
      })
    } else {
      var Suggest = Bmob.Object.extend("Design_memorandum");
      var suggest = new Suggest();
      //var daka = new Daka();
      suggest.set("userID", openid);
      suggest.set("suggestContent", suggestContent);
      suggest.set("biaoshi", true);
      suggest.set("username", username);
      suggest.set("curday", curday);
      suggest.save(null, {
        success: function (result) {
          wx.showToast({
            title: '提交成功',
            duration: 2000
          })
          // 用setTimeout定时跳转到意见反馈页面
          setTimeout(function () {
            wx.navigateTo({
              url: '/pages/memorandum_list/memorandum_list',
            })
          }, 2000)
        },
        error: function (error) {
          console.log("提交失败")
          wx.showToast({
            title: '提交失败',
            icon: 'none',
            duration: 2000
          })
        }
      })
    }
  },
  cancle: function () {
    wx.navigateBack();
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getStorage({
      key: 'username',
      success: function (res) {
        that.setData({
          username: res.data
        })
      },
    })
    wx.getStorage({
      key: 'openid',
      success: function (res) {
        // console.log(res);
        that.setData({
          openid: res.data
        })
      },
    })

  },
  savel: function () {
    var reg = /^\s*$/g;
    if (this.data.content && !reg.test(this.data.content)) {
      saveData(this);
    }
    wx.navigateBack();
  },
  edit: function (e) {
    var val = e.detail.value;
    this.setData({
      content: val
    });
  },
  cancle: function () {
    wx.navigateBack();
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

  }
})

function saveData(page) {
  var lists = wx.getStorageSync('lists') || [];
  var flag = true;
  var index = -1;
  lists.forEach(function (item, i) {
    if (item.id == page.data.id) {
      flag = false;
      index = i;
    }
  })
  if (flag) {
    page.setData({
      time: timeFunc.formatTime(new Date()),
      id: Date.now()
    });
    lists.unshift(page.data);
  } else {
    lists[index].content = page.data.content;
    lists[index].time = timeFunc.formatTime(new Date());
    lists.unshift(lists[index]);
    lists.splice(index + 1, 1);
  }
  wx.setStorageSync('lists', lists);
}