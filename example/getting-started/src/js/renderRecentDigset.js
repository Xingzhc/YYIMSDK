
//dom元素
import {
    $hcontacts
} from './jqelements';
//表情数据
import { expressionList } from './constants';

//用图片替换文本消息中表情信息
const replaceEmoji = (str) => {
    return str.replace(/\[[^\[\]]+\]/g,(e) => {
        for (let i=0;i<expressionList.data.length;i++){
            if(expressionList.data[i].actionData === e){
                return `<img class="emoji" src="${expressionList.path + expressionList.data[i].url}" alt="" />`;
                break;
            }
        }
        return e;
    });
};

export default (digsets) => {
    //拿取聊天对方id
    let targetuserid = localStorage.getItem('targetuserid');
    let digStr = '';
    digsets.sort(function(a, b){return b.lastContactTime - a.lastContactTime});
    digsets.forEach(function(res){
        let lastmsg = res.lastMessage, lastmsgStr = '', newtipStr = '';
        let noreadno = res.sessionVersion - res.readedVersion;
        if(lastmsg){
            switch(lastmsg.data.contentType){
                case 2: lastmsgStr = res.lastMessage.data.content; break;
                case 4: lastmsgStr = '[文件消息]'; break;
                case 8: lastmsgStr = '[图片消息]';break;
            }
        }
        if(noreadno){
            newtipStr = '<i class="newtip cuttxt">'+ noreadno +'</i>';
        }
        digStr += `<li class="${targetuserid && targetuserid === res.id ? 'active' : ''}" data-sessionVersion="${res.sessionVersion}" data-id="${res.id}" data-type="${res.type}" data-nickname="${res.nickname || res.id}">
                    <i data-id="${res.id}" class="close">×</i>
                    <div class="avatar">
                        <img src="${YYIMChat.getFileUrl(res.photo) || './imgs/avatar.jpg'}" alt="">
                    </div>
                    <div class="detail">
                        <h3 class="name cuttxt">${res.nickname || res.id}</h3>
                        <p class="msg cuttxt">${replaceEmoji(lastmsgStr)}</p>
                    </div>${newtipStr}
                </li>`;
    });
    $hcontacts.html(digStr);
}