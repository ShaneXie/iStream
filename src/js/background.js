var checkItv;
var douyuPerv = [];
var isCheckinNotification = false;

chrome.storage.local.get('config', function(object) {
	var conf = object.config;
	if (conf.notification) {
		startNotificaiton();
	};
});

function startNotificaiton () {
	isCheckinNotification = true;
	console.log("startNotificaiton");
	checkItv = setInterval(function (argument) {
		chrome.storage.local.get('config', function(object) {
			var conf = object.config;
			if (conf.bindAccounts.douyu) {
				var acc = conf.bindAccounts.douyu;
				if (acc.token_exp < Date.now()/1000){
					$.get('http://capi.douyucdn.cn/api/v1/login?username='
        +acc.username+'&password='+acc.password, function( res ) {
						acc.token = res.data.token;
            			acc.token_exp = res.data.token_exp;
            			conf.bindAccounts.douyu = acc;
            			chrome.storage.local.set({'config':conf}, function() {});
					});
				} else {
					$.get('http://capi.douyucdn.cn/api/v1/remind_list?token='+acc.token+'&limit=99',
						function (res) {
							var currList = res.data;
							if (douyuPerv.length === 0) {
								douyuPerv = currList;
								for (var i = 0; i < currList.length; i++) {
									if(currList[i].live_status === "99") {
										newNotification("douyu", currList[i]);
									}
								};
							} else {
								for (var i = 0; i < currList.length; i++) {
									if(currList[i].live_status === "99") {
										for (var j = 0; j < douyuPerv.length; j++) {
											if (currList[i].id === douyuPerv[j].id && douyuPerv[j].live_status==="2") {
												newNotification("douyu", currList[i]);
											};
										};
										
									}
								};
								douyuPerv = currList;
							}
						}
					);
				}
			};
		});
	},10000);
}

function newNotification (site, info) {
	if (site === 'douyu' ) {
		var notification = new Notification(info.owner+'直播啦~', {
			icon: info.owner_avatar_middle,
			body: info.name+" 点击前往~",
		});

		notification.onclick = function () {
			window.open("http://www.douyu.com/"+info.room_id);      
		};
	};
}

function stopNotificaiton () {
	clearInterval(checkItv);
	isCheckinNotification = false;
}

chrome.extension.onMessage.addListener(
	function(request, sender, sendResponse) {
		if (request.action === "showIcon") {
			chrome.pageAction.show(sender.tab.id);
		}
		if (request.action === "stopTTS") {
			chrome.tts.stop();
		}
		if (request.action === "startNotificaiton") {
			if (!isCheckinNotification) {
				startNotificaiton();
			};
		}
		if (request.action === "stopNotificaiton") {
			stopNotificaiton();
		}
		if (request.action === "readMsg") {
			chrome.tts.speak(request.msg, {
				'lang':"zh-CN",
				'enqueue': true
			});
		}
		if (request.action === "updateConfig") {
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
					notification: false,
					bindAccounts: {}
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