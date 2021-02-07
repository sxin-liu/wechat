const { HTTP_REQUEST_URL, DEFAULT_PAGE_URL, AUTHORIZE_PAGE_URL } = require('./config.js');
const baseUrl = HTTP_REQUEST_URL;
import { $h } from './utils/util';
App({
    onLaunch: function (e) {
        this.init();
    },

    onLoad(options) {

    },

    // 小程序要打开的页面不存在时触发
    onPageNotFound(res) {
        wx.reLaunch({
            url: DEFAULT_PAGE_URL,
        })
    },

    globalData: {
        baseUrl: baseUrl,
        imageUrl: baseUrl + '/wxapp/images',
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
        isSmallPhone: false, // 是不是小屏手机
    },

    init: function () {
        let that = this;

        wx.getSystemInfo({
            success: function (res) {
                // 适配iPhone X
                var modelstr = res.model;
                if (
                    modelstr.indexOf("iPhone X") != -1 ||
                    modelstr.indexOf("iPhone 11") != -1 ||
                    modelstr.indexOf("iPhone 12") != -1 ||
                    modelstr.indexOf("iPhone 13") != -1 ||
                    modelstr.indexOf("iPhone 14") != -1
                ) {
                    that.globalData.isIPhoneX = true;
                } else {
                    that.globalData.isIPhoneX = false;
                }

                // 是不是小屏手机
                let winH = $h.Mul($h.Div(750, res.windowWidth), res.windowHeight);
                that.globalData.isSmallPhone = winH <= 1440? true: false;

                let setConsoleStyleFun = (data) => {
                    let styleList = `
                        font-size: 14px;
                        color: #66addd; 
                        letter-spacing: 1px; 
                        margin: 2px; 
                        padding: 5px 10px; 
                        border-radius: 20px;
                    `
                    return styleList = styleList += data;
                };

                console.log(`%c
                    机型: ${ res.model }
                    屏幕高度: ${ winH }
                    是否为小机型 ${ that.globalData.isSmallPhone }
             %c*%c注意: ${ that.globalData.isSmallPhone? '当前机型为小机型，请注意页面适配': '当前机型为大机型，请注意小机型的适配' }
                    baseUrl: ${ that.globalData.baseUrl }
                    imageUrl: ${ that.globalData.imageUrl }
                    token: ${ that.globalData.token || '暂无token' }
                    isIPhoneX: ${ that.globalData.isIPhoneX }
                    DEFAULT_PAGE_URL: ${ DEFAULT_PAGE_URL || '未配置 "小程序打开的页面不存在时的链接"' }
                    AUTHORIZE_PAGE_URL: ${ AUTHORIZE_PAGE_URL || '未配置 "小程序授权页面"' }
                `, setConsoleStyleFun(),
                   setConsoleStyleFun('color: red'),
                   setConsoleStyleFun()
                )

            }
        })

        if (HTTP_REQUEST_URL == '') {
            console.error("请配置根目录下的config.js文件中的 'HTTP_REQUEST_URL'");
            return false;
        }

        if (DEFAULT_PAGE_URL == '') {
            console.error("请配置根目录下的config.js文件中的 'DEFAULT_PAGE_URL (小程序打开的页面不存在时的链接)'");
            return false;
        }

        if (AUTHORIZE_PAGE_URL == '') {
            console.error("请配置根目录下的config.js文件中的 'AUTHORIZE_PAGE_URL (小程序授权页面链接)'");
            return false;
        }

        let token = wx.getStorageSync('token');
        if (token) this.globalData.token = token;

        const updateManager = wx.getUpdateManager();

        updateManager.onCheckForUpdate(function (res) {
            // 请求完新版本信息的回调
        })

        updateManager.onUpdateReady(function () {
            wx.showModal({
                title: '更新提示',
                content: '新版本已经准备好，请重启应用',
                showCancel: false,
                success() {
                    updateManager.applyUpdate()
                },
            });
        });

        updateManager.onUpdateFailed(function () {
            return that.text('新版本下载失败');
        })
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

    // tabbar跳转
    switchTab(url) {
        if (!url) {
            wx.showModal({
                title: '参数错误',
                content: '没有传跳转的页面路径',
                showCancel: false
            });
            return false;
        }

        wx.showLoading();

        setTimeout(() => {
            wx.hideLoading()
        }, 1000)

        wx.switchTab({
            url: url || ''
        })
    },

    // 关闭所有页面，打开到应用内的某个页面
    reLaunch(url) {
        if (!url) {
            wx.showModal({
                title: '参数错误',
                content: '没有传跳转的页面路径',
                showCancel: false
            });
            return false;
        }

        wx.showLoading();

        setTimeout(() => {
            wx.hideLoading()
        }, 1000)

        wx.reLaunch({
            url: url || ''
        })
    },

    // 关闭当前页面，跳转到应用内的某个页面
    redirectTo(url) {
        if (!url) {
            wx.showModal({
                title: '参数错误',
                content: '没有传跳转的页面路径',
                showCancel: false
            });
            return false;
        }

        wx.showLoading();

        setTimeout(() => {
            wx.hideLoading()
        }, 1000)

        wx.redirectTo({
            url: url || ''
        })
    },

    // 保留当前页面，跳转到应用内的某个页面
    navigateTo(url) {
        if (!url) {
            wx.showModal({
                title: '参数错误',
                content: '没有传跳转的页面路径',
                showCancel: false
            });
            return false;
        }

        wx.showLoading();

        setTimeout(() => {
            wx.hideLoading()
        }, 1000)

        wx.navigateTo({
            url: url || ''
        })
    },

    // 关闭当前页面，返回上一页面或多级页面
    navigateBack(delta) {
        wx.showLoading();

        setTimeout(() => {
            wx.hideLoading()
        }, 1000)

        wx.navigateBack({
            delta: delta || 1
        })
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
        var { imageUrl, isIPhoneX } = this.globalData;

        _this.setData({
            isIPhoneX: isIPhoneX, // 适配iphoneX
            imageUrl: imageUrl, // 赋值imageUrl
        });
    },

    getOnShow() {

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
                token: that.globalData.token
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