const { HTTP_REQUEST_URL, DEFAULT_PAGE, AUTHORIZE_PAGE } = require('./config.js');
const baseUrl = HTTP_REQUEST_URL;
App({
    onLaunch: function (e) {
        this.init();
    },

    onLoad(options) {

    },

    // 小程序要打开的页面不存在时触发
    onPageNotFound(res) {
        wx.reLaunch({
            url: DEFAULT_PAGE,
        })
    },

    // 小程序打开不存在页面时触发
    onPageNotFound() {
        wx.reLaunch({
            url: '/pages/home/index/index',
        })
    },

    globalData: {
        baseUrl: baseUrl,
        imageUrl: baseUrl + '/images/wechat',
        share: {
            // 分享
            title: '',
            path: '',
            imageUrl: ''
        },
        uploadImg: [],
        uploadImages: [],
        token: '',
        isIPhoneX: false, // 当前是否是iPhoneX
    },

    //初始化
    init: function () {

        if (HTTP_REQUEST_URL == '') {
            console.error("请配置根目录下的config.js文件中的 'HTTP_REQUEST_URL'");
            return false;
        }

        if (DEFAULT_PAGE == '') {
            console.error("请配置根目录下的config.js文件中的 'DEFAULT_PAGE (小程序打开的页面不存在时的链接)'");
            return false;
        }

        if (AUTHORIZE_PAGE == '') {
            console.error("请配置根目录下的config.js文件中的 'AUTHORIZE_PAGE (小程序授权页面链接)'");
            return false;
        }

        var that = this;

        const updateManager = wx.getUpdateManager();

        updateManager.onCheckForUpdate(function (res) {
            // 请求完新版本信息的回调
        })

        updateManager.onUpdateReady(function () {
            wx.showModal({
                title: '更新提示',
                content: '新版本已经准备好，是否重启应用？',
                success: function (res) {
                    if (res.confirm) {
                        // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                        updateManager.applyUpdate()
                    }
                }
            })
        });

        updateManager.onUpdateFailed(function () {
            return that.text('新版本下载失败');
        })

        // 适配iPhone X
        wx.getSystemInfo({
            success: function (res) {
                var modelstr = res.model;
                if (modelstr.indexOf("iPhone X") != -1) {
                    that.globalData.isIPhoneX = true;
                } else {
                    that.globalData.isIPhoneX = false;
                }
            }
        })
    },

    // 用户授权
    getUserInfo(e, success) {
        var { token } = this.globalData;
        if (e.type == "getuserinfo") {
            if (token) {
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

                                // that.ajax(api.default.login, {
                                //     code: code,
                                //     iv: iv,
                                //     encryptedData: encryptedData
                                // }, function (res) {
                                //     wx.setStorageSync('token', res.d.token);
                                //     if (success) success(res);
                                // });
                            }
                        }
                    })
                }
            }
        }
    },

    // 带成功图标Toast
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

    // 带失败图标Toast
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

    // 不带图标Toast
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

    // 显示消息提示，不带取消按钮
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

    // 显示消息提示，带取消按钮
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
        var {imageUrl, isIPhoneX, token, baseUrl} = this.globalData;
        // 适配iphoneX
        _this.setData({
            isIPhoneX: isIPhoneX,
            imageUrl: imageUrl,
            isToken: token ? true : false,
            baseUrl: baseUrl
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
    }
})