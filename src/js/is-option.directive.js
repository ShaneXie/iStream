(function() {
    'use strict';

    iStreamApp.directive('isOption', isOption);

    function isOption($sce) {
        var templateUrl = $sce.trustAsResourceUrl(chrome.extension.getURL('../html/is-option.template.html'));
        return {
            templateUrl: templateUrl,
            controller: isOptionController,
            controllerAs: 'vm',
            restrict: 'E'
        };
    }

    function isOptionController ($rootScope, $http, $sce, optionService, chatService) {
        var vm = this;
        var alipayImageSrc = $sce.trustAsResourceUrl(chrome.extension.getURL('../assets/img/alipay.png'));
        angular.extend(vm, {
            douyuAccount: {},
            options: optionService.conf,
            bindAccount: optionService.bindAccount,
            unbindAccount: optionService.unbindAccount,
            toggleDark: optionService.toggleDark,
            toggleTTS: optionService.toggleTTS,
            toggleNotification: optionService.toggleNotification
        });
        $rootScope.$on('configUpdated', function (ev, data) {
            vm.options = data;
        });
    }
})();