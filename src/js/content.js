(function (){
	// show icon
	chrome.runtime.sendMessage({action: "showIcon"}, function(response) {});
	
	var userConfig;

	// document ready
	$(function() {
		console.info("bdtv is running");
		initComponent.then(function () {
			initConfig();
			initPage();

			$("#yc-dark-switch-label").on('click',function () {
				toggleDark();
			});
			$("#yc-chat-switch-label").on('click',function () {
				toggleChat();
			});
		});
	});

	var initComponent = new Promise (
		function (resolve, reject) {
			chrome.runtime.sendMessage(
				{action: "queryConfig"},
				function(response) {
					userConfig = response.config;
					var modal = '<div id="modalWrap" style="display:none;"></div>';
					var modalURL = chrome.extension.getURL('../html/modal.html');

					$("body").append(modal);
					$( "#modalWrap" ).load( modalURL, function () {
						var trigger = '<li class="fl bdtv-trigger">'+
							'<a href="#modal" rel="modal:open">鱼刺</a>'+
							'</li>';

						if ($(".header_nav").length) 
							$(".header_nav").append(trigger);
						else 
							$(".head-nav").append(trigger);

						var img = chrome.extension.getURL('../assets/img/alipay.png');
						$("#donation-img").attr("src", img);

						resolve("Component initialized");
					} );
				}
			);

		}
	); 

	function toggleDark () {
		userConfig.darkMode = !userConfig.darkMode;
		if (userConfig.darkMode) {
			applyDarkCSS();
		} else {
			removeDarkCSS();
		}
		updateConfig();
	}

	function toggleChat () {
		userConfig.hideChat = !userConfig.hideChat;
		if (userConfig.hideChat) {
			hideChat();
		} else {
			showChat();
		}
		updateConfig();
	}

	function initPage () {
		removeAD();
		if (userConfig.darkMode) 
			applyDarkCSS();
		if (userConfig.hideChat) 
			hideChat();
	}

	function hideChat () {
		$("#right_col").attr('style', "display: none !important");
		$("#live_userinfo").attr('style', "display: none !important");
		$("#main_col_box").removeAttr('style');
		$("#main_col_box").addClass("yc-hide-chat");
	}
	function showChat () {
		$("#right_col").removeAttr('style');
		$("#live_userinfo").removeAttr('style');
		$("#main_col_box").removeClass("yc-hide-chat");
	}

	function removeAD () {
		$("#chat-top-ad").remove();
		$(".chat-top-ad").remove();
		$("#main_col_box").addClass('yc-fix-top-margin');
		$("#right_col").addClass('yc-fix-top-margin');
		$("#main_col").addClass('yc-fix-main_col-top-margin');
		$(".sign_posid").remove();
		$("#dy_bottom_shadow").remove();
		$(".chat-right-ad").remove();
		$(".lol-ad").remove();
		$(".assort-ad").remove();
		$("div[data-type='sign']").remove();
		$("div[data-type='dyrec']").remove();
		$(".bglink").remove();
		$(".room-ad-top").remove();
		$("#js-live-room-normal-equal-left").remove();
		$(".rec").remove();
	}

	var darkCSSList = {
		addClass: [
			{ selector: "#room_container", cssClass: "yc-dark-5" },
			{ selector: "#live_userinfo", cssClass: "yc-dark-4" },
			{ selector: ".headline h1", cssClass: "yc-dark-font-color" },
			{ selector: ".redcolor", cssClass: "yc-dark-font-color" },
			{ selector: "#room_tags", cssClass: "yc-dark-font-color" },
			{ selector: ".room_mes .r_else_tips dd a", cssClass: "yc-dark-font-color" },
			{ selector: "#live_videobar", cssClass: "yc-dark-4" },
			{ selector: "#header", cssClass: "yc-dark-4" },
			{ selector: "#header a", cssClass: "yc-dark-font-color-lighter" },
			{ selector: ".text_cont", cssClass: "yc-dark-font-color-lighter" },
			{ selector: "#js_chat_mem", cssClass: "yc-dark-4" },
			{ selector: ".chat_mem_t", cssClass: "yc-dark-4" },
			{ selector: ".m_cnt a", cssClass: "yc-dark-font-color" },
			{ selector: "#broadcast_div", cssClass: "yc-dark-4" },
			{ selector: ".chat-n-tit h3", cssClass: "yc-dark-font-color" },
			{ selector: ".chat-live-rec .title h3", cssClass: "yc-dark-font-color" },
			{ selector: ".chat-live-rec .cont ul li a .txt h4", cssClass: "yc-dark-font-color" },
			{ selector: ".js_share_box_1", cssClass: "yc-dark-5" },
			{ selector: "#js_share_more1", cssClass: "yc-dark-4" },
			{ selector: ".app_box", cssClass: "yc-dark-4" },
			{ selector: ".cq_list ul li", cssClass: "yc-dark-4" },
			{ selector: "#cqf_but", cssClass: "yc-dark-5" },
			{ selector: "#details_div", cssClass: "yc-dark-5" },
			{ selector: ".chat_cls a", cssClass: "yc-dark-5" },
			{ selector: ".lw_item_hovercont", cssClass: "yc-dark-5" },
			{ selector: "#mainbody", cssClass: "yc-dark-5" },
			{ selector: "#live-list-content", cssClass: "yc-dark-5" },
			{ selector: ".play-list li .mes", cssClass: "yc-dark-4" },
			{ selector: ".play-list li a", cssClass: "yc-dark-noborder" },
			{ selector: ".play-list li .mes-tit h3", cssClass: "yc-dark-font-color" },
			{ selector: ".tse-content", cssClass: "yc-dark-4" },
			{ selector: ".broadcast-meta .info .title", cssClass: "yc-dark-font-color" },
			{ selector: ".tag_list ul li a", cssClass: "yc-dark-font-color" },
			{ selector: ".head-nav .assort .a-pop", cssClass: "yc-dark-4" },
			{ selector: ".head-nav .assort .a-list .btns li a", cssClass: "yc-dark-5" },
			{ selector: ".head .game_cas .game_btn a", cssClass: "yc-dark-5" },
			{ selector: ".head-nav .assort .a-list>h3", cssClass: "yc-dark-font-color" },
			{ selector: ".item-data .unit .title", cssClass: "yc-dark-4" },
			{ selector: ".row .row-top .t-tag a", cssClass: "yc-dark-4" },
			{ selector: ".hot-recom li", cssClass: "yc-dark-4" },
			{ selector: ".hot-word", cssClass: "yc-dark-4" },
			{ selector: ".poptip", cssClass: "yc-dark-4" },
			{ selector: ".m_list", cssClass: "yc-dark-4" },
			{ selector: ".classify-li ul li a", cssClass: "yc-dark-font-color" },
			{ selector: ".classify_li ul li a", cssClass: "yc-dark-font-color" },
			{ selector: ".row a", cssClass: "yc-dark-font-color" },
			{ selector: ".hot-recom li .text", cssClass: "yc-dark-font-color" },
			{ selector: ".head-oth .o-history .h-list>li", cssClass: "yc-dark-4" },
			{ selector: ".stats-and-actions", cssClass: "yc-dark-4" },
			{ selector: ".chat-member", cssClass: "yc-dark-4" },
			{ selector: ".live-room-normal-right", cssClass: "yc-dark-4" },
			{ selector: "#anchor-info", cssClass: "yc-dark-4" },
			{ selector: ".chat-speak", cssClass: "yc-dark-4" },
			{ selector: ".fans-list .f-tit ul li.cur", cssClass: "yc-dark-4" },
			{ selector: ".fans-list .f-tit ul li", cssClass: "yc-dark-4" },
			{ selector: ".fans-rank .fans-list", cssClass: "yc-dark-4" },
			{ selector: ".chat-notice p", cssClass: "yc-dark-4" },
			{ selector: ".chat-cont", cssClass: "yc-dark-4" },
			{ selector: ".lw-item-hovercont", cssClass: "yc-dark-4" },
			{ selector: ".qrcode-box .con, .share-box .con", cssClass: "yc-dark-4" },
			{ selector: ".give-gift .g-list li .lw-item-hover .text p strong", cssClass: "yc-dark-font-color" },
			{ selector: "#anchor-info a", cssClass: "yc-dark-font-color" },
			{ selector: "#anchor-info i", cssClass: "yc-dark-font-color" },
			{ selector: "#anchor-info li", cssClass: "yc-dark-font-color" }
		],
		attr: [
			{ selector: "#live_userinfo", style: 'background-color: #424242 !important' },
			{ selector: ".r_else li", style: 'color: #9E9E9E !important' },
			{ selector: "#chat_lines", style: 'background-color: black !important' },
			{ selector: ".m_cnt", style: 'background-color: #757575 !important' },
			{ selector: ".c_speak", style: 'background-color: #212121 !important' },
			{ selector: ".cq_fans .m_list .m_nav ul li.activ a", style: 'color: #9E9E9E !important' }
		]
	};

	function applyDarkCSS () {
		var classes = darkCSSList.addClass;
		var attrs = darkCSSList.attr;
		for (var i = 0; i < classes.length; i++) {
			$(classes[i].selector).addClass(classes[i].cssClass);
		};
		for (var i = 0; i < attrs.length; i++) {
			$(attrs[i].selector).attr('style', attrs[i].style);
		};
	}

	function removeDarkCSS () {
		var classes = darkCSSList.addClass;
		var attrs = darkCSSList.attr;
		for (var i = 0; i < classes.length; i++) {
			$(classes[i].selector).removeClass(classes[i].cssClass);
		};
		for (var i = 0; i < attrs.length; i++) {
			$(attrs[i].selector).removeAttr('style');
		};
	}

	function initConfig () {
		console.info("initConfig()");
		console.info(userConfig);
		//update ui
		$("#yc-ad-switch").prop( "checked", userConfig.ADBlock );
		$("#yc-dark-switch").prop( "checked", userConfig.darkMode );
		$("#yc-chat-switch").prop( "checked", userConfig.hideChat );
	}

	function updateConfig () {
		console.info("updating...");
		chrome.runtime.sendMessage(
			{ action: "updateConfig", config: userConfig },
			function(response) {}
		);
	}

})();