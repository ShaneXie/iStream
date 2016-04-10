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

    function isOptionController ($sce) {
        var vm = this;
        var alipayImageSrc = $sce.trustAsResourceUrl(chrome.extension.getURL('../assets/img/alipay.png'));
        angular.extend(vm, {
            options: {
                adBlock: true,
                nightMode: true,
                notification: false
            },
            isBindAccount: true
        });
    }
})();