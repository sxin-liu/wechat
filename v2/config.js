module.exports = {
    // 请求域名 格式： https://您的域名
    HTTP_REQUEST_URL: '',

    // Socket链接 暂不做配置 wss://
    WSS_SERVER_URL: '',

    /*
    * 以下配置非开发者，无需修改
    * */

    // 小程序打开的页面不存在时的链接
    DEFAULT_PAGE: '/pages/home/index/index',

    // 小程序授权页面
    AUTHORIZE_PAGE: '/pages/home/index/index',

    // 请求头
    HEADER: {
        'content-type': 'application/x-www-form-urlencoded',
        'client': '1'
    },
    // Socket调试模式
    SERVER_DEBUG: true,
    // 心跳间隔
    PINGINTERVAL: 3000,
    // 回话密钥名称
    TOKENNAME: 'Authori-zation'
}