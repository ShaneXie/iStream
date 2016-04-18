(function() {
  'use strict';

  iStreamApp.factory('optionService', optionService);

  function optionService(
    util,
    chatService,
    $rootScope,
    $http,
    md5,
    $mdToast
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
      bindAccount: bindAccount,
      unbindAccount: unbindAccount,
      toggleDark: toggleDark,
      toggleTTS: toggleTTS,
      toggleNotification: toggleNotification
    };

    init();

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
        if (conf.notification) {
          chrome.runtime.sendMessage(
            { action: "startNotificaiton" },
            function(response) {}
          );
        };
      });
    }

    function bindAccount (site, acc) {
      var pwdMD5 = md5.createHash(acc.password);
      $http.get('http://capi.douyucdn.cn/api/v1/login?username='
        +acc.username+'&password='+pwdMD5)
        .then(function (res) {
          if (!res.data.error) {
            acc.password = pwdMD5;
            acc.token = res.data.data.token;
            acc.token_exp = res.data.data.token_exp;
            acc.nickname = res.data.data.nickname;
            conf.bindAccounts[site] = acc;
            console.info(conf);
            updateConfig();
          } else {
            $mdToast.show(
              $mdToast.simple()
                .textContent('绑定失败，请重新输入账号信息')
                .hideDelay(3000)
            );
          }
        });
    }

    function unbindAccount (site) {
      delete conf.bindAccounts[site];
      updateConfig();
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

    function toggleNotification () {
      console.log("toggle Notification");
      conf.notification = !conf.notification;
      if (conf.notification) {
        chrome.runtime.sendMessage(
          { action: "startNotificaiton" },
          function(response) {}
        );
      } else {
        chrome.runtime.sendMessage(
          { action: "stopNotificaiton" },
          function(response) {}
        );
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