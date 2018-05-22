
//导入最近联系人渲染函数
import renderRecentDigset from '../render/renderRecentDigset';

//获取最近联系人
export default () => {
    // 获取最近联系人API
    YYIMChat.getRecentDigset({
        success: function (result) {
            if (result.list.length) {
                let digestChatNum = 0;//聊天摘要数量
                let digestGroupchatNum = 0;//群聊摘要数量
                //暂时将公众号类型的摘要删除
                for(var i = 0;i <result.list.length;i++){
                    if(result.list[i].type == "pubaccount"){
                        result.list.splice(i,1);
                        i--;
                    }
                }
                let recentDigset = [];
                result.list.forEach(function(e, i){
                    //目前测试只显示个人聊天,和群组
                   if(e.type == 'chat'){
                            //通过id获取个人信息
                         YYIMChat.getVCard({
                             id: e.id,
                             success: function(res){
                                 //整理最近联系人列表到一个新数组
                                 recentDigset.push({
                                     id: res.id,
                                     readedVersion: e.readedVersion,
                                     sessionVersion: e.sessionVersion,
                                     type: e.type,
                                     photo: res.photo || '',
                                     nickname: res.nickname || res.name,
                                     lastMessage: e.lastMessage,
                                     lastContactTime: e.lastContactTime
                                 });
                                 digestChatNum ++;
                                 if(digestChatNum + digestGroupchatNum == result.list.length){
                                     //把最近联系人列表保存到本地
                                     localStorage.setItem('recentdigset', JSON.stringify(recentDigset));
                                     renderRecentDigset(recentDigset);
                                 }
  
                             
                             }
                         });
                     }else if(e.type == 'groupchat'){
                         YYIMChat.getChatGroupInfo({
                             id:  e.id,
                             membersLimit: 40,
                             success:function(data){
                                 console.log(data);
                                 digestGroupchatNum ++;
                                 recentDigset.push({
                                     id: data.id,
                                     readedVersion: e.readedVersion,
                                     sessionVersion: e.sessionVersion,
                                     type: e.type,
                                     photo: data.photo || '',
                                     nickname: data.nickname || data.name,
                                     lastMessage: e.lastMessage,
                                     lastContactTime: e.lastContactTime
                                 });
                                 if(digestChatNum + digestGroupchatNum == result.list.length){
                                     //把最近联系人列表保存到本地
                                     localStorage.setItem('recentdigset', JSON.stringify(recentDigset));
                                     renderRecentDigset(recentDigset);
                                 }
                             },
                             error:function(err){
                                 console.log(err);
                             }
                         });
                     }
                });
            }
        },
        error:function (err){
            console.log(err);
        }
    });
}