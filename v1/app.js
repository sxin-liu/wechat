var api = require('./api.js');
var baseUrl = '';
App({
    onLaunch: function (e) {
        this.init();
    },

    onLoad(options) {

    },

    globalData: {
        baseUrl: baseUrl,
        noLineBaseUrl: baseUrl.substring(0, baseUrl.length - 1), // 不带最后的斜杠url
        imageUrl: baseUrl + 'images/wechat',
        share: {
            // 分享
            title: '',
            path: '',
            imageUrl: ''
        },
        api: api,
        uploadImg: [],
        uploadImages: [],
    },

    //初始化
    init: function () {
        // 适配iPhone X
        wx.getSystemInfo({
            success: function (res) {
                var modelstr = res.model;
                if (modelstr.indexOf("iPhone X") != -1) {
                    wx.setStorageSync('iphoneX', '68rpx;')
                } else {
                    wx.removeStorageSync('iphoneX');
                }
            }
        })
    },

    // 用户授权
    getUserInfo(e, success) {
        if (e.type == "getuserinfo") {
            if (wx.getStorageSync('token')) {
                if (success) success();
            } else {
                var that = this;
                var info = e.detail;
                if (!info.iv) {
                    that.error('授权失败');
                } else {

                    wx.login({
                        success(res) {
                            var code = res['code'];
                            if (code) {
                                var iv = info['iv'];
                                var encryptedData = info['encryptedData'];

                                that.ajax(api.default.login, {
                                    code: code,
                                    iv: iv,
                                    encryptedData: encryptedData
                                }, function (res) {
                                    wx.setStorageSync('token', res.d.token);
                                    if (success) success(res);
                                });
                            }
                        }
                    })
                }
            }
        }
    },

    //AJAX请求
    ajax: function (url, data, success, error, mtype, head) {
        var token = wx.getStorageSync('token') || '';
        var that = this;
        var mtype = mtype ? mtype.toUpperCase() : 'POST';
        var header = head ? head : {
            'content-type': 'application/x-www-form-urlencoded',
            'token': token,
            'client': '1'
        };
        var data = data ? data : {};
        data.v = new Date().getTime();
        // data.token = token;

        wx.showNavigationBarLoading();
        wx.request({
            url: that.globalData.baseUrl +  url,
            data: data,
            method: mtype,
            header: header,
            success: function (res) {
                if (res.data.c === 0) {
                    success(res.data);
                } else {
                    that.hideLoading();

                    if (error) {
                        error(res.data)
                    } else {
                        if (res.data.m) {
                            if (res.data.c == 110) {
                                that.showModal(res.data.m, function () {
                                    wx.removeStorageSync('token');
                                    wx.clearStorageSync();
                                    wx.reLaunch({
                                        url: '/pages/login/index'
                                    })
                                    return;
                                })
                                return;
                            }

                            if (res.data.m.length < 6) {
                                that.error(JSON.stringify(res.data.m));
                            } else {
                                that.text(JSON.stringify(res.data.m));
                            }
                        }
                    }

                }
            },
            complete: function (res) {
                //  console.log(res);
                wx.hideNavigationBarLoading();
                wx.stopPullDownRefresh();
                if (res.statusCode != 200) {
                    wx.hideLoading();
                }

                if (res.statusCode == 504) {
                    that.text('网关超时，statusCode: ' + res.statusCode);
                }

                if (res.statusCode != 500 && res.statusCode == 504) {
                    that.text('请求超时，statusCode: ' + res.statusCode);
                }

                if (res.statusCode == 500) {
                    that.showModal('服务器发生错误，statusCode: ' + res.statusCode, () => {
                        wx.navigateBack();
                    })
                }
            },
            fail: function (res) {
                wx.hideLoading();
                that.text('服务器开小差了~')
            }
        })
    },

    //ajax返回成功
    success: function (title, duration, success) {
        wx.showToast({
            title: title,
            icon: 'success',
            duration: duration ? duration : 2000,
            success: function (res) {
                if (success) success(res);
            }
        })
    },

    //ajax返回失败
    error: function (title, duration, success) {
        wx.showToast({
            title: title,
            image: '/images/alert.png',
            duration: duration ? duration : 2000,
            success: function (res) {
                if (success) success(res);
            }
        })
    },

    text: function (title, duration, success) {
        if (typeof (title) == 'number') {
            title = String(title);
        }
        wx.showToast({
            title: title,
            icon: 'none',
            duration: duration ? duration : 2000,
            success: function (res) {
                if (success) success(res);
            }
        })
    },

    //显示消息提示
    showModal: function (content, success, title = '提示') {
        wx.showModal({
            title: title,
            content: content,
            showCancel: false,
            success() {
                if (success) success();
            },
        });
    },

    showMessage: function (content, success, fail) {
        wx.showModal({
            title: '提示',
            content: content,
            success(res) {
                if (res.confirm) {
                    if (success) success();
                } else if (res.cancel) {
                    if (fail) fail()
                }
            },
            fail() {
                if (fail) fail()
            }
        })
    },

    showLoading(title, callback) {
        wx.showLoading({
            title: title || '加载中',
            mask: true,
            complete: callback && callback()
        });
    },

    hideLoading() {
        wx.hideLoading();
    },

    //支付
    requestPayment: function (payargs, success, error) {
        wx.requestPayment({
            timeStamp: payargs.timeStamp,
            nonceStr: payargs.nonceStr,
            package: payargs.package,
            signType: payargs.signType,
            paySign: payargs.paySign,
            success: function (res) {
                if (success) success(res);
            },
            fail: function (res) {
                if (error) error(res);

            },
            complete: function (res) {

            }
        })
    },


    // 预览图片
    showImage(current, urls) {
        wx.previewImage({
            current: current, // 当前显示图片的http链接
            urls: urls // 需要预览的图片http链接列表
        })
    },

    getOnload(_this) {
        // 适配iphoneX
        _this.setData({
            iphoneX: wx.getStorageSync('iphoneX'),
            imageUrl: this.globalData.imageUrl,
            isToken: wx.getStorageSync('token') ? true : false,
            baseUrl: this.globalData.baseUrl
        });
    },

    // 上传
    uploadimg: function (data, callback, formData) {
        var that = this;
        //data - 必传 url path
        formData = formData ? formData : {};
        var img = [];
        var that = this,
            i = data.i ? data.i : 0,
            success = data.success ? data.success : 0,
            fail = data.fail ? data.fail : 0;
        wx.uploadFile({
            url: that.globalData.baseUrl + '/' + data.url,
            filePath: data.path[i].path,
            name: 'file',
            formData: formData,
            header: {
                "Content-Type": "multipart/form-data",
                token: wx.getStorageSync('token')
            },
            success: (resp) => {
                success++;
            },
            fail: (res) => {
                fail++;
            },
            complete: (res) => {
                if (res.statusCode == 500) {
                    that.text('系统出现故障，请稍后再试~');
                    return;
                }
                res = JSON.parse(res.data);
                console.log(res)
                i++;
                if (i == data.path.length) { //当图片传完时，停止调用
                    that.globalData.uploadImg.push(res.d.id)
                    // that.globalData.uploadimages.push(res.d);
                    // 是否有封面图
                    if (data.path[0].cover) {
                        var cover = data.path[0].cover;
                        console.log('有封面图,开始上传封面图')
                        that.uploadimg({
                            i: 0,
                            url: data.url,
                            path: [{
                                path: cover
                            }]
                        }, callback, {
                            type: 1
                        });
                    } else {
                        // 是否有 data.upload  有的话返回 url + id 没有的话返回id
                        if (data.upload && callback) {
                            if (data.path.length == 1) {
                                callback([res.d])
                            }
                        } else {
                            callback(that.globalData.uploadImg);
                        }
                        that.globalData.uploadImg = [];
                        that.globalData.uploadImages = [];
                    }
                } else { //若图片还没有传完，则继续调用函数
                    data.i = i;
                    data.success = success;
                    data.fail = fail;
                    that.globalData.uploadImg.push(res.d.id);
                    that.globalData.uploadimages.push(res.d);
                    that.uploadimg(data, callback, formData);
                }
            }
        });
    },

    // 获取当前时间和日期
    getWeekTime() {
        var date = new Date();
        var year = date.getFullYear(); //年
        var month = date.getMonth() + 1; //月
        var day = date.getDate(); //日
        var week = date.getDay();

        var hour = date.getHours();
        var minute = date.getMinutes();
        var second = date.getSeconds();

        return {
            week: week,
            year: year,
            month: month,
            day: day,
            hour: hour,
            minute: minute,
            second: second
        }
    }

})