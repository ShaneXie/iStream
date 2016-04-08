chrome.extension.onMessage.addListener(
	function(request, sender, sendResponse) {
		if (request.action === "showIcon") {
			chrome.pageAction.show(sender.tab.id);
		}
		if (request.action === "updateConfig") {
			console.info(request.config);
			chrome.storage.local.set({'config':request.config}, function() {
				console.info('config update');
			});
		}
		if (request.action === "queryConfig") {
			//sendResponse({config: "config1"});
			chrome.storage.local.get('config', function(object) {
				var defaultConfig = {
					ADBlock: true,
					darkMode: true,
					hideChat: false
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

