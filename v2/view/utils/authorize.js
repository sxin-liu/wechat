import { getAuth } from '../api/api';
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
                                wx.getUserInfo({
                                    success: function (userData) {
                                        var iv = userData['iv'];
                                        var encryptedData = userData['encryptedData'];
                                        var params = {
                                            code: code,
                                            iv: iv,
                                            encryptedData: encryptedData
                                        };

                                        getAuth(params).then(res => {
                                            wx.setStorageSync('token', res.d.token);
                                            getApp().globalData.token = res.d.token;
                                            reslove(res);
                                        })
                                    }
                                })
                            }
                        }
                    })
                }
            }
        }
    })
}