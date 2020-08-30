// export导出去，参数 params
export const request = (params) => {
    // 定义公共的url
    const baseUrl = 'https://api-hmugo-web.itheima.net/api/public/v1';
    // 返回一个promise对象
    return new Promise((resolve, reject) => {
        // 解构参数  ...params,
        wx.request({
            ...params,
            url:baseUrl+params.url,// 公共url-baseUrl+后面传递的url-params.url
            // 成功之后接收返回值success: (result)
            success: (result) => {
                // 然后把成功的值丢到  resolve(result)
                resolve(result);
            },
            // 失败之后的提示信息
            fail: (err) => {
                reject(err);
            }
        });
    })
}