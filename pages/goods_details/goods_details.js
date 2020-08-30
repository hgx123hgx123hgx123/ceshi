// pages/goods_details/goods_details.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsDitail: {},// 获取商品详情数据
    index:null,
    isCollect: false, //定义收藏的状态 默认是false


  },
  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function () {
  // onShow 获取options的方法
  // 获取当前小程序的页面栈
  var pages = getCurrentPages();
  // 数组中索引最大的页面--当前页面
  var currentPage = pages[pages.length - 1];
  // 打印出当前页面中的 options
  var options = currentPage.options;
  //正常打印出 options 值
    console.log(options)		

    // 将二面传递过来的参数赋值给 { goods_id }
    const { goods_id } = options;

    // 网络请求商品详情数据,该接口数据是一个对象，要根据goods_id请求商品数据
    wx.request({
      /**
       url: 'https://api-hmugo-web.itheima.net/api/public/v1/goods/detail', data: { goods_id },
       , data: { goods_id }要查看的商品 goods_id，如果没有goods_id那么就没有商品详情的数据
       */
      url: 'https://api-hmugo-web.itheima.net/api/public/v1/goods/detail?data:{ goods_id }',
      data: { goods_id },// 接收页面点击时传递过来的的参数
      success: (result)=>{
        console.log(result.data.message);
        this.setData({
          goodsDitail: result.data.message,
          // goods_id:options.goods_id // 商品id
        })
      },
    });
   
    //(收藏)获取参数值
    var index = options.goods_id;
    // 更新data中index的状态
    console.log(index);
    this.setData({
      index:index
    })
    //根据本地缓存的数据判断用户是否收藏当前的商品,有值就返回值，没值就返回一个空数组
    var detailStorage = wx.getStorageSync('isCollect');
    console.log(detailStorage);
    if (!detailStorage) {
      //要是没有缓存，就初始化一个空对象
      wx.setStorageSync('isCollect',{});
    }
    //判断用户是否收藏
    if (detailStorage[index]) {  //收藏过isCollect就是true
      this.setData({
        isCollect:true
      })

      // 购物车
      
      
    }
  },
  // 点击浏览大图事件
  handlePreviewImage(e) {
    console.log(e);
    var data = this.data.goodsDitail;
    console.log(data);
    var current = e.currentTarget.dataset.url;
    wx.previewImage({
      current: current, // 当前显示图片的http链接
      urls: [current] // 需要预览的图片http链接列表 类型：数组中带有字符串
    })
  },
  // 收藏点击事件
  handleCollect() {
    // 获取 data 里面的 isCollect 取反是将isCollect：false 改成 true
    var isCollect = !this.data.isCollect;
    // 更新isCollect的状态 将isCollect：false 改成 isCollect：true
    this.setData({
      isCollect
    })
    // 提示用户 条件成功为真的情况下
    var title = isCollect ? '收藏成功' : '取消收藏';
    wx.showToast({
      title:title,
      icon: 'success',
    });
    // 缓存数据到本地
    // { 1:true  2:false } 1 是下标 值是true
    var { index } = this.data;//解构index (因为在这index是一个对象)
  
    
    // 不可行 会覆盖之前的状态
    // var obj = {}; //{0:true,2:true}
    wx.getStorage({
      key: 'isCollect',
      success: (data) => {
        // console.log(data,'点击获取数据');
        // console.log(data, typeof data);
        var obj = data.data;//{0:true,1:true}
        obj[index] = isCollect;
        wx.setStorage({
        key: 'isCollect',
        data: obj,
        // 成功的回调
        success: () => {
          // console.log('缓存成功');
          }
        });
      },
    });
    
  },
  // 点击加入购物车事件
  handleAddCart() {
    // 缓存里如有值就返回对象，没值就初始化一个数组
    var cart = wx.getStorageSync('cart') || [];
    // 判断 商品对象是否存在于购物车中
    /**
      var index = cart.findIndex(v => v.goods_id === this.data.goodsDitail.goods_id);
      findIndex()只是当条件为true时findIndex()返回的是索引值，如果没有符合条件元素时findIndex()返回的是-1
      购物车里面如果存在商品那么就返回索引值，如果没有商品就返回-1
     */
    var index = cart.findIndex(v => v.goods_id === this.data.goodsDitail.goods_id);
    // console.log(index);
    if (index===-1) {
      // 不存在 第一次添加商品 商品数量就是 1 
      this.data.goodsDitail.num = 1;
      // 商品的选择状态默认是选中 true
      this.data.goodsDitail.checked = true;
      // this.data.goodsDitail.checked =true;
      // push() 方法可向数组的末尾添加一个或多个元素，并返回新的长度。（购物车添加成功就把成功的数据添加到数组尾部）
      cart.push(this.data.goodsDitail);
    } else {
      // 4 已经存在购物车数据 执行 num++
      cart[index].num++;
    }
    // 5 通过同步方法 把购物车重新添加回缓存中
    wx.setStorageSync('cart', cart);
    // 6 弹窗提示
    wx.showToast({
      title: '加入成功',
      icon: 'success',
      // true 防止用户手抖 疯狂点击按钮
      mask:true
    })
  }
})