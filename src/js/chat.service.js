(function() {
  'use strict';

  iStreamApp.factory('chatService', chatService);

  function chatService(
    util
  ) {

    var chatOb;
    var chatObConfig = { childList: true };

    var service = {
      isWatchDanmu: false,
      startObserve: startObserve
    };
    return service;

    function startObserve () {
      var chatRoom;
      if (util.getCurrentSite() === 'douyu') {
        chatOb = new MutationObserver(douyuChatMsgHandler);
        chatRoom = document.querySelector('.c-list');
      };

      if ( chatRoom !== null ) {
        chatOb.observe(chatRoom, chatObConfig);
      }
    }

    function douyuChatMsgHandler (mutations) {
      mutations.forEach(function(mutation) {
        var numOfNodeAdded = mutation.addedNodes.length;
        
        if ( numOfNodeAdded > 0) {
          for (var i = 0; i < numOfNodeAdded; i++) {
            var currNode = mutation.addedNodes[i];
            if (currNode) {
              var userName = currNode.querySelector(".nick").innerHTML;
              var chatContent = currNode.querySelector("span.text-cont").innerHTML;
              console.info(userName.split('：')[0]+":"+chatContent);
              readChatMsg(chatContent);
            }
          };
        };
      });
    }

    function readChatMsg (msg) {
      chrome.runtime.sendMessage(
        { action: "readMsg", msg: msg },
        function(response) {}
      );
    }

  }
})();