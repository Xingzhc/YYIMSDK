//dom元素
import {
    $chat_box,
    $chats_list
} from '../common/jqelements';

//渲染聊天记录
import renderHistoryMessage from '../render/renderHistoryMessage';
//获取聊天历史,传入sessionVersion,对方id和type参数
export default (sessionVersion, id, type) => {
    let start = sessionVersion > 20 ? sessionVersion - 20 : 0;
    //获取历史聊天信息
    YYIMChat.getHistoryMessage({
        id: id,
        type: type,
        startVersion: start,
        endVersion: sessionVersion,
        success: function (res) {
            let historychats = res.result || [];
            let historychatsData = [];
            let historyNumber = 0;
            historychats.forEach(chat => {
                 //通过id获取个人信息
                 let chatId = '';
                 if(chat.type == "chat"){
                    chatId = chat.from;
                 }else if(chat.type == "groupchat"){
                    chatId = chat.from.roster;
                 }
             YYIMChat.getVCard({
                    id: chatId,
                    success: function(res){
                        //整理最近联系人列表到一个新数组
                        historychatsData.push({
                            data: chat.data,
                            dateline:chat.dateline,
                            from:chat.from,
                            id:chat.id,
                            sessionVersion:chat.sessionVersion,
                            to:chat.to,
                            type:chat.type,
                            photo: res.photo || '',
                            nickname: res.nickname || res.id,
                        });
                        historyNumber ++;
                        if(historyNumber  == historychats.length){
                              //把聊天记录缓存到本地
                            localStorage.setItem('historychats', JSON.stringify(historychatsData));
                            renderHistoryMessage();
                        }

                    
                    },
                    error:function(err){
                        historyNumber ++;
                        if(historyNumber  == historychats.length){
                            //把聊天记录缓存到本地
                          localStorage.setItem('historychats', JSON.stringify(historychatsData));
                          renderHistoryMessage();
                      }
                        console.log(err);
                    }
                });
            });
            $chat_box.show();
            historychats.reverse();
           
            //渲染聊天信息
            renderHistoryMessage();
        }
    });
};