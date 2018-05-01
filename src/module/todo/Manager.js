import { YYIMChat } from '../../core/manager';

	/**
	 * 发送代办回执 rongqb 20171114
	 * @param {Object} arg
	 */
	function sendToDoReceipts(arg) {
		jQuery.ajax({
			url: YYIMChat.getConfig().SERVLET.REST_TODO_USER + 'read/latest?token=' + YYIMChat.getToken() + '&userId='+ YYIMChat.getUserID(),
			type: 'post',
			data: JSON.stringify({
				latestReadTs: arg.latestReadTs || 0
			}),
			dataType: 'json',
			cache: false,
			processData:false,
			contentType: "application/json", //必须有
			success: function() {
				arg && arg.success && arg.success();
				arg && (arg = null);
			},
			error: function(xhr) {
				try {
					arg && arg.error && arg.error(JSON.parse(xhr.responseText));
					arg && (arg = null);
				} catch(e) {
					arg && arg.error && arg.error();
					arg && (arg = null);
				}
			}
		});
	}

	/**
	 * 拉取代办通知摘要 rongqb 20170831
	 * @param {Object} arg
	 */
	function getTodoDigset(arg) {
		jQuery.ajax({
			url: YYIMChat.getConfig().SERVLET.REST_TODO_USER + 'abstract',
			type: 'get',
			data: {
				token: YYIMChat.getToken(),
				userId: YYIMChat.getUserID()
			},
			dataType: 'json',
			cache: false,
			success: function(data) {
				var result;
				if(data 
				&& data.result 
				&& data.result['abstractItem']){
					
					result = data.result['abstractItem'] || {};
					result['todoCount'] = data.result['todoCount'] || 0;
					result['unReadCount'] = data.result['unReadCount'] || 0;
					result['latestReadTs'] = data.result['latestReadTs'] || 0;
				}
				arg && arg.success && arg.success(result);
				arg && (arg = null);
			},
			error: function(xhr) {
				try {
					arg && arg.error && arg.error(JSON.parse(xhr.responseText));
					arg && (arg = null);
				} catch(e) {
					arg && arg.error && arg.error();
					arg && (arg = null);
				}
			}
		});
	}

	/**
	 * 拉取代办通知历史 nizhja 20170831
	 * @param {Object} arg
	 */
	function getHistoryTodo(arg) {
		jQuery.ajax({
			url: YYIMChat.getConfig().SERVLET.REST_TODO_USER + 'items',
			type: 'get',
			data: {
				token: YYIMChat.getToken(),
				userId: YYIMChat.getUserID(),
				beforeTs: arg && Number(arg.beforeTs) || '',
				todoState: arg && arg.todoState || '',
				pageSize: arg && Number(arg.pageSize) || 10
			},
			dataType: 'json',
			cache: false,
			success: function(data) {
				var result = [];
				if(data 
					&& data.result
					&& data.result.length){
						
					result = data.result;
				}
				arg && arg.success && arg.success(result);
				arg && (arg = null);
			},
			error: function(xhr) {
				try {
					arg && arg.error && arg.error(JSON.parse(xhr.responseText));
					arg && (arg = null);
				} catch(e) {
					arg && arg.error && arg.error();
					arg && (arg = null);
				}
			}
		});
	}

	export {
		getTodoDigset,
		getHistoryTodo,
		sendToDoReceipts
	};
