chrome.extension.onMessage.addListener(
	function(request, sender, sendResponse) {
		if (request.action === "showIcon") {
			chrome.pageAction.show(sender.tab.id);
		}
		if (request.action === "stopTTS") {
			chrome.tts.stop();
		}
		if (request.action === "readMsg") {
			chrome.tts.speak(request.msg, {
				'lang':"zh-CN",
				'enqueue': true
			});
		}
		if (request.action === "updateConfig") {
			console.info(request.config);
			chrome.storage.local.set({'config':request.config}, function() {
				console.info('config update');
				sendResponse({msg: 'config update'});
			});
		}
		if (request.action === "queryConfig") {
			//sendResponse({config: "config1"});
			chrome.storage.local.get('config', function(object) {
				var defaultConfig = {
					adBlock: true,
					nightMode: true,
					tts: false,
					thx: false,
					notification: false
				}
				console.info("queryConfig");
				var config = object.config===undefined?defaultConfig:object.config;
				sendResponse({config: config});
			});
			return true;
		}
		return false;
	}
);