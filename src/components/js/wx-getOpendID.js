import Vue from 'vue'
// 获取getOpendID

export function getOpenID() {
    debugger
    const wxGet = () => {
        Vue.axios.get(Vue.api.weixinPublicLoginPlugin,
            {
                code: WXcode
            }).then(res => {
                if (res.code === 1) {
                    localStorage.setItem('WXInfo', JSON.stringify(res.data))
                    console.log(localStorage.getItem('WXInfo'))
                } else {
                    alert('获取OpendID失败')
                }
            })
    }
    // 微信授权登录
    const getLogin = () => {
        let urlrouter = userlogin// 当前路由  
        // let url = 'http%3A%2F%2Fweb.xxxxxx.com%2F%23%2F' // 重定向返回地址  
        // let url = 'http%3A%2F%2Fc6dc6w.natappfree.cc%2F%23%2F'
        let url = 'http%3A%2F%2F192.168.2.192:8080%2F%23%2F'

        let wxappid = 'wxbd38640dfe24b6d5' // 微信公众号appid  
        let str = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + wxappid + '&redirect_uri=111' + url  +'&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect'
        window.location.href = str
    }
    var WXcode
    var WXInfo = localStorage.getItem('WXInfo') ? JSON.parse(localStorage.getItem('WXInfo')) : 'noLogin'
    let str = window.location.href
    var ua = navigator.userAgent.toLowerCase()
    var isWeixin = ua.indexOf('micromessenger') !== -1 // 是否 在微信浏览器内
    let isURL = window.location.href.indexOf('code=') === -1 // 是否 没有授权重定向回来 
    if (isWeixin && WXInfo === 'noLogin' && isURL) {
        getLogin()
    }// 重定向回来
    if (!isURL) {
        let num1 = str.indexOf('code=')
        let num2 = str.indexOf('&state=')
        WXcode = str.slice(num1 + 5, num2)
        localStorage.setItem('WXcode', JSON.stringify(WXcode))
        if (WXInfo === 'noLogin' || WXInfo.openid === null) {
            wxGet()
        }
    }
    return WXInfo.openid

}

