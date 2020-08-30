// pages/classify/classify.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getUserInfo({
      success: (result)=>{
        console.log(result);
      },
    });
    this.setData({
      
    })
  }
   
})