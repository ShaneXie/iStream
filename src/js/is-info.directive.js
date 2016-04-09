(function() {
    'use strict';

    iStreamApp.directive('isInfo', isInfo);

    function isInfo($sce) {
        var templateUrl = $sce.trustAsResourceUrl(chrome.extension.getURL('../html/is-info.template.html'));
        return {
            templateUrl: templateUrl,
            controller: isInfoController,
            controllerAs: 'vm',
            restrict: 'E'
        };
    }

    function isInfoController ($sce) {
        var vm = this;
        var alipayImageSrc = $sce.trustAsResourceUrl(chrome.extension.getURL('../assets/img/alipay.png'));
        angular.extend(vm, {
            alipayImage: alipayImageSrc
        });
    }
})();