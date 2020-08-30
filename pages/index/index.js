// 引入 用来发送请求的方法  一定要把路径补全
// 通过解构方式来拿导出的 request函数 放到 { request }
import { request } from "../../request/index.js";

Page({
  data: {
    //轮播图数组
    swiperList: [],
    //导航数组
    navList: [],
    // 楼层
    floorList: []
  },
  // 页面开始加载 就会触发
  onLoad: function (options) {
    // 1 发送异步请求获取轮播图数据
    // wx.request({
    //   url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
    //   success: (result)=>{
    //     //  console.log(result);
    //     // 获取轮播图数据
    //     this.setData({
    //       swiperList:result.data.message,
    //     })
    //   }
    // });
    // 获取导航数据
    // wx.request({
    //   url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/catitems',
    //   success: (result) => {
    //     // console.log(result);
    //     this.setData({
    //       navList: result.data.message
    //     })
    //   }
    // });
    // 获取楼层数据
    // wx.request({
    //   url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/floordata',
    //   success: (result) => {
    //     console.log(result);
    //     this.setData({
    //       floorList: result.data.message
    //     })
    //   }
    // });
    // 调用获取轮播图数据的方法
    this.getSwiperList()
    // 调用获取导航数据方法
    this.getNavList()
    // 调用获取楼层数据方法
    this.getFloorList()

  },
  // 获取轮播图数据
  getSwiperList() {
    // 1 发送异步请求获取轮播图数据
    // 用上封装的代码,url最终会被解构而传到封装代码的...params里
    request({ url: '/home/swiperdata' })
      // 请求成功会触发一个 .then函数,将成功的返回值存在里面
      .then(result => {
        // this.setData({})把变量值渲染到视图层
        this.setData({
          swiperList: result.data.message,
        })
      })
  },
  // 获取导航数据
  getNavList() {
    // 1 发送异步请求导航数据数据
    // 用上封装的代码,url最终会被解构而传到封装代码的...params里
    request({ url: '/home/catitems' })
      // 请求成功会触发一个 .then函数,将成功的返回值存在里面
      .then(result => {
        // this.setData({})把变量值渲染到视图层
        this.setData({
          navList: result.data.message
        })
      })
  },
  // 获取楼层数据
  getFloorList() {
    // 1 发送异步请求获取轮播图数据
    // 用上封装的代码,url最终会被解构而传到封装代码的...params里
    request({  url: '/home/floordata' })
      // 请求成功会触发一个 .then函数,将成功的返回值存在里面
      .then(result => {
        // this.setData({})把变量值渲染到视图层
        this.setData({
          floorList: result.data.message,
        })
      })
  }
})
