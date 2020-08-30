// pages/classify/classify.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 分类左边数据
    catesList: [],
    //被点击的左侧菜单,选中默认的是第一条数据,菜单id
    currenrIndex: 0,
     //右侧内容的滚动条距离顶部的距离
     scrollTop:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.request({
      url: 'https://api-hmugo-web.itheima.net/api/public/v1/categories',
      success: (result)=>{
        console.log(result);
        
        this.setData({
          // 一级数据 左侧菜单
          catesList: result.data.message,
        })
      }
    });
    
  },
  // 右侧菜单选中点击事件
  handleItemTap(e) {
     /*
    1 获取被点击的标题身上的索引
    2 给data中的currenrIndex赋值就可以了
    3 根据不同的索引来渲染右侧的商品内容
    */
    // 获取被点击的 id 左侧菜单栏 
    const { index } = e.currentTarget.dataset;
    // console.log(index);
    this.setData({
      currenrIndex: index,
      // 重新设置 右侧内容的scroll-view标签的距离顶部的距离
      scrollTop:0

    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  }

})