(function() {
  'use strict';

  iStreamApp.factory('optionService', optionService);

  function optionService(
    util,
    chatService,
    $rootScope
  ) {
    var conf = {};

    var readConf = new Promise(
      function (resolve, reject) {
        chrome.runtime.sendMessage(
          {action: "queryConfig"},
          function(response) {
            resolve(response.config);
          });
      }
    );

    var service = {
      conf: conf,
      toggleDark: toggleDark,
      toggleTTS: toggleTTS
    };

    init ()

    return service;


    function init () {
      readConf.then(function (config) {
        conf = config;
        $rootScope.$broadcast('configUpdated', conf);
        optimalUI();
        removeAD();
        if (conf.nightMode) {
          applyDarkCSS();
        };
        if (conf.tts) {
          chatService.startTTS();
        };
      });
    }


    function optimalUI() {
      if (util.getCurrentSite() === 'douyu') {
        $("#main_col_box").addClass('is-fix-top-margin');
        $("#right_col").addClass('is-fix-top-margin');
        $("#main_col").addClass('is-fix-main_col-top-margin');
      };
    }

    function toggleTTS () {
      console.info("toggle tts");
      conf.tts = !conf.tts;
      if (conf.tts) {
        chatService.startTTS();
      } else {
        chatService.stopTTS();
      }
      updateConfig();
    }

    function toggleDark () {
      conf.nightMode = !conf.nightMode;
      if (conf.nightMode) {
        applyDarkCSS();
      } else {
        removeDarkCSS();
      }
      updateConfig();
    }

    function applyDarkCSS () {
      var darkCSSList;

      if (util.getCurrentSite() === 'douyu') {
        darkCSSList = util.douyuDarkList;
      }

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
      var darkCSSList;

      if (util.getCurrentSite() === 'douyu') {
        darkCSSList = util.douyuDarkList;
      }

      var classes = darkCSSList.addClass;
      var attrs = darkCSSList.attr;
      for (var i = 0; i < classes.length; i++) {
        $(classes[i].selector).removeClass(classes[i].cssClass);
      };
      for (var i = 0; i < attrs.length; i++) {
        $(attrs[i].selector).removeAttr('style');
      };
    }

    function removeAD () {
      var adList;

      if (util.getCurrentSite() === 'douyu') {
        adList = util.douyuADList;
      }

      for (var i = 0; i < adList.length; i++) {
        $(adList[i]).remove();
      };
    }

    function updateConfig () {
      console.info("updating...");
      chrome.runtime.sendMessage(
        { action: "updateConfig", config: conf },
        function(response) {
          $rootScope.$broadcast('configUpdated', conf);
        }
      );
    }

  }
})();