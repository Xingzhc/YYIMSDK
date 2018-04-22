//元素
import { $yyim_iogin, $yyim_box } from './jqelements';

//用户登陆，传入用户名(暂时写死为zongtf，因为其他的注册不成功)
export default (username) => {
    $.ajax({
        url: 'https://172.20.15.60/sysadmin/rest/yonyou/im_pre/token',
        type: 'POST',
        dataType: 'json',
        headers: {"Content-Type": "application/json"},
        data: JSON.stringify({
            "username":"zongtf",
            "clientId":"b26ba51058eee9db4f88a7a2b1bd1b06",
            "clientSecret":"CC9A71E0C2528EDB1652DFB18ECE8DDF"
        }),
        success: function (result) {
            let clientIdentify = "pc" + String(new Date().getTime());
            $yyim_iogin.hide();
            $yyim_box.show();
            //登陆YYIMSDK
            YYIMChat.login({
                "username": 'zongtf',
                "token": result.token,
                "expiration": result.expiration,
                "appType": 4,
                "identify": clientIdentify
            });
        },
        error: function (arg) {
            console.log(arg);
        }
    });
}