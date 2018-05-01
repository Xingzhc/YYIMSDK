import { YYIMChat } from '../../core/manager';
	
	/**
	 * 获取缩略图列表
	 * @param {Object} arg {
	 * 	attachId: String,
	 *  success: function,
	 *  error: function,
	 *  complete: function,
	 * }
	 */
	function getTransformFileList(arg) {
		jQuery.ajax({
			url: YYIMChat.getConfig().SERVLET.REST_TRANSFORM_SERVLET + 'docInfo',
			type: 'get',
			data: {
				attachId: arg.attachId,
				token: YYIMChat.getToken(),
				downloader: YYIMChat.getUserNode()
			},
			dataType: 'json',
			cache: false,
			success: arg.success,
			error: function(xhr){
				try{
					arg.error && arg.error(JSON.parse(xhr.responseText));
					arg = null;
				}catch(e){
					arg.error && arg.error();
					arg = null;
				}
			}
		});
	}
	
	/**
	 * 获取附件地址
	 * @param {Object} 
	 * attachId: String
	 */
	function getFileUrl(attachId,mediaType){
		if(attachId){
			if(/^https?:\/\/|^data:image\/jpeg;/.test(attachId)){
				return attachId;
			}
			var url =  YYIMChat.getConfig().SERVLET.REST_RESOURCE_SERVLET +  YYIMChat.getConfig().MULTI_TENANCY.ETP_KEY + '/' +  YYIMChat.getConfig().MULTI_TENANCY.APP_KEY + '/download';
			return url + '?' + jQuery.param({
				attachId: attachId,
				downloader: YYIMChat.getUserNode(),
				token: YYIMChat.getToken(),
				mediaType: (mediaType === 1)? mediaType: 2
			});
		}
	}

	export {
		getTransformFileList,
		getFileUrl
	};