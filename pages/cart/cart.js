var app = getApp();
Page({
  /**页面的初始数据*/
  data: {
    address: {},// 收货地址
    cart: [],// 购物车
    allChecked: false,//商品全选  默认是false
    totalPrice: 0,//总价格开始是 0
    totalNum: 0,//总价格开始是 0
    goods_price:'',//商品单价
  },
  // onShow页面显示时调用(启动/页面从隐藏到启动)，可调用多次。(获取地址及显示地址需要多次调用)
  onShow: function () {
      // 获取缓存中的收货地址
    var address = wx.getStorageSync('result1');
    // console.log(address);
      // 给data里的address赋值
      this.setData({
        address
      })
    // （重点） 获取购物车商品 有值就返回对象，没值就初始化一个数组
    var cart = wx.getStorageSync('cart') || [];
    console.log(cart);
    
    // （重点） 计算全选
    // 如果数组中检测到有一个元素不满足，则整个表达式返回 false ，且剩余的元素不会再进行检测。
    // 如果所有元素都满足条件，则返回 true。
    // every() 不会对空数组进行检测。
    // every() 不会改变原始数组。
    const allChecked = cart.length ? cart.every(v => v.checked) : false;
    // 总价格 总数量
    var totalPrice = 0;
    var totalNum = 0;
    cart.forEach(v => { //循环购物车里面的商品
      if (v.checked) { // 如果商品存在且被选中
        totalPrice += v.num*v.goods_price;//价格等于数量*单价
        totalNum += v.num;
      }  
    })
    this.setData({
      cart,
      allChecked,
      totalPrice,
      totalNum,
      
    })
  },
  // 地址点击事件
  handleAddress() {
    
      // wx.getSetting 获取用户的当前设置。返回值中只会出现小程序已经向用户请求过的权限。
      // 开发者可以调用 wx.openSetting 打开设置界面，引导用户开启授权。
      // 调用地址前需要 用户授权 scope.address
      // 通讯地址 scope.address：true undefined直接调用收货地址 false先诱导用户打开授权
     // 获取用户的当前设置。返回值中只会出现小程序已经向用户请求过的权限。
      wx.getSetting({
        success: (result)=>{
          console.log(result);
          // 获取授权状态
          // scope.address 只要属性名很怪异的时候都要使用[] ["scope.address"]形式获取属性值
          // 获取地址授权状态
          var scopeAddress = result.authSetting["scope.address"];
          console.log(scopeAddress);
          // 如果用户已经授权或初次授权，则获取用户地址
          if (scopeAddress === true || scopeAddress === undefined) {
            // wx.chooseAddress 获取用户收货地址。调起用户编辑收货地址原生界面，并在编辑完成后返回用户选择的地址。
            wx.chooseAddress({  // 就调用地址
              success: (result1)=>{
                console.log(result1);
                 // 将地址保存到缓存中
                wx.setStorageSync('result1', result1);
              }
            });
          } else { // 如果scopeAddress===false
            // wx.openSetting  调起客户端小程序设置界面，返回用户设置的操作结果
            // 如果用户之前拒绝过授权，则打开权限设置页面，然用户开启授权
            wx.openSetting({
              success: (result2)=>{
                wx.chooseAddress({
                  success: (result1)=>{
                    console.log(result1);
                     // 将地址保存到缓存中
                    wx.setStorageSync('result1', result1);
                  }
                });
              }
            });
          }
        }
      });
  },
  // 商品选中点击事件
  handleSelectGoods(e) {
      // console.log(e);
    // 1、获取被修改的商品id
    var goods_id = e.currentTarget.dataset.id;
      // console.log(goods_id);
    // 2、获取购物车中的数组
    var { cart } = this.data;
      // console.log(cart);
    // 3、（重点） 获取被修改的对象
    // findIndex() 函数用法
    //当数组中的元素在测试条件时返回 true 时, findIndex() 返回符合条件的元素的索引位置，之后的值不会再调用执行函数。
    // 如果没有符合条件的元素返回 -1
    var index = cart.findIndex(v => v.goods_id === goods_id);
    // console.log(index);
    // 4、（重点） 商品选中的状态要 取反
    cart[index].checked = !cart[index].checked;
     // 输出结果商品选中打钩状态 checked就是true 商品没被选中 checked就是false
    console.log(cart[index].checked); 
    // 5、把已经修改的购物车的数据设置回data中 和 缓存中
    this.setData({
      cart
    });
    wx.setStorageSync('cart', cart);
    // 7、商品未选中时商品的价格也不会被计算在总里面 所以在此引用了商品总价格计算的代码
    const allChecked = cart.length ? cart.every(v => v.checked) : false;
    // 总价格 总数量
    var totalPrice = 0;
    var totalNum = 0;
    cart.forEach(v => { //循环购物车里面的商品
      if (v.checked) { // 如果商品存在且被选中
        totalPrice += v.num*v.goods_price;//价格等于数量*单价
        totalNum += v.num;
      }  
    })
    this.setData({
      cart,
      allChecked,
      totalPrice,
      totalNum,
      
    })
  },
  // 商品全选点击事件
  handleSelectAllCheck() {
    // 1、（重点） 获取data中cart的数据
    var { cart } = this.data;
    console.log( cart );
    // 获取data中allChecked的数据
    var { allChecked } = this.data;
    console.log(allChecked);
    // 2、修改allChecked的值,因为全选的值默认是 false
    allChecked = !allChecked;
    //3、（重点） 循环修改cart数组 中的商品选中状态,单个商品的checked为true时 那么allChecked选中状态就为true，如为false时同理
    cart.forEach(v => v.checked = allChecked);
    // const allChecked = cart.length ? cart.every(v => v.checked) : false;
    // 4、点击全选按钮时就会自己动计算总价格，全选未选中则反之
    // 总价格 总数量
    var totalPrice = 0;
    var totalNum = 0;
    cart.forEach(v => { //循环购物车里面的商品
      if (v.checked) { // 如果商品存在且被选中
        totalPrice += v.num*v.goods_price;//价格等于数量*单价
        totalNum += v.num;
      }  
    })
    this.setData({
      cart,
      allChecked,
      totalPrice,
      totalNum,
      
    })
    // 5、把修改后的值 填充回data或者缓存中
    this.setData({
      cart,
      allChecked
    })
    
  },
  // 购物车数量加减
  handleEditNum(e) {
    console.log(e);
    // 1、 获取模板传过来的参数 商品 id
    var id = e.currentTarget.dataset.id;
    console.log(id);
    // 2、获取模板传过来的参数 商品加减数量  operate
    var operate = e.currentTarget.dataset.operate;
    // 3、获取购物车数组
    var { cart } = this.data;
    // 4、找到需要修改的商品的索引
    var index = cart.findIndex(v => v.goods_id === id)
    // console.log(index);
    //5、 判断 是否要执行删除( 当商品的数量等于 1 或者 operate减号的值等于 -1 )
    if (cart[index].num===1&&operate===-1) {
      //5.1 弹窗提示
      wx.showModal({
        title: '提示',
        content: '您是否要删除',
        //因为在这里使用this.setData（{}） 所以要变成箭头函数
        //箭头 函数本身没有 this 指向 便指向全局
        success :(res) => {  
          if (res.confirm) {
            //这句话中第一个index指的是从cart[index]开始，1指删除1个数据
            cart.splice(index, 1);
            console.log(cart);
            // 删除商品的时候商品总价也有改动
            var totalPrice = 0;
            var totalNum = 0;
            cart.forEach(v => { //循环购物车里面的商品
              if (v.checked) { // 如果商品存在且被选中
                totalPrice += v.num*v.goods_price;//价格等于数量*单价
                totalNum += v.num;
              }  
            })
            // 把修改后的数据填充到data中
            this.setData({
              cart,
              totalPrice,
              totalNum,
            });
            // 把修改后数据填充到缓存中
            wx.setStorageSync('cart', cart);
            // 吧数据填充回data或缓存中

          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    } else {
      // 6、进行商品数量修改
      cart[index].num += operate;
      // 添加商品的时候商品总价也有改动
      var totalPrice = 0;
      var totalNum = 0;
      cart.forEach(v => { //循环购物车里面的商品
        if (v.checked) { // 如果商品存在且被选中
          totalPrice += v.num*v.goods_price;//价格等于数量*单价
          totalNum += v.num;
        }  
      })
      // 把修改后的数据填充到data中
      this.setData({
        cart,
        totalPrice,
        totalNum,
      });
    }
    
  },
  //点击结算事件
  handleBalance() {
    console.log('结算啦');
    // 获取收货地址
    var { address } = this.data;
    // 获取商品数量
    var { totalNum } = this.data;
    if (!address.userName) { //判断没有收货地址就提示用户去添加地址
      wx.showToast({
        title: '您还没有选择收货地址',
        icon: 'none',
        duration: 1500,
      });
    }else if (totalNum ===0) {//判断没有商品就提示用户去添加商品
      wx.showToast({
        title: '您购物车里还没有商品',
        icon: 'none',
        duration: 1500, 
      });
    } else { // 如果地址跟商品都存在，那么就跳转到支付页面
      wx.navigateTo({
        url: '/pages/pay/pay',
      });
    }
  }
})
