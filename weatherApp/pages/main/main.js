// pages/main/main.js
Page({

/**
 * 页面的初始数据
 */
data: {
    city: ""
},

/**
 * 生命周期函数--监听页面加载
 */
onLoad: function (options) {
    // 页面初始化  options 为页面跳转所带来的参数
    this.loadInfo();
},

/* 获得经纬度 */
loadInfo: function() {
    var page = this;
    // 使用 getLoaction 需要在 app.json 配置 "permission" 字段
    wx.getLocation({
        type: 'gcj02', //返回可以用于wx.openLocation的经纬度
        success (res) {
            const latitude = res.latitude;
            const longitude = res.longitude;
            console.log(latitude, longitude);
            page.loadCity(latitude, longitude);

        //     /* 加载 打开 外部地图 */
        //     wx.openLocation({
        //     latitude,
        //     longitude,
        //     scale: 18
        //     })
        }
    })
},

/* 根据经纬度获得城市名称 */
loadCity: function(latitude, longitude) {
    let link = 'http://api.map.baidu.com/reverse_geocoding/v3/?ak=qHZTdVrdKio5uE7p5kAx0gb1BZrGFbzC&output=json&coordtype=wgs84ll&location=31.225696,121.49884';
    console.log(link);
    wx.request({
        // 使用 百度地图 地址查询 API
        // ak: 申请百度地图开发者 获得ak
        // 微信公众平台 开发 服务器配置 将 https://api.map.baidu.com 设为合法域名
        // url: 'https://api.map.baidu.com/geocoder/v2/?ak=qHZTdVrdKio5uE7p5kAx0gb1BZrGFbzC&location='+latitude+','+longitude+'&output=json',
        url: 'https://api.map.baidu.com/reverse_geocoding/v3/?ak=qHZTdVrdKio5uE7p5kAx0gb1BZrGFbzC&output=json&coordtype=wgs84ll&location='+latitude+','+longitude,

        header: {
            'content-type': 'application/json' // 默认值
        },
        // data: {
        //     x: 'latitude',
        //     y: 'longitude'
        // },
        success (res) {
            console.log(res.data);
            // 获得城市名称
            var city = res.data.result.addressComponent.city;
        }
        
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