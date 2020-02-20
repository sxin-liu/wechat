import { HEADER, AUTHORIZE_PAGE } from './../config.js';
/**
 * 发送请求
 */
export default function request(api, method, data, error) {
  let baseUrl = getApp().globalData.baseUrl, header = HEADER;

  if (getApp().globalData.token) header.token = getApp().globalData.token;

  data? data.v = new Date().getTime(): {};

  wx.showNavigationBarLoading();

  return new Promise((reslove, reject) => {
    wx.request({
      url: baseUrl + '/' + 'frontend/' +  api,
      method: method || 'POST',
      header: header,
      data: data,
      success: (res) => {

        if (res.data.c == 0) {
          reslove(res.data)
        } else {
          getApp().hideLoading();

          // 用户未登录
          if ([10000, 110].indexOf(res.data.c) !== -1) {
            getApp().showModal(res.data.m, function () {
              getApp().globalData.token = '';
              wx.clearStorageSync();
              wx.reLaunch({
                url: AUTHORIZE_PAGE
              })
            })
          } else {
              if (error == true)
                  reject(res.data);
              else
                  res.data.m? res.data.m.length < 6? getApp().error(res.data.m): getApp().text(res.data.m): reject(res.data);
          }
        }
      },
      complete: function (res) {
        wx.hideNavigationBarLoading();
        wx.stopPullDownRefresh();

        if (res.statusCode != 200) {
          wx.hideLoading();
        }

        if (res.statusCode == 504) {
          getApp().showModal(api, () => {
            wx.navigateBack();
          }, '网关超时 ' + res.statusCode);
        } else if (res.statusCode != 500 && res.statusCode == 504) {
          getApp().showModal(api, () => {
            wx.navigateBack();
          }, '请求超时 ' + res.statusCode);
        } else if (res.statusCode == 500) {
          getApp().showModal(api, () => {
            wx.navigateBack();
          }, '服务器发生错误 ' + res.statusCode);
        } else if (res.statusCode != 200) {
          getApp().showModal(api, () => {
            wx.navigateBack();
          }, '未知错误 ' + res.statusCode)
        }
      },
      fail: function (res) {
        wx.hideLoading();
        getApp().text('服务器开小差了~')
      }
    })
  });
}

['options', 'get', 'post', 'put', 'head', 'delete', 'trace', 'connect'].forEach((method) => {
  request[method] = (api, data, opt) => request(api, method, data, opt || {})
});

