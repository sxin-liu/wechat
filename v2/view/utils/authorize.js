import { getAuth } from '../api/api';
export function getAuthorize(e) {
    var { token } = getApp().globalData;
    return new Promise((reslove, reject) => {
        if (token && token.indexOf('open_') == -1) {
            reslove();
        } else {
            if (wx.getUserProfile) {
                console.log('支持wx.getUserProfile')

                wx.getUserProfile({
                    desc: '用于完善用户资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
                    complete: (userData) => {
                        console.log(userData)

                        if (userData.errMsg === 'getUserProfile:ok') {
                            wx.login({
                                success(loginData) {
                                    console.log(loginData)
                                    var params = {
                                        code: loginData['code'],
                                        avatar: userData.userInfo.avatarUrl,
                                        nickname: userData.userInfo.nickName
                                    };

                                    getAuth(params).then(res => {
                                        wx.setStorageSync('token', res.d.token);
                                        getApp().globalData.token = res.d.token;
                                        reslove(res);
                                    })
                                },
                            })
                        } else {
                            getApp().error('授权失败');
                            reject('授权失败');
                        }
                    }
                })
            } else {
                console.log('不支持wx.getUserProfile')
                wx.login({
                    success(loginData) {
                        wx.getUserInfo({
                            success: function (userData) {
                                var params = {
                                    code: loginData['code'],
                                    avatar: userData.userInfo.avatarUrl,
                                    nickname: userData.userInfo.nickName
                                };

                                console.log(userData)
                                getAuth(params).then(res => {
                                    wx.setStorageSync('token', res.d.token);
                                    getApp().globalData.token = res.d.token;
                                    reslove(res);
                                })
                            }
                        })
                    }
                })
            }
        }
    })
}