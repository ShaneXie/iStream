(function() {
  'use strict';

  iStreamApp.factory('chatService', chatService);

  function chatService(
    util
  ) {

    var chatOb;
    var chatObConfig = { childList: true };
    var isTTS = false;
    var isThx = false;

    var service = {
      startTTS: startTTS,
      stopTTS: stopTTS
    };

    return service;

    function startTTS () {
      isTTS = true;
      if (observeStatus()) {
        startObserve();
      };
    }

    function stopTTS () {
      isTTS = false;
      if (!observeStatus()) {
        stopObserve();
      };
      chrome.runtime.sendMessage(
        { action: "stopTTS" },
        function(response) {}
      );
    }

    function observeStatus () {
      return isTTS || isThx;
    }

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

    function stopObserve () {
      chatOb.disconnect();
    }

    function douyuChatMsgHandler (mutations) {
      var newMsg = {
        type: "msg",
        sender: "Shane",
        msg: ""
      }
      mutations.forEach(function(mutation) {
        var numOfNodeAdded = mutation.addedNodes.length;
        
        if ( numOfNodeAdded > 0) {
          for (var i = 0; i < numOfNodeAdded; i++) {
            var currNode = mutation.addedNodes[i];
            if (currNode) {
              newMsg.sender = currNode.querySelector(".nick").textContent;
              if (currNode.querySelector("span.text-cont")) {
                newMsg.type = "msg";
                newMsg.msg = unescape(currNode.querySelector("span.text-cont").textContent);
                if (newMsg.msg!=="") {
                  // not empty danmaku
                  console.info(newMsg.sender.split('：')[0]+":"+newMsg.msg);
                  if (isTTS) {
                    readChatMsg(newMsg.msg);
                  };
                };
              };
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