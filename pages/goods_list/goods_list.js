// pages/goods_list/goods_list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    titles: ['综合', '销量', '价格'],
    // 商品列表标题的下标，，默认时候 0
    currenrIndex: 0,
    scrollTop: 0,
    // 获取商品数据
    goodsList: [],
    //tab框(选中框，默认选中的下标是 0 )
    selected: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    wx.request({
      url: 'https://api-hmugo-web.itheima.net/api/public/v1/goods/search',
      success: (result) => {
        // console.log(result.data.message.goods);
        this.setData({
          goodsList:result.data.message.goods,
        })
      },
    });
    
  },
  // 处理商品标题点击事件
  handleSelectedt(e) {
    console.log(e);
    // 获取被点击的列表标题 id
    /**
      e.currentTarget.dataset = { index: 1 }
      { index }={ index: 1 }
      currenrIndex: 0,
      currenrIndex: index
      currenrIndex = index
      index = 被点击标题的下标
    */
    const { index } = e.currentTarget.dataset;
    //  console.log(index);
    // this.setData({
    //   // 被点击的标题下标赋值给已设定的默认下标
    //   currenrIndex: index,
    //   scrollTop:0
  
    // })
    let that= this //声明一个变量指向实例this，保证作用域一致
    if( index == 0){  
      that.setData({
        currenrIndex: 0
      })
    }else if( index == 1) {
      that.setData({
        currenrIndex: 1
      })
    }else{
      that.setData({
        currenrIndex: 2
      })
    }
    
  }

});