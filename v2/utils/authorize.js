import { getAuthorizeApi } from '../api/api';
export function getAuthorize(e, success) {
    var { token } = getApp().globalData;
    return new Promise((reslove, reject) => {
        if (e.type == "getuserinfo") {
            if (token) {
                reslove();
            } else {
                var info = e.detail;
                if (!info.iv) {
                    getApp().error('授权失败');
                    reject('授权失败');
                } else {
                    wx.login({
                        success(res) {
                            var code = res['code'];
                            if (code) {
                                var iv = info['iv'];
                                var encryptedData = info['encryptedData'];
                                var params = {
                                    code: code,
                                    iv: iv,
                                    encryptedData: encryptedData
                                };

                                getAuthorizeApi(params).then(res => {
                                    wx.setStorageSync('token', res.d.token);
                                    getApp().globalData.token = res.d.token;
                                    reslove(res);
                                })
                            }
                        }
                    })
                }
            }
        }
    })
}