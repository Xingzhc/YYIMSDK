import { YYIMManager, YYIMChat } from '../../core/manager';
import {
    getProfile,
	muteStick,
	cancelMuteStick,
	createProfile,
	removeProfile,
	clearProfile,
	removeGroupAssistant
} from './Manager';

/**
 * 置顶  rongqb 20160719
 * arg {
 * to: String,
 * type: String, //chat/groupchat/pubaccount
 * success: function,
 * error: function,
 * complete: function
 * }
 */
YYIMManager.prototype.stick = function(arg){
	arg = arg || {};
	if(!!arg.to){
		arg.handle = 'stick';
		muteStick(arg);
	}else{
		arg.error && arg.error();
	}
};

/**
* 取消置顶  rongqb 20160719
* arg {
* to: String,
* type: String, //chat/groupchat/pubaccount
* success: function,
* error: function,
* complete: function
* }
*/
YYIMManager.prototype.cancelStick = function(arg){
	if(arg && arg.to){
		arg.handle = 'stick';
		cancelMuteStick(arg);
	}else{
		arg && arg.error && arg.error();
	}
};

/**
 * 静音（免打扰）  rongqb 20160719
 * arg {
 * to: String,
 * type: String, //chat/groupchat/pubaccount
 * success: function,
 * error: function,
 * complete: function,
 * }
 */
YYIMManager.prototype.mute = function(arg){
	arg = arg || {};
	if(!!arg.to){
		arg.handle = 'mute';
		muteStick(arg);
	}else{
		arg.error && arg.error();
	}
};

/**
* 取消静音（免打扰）  rongqb 20160719
* arg {
* to: String,
* type: String, //chat/groupchat/pubaccount
* success: function,
* error: function,
* complete: function
* }
*/
YYIMManager.prototype.cancelMute = function(arg){
	var that = this;
	if(arg && arg.to){
		cancelMuteStick({
			to: arg.to,
			type: arg.type,
			handle: 'mute',
			success: function(data){
				if(arg.type == that.getConstants().CHAT_TYPE.GROUP_CHAT){
					that.removeGroupAssistant({
						id: arg.to,
						success: function(){
							arg.success && arg.success(data);
						},
						error: arg.error
					});
				}else{
					arg.success && arg.success(data);
				}
			},
			error: arg.error
		});
	}else{
		arg && arg.error && arg.error();
	}
};

/**
 * 获取用户Profile信息包括静音和置顶信息 rongqb 20160719
 * arg {
 * success:function,
 * error:function,
 * complete:function
 * }
 */
YYIMManager.prototype.getProfile = function(arg){
	// 获取存储热词时间戳 yaoleib20171212
	getProfile({
		success: function(data){
			var intelligentable = data.intelligentable;
			var intelligentWordsTime = data.intelligentWordsTime;
			if(intelligentable != 'undefined'){
				//YYIMChat.openAIAbility(intelligentable);
			}
			if(intelligentWordsTime){
				YYIMChat.setDictionaries(intelligentWordsTime);
			}

			arg.success && arg.success(data);
		},
		error: function(error){
			arg.error && arg.error(errot);
		}
	})
};

/**
 *  添加Profile项  rongqb 20160719
 * arg {
 *  profile: {key:value},
 *  success: function,
 *  error: function,
 *  complete: function
 * }
 */
YYIMManager.prototype.createProfile = function(arg){
	arg = arg || {};
	if(!!arg.profile){
		createProfile(arg);
	}else{
		arg.error && arg.error();
	}
};

/**
 *  批量删除Profile中的项  rongqb 20160719
 * arg {
 *  profiles: Array,
 *  success: function,
 *  error: function,
 *  complete: function
 * }
 */
YYIMManager.prototype.removeProfile = function(arg){
	arg = arg || {};
	if(YYIMArrayUtil.isArray(arg.profiles)){
		removeProfile(arg);
	}else{
		arg.error && arg.error();
	}
};

/**
 * 清理用户的Profile（彻底删除所有Profile信息）  rongqb 20160719
 * arg {
 *  success: function,
 *  error: function,
 *  complete: function
 * }
 */
YYIMManager.prototype.clearProfile = function(arg){
	clearProfile(arg || {});
};

/**
 * 移除群助手 rongqb 20170510
 * @param {Object} arg {
 * 	id: String,
 *  success: function,
 *  error: fucntion
 * }
 */
YYIMManager.prototype.removeGroupAssistant = function(arg){
	if(arg && arg.id){
		removeGroupAssistant(arg);
	}else{
		arg && arg.error && arg.error();
	}
};
