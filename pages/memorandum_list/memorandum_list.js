// pages/memorandum_list/memorandum_list.js
const app = getApp()
var util = require('../../utils/util.js');
// 引进Bmob后端云JS
var Bmob = require('../../utils/bmob.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username: "柚子袖",
    openid: "",
    
   
    list: [
      //   {
      //     content: '今天是周五，早点下班吧',
      //     time: 44343232131231,
      //     id: new Date().getTime(),
      //     isShow: false
      //   }
    ],
    showAll: true,

  },
  /**
  * 点击编辑意见
  */
  add() {
    // console.log("aaa");
    var username = this.data.username;
    wx.navigateTo({
      url: '/pages/memorandum_add/memorandum_add?name=' + username,
    })
  },
  edit: function (e) {
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/memorandum_add/memorandum_add?id=' + id
    })
  },

  toggle: function (e) {
    var id = e.currentTarget.dataset.id;
    var lists = this.data.list;
    var index = -1;
    lists.forEach(function (item, i) {
      if (item.id == id) {
        item.isShow = !item.isShow;
      }
    });
    this.setData({
      list: lists
    })
  },









  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var username = options.name;
    this.setData({
      username
    })



    var that = this;
    wx.getStorage({
      key: 'openid',
      success: function (res) {
        // console.log(res)
        that.setData({
          openid: res.data
        })
      },
    });
   

  },
  // add: function (e) {
  //   wx.navigateTo({
  //     url: '../memorandum_add/memorandum_add'
  //   })
  // },
  edit1: function (e) {
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../memorandum_add/memorandum_add?id=' + id
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
    wx.getStorage({
      key: 'openid',
      success: function(res) {
        that.setData({
          openid: res.data
        });
        var openID = that.data.openid;
        // 获取数据库的数据
        // 连接数据库创建类
        var Suggest = Bmob.Object.extend("Design_memorandum");
        var query = new Bmob.Query(Suggest);
        // 条件查询 条件为标识为ture
        //query.equalTo("biaoshi", true)
        query.equalTo("userID", openID)
        query.find({
          success: function (result) {
            // console.log(result)
            console.log("共查询到" + result.length + "条记录");
            // 反转数组 让最后加入的显示在最前面
            result.reverse();
            // 把获得的数据添加到data里面
            that.setData({
              list: result
            })
            console.log(that.data.list)
          },
          error: function (error, result) {
            console.log("查询不到")
          }
        })
      },
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

  },



  btnDelete(e) {
    // 遍历数组中的内容 如果有被选中的就存到新的数组 如果没有则弹框显示还没选择要删除的内容
    //var arr = this.data.list;
    var id = e.currentTarget.dataset.id;
    var that = this;
    // var newArr = []
    wx.showModal({
      title: '删除提示',
      content: '你确认删除所选内容吗',
      success: function (res) {
        if (res.confirm) {
         
            var Booking = Bmob.Object.extend("Design_memorandum");
              var query = new Bmob.Query(Booking);
              query.get(id, {
                success: function (obj) {
                  obj.destroy({
                    success: function (del) {
                      console.log("删除成功");
                      that.onShow();
                      
                    },
                    error: function (obj, error) {
                      console.log("删除失败");
                    }
                  });
                },
                error: function (obj, error) {
                  console.log("查询不到")
                }
              })
            
          
        }
      }
    })
},

  // /**
  // * 单选按钮
  // */
  // delDetail(e) {
  //   console.log(e)
  //   var index = e.currentTarget.dataset.index;
  //   var id = e.currentTarget.dataset.id
  //   var arr = this.data.list;
  //   // console.log(arr)
  //   arr[index].radio = !arr[index].radio
  //   this.setData({
  //     bookingDetailsList: arr
  //   })
  //   console.log(arr);

  //   // 反正法  判断全选 
  //   // 假设所有单选按钮都选中了
  //   var flag = true;
  //   // // 验证假设 判断数组
  //   arr.forEach((v, i) => {
  //     if (v.radio != true) {
  //       flag = false;
  //       return
  //     }
  //   })
  //   this.setData({
  //     allChecked: flag
  //   })

  // },
})